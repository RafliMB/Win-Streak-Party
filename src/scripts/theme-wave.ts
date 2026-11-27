type ThemeMode = 'light' | 'dark';

interface ThemeViewTransition {
  ready: Promise<void>;
  finished: Promise<void>;
  skipTransition: () => void;
}

type DocumentWithViewTransition = Document & {
  startViewTransition?: (updateCallback: () => void | Promise<void>) => ThemeViewTransition;
};

const STORAGE_KEY = 'wsp-theme';
const WAVE_SWEEP_DURATION = 780;
const ROOT_TOTAL_DURATION = 860;
const ECHO_DELAY = 105;
const ECHO_DURATION = 710;
const WAVE_STEPS = 24;
const POLYGON_POINTS = 72;
const SVG_NS = 'http://www.w3.org/2000/svg';
const SVG_VIEWBOX = 400;
const SVG_CENTER = 200;
const SVG_RING_RADIUS = 165;

/** Kurva gerak cairan: responsif saat klik, mengalir mulus di tengah layar, melambat lembut di sudut terjauh */
const waveProgress = (t: number): number => {
  const sine = 0.5 - 0.5 * Math.cos(Math.PI * t);
  const quadOut = 1 - (1 - t) * (1 - t);
  return 0.55 * sine + 0.45 * quadOut;
};

/** Membuat rangkaian keyframe clip-path poligon bergelombang seperti riak air */
const buildWaveClipKeyframes = (
  cx: number,
  cy: number,
  targetRadius: number,
  maxWaveAmp: number,
  holdTailRatio = 1
): Keyframe[] => {
  const keyframes: Keyframe[] = [];
  let finalClipPath = '';

  for (let step = 0; step <= WAVE_STEPS; step += 1) {
    const t = step / WAVE_STEPS;
    const progress = waveProgress(t);
    const baseR = targetRadius * progress;
    const envelope = Math.sin(Math.PI * Math.pow(t, 0.8));
    const amp = Math.min(maxWaveAmp * envelope, baseR * 0.22);

    const points: string[] = [];
    for (let i = 0; i < POLYGON_POINTS; i += 1) {
      const theta = (i / POLYGON_POINTS) * Math.PI * 2;
      const harmonic =
        0.55 * Math.sin(6 * theta + t * 5.2) +
        0.3 * Math.sin(10 * theta - t * 7.8 + 1.1) +
        0.15 * Math.cos(15 * theta + t * 10.4 + 2.3);
      const r = Math.max(0, baseR + amp * harmonic);
      const x = cx + r * Math.cos(theta);
      const y = cy + r * Math.sin(theta);
      points.push(`${x.toFixed(1)}px ${y.toFixed(1)}px`);
    }

    finalClipPath = `polygon(${points.join(', ')})`;
    keyframes.push({
      clipPath: finalClipPath,
      offset: Number((t * holdTailRatio).toFixed(4)),
    });
  }

  if (holdTailRatio < 1) {
    keyframes.push({ clipPath: finalClipPath, offset: 1 });
  }

  return keyframes;
};

/** Membuat path SVG tertutup berbentuk cincin gelombang air organik */
const buildOrganicRingPath = (
  radius: number,
  lobesA: number,
  ampA: number,
  lobesB: number,
  ampB: number,
  phaseOffset: number
): string => {
  const segments = 96;
  const cmds: string[] = [];

  for (let i = 0; i < segments; i += 1) {
    const theta = (i / segments) * Math.PI * 2;
    const r =
      radius +
      ampA * Math.sin(lobesA * theta + phaseOffset) +
      ampB * Math.cos(lobesB * theta - phaseOffset * 1.4);
    const x = SVG_CENTER + r * Math.cos(theta);
    const y = SVG_CENTER + r * Math.sin(theta);
    cmds.push(`${i === 0 ? 'M' : 'L'}${x.toFixed(2)} ${y.toFixed(2)}`);
  }

  cmds.push('Z');
  return cmds.join(' ');
};

const createSvgEl = <K extends keyof SVGElementTagNameMap>(
  tag: K,
  attrs: Record<string, string>
): SVGElementTagNameMap[K] => {
  const el = document.createElementNS(SVG_NS, tag);
  for (const [key, value] of Object.entries(attrs)) {
    el.setAttribute(key, value);
  }
  return el;
};

/** Membuat elemen visual puncak gelombang air (crest & echo) untuk lapisan View Transition */
const createWaveLayer = (
  kind: 'crest' | 'echo',
  nextTheme: ThemeMode,
  boxLeft: number,
  boxTop: number,
  boxSize: number
): HTMLDivElement => {
  const layer = document.createElement('div');
  layer.className = `theme-wave-layer theme-wave-layer--${kind}`;
  layer.setAttribute('aria-hidden', 'true');
  layer.style.left = `${boxLeft}px`;
  layer.style.top = `${boxTop}px`;
  layer.style.width = `${boxSize}px`;
  layer.style.height = `${boxSize}px`;
  layer.style.setProperty('view-transition-name', kind === 'crest' ? 'theme-wave-crest' : 'theme-wave-echo');

  const svg = createSvgEl('svg', {
    viewBox: `0 0 ${SVG_VIEWBOX} ${SVG_VIEWBOX}`,
    width: String(boxSize),
    height: String(boxSize),
    fill: 'none',
  });

  const defs = createSvgEl('defs', {});
  const gradId = `wsp-wave-grad-${kind}`;
  const grad = createSvgEl('linearGradient', {
    id: gradId,
    x1: '0%',
    y1: '0%',
    x2: '100%',
    y2: '100%',
  });

  const stops =
    nextTheme === 'dark'
      ? [
          { offset: '0%', color: '#38BDF8' },
          { offset: '48%', color: '#6D5CFF' },
          { offset: '100%', color: '#FBB03B' },
        ]
      : [
          { offset: '0%', color: '#FBB03B' },
          { offset: '52%', color: '#FFE29A' },
          { offset: '100%', color: '#7DD3FC' },
        ];

  stops.forEach(({ offset, color }) => {
    grad.appendChild(createSvgEl('stop', { offset, 'stop-color': color }));
  });

  defs.appendChild(grad);
  svg.appendChild(defs);

  const auraColor = nextTheme === 'dark' ? '#5B4FE8' : '#FBB03B';
  const glintColor = nextTheme === 'dark' ? '#E0F2FE' : '#FFFFFF';

  if (kind === 'crest') {
    const mainPath = buildOrganicRingPath(SVG_RING_RADIUS, 6, 6.2, 10, 3.0, 0.2);
    const innerPath = buildOrganicRingPath(SVG_RING_RADIUS - 13, 6, 4.6, 10, 2.2, 1.3);

    svg.appendChild(
      createSvgEl('path', {
        d: mainPath,
        stroke: auraColor,
        'stroke-width': '11',
        'stroke-opacity': '0.18',
        'stroke-linejoin': 'round',
      })
    );
    svg.appendChild(
      createSvgEl('path', {
        d: mainPath,
        stroke: `url(#${gradId})`,
        'stroke-width': '4.4',
        'stroke-opacity': '0.52',
        'stroke-linejoin': 'round',
      })
    );
    svg.appendChild(
      createSvgEl('path', {
        d: mainPath,
        stroke: glintColor,
        'stroke-width': '1.5',
        'stroke-opacity': '0.82',
        'stroke-linejoin': 'round',
      })
    );
    svg.appendChild(
      createSvgEl('path', {
        d: innerPath,
        stroke: `url(#${gradId})`,
        'stroke-width': '1.3',
        'stroke-opacity': '0.38',
        'stroke-linejoin': 'round',
      })
    );
  } else {
    const echoPath = buildOrganicRingPath(SVG_RING_RADIUS - 2, 6, 5.4, 10, 2.6, 2.1);
    const subEchoPath = buildOrganicRingPath(SVG_RING_RADIUS - 15, 6, 3.8, 10, 1.8, 0.7);

    svg.appendChild(
      createSvgEl('path', {
        d: echoPath,
        stroke: auraColor,
        'stroke-width': '7.5',
        'stroke-opacity': '0.13',
        'stroke-linejoin': 'round',
      })
    );
    svg.appendChild(
      createSvgEl('path', {
        d: echoPath,
        stroke: `url(#${gradId})`,
        'stroke-width': '1.8',
        'stroke-opacity': '0.56',
        'stroke-linejoin': 'round',
      })
    );
    svg.appendChild(
      createSvgEl('path', {
        d: subEchoPath,
        stroke: glintColor,
        'stroke-width': '1',
        'stroke-opacity': '0.3',
        'stroke-linejoin': 'round',
      })
    );
  }

  layer.appendChild(svg);
  return layer;
};

/** Membuat keyframe gerak cincin riak agar tetap menempel pada batas gelombang tema */
const buildRingKeyframes = (
  dx: number,
  dy: number,
  targetRadius: number,
  ringBaseRadius: number,
  rotationDeg: number,
  peakOpacity: number,
  scaleFactor: number
): Keyframe[] => {
  const frames: Keyframe[] = [];

  for (let step = 0; step <= WAVE_STEPS; step += 1) {
    const t = step / WAVE_STEPS;
    const progress = waveProgress(t);
    const radius = targetRadius * scaleFactor * progress;
    const scale = Math.max(0.06, radius / ringBaseRadius);
    const rot = rotationDeg * t;

    let opacity: number;
    if (t < 0.12) {
      opacity = (t / 0.12) * peakOpacity;
    } else if (t < 0.72) {
      const midT = (t - 0.12) / 0.6;
      opacity = peakOpacity * (1 - midT * 0.35);
    } else {
      const endT = (t - 0.72) / 0.28;
      opacity = peakOpacity * 0.65 * (1 - endT);
    }

    frames.push({
      transform: `translate(${dx.toFixed(1)}px, ${dy.toFixed(1)}px) scale(${scale.toFixed(4)}) rotate(${rot.toFixed(2)}deg)`,
      opacity: Math.max(0, Number(opacity.toFixed(3))),
    });
  }

  return frames;
};

export const initThemeWaveToggle = (themeBtn: HTMLButtonElement): void => {
  const root = document.documentElement;
  const doc = document as DocumentWithViewTransition;

  let activeTransition: ThemeViewTransition | null = null;
  let activeLayers: HTMLElement[] = [];
  let activeFallbackEl: HTMLElement | null = null;
  let buttonPulseTimer: number | null = null;
  let transitionSeq = 0;

  const getCurrentTheme = (): ThemeMode => (root.dataset.theme === 'dark' ? 'dark' : 'light');

  const syncThemeUi = (theme: ThemeMode): void => {
    const isDark = theme === 'dark';
    themeBtn.setAttribute('aria-pressed', isDark ? 'true' : 'false');
    themeBtn.setAttribute('aria-label', isDark ? 'Ubah ke mode terang' : 'Ubah ke mode gelap');
  };

  const persistTheme = (theme: ThemeMode): void => {
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // Abaikan jika penyimpanan browser dibatasi
    }
  };

  const applyTheme = (theme: ThemeMode, shouldPersist: boolean): void => {
    root.dataset.theme = theme;
    syncThemeUi(theme);
    if (shouldPersist) {
      persistTheme(theme);
    }
  };

  const triggerButtonDroplet = (): void => {
    if (buttonPulseTimer !== null) {
      window.clearTimeout(buttonPulseTimer);
    }
    delete themeBtn.dataset.rippling;
    void themeBtn.offsetWidth;
    themeBtn.dataset.rippling = 'true';
    buttonPulseTimer = window.setTimeout(() => {
      delete themeBtn.dataset.rippling;
      buttonPulseTimer = null;
    }, 620);
  };

  const cleanupLayers = (): void => {
    activeLayers.forEach((el) => el.remove());
    activeLayers = [];
    if (activeFallbackEl) {
      activeFallbackEl.remove();
      activeFallbackEl = null;
    }
    root.classList.remove('is-theme-transitioning');
  };

  const getOrigin = (): { cx: number; cy: number; vw: number; vh: number } => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const rect = themeBtn.getBoundingClientRect();
    if (rect.width === 0 && rect.height === 0) {
      return { cx: vw - 48, cy: 38, vw, vh };
    }
    return {
      cx: rect.left + rect.width / 2,
      cy: rect.top + rect.height / 2,
      vw,
      vh,
    };
  };

  const runFallbackWave = (next: ThemeMode, runId: number): void => {
    const { cx, cy, vw, vh } = getOrigin();
    const maxRadius = Math.hypot(Math.max(cx, vw - cx), Math.max(cy, vh - cy));
    const maxWaveAmp = Math.min(40, Math.max(20, maxRadius * 0.032));
    const targetRadius = maxRadius + maxWaveAmp * 1.5;

    triggerButtonDroplet();

    const veil = document.createElement('div');
    veil.className = `theme-wave-fallback theme-wave-fallback--${next}`;
    veil.setAttribute('aria-hidden', 'true');
    document.body.appendChild(veil);
    activeFallbackEl = veil;

    const clipFrames = buildWaveClipKeyframes(cx, cy, targetRadius, maxWaveAmp);
    const anim = veil.animate(clipFrames, {
      duration: 520,
      easing: 'linear',
      fill: 'forwards',
    });

    window.setTimeout(() => {
      if (runId !== transitionSeq) return;
      applyTheme(next, true);
    }, 260);

    anim.onfinish = () => {
      if (runId !== transitionSeq) return;
      const fade = veil.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 240,
        easing: 'ease-out',
        fill: 'forwards',
      });
      fade.onfinish = () => {
        if (runId !== transitionSeq) return;
        cleanupLayers();
      };
    };
  };

  const toggleWithWaterWave = (): void => {
    const next: ThemeMode = getCurrentTheme() === 'dark' ? 'light' : 'dark';
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (activeTransition) {
      try {
        activeTransition.skipTransition();
      } catch {
        // Abaikan jika transisi sudah selesai
      }
      activeTransition = null;
    }

    cleanupLayers();
    const runId = ++transitionSeq;

    if (reduceMotion) {
      applyTheme(next, true);
      return;
    }

    if (typeof doc.startViewTransition !== 'function') {
      runFallbackWave(next, runId);
      return;
    }

    const { cx, cy, vw, vh } = getOrigin();
    const maxRadius = Math.hypot(Math.max(cx, vw - cx), Math.max(cy, vh - cy));
    const maxWaveAmp = Math.min(44, Math.max(22, maxRadius * 0.032));
    const targetRadius = maxRadius + maxWaveAmp * 1.6;

    // Posisikan kotak grafik gelombang di tengah viewport agar snapshot tidak pernah terpotong tepi layar
    const boxSize = Math.max(220, Math.min(420, Math.floor(Math.min(vw, vh) * 0.72)));
    const boxLeft = Math.round((vw - boxSize) / 2);
    const boxTop = Math.round((vh - boxSize) / 2);
    const dx = cx - (boxLeft + boxSize / 2);
    const dy = cy - (boxTop + boxSize / 2);
    const ringBaseRadius = (SVG_RING_RADIUS / SVG_VIEWBOX) * boxSize;

    const crestEl = createWaveLayer('crest', next, boxLeft, boxTop, boxSize);
    const echoEl = createWaveLayer('echo', next, boxLeft, boxTop, boxSize);

    const transition = doc.startViewTransition(() => {
      root.classList.add('is-theme-transitioning');
      applyTheme(next, true);
      document.body.append(echoEl, crestEl);
      activeLayers = [echoEl, crestEl];
    });

    activeTransition = transition;

    transition.ready
      .then(() => {
        if (runId !== transitionSeq) return;

        const holdTailRatio = WAVE_SWEEP_DURATION / ROOT_TOTAL_DURATION;
        const clipFrames = buildWaveClipKeyframes(cx, cy, targetRadius, maxWaveAmp, holdTailRatio);
        root.animate(clipFrames, {
          duration: ROOT_TOTAL_DURATION,
          easing: 'linear',
          fill: 'both',
          pseudoElement: '::view-transition-new(root)',
        });

        const crestFrames = buildRingKeyframes(dx, dy, targetRadius, ringBaseRadius, 24, 0.92, 1.0);
        const crestAnim = root.animate(crestFrames, {
          duration: WAVE_SWEEP_DURATION,
          easing: 'linear',
          fill: 'both',
          pseudoElement: '::view-transition-new(theme-wave-crest)',
        });
        crestAnim.onfinish = () => {
          crestEl.style.opacity = '0';
        };

        const echoFrames = buildRingKeyframes(dx, dy, targetRadius, ringBaseRadius, -20, 0.62, 0.86);
        const echoAnim = root.animate(echoFrames, {
          delay: ECHO_DELAY,
          duration: ECHO_DURATION,
          easing: 'linear',
          fill: 'both',
          pseudoElement: '::view-transition-new(theme-wave-echo)',
        });
        echoAnim.onfinish = () => {
          echoEl.style.opacity = '0';
        };
      })
      .catch(() => {
        if (runId === transitionSeq) {
          cleanupLayers();
        }
      });

    transition.finished
      .catch(() => {
        // Abaikan pembatalan akibat klik berulang
      })
      .finally(() => {
        if (runId === transitionSeq) {
          activeTransition = null;
          cleanupLayers();
        }
      });
  };

  syncThemeUi(getCurrentTheme());

  themeBtn.addEventListener('click', toggleWithWaterWave);

  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  mediaQuery.addEventListener('change', (event) => {
    try {
      if (localStorage.getItem(STORAGE_KEY)) return;
    } catch {
      return;
    }
    const next: ThemeMode = event.matches ? 'dark' : 'light';
    applyTheme(next, false);
  });
};

import type { APIRoute } from 'astro';
import { communityInfo, formPlaystyles, formRoles, formTiers } from '../../data/community';

export const prerender = false;

interface JoinPayload {
  nickname?: unknown;
  contact?: unknown;
  roles?: unknown;
  tier?: unknown;
  playstyle?: unknown;
  note?: unknown;
  website?: unknown;
}

const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX_REQUESTS = 3;
const ipHits = new Map<string, number[]>();

const jsonResponse = (body: Record<string, unknown>, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  });

const isAllowedWebhook = (url: string): boolean => {
  try {
    const parsed = new URL(url);
    return (
      parsed.protocol === 'https:' &&
      (parsed.hostname === 'discord.com' ||
        parsed.hostname === 'discordapp.com' ||
        parsed.hostname === 'ptb.discord.com' ||
        parsed.hostname === 'canary.discord.com') &&
      parsed.pathname.startsWith('/api/webhooks/')
    );
  } catch {
    return false;
  }
};

const isRateLimited = (ip: string): boolean => {
  const now = Date.now();
  const recent = (ipHits.get(ip) ?? []).filter((ts) => now - ts < RATE_WINDOW_MS);
  if (recent.length >= RATE_MAX_REQUESTS) {
    ipHits.set(ip, recent);
    return true;
  }
  recent.push(now);
  ipHits.set(ip, recent);
  if (ipHits.size > 500) {
    for (const [key, timestamps] of ipHits) {
      if (timestamps.every((ts) => now - ts >= RATE_WINDOW_MS)) {
        ipHits.delete(key);
      }
    }
  }
  return false;
};

export const POST: APIRoute = async ({ request }) => {
  let body: JoinPayload;
  try {
    body = (await request.json()) as JoinPayload;
  } catch {
    return jsonResponse(
      { ok: false, code: 'INVALID_JSON', error: 'Format data formulir tidak valid.' },
      400
    );
  }

  // Honeypot anti-spam: diam-diam kembalikan sukses tanpa mengirim ke Discord
  if (typeof body.website === 'string' && body.website.trim().length > 0) {
    return jsonResponse({ ok: true, sent: true }, 200);
  }

  const nickname = typeof body.nickname === 'string' ? body.nickname.trim() : '';
  const contact = typeof body.contact === 'string' ? body.contact.trim() : '';
  const tier = typeof body.tier === 'string' ? body.tier.trim() : '';
  const playstyle = typeof body.playstyle === 'string' ? body.playstyle.trim() : '';
  const note = typeof body.note === 'string' ? body.note.trim() : '';
  const rawRoles = Array.isArray(body.roles) ? body.roles : [];
  const roles = rawRoles
    .filter((r): r is string => typeof r === 'string' && formRoles.includes(r))
    .slice(0, formRoles.length);

  if (nickname.length < 2 || nickname.length > 60) {
    return jsonResponse(
      { ok: false, code: 'VALIDATION_ERROR', error: 'Nickname / ID Mobile Legends harus 2–60 karakter.' },
      400
    );
  }

  if (contact.length < 3 || contact.length > 60) {
    return jsonResponse(
      { ok: false, code: 'VALIDATION_ERROR', error: 'Kontak WhatsApp atau Discord harus 3–60 karakter.' },
      400
    );
  }

  if (roles.length === 0) {
    return jsonResponse(
      { ok: false, code: 'VALIDATION_ERROR', error: 'Pilih setidaknya satu role utama Mobile Legends.' },
      400
    );
  }

  if (!formTiers.includes(tier) || !formPlaystyles.includes(playstyle)) {
    return jsonResponse(
      { ok: false, code: 'VALIDATION_ERROR', error: 'Pilihan tier atau fokus kegiatan tidak valid.' },
      400
    );
  }

  if (note.length > 300) {
    return jsonResponse(
      { ok: false, code: 'VALIDATION_ERROR', error: 'Catatan singkat maksimal 300 karakter.' },
      400
    );
  }

  const forwardedFor = request.headers.get('x-forwarded-for') || '';
  const clientIp = forwardedFor.split(',')[0]?.trim() || 'unknown';
  if (clientIp !== 'unknown' && isRateLimited(clientIp)) {
    return jsonResponse(
      {
        ok: false,
        code: 'RATE_LIMITED',
        error: 'Terlalu banyak percobaan pengiriman. Tunggu beberapa menit lalu coba lagi.',
      },
      429
    );
  }

  const webhookUrl = (process.env.DISCORD_WEBHOOK_URL || import.meta.env.DISCORD_WEBHOOK_URL || '').trim();
  if (!webhookUrl || !isAllowedWebhook(webhookUrl)) {
    return jsonResponse(
      {
        ok: false,
        code: 'WEBHOOK_NOT_CONFIGURED',
        error: 'Webhook Discord belum dikonfigurasi oleh admin.',
      },
      503
    );
  }

  const fields = [
    { name: 'Nickname / ID MLBB', value: nickname, inline: true },
    { name: 'Tier Saat Ini', value: tier, inline: true },
    { name: 'Kontak', value: contact, inline: true },
    { name: 'Role Utama', value: roles.join(', '), inline: false },
    { name: 'Fokus Kegiatan', value: playstyle, inline: false },
  ];

  if (note) {
    fields.push({ name: 'Hero Andalan / Catatan', value: note, inline: false });
  }

  const discordPayload = {
    username: `${communityInfo.name} — Pendaftaran`,
    avatar_url: `https://${communityInfo.domain}/images/brand/wsp-logo-mark.png`,
    allowed_mentions: { parse: [] },
    embeds: [
      {
        title: `Pendaftar Member Baru — ${communityInfo.name}`,
        color: 0xfbb03b,
        fields,
        footer: {
          text: `${communityInfo.domain} • ${communityInfo.slogan}`,
        },
        timestamp: new Date().toISOString(),
      },
    ],
  };

  try {
    const discordRes = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(discordPayload),
    });

    if (!discordRes.ok) {
      return jsonResponse(
        {
          ok: false,
          code: 'DISCORD_ERROR',
          error: 'Gagal meneruskan biodata ke Discord saat ini. Kamu tetap bisa menyalin biodata secara manual.',
        },
        502
      );
    }

    return jsonResponse({ ok: true, sent: true }, 200);
  } catch {
    return jsonResponse(
      {
        ok: false,
        code: 'DISCORD_NETWORK_ERROR',
        error: 'Koneksi ke server Discord sedang terkendala. Kamu tetap bisa menyalin biodata secara manual.',
      },
      502
    );
  }
};

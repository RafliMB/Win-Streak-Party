export interface CommunityPillar {
  title: string;
  body: string;
}

export interface ActivityProgram {
  id: string;
  tabLabel: string;
  title: string;
  summary: string;
  format: string;
  focus: string[];
  howToJoin: string;
  image: string;
  imageAlt: string;
}

export interface ScheduleItem {
  id: string;
  day: string;
  time: string;
  activity: string;
  mode: 'online' | 'offline';
  modeLabel: string;
  focus: string;
  notes: string;
}

export interface GalleryPhoto {
  id: string;
  src: string;
  alt: string;
  label: string;
  span: 'wide' | 'narrow' | 'half';
}

export const communityInfo = {
  name: 'Win Streak Party',
  shortName: 'WSP',
  tagline: 'Komunitas Mobile Legends untuk mabar 5-stack rutin, push rank solid, internal scrim, dan nobar MPL bareng.',
  heroHeading: 'Main bareng serius, menang bareng tanpa drama.',
  heroLead:
    'Win Streak Party adalah rumah mabar Mobile Legends bagi pemain kasual hingga Mythical Immortal yang mencari party komunikasi aktif, scrim rapi, dan teman kopdar.',
  channels: {
    // Ganti tautan placeholder berikut dengan undangan resmi komunitas Anda
    discordUrl: 'https://discord.gg/winstreakparty',
    discordDisplay: 'discord.gg/winstreakparty',
    whatsappUrl: 'https://chat.whatsapp.com/WinStreakPartyCommunity',
    whatsappDisplay: 'Grup WhatsApp Win Streak Party',
    instagramUrl: 'https://instagram.com/winstreakparty.id',
    instagramDisplay: '@winstreakparty.id',
  },
};

export const activeRoles = [
  'EXP Laner',
  'Jungler',
  'Mid Laner',
  'Gold Laner',
  'Roamer',
];

export const pillars: CommunityPillar[] = [
  {
    title: 'Party 5-stack tanpa toxic',
    body: 'Kalah atau menang dibahas bareng dengan kepala dingin. Tidak ada saling menyalahkan saat miss objektif atau salah rotasi, sehingga pemain baru bisa langsung nyaman ikut lobi.',
  },
  {
    title: 'Draft rapi dan evaluasi singkat',
    body: 'Setiap sesi push rank dan scrim dimulai dengan pembagian lane yang jelas. Selesai match, tim meluangkan beberapa menit mengulas draft pick, timing Turtle, dan eksekusi Lord.',
  },
  {
    title: 'Akrab dari voice hingga nobar MPL',
    body: 'Selain berkumpul di kanal voice Discord pada malam pekan, akhir pekan kami isi dengan nonton bareng pertandingan MPL, M-Series, dan kopdar santai.',
  },
];

export const activities: ActivityProgram[] = [
  {
    id: 'mabar',
    tabLabel: 'Mabar & Push Rank',
    title: 'Lobi party 5-stack terjadwal tiap pekan',
    summary:
      'Tidak perlu lagi antre solo bertemu rekan acak atau rebutan lane. Anggota langsung masuk kanal voice sesuai rentang tier untuk menyusun party lima orang yang kompak.',
    format: 'Party 5-stack Ranked & Classic di Discord, bagi lane sebelum mulai',
    focus: ['Epic – Legend', 'Mythic – Honor', 'Glory – Immortal'],
    howToJoin: 'Pilih role lane di Discord lalu klik absen di kanal lobi 15 menit sebelum mulai.',
    image: '/images/activities/activity-gathering.jpg',
    imageAlt: 'Anggota komunitas Mobile Legends Win Streak Party merayakan win streak bersama saat kumpul santai.',
  },
  {
    id: 'scrim',
    tabLabel: 'Internal Scrim & Review',
    title: 'Latih tanding Custom Draft Pick dan bedah replay',
    summary:
      'Sesi khusus untuk skuad yang ingin menaikkan disiplin komunikasi, penguasaan Turtle dan Lord, serta eksekusi ban-pick melawan tim sesama anggota komunitas.',
    format: 'Best of 3 Custom Draft Pick dilanjutkan bedah replay singkat',
    focus: ['Ban & Pick Strategy', 'Kontrol Turtle & Lord', 'Rotasi & Teamfight'],
    howToJoin: 'Daftarkan skuad penuh 5 orang atau daftar individu untuk dipasangkan ke tim berimbang.',
    image: '/images/activities/activity-coaching.jpg',
    imageAlt: 'Sesi bedah replay dan diskusi rotasi Mobile Legends bersama mentor komunitas di depan layar.',
  },
  {
    id: 'tournament',
    tabLabel: 'Fun Tournament',
    title: 'Turnamen mini 5v5 berformat rapi',
    summary:
      'Ajang kompetitif ramah komunitas lengkap dengan bagan bracket, wasit custom room, serta sesi sorak bareng bagi pemain yang ingin merasakan atmosfer panggung.',
    format: 'Custom Draft Pick 5v5, single atau double elimination untuk semua member',
    focus: ['Mode 5v5 Draft Pick', 'Bagan Bracket Resmi', 'Terbuka Semua Tier'],
    howToJoin: 'Pengumuman pendaftaran dibuka tiap awal pekan melalui grup WhatsApp dan Discord.',
    image: '/images/activities/activity-tournament.jpg',
    imageAlt: 'Suasana turnamen mini Mobile Legends komunitas dengan pemain fokus bertanding dan rekan tim bersorak.',
  },
  {
    id: 'nobar',
    tabLabel: 'Nobar MPL & Kopdar',
    title: 'Nonton bareng MPL, M-Series, dan kopdar akhir pekan',
    summary:
      'Saat big match MPL Indonesia atau babak playoff turnamen internasional berlangsung, kami berkumpul menonton bersama sekaligus mabar langsung di luar layar.',
    format: 'Temu darat di kedai kopi mitra dan ruang kreatif',
    focus: ['MPL Indonesia', 'M-Series & MSC', 'Kopdar & Mabar Offline'],
    howToJoin: 'Konfirmasi kehadiran di grup WhatsApp agar kursi dan area layar cukup untuk semua.',
    image: '/images/activities/activity-nobar.jpg',
    imageAlt: 'Anggota komunitas berkumpul di kafe semi-terbuka menonton siaran turnamen Mobile Legends pada malam hari.',
  },
];

export const weeklySchedule: ScheduleItem[] = [
  {
    id: 'selasa',
    day: 'Selasa',
    time: '20.00 – 22.30 WIB',
    activity: 'Push Rank Party 5-Stack',
    mode: 'online',
    modeLabel: 'Online via Discord',
    focus: 'Epic hingga Mythical Immortal',
    notes: 'Lobi dibagi per rentang tier agar matchmaking seimbang',
  },
  {
    id: 'kamis',
    day: 'Kamis',
    time: '20.00 – 22.30 WIB',
    activity: 'Internal Scrim & Draft Review',
    mode: 'online',
    modeLabel: 'Online via Discord',
    focus: 'Custom Draft Pick Bo3',
    notes: 'Latih ban-pick, setup objektif, dan ulas replay 15 menit',
  },
  {
    id: 'sabtu',
    day: 'Sabtu',
    time: '15.00 – 19.00 WIB',
    activity: 'Fun Mini-Tournament 5v5',
    mode: 'offline',
    modeLabel: 'Hybrid & Kopdar',
    focus: 'Custom Room Draft Pick',
    notes: 'Bagan diundi langsung sebelum pertandingan pembuka',
  },
  {
    id: 'minggu',
    day: 'Minggu',
    time: '18.30 – 22.00 WIB',
    activity: 'Nobar MPL & Santai Bareng',
    mode: 'offline',
    modeLabel: 'Offline di Kafe Mitra',
    focus: 'Siaran MPL / M-Series & Mabar',
    notes: 'Terbuka bagi member baru yang ingin kenalan langsung',
  },
];

export const galleryPhotos: GalleryPhoto[] = [
  {
    id: 'gal-1',
    src: '/images/activities/activity-tournament.jpg',
    alt: 'Pertandingan turnamen mini Mobile Legends dengan pemain fokus bertanding dan dukungan rekan tim.',
    label: 'Turnamen mini 5v5 komunitas',
    span: 'wide',
  },
  {
    id: 'gal-2',
    src: '/images/activities/activity-scrim.jpg',
    alt: 'Empat anggota tim berdiskusi menyusun draft pick dan rotasi menggunakan ponsel di meja kafe.',
    label: 'Diskusi draft pick dan rotasi lane',
    span: 'narrow',
  },
  {
    id: 'gal-3',
    src: '/images/activities/activity-gathering.jpg',
    alt: 'Anggota Win Streak Party merayakan kemenangan beruntun dengan tos dan minuman es kopi saat kopdar.',
    label: 'Kopdar dan selebrasi win streak',
    span: 'narrow',
  },
  {
    id: 'gal-4',
    src: '/images/activities/activity-nobar.jpg',
    alt: 'Keseruan nonton bareng pertandingan MPL bersama komunitas di kafe pada malam hari.',
    label: 'Nobar MPL dan playoff',
    span: 'wide',
  },
  {
    id: 'gal-5',
    src: '/images/activities/activity-coaching.jpg',
    alt: 'Sesi ulasan rekaman pertandingan Mobile Legends dan evaluasi makro bersama di ruang studio.',
    label: 'Bedah replay dan sesi makro',
    span: 'half',
  },
  {
    id: 'gal-6',
    src: '/images/activities/hero-mabar.jpg',
    alt: 'Sesi mabar 5-stack Mobile Legends lima pemain mengelilingi meja kayu dengan suasana akrab.',
    label: 'Mabar 5-stack malam pekan',
    span: 'half',
  },
];

export const formRoles = [
  'EXP Laner',
  'Jungler',
  'Mid Laner',
  'Gold Laner',
  'Roamer',
  'All Role / Flex',
];

export const formTiers = [
  'Mythical Immortal',
  'Mythical Glory',
  'Mythical Honor',
  'Mythic',
  'Legend',
  'Epic ke bawah / Santai',
];

export const formPlaystyles = [
  'Kasual dan cari teman mabar santai',
  'Push rank 5-stack dengan komunikasi voice',
  'Tertarik ikut scrim dan fun tournament',
  'Nobar MPL dan kopdar komunitas',
];

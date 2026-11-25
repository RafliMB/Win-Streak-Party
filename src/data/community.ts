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
  games: string[];
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
  games: string;
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
  tagline: 'Komunitas gaming dan esports untuk mabar rutin, push rank solid, scrim internal, dan nobar bareng.',
  heroHeading: 'Main bareng serius, menang bareng tanpa drama.',
  heroLead:
    'Win Streak Party adalah rumah mabar bagi pemain kasual hingga kompetitif yang mencari party komunikasi aktif, turnamen internal, dan teman kopdar.',
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

export const activeDivisions = [
  'Mobile Legends',
  'Valorant',
  'Honor of Kings',
  'PUBG Mobile',
  'EA Sports FC',
];

export const pillars: CommunityPillar[] = [
  {
    title: 'Party terbuka tanpa toxic',
    body: 'Kalah atau menang dibahas bareng dengan kepala dingin. Tidak ada saling menyalahkan di voice, sehingga pemain baru bisa langsung nyaman ikut lobi.',
  },
  {
    title: 'Rotasi jelas dan evaluasi singkat',
    body: 'Setiap sesi push rank dan scrim dimulai dengan pembagian role yang adil. Selesai main, tim meluangkan beberapa menit mengulas draft dan objektif.',
  },
  {
    title: 'Akrab dari voice hingga meja kopi',
    body: 'Selain berkumpul di kanal voice Discord pada malam pekan, akhir pekan kami isi dengan nonton bareng turnamen besar dan kopdar santai.',
  },
];

export const activities: ActivityProgram[] = [
  {
    id: 'mabar',
    tabLabel: 'Mabar & Push Rank',
    title: 'Lobi party terjadwal setiap pekan',
    summary:
      'Tidak perlu lagi antre solo bertemu rekan acak. Anggota langsung masuk kanal voice sesuai divisi game dan tier untuk menyusun party lima orang yang rapi.',
    format: 'Party 5-stack di Discord, pembagian role sebelum mulai',
    games: ['Mobile Legends', 'Valorant', 'Honor of Kings', 'PUBG Mobile'],
    howToJoin: 'Ambil peran game di Discord lalu klik absen di kanal lobi 15 menit sebelum mulai.',
    image: '/images/activities/activity-gathering.jpg',
    imageAlt: 'Anggota Win Streak Party merayakan kemenangan beruntun dengan tos dan es kopi saat kumpul komunitas.',
  },
  {
    id: 'scrim',
    tabLabel: 'Internal Scrim & Review',
    title: 'Latih tanding antar skuad dan bedah replay',
    summary:
      'Sesi khusus untuk tim yang ingin menaikkan disiplin komunikasi, kontrol objektif, serta eksekusi draft melawan skuad sesama anggota komunitas.',
    format: 'Best of 3 custom lobby dilanjutkan bedah replay singkat',
    games: ['Mobile Legends', 'Valorant', 'Honor of Kings'],
    howToJoin: 'Daftarkan skuad penuh atau daftar individu untuk dipasangkan ke tim berimbang.',
    image: '/images/activities/activity-coaching.jpg',
    imageAlt: 'Sesi ulasan strategi dan bedah replay permainan bersama mentor komunitas di depan layar studio.',
  },
  {
    id: 'tournament',
    tabLabel: 'Fun Tournament',
    title: 'Turnamen mini akhir pekan berformat rapi',
    summary:
      'Ajang kompetitif ramah komunitas lengkap dengan bagan bracket, pengawas lobi, serta sesi sorak bareng bagi pemain yang ingin merasakan atmosfer panggung.',
    format: 'Single atau double elimination, terbuka untuk semua member aktif',
    games: ['Mobile Legends', 'Valorant', 'EA Sports FC'],
    howToJoin: 'Pengumuman pendaftaran dibuka tiap awal pekan melalui grup WhatsApp dan Discord.',
    image: '/images/activities/activity-tournament.jpg',
    imageAlt: 'Suasana turnamen mini komunitas esports dengan pemain berheadset dan rekan tim bersorak di belakang.',
  },
  {
    id: 'nobar',
    tabLabel: 'Nobar & Kopdar',
    title: 'Nonton bareng playoff dan nongkrong akhir pekan',
    summary:
      'Saat babak playoff turnamen nasional maupun internasional berlangsung, kami berkumpul menonton bersama sekaligus kenalan langsung di luar layar.',
    format: 'Temu darat di kedai kopi mitra dan ruang kreatif',
    games: ['Playoff MPL & M-Series', 'VCT Masters', 'Kopdar Komunitas'],
    howToJoin: 'Konfirmasi kehadiran di grup WhatsApp agar kursi dan area layar cukup untuk semua.',
    image: '/images/activities/activity-nobar.jpg',
    imageAlt: 'Anggota komunitas duduk bersama di kafe semi-terbuka menonton siaran turnamen esports pada malam hari.',
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
    games: 'Mobile Legends, Honor of Kings',
    notes: 'Lobi dibagi per tier agar rotasi seimbang',
  },
  {
    id: 'kamis',
    day: 'Kamis',
    time: '20.00 – 22.30 WIB',
    activity: 'Internal Scrim & Draft Review',
    mode: 'online',
    modeLabel: 'Online via Discord',
    games: 'Valorant, Mobile Legends',
    notes: 'Format Bo3 custom room dan diskusi 15 menit',
  },
  {
    id: 'sabtu',
    day: 'Sabtu',
    time: '15.00 – 19.00 WIB',
    activity: 'Fun Mini-Tournament Bulanan',
    mode: 'offline',
    modeLabel: 'Hybrid & Kopdar',
    games: 'Divisi bergilir tiap bulan',
    notes: 'Bagan diundi langsung sebelum ronde pembuka',
  },
  {
    id: 'minggu',
    day: 'Minggu',
    time: '18.30 – 22.00 WIB',
    activity: 'Nobar Turnamen & Santai Bareng',
    mode: 'offline',
    modeLabel: 'Offline di Kafe Mitra',
    games: 'Siaran playoff & mini games',
    notes: 'Terbuka bagi member baru yang ingin kenalan',
  },
];

export const galleryPhotos: GalleryPhoto[] = [
  {
    id: 'gal-1',
    src: '/images/activities/activity-tournament.jpg',
    alt: 'Pertandingan turnamen mini komunitas dengan pemain berheadset dan dukungan rekan tim.',
    label: 'Turnamen mini komunitas',
    span: 'wide',
  },
  {
    id: 'gal-2',
    src: '/images/activities/activity-scrim.jpg',
    alt: 'Empat anggota tim berdiskusi menyusun strategi draft menggunakan tablet dan ponsel di meja kafe.',
    label: 'Diskusi strategi dan draft tim',
    span: 'narrow',
  },
  {
    id: 'gal-3',
    src: '/images/activities/activity-gathering.jpg',
    alt: 'Anggota Win Streak Party merayakan kemenangan dengan tos dan minuman es kopi saat kopdar.',
    label: 'Kopdar dan selebrasi win streak',
    span: 'narrow',
  },
  {
    id: 'gal-4',
    src: '/images/activities/activity-nobar.jpg',
    alt: 'Keseruan nonton bareng pertandingan esports bersama komunitas di kafe pada malam hari.',
    label: 'Nobar playoff esports',
    span: 'wide',
  },
  {
    id: 'gal-5',
    src: '/images/activities/activity-coaching.jpg',
    alt: 'Sesi ulasan rekaman pertandingan dan evaluasi taktik bersama di ruang studio.',
    label: 'Bedah replay dan sesi sharing',
    span: 'half',
  },
  {
    id: 'gal-6',
    src: '/images/activities/hero-mabar.jpg',
    alt: 'Sesi mabar rutin lima pemain mengelilingi meja kayu panjang dengan suasana akrab.',
    label: 'Mabar rutin malam pekan',
    span: 'half',
  },
];

export const formGames = [
  'Mobile Legends',
  'Valorant',
  'Honor of Kings',
  'PUBG Mobile',
  'EA Sports FC',
  'Lainnya',
];

export const formPlaystyles = [
  'Kasual dan cari teman mabar santai',
  'Push rank serius dengan komunikasi voice',
  'Tertarik ikut scrim dan fun tournament',
  'Nobar dan kopdar komunitas',
];

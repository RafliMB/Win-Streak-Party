export interface CommunityLeader {
  id: string;
  name: string;
  nickname: string;
  title: string;
  division: string;
  level: 'lead' | 'core';
  role: string;
  tier: string;
  bio: string;
  motto?: string;
  /** Opsional: isi jalur gambar (mis. '/images/leaders/nama.jpg') untuk mengganti avatar inisial */
  avatar?: string;
  avatarAlt?: string;
}

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

export interface CommunityRuleFaq {
  question: string;
  answer: string;
}

export interface CommunityEvent {
  id: string;
  title: string;
  status: 'Dibuka' | 'Segera Dibuka' | 'Selesai';
  dateLabel: string;
  format: string;
  location: string;
  summary: string;
  rules: string[];
  image: string;
  imageAlt: string;
}

export const communityInfo = {
  name: 'Win Streak Party',
  shortName: 'WSP',
  domain: 'winstreakparty.my.id',
  slogan: 'Permabaran yang mantap',
  tagline: 'Komunitas Mobile Legends untuk mabar 5-stack rutin, push rank solid, internal scrim, dan nobar MPL bareng.',
  heroHeading: 'Main bareng serius, menang bareng tanpa drama.',
  heroLead:
    'Win Streak Party adalah rumah mabar Mobile Legends bagi pemain kasual hingga Mythical Immortal yang mencari party komunikasi aktif, scrim rapi, dan teman kopdar.',
  channels: {
    // Ganti tautan Discord & nomor WhatsApp admin placeholder berikut dengan data resmi komunitas Anda
    discordUrl: 'https://discord.gg/winstreakparty',
    discordDisplay: 'discord.gg/winstreakparty',
    whatsappUrl: 'https://chat.whatsapp.com/BqTa9sYNuk06h5tEfM6LXf?s=cl&p=a&iam=2',
    whatsappDisplay: 'Grup WhatsApp Win Streak Party',
    // Format internasional tanpa tanda + atau spasi (contoh: 6281234567890)
    whatsappAdminPhone: '6281200000000',
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

// Data contoh jajaran petinggi Win Streak Party — silakan ganti dengan nama, IGN, jabatan, dan foto resmi
export const communityLeaders: CommunityLeader[] = [
  {
    id: 'founder',
    name: 'Alfiano',
    nickname: 'Nadhin',
    title: 'Founder & Ketua Komunitas',
    division: 'Inti Komunitas',
    level: 'lead',
    role: 'Roamer',
    tier: 'Mythical Immortal',
    bio: 'Penggagas berdirinya Win Streak Party. Mengawal arah komunitas, menjaga budaya main tanpa toxic, serta memimpin koordinasi lintas divisi.',
    motto: 'Permabaran yang Mantap!',
  },
  {
    id: 'vice-scrim',
    name: 'Dimas Aditya',
    nickname: 'WSP · Dims',
    title: 'Wakil Ketua & Head of Scrim',
    division: 'Divisi Kompetitif',
    level: 'lead',
    role: 'Jungler',
    tier: 'Mythical Glory',
    bio: 'Mengatur jadwal internal scrim Custom Draft Pick, memandu sesi bedah replay, dan membina skuad perwakilan WSP di turnamen.',
    motto: 'Objektif disiplin, rotasi kompak, menang bareng tanpa panik.',
  },
  {
    id: 'tournament-lead',
    name: 'Bagas Saputra',
    nickname: 'WSP · Bgs',
    title: 'Koordinator Turnamen & Event',
    division: 'Operasional Event',
    level: 'core',
    role: 'Mid Laner',
    tier: 'Mythical Honor',
    bio: 'Menyusun bagan WSP Fun Cup 5v5, mengawal jalannya custom room, serta menyiapkan agenda nobar MPL dan kopdar komunitas.',
  },
  {
    id: 'mod-lead',
    name: 'Nadia Kusuma',
    nickname: 'WSP · Nad',
    title: 'Kepala Moderasi & Lobi',
    division: 'Komunitas & Voice',
    level: 'core',
    role: 'EXP Laner',
    tier: 'Mythical Glory',
    bio: 'Menyambut anggota baru, memastikan kanal voice Discord tetap hangat, dan mengatur pembagian party 5-stack yang seimbang.',
  },
  {
    id: 'media-lead',
    name: 'Fajar Ramadhan',
    nickname: 'WSP · Fjr',
    title: 'Koordinator Media & Rekap',
    division: 'Kreatif & Dokumentasi',
    level: 'core',
    role: 'Gold Laner',
    tier: 'Mythic',
    bio: 'Mengelola dokumentasi mabar, publikasi rekap kegiatan, pengumuman jadwal rutin, serta arsip Hall of Fame skuad juara.',
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

export const communityRulesFaq: CommunityRuleFaq[] = [
  {
    question: 'Apakah pemain tier Epic atau kasual boleh bergabung?',
    answer:
      'Boleh. Win Streak Party terbuka dari pemain kasual hingga Mythical Immortal. Lobi mabar selalu dikelompokkan berdasarkan rentang tier yang berdekatan supaya semua pemain bisa menikmati pertandingan yang seimbang.',
  },
  {
    question: 'Bagaimana aturan pembagian lane supaya tidak rebutan role?',
    answer:
      'Setiap anggota memilih role utama dan satu role cadangan saat masuk lobi Discord. Kapten sesi menyusun susunan 5-stack sebelum masuk room, dan anggota bergantian fleksibel jika ada dua pemain dengan role sama.',
  },
  {
    question: 'Apa aturan soal perilaku toxic, AFK, atau menyalahkan rekan setim?',
    answer:
      'Kami menerapkan prinsip zero toxic. Kritik permainan selalu dibahas secara tenang setelah pertandingan usai, bukan lewat emosi di voice atau chat dalam game. Pelanggaran berulang akan ditegur admin hingga dikeluarkan dari grup.',
  },
  {
    question: 'Apakah wajib punya skuad 5 orang untuk ikut scrim atau fun tournament?',
    answer:
      'Tidak wajib. Kamu bisa mendaftar sebagai pemain individu; panitia akan memasangkan pendaftar solo ke tim berimbang sesuai role yang masih kosong sebelum bagan diundi.',
  },
  {
    question: 'Apakah ada biaya pendaftaran anggota komunitas?',
    answer:
      'Bergabung ke komunitas, ikut mabar rutin, dan mengikuti internal scrim tidak dipungut biaya keanggotaan. Untuk acara offline atau nobar di kafe, anggota cukup memesan makanan atau minuman masing-masing di lokasi.',
  },
];

export const upcomingEvents: CommunityEvent[] = [
  {
    id: 'wsp-fun-cup',
    title: 'WSP Fun Cup 5v5 — Custom Draft Pick',
    status: 'Dibuka',
    dateLabel: 'Jadwal contoh (Sabtu akhir bulan, 15.00 WIB)',
    format: '5v5 Custom Draft Pick (10 Ban), Single Elimination & Bo3 Final',
    location: 'Online via Discord + Kopdar Final',
    summary:
      'Turnamen internal bulanan untuk seluruh member aktif Win Streak Party. Bisa daftar satu skuad penuh maupun individu untuk dipasangkan ke tim acak berimbang.',
    rules: [
      'Terbuka untuk seluruh anggota yang sudah terverifikasi di Discord atau WhatsApp.',
      'Batas keterlambatan masuk custom room maksimal 10 menit dari jadwal ronde.',
      'Dilarang menggunakan chat all provokatif, taunting berlebihan, atau akun joki.',
    ],
    image: '/images/activities/activity-tournament.jpg',
    imageAlt: 'Suasana turnamen mini Mobile Legends komunitas.',
  },
  {
    id: 'nobar-mpl',
    title: 'Nobar Big Match MPL & Mabar Santai',
    status: 'Segera Dibuka',
    dateLabel: 'Jadwal contoh (Minggu malam, 18.30 WIB)',
    format: 'Nonton bareng layar besar dilanjutkan mabar 5-stack di lokasi',
    location: 'Kafe mitra (lokasi diumumkan di grup WhatsApp)',
    summary:
      'Ajang kenalan santai bagi anggota baru dan lama sambil menonton pertandingan playoff Mobile Legends bersama.',
    rules: [
      'Konfirmasi kehadiran H-1 di grup WhatsApp agar panitia bisa menyiapkan kursi.',
      'Bawa charger atau power bank sendiri untuk sesi mabar setelah nobar.',
    ],
    image: '/images/activities/activity-nobar.jpg',
    imageAlt: 'Anggota komunitas menonton pertandingan Mobile Legends bersama di kafe.',
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

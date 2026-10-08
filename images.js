const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };


export const uaemapimg = {
  'map': '/pics/emi/uaemapimg.jpg'
};

export const emirateImages = {
  'abu-dhabi':       '/pics/emi/abu-dhabi.avif',
  'dubai':           '/pics/emi/dubai.webp',
  'sharjah':         '/pics/emi/sharjah.jpg',
  'ajman':           '/pics/emi/ajman.webp',
  'umm-al-quwain':   '/pics/emi/umm-al-quwain.jpg',
  'ras-al-khaimah':  '/pics/emi/ras-al-khaimah.jpg',
  'fujairah':        '/pics/emi/fujairah.jpg'
};

// ===== LOCATION IMAGES =====
// Each key matches the location's `id` field in the data files.
export const locationImages = {

// --- Abu Dhabi ---
  'sheikh-zayed-grand-mosque':    '/pics/auh/sheikh-zayed-grand-mosque.jpg',
  'qasr-al-watan':                '/pics/auh/qasr-al-watan.jpg',
  'qasr-al-hosn':                 '/pics/auh/qasr-al-hosn.jpg',
  'louvre-abu-dhabi':             '/pics/auh/louvre-abu-dhabi.jpg',
  'heritage-village':             '/pics/auh/heritage-village.JPG',
  'emirates-palace':              '/pics/auh/emirates-palace.webp',
  'abu-dhabi-corniche':           '/pics/auh/abu-dhabi-corniche.webp',
  'wahat-al-karama':              '/pics/auh/wahat-al-karama.jpg',
  'mangrove-national-park':       '/pics/auh/mangrove-national-park.jpg',
  'al-wathba-fossil-dunes':       '/pics/auh/al-wathba-fossil-dunes.jpg',
  'al-ain-oasis':                 '/pics/auh/al-ain-oasis.webp',
  'jebel-hafeet':                 '/pics/auh/jebel-hafeet.jpg',
  'sir-bani-yas-island':          '/pics/auh/sir-bani-yas-island.webp',
  'abrahamic-family-house':       '/pics/auh/abrahamic-family-house.jpg',

// --- Dubai ---
  'burj-khalifa':                 '/pics/dxb/burj-khalifa.avif',
  'dubai-creek':                  '/pics/dxb/dubai-creek.webp',
  'al-fahidi-historical-neighbourhood': '/pics/dxb/al-fahidi-historical-neighbourhood.jpg',
  'dubai-frame':                  '/pics/dxb/dubai-frame.avif',
  'museum-of-the-future':         '/pics/dxb/museum-of-the-future.avif',
  'jumeirah-mosque':              '/pics/dxb/jumeirah-mosque.jpg',
  'etihad-museum':                '/pics/dxb/etihad-museum.webp',
  'palm-jumeirah':                '/pics/dxb/palm-jumeirah.jpg',
  'burj-al-arab':                 '/pics/dxb/burj-al-arab.avif',
  'hatta-heritage-village':       '/pics/dxb/hatta-heritage-village.avif',
  'global-village':               '/pics/dxb/global-village.jpg',
  'ras-al-khor-wildlife-sanctuary': '/pics/dxb/ras-al-khor-wildlife-sanctuary.jpg',
// --- Sharjah ---
  'heart-of-sharjah':             '/pics/shj/heart-of-sharjah.jpg',
  'sharjah-museum-islamic-civilization': '/pics/shj/sharjah-museum-islamic-civilization.jpg',
  'sharjah-heritage-museum':      '/pics/shj/sharjah-heritage-museum.jpg',
  'al-noor-mosque':               '/pics/shj/al-noor-mosque.avif',
  'al-qasba':                     '/pics/shj/al-qasba.jpg',
  'mleiha-archaeological-centre': '/pics/shj/mleiha-archaeological-centre.jpg',
  'sharjah-art-museum':           '/pics/shj/sharjah-art-museum.jpg',
  'house-of-wisdom':              '/pics/shj/house-of-wisdom.jpg',
  'sharjah-fort':                 '/pics/shj/sharjah-fort.jpg',
  'khor-fakkan':                  '/pics/shj/khor-fakkan.webp',
// --- Ajman ---
  'ajman-museum':                 '/pics/ajman/ajman-museum.jpg',
  'ajman-fort':                   '/pics/ajman/ajman-fort.jpg',
  'ajman-corniche':               '/pics/ajman/ajman-corniche.webp',
  'al-zorah-nature-reserve':      '/pics/ajman/al-zorah-nature-reserve.jpg',
  'al-muwayhat':                  '/pics/ajman/al-muwayhat.jpg',
  'masfout':                      '/pics/ajman/masfout.jpg',
  'masfout-castle':               '/pics/ajman/masfout-castle.jpg',
  'al-nuaimi-mosque':             '/pics/ajman/al-nuaimi-mosque.webp',

// --- Umm Al Quwain ---
  'uaq-national-museum':          '/pics/uaq/uaq-national-museum.jpg',
  'uaq-fort':                     '/pics/uaq/uaq-fort.jpg',
  'uaq-old-harbour':              '/pics/uaq/uaq-old-harbour.avif',
  'al-sinniyah-island':           '/pics/uaq/al-sinniyah-island.jpg',
  'tell-abraq':                   '/pics/uaq/tell-abraq.jpg',
  'falaj-al-mualla':              '/pics/uaq/falaj-al-mualla.jpg',
  'dreamland-aqua-park':          '/pics/uaq/dreamland-aqua-park.jpg',
  'uaq-mangrove-reserve':         '/pics/uaq/uaq-mangrove-reserve.png',

// --- Ras Al Khaimah ---
  'jebel-jais':                   '/pics/rak/jebel-jais.jpg',
  'dhayah-fort':                  '/pics/rak/dhayah-fort.jpg',
  'al-jazirah-al-hamra':          '/pics/rak/al-jazirah-al-hamra.jpg',
  'rak-national-museum':          '/pics/rak/rak-national-museum.jpg',
  'al-rams':                      '/pics/rak/al-rams.jpg',
  'suwaidi-pearls':               '/pics/rak/suwaidi-pearls.jpg',
  'khatt-springs':                '/pics/rak/khatt-springs.jpg',
  'wadi-shawka':                  '/pics/rak/wadi-shawka.jpg',
  'jais-flight':                  '/pics/rak/jais-flight.jpg',
  'shimal':                       '/pics/rak/shimal.jpg',

// --- Fujairah ---
  'fujairah-fort':                '/pics/fuj/fujairah-fort.jpg',
  'fujairah-museum':              '/pics/fuj/fujairah-museum.jpg',
  'al-bidyah-mosque':             '/pics/fuj/al-bidyah-mosque.jpg',
  'bithnah-fort':                 '/pics/fuj/bithnah-fort.jpg',
  'al-aqah-beach':                '/pics/fuj/al-aqah-beach.jpg',
  'snoopy-island':                '/pics/fuj/snoopy-island.jpg',
  'wadi-wurayah':                 '/pics/fuj/wadi-wurayah.jpg',
  'fujairah-corniche':            '/pics/fuj/fujairah-corniche.jpg',
  'sheikh-zayed-mosque-fujairah': '/pics/fuj/sheikh-zayed-mosque-fujairah.jpg',
  'dibba':                        '/pics/fuj/dibba.jpg'
};


/// ===== CULTURE IMAGES =====
export const cultureImages = {
  'falconry':           '/pics/culture/falconry.jpg',
  'camel-racing':       '/pics/culture/camel-racing.jpg',
  'pearl-diving':       '/pics/culture/pearl-diving.jpg',
  'dhow-building':      '/pics/culture/dhow-building-yard.jpg',
  'sadu-weaving':       '/pics/culture/sadu-weaving.jpg',
  'henna':              '/pics/culture/henna.jpg',
  'machboos':           '/pics/culture/machboos.jpg',
  'harees':             '/pics/culture/harees.webp',
  'luqaimat':           '/pics/culture/luqaimat.jpg',
  'balaleet':           '/pics/culture/balaleet.webp',
  'arabic-coffee':      '/pics/culture/arabic-coffee.jpg',
  'dates':              '/pics/culture/dates.jpg',
  'kandura':            '/pics/culture/kandura.jpg',
  'ghutra':             '/pics/culture/ghutra.jpg',
  'agal':               '/pics/culture/agal.jpg',
  'abaya':              '/pics/culture/abaya.jpg',
  'shayla':             '/pics/culture/shayla.jpg',
  'barasti-houses':     '/pics/culture/barasti-houses.jpg',
  'wind-towers':        '/pics/culture/wind-towers.jpg',
  'coral-stone-houses': '/pics/culture/coral-stone-houses.jpg',
  'forts-and-watchtowers': '/pics/culture/forts-and-watchtowers.jpg',
  'traditional-mosques': '/pics/culture/traditional-mosques.jpg',
  'modern-architecture': '/pics/culture/modern-architecture.webp',
  'al-ayala':           '/pics/culture/al-ayala.png',
  'traditional-instruments': '/pics/culture/traditional-instruments.jpg',
  'nabati-poetry':      '/pics/culture/nabati-poetry.jpg',
  'oral-traditions':    '/pics/culture/oral-traditions.jpg',
  'uae-flag':           '/pics/culture/uae-flag.jpg',
  'coat-of-arms':       '/pics/culture/coat-of-arms.jpg',
  'national-anthem':    '/pics/culture/national-anthem.jpg',
  'national-bird':      '/pics/culture/national-bird.jpg',
  'national-tree':      '/pics/culture/national-tree.jpg',
  'national-animal':    '/pics/culture/national-animal.jpg'
};

// ===== FESTIVAL IMAGES =====
export const festivalImages = {
  'national-day':      '/pics/festivals/national-day.jpg',
  'flag-day':          '/pics/festivals/flag-day.jpg',
  'commemoration-day': '/pics/festivals/commemoration-day.webp',
  'ramadan':           '/pics/festivals/ramadan.jpg',
  'eid-al-fitr':       '/pics/festivals/eid-al-fitr.png',
  'eid-al-adha':       '/pics/festivals/eid-al-adha.jpg',
  'islamic-new-year':  '/pics/festivals/islamic-new-year.png',
  'prophet-birthday':  '/pics/festivals/prophet-birthday.png'
};


// ===== TIMELINE IMAGES =====
export const timelineImages = {
  'pearl-diving-era':     '/pics/timeline/pearl-diving-era.jpg',
  'oil-discovery':        '/pics/timeline/oil-discovery.jpg',
  'uae-formation':        '/pics/timeline/uae-formation.jpg',
  'sheikh-zayed-mosque-opens': '/pics/timeline/sheikh-zayed-mosque-opens.jpg',
  'burj-khalifa-opens':   '/pics/timeline/burj-khalifa-open.jpg',
  'louvre-opens':         '/pics/timeline/louvre-opens.jpg',
  'hope-probe':           '/pics/timeline/hope-probe.jpg',
  'museum-of-future-opens': '/pics/timeline/museum-of-future-opens.jpg',
  'cop28':                '/pics/timeline/cop28.jpg',
  'net-zero-2050':        '/pics/timeline/net-zero-2050.jpg'
};

// ===== SUSTAINABILITY IMAGES =====
export const sustainabilityImages = {
  'masdar-city':           '/pics/sustain/masdar-city.jpg',
  'solar-park':            '/pics/sustain/solar-park.jpg',
  'mangrove-restoration':  '/pics/sustain/mangrove-restoration.jpg',
  'marine-conservation':   '/pics/sustain/marine-conservation.jpg',
  'desert-conservation':   '/pics/sustain/desert-conservation.jpg',
  'wildlife-protection':   '/pics/sustain/wildlife-protection.jpg',
  'water-conservation':    '/pics/sustain/water-conservation.jpg',
  'net-zero-2050':         '/pics/sustain/net-zero-2050.jpg'
};
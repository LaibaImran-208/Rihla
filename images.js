const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

/**
 * Centralized Image References for Rihla UAE Explorer
 * ====================================================
 * To replace any image, simply update the URL in this file.
 * Images are keyed by slug for easy identification.
 *
 * Generated images are hosted on media.db.com.
 * Stock photos are from Unsplash (images.unsplash.com).
 */

// ===== EMIRATE IMAGES =====
export const emirateImages = {
  'abu-dhabi':       'https://media.assettype.com/outlooktraveller/2024-08-20/0nbfvji7/shutterstock_2473580625.jpg?w=1200&ar=40%3A21&auto=format%2Ccompress&ogImage=true&mode=crop&enlarge=true&overlay=false&overlay_position=bottom&overlay_width=100',
  'dubai':           'https://images.unsplash.com/photo-1658301839070-656a71f805d1?auto=format&fit=crop&w=1200&q=85',
  'sharjah':         'https://images.unsplash.com/photo-1691932092749-981f9905a9fa?auto=format&fit=crop&w=1200&q=85',
  'ajman':           'https://images.unsplash.com/photo-1655713532401-c5df95bc6e96?auto=format&fit=crop&w=1200&q=85',
  'umm-al-quwain':   'https://images.unsplash.com/photo-1590453905958-d541322af7a5?auto=format&fit=crop&w=1200&q=85',
  'ras-al-khaimah':  'https://images.unsplash.com/photo-1649283529996-d918a73b2687?auto=format&fit=crop&w=1200&q=85',
  'fujairah':        'https://images.unsplash.com/photo-1674456944741-d9b8d523efa4?auto=format&fit=crop&w=1200&q=85'
};

// ===== LOCATION IMAGES =====
// Each key matches the location's `id` field in the data files.
export const locationImages = {
  // --- Abu Dhabi ---
  'sheikh-zayed-grand-mosque':    'https://images.unsplash.com/photo-1564507060528-2545673c9e63?auto=format&fit=crop&w=1200&q=85',
  'qasr-al-watan':                'https://images.unsplash.com/photo-1540272826122-ccf0a226259c?auto=format&fit=crop&w=1200&q=85',
  'qasr-al-hosn':                 'https://images.unsplash.com/photo-1587421890935-5fb13a3beccc?auto=format&fit=crop&w=1200&q=85',
  'louvre-abu-dhabi':             'https://images.unsplash.com/photo-1672324016837-4b803c38fc95?auto=format&fit=crop&w=1200&q=85',
  'heritage-village':             'https://images.unsplash.com/photo-1536564397506-55dda737cc65?auto=format&fit=crop&w=1200&q=85',
  'emirates-palace':              'https://images.unsplash.com/photo-1568901576299-10ad4f3711e2?auto=format&fit=crop&w=1200&q=85',
  'abu-dhabi-corniche':           'https://images.unsplash.com/photo-1562078128-70ebca46b10e?auto=format&fit=crop&w=1200&q=85',
  'wahat-al-karama':              'https://media.db.com/images/public/6a7c883244b0c2e59e05c109/0d4f51508_generated_image.png',
  'mangrove-national-park':       'https://images.unsplash.com/photo-1641852347240-9d64f5c7b8f2?auto=format&fit=crop&w=1200&q=85',
  'al-wathba-fossil-dunes':       'https://images.unsplash.com/photo-1594970856432-db143678c831?auto=format&fit=crop&w=1200&q=85',
  'al-ain-oasis':                 'https://images.unsplash.com/photo-1648814037760-1dd4d3169a26?auto=format&fit=crop&w=1200&q=85',
  'jebel-hafeet':                 'https://images.unsplash.com/photo-1542878447-e2b6df2526fa?auto=format&fit=crop&w=1200&q=85',
  'sir-bani-yas-island':          'https://images.unsplash.com/photo-1626526153942-19c8f9775cc4?auto=format&fit=crop&w=1200&q=85',
  'abrahamic-family-house':       'https://images.unsplash.com/photo-1583771803077-e512cbd2059c?auto=format&fit=crop&w=1200&q=85',

  // --- Dubai ---
  'burj-khalifa':                 'https://images.unsplash.com/photo-1512453973666-147629fde45a?auto=format&fit=crop&w=1200&q=85',
  'dubai-creek':                  'https://images.unsplash.com/photo-1606036858743-c106b6ffbff6?auto=format&fit=crop&w=1200&q=85',
  'al-fahidi-historical-neighbourhood': 'https://images.unsplash.com/photo-1653763843954-0ad7300268a6?auto=format&fit=crop&w=1200&q=85',
  'dubai-frame':                  'https://images.unsplash.com/photo-1628859017536-c2f1d69f3c84?auto=format&fit=crop&w=1200&q=85',
  'museum-of-the-future':         'https://images.unsplash.com/photo-1667592441284-b590021411e3?auto=format&fit=crop&w=1200&q=85',
  'jumeirah-mosque':              'https://images.unsplash.com/photo-1569069438599-4b719f7463b4?auto=format&fit=crop&w=1200&q=85',
  'etihad-museum':                'https://images.unsplash.com/photo-1546412414-8035e1776c9a?auto=format&fit=crop&w=1200&q=85',
  'palm-jumeirah':                'https://images.unsplash.com/photo-1679682598283-a1b88b136ed8?auto=format&fit=crop&w=1200&q=85',
  'burj-al-arab':                 'https://images.unsplash.com/photo-1546412414-e1885259563a?auto=format&fit=crop&w=1200&q=85',
  'hatta-heritage-village':       'https://images.unsplash.com/photo-1680425982124-beaa3e9d3191?auto=format&fit=crop&w=1200&q=85',
  'global-village':               'https://images.unsplash.com/photo-1647377129158-40daa63b2f51?auto=format&fit=crop&w=1200&q=85',
  'ras-al-khor-wildlife-sanctuary': 'https://images.unsplash.com/photo-1677632227880-4d21073ef8f4?auto=format&fit=crop&w=1200&q=85',

  // --- Sharjah ---
  'heart-of-sharjah':             'https://media.db.com/images/public/6a7c883244b0c2e59e05c109/03987769e_generated_image.png',
  'sharjah-museum-islamic-civilization': 'https://images.unsplash.com/photo-1715373690396-136e399e80b5?auto=format&fit=crop&w=1200&q=85',
  'sharjah-heritage-museum':      'https://images.unsplash.com/photo-1546412414-28524ac58329?auto=format&fit=crop&w=1200&q=85',
  'al-noor-mosque':               'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1200&q=85',
  'al-qasba':                     'https://images.unsplash.com/photo-1702070114450-94d981d72233?auto=format&fit=crop&w=1200&q=85',
  'mleiha-archaeological-centre': 'https://images.unsplash.com/photo-1680425982087-9f6f25861db1?auto=format&fit=crop&w=1200&q=85',
  'sharjah-art-museum':           'https://images.unsplash.com/photo-1686918269961-507270a5a238?auto=format&fit=crop&w=1200&q=85',
  'house-of-wisdom':              'https://images.unsplash.com/photo-1687754715959-41fed2161528?auto=format&fit=crop&w=1200&q=85',
  'sharjah-fort':                 'https://images.unsplash.com/photo-1730626480563-10d80cab5201?auto=format&fit=crop&w=1200&q=85',
  'khor-fakkan':                  'https://images.unsplash.com/photo-1677508398331-58597cd61618?auto=format&fit=crop&w=1200&q=85',

  // --- Ajman ---
  'ajman-museum':                 'https://media.db.com/images/public/6a7c883244b0c2e59e05c109/ace89af82_generated_image.png',
  'ajman-fort':                   'https://images.unsplash.com/photo-1730628771563-ca08ef042a23?auto=format&fit=crop&w=1200&q=85',
  'ajman-corniche':               'https://images.unsplash.com/photo-1705412082002-6d7200fa10ba?auto=format&fit=crop&w=1200&q=85',
  'al-zorah-nature-reserve':      'https://images.unsplash.com/photo-1679899608908-2e9536b14617?auto=format&fit=crop&w=1200&q=85',
  'al-muwayhat':                  'https://images.unsplash.com/photo-1680425982106-4a7af217e2a6?auto=format&fit=crop&w=1200&q=85',
  'masfout':                      'https://images.unsplash.com/photo-1745708804966-fc71b259a01b?auto=format&fit=crop&w=1200&q=85',
  'masfout-castle':               'https://images.unsplash.com/photo-1633981871770-214950461624?auto=format&fit=crop&w=1200&q=85',
  'al-nuaimi-mosque':             'https://images.unsplash.com/photo-1465414951857-102134ffaa57?auto=format&fit=crop&w=1200&q=85',

  // --- Umm Al Quwain ---
  'uaq-national-museum':          'https://media.db.com/images/public/6a7c883244b0c2e59e05c109/93fe67b5d_generated_image.png',
  'uaq-fort':                     'https://images.unsplash.com/photo-1606382837285-96f342fc1ef8?auto=format&fit=crop&w=1200&q=85',
  'uaq-old-harbour':              'https://images.unsplash.com/photo-1588408687414-434a389defac?auto=format&fit=crop&w=1200&q=85',
  'al-sinniyah-island':           'https://media.db.com/images/public/6a7c883244b0c2e59e05c109/b1636789c_generated_image.png',
  'tell-abraq':                   'https://images.unsplash.com/photo-1686643117124-5e63123d2c1f?auto=format&fit=crop&w=1200&q=85',
  'falaj-al-mualla':              'https://media.db.com/images/public/6a7c883244b0c2e59e05c109/499a1b73a_generated_image.png',
  'dreamland-aqua-park':          'https://media.db.com/images/public/6a7c883244b0c2e59e05c109/dc9fb39dd_generated_image.png',
  'uaq-mangrove-reserve':         'https://media.db.com/images/public/6a7c883244b0c2e59e05c109/481073cd5_generated_image.png',

  // --- Ras Al Khaimah ---
  'jebel-jais':                   'https://images.unsplash.com/photo-1542878447-e2b6df2526fa?auto=format&fit=crop&w=1200&q=85',
  'dhayah-fort':                  'https://media.db.com/images/public/6a7c883244b0c2e59e05c109/b65816a13_generated_image.png',
  'al-jazirah-al-hamra':          'https://media.db.com/images/public/6a7c883244b0c2e59e05c109/fa2738621_generated_image.png',
  'rak-national-museum':          'https://media.db.com/images/public/6a7c883244b0c2e59e05c109/fcaff0948_generated_image.png',
  'al-rams':                      'https://media.db.com/images/public/6a7c883244b0c2e59e05c109/877cb9cb4_generated_image.png',
  'suwaidi-pearls':               'https://media.db.com/images/public/6a7c883244b0c2e59e05c109/e8dffe6af_generated_image.png',
  'khatt-springs':                'https://media.db.com/images/public/6a7c883244b0c2e59e05c109/e1ba9cf8c_generated_image.png',
  'wadi-shawka':                  'https://media.db.com/images/public/6a7c883244b0c2e59e05c109/fec7a46b8_generated_image.png',
  'jais-flight':                  'https://media.db.com/images/public/6a7c883244b0c2e59e05c109/33d99efbe_generated_image.png',
  'shimal':                       'https://media.db.com/images/public/6a7c883244b0c2e59e05c109/5f45fb33f_generated_image.png',

  // --- Fujairah ---
  'fujairah-fort':                'https://media.db.com/images/public/6a7c883244b0c2e59e05c109/3872c4e6e_generated_image.png',
  'fujairah-museum':              'https://media.db.com/images/public/6a7c883244b0c2e59e05c109/69a75eaae_generated_image.png',
  'al-bidyah-mosque':             'https://media.db.com/images/public/6a7c883244b0c2e59e05c109/fd171bf39_generated_image.png',
  'bithnah-fort':                 'https://media.db.com/images/public/6a7c883244b0c2e59e05c109/8e84edf68_generated_image.png',
  'al-aqah-beach':                'https://media.db.com/images/public/6a7c883244b0c2e59e05c109/7cb1af214_generated_image.png',
  'snoopy-island':                'https://media.db.com/images/public/6a7c883244b0c2e59e05c109/a7690b596_generated_image.png',
  'wadi-wurayah':                 'https://media.db.com/images/public/6a7c883244b0c2e59e05c109/50250c344_generated_image.png',
  'fujairah-corniche':            'https://media.db.com/images/public/6a7c883244b0c2e59e05c109/405bfca17_generated_image.png',
  'sheikh-zayed-mosque-fujairah': 'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1200&q=85',
  'dibba':                        'https://media.db.com/images/public/6a7c883244b0c2e59e05c109/003697f9e_generated_image.png'
};

// ===== CULTURE IMAGES =====
export const cultureImages = {
  'falconry':           'https://media.db.com/images/public/6a7c883244b0c2e59e05c109/1e4b20f35_generated_image.png',
  'camel-racing':       'https://images.unsplash.com/photo-1779032369221-5a0861a3534e?auto=format&fit=crop&w=1200&q=85',
  'pearl-diving':       'https://media.db.com/images/public/6a7c883244b0c2e59e05c109/9226cce17_generated_image.png',
  'dhow-building':      'https://images.unsplash.com/photo-1784821441898-9e067f1c95e4?auto=format&fit=crop&w=1200&q=85',
  'sadu-weaving':       'https://images.unsplash.com/photo-1569909115134-a0426936c879?auto=format&fit=crop&w=1200&q=85',
  'henna':              'https://images.unsplash.com/photo-1720798298994-bf41cb26ba31?auto=format&fit=crop&w=1200&q=85',
  'machboos':           'https://images.unsplash.com/photo-1778785241914-7f75ca16a92d?auto=format&fit=crop&w=1200&q=85',
  'harees':             'https://media.db.com/images/public/6a7c883244b0c2e59e05c109/7e91ed037_generated_image.png',
  'luqaimat':           'https://images.unsplash.com/photo-1758779527897-bb4097eb0445?auto=format&fit=crop&w=1200&q=85',
  'balaleet':           'https://media.db.com/images/public/6a7c883244b0c2e59e05c109/477ad6d31_generated_image.png',
  'arabic-coffee':      'https://images.unsplash.com/photo-1754874398289-70b375a6f27f?auto=format&fit=crop&w=1200&q=85',
  'dates':              'https://images.unsplash.com/photo-1629738601425-494c3d6ba3e2?auto=format&fit=crop&w=1200&q=85',
  'kandura':            'https://images.unsplash.com/photo-1780601247035-e34a7b06d35b?auto=format&fit=crop&w=1200&q=85',
  'ghutra':             'https://images.unsplash.com/photo-1780831768363-73b4ea0eea48?auto=format&fit=crop&w=1200&q=85',
  'agal':               'https://images.unsplash.com/photo-1780831768850-a650936de831?auto=format&fit=crop&w=1200&q=85',
  'abaya':              'https://images.unsplash.com/photo-1728487235101-664d87965931?auto=format&fit=crop&w=1200&q=85',
  'shayla':             'https://images.unsplash.com/photo-1510495631661-903668f58af2?auto=format&fit=crop&w=1200&q=85',
  'barasti-houses':    'https://images.unsplash.com/photo-1536564397506-55dda737cc65?auto=format&fit=crop&w=1200&q=85',
  'wind-towers':        'https://images.unsplash.com/photo-1785508145125-b9dea49bea1b?auto=format&fit=crop&w=1200&q=85',
  'coral-stone-houses': 'https://images.unsplash.com/photo-1653763843954-0ad7300268a6?auto=format&fit=crop&w=1200&q=85',
  'forts-and-watchtowers': 'https://images.unsplash.com/photo-1674456944741-d9b8d523efa4?auto=format&fit=crop&w=1200&q=85',
  'traditional-mosques': 'https://images.unsplash.com/photo-1583771803077-e512cbd2059c?auto=format&fit=crop&w=1200&q=85',
  'modern-architecture': 'https://images.unsplash.com/photo-1667592441284-b590021411e3?auto=format&fit=crop&w=1200&q=85',
  'al-ayala':           'https://media.db.com/images/public/6a7c883244b0c2e59e05c109/5d0631d0e_generated_image.png',
  'traditional-instruments': 'https://images.unsplash.com/photo-1680425982124-beaa3e9d3191?auto=format&fit=crop&w=1200&q=85',
  'nabati-poetry':      'https://images.unsplash.com/photo-1687754715959-41fed2161528?auto=format&fit=crop&w=1200&q=85',
  'oral-traditions':    'https://images.unsplash.com/photo-1655713532401-c5df95bc6e96?auto=format&fit=crop&w=1200&q=85',
  'uae-flag':           'https://images.unsplash.com/photo-1518684079-3c830dcef0fd?auto=format&fit=crop&w=1200&q=85',
  'coat-of-arms':       'https://images.unsplash.com/photo-1730626480563-10d80cab5201?auto=format&fit=crop&w=1200&q=85',
  'national-anthem':    'https://images.unsplash.com/photo-1564507060528-2545673c9e63?auto=format&fit=crop&w=1200&q=85',
  'national-bird':      'https://images.unsplash.com/photo-1686918269961-507270a5a238?auto=format&fit=crop&w=1200&q=85',
  'national-tree':      'https://images.unsplash.com/photo-1648814037760-1dd4d3169a26?auto=format&fit=crop&w=1200&q=85',
  'national-animal':    'https://images.unsplash.com/photo-1626526153942-19c8f9775cc4?auto=format&fit=crop&w=1200&q=85'
};

// ===== FESTIVAL IMAGES =====
export const festivalImages = {
  'national-day':      'https://images.unsplash.com/photo-1694431452845-719ff1e1eea9?auto=format&fit=crop&w=1200&q=85',
  'flag-day':          'https://images.unsplash.com/photo-1518684079-3c830dcef0fd?auto=format&fit=crop&w=1200&q=85',
  'commemoration-day': 'https://images.unsplash.com/photo-1606382837285-96f342fc1ef8?auto=format&fit=crop&w=1200&q=85',
  'ramadan':           'https://images.unsplash.com/photo-1565538813539-8f68b084d99c?auto=format&fit=crop&w=1200&q=85',
  'eid-al-fitr':       'https://images.unsplash.com/photo-1564507060528-2545673c9e63?auto=format&fit=crop&w=1200&q=85',
  'eid-al-adha':       'https://images.unsplash.com/photo-1583771803077-e512cbd2059c?auto=format&fit=crop&w=1200&q=85',
  'islamic-new-year':  'https://images.unsplash.com/photo-1562078128-70ebca46b10e?auto=format&fit=crop&w=1200&q=85',
  'prophet-birthday': 'https://images.unsplash.com/photo-1569069438599-4b719f7463b4?auto=format&fit=crop&w=1200&q=85'
};

// ===== TIMELINE IMAGES =====
export const timelineImages = {
  'pearl-diving-era':     'https://images.unsplash.com/photo-1588408687414-434a389defac?auto=format&fit=crop&w=1200&q=85',
  'oil-discovery':        'https://images.unsplash.com/photo-1694431452845-719ff1e1eea9?auto=format&fit=crop&w=1200&q=85',
  'uae-formation':        'https://images.unsplash.com/photo-1546412414-8035e1776c9a?auto=format&fit=crop&w=1200&q=85',
  'sheikh-zayed-mosque-opens': 'https://images.unsplash.com/photo-1564507060528-2545673c9e63?auto=format&fit=crop&w=1200&q=85',
  'burj-khalifa-opens':   'https://images.unsplash.com/photo-1512453973666-147629fde45a?auto=format&fit=crop&w=1200&q=85',
  'louvre-opens':         'https://images.unsplash.com/photo-1672324016837-4b803c38fc95?auto=format&fit=crop&w=1200&q=85',
  'hope-probe':           'https://images.unsplash.com/photo-1667592441284-b590021411e3?auto=format&fit=crop&w=1200&q=85',
  'museum-of-future-opens': 'https://images.unsplash.com/photo-1687754715959-41fed2161528?auto=format&fit=crop&w=1200&q=85',
  'cop28':                'https://images.unsplash.com/photo-1647377129158-40daa63b2f51?auto=format&fit=crop&w=1200&q=85',
  'net-zero-2050':        'https://images.unsplash.com/photo-1641852347240-9d64f5c7b8f2?auto=format&fit=crop&w=1200&q=85'
};

// ===== SUSTAINABILITY IMAGES =====
export const sustainabilityImages = {
  'masdar-city':           'https://images.unsplash.com/photo-1647377129158-40daa63b2f51?auto=format&fit=crop&w=1200&q=85',
  'solar-park':            'https://images.unsplash.com/photo-1687754715959-41fed2161528?auto=format&fit=crop&w=1200&q=85',
  'mangrove-restoration': 'https://images.unsplash.com/photo-1641852347240-9d64f5c7b8f2?auto=format&fit=crop&w=1200&q=85',
  'marine-conservation':  'https://images.unsplash.com/photo-1677632227880-4d21073ef8f4?auto=format&fit=crop&w=1200&q=85',
  'desert-conservation':  'https://images.unsplash.com/photo-1594970856432-db143678c831?auto=format&fit=crop&w=1200&q=85',
  'wildlife-protection':  'https://images.unsplash.com/photo-1686918269961-507270a5a238?auto=format&fit=crop&w=1200&q=85',
  'water-conservation':   'https://images.unsplash.com/photo-1658301839070-656a71f805d1?auto=format&fit=crop&w=1200&q=85',
  'net-zero-2050':        'https://images.unsplash.com/photo-1667592441284-b590021411e3?auto=format&fit=crop&w=1200&q=85'
};
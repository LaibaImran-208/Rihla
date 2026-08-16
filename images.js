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
  'dubai':           'https://365adventures.me/wp-content/uploads/2023/09/Dubai-COVER-PHOTO.jpg',
  'sharjah':         'https://www.arabianbusiness.com/cloud/2022/03/31/Sharjah-skyline.jpg',
  'ajman':           'https://images.unsplash.com/photo-1655713532401-c5df95bc6e96?auto=format&fit=crop&w=1200&q=85',
  'umm-al-quwain':   'https://images.unsplash.com/photo-1590453905958-d541322af7a5?auto=format&fit=crop&w=1200&q=85',
  'ras-al-khaimah':  'https://images.unsplash.com/photo-1649283529996-d918a73b2687?auto=format&fit=crop&w=1200&q=85',
  'fujairah':        'https://images.unsplash.com/photo-1674456944741-d9b8d523efa4?auto=format&fit=crop&w=1200&q=85'
};

// ===== LOCATION IMAGES =====
// Each key matches the location's `id` field in the data files.
export const locationImages = {
// --- Abu Dhabi ---
  'sheikh-zayed-grand-mosque':    'https://www.planetjanettravels.com/wp-content/uploads/2017/02/1_UAE-abu-dhabi-sheik-zayed-grand-mosque-name.jpg',
  'qasr-al-watan':                'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/16/c3/da/97/qasr-al-watan.jpg?w=900&h=500&s=1',
  'qasr-al-hosn':                 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Qasr_al_Hosn_in_2019.jpg?utm_source=en.wikipedia.org&utm_campaign=index&utm_content=original',
  'louvre-abu-dhabi':             'https://images.trvl-media.com/place/553248621560904133/0b49858a-e085-449c-bd25-6d8fab79e2d8.jpg',
  'heritage-village':             'https://visitabudhabi.ae/-/media/project/vad/things-to-do/culture-mfd/heritage/heritage-village/main-image.jpg?rev=2de66dfaeeda4ac288d96137dbc154c0',
  'emirates-palace':              'https://media.cntraveler.com/photos/5dc074ad03b23c0008cae1c1/16:9/w_2560,c_limit/emiratespalace-abudhabi-2019-2.jpg',
  'abu-dhabi-corniche':           'https://res.cloudinary.com/ddjuftfy2/image/upload/f_webp,c_fill,q_auto/memphis/large/1092895729_Abu%20Dahbi%20Cornish.jpg',
  'wahat-al-karama':              'https://visitabudhabi.ae/-/media/project/vad/things-to-do/culture-mfd/heritage/wahat-al-karama/wahat-al-karama-main-image-5000x2800.jpg?rev=ce2465ed4cbd43a5938ccd5c7fd0ba31,
  'mangrove-national-park':       'https://visitabudhabi.ae/-/media/project/vad/things-to-do/nature-and-wildlife-mfd/parks/jubail-mangrove-park/jubail-mangrove-park-main-image-5000x2800.jpg?rev=2c21f4c64bd543eba756ce42fb4d0dfc',
  'al-wathba-fossil-dunes':       'https://visitabudhabi.ae/-/media/project/vad/things-to-do/nature-and-wildlife-mfd/natural-wonders/al-wathba-fossil-dunes/fossil-dunes-abu-dhabi-cover-20210712.jpg?rev=-1',
  'al-ain-oasis':                 'https://media.cntraveler.com/photos/582a01b09e1b702b18b73cfe/16:9/w_2560%2Cc_limit/CR52WG.jpg',
  'jebel-hafeet':                 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1b/b4/6a/9e/abu-dhabi-is-one-of-the.jpg?w=900&h=500&s=1',
  'sir-bani-yas-island':          'https://www.msccruises.fi/-/media/global-contents/destinations/ports/united-arab-emirates/sir-bani-yas-island/cruise-to-sir-bani-yas-island-united-arab-emirates.jpg?bc=transparent&as=1&mh=1395&mw=2460&hash=5E62787852643DA1A8E678186C0692F5',
  'abrahamic-family-house':       'https://afhqportalimageslive.blob.core.windows.net/qportalimageslive/venue/22/2025/06/01/customer-portal-config/pages/cover_images/1748807882_683cb0ca832fb_Main_Banner-min.jpg',

// --- Dubai ---
  'burj-khalifa':                 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YnVyaiUyMGtoYWxpZmF8ZW58MHx8MHx8fDA%3D',
  'dubai-creek':                  'https://hotairballoondubai.co/wp-content/uploads/2024/11/Dubai-Creek-history.jpg',
  'al-fahidi-historical-neighbourhood': 'https://openspace.ae/wp-content/uploads/2023/02/al-fahidi-scaled-1.jpg',
  'dubai-frame':                  'https://images.unsplash.com/photo-1628859017536-c2f1d69f3c84?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZHViYWklMjBmcmFtZXxlbnwwfHwwfHx8MA%3D%3D',
  'museum-of-the-future':         'https://images.unsplash.com/photo-1667592441284-b590021411e3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bXVzZXVtJTIwb2YlMjBmdXR1cmV8ZW58MHx8MHx8fDA%3D',
  'jumeirah-mosque':              'https://arabiahorizons.com/blog/wp-content/uploads/2021/02/Jumeirah-Mosque-in-Dubai.jpg',
  'etihad-museum':                'https://tse4.mm.bing.net/th/id/OIP.dwu3PXTBDJtGJeBmGORHIAHaEm?r=0&pid=Api',
  'palm-jumeirah':                'https://www.iranydubai.hu/wp-content/uploads/2020/08/palm-jumeirah.jpg',
  'burj-al-arab':                 'https://images.unsplash.com/flagged/photo-1555457900-4f4cf4768371?q=80&w=1331&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'hatta-heritage-village':       'https://www.visitdubai.com/-/media/gathercontent/article/h/hattas-rich-history/fallback-image/discover-hattas-rich-historyherodtcm.jpg',
  'global-village':               'https://blog.citylaila.com/wp-content/uploads/2023/11/GlobalVillageTicketinDubaiUnitedArabEmirates-KlookIndia.jpg',
  'ras-al-khor-wildlife-sanctuary': 'https://captaindunes.com/wp-content/uploads/2025/09/Ras-Al-Khor-Wildlife-Sanctuary-In-Dubai.jpg',

// --- Sharjah ---
  'heart-of-sharjah':             'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Heart_of_Sharjah.jpg/500px-Heart_of_Sharjah.jpg?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail',
  'sharjah-museum-islamic-civilization': 'https://universes.art/fileadmin/media/images/art_destinations/sharjah/museums/islamic_civilization/01_310/1828581-1-eng-GB/01_310.jpg',
  'sharjah-heritage-museum':      'https://teachmiddleeastmag.com/wp-content/uploads/2014/10/DSC_0099.jpg',
  'al-noor-mosque':               'https://tse3.mm.bing.net/th/id/OIP.NdBbm4Syuj-DF2JGYTGPkAHaE8?r=0&pid=Api',
  'al-qasba':                     'https://mybayutcdn.bayut.com/mybayut/wp-content/uploads/Feature-Photo-4.jpg',
  'mleiha-archaeological-centre': 'https://images.adsttc.com/media/images/63a5/a8c7/6c62/5769/af37/8d33/slideshow/mleiha-archaeological-centre-dabbagh-architects_1.jpg?1671801077',
  'sharjah-art-museum':           'https://universes.art/fileadmin/user_upload/Biennials/Sharjah/2023/Venues-500/City/01-Sharjah-Art-Museum-A.jpg',
  'house-of-wisdom':              'https://www.e-architect.com/wp-content/uploads/2021/03/house-of-wisdom-in-sharjah-uae-f110321-1.jpg',
  'sharjah-fort':                 'https://tse2.mm.bing.net/th/id/OIP.Rj4jCJH3pIaA_3LZG_B4fQHaE7?r=0&pid=Api',
  'khor-fakkan':                  'https://shozon.com/blog/wp-content/uploads/2026/02/Sharjah-Khor-Fakkan-1024x505.webp',

// --- Ajman ---
  'ajman-museum':                 'https://visit-ajman.ae/media/wusbwwa0/ajman-meuseum-inside-1700x700.jpg',
  'ajman-fort':                   'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQD_XGoO3-v1MJdlQN2HwAQ0GqO8yJE-J5CgNmUGU86iBT4hxrZcMfEYrFI&s=10',
  'ajman-corniche':               'https://topaddress.ae/wp-content/uploads/2022/01/corniche-residences-apart-1br-0.webp',
  'al-zorah-nature-reserve':      'https://146414699.fs1.hubspotusercontent-eu1.net/hubfs/146414699/Imported_Blog_Media/Al%20Zorah%20Nature%20reserve-jpg-Oct-12-2025-09-56-47-6390-AM.jpg',
  'al-muwayhat':                  'https://universes.art/fileadmin/_processed_/b/2/csm_04_ab72fa8d1c.jpg',
  'masfout':                      'https://d3ob0s3rxbjyep.cloudfront.net/content/Masfout_Cover_07_05_2020_9d1dbcc5a6.jpg',
  'masfout-castle':               'https://visit-ajman.ae/media/4qebogk1/masfout-castle.jpg',
  'al-nuaimi-mosque':             'https://explore.rehlat.ae/static/media/searchdestination/thingstodo/images/ajman/al_nuaimia_mosque/large_b78dca1a8e9a397526b62f7cee954fa305e35eb8.webp',
  
// --- Umm Al Quwain ---
  'uaq-national-museum':          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuonWB-Lzvmk-znBpMd7Jc66Wm-W-92FIndwW5loAx_rUOrXB3fB2jgBCI&s=10',
  'uaq-fort':                     'https://mala.ae/wp-content/uploads/2023/03/hiestory-fort.jpg',
  'uaq-old-harbour':              'https://images.unsplash.com/photo-1617298126699-b58d6a0bae56?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8b2xkJTIwcG9ydCUyMHVtbSUyMGFsJTIwcXV3YWlufGVufDB8fDB8fHww',
  'al-sinniyah-island':           'https://www.timeoutdubai.com/cloud/timeoutdubai/2022/02/18/Zaya-Nurai-Island-1024x768.jpg',
  'tell-abraq':                   'https://cloudfront-eu-central-1.images.arcpublishing.com/thenational/C5Q2KHMYVVGIDBVENVXN6NKCJQ.jpg',
  'falaj-al-mualla':              'https://d3ob0s3rxbjyep.cloudfront.net/content/Falaj_Al_Mualla_Fort_692021_be5158320f.jpg',
  'dreamland-aqua-park':          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLXTP3pHND9E-dVRTf6JO91YQxUf0l_xveskCT7WqJkREjL2PGpInHAh8&s=10',
  'uaq-mangrove-reserve':         'https://gulfbuzz.com/wp-content/uploads/2024/10/2-3.png',
  
  // --- Ras Al Khaimah ---
  'jebel-jais':                   'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEXFeoTtGOmSpkRt8afyJ-nCHzspQ5F6PBMUao60wWnA&s=10',
  'dhayah-fort':                  'https://visitrasalkhaimah.com/wp-content/uploads/2019/07/1-10.jpg',
  'al-jazirah-al-hamra':          'https://upload.wikimedia.org/wikipedia/commons/5/58/Al_Jazirah_Al_Hamra_2026-01.jpg?utm_source=en.wikipedia.org&utm_campaign=index&utm_content=original',
  'rak-national-museum':          'https://visitrasalkhaimah.com/wp-content/uploads/2019/07/1-6.jpg',
  'al-rams':                      'https://lh5.googleusercontent.com/p/AF1QipP79FxqS8Tb6nvTSq9-zO5xLy8svIrFtv9j8q2a=s1600',
  'suwaidi-pearls':               'https://res.klook.com/image/upload/w_750,h_469,c_fill,q_85/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/w9ey2gqhmieotgljynck.jpg',
  'khatt-springs':                'https://www.trawell.in/admin/images/upload/480294652khatts-springs.jpg',
  'wadi-shawka':                  'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/4c/7e/61/climbing-the-mountain.jpg?w=1200&h=1200&s=1',
  'jais-flight':                  'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2c/69/be/4e/jais-flight-against-the.jpg?w=1200&h=-1&s=1',
  'shimal':                       'https://rakheritage.rak.ae/wp-content/uploads/2024/09/DigitalWeb_medium_JPG-RAKWALLPAPER-14.jpg',

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
  'pearl-diving-era':     'https://146414699.fs1.hubspotusercontent-eu1.net/hubfs/146414699/Imported_Blog_Media/0101279d-6b50-49e0-a1fe-3e10c9ecf7aa-1-Oct-12-2025-09-55-52-9160-AM.jpg',
  'oil-discovery':        'https://cdn.emiratitimes.com/wp-content/uploads/2021/09/14191037/Emirates-Oil-World.jpg',
  'uae-formation':        'https://vspauditors.com/wp-content/uploads/2016/06/UAE-Article-300x200.jpg',
  'sheikh-zayed-mosque-opens': 'https://thenational.shorthandstories.com/sheikh-zayed-grand-mosque-abu-dhabi/assets/2eScnzehQZ/mosque-from-above-after-edit-2560x1447.jpg',
  'burj-khalifa-opens':   'https://d2csxpduxe849s.cloudfront.net/media/42BB6A60-DC5B-4A0B-87CC3E8C248CB543/C8B8C53F-D4FB-47AD-BC8F1EAB4D570E00/webimage-3D0ADACC-95C6-4E46-917F764AC40B7B27.png',
  'louvre-opens':         'https://images.trvl-media.com/place/553248621560904133/0b49858a-e085-449c-bd25-6d8fab79e2d8.jpg',
  'hope-probe':           'https://spacein3d.com/wp-content/uploads/2021/02/Emirates_Hope.jpg',
  'museum-of-future-opens': 'https://www.visitdubai.com/-/media/images/leisure/campaigns/dubai-presents/itineraries/spy/spy-media-museum-of-the-future.jpg',
  'cop28':                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhMsVa_0U6omz9Q48rSMjdedTjmq2ZTOOX5WApVdgewytVqIRCOOVYwXg&s=10',
  'net-zero-2050':        'https://www.ku.ac.ae/wp-content/uploads/2021/08/Carbon_Neutrality_by_2050.jpg'
};
// ===== SUSTAINABILITY IMAGES =====
export const sustainabilityImages = {
  'masdar-city':           'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrBYcoYKrYTRRfychekf2cIoyoFKmDSxpbtKgj9LOoKQ&s=10',
  'solar-park':            'https://images.unsplash.com/photo-1687754715959-41fed2161528?auto=format&fit=crop&w=1200&q=85',
  'mangrove-restoration': 'https://images.unsplash.com/photo-1641852347240-9d64f5c7b8f2?auto=format&fit=crop&w=1200&q=85',
  'marine-conservation':  'https://images.unsplash.com/photo-1677632227880-4d21073ef8f4?auto=format&fit=crop&w=1200&q=85',
  'desert-conservation':  'https://images.unsplash.com/photo-1594970856432-db143678c831?auto=format&fit=crop&w=1200&q=85',
  'wildlife-protection':  'https://images.unsplash.com/photo-1686918269961-507270a5a238?auto=format&fit=crop&w=1200&q=85',
  'water-conservation':   'https://images.unsplash.com/photo-1658301839070-656a71f805d1?auto=format&fit=crop&w=1200&q=85',
  'net-zero-2050':        'https://images.unsplash.com/photo-1667592441284-b590021411e3?auto=format&fit=crop&w=1200&q=85'
};

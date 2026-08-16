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

export const emirateImages = {
  'abu-dhabi':       'https://media.assettype.com/outlooktraveller/2024-08-20/0nbfvji7/shutterstock_2473580625.jpg?w=1200&ar=40%3A21&auto=format%2Ccompress&ogImage=true&mode=crop&enlarge=true&overlay=false&overlay_position=bottom&overlay_width=100',
  'dubai':           'https://365adventures.me/wp-content/uploads/2023/09/Dubai-COVER-PHOTO.jpg',
  'sharjah':         'https://www.arabianbusiness.com/cloud/2022/03/31/Sharjah-skyline.jpg',
  'ajman':           'https://world-arabia.com/storage/images/news/crops/news-promo/jxsQZu1Obz1t8wutVorwht5kSh2oVHkBWWfRNlac.webp',
  'umm-al-quwain':   'https://cdn.britannica.com/15/189715-050-4310222B/Dubai-United-Arab-Emirates-Burj-Khalifa-top.jpg',
  'ras-al-khaimah':  'https://vootours.com/wp-content/uploads/2025/02/Rasalkhaimah-CityScape-1140x530.jpg',
  'fujairah':        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaoM_efN738cNd1aDsf5enoEJGeWwMYu5pKuxdpaMhDmysuq1Q1lHKEtfr&s=10'
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
'wahat-al-karama':              'https://visitabudhabi.ae/-/media/project/vad/things-to-do/culture-mfd/heritage/wahat-al-karama/wahat-al-karama-main-image-5000x2800.jpg?rev=ce2465ed4cbd43a5938ccd5c7fd0ba31',
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
  'etihad-museum':                'https://www.egypttoursplus.com/wp-content/uploads/2025/07/Etihad-Museum-in-Dubai-%E2%80%93-modern-cultural-landmark-showcasing-the-history-of-the-UAEs-unification-through-interactive-exhibits-and-original-documents.webp',
  'palm-jumeirah':                'https://www.iranydubai.hu/wp-content/uploads/2020/08/palm-jumeirah.jpg',
  'burj-al-arab':                 'https://images.unsplash.com/flagged/photo-1555457900-4f4cf4768371?q=80&w=1331&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'hatta-heritage-village':       'https://www.visitdubai.com/-/media/gathercontent/article/h/hattas-rich-history/fallback-image/discover-hattas-rich-historyherodtcm.jpg',
  'global-village':               'https://blog.citylaila.com/wp-content/uploads/2023/11/GlobalVillageTicketinDubaiUnitedArabEmirates-KlookIndia.jpg',
  'ras-al-khor-wildlife-sanctuary': 'https://captaindunes.com/wp-content/uploads/2025/09/Ras-Al-Khor-Wildlife-Sanctuary-In-Dubai.jpg',

  // --- Sharjah ---
  'heart-of-sharjah':             'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Heart_of_Sharjah.jpg/500px-Heart_of_Sharjah.jpg?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail',
  'sharjah-museum-islamic-civilization': 'https://universes.art/fileadmin/media/images/art_destinations/sharjah/museums/islamic_civilization/01_310/1828581-1-eng-GB/01_310.jpg',
  'sharjah-heritage-museum':      'https://teachmiddleeastmag.com/wp-content/uploads/2014/10/DSC_0099.jpg',
  'al-noor-mosque':               'https://images.daytrip.com/al-noor-mosque1.jpg?w=1920&q=30',
  'al-qasba':                     'https://mybayutcdn.bayut.com/mybayut/wp-content/uploads/Feature-Photo-4.jpg',
  'mleiha-archaeological-centre': 'https://images.adsttc.com/media/images/63a5/a8c7/6c62/5769/af37/8d33/slideshow/mleiha-archaeological-centre-dabbagh-architects_1.jpg?1671801077',
  'sharjah-art-museum':           'https://universes.art/fileadmin/user_upload/Biennials/Sharjah/2023/Venues-500/City/01-Sharjah-Art-Museum-A.jpg',
  'house-of-wisdom':              'https://www.e-architect.com/wp-content/uploads/2021/03/house-of-wisdom-in-sharjah-uae-f110321-1.jpg',
  'sharjah-fort':                 'https://2.bp.blogspot.com/-kEeDXq4uUg4/USHjMlZW1wI/AAAAAAAACo0/55wlT0deEVs/s1600/Sharjah_AlHisnFort.jpg',
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

/// ===== CULTURE IMAGES =====
export const cultureImages = {
  'falconry':           'https://www.dayoutdubai.ae/blog/wp-content/uploads/2019/09/man-holding-falcon-copy-1024x538.jpg',
  'camel-racing':       'https://media.cntraveler.com/photos/5e3072085d81ee0009342a11/16:9/w_2560,c_limit/CamelRacing-DubaiTTD-2020-GettyImages-450199299.jpg',
  'pearl-diving':       'https://www.dotwnews.com/uploads/posts_photos/serdal-pearl-diving-2-min-d8nnaj.jpg',
  'dhow-building':      'https://d1snrxh3s61e7p.cloudfront.net/media/CACHE/images/venues/a04b47bc-dece-42e5-a60b-23884b111ee5/dhow-building-yard.jpg',
  'sadu-weaving':       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnTUNJrBlU6wIiknQ3e39ncNh25tj0bzUQOyf6hk7SroLDF8Y-UCn8PrQ&s=10',
  'henna':              'https://www.harpersbazaararabia.com/wp-content/uploads/sites/7/cloud/2021/09/09/hba-hennasalons-lead-1.jpg',
  'machboos':           'https://www.remitly.com/blog/wp-content/uploads/2023/09/kuwait-machboos-scaled.jpg?wpId=24328',
  'harees':             'https://ychef.files.bbci.co.uk/624x351/p0391nrj.jpg',
  'luqaimat':           'https://d3h1lg3ksw6i6b.cloudfront.net/media/image/2024/02/20/80f466aa53f7425ca3f004d3e6a5de99_luqaimat-al-fanar-dubai.jpg',
  'balaleet':           'https://thumbs.dreamstime.com/b/emirati-balaleet-traditional-dish-presented-ornate-blue-white-bowl-thin-noodles-topped-bright-yellow-406874624.jpg',
  'arabic-coffee':      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSi6n3cOtvNopkEE7weF9b2Am4MCB4AxEIndaah7erKix0ajdcTSCmD4yQ&s=10',
  'dates':              'https://visitrasalkhaimah.com/wp-content/uploads/2023/11/dates-uae.jpeg',
  'kandura':            'https://www.shutterstock.com/shutterstock/videos/1105570639/thumb/1.jpg?ip=x480',
  'ghutra':             'https://www.dayoutdubai.ae/blog/wp-content/uploads/2021/02/formal-ghutra.jpg',
  'agal':               'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvee5MpvCJMCQyhWKwZsCH6vpufZy8d0-sCQz9TQlbO6rIOr771cyHrfM&s=10',
  'abaya':              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP7JXaqNOskbEYbDY4Vvu0m6nfMf_d8sZNanDcZpiEaOu6ryJhUZ8pKz4&s=10',
  'shayla':             'https://dannibindubai.com/wp-content/uploads/2021/04/abaya-and-shayla-emirati-woman.jpg',
  'barasti-houses':    'https://pbs.twimg.com/media/Cgu6aHNWYAAbM-X.jpg',
  'wind-towers':        'https://cdn1.matadornetwork.com/blogs/1/2021/06/Dubai-wind-towers-219649834-1200x852.jpg',
  'coral-stone-houses': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0JgMb4VitbIXlbkstmf8iVjxW40yVeoILTu7fYfIcl8lxYN-_vXjUYC8u&s=10',
  'forts-and-watchtowers': 'https://glimpsesofuae.com/wp-content/uploads/2023/11/Al-Fujairah-Fort-UAE-768x369.jpg',
  'traditional-mosques': 'https://glimpsesofuae.com/wp-content/uploads/2024/04/Mosques-in-the-UAE-2.jpg',
  'modern-architecture': 'https://www.visitdubai.com/-/media/images/leisure/detail-pages/explore-dubai/1-3-dubai-neighbourhoods-t34/dubai-neighborhood-business-bay.jpg',
  'al-ayala':           'https://s3.ap-south-1.amazonaws.com/production.media.hafla.com/db/product_images/people-and-services/al-ayallah-dancers/Images/660_412/-al-ayallah-dancers2.png',
  'traditional-instruments': 'https://storage.ghost.io/c/8e/d7/8ed7937e-239e-4c73-8661-3ab95a578ef0/content/images/2024/03/Your-paragraph-text--3--1.jpg',
  'nabati-poetry':      'https://www.al-monitor.com/sites/default/files/styles/article_hero_medium/public/2025-11/PHOTO-2025-10-29-21-38-36.jpg?h=ada05aa9&itok=egYzPxCv',
  'oral-traditions':    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBaHDnFL5sN7vGgR5PSJuYeQI3yBKHZuM3QCCwhmyWps0OexCEFbVPbRyS&s=10',
  'uae-flag':           'https://images.stockcake.com/public/3/b/4/3b4b282e-4e94-417f-b6b9-babe2b4f6408_medium/desert-flag-display-stockcake.jpg',
  'coat-of-arms':       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3b705xSGXnXoiKSDLv-nRGlhyc4e-z-0B7dhmor-1aw&s',
  'national-anthem':    'https://i.ytimg.com/vi/7jTZMcxAUP8/hqdefault.jpg',
  'national-bird':      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzaRB77TqqgyZEKNAwB6-zrNCT6VCB9KOLc02QLTlYBGDDRVPHXyOUC26B&s=10',
  'national-tree':      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGwEIkF8BjA60tEmXjELGN1OPRN3V7PwKiIiHRFxmEf9vMdcQ_fORk9ls&s=10',
  'national-animal':    'https://spaces.greatbigstory.com/uploads/2024/04/arabian-oryx-survive-extinction3-1024x576.jpg'
};

// ===== FESTIVAL IMAGES =====
export const festivalImages = {
  'national-day':      'https://tripventura.com/cdn/shop/articles/spectacular-firework-nominated-2023-11-27-05-33-56-utc-scaled-1_b23c09d4-fa0c-4acd-bdf5-f521cc9d4482.jpg?crop=center&height=600&v=1767063291&width=1200',
  'flag-day':          'https://www.timeoutdubai.com/cloud/timeoutdubai/2024/10/31/qMYceO0v-WhatsApp-Image-2024-10-31-at-14.13.36-1200x900.jpg',
  'commemoration-day': 'https://media.assettype.com/gulfnews%2Fimport%2F2015%2F11%2F23%2F1_16a0812401e.1624764_1925568966_16a0812401e_large.jpg?w=480&auto=format%2Ccompress&fit=max',
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

import { abuDhabiPlaces } from './abuDhabi';
import { dubaiPlaces } from './dubai';
import { sharjahPlaces } from './sharjah';
import { ajmanPlaces } from './ajman';
import { uaqPlaces } from './uaq';
import { rakPlaces } from './rak';
import { fujairahPlaces } from './fujairah';
import { emirateImages, locationImages } from './images';

const IMG={
  'abu-dhabi':'https://images.unsplash.com/photo-1694431452845-719ff1e1eea9?auto=format&fit=crop&w=1200&q=85',
  'dubai':'https://images.unsplash.com/photo-1658301839070-656a71f805d1?auto=format&fit=crop&w=1200&q=85',
  'sharjah':'https://images.unsplash.com/photo-1691932092749-981f9905a9fa?auto=format&fit=crop&w=1200&q=85',
  'ajman':'https://images.unsplash.com/photo-1655713532401-c5df95bc6e96?auto=format&fit=crop&w=1200&q=85',
  'umm-al-quwain':'https://images.unsplash.com/photo-1590453905958-d541322af7a5?auto=format&fit=crop&w=1200&q=85',
  'ras-al-khaimah':'https://images.unsplash.com/photo-1649283529996-d918a73b2687?auto=format&fit=crop&w=1200&q=85',
  'fujairah':'https://images.unsplash.com/photo-1674456944741-d9b8d523efa4?auto=format&fit=crop&w=1200&q=85'
};

export const emirates=[
{id:'abu-dhabi',name:'Abu Dhabi',arabic:'أبوظبي',tagline:'Capital of the UAE',icon:'🕌',image:IMG['abu-dhabi'],description:'The largest emirate and capital of the UAE, home to significant cultural institutions, natural reserves, and the seat of federal government.',locations:abuDhabiPlaces},
{id:'dubai',name:'Dubai',arabic:'دبي',tagline:'City of the Future',icon:'🏙️',image:IMG['dubai'],description:'A global hub of commerce, tourism, and innovation, blending historic districts with record-breaking modern achievements.',locations:dubaiPlaces},
{id:'sharjah',name:'Sharjah',arabic:'الشارقة',tagline:'Cultural Capital',icon:'📚',image:IMG['sharjah'],description:'The only emirate on both the Arabian Gulf and the Gulf of Oman, designated as a cultural capital for its museums and heritage.',locations:sharjahPlaces},
{id:'ajman',name:'Ajman',arabic:'عجمان',tagline:'Pearl of the Coast',icon:'⛵',image:IMG['ajman'],description:'The smallest emirate by area, rich in heritage with a historic fort, nature reserves, and mountain exclaves.',locations:ajmanPlaces},
{id:'umm-al-quwain',name:'Umm Al Quwain',arabic:'أم القيوين',tagline:'Timeless Heritage',icon:'🌊',image:IMG['umm-al-quwain'],description:'A tranquil emirate preserving its heritage with Bronze Age archaeological sites, mangrove reserves, and traditional harbour.',locations:uaqPlaces},
{id:'ras-al-khaimah',name:'Ras Al Khaimah',arabic:'رأس الخيمة',tagline:'Mountains & Sea',icon:'⛰️',image:IMG['ras-al-khaimah'],description:'The northernmost emirate, featuring the UAE\'s highest mountains, ancient forts, and a rich pearling and archaeological heritage.',locations:rakPlaces},
{id:'fujairah',name:'Fujairah',arabic:'الفجيرة',tagline:'East Coast Gem',icon:'🏰',image:IMG['fujairah'],description:'The only emirate located entirely on the east coast along the Gulf of Oman, known for its mountains, forts, and beaches.',locations:fujairahPlaces}
];

export const pillars=[
{name:'Culture',arabic:'الثقافة',icon:'🏛',color:'#4A90E2',description:'Explore Arabic language, UAE history, heritage, clothing, cuisine, architecture, festivals, music, poetry, and national symbols.',tags:['Arabic Language','UAE History','Heritage','Emirati Cuisine']},
{name:'Values',arabic:'القيم',icon:'🤝',color:'#2D6A4F',description:'Discover respect, compassion, hospitality, responsibility, tolerance, and global understanding through every experience.',tags:['Respect','Compassion','Hospitality','Tolerance']},
{name:'Citizenship',arabic:'المواطنة',icon:'🌱',color:'#C0392B',description:'Take part in missions around belonging, volunteering, conservation, sustainability, and community service.',tags:['Belonging','Volunteering','Conservation','Sustainability']}
];

abuDhabiPlaces.forEach(p=>p.emirate='abu-dhabi');
dubaiPlaces.forEach(p=>p.emirate='dubai');
sharjahPlaces.forEach(p=>p.emirate='sharjah');
ajmanPlaces.forEach(p=>p.emirate='ajman');
uaqPlaces.forEach(p=>p.emirate='umm-al-quwain');
rakPlaces.forEach(p=>p.emirate='ras-al-khaimah');
fujairahPlaces.forEach(p=>p.emirate='fujairah');

export const allPlaces=[
  ...abuDhabiPlaces, ...dubaiPlaces, ...sharjahPlaces, ...ajmanPlaces, ...uaqPlaces, ...rakPlaces, ...fujairahPlaces
];

// Override all images from the centralized image registry (src/data/images.js).
// This makes images.js the single source of truth — update any image there.
emirates.forEach(e => { if (emirateImages[e.id]) e.image = emirateImages[e.id]; });
allPlaces.forEach(p => { if (locationImages[p.id]) p.image = locationImages[p.id]; });
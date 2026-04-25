export type Language = "en" | "hi";

// ── i18n strings ─────────────────────────────────────────────────────────────

export const t = (lang: Language, key: string): string =>
  (translations[lang]?.[key] ?? translations["en"][key]) || key;

export const translations: Record<Language, Record<string, string>> = {
  en: {
    nav_home: "Home", nav_services: "Services", nav_electricians: "Electricians",
    nav_pricing: "Pricing", nav_warranty: "Warranty", nav_emergency: "Emergency",
    nav_book: "Book Now", nav_profile: "My Bookings", nav_login: "Login",
    hero_badge: "Now in 50+ Tier-2 & Tier-3 cities",
    hero_title: "Trusted Electrician,",
    hero_title2: "Fixed Price. Guaranteed.",
    hero_subtitle: "No hidden charges. Background-verified electricians. 90-day warranty on every job.",
    hero_cta_primary: "Book in 60 Seconds",
    hero_cta_secondary: "Emergency? 2 hrs",
    hero_trust1: "Verified Pros", hero_trust2: "Fixed Price",
    hero_trust3: "90-Day Warranty", hero_trust4: "2-Hr Emergency",
    stats_bookings: "Bookings Done", stats_cities: "Cities Covered",
    stats_rating: "Avg. Rating", stats_warranty: "Warranty Claims Resolved",
    services_title: "What do you need fixed?",
    services_subtitle: "All prices fixed. No surprises after the job.",
    pain_title: "We solved what others didn't",
    pain_1_title: "Hidden Charges", pain_2_title: "No Accountability",
    pain_3_title: "Not Available Here", pain_4_title: "Can't Trust Strangers",
    pain_1_desc: "Quoted ₹200, charged ₹800? We show the full price before you confirm.",
    pain_2_desc: "Electrician vanishes after job? Every job on BijliWala has a 90-day warranty.",
    pain_3_desc: "Big apps only in metros. We're in Palwal, Muzaffarpur, Kurnool, and 47 more cities.",
    pain_4_desc: "Every pro is background-verified, skill-tested, with real neighborhood reviews.",
    pricing_title: "No surprises. Ever.",
    pricing_subtitle: "Published rate card. See the price before you book.",
    emergency_title: "Electrical emergency?",
    emergency_subtitle: "Verified electrician in under 2 hours. Day or night.",
    emergency_cta: "Get Emergency Help Now",
    emergency_note: "₹49 emergency fee. Fixed. No surge pricing.",
    warranty_title: "Your 90-Day Warranty",
    warranty_subtitle: "Every job comes with a digital warranty card. Issue in 90 days? Free revisit.",
    trust_title: "Why your neighbors trust us",
    trust_subtitle: "Real people. Real reviews. From YOUR locality.",
    cta_title: "Ready to book?",
    cta_subtitle: "Fixed price. Verified pro. 90-day warranty. In your city.",
    cta_button: "Book a Service",
    cta_whatsapp: "Book on WhatsApp",
  },
  hi: {
    nav_home: "होम", nav_services: "सेवाएं", nav_electricians: "इलेक्ट्रीशियन",
    nav_pricing: "कीमत", nav_warranty: "वारंटी", nav_emergency: "आपातकाल",
    nav_book: "अभी बुक करें", nav_profile: "मेरी बुकिंग", nav_login: "लॉगिन",
    hero_badge: "50+ टियर-2 और टियर-3 शहरों में",
    hero_title: "भरोसेमंद इलेक्ट्रीशियन,",
    hero_title2: "तय कीमत। गारंटी के साथ।",
    hero_subtitle: "कोई छुपी कीमत नहीं। वेरिफाइड इलेक्ट्रीशियन। हर काम पर 90 दिन की वारंटी।",
    hero_cta_primary: "60 सेकंड में बुक करें",
    hero_cta_secondary: "इमरजेंसी? 2 घंटे में",
    hero_trust1: "वेरिफाइड प्रो", hero_trust2: "तय कीमत",
    hero_trust3: "90 दिन वारंटी", hero_trust4: "2 घंटे इमरजेंसी",
    stats_bookings: "काम पूरे", stats_cities: "शहर",
    stats_rating: "औसत रेटिंग", stats_warranty: "वारंटी क्लेम हल",
    services_title: "क्या ठीक करवाना है?",
    services_subtitle: "सभी कीमतें तय। काम के बाद कोई चौंकाने वाला बिल नहीं।",
    pain_title: "जो दूसरों ने नहीं सुलझाया, हमने किया",
    pain_1_title: "छुपी कीमतें", pain_2_title: "कोई जवाबदेही नहीं",
    pain_3_title: "यहाँ उपलब्ध नहीं", pain_4_title: "अजनबी पर भरोसा नहीं",
    pain_1_desc: "₹200 कहा, ₹800 लिया? हम पूरी कीमत पहले दिखाते हैं।",
    pain_2_desc: "काम के बाद गायब? BijliWala पर हर काम की 90 दिन की वारंटी है।",
    pain_3_desc: "बड़े ऐप सिर्फ बड़े शहरों में। हम पलवल, मुजफ्फरपुर में भी हैं।",
    pain_4_desc: "हर प्रो बैकग्राउंड-वेरिफाइड, स्किल-टेस्टेड है।",
    pricing_title: "कोई हैरानी नहीं। कभी नहीं।",
    pricing_subtitle: "प्रकाशित रेट कार्ड। बुक करने से पहले कीमत देखें।",
    emergency_title: "बिजली की इमरजेंसी?",
    emergency_subtitle: "2 घंटे में वेरिफाइड इलेक्ट्रीशियन। दिन हो या रात।",
    emergency_cta: "अभी इमरजेंसी मदद लें",
    emergency_note: "₹49 इमरजेंसी फीस। तय। कोई सर्ज प्राइसिंग नहीं।",
    warranty_title: "आपकी 90 दिन की वारंटी",
    warranty_subtitle: "हर काम पर डिजिटल वारंटी कार्ड। 90 दिन में दिक्कत? मुफ्त विजिट।",
    trust_title: "आपके पड़ोसी क्यों भरोसा करते हैं",
    trust_subtitle: "असली लोग। असली रिव्यू। आपके इलाके से।",
    cta_title: "बुक करने के लिए तैयार?",
    cta_subtitle: "तय कीमत। वेरिफाइड प्रो। 90 दिन वारंटी। आपके शहर में।",
    cta_button: "सेवा बुक करें",
    cta_whatsapp: "WhatsApp पर बुक करें",
  },
};

// ── Services ──────────────────────────────────────────────────────────────────

export const services = [
  { id: "switch", icon: "🔌", name_en: "Switch / Socket Repair", name_hi: "स्विच / सॉकेट", price: 99, time: "30 min", popular: true, category: "basic" },
  { id: "fan", icon: "💨", name_en: "Fan Installation", name_hi: "पंखा लगाना", price: 149, time: "45 min", popular: true, category: "basic" },
  { id: "light", icon: "💡", name_en: "Light / Fixture", name_hi: "लाइट / फिक्सचर", price: 99, time: "30 min", popular: false, category: "basic" },
  { id: "mcb", icon: "⚡", name_en: "MCB / Fuse Box", name_hi: "MCB / फ्यूज बॉक्स", price: 249, time: "1 hr", popular: false, category: "panel" },
  { id: "ac", icon: "❄️", name_en: "AC Power Point", name_hi: "AC पॉइंट", price: 349, time: "1.5 hr", popular: true, category: "heavy" },
  { id: "geyser", icon: "🚿", name_en: "Geyser Wiring", name_hi: "गीज़र वायरिंग", price: 299, time: "1 hr", popular: false, category: "heavy" },
  { id: "wiring", icon: "🔧", name_en: "New Point Wiring", name_hi: "नई वायरिंग", price: 399, time: "2 hr", popular: false, category: "panel" },
  { id: "panel", icon: "🏠", name_en: "Panel / Board Upgrade", name_hi: "पैनल अपग्रेड", price: 899, time: "3 hr", popular: false, category: "panel" },
  { id: "inverter", icon: "🔋", name_en: "Inverter Installation", name_hi: "इन्वर्टर लगाना", price: 499, time: "2 hr", popular: true, category: "heavy" },
  { id: "doorbell", icon: "🔔", name_en: "Doorbell / Video Bell", name_hi: "डोरबेल", price: 149, time: "30 min", popular: false, category: "basic" },
  { id: "exhaust", icon: "🌀", name_en: "Exhaust Fan", name_hi: "एग्जॉस्ट फैन", price: 129, time: "30 min", popular: false, category: "basic" },
  { id: "earthing", icon: "🌍", name_en: "Earthing / Leakage Check", name_hi: "अर्थिंग चेक", price: 199, time: "1 hr", popular: false, category: "panel" },
  { id: "motor", icon: "⚙️", name_en: "Motor / Pump Wiring", name_hi: "मोटर/पंप वायरिंग", price: 349, time: "1.5 hr", popular: false, category: "heavy" },
  { id: "stabilizer", icon: "🛡️", name_en: "Stabilizer Installation", name_hi: "स्टेबलाइज़र", price: 199, time: "45 min", popular: false, category: "heavy" },
  { id: "cctv", icon: "📷", name_en: "CCTV Wiring Point", name_hi: "CCTV वायरिंग", price: 249, time: "1 hr", popular: false, category: "special" },
  { id: "ev", icon: "🚗", name_en: "EV Charging Point", name_hi: "EV चार्जिंग पॉइंट", price: 599, time: "2 hr", popular: false, category: "special" },
];

// ── Electricians ─────────────────────────────────────────────────────────────

export interface Electrician {
  id: string;
  name: string;
  skill: string;
  skillLevel: 1 | 2 | 3;
  rating: number;
  reviews: number;
  jobs: number;
  city: string;
  area: string;
  verified: boolean;
  bgCheck: boolean;
  warranty: boolean;
  experience: number;
  languages: string[];
  badges: string[];
  localTrust: number;
  avatar: string;
  color: string;
  available: boolean;
  eta: number;
  phone: string;
  specialties: string[];
}

export const electricians: Electrician[] = [
  { id: "e1", name: "Ramesh Kumar", skill: "Master Electrician", skillLevel: 3, rating: 4.9, reviews: 312, jobs: 847, city: "Jaipur", area: "Mansarovar", verified: true, bgCheck: true, warranty: true, experience: 11, languages: ["Hindi", "Rajasthani"], badges: ["MCB Certified", "AC Specialist", "Top Rated"], localTrust: 28, avatar: "RK", color: "bg-orange-500", available: true, eta: 35, phone: "9876500001", specialties: ["mcb", "ac", "panel", "wiring"] },
  { id: "e2", name: "Suresh Yadav", skill: "Journeyman Electrician", skillLevel: 2, rating: 4.7, reviews: 198, jobs: 423, city: "Surat", area: "Udhna", verified: true, bgCheck: true, warranty: true, experience: 6, languages: ["Hindi", "Gujarati"], badges: ["Fan Specialist", "Quick Service"], localTrust: 15, avatar: "SY", color: "bg-blue-500", available: true, eta: 28, phone: "9876500002", specialties: ["fan", "light", "switch", "exhaust"] },
  { id: "e3", name: "Mohan Lal", skill: "Master Electrician", skillLevel: 3, rating: 4.8, reviews: 267, jobs: 612, city: "Chandigarh", area: "Sector 22", verified: true, bgCheck: true, warranty: true, experience: 14, languages: ["Hindi", "Punjabi"], badges: ["Panel Expert", "Emergency Ready", "Top Rated"], localTrust: 41, avatar: "ML", color: "bg-green-500", available: true, eta: 42, phone: "9876500003", specialties: ["panel", "wiring", "earthing", "mcb"] },
  { id: "e4", name: "Arjun Singh", skill: "Apprentice", skillLevel: 1, rating: 4.5, reviews: 67, jobs: 124, city: "Palwal", area: "New Colony", verified: true, bgCheck: true, warranty: true, experience: 2, languages: ["Hindi"], badges: ["Budget Friendly"], localTrust: 8, avatar: "AS", color: "bg-purple-500", available: true, eta: 20, phone: "9876500004", specialties: ["switch", "light", "fan", "doorbell"] },
  { id: "e5", name: "Dinesh Patel", skill: "Master Electrician", skillLevel: 3, rating: 4.9, reviews: 445, jobs: 1102, city: "Surat", area: "Katargam", verified: true, bgCheck: true, warranty: true, experience: 16, languages: ["Hindi", "Gujarati"], badges: ["Industrial Certified", "Emergency Ready", "Top Rated"], localTrust: 52, avatar: "DP", color: "bg-red-500", available: true, eta: 22, phone: "9876500005", specialties: ["inverter", "motor", "ev", "cctv"] },
  { id: "e6", name: "Rohit Sharma", skill: "Journeyman Electrician", skillLevel: 2, rating: 4.6, reviews: 134, jobs: 289, city: "Jaipur", area: "Vaishali Nagar", verified: true, bgCheck: true, warranty: true, experience: 5, languages: ["Hindi"], badges: ["AC Specialist"], localTrust: 19, avatar: "RS", color: "bg-cyan-500", available: true, eta: 31, phone: "9876500006", specialties: ["ac", "geyser", "fan", "stabilizer"] },
  { id: "e7", name: "Vijay Kumar", skill: "Journeyman Electrician", skillLevel: 2, rating: 4.7, reviews: 156, jobs: 334, city: "Muzaffarpur", area: "Sadar Bazar", verified: true, bgCheck: true, warranty: true, experience: 7, languages: ["Hindi", "Maithili"], badges: ["Quick Service", "Inverter Expert"], localTrust: 23, avatar: "VK", color: "bg-teal-500", available: true, eta: 38, phone: "9876500007", specialties: ["inverter", "fan", "switch", "light"] },
  { id: "e8", name: "Santosh Reddy", skill: "Master Electrician", skillLevel: 3, rating: 4.8, reviews: 289, jobs: 671, city: "Kurnool", area: "Bellary Road", verified: true, bgCheck: true, warranty: true, experience: 12, languages: ["Telugu", "Hindi"], badges: ["Panel Expert", "Top Rated"], localTrust: 34, avatar: "SR", color: "bg-amber-500", available: true, eta: 29, phone: "9876500008", specialties: ["panel", "mcb", "wiring", "earthing"] },
  { id: "e9", name: "Pradeep Verma", skill: "Journeyman Electrician", skillLevel: 2, rating: 4.6, reviews: 112, jobs: 245, city: "Agra", area: "Sikandra", verified: true, bgCheck: true, warranty: true, experience: 6, languages: ["Hindi"], badges: ["Budget Friendly", "Quick Service"], localTrust: 16, avatar: "PV", color: "bg-lime-600", available: true, eta: 33, phone: "9876500009", specialties: ["switch", "fan", "light", "geyser"] },
  { id: "e10", name: "Harish Gupta", skill: "Apprentice", skillLevel: 1, rating: 4.4, reviews: 45, jobs: 89, city: "Bhilwara", area: "Shastri Nagar", verified: true, bgCheck: true, warranty: true, experience: 1, languages: ["Hindi", "Rajasthani"], badges: ["Budget Friendly"], localTrust: 6, avatar: "HG", color: "bg-pink-500", available: true, eta: 25, phone: "9876500010", specialties: ["switch", "light", "doorbell", "exhaust"] },
  { id: "e11", name: "Ravi Tiwari", skill: "Master Electrician", skillLevel: 3, rating: 4.9, reviews: 378, jobs: 892, city: "Dehradun", area: "Rajpur Road", verified: true, bgCheck: true, warranty: true, experience: 13, languages: ["Hindi"], badges: ["Emergency Ready", "Top Rated", "EV Certified"], localTrust: 47, avatar: "RT", color: "bg-violet-500", available: true, eta: 27, phone: "9876500011", specialties: ["ev", "cctv", "panel", "inverter"] },
  { id: "e12", name: "Manoj Yadav", skill: "Journeyman Electrician", skillLevel: 2, rating: 4.7, reviews: 167, jobs: 358, city: "Dhanbad", area: "Hirapur", verified: true, bgCheck: true, warranty: true, experience: 8, languages: ["Hindi", "Bengali"], badges: ["Motor Specialist"], localTrust: 21, avatar: "MY", color: "bg-stone-500", available: false, eta: 55, phone: "9876500012", specialties: ["motor", "panel", "wiring", "earthing"] },
  { id: "e13", name: "Anil Kumar", skill: "Journeyman Electrician", skillLevel: 2, rating: 4.5, reviews: 98, jobs: 201, city: "Sikar", area: "Station Road", verified: true, bgCheck: true, warranty: true, experience: 5, languages: ["Hindi", "Rajasthani"], badges: ["Quick Service"], localTrust: 12, avatar: "AK", color: "bg-sky-500", available: true, eta: 31, phone: "9876500013", specialties: ["switch", "fan", "light", "stabilizer"] },
  { id: "e14", name: "Ganesh Prasad", skill: "Master Electrician", skillLevel: 3, rating: 4.8, reviews: 231, jobs: 527, city: "Madurai", area: "Anna Nagar", verified: true, bgCheck: true, warranty: true, experience: 10, languages: ["Tamil", "Hindi"], badges: ["AC Specialist", "Top Rated"], localTrust: 38, avatar: "GP", color: "bg-emerald-500", available: true, eta: 36, phone: "9876500014", specialties: ["ac", "fan", "geyser", "cctv"] },
  { id: "e15", name: "Brijesh Mishra", skill: "Journeyman Electrician", skillLevel: 2, rating: 4.6, reviews: 143, jobs: 307, city: "Chandigarh", area: "Sector 35", verified: true, bgCheck: true, warranty: true, experience: 7, languages: ["Hindi", "Punjabi"], badges: ["Inverter Expert", "Quick Service"], localTrust: 22, avatar: "BM", color: "bg-rose-500", available: true, eta: 39, phone: "9876500015", specialties: ["inverter", "switch", "fan", "motor"] },
];

export const getElectriciansForCity = (city: string): Electrician[] =>
  electricians.filter((e) => e.city.toLowerCase() === city.toLowerCase());

export const getNearestAvailableElectrician = (city: string): Electrician | null => {
  const cityPros = getElectriciansForCity(city).filter((e) => e.available);
  if (cityPros.length > 0) return cityPros.sort((a, b) => a.eta - b.eta)[0];
  return electricians.filter((e) => e.available).sort((a, b) => a.eta - b.eta)[0] ?? null;
};

// ── Pricing categories ────────────────────────────────────────────────────────

export const pricingCategories = [
  {
    category: "Switches & Sockets",
    category_hi: "स्विच और सॉकेट",
    items: [
      { name: "Switch repair / replacement", name_hi: "स्विच ठीक करना", price: 99 },
      { name: "2-pin socket", name_hi: "2-पिन सॉकेट", price: 99 },
      { name: "3-pin socket (5A)", name_hi: "3-पिन सॉकेट 5A", price: 119 },
      { name: "3-pin socket (15A AC)", name_hi: "3-पिन सॉकेट 15A", price: 149 },
      { name: "USB charging socket", name_hi: "USB चार्जिंग सॉकेट", price: 179 },
      { name: "Dimmer switch", name_hi: "डिमर स्विच", price: 199 },
    ],
  },
  {
    category: "Fans & Lights",
    category_hi: "पंखे और लाइट",
    items: [
      { name: "Ceiling fan installation", name_hi: "सीलिंग फैन लगाना", price: 149 },
      { name: "Ceiling fan removal", name_hi: "सीलिंग फैन हटाना", price: 99 },
      { name: "Exhaust fan installation", name_hi: "एग्जॉस्ट फैन", price: 129 },
      { name: "LED bulb / tube fitting", name_hi: "LED बल्ब / ट्यूब", price: 99 },
      { name: "Chandelier / hanging light", name_hi: "झूमर / हैंगिंग लाइट", price: 199 },
      { name: "Spot light / downlight", name_hi: "स्पॉट लाइट", price: 149 },
    ],
  },
  {
    category: "Heavy Appliances",
    category_hi: "बड़े उपकरण",
    items: [
      { name: "AC power point (15A)", name_hi: "AC पावर पॉइंट", price: 349 },
      { name: "Geyser wiring", name_hi: "गीज़र वायरिंग", price: 299 },
      { name: "Washing machine point", name_hi: "वॉशिंग मशीन पॉइंट", price: 249 },
      { name: "Water pump wiring", name_hi: "वाटर पंप वायरिंग", price: 349 },
      { name: "Inverter / UPS installation", name_hi: "इन्वर्टर / UPS", price: 499 },
      { name: "Stabilizer installation", name_hi: "स्टेबलाइज़र", price: 199 },
    ],
  },
  {
    category: "Wiring & Panels",
    category_hi: "वायरिंग और पैनल",
    items: [
      { name: "New point wiring (per point)", name_hi: "नया पॉइंट (प्रति)", price: 399 },
      { name: "MCB replacement (single)", name_hi: "MCB बदलना", price: 249 },
      { name: "MCB box upgrade (8-way)", name_hi: "MCB बॉक्स (8-वे)", price: 899 },
      { name: "Earth leakage check + fix", name_hi: "अर्थ लीकेज चेक", price: 199 },
      { name: "Conduit wiring (per metre)", name_hi: "कंड्यूट वायरिंग/मीटर", price: 45 },
    ],
  },
  {
    category: "Special Services",
    category_hi: "विशेष सेवाएं",
    items: [
      { name: "EV charging point", name_hi: "EV चार्जिंग पॉइंट", price: 599 },
      { name: "CCTV wiring point", name_hi: "CCTV वायरिंग", price: 249 },
      { name: "Doorbell / video bell", name_hi: "डोरबेल", price: 149 },
      { name: "Smart switch installation", name_hi: "स्मार्ट स्विच", price: 299 },
      { name: "Annual safety inspection", name_hi: "वार्षिक सेफ्टी चेक", price: 499 },
    ],
  },
];

// ── Cities ────────────────────────────────────────────────────────────────────

export const cities = [
  "Jaipur", "Surat", "Chandigarh", "Palwal", "Muzaffarpur",
  "Kurnool", "Madurai", "Bhilwara", "Sikar", "Dhanbad",
  "Agra", "Dehradun", "Korba", "Durg", "Shimla",
  "Meerut", "Aligarh", "Bareilly", "Moradabad", "Firozabad",
];

// ── Reviews ───────────────────────────────────────────────────────────────────

export const reviews = [
  { name: "Priya Sharma", city: "Jaipur", area: "Vaishali Nagar", service: "Fan Installation", rating: 5, text: "Ramesh bhaiya came exactly on time. Fixed price. No drama. Will use again!", text_hi: "रमेश भैया बिल्कुल समय पर आए। तय कीमत। कोई झंझट नहीं।", avatar: "PS", color: "bg-pink-500", time: "2 days ago", localCount: 12 },
  { name: "Vikram Patel", city: "Surat", area: "Udhna", service: "MCB Box Upgrade", rating: 5, text: "Finally an app that shows price before booking! No more arguments about the bill.", text_hi: "आखिरकार एक ऐप जो बुकिंग से पहले कीमत दिखाती है!", avatar: "VP", color: "bg-indigo-500", time: "5 days ago", localCount: 7 },
  { name: "Sunita Devi", city: "Palwal", area: "Model Town", service: "Switch Repair", rating: 5, text: "I was surprised this app even worked in Palwal. Electrician came in 40 minutes!", text_hi: "मुझे हैरानी थी कि यह ऐप पलवल में भी काम करती है।", avatar: "SD", color: "bg-teal-500", time: "1 week ago", localCount: 4 },
];

// ── EMI tiers ─────────────────────────────────────────────────────────────────

export const emiTiers = [
  { minAmount: 500, months: 3, monthlyText: "₹{m}/mo × 3" },
  { minAmount: 1000, months: 6, monthlyText: "₹{m}/mo × 6" },
  { minAmount: 2000, months: 12, monthlyText: "₹{m}/mo × 12" },
];

export const getEmiOption = (amount: number) => {
  const tier = [...emiTiers].reverse().find((t) => amount >= t.minAmount);
  if (!tier) return null;
  const monthly = Math.ceil(amount / tier.months);
  return { months: tier.months, monthly, label: `₹${monthly}/mo × ${tier.months} months` };
};

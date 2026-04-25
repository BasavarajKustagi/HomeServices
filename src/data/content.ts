export type Language = "en" | "hi";

export const translations: Record<Language, Record<string, string>> = {
  en: {
    // Nav
    nav_home: "Home",
    nav_services: "Services",
    nav_electricians: "Electricians",
    nav_pricing: "Pricing",
    nav_warranty: "Warranty",
    nav_emergency: "Emergency",
    nav_book: "Book Now",

    // Hero
    hero_badge: "Now in 50+ Tier-2 & Tier-3 cities",
    hero_title: "Trusted Electrician,",
    hero_title2: "Fixed Price. Guaranteed.",
    hero_subtitle:
      "No hidden charges. No surprises. Background-verified electricians with 90-day warranty on every job.",
    hero_cta_primary: "Book in 60 Seconds",
    hero_cta_secondary: "Emergency? Call in 2 hrs",
    hero_trust1: "Verified Pros",
    hero_trust2: "Fixed Price",
    hero_trust3: "90-Day Warranty",
    hero_trust4: "2-Hr Emergency",

    // Stats
    stats_bookings: "Bookings Done",
    stats_cities: "Cities Covered",
    stats_rating: "Avg. Rating",
    stats_warranty: "Warranty Claims Resolved",

    // Services
    services_title: "What do you need fixed?",
    services_subtitle: "All prices fixed. No surprises after the job.",

    // Pain points
    pain_title: "We solved what others didn't",
    pain_1_title: "Hidden Charges",
    pain_1_desc: "Quoted ₹200, charged ₹800? We show the full price before you confirm.",
    pain_2_title: "No Accountability",
    pain_2_desc: "Electrician vanishes after job? Every job on BijliWala has a 90-day warranty.",
    pain_3_title: "Not Available Here",
    pain_3_desc: "Big apps only in metros. We're in Palwal, Muzaffarpur, Kurnool, and 47 more cities.",
    pain_4_title: "Can't Trust Strangers",
    pain_4_desc: "Every pro is background-verified, skill-tested, and has real neighborhood reviews.",

    // Pricing
    pricing_title: "No surprises. Ever.",
    pricing_subtitle: "Published rate card. You see the price before you book.",
    pricing_note: "Material cost extra if parts replacement needed. Shown clearly before confirmation.",

    // Emergency
    emergency_title: "Electrical emergency?",
    emergency_subtitle: "We dispatch a verified electrician to you within 2 hours. Day or night.",
    emergency_cta: "Get Emergency Help Now",
    emergency_note: "₹49 emergency fee. Fixed. No surge pricing.",

    // Warranty
    warranty_title: "Your 90-Day Warranty",
    warranty_subtitle: "Every job comes with a digital warranty card. Issue in 90 days? Free revisit. No questions.",

    // Trust
    trust_title: "Why your neighbors trust us",
    trust_subtitle: "Real people. Real reviews. From YOUR locality.",

    // CTA
    cta_title: "Ready to book?",
    cta_subtitle: "Fixed price. Verified pro. 90-day warranty. In your city.",
    cta_button: "Book a Service",
    cta_whatsapp: "Book on WhatsApp",
  },
  hi: {
    // Nav
    nav_home: "होम",
    nav_services: "सेवाएं",
    nav_electricians: "इलेक्ट्रीशियन",
    nav_pricing: "कीमत",
    nav_warranty: "वारंटी",
    nav_emergency: "आपातकाल",
    nav_book: "अभी बुक करें",

    // Hero
    hero_badge: "50+ टियर-2 और टियर-3 शहरों में",
    hero_title: "भरोसेमंद इलेक्ट्रीशियन,",
    hero_title2: "तय कीमत। गारंटी के साथ।",
    hero_subtitle:
      "कोई छुपी हुई कीमत नहीं। कोई चौंकाने वाला बिल नहीं। वेरिफाइड इलेक्ट्रीशियन, हर काम पर 90 दिन की वारंटी।",
    hero_cta_primary: "60 सेकंड में बुक करें",
    hero_cta_secondary: "इमरजेंसी? 2 घंटे में",
    hero_trust1: "वेरिफाइड प्रो",
    hero_trust2: "तय कीमत",
    hero_trust3: "90 दिन वारंटी",
    hero_trust4: "2 घंटे इमरजेंसी",

    // Stats
    stats_bookings: "काम पूरे हुए",
    stats_cities: "शहर",
    stats_rating: "औसत रेटिंग",
    stats_warranty: "वारंटी क्लेम हल",

    // Services
    services_title: "क्या ठीक करवाना है?",
    services_subtitle: "सभी कीमतें तय हैं। काम के बाद कोई चौंकाने वाला बिल नहीं।",

    // Pain points
    pain_title: "जो दूसरों ने नहीं सुलझाया, हमने किया",
    pain_1_title: "छुपी कीमतें",
    pain_1_desc: "₹200 कहा, ₹800 लिया? हम पूरी कीमत पहले दिखाते हैं।",
    pain_2_title: "कोई जवाबदेही नहीं",
    pain_2_desc: "काम के बाद गायब? BijliWala पर हर काम की 90 दिन की वारंटी है।",
    pain_3_title: "यहाँ उपलब्ध नहीं",
    pain_3_desc: "बड़े ऐप सिर्फ बड़े शहरों में। हम पलवल, मुजफ्फरपुर, कुरनूल में भी हैं।",
    pain_4_title: "अजनबी पर भरोसा नहीं",
    pain_4_desc: "हर प्रो बैकग्राउंड-वेरिफाइड, स्किल-टेस्टेड और असली पड़ोस के रिव्यू वाला है।",

    // Pricing
    pricing_title: "कोई हैरानी नहीं। कभी नहीं।",
    pricing_subtitle: "प्रकाशित रेट कार्ड। बुक करने से पहले कीमत देखें।",
    pricing_note: "अगर पार्ट्स बदलने की जरूरत हो तो सामग्री की लागत अलग। पुष्टि से पहले दिखाई जाएगी।",

    // Emergency
    emergency_title: "बिजली की इमरजेंसी?",
    emergency_subtitle: "हम 2 घंटे में वेरिफाइड इलेक्ट्रीशियन भेजते हैं। दिन हो या रात।",
    emergency_cta: "अभी इमरजेंसी मदद लें",
    emergency_note: "₹49 इमरजेंसी फीस। तय। कोई सर्ज प्राइसिंग नहीं।",

    // Warranty
    warranty_title: "आपकी 90 दिन की वारंटी",
    warranty_subtitle: "हर काम पर डिजिटल वारंटी कार्ड। 90 दिन में कोई दिक्कत? मुफ्त में फिर आएंगे।",

    // Trust
    trust_title: "आपके पड़ोसी क्यों भरोसा करते हैं",
    trust_subtitle: "असली लोग। असली रिव्यू। आपके इलाके से।",

    // CTA
    cta_title: "बुक करने के लिए तैयार?",
    cta_subtitle: "तय कीमत। वेरिफाइड प्रो। 90 दिन वारंटी। आपके शहर में।",
    cta_button: "सेवा बुक करें",
    cta_whatsapp: "WhatsApp पर बुक करें",
  },
};

export const services = [
  { id: "switch", icon: "🔌", name_en: "Switch / Socket Repair", name_hi: "स्विच / सॉकेट", price: 99, time: "30 min", popular: true },
  { id: "fan", icon: "💨", name_en: "Fan Installation", name_hi: "पंखा लगाना", price: 149, time: "45 min", popular: true },
  { id: "light", icon: "💡", name_en: "Light / Fixture", name_hi: "लाइट / फिक्सचर", price: 99, time: "30 min", popular: false },
  { id: "mcb", icon: "⚡", name_en: "MCB / Fuse Box", name_hi: "MCB / फ्यूज बॉक्स", price: 249, time: "1 hr", popular: false },
  { id: "ac", icon: "❄️", name_en: "AC Point Install", name_hi: "AC पॉइंट", price: 349, time: "1.5 hr", popular: true },
  { id: "geyser", icon: "🚿", name_en: "Geyser Wiring", name_hi: "गीज़र वायरिंग", price: 299, time: "1 hr", popular: false },
  { id: "wiring", icon: "🔧", name_en: "New Point Wiring", name_hi: "नई वायरिंग", price: 399, time: "2 hr", popular: false },
  { id: "panel", icon: "🏠", name_en: "Panel / Board Upgrade", name_hi: "पैनल अपग्रेड", price: 899, time: "3 hr", popular: false },
];

export const electricians = [
  {
    id: "e1",
    name: "Ramesh Kumar",
    skill: "Master Electrician",
    skillLevel: 3,
    rating: 4.9,
    reviews: 312,
    jobs: 847,
    city: "Jaipur",
    area: "Mansarovar",
    verified: true,
    bgCheck: true,
    warranty: true,
    experience: 11,
    languages: ["Hindi", "Rajasthani"],
    badges: ["MCB Certified", "AC Specialist", "Top Rated"],
    localTrust: 28,
    avatar: "RK",
    color: "bg-orange-500",
    available: true,
    eta: 45,
  },
  {
    id: "e2",
    name: "Suresh Yadav",
    skill: "Journeyman Electrician",
    skillLevel: 2,
    rating: 4.7,
    reviews: 198,
    jobs: 423,
    city: "Surat",
    area: "Udhna",
    verified: true,
    bgCheck: true,
    warranty: true,
    experience: 6,
    languages: ["Hindi", "Gujarati"],
    badges: ["Fan Specialist", "Quick Service"],
    localTrust: 15,
    avatar: "SY",
    color: "bg-blue-500",
    available: true,
    eta: 30,
  },
  {
    id: "e3",
    name: "Mohan Lal",
    skill: "Master Electrician",
    skillLevel: 3,
    rating: 4.8,
    reviews: 267,
    jobs: 612,
    city: "Chandigarh",
    area: "Sector 22",
    verified: true,
    bgCheck: true,
    warranty: true,
    experience: 14,
    languages: ["Hindi", "Punjabi"],
    badges: ["Panel Expert", "Emergency Ready", "Top Rated"],
    localTrust: 41,
    avatar: "ML",
    color: "bg-green-500",
    available: false,
    eta: 90,
  },
  {
    id: "e4",
    name: "Arjun Singh",
    skill: "Apprentice",
    skillLevel: 1,
    rating: 4.5,
    reviews: 67,
    jobs: 124,
    city: "Palwal",
    area: "New Colony",
    verified: true,
    bgCheck: true,
    warranty: true,
    experience: 2,
    languages: ["Hindi"],
    badges: ["Budget Friendly"],
    localTrust: 8,
    avatar: "AS",
    color: "bg-purple-500",
    available: true,
    eta: 20,
  },
];

export const warranties = [
  {
    id: "W-2024-0847",
    service: "Fan Installation",
    date: "2024-12-10",
    electrician: "Ramesh Kumar",
    amount: 149,
    status: "active",
    expiresAt: "2025-03-10",
    daysLeft: 44,
  },
  {
    id: "W-2024-0612",
    service: "Switch Repair ×3",
    date: "2024-11-22",
    electrician: "Suresh Yadav",
    amount: 297,
    status: "active",
    expiresAt: "2025-02-20",
    daysLeft: 26,
  },
  {
    id: "W-2024-0299",
    service: "MCB Box Upgrade",
    date: "2024-09-01",
    electrician: "Mohan Lal",
    amount: 249,
    status: "expired",
    expiresAt: "2024-11-30",
    daysLeft: 0,
  },
];

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
    ],
  },
  {
    category: "Fans & Lights",
    category_hi: "पंखे और लाइट",
    items: [
      { name: "Ceiling fan installation", name_hi: "सीलिंग फैन लगाना", price: 149 },
      { name: "Ceiling fan removal", name_hi: "सीलिंग फैन हटाना", price: 99 },
      { name: "Exhaust fan installation", name_hi: "एग्जॉस्ट फैन", price: 129 },
      { name: "LED light fitting", name_hi: "LED लाइट", price: 99 },
      { name: "Chandelier / hanging light", name_hi: "झूमर / हैंगिंग लाइट", price: 199 },
    ],
  },
  {
    category: "Heavy Appliances",
    category_hi: "बड़े उपकरण",
    items: [
      { name: "AC power point", name_hi: "AC पावर पॉइंट", price: 349 },
      { name: "Geyser installation wiring", name_hi: "गीज़र वायरिंग", price: 299 },
      { name: "Washing machine point", name_hi: "वॉशिंग मशीन पॉइंट", price: 249 },
      { name: "Water pump wiring", name_hi: "वाटर पंप वायरिंग", price: 349 },
    ],
  },
  {
    category: "Wiring & Panels",
    category_hi: "वायरिंग और पैनल",
    items: [
      { name: "New point wiring (per point)", name_hi: "नया पॉइंट (प्रति पॉइंट)", price: 399 },
      { name: "MCB replacement", name_hi: "MCB बदलना", price: 249 },
      { name: "MCB box upgrade (8-way)", name_hi: "MCB बॉक्स (8-वे)", price: 899 },
      { name: "Earth leakage check", name_hi: "अर्थ लीकेज चेक", price: 199 },
    ],
  },
];

export const cities = [
  "Jaipur", "Surat", "Chandigarh", "Palwal", "Muzaffarpur",
  "Kurnool", "Madurai", "Bhilwara", "Sikar", "Dhanbad",
  "Korba", "Durg", "Shimla", "Dehradun", "Agra",
];

export const reviews = [
  {
    name: "Priya Sharma",
    city: "Jaipur",
    area: "Vaishali Nagar",
    service: "Fan Installation",
    rating: 5,
    text: "Ramesh bhaiya came exactly on time. Fixed price. No drama. Will use again!",
    text_hi: "रमेश भैया बिल्कुल समय पर आए। तय कीमत। कोई झंझट नहीं। फिर से बुलाऊंगी!",
    avatar: "PS",
    color: "bg-pink-500",
    time: "2 days ago",
    localCount: 12,
  },
  {
    name: "Vikram Patel",
    city: "Surat",
    area: "Udhna",
    service: "MCB Box Upgrade",
    rating: 5,
    text: "Finally an app that shows price before booking! No more arguments about the bill.",
    text_hi: "आखिरकार एक ऐप जो बुकिंग से पहले कीमत दिखाती है! बिल पर बहस नहीं।",
    avatar: "VP",
    color: "bg-indigo-500",
    time: "5 days ago",
    localCount: 7,
  },
  {
    name: "Sunita Devi",
    city: "Palwal",
    area: "Model Town",
    service: "Switch Repair",
    rating: 5,
    text: "I was surprised this app even worked in Palwal. Electrician came in 40 minutes!",
    text_hi: "मुझे हैरानी थी कि यह ऐप पलवल में भी काम करती है। इलेक्ट्रीशियन 40 मिनट में आया!",
    avatar: "SD",
    color: "bg-teal-500",
    time: "1 week ago",
    localCount: 4,
  },
];

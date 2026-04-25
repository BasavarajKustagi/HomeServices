"use client";

import { useState } from "react";
import Link from "next/link";
import {
  CheckCircle2, Upload, ArrowRight, Zap, TrendingUp,
  Shield, Clock, Star, ChevronDown, ChevronUp,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useApp } from "@/context/AppContext";

type Step = "info" | "docs" | "skills" | "done";

export default function ProPage() {
  const { state: { lang } } = useApp();
  const hi = lang === "hi";

  const [step, setStep] = useState<Step>("info");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [form, setForm] = useState({
    name: "", phone: "", city: "", experience: "", languages: [] as string[],
    aadhar: false, police: false, iti: false,
    skills: [] as string[],
  });

  const allLanguages = ["Hindi", "English", "Gujarati", "Telugu", "Tamil", "Punjabi", "Marathi", "Bengali", "Bhojpuri", "Maithili"];
  const allSkills = ["Switches & Sockets", "Fan & Lights", "AC & Geyser", "Inverter & UPS", "MCB & Panel", "Wiring", "Motor & Pump", "CCTV", "EV Charging", "Emergency"];

  const toggleItem = (field: "languages" | "skills", value: string) => {
    setForm((f) => ({
      ...f,
      [field]: f[field].includes(value) ? f[field].filter((i: string) => i !== value) : [...f[field], value],
    }));
  };

  const earnings = [
    { jobs: 5, label: hi ? "5 काम/हफ्ता" : "5 jobs/week", earning: "₹2,000–3,500" },
    { jobs: 10, label: hi ? "10 काम/हफ्ता" : "10 jobs/week", earning: "₹4,500–7,000" },
    { jobs: 20, label: hi ? "20 काम/हफ्ता" : "20 jobs/week", earning: "₹9,000–14,000" },
  ];

  const faqs = [
    { q_en: "Do I need to pay anything to join?", q_hi: "जुड़ने के लिए कुछ देना होगा?", a_en: "No. Registration is completely free. We only charge 20% commission per completed job.", a_hi: "नहीं। रजिस्ट्रेशन बिल्कुल मुफ्त है। हम केवल पूरे हुए काम पर 20% कमीशन लेते हैं।" },
    { q_en: "How do I receive payments?", q_hi: "पेमेंट कैसे मिलेगी?", a_en: "Cash on job completion, or UPI directly to your account. Weekly settlement for all digital payments.", a_hi: "काम पूरा होने पर नकद, या UPI सीधे आपके अकाउंट में। सभी डिजिटल पेमेंट का साप्ताहिक निपटान।" },
    { q_en: "Can I work in multiple cities?", q_hi: "क्या मैं कई शहरों में काम कर सकता हूँ?", a_en: "Yes. You can add up to 3 service areas. You receive jobs from all of them.", a_hi: "हाँ। आप 3 तक सेवा क्षेत्र जोड़ सकते हैं। सभी से काम मिलेगा।" },
    { q_en: "What if a customer files a warranty claim?", q_hi: "अगर ग्राहक वारंटी क्लेम करे?", a_en: "Within 90 days for the same issue, you revisit at no extra cost. BijliWala covers your travel cost.", a_hi: "90 दिन के अंदर उसी समस्या के लिए आपको मुफ्त दोबारा जाना होगा। यात्रा खर्च BijliWala देगा।" },
  ];

  if (step === "done") {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-1 pt-20 flex items-center justify-center px-4">
          <div className="text-center max-w-sm">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              {hi ? "आवेदन मिल गया! 🎉" : "Application received! 🎉"}
            </h2>
            <p className="text-slate-500 text-sm mb-2">
              {hi ? "हम 24 घंटे में आपको WhatsApp पर संपर्क करेंगे।" : "We'll contact you on WhatsApp within 24 hours."}
            </p>
            <p className="text-slate-400 text-xs mb-6">
              {hi ? `+91 ${form.phone}` : `+91 ${form.phone}`}
            </p>
            <div className="bg-orange-50 rounded-2xl p-4 text-left mb-6">
              <h4 className="font-bold text-slate-900 mb-3 text-sm">{hi ? "अगले कदम" : "What happens next"}</h4>
              <div className="space-y-2">
                {[
                  hi ? "हमारा टीम मेंबर आपको कॉल करेगा" : "Our team member will call you",
                  hi ? "दस्तावेज़ वेरिफिकेशन (30 मिनट)" : "Document verification (30 min)",
                  hi ? "स्किल टेस्ट (आसान, 15 मिनट)" : "Quick skill test (15 min)",
                  hi ? "प्रोफाइल लाइव हो जाएगी" : "Profile goes live — start earning",
                ].map((s, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-slate-700">
                    <div className="w-5 h-5 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0">{i + 1}</div>
                    {s}
                  </div>
                ))}
              </div>
            </div>
            <Link href="/" className="text-slate-500 text-sm hover:text-orange-600">← {hi ? "होम पर जाएं" : "Back to home"}</Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 pt-20">
        {/* Hero */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 py-14">
          <div className="max-w-4xl mx-auto px-4 text-center text-white">
            <div className="inline-flex items-center gap-2 bg-orange-500/20 border border-orange-400/30 rounded-full px-4 py-1.5 mb-4">
              <Zap className="w-4 h-4 text-orange-400" />
              <span className="text-orange-300 text-sm font-medium">{hi ? "इलेक्ट्रीशियन के लिए" : "For Electricians"}</span>
            </div>
            <h1 className="text-4xl font-bold mb-3">
              {hi ? "BijliWala Pro बनें" : "Join as a BijliWala Pro"}
            </h1>
            <p className="text-slate-300 text-lg max-w-xl mx-auto mb-6">
              {hi
                ? "गारंटीड काम पाएं। तय समय पर पेमेंट। अपनी मर्जी का शेड्यूल।"
                : "Get guaranteed jobs. Fixed-time payments. Work on your schedule."}
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              {[
                { en: "Free to join", hi: "जुड़ना मुफ्त", icon: "✅" },
                { en: "Weekly payouts", hi: "साप्ताहिक भुगतान", icon: "💰" },
                { en: "Hindi support", hi: "हिंदी सपोर्ट", icon: "🗣️" },
                { en: "Work near home", hi: "घर के पास काम", icon: "📍" },
              ].map((b) => (
                <span key={b.en} className="text-slate-300">{b.icon} {hi ? b.hi : b.en}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Earnings calculator */}
        <div className="bg-orange-50 border-b border-orange-100">
          <div className="max-w-4xl mx-auto px-4 py-6">
            <p className="text-center font-semibold text-slate-800 mb-4">{hi ? "कितना कमा सकते हैं?" : "How much can you earn?"}</p>
            <div className="grid grid-cols-3 gap-4">
              {earnings.map((e) => (
                <div key={e.jobs} className="bg-white rounded-xl p-4 text-center border border-orange-200">
                  <p className="text-slate-500 text-xs mb-1">{e.label}</p>
                  <p className="font-bold text-orange-600 text-xl">{e.earning}</p>
                  <p className="text-slate-400 text-xs">{hi ? "प्रति सप्ताह" : "per week"}</p>
                </div>
              ))}
            </div>
            <p className="text-center text-xs text-slate-500 mt-3">
              {hi ? "* अनुमानित। शहर और स्किल के अनुसार अलग हो सकता है।" : "* Estimated. Varies by city and skill level."}
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2">
              {/* Progress */}
              <div className="flex gap-2 mb-6">
                {(["info", "docs", "skills"] as Step[]).map((s, i) => (
                  <div key={s} className={`flex-1 h-1.5 rounded-full ${
                    ["info", "docs", "skills"].indexOf(step) >= i ? "bg-orange-500" : "bg-slate-200"
                  }`} />
                ))}
              </div>

              {step === "info" && (
                <div className="bg-white rounded-2xl p-6 card-shadow">
                  <h2 className="font-bold text-slate-900 mb-5 text-lg">{hi ? "बुनियादी जानकारी" : "Basic Information"}</h2>
                  <div className="space-y-4">
                    {[
                      { key: "name", label: hi ? "पूरा नाम" : "Full Name", placeholder: hi ? "रमेश कुमार" : "Ramesh Kumar", type: "text" },
                      { key: "phone", label: hi ? "मोबाइल नंबर" : "Mobile Number", placeholder: "9876543210", type: "tel" },
                      { key: "city", label: hi ? "शहर" : "City", placeholder: hi ? "जयपुर" : "Jaipur", type: "text" },
                      { key: "experience", label: hi ? "अनुभव (साल)" : "Experience (years)", placeholder: hi ? "जैसे: 5" : "e.g., 5", type: "number" },
                    ].map(({ key, label, placeholder, type }) => (
                      <div key={key}>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">{label}</label>
                        <input
                          type={type}
                          value={(form as unknown as Record<string, string>)[key]}
                          onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                          placeholder={placeholder}
                          className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                        />
                      </div>
                    ))}

                    {/* Languages */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">{hi ? "भाषाएं" : "Languages spoken"}</label>
                      <div className="flex flex-wrap gap-2">
                        {allLanguages.map((l) => (
                          <button key={l} onClick={() => toggleItem("languages", l)}
                            className={`text-xs px-3 py-1.5 rounded-full border transition-all ${form.languages.includes(l) ? "bg-orange-100 border-orange-400 text-orange-700 font-medium" : "border-slate-200 text-slate-600 hover:border-orange-300"}`}>
                            {l}
                          </button>
                        ))}
                      </div>
                    </div>
                    <button onClick={() => setStep("docs")} disabled={!form.name || !form.phone || !form.city}
                      className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-slate-200 text-white font-bold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2">
                      {hi ? "आगे बढ़ें" : "Continue"} <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {step === "docs" && (
                <div className="bg-white rounded-2xl p-6 card-shadow">
                  <h2 className="font-bold text-slate-900 mb-2 text-lg">{hi ? "दस्तावेज़ अपलोड" : "Document Upload"}</h2>
                  <p className="text-slate-500 text-sm mb-5">{hi ? "ये वेरिफिकेशन के लिए जरूरी हैं और ग्राहकों का भरोसा बढ़ाते हैं।" : "Required for verification. Shown to customers as trust signals."}</p>
                  <div className="space-y-3 mb-5">
                    {[
                      { key: "aadhar", label_en: "Aadhar Card", label_hi: "आधार कार्ड", required: true },
                      { key: "police", label_en: "Police Clearance Certificate", label_hi: "पुलिस क्लियरेंस", required: true },
                      { key: "iti", label_en: "ITI / Skill Certificate", label_hi: "ITI / स्किल सर्टिफिकेट", required: false },
                    ].map(({ key, label_en, label_hi, required }) => (
                      <div key={key} className={`border-2 rounded-xl p-4 transition-all ${(form as unknown as Record<string, boolean>)[key] ? "border-green-400 bg-green-50" : "border-dashed border-slate-300 hover:border-orange-300"}`}>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-slate-900 text-sm">{hi ? label_hi : label_en}</p>
                            <p className="text-xs text-slate-500">{required ? (hi ? "अनिवार्य" : "Required") : (hi ? "वैकल्पिक" : "Optional")}</p>
                          </div>
                          {(form as unknown as Record<string, boolean>)[key] ? (
                            <div className="flex items-center gap-2 text-green-600 text-sm font-medium">
                              <CheckCircle2 className="w-5 h-5" />
                              {hi ? "अपलोड" : "Uploaded"}
                            </div>
                          ) : (
                            <button onClick={() => setForm((f) => ({ ...f, [key]: true }))}
                              className="flex items-center gap-1.5 text-xs bg-slate-100 text-slate-700 px-3 py-2 rounded-lg hover:bg-orange-50 hover:text-orange-700 transition-colors font-medium">
                              <Upload className="w-3.5 h-3.5" />
                              {hi ? "अपलोड करें" : "Upload"}
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => setStep("info")} className="px-5 py-3 border border-slate-300 rounded-xl text-slate-700 hover:bg-slate-50 text-sm font-medium">{hi ? "वापस" : "Back"}</button>
                    <button onClick={() => setStep("skills")} disabled={!form.aadhar || !form.police}
                      className="flex-1 bg-orange-500 hover:bg-orange-600 disabled:bg-slate-200 text-white font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm">
                      {hi ? "आगे बढ़ें" : "Continue"} <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {step === "skills" && (
                <div className="bg-white rounded-2xl p-6 card-shadow">
                  <h2 className="font-bold text-slate-900 mb-2 text-lg">{hi ? "आपकी स्किल" : "Your Skills"}</h2>
                  <p className="text-slate-500 text-sm mb-4">{hi ? "जो काम आप जानते हैं वो चुनें।" : "Select the work you can do."}</p>
                  <div className="grid grid-cols-2 gap-2 mb-5">
                    {allSkills.map((skill) => (
                      <button key={skill} onClick={() => toggleItem("skills", skill)}
                        className={`flex items-center gap-2 p-3 rounded-xl border text-sm text-left transition-all ${form.skills.includes(skill) ? "border-orange-500 bg-orange-50 text-orange-700 font-medium" : "border-slate-200 hover:border-orange-300 text-slate-700"}`}>
                        {form.skills.includes(skill) && <CheckCircle2 className="w-4 h-4 shrink-0 text-orange-500" />}
                        <span className="text-xs">{skill}</span>
                      </button>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => setStep("docs")} className="px-5 py-3 border border-slate-300 rounded-xl text-slate-700 hover:bg-slate-50 text-sm font-medium">{hi ? "वापस" : "Back"}</button>
                    <button onClick={() => setStep("done")} disabled={form.skills.length === 0}
                      className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-slate-200 text-white font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4" />
                      {hi ? "आवेदन जमा करें" : "Submit Application"}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              {[
                { icon: TrendingUp, color: "text-orange-500", bg: "bg-orange-50", title: hi ? "गारंटीड लीड" : "Guaranteed Leads", desc: hi ? "पहले महीने में 10 गारंटीड लीड।" : "10 guaranteed leads in your first month." },
                { icon: Shield, color: "text-blue-500", bg: "bg-blue-50", title: hi ? "वारंटी सपोर्ट" : "Warranty Support", desc: hi ? "वारंटी क्लेम पर हम आपके साथ हैं।" : "We back you on warranty claims." },
                { icon: Clock, color: "text-green-500", bg: "bg-green-50", title: hi ? "अपना शेड्यूल" : "Your Schedule", desc: hi ? "कब काम करना है, आप तय करें।" : "You decide when to work." },
                { icon: Star, color: "text-amber-500", bg: "bg-amber-50", title: hi ? "रेटिंग = ज्यादा काम" : "Rating = More Jobs", desc: hi ? "अच्छी रेटिंग = ज्यादा बुकिंग।" : "Higher rating = more bookings." },
              ].map(({ icon: Icon, color, bg, title, desc }) => (
                <div key={title} className={`${bg} rounded-xl p-4 flex items-start gap-3`}>
                  <Icon className={`w-5 h-5 ${color} shrink-0 mt-0.5`} />
                  <div>
                    <p className="font-semibold text-slate-900 text-sm">{title}</p>
                    <p className="text-slate-600 text-xs mt-0.5">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div className="mt-12">
            <h3 className="text-xl font-bold text-slate-900 mb-4">{hi ? "अक्सर पूछे जाने वाले सवाल" : "Frequently Asked Questions"}</h3>
            <div className="space-y-2">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-white rounded-xl border border-slate-100 overflow-hidden">
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                    className="w-full flex items-center justify-between px-5 py-4 text-left"
                  >
                    <span className="font-medium text-slate-900 text-sm">{hi ? faq.q_hi : faq.q_en}</span>
                    {expandedFaq === i ? <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />}
                  </button>
                  {expandedFaq === i && (
                    <div className="px-5 pb-4 text-sm text-slate-600 border-t border-slate-50">
                      <p className="pt-3">{hi ? faq.a_hi : faq.a_en}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Zap, Phone, Clock, MapPin, ShieldCheck, CheckCircle2,
  ArrowRight, AlertTriangle, Navigation,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Language } from "@/data/content";

type Step = "form" | "matching" | "confirmed";

export default function EmergencyPage() {
  const [lang, setLang] = useState<Language>("en");
  const [step, setStep] = useState<Step>("form");
  const [address, setAddress] = useState("");
  const [issue, setIssue] = useState("");
  const [phone, setPhone] = useState("");
  const [eta] = useState(37);

  const issues = [
    { id: "power_out", icon: "🔌", en: "Complete power outage", hi: "पूरी बिजली गुल" },
    { id: "sparks", icon: "⚡", en: "Sparks / burning smell", hi: "चिंगारी / जलने की गंध" },
    { id: "short", icon: "🔥", en: "Short circuit / tripping", hi: "शॉर्ट सर्किट / ट्रिपिंग" },
    { id: "shock", icon: "😱", en: "Electric shock incident", hi: "बिजली का झटका" },
    { id: "flooding", icon: "💧", en: "Water + electrical hazard", hi: "पानी + बिजली का खतरा" },
    { id: "other", icon: "🔧", en: "Other urgent issue", hi: "अन्य जरूरी समस्या" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!address || !issue || !phone) return;
    setStep("matching");
    setTimeout(() => setStep("confirmed"), 2500);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar lang={lang} setLang={setLang} />

      <div className="flex-1 pt-20">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 py-12">
          <div className="max-w-4xl mx-auto px-4 text-center text-white">
            <div className="inline-flex items-center gap-2 bg-red-500/30 border border-red-400/40 rounded-full px-4 py-1.5 mb-4">
              <span className="w-2 h-2 bg-red-200 rounded-full animate-pulse" />
              <span className="text-red-100 text-sm font-medium">24×7 Emergency Dispatch</span>
            </div>
            <h1 className="text-4xl font-bold mb-3 flex items-center justify-center gap-3">
              <Zap className="w-9 h-9" />
              {lang === "en" ? "Emergency Electrician" : "इमरजेंसी इलेक्ट्रीशियन"}
            </h1>
            <p className="text-red-100 text-lg max-w-xl mx-auto">
              {lang === "en"
                ? "Verified electrician dispatched to you in under 2 hours. Fixed ₹49 emergency fee. No surge pricing."
                : "2 घंटे में वेरिफाइड इलेक्ट्रीशियन। ₹49 तय इमरजेंसी फीस। कोई सर्ज प्राइसिंग नहीं।"}
            </p>
          </div>
        </div>

        {/* Trust bar */}
        <div className="bg-red-50 border-b border-red-100 py-3">
          <div className="max-w-4xl mx-auto px-4 flex flex-wrap justify-center gap-6 text-sm">
            {[
              { icon: Clock, label: lang === "en" ? "Avg. response: 37 min" : "औसत रिस्पांस: 37 मिनट", color: "text-red-600" },
              { icon: ShieldCheck, label: lang === "en" ? "Background verified" : "बैकग्राउंड वेरिफाइड", color: "text-green-600" },
              { icon: CheckCircle2, label: lang === "en" ? "Fixed ₹49 fee only" : "सिर्फ ₹49 तय फीस", color: "text-blue-600" },
            ].map(({ icon: Icon, label, color }) => (
              <div key={label} className={`flex items-center gap-1.5 font-medium ${color}`}>
                <Icon className="w-4 h-4" />
                {label}
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-10">
          {step === "form" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Form */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                  <h2 className="text-xl font-bold text-slate-900">
                    {lang === "en" ? "Get help now" : "अभी मदद लें"}
                  </h2>
                </div>
                <p className="text-slate-500 text-sm mb-6">
                  {lang === "en"
                    ? "Fill in 3 fields. We'll dispatch the nearest available electrician."
                    : "3 फील्ड भरें। हम नजदीकी उपलब्ध इलेक्ट्रीशियन भेजेंगे।"}
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                      {lang === "en" ? "Your mobile number" : "आपका मोबाइल नंबर"}
                    </label>
                    <div className="flex">
                      <span className="flex items-center px-3 bg-slate-100 border border-r-0 border-slate-300 rounded-l-xl text-slate-500 text-sm">+91</span>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="9876543210"
                        className="flex-1 border border-slate-300 rounded-r-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent"
                        maxLength={10}
                        required
                      />
                    </div>
                  </div>

                  {/* Address */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                      {lang === "en" ? "Your address" : "आपका पता"}
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder={lang === "en" ? "House no., area, city" : "मकान नं., इलाका, शहर"}
                        className="w-full border border-slate-300 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent"
                        required
                      />
                    </div>
                    <button
                      type="button"
                      className="mt-1.5 text-xs text-red-600 flex items-center gap-1 hover:text-red-700"
                    >
                      <Navigation className="w-3 h-3" />
                      {lang === "en" ? "Use my current location" : "मेरी वर्तमान लोकेशन उपयोग करें"}
                    </button>
                  </div>

                  {/* Issue type */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                      {lang === "en" ? "What's the issue?" : "क्या समस्या है?"}
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {issues.map((iss) => (
                        <button
                          key={iss.id}
                          type="button"
                          onClick={() => setIssue(iss.id)}
                          className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-sm text-left transition-all ${
                            issue === iss.id
                              ? "border-red-500 bg-red-50 text-red-700 font-medium"
                              : "border-slate-200 bg-white text-slate-600 hover:border-red-300"
                          }`}
                        >
                          <span>{iss.icon}</span>
                          <span className="text-xs">{lang === "en" ? iss.en : iss.hi}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={!address || !issue || !phone}
                    className="w-full bg-red-600 hover:bg-red-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-colors flex items-center justify-center gap-2 text-base"
                  >
                    <Zap className="w-5 h-5" />
                    {lang === "en" ? "Dispatch Electrician Now" : "अभी इलेक्ट्रीशियन भेजें"}
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <p className="text-center text-xs text-slate-500">
                    {lang === "en"
                      ? "₹49 emergency fee • Service charges fixed & shown after arrival"
                      : "₹49 इमरजेंसी फीस • सर्विस चार्ज आने के बाद तय और दिखाए जाएंगे"}
                  </p>
                </form>
              </div>

              {/* Info panel */}
              <div className="space-y-4">
                <div className="bg-slate-50 rounded-2xl p-5">
                  <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-red-500" />
                    {lang === "en" ? "What happens next" : "आगे क्या होगा"}
                  </h3>
                  <div className="space-y-3">
                    {[
                      { time: "0 min", label: lang === "en" ? "You submit this form" : "आप फॉर्म जमा करते हैं", done: false },
                      { time: "2 min", label: lang === "en" ? "We find nearest verified pro" : "हम नजदीकी वेरिफाइड प्रो ढूंढते हैं", done: false },
                      { time: "5 min", label: lang === "en" ? "You get electrician's name + live location on WhatsApp" : "आपको WhatsApp पर नाम + लोकेशन मिलती है", done: false },
                      { time: "~37 min", label: lang === "en" ? "Electrician arrives at your door" : "इलेक्ट्रीशियन आपके दरवाजे पर", done: false },
                    ].map((step, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="w-12 text-xs font-bold text-red-600 mt-0.5 shrink-0">{step.time}</div>
                        <div className="flex-1 text-sm text-slate-600">{step.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pricing box */}
                <div className="bg-white border border-slate-200 rounded-2xl p-5">
                  <h3 className="font-bold text-slate-900 mb-3">
                    {lang === "en" ? "Emergency pricing (transparent)" : "इमरजेंसी कीमत (पारदर्शी)"}
                  </h3>
                  <div className="space-y-2 text-sm">
                    {[
                      { label: lang === "en" ? "Emergency dispatch fee" : "इमरजेंसी डिस्पैच फीस", value: "₹49", note: "" },
                      { label: lang === "en" ? "Service work (fixed)" : "सर्विस काम (तय)", value: "shown on arrival", note: lang === "en" ? "No surprises" : "कोई हैरानी नहीं" },
                      { label: lang === "en" ? "Night surcharge (10pm–6am)" : "रात का सरचार्ज", value: "₹0", note: lang === "en" ? "We don't charge extra" : "हम अतिरिक्त नहीं लेते" },
                      { label: lang === "en" ? "Weekend surcharge" : "वीकेंड सरचार्ज", value: "₹0", note: "" },
                    ].map((row) => (
                      <div key={row.label} className="flex justify-between items-start">
                        <span className="text-slate-500">{row.label}</span>
                        <div className="text-right">
                          <span className="font-semibold text-slate-900 text-xs">{row.value}</span>
                          {row.note && <p className="text-xs text-green-600">{row.note}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Or call */}
                <div className="bg-red-50 border border-red-200 rounded-2xl p-4 text-center">
                  <p className="text-sm text-red-600 font-medium mb-2">
                    {lang === "en" ? "Or call us directly" : "या सीधे कॉल करें"}
                  </p>
                  <a
                    href="tel:18009112455"
                    className="flex items-center justify-center gap-2 bg-red-600 text-white font-bold py-3 rounded-xl text-lg hover:bg-red-700 transition-colors"
                  >
                    <Phone className="w-5 h-5" />
                    1800-911-BIJLI
                  </a>
                  <p className="text-xs text-red-400 mt-2">24×7 Free</p>
                </div>
              </div>
            </div>
          )}

          {step === "matching" && (
            <div className="text-center py-20">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                <Zap className="w-10 h-10 text-red-500" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">
                {lang === "en" ? "Finding nearest electrician..." : "नजदीकी इलेक्ट्रीशियन ढूंढ रहे हैं..."}
              </h2>
              <p className="text-slate-500">
                {lang === "en" ? "Checking 4 available pros within 5km of your location" : "आपकी लोकेशन के 5km में 4 उपलब्ध प्रो चेक कर रहे हैं"}
              </p>
              <div className="mt-6 flex justify-center gap-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-2.5 h-2.5 bg-red-400 rounded-full animate-bounce"
                    style={{ animationDelay: `${i * 0.15}s` }}
                  />
                ))}
              </div>
            </div>
          )}

          {step === "confirmed" && (
            <div className="max-w-md mx-auto">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">
                  {lang === "en" ? "Electrician dispatched!" : "इलेक्ट्रीशियन भेज दिया!"}
                </h2>
                <p className="text-slate-500">
                  {lang === "en"
                    ? "You'll receive a WhatsApp message in 2 minutes with the electrician's name and live location link."
                    : "2 मिनट में WhatsApp पर इलेक्ट्रीशियन का नाम और लाइव लोकेशन लिंक मिलेगा।"}
                </p>
              </div>

              {/* Electrician card */}
              <div className="bg-white rounded-2xl p-6 card-shadow mb-4">
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-14 h-14 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    RK
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">Ramesh Kumar</h3>
                    <p className="text-sm text-slate-500">Master Electrician · 11 yrs exp</p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <span className="text-amber-400 text-xs">★★★★★</span>
                      <span className="text-xs text-slate-500">4.9 (312 reviews)</span>
                    </div>
                  </div>
                  <div className="ml-auto text-center">
                    <div className="text-2xl font-bold text-red-600">{eta}</div>
                    <div className="text-xs text-slate-500">min away</div>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-xl p-4 mb-4">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-slate-500">
                      {lang === "en" ? "Currently" : "अभी"}
                    </span>
                    <span className="text-green-600 font-medium flex items-center gap-1">
                      <span className="w-2 h-2 bg-green-500 rounded-full inline-block" />
                      {lang === "en" ? "En route to you" : "आपकी तरफ आ रहे हैं"}
                    </span>
                  </div>
                  {/* Fake progress bar */}
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full animate-pulse" style={{ width: "35%" }} />
                  </div>
                  <div className="flex justify-between text-xs text-slate-400 mt-1">
                    <span>Pro location</span>
                    <span>Your home</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <a
                    href="tel:+911800000000"
                    className="flex items-center justify-center gap-2 bg-slate-900 text-white text-sm font-medium py-2.5 rounded-xl hover:bg-slate-700 transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    {lang === "en" ? "Call him" : "कॉल करें"}
                  </a>
                  <button className="flex items-center justify-center gap-2 bg-green-600 text-white text-sm font-medium py-2.5 rounded-xl hover:bg-green-700 transition-colors">
                    <MapPin className="w-4 h-4" />
                    {lang === "en" ? "Track live" : "लाइव ट्रैक"}
                  </button>
                </div>
              </div>

              {/* Trust reassurance */}
              <div className="bg-green-50 rounded-xl p-4 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-green-800">
                    {lang === "en" ? "You're protected" : "आप सुरक्षित हैं"}
                  </p>
                  <p className="text-green-600">
                    {lang === "en"
                      ? "Ramesh is BG-verified. His Aadhar, police clearance, and ITI certificate are on file."
                      : "रमेश BG-वेरिफाइड हैं। उनका आधार, पुलिस क्लियरेंस, और ITI सर्टिफिकेट हमारे पास है।"}
                  </p>
                </div>
              </div>

              <div className="text-center mt-6">
                <Link
                  href="/"
                  className="text-slate-500 text-sm hover:text-orange-600 transition-colors"
                >
                  ← {lang === "en" ? "Back to home" : "होम पर वापस"}
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

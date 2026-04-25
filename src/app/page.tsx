"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Zap, ShieldCheck, Clock, Award, Star, MapPin, ChevronRight,
  CheckCircle2, ArrowRight, MessageCircle, Users, TrendingUp, Wrench,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Language, translations, services, reviews, cities } from "@/data/content";

export default function HomePage() {
  const [lang, setLang] = useState<Language>("en");
  const t = translations[lang];

  const stats = [
    { value: "24,800+", label: t.stats_bookings, icon: Wrench },
    { value: "50+", label: t.stats_cities, icon: MapPin },
    { value: "4.8★", label: t.stats_rating, icon: Star },
    { value: "99.2%", label: t.stats_warranty, icon: Award },
  ];

  const painPoints = [
    {
      emoji: "😤",
      title: t.pain_1_title,
      desc: t.pain_1_desc,
      fix: lang === "en"
        ? "BijliWala shows full price before you confirm."
        : "BijliWala बुक करने से पहले पूरी कीमत दिखाती है।",
    },
    {
      emoji: "😰",
      title: t.pain_2_title,
      desc: t.pain_2_desc,
      fix: lang === "en"
        ? "Every job has a 90-day warranty, guaranteed."
        : "हर काम की 90 दिन की वारंटी, गारंटी के साथ।",
    },
    {
      emoji: "😔",
      title: t.pain_3_title,
      desc: t.pain_3_desc,
      fix: lang === "en"
        ? "We serve 50+ Tier-2/3 cities with zero compromise."
        : "हम 50+ छोटे शहरों में बिना समझौते के सेवा देते हैं।",
    },
    {
      emoji: "😟",
      title: t.pain_4_title,
      desc: t.pain_4_desc,
      fix: lang === "en"
        ? "Every pro is background-checked and skill-certified."
        : "हर प्रो बैकग्राउंड-चेक और स्किल-सर्टिफाइड है।",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar lang={lang} setLang={setLang} />

      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-28 pb-20">
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-500/5 rounded-full blur-2xl translate-y-1/3 -translate-x-1/4" />

        <div className="relative max-w-6xl mx-auto px-4">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/30 rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" />
              <span className="text-orange-300 text-sm font-medium">{t.hero_badge}</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
              {t.hero_title}
              <br />
              <span className="text-orange-400">{t.hero_title2}</span>
            </h1>
            <p className="text-slate-300 text-lg mb-8 leading-relaxed max-w-xl">
              {t.hero_subtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-10">
              <Link
                href="/booking"
                className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3.5 rounded-xl transition-colors text-base"
              >
                <Zap className="w-5 h-5" />
                {t.hero_cta_primary}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/emergency"
                className="flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/40 text-red-300 font-semibold px-6 py-3.5 rounded-xl transition-colors text-base"
              >
                <Clock className="w-5 h-5" />
                {t.hero_cta_secondary}
              </Link>
            </div>

            <div className="flex flex-wrap gap-4">
              {[
                { icon: ShieldCheck, label: t.hero_trust1, color: "text-green-400" },
                { icon: CheckCircle2, label: t.hero_trust2, color: "text-blue-400" },
                { icon: Award, label: t.hero_trust3, color: "text-purple-400" },
                { icon: Clock, label: t.hero_trust4, color: "text-red-400" },
              ].map(({ icon: Icon, label, color }) => (
                <div key={label} className="flex items-center gap-1.5">
                  <Icon className={`w-4 h-4 ${color}`} />
                  <span className="text-slate-300 text-sm">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Floating card */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden lg:block">
            <div className="bg-white rounded-2xl p-5 shadow-2xl w-64">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">Booking Confirmed</p>
                  <p className="font-semibold text-slate-900 text-sm">Fan Installation</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                {[
                  { label: "Service fee", value: "₹149", color: "" },
                  { label: "Emergency premium", value: "₹0", color: "text-green-600" },
                  { label: "Hidden charges", value: "₹0", color: "text-green-600" },
                ].map((row) => (
                  <div key={row.label} className="flex justify-between">
                    <span className="text-slate-500">{row.label}</span>
                    <span className={`font-semibold ${row.color}`}>{row.value}</span>
                  </div>
                ))}
                <div className="border-t pt-2 flex justify-between font-bold">
                  <span>Total</span>
                  <span className="text-orange-600">₹149</span>
                </div>
              </div>
              <div className="mt-3 bg-green-50 rounded-lg p-2.5 flex items-center gap-2">
                <Award className="w-4 h-4 text-green-600 shrink-0" />
                <span className="text-xs text-green-700">90-day warranty included</span>
              </div>
              <div className="mt-2 text-xs text-slate-500 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                Arriving in ~45 minutes
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="bg-orange-500 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-white text-center">
            {stats.map(({ value, label, icon: Icon }) => (
              <div key={label} className="flex flex-col items-center gap-1">
                <Icon className="w-5 h-5 opacity-80 mb-1" />
                <div className="text-2xl md:text-3xl font-bold">{value}</div>
                <div className="text-orange-100 text-sm">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">{t.services_title}</h2>
            <p className="text-slate-500">{t.services_subtitle}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {services.map((svc) => (
              <Link
                key={svc.id}
                href={`/booking?service=${svc.id}`}
                className="bg-white rounded-2xl p-5 card-shadow hover:card-shadow-lg hover:-translate-y-0.5 transition-all group relative"
              >
                {svc.popular && (
                  <span className="absolute top-3 right-3 text-xs bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full font-medium">
                    Popular
                  </span>
                )}
                <div className="text-3xl mb-3">{svc.icon}</div>
                <h3 className="font-semibold text-slate-900 text-sm mb-1">
                  {lang === "en" ? svc.name_en : svc.name_hi}
                </h3>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-orange-600 font-bold text-base">₹{svc.price}</span>
                  <span className="text-slate-400 text-xs">{svc.time}</span>
                </div>
                <div className="mt-3 flex items-center gap-1 text-orange-500 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  Book now <ChevronRight className="w-3 h-3" />
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-6">
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 text-orange-600 font-medium hover:text-orange-700 transition-colors"
            >
              View full price list <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── PAIN POINTS ── */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">{t.pain_title}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {painPoints.map((p) => (
              <div key={p.title} className="bg-slate-50 rounded-2xl p-6 flex gap-4">
                <div className="text-3xl shrink-0">{p.emoji}</div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">{p.title}</h3>
                  <p className="text-slate-500 text-sm mb-3">{p.desc}</p>
                  <div className="flex items-start gap-2 bg-green-50 rounded-xl p-3">
                    <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                    <p className="text-green-700 text-sm font-medium">{p.fix}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">
              {lang === "en" ? "How it works" : "कैसे काम करता है"}
            </h2>
            <p className="text-slate-500">
              {lang === "en" ? "Book in 3 simple steps" : "3 आसान चरणों में बुक करें"}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: lang === "en" ? "Pick your service" : "सेवा चुनें",
                desc: lang === "en"
                  ? "Choose from our fixed-price menu. See the full cost before confirming."
                  : "तय-कीमत सूची से चुनें। पुष्टि से पहले पूरी कीमत देखें।",
                icon: "🔌",
              },
              {
                step: "2",
                title: lang === "en" ? "We match a verified pro" : "वेरिफाइड प्रो मिलाएं",
                desc: lang === "en"
                  ? "Background-checked, skill-certified electrician — average 40 mins."
                  : "बैकग्राउंड-चेक, स्किल-सर्टिफाइड इलेक्ट्रीशियन — औसतन 40 मिनट।",
                icon: "👷",
              },
              {
                step: "3",
                title: lang === "en" ? "Job done + warranty card" : "काम पूरा + वारंटी कार्ड",
                desc: lang === "en"
                  ? "Pay the fixed price after the job. Get your 90-day digital warranty card."
                  : "काम के बाद तय कीमत दें। 90 दिन का डिजिटल वारंटी कार्ड लें।",
                icon: "✅",
              },
            ].map((step) => (
              <div key={step.step} className="text-center">
                <div className="relative inline-flex mb-5">
                  <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center text-3xl">
                    {step.icon}
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-orange-500 rounded-full text-white text-xs font-bold flex items-center justify-center">
                    {step.step}
                  </div>
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/booking"
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3.5 rounded-xl transition-colors"
            >
              <Zap className="w-5 h-5" />
              {t.hero_cta_primary}
            </Link>
          </div>
        </div>
      </section>

      {/* ── CITY COVERAGE ── */}
      <section className="py-12 bg-white border-y border-slate-100">
        <div className="max-w-6xl mx-auto px-4">
          <p className="text-center text-slate-400 text-sm mb-4 uppercase tracking-wider font-medium">
            {lang === "en" ? "Available in your city" : "आपके शहर में उपलब्ध"}
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {cities.map((city) => (
              <span
                key={city}
                className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-full text-sm text-slate-600 hover:bg-orange-50 hover:border-orange-200 hover:text-orange-700 cursor-pointer transition-colors"
              >
                📍 {city}
              </span>
            ))}
            <span className="px-3 py-1.5 bg-orange-50 border border-orange-200 rounded-full text-sm text-orange-600 font-medium">
              +35 more cities →
            </span>
          </div>
        </div>
      </section>

      {/* ── EMERGENCY BANNER ── */}
      <section className="py-14 bg-gradient-to-r from-red-600 to-red-700">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <div className="text-4xl mb-4">⚡</div>
          <h2 className="text-3xl font-bold mb-3">{t.emergency_title}</h2>
          <p className="text-red-100 mb-6 text-lg">{t.emergency_subtitle}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/emergency"
              className="bg-white text-red-600 font-bold px-8 py-3.5 rounded-xl hover:bg-red-50 transition-colors"
            >
              {t.emergency_cta}
            </Link>
            <a
              href="tel:1800911245"
              className="bg-red-500 border border-red-400 text-white font-bold px-8 py-3.5 rounded-xl hover:bg-red-500/80 transition-colors"
            >
              📞 Call 1800-911-BIJLI
            </a>
          </div>
          <p className="text-red-200 text-sm mt-4">{t.emergency_note}</p>
        </div>
      </section>

      {/* ── COMMUNITY TRUST ── */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">{t.trust_title}</h2>
            <p className="text-slate-500">{t.trust_subtitle}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((review) => (
              <div key={review.name} className="bg-slate-50 rounded-2xl p-6 flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 ${review.color} rounded-full flex items-center justify-center text-white font-bold text-sm`}>
                    {review.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 text-sm">{review.name}</p>
                    <p className="text-xs text-slate-500 flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {review.area}, {review.city}
                    </p>
                  </div>
                  <div className="ml-auto text-xs text-slate-400">{review.time}</div>
                </div>
                <div className="flex gap-0.5 mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-slate-600 text-sm leading-relaxed flex-1">
                  &quot;{lang === "en" ? review.text : review.text_hi}&quot;
                </p>
                <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
                  <Users className="w-3.5 h-3.5 text-orange-400" />
                  <span className="text-orange-600 font-medium">{review.localCount} neighbors</span>
                  {lang === "en" ? " also used this pro" : " ने भी इस प्रो को बुक किया"}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-orange-50 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
            <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center shrink-0">
              <TrendingUp className="w-7 h-7 text-orange-500" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 mb-1">
                {lang === "en" ? "Community Trust Score" : "कम्युनिटी ट्रस्ट स्कोर"}
              </h3>
              <p className="text-slate-500 text-sm">
                {lang === "en"
                  ? "We show how many people in YOUR locality have used each electrician. Real neighborhood social proof — not anonymous internet ratings."
                  : "हम दिखाते हैं कि आपके इलाके में कितने लोगों ने हर इलेक्ट्रीशियन को बुक किया है। असली पड़ोस का भरोसा।"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── WARRANTY SECTION ── */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-blue-100 rounded-full px-4 py-1.5 mb-4">
                <Award className="w-4 h-4 text-blue-600" />
                <span className="text-blue-700 text-sm font-medium">
                  {lang === "en" ? "Industry first" : "उद्योग में पहला"}
                </span>
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">{t.warranty_title}</h2>
              <p className="text-slate-500 mb-6 leading-relaxed">{t.warranty_subtitle}</p>
              <ul className="space-y-3">
                {(lang === "en"
                  ? [
                      "Digital warranty card with QR code sent to your WhatsApp",
                      "Free revisit within 90 days for the same issue",
                      "Track all warranties from your dashboard",
                      "Upgrade to 1-year warranty for ₹199/year",
                    ]
                  : [
                      "QR कोड के साथ डिजिटल वारंटी कार्ड WhatsApp पर",
                      "90 दिन में उसी समस्या के लिए मुफ्त दोबारा विजिट",
                      "अपने डैशबोर्ड से सभी वारंटी ट्रैक करें",
                      "₹199/साल में 1 साल की वारंटी पर अपग्रेड करें",
                    ]
                ).map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-slate-600 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/warranty"
                className="mt-6 inline-flex items-center gap-2 text-blue-600 font-medium hover:text-blue-700 transition-colors"
              >
                {lang === "en" ? "View warranty dashboard" : "वारंटी डैशबोर्ड देखें"}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="bg-white rounded-2xl p-6 card-shadow">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-bold text-slate-900">Warranty Card</h3>
                <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full font-medium">Active</span>
              </div>
              <div className="space-y-4">
                {[
                  { label: "Service", value: "Fan Installation" },
                  { label: "Job ID", value: "#BW-2025-0847", mono: true },
                  { label: "Electrician", value: "Ramesh Kumar" },
                  { label: "Valid until", value: "Mar 10, 2025", green: true },
                ].map((row) => (
                  <div key={row.label} className="flex justify-between text-sm">
                    <span className="text-slate-500">{row.label}</span>
                    <span className={`font-semibold ${row.mono ? "font-mono text-orange-600" : ""} ${row.green ? "text-green-600" : ""}`}>
                      {row.value}
                    </span>
                  </div>
                ))}
                <div className="w-full bg-slate-100 rounded-full h-2 mt-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: "63%" }} />
                </div>
                <p className="text-xs text-slate-500 text-center">57 days remaining</p>
              </div>
              <button className="w-full mt-4 bg-slate-900 text-white text-sm font-medium py-2.5 rounded-xl hover:bg-slate-700 transition-colors flex items-center justify-center gap-2">
                <MessageCircle className="w-4 h-4" />
                {lang === "en" ? "Claim warranty on WhatsApp" : "WhatsApp पर क्लेम करें"}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-20 bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="max-w-3xl mx-auto px-4 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.cta_title}</h2>
          <p className="text-slate-300 text-lg mb-8">{t.cta_subtitle}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/booking"
              className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-3.5 rounded-xl transition-colors text-base"
            >
              <Zap className="w-5 h-5" />
              {t.cta_button}
            </Link>
            <a
              href="https://wa.me/911800000000"
              className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-3.5 rounded-xl transition-colors text-base"
            >
              <MessageCircle className="w-5 h-5" />
              {t.cta_whatsapp}
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

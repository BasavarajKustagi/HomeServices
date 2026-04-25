"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Award, CheckCircle2, Clock, AlertTriangle, QrCode,
  MessageCircle, ArrowRight, Plus, Calendar,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Language, warranties } from "@/data/content";

export default function WarrantyPage() {
  const [lang, setLang] = useState<Language>("en");
  const [claiming, setClaiming] = useState<string | null>(null);
  const [claimed, setClaimed] = useState<string | null>(null);

  const handleClaim = (id: string) => {
    setClaiming(id);
    setTimeout(() => {
      setClaiming(null);
      setClaimed(id);
    }, 1500);
  };

  const getStatusColor = (status: string, daysLeft: number) => {
    if (status === "expired") return "bg-slate-100 text-slate-500 border-slate-200";
    if (daysLeft <= 14) return "bg-amber-50 text-amber-700 border-amber-200";
    return "bg-green-50 text-green-700 border-green-200";
  };

  const getProgressPct = (dateStr: string, expiresStr: string) => {
    const start = new Date(dateStr).getTime();
    const end = new Date(expiresStr).getTime();
    const now = Date.now();
    const pct = Math.max(0, Math.min(100, ((now - start) / (end - start)) * 100));
    return pct;
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar lang={lang} setLang={setLang} />

      <div className="flex-1 pt-20">
        {/* Header */}
        <div className="bg-gradient-to-br from-blue-700 to-blue-900 py-14">
          <div className="max-w-4xl mx-auto px-4 text-center text-white">
            <div className="inline-flex items-center gap-2 bg-blue-500/30 border border-blue-400/40 rounded-full px-4 py-1.5 mb-4">
              <Award className="w-4 h-4" />
              <span className="text-blue-100 text-sm font-medium">
                {lang === "en" ? "Industry-first guarantee" : "उद्योग में पहली गारंटी"}
              </span>
            </div>
            <h1 className="text-4xl font-bold mb-3">
              {lang === "en" ? "Your Warranty Dashboard" : "आपका वारंटी डैशबोर्ड"}
            </h1>
            <p className="text-blue-100 text-lg max-w-xl mx-auto">
              {lang === "en"
                ? "Every BijliWala job comes with a 90-day warranty. Track all your warranties here. Claim in one tap."
                : "हर BijliWala काम पर 90 दिन की वारंटी है। सभी वारंटी यहाँ ट्रैक करें। एक टैप में क्लेम करें।"}
            </p>
          </div>
        </div>

        {/* What's covered */}
        <div className="bg-blue-50 border-b border-blue-100">
          <div className="max-w-4xl mx-auto px-4 py-5">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-center">
              {[
                { icon: "🔧", label: lang === "en" ? "Workmanship defects" : "काम की खामियां" },
                { icon: "⚡", label: lang === "en" ? "Same issue recurring" : "वही समस्या दोबारा" },
                { icon: "🔌", label: lang === "en" ? "Parts installed by us" : "हमारे लगाए पार्ट्स" },
                { icon: "📞", label: lang === "en" ? "Priority support" : "प्राथमिकता सपोर्ट" },
              ].map((item) => (
                <div key={item.label} className="flex flex-col items-center gap-1.5 text-blue-700">
                  <span className="text-2xl">{item.icon}</span>
                  <span className="font-medium text-xs">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-10">
          {/* Summary bar */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {[
              {
                label: lang === "en" ? "Active warranties" : "सक्रिय वारंटी",
                value: warranties.filter((w) => w.status === "active").length,
                color: "text-green-600",
                bg: "bg-green-50",
              },
              {
                label: lang === "en" ? "Expiring soon (<14d)" : "जल्द समाप्त",
                value: warranties.filter((w) => w.status === "active" && w.daysLeft <= 14).length,
                color: "text-amber-600",
                bg: "bg-amber-50",
              },
              {
                label: lang === "en" ? "Total protected" : "कुल सुरक्षित",
                value: `₹${warranties.reduce((s, w) => s + w.amount, 0)}`,
                color: "text-blue-600",
                bg: "bg-blue-50",
              },
            ].map((stat) => (
              <div key={stat.label} className={`${stat.bg} rounded-xl p-4 text-center`}>
                <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                <p className="text-xs text-slate-600 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Warranty cards */}
          <h2 className="text-lg font-bold text-slate-900 mb-4">
            {lang === "en" ? "Your warranty cards" : "आपके वारंटी कार्ड"}
          </h2>
          <div className="space-y-4 mb-8">
            {warranties.map((w) => {
              const isExpired = w.status === "expired";
              const isExpiringSoon = !isExpired && w.daysLeft <= 14;
              const isClaimed = claimed === w.id;
              const isClaiming = claiming === w.id;
              const pct = getProgressPct(w.date, w.expiresAt);

              return (
                <div
                  key={w.id}
                  className={`bg-white rounded-2xl p-6 border ${isExpired ? "border-slate-200 opacity-60" : "border-slate-100 card-shadow"}`}
                >
                  <div className="flex flex-col md:flex-row gap-4">
                    {/* Left info */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-bold text-slate-900">{w.service}</h3>
                          <p className="text-sm text-slate-500 mt-0.5">
                            {lang === "en" ? "By" : "द्वारा"} {w.electrician}
                          </p>
                        </div>
                        <span
                          className={`text-xs font-medium px-3 py-1 rounded-full border ${getStatusColor(w.status, w.daysLeft)}`}
                        >
                          {isExpired
                            ? lang === "en" ? "Expired" : "समाप्त"
                            : isExpiringSoon
                            ? lang === "en" ? `Expires in ${w.daysLeft} days` : `${w.daysLeft} दिन बचे`
                            : lang === "en" ? `${w.daysLeft} days left` : `${w.daysLeft} दिन बचे`}
                        </span>
                      </div>

                      <div className="grid grid-cols-3 gap-3 text-sm mb-4">
                        <div>
                          <p className="text-slate-400 text-xs">Job date</p>
                          <p className="font-medium text-slate-700">
                            {new Date(w.date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                          </p>
                        </div>
                        <div>
                          <p className="text-slate-400 text-xs">Expires</p>
                          <p className="font-medium text-slate-700">
                            {new Date(w.expiresAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                          </p>
                        </div>
                        <div>
                          <p className="text-slate-400 text-xs">Amount</p>
                          <p className="font-medium text-slate-700">₹{w.amount}</p>
                        </div>
                      </div>

                      {/* Progress bar */}
                      {!isExpired && (
                        <div className="mb-2">
                          <div className="w-full bg-slate-100 rounded-full h-1.5">
                            <div
                              className={`h-1.5 rounded-full transition-all ${isExpiringSoon ? "bg-amber-400" : "bg-green-400"}`}
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                          <div className="flex justify-between text-xs text-slate-400 mt-1">
                            <span>{new Date(w.date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</span>
                            <span>{new Date(w.expiresAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</span>
                          </div>
                        </div>
                      )}

                      {/* Warranty ID */}
                      <p className="text-xs font-mono text-orange-600 bg-orange-50 px-2.5 py-1 rounded-lg inline-block">
                        {w.id}
                      </p>

                      {/* Expiring soon alert */}
                      {isExpiringSoon && (
                        <div className="mt-3 flex items-center gap-2 bg-amber-50 rounded-xl p-3 text-xs text-amber-700">
                          <AlertTriangle className="w-4 h-4 shrink-0" />
                          {lang === "en"
                            ? `Warranty expires in ${w.daysLeft} days. Inspect your work and claim if needed.`
                            : `वारंटी ${w.daysLeft} दिनों में समाप्त हो रही है। काम चेक करें।`}
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex flex-row md:flex-col gap-2 md:w-44">
                      {!isExpired && (
                        <>
                          {isClaimed ? (
                            <div className="flex items-center gap-2 bg-green-50 text-green-700 font-medium px-4 py-2.5 rounded-xl text-sm justify-center">
                              <CheckCircle2 className="w-4 h-4" />
                              {lang === "en" ? "Claim filed!" : "क्लेम किया!"}
                            </div>
                          ) : (
                            <button
                              onClick={() => handleClaim(w.id)}
                              disabled={isClaiming}
                              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2.5 rounded-xl text-sm transition-colors justify-center disabled:opacity-70"
                            >
                              {isClaiming ? (
                                <span className="flex gap-1">
                                  {[1, 2, 3].map((i) => (
                                    <span key={i} className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: `${i * 0.1}s` }} />
                                  ))}
                                </span>
                              ) : (
                                <>
                                  <AlertTriangle className="w-4 h-4" />
                                  {lang === "en" ? "Claim warranty" : "क्लेम करें"}
                                </>
                              )}
                            </button>
                          )}

                          <button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2.5 rounded-xl text-sm transition-colors justify-center">
                            <MessageCircle className="w-4 h-4" />
                            WhatsApp
                          </button>

                          <button className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium px-4 py-2.5 rounded-xl text-sm transition-colors justify-center">
                            <QrCode className="w-4 h-4" />
                            {lang === "en" ? "View QR" : "QR देखें"}
                          </button>
                        </>
                      )}

                      {isExpired && (
                        <Link
                          href="/booking"
                          className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium px-4 py-2.5 rounded-xl text-sm transition-colors justify-center"
                        >
                          {lang === "en" ? "Book again" : "फिर बुक करें"}
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Upgrade banner */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6 text-white">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="w-5 h-5" />
                  <span className="font-bold text-lg">
                    {lang === "en" ? "Upgrade to BijliWala+ Warranty" : "BijliWala+ वारंटी पर अपग्रेड करें"}
                  </span>
                </div>
                <p className="text-blue-100 text-sm mb-3">
                  {lang === "en"
                    ? "Extend ALL your warranties to 1 full year. Priority service. Free annual electrical inspection."
                    : "सभी वारंटी को 1 पूरे साल तक बढ़ाएं। प्राथमिकता सेवा। मुफ्त वार्षिक बिजली निरीक्षण।"}
                </p>
                <div className="flex flex-wrap gap-3 text-sm">
                  {[
                    lang === "en" ? "1-year warranty on all jobs" : "सभी कामों पर 1 साल वारंटी",
                    lang === "en" ? "Priority dispatch" : "प्राथमिकता डिस्पैच",
                    lang === "en" ? "Annual inspection" : "वार्षिक निरीक्षण",
                  ].map((f) => (
                    <span key={f} className="flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {f}
                    </span>
                  ))}
                </div>
              </div>
              <div className="text-center">
                <p className="text-blue-200 text-sm line-through">₹499/year</p>
                <p className="text-3xl font-bold">₹199<span className="text-lg">/year</span></p>
                <button className="mt-3 bg-white text-blue-700 font-bold px-5 py-2.5 rounded-xl hover:bg-blue-50 transition-colors text-sm flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  {lang === "en" ? "Upgrade now" : "अभी अपग्रेड करें"}
                </button>
              </div>
            </div>
          </div>

          {/* How to claim */}
          <div className="mt-8 bg-slate-50 rounded-2xl p-6">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-500" />
              {lang === "en" ? "How to claim your warranty" : "वारंटी कैसे क्लेम करें"}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  step: "1",
                  icon: AlertTriangle,
                  title: lang === "en" ? "Notice the issue" : "समस्या नोटिस करें",
                  desc: lang === "en" ? "Same issue from the original job? Within 90 days?" : "वही समस्या, 90 दिन के अंदर?",
                },
                {
                  step: "2",
                  icon: MessageCircle,
                  title: lang === "en" ? "Tap 'Claim'" : "'क्लेम' टैप करें",
                  desc: lang === "en" ? "Click claim on this page or message us on WhatsApp." : "इस पेज पर क्लेम करें या WhatsApp करें।",
                },
                {
                  step: "3",
                  icon: Calendar,
                  title: lang === "en" ? "Free revisit booked" : "मुफ्त विजिट बुक हुई",
                  desc: lang === "en" ? "Same electrician revisits within 24 hours at zero cost." : "उसी इलेक्ट्रीशियन की 24 घंटे में मुफ्त विजिट।",
                },
              ].map((step) => (
                <div key={step.step} className="flex gap-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-full text-white text-xs font-bold flex items-center justify-center shrink-0">
                    {step.step}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 text-sm mb-1">{step.title}</p>
                    <p className="text-slate-500 text-xs">{step.desc}</p>
                  </div>
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

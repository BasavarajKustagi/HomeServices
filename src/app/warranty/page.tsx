"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Award, CheckCircle2, Clock, AlertTriangle,
  MessageCircle, ArrowRight, Plus, Calendar, ShieldCheck,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useApp } from "@/context/AppContext";
import { getDaysLeft, getWarrantyProgress, buildWhatsAppWarrantyClaim, formatDate } from "@/lib/utils";

export default function WarrantyPage() {
  const { state: { lang, warranties }, claimWarranty } = useApp();
  const hi = lang === "hi";

  const [claimInput, setClaimInput] = useState<{ id: string; issue: string } | null>(null);
  const [claiming, setClaiming] = useState<string | null>(null);

  const handleClaimStart = (id: string) => {
    setClaimInput({ id, issue: "" });
  };

  const handleClaimSubmit = (warrantyId: string, service: string) => {
    if (!claimInput) return;
    setClaiming(warrantyId);
    claimWarranty(warrantyId);
    const waLink = buildWhatsAppWarrantyClaim(warrantyId, service, claimInput.issue);
    window.open(waLink, "_blank");
    setTimeout(() => {
      setClaiming(null);
      setClaimInput(null);
    }, 1000);
  };

  const activeCount = warranties.filter((w) => w.status === "active").length;
  const expiringSoonCount = warranties.filter((w) => {
    if (w.status !== "active") return false;
    return getDaysLeft(w.expiresAt) <= 14;
  }).length;
  const totalProtected = warranties.reduce((s, w) => s + w.amount, 0);

  const getStatusColor = (status: string, daysLeft: number) => {
    if (status === "expired") return "bg-slate-100 text-slate-500 border-slate-200";
    if (status === "claimed") return "bg-blue-50 text-blue-600 border-blue-200";
    if (daysLeft <= 14) return "bg-amber-50 text-amber-700 border-amber-200";
    return "bg-green-50 text-green-700 border-green-200";
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="flex-1 pt-20">
        {/* Header */}
        <div className="bg-gradient-to-br from-blue-700 to-blue-900 py-14">
          <div className="max-w-4xl mx-auto px-4 text-center text-white">
            <div className="inline-flex items-center gap-2 bg-blue-500/30 border border-blue-400/40 rounded-full px-4 py-1.5 mb-4">
              <Award className="w-4 h-4" />
              <span className="text-blue-100 text-sm font-medium">
                {hi ? "उद्योग में पहली गारंटी" : "Industry-first guarantee"}
              </span>
            </div>
            <h1 className="text-4xl font-bold mb-3">
              {hi ? "आपका वारंटी डैशबोर्ड" : "Your Warranty Dashboard"}
            </h1>
            <p className="text-blue-100 text-lg max-w-xl mx-auto">
              {hi
                ? "हर BijliWala काम पर 90 दिन की वारंटी है। सभी वारंटी यहाँ ट्रैक करें। एक टैप में क्लेम करें।"
                : "Every BijliWala job comes with a 90-day warranty. Track all here. Claim in one tap."}
            </p>
          </div>
        </div>

        {/* What's covered */}
        <div className="bg-blue-50 border-b border-blue-100">
          <div className="max-w-4xl mx-auto px-4 py-5">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-center">
              {[
                { icon: "🔧", en: "Workmanship defects", hi: "काम की खामियां" },
                { icon: "⚡", en: "Same issue recurring", hi: "वही समस्या दोबारा" },
                { icon: "🔌", en: "Parts installed by us", hi: "हमारे लगाए पार्ट्स" },
                { icon: "📞", en: "Priority support", hi: "प्राथमिकता सपोर्ट" },
              ].map((item) => (
                <div key={item.en} className="flex flex-col items-center gap-1.5 text-blue-700">
                  <span className="text-2xl">{item.icon}</span>
                  <span className="font-medium text-xs">{hi ? item.hi : item.en}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-10">
          {/* Summary bar */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {[
              { label: hi ? "सक्रिय वारंटी" : "Active warranties", value: activeCount, color: "text-green-600", bg: "bg-green-50" },
              { label: hi ? "जल्द समाप्त" : "Expiring soon (<14d)", value: expiringSoonCount, color: "text-amber-600", bg: "bg-amber-50" },
              { label: hi ? "कुल सुरक्षित" : "Total protected", value: `₹${totalProtected}`, color: "text-blue-600", bg: "bg-blue-50" },
            ].map((stat) => (
              <div key={stat.label} className={`${stat.bg} rounded-xl p-4 text-center`}>
                <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                <p className="text-xs text-slate-600 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Warranty cards */}
          <h2 className="text-lg font-bold text-slate-900 mb-4">
            {hi ? "आपके वारंटी कार्ड" : "Your warranty cards"}
          </h2>

          {warranties.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-slate-100">
              <Award className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <h3 className="font-bold text-slate-700 mb-2">
                {hi ? "अभी कोई वारंटी नहीं" : "No warranties yet"}
              </h3>
              <p className="text-slate-500 text-sm mb-4">
                {hi
                  ? "जब आप पहला काम बुक करेंगे, यहाँ 90-दिन की वारंटी दिखेगी।"
                  : "Book your first job and get a 90-day warranty card here."}
              </p>
              <Link
                href="/booking"
                className="inline-flex items-center gap-2 bg-orange-500 text-white font-bold px-5 py-3 rounded-xl text-sm hover:bg-orange-600 transition-colors"
              >
                {hi ? "सेवा बुक करें" : "Book a service"}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="space-y-4 mb-8">
              {warranties.map((w) => {
                const daysLeft = getDaysLeft(w.expiresAt);
                const isExpired = w.status === "expired" || daysLeft <= 0;
                const isClaimed = w.status === "claimed";
                const isExpiringSoon = !isExpired && !isClaimed && daysLeft <= 14;
                const pct = getWarrantyProgress(w.date, w.expiresAt);
                const isCurrentlyClaiming = claiming === w.id;
                const isClaimFormOpen = claimInput?.id === w.id;

                return (
                  <div
                    key={w.id}
                    className={`bg-white rounded-2xl p-6 border ${isExpired ? "border-slate-200 opacity-70" : "border-slate-100 shadow-sm"}`}
                  >
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-bold text-slate-900">{w.service}</h3>
                            <p className="text-sm text-slate-500 mt-0.5">
                              {hi ? "द्वारा" : "By"} {w.proName}
                            </p>
                          </div>
                          <span className={`text-xs font-medium px-3 py-1 rounded-full border ${getStatusColor(isClaimed ? "claimed" : isExpired ? "expired" : "active", daysLeft)}`}>
                            {isClaimed
                              ? (hi ? "क्लेम किया" : "Claimed")
                              : isExpired
                              ? (hi ? "समाप्त" : "Expired")
                              : (hi ? `${daysLeft} दिन बचे` : `${daysLeft} days left`)}
                          </span>
                        </div>

                        <div className="grid grid-cols-3 gap-3 text-sm mb-4">
                          <div>
                            <p className="text-slate-400 text-xs">{hi ? "काम की तारीख" : "Job date"}</p>
                            <p className="font-medium text-slate-700">{formatDate(w.date)}</p>
                          </div>
                          <div>
                            <p className="text-slate-400 text-xs">{hi ? "समाप्त होगी" : "Expires"}</p>
                            <p className="font-medium text-slate-700">{formatDate(w.expiresAt)}</p>
                          </div>
                          <div>
                            <p className="text-slate-400 text-xs">{hi ? "राशि" : "Amount"}</p>
                            <p className="font-medium text-slate-700">₹{w.amount}</p>
                          </div>
                        </div>

                        {!isExpired && !isClaimed && (
                          <div className="mb-3">
                            <div className="w-full bg-slate-100 rounded-full h-1.5">
                              <div
                                className={`h-1.5 rounded-full transition-all ${isExpiringSoon ? "bg-amber-400" : "bg-green-400"}`}
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                            <div className="flex justify-between text-xs text-slate-400 mt-1">
                              <span>{formatDate(w.date)}</span>
                              <span>{formatDate(w.expiresAt)}</span>
                            </div>
                          </div>
                        )}

                        {isClaimed && w.claimId && (
                          <div className="flex items-center gap-2 bg-blue-50 rounded-lg px-3 py-2 mb-2">
                            <ShieldCheck className="w-4 h-4 text-blue-500 shrink-0" />
                            <span className="text-xs text-blue-700 font-medium">
                              {hi ? `क्लेम ID: ${w.claimId}` : `Claim ID: ${w.claimId}`}
                            </span>
                          </div>
                        )}

                        <p className="text-xs font-mono text-orange-600 bg-orange-50 px-2.5 py-1 rounded-lg inline-block">
                          {w.id}
                        </p>

                        {isExpiringSoon && (
                          <div className="mt-3 flex items-center gap-2 bg-amber-50 rounded-xl p-3 text-xs text-amber-700">
                            <AlertTriangle className="w-4 h-4 shrink-0" />
                            {hi
                              ? `वारंटी ${daysLeft} दिनों में समाप्त। काम चेक करें और जरूरत हो तो क्लेम करें।`
                              : `Warranty expires in ${daysLeft} days. Inspect and claim if needed.`}
                          </div>
                        )}

                        {/* Claim issue input */}
                        {isClaimFormOpen && (
                          <div className="mt-4 space-y-3">
                            <textarea
                              value={claimInput.issue}
                              onChange={(e) => setClaimInput({ id: w.id, issue: e.target.value })}
                              placeholder={hi ? "समस्या का विवरण दें..." : "Describe the issue you're facing..."}
                              rows={2}
                              className="w-full border border-blue-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                            />
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleClaimSubmit(w.id, w.service)}
                                disabled={!claimInput.issue.trim() || isCurrentlyClaiming}
                                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 text-white font-bold py-2.5 rounded-xl text-sm transition-colors flex items-center justify-center gap-2"
                              >
                                <MessageCircle className="w-4 h-4" />
                                {hi ? "WhatsApp पर क्लेम करें" : "Claim via WhatsApp"}
                              </button>
                              <button
                                onClick={() => setClaimInput(null)}
                                className="px-4 py-2.5 border border-slate-300 rounded-xl text-sm text-slate-600 hover:bg-slate-50 transition-colors"
                              >
                                {hi ? "रद्द" : "Cancel"}
                              </button>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex flex-row md:flex-col gap-2 md:w-40">
                        {!isExpired && !isClaimed && !isClaimFormOpen && (
                          <button
                            onClick={() => handleClaimStart(w.id)}
                            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2.5 rounded-xl text-sm transition-colors justify-center"
                          >
                            <AlertTriangle className="w-4 h-4" />
                            {hi ? "क्लेम करें" : "Claim"}
                          </button>
                        )}

                        {isClaimed && (
                          <div className="flex items-center gap-2 bg-green-50 text-green-700 font-medium px-4 py-2.5 rounded-xl text-sm justify-center">
                            <CheckCircle2 className="w-4 h-4" />
                            {hi ? "क्लेम किया!" : "Claimed!"}
                          </div>
                        )}

                        {isExpired && (
                          <Link
                            href="/booking"
                            className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium px-4 py-2.5 rounded-xl text-sm transition-colors justify-center"
                          >
                            {hi ? "फिर बुक करें" : "Book again"}
                            <ArrowRight className="w-4 h-4" />
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Upgrade banner */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6 text-white">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="w-5 h-5" />
                  <span className="font-bold text-lg">
                    {hi ? "BijliWala+ वारंटी पर अपग्रेड करें" : "Upgrade to BijliWala+ Warranty"}
                  </span>
                </div>
                <p className="text-blue-100 text-sm mb-3">
                  {hi
                    ? "सभी वारंटी को 1 पूरे साल तक बढ़ाएं। प्राथमिकता सेवा। मुफ्त वार्षिक बिजली निरीक्षण।"
                    : "Extend ALL warranties to 1 full year. Priority service. Free annual electrical inspection."}
                </p>
                <div className="flex flex-wrap gap-3 text-sm">
                  {[
                    { en: "1-year warranty on all jobs", hi: "सभी कामों पर 1 साल वारंटी" },
                    { en: "Priority dispatch", hi: "प्राथमिकता डिस्पैच" },
                    { en: "Annual inspection", hi: "वार्षिक निरीक्षण" },
                  ].map((f) => (
                    <span key={f.en} className="flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {hi ? f.hi : f.en}
                    </span>
                  ))}
                </div>
              </div>
              <div className="text-center shrink-0">
                <p className="text-blue-200 text-sm line-through">₹499/year</p>
                <p className="text-3xl font-bold">₹199<span className="text-lg">/year</span></p>
                <button className="mt-3 bg-white text-blue-700 font-bold px-5 py-2.5 rounded-xl hover:bg-blue-50 transition-colors text-sm flex items-center gap-2 mx-auto">
                  <Plus className="w-4 h-4" />
                  {hi ? "अभी अपग्रेड करें" : "Upgrade now"}
                </button>
              </div>
            </div>
          </div>

          {/* How to claim */}
          <div className="mt-8 bg-slate-50 rounded-2xl p-6">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-500" />
              {hi ? "वारंटी कैसे क्लेम करें" : "How to claim your warranty"}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  step: "1",
                  en_title: "Notice the issue",
                  hi_title: "समस्या नोटिस करें",
                  en_desc: "Same issue from the original job? Within 90 days?",
                  hi_desc: "वही समस्या, 90 दिन के अंदर?",
                },
                {
                  step: "2",
                  en_title: "Tap 'Claim'",
                  hi_title: "'क्लेम' टैप करें",
                  en_desc: "Click claim above. Describe the issue. WhatsApp opens automatically.",
                  hi_desc: "ऊपर क्लेम दबाएं। समस्या लिखें। WhatsApp अपने आप खुलेगा।",
                },
                {
                  step: "3",
                  en_title: "Free revisit booked",
                  hi_title: "मुफ्त विजिट बुक हुई",
                  en_desc: "Same electrician revisits within 24 hours at zero cost.",
                  hi_desc: "उसी इलेक्ट्रीशियन की 24 घंटे में मुफ्त विजिट।",
                },
              ].map((s) => (
                <div key={s.step} className="flex gap-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-full text-white text-xs font-bold flex items-center justify-center shrink-0">
                    {s.step}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 text-sm mb-1">{hi ? s.hi_title : s.en_title}</p>
                    <p className="text-slate-500 text-xs">{hi ? s.hi_desc : s.en_desc}</p>
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

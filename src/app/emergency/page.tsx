"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Zap, Phone, Clock, MapPin, ShieldCheck, CheckCircle2,
  ArrowRight, AlertTriangle, Navigation,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TrackingView from "@/components/TrackingView";
import { useApp } from "@/context/AppContext";
import { Booking } from "@/context/AppContext";
import { getNearestAvailableElectrician, electricians, cities } from "@/data/content";
import { generateBookingId, generateWarrantyId, buildWhatsAppEmergency, getWarrantyExpiry } from "@/lib/utils";

type Step = "form" | "matching" | "confirmed";

const EMERGENCY_FEE = 49;

export default function EmergencyPage() {
  const { state: { lang, user }, addBooking, addWarranty } = useApp();
  const hi = lang === "hi";

  const [step, setStep] = useState<Step>("form");
  const [city, setCity] = useState(user?.city || "");
  const [address, setAddress] = useState(user?.address || "");
  const [issue, setIssue] = useState("");
  const [phone, setPhone] = useState(user?.phone || "");
  const [dispatchedPro, setDispatchedPro] = useState(electricians[0]);

  const issues = [
    { id: "power_out", icon: "🔌", en: "Complete power outage", hi: "पूरी बिजली गुल" },
    { id: "sparks", icon: "⚡", en: "Sparks / burning smell", hi: "चिंगारी / जलने की गंध" },
    { id: "short", icon: "🔥", en: "Short circuit / tripping", hi: "शॉर्ट सर्किट / ट्रिपिंग" },
    { id: "shock", icon: "😱", en: "Electric shock incident", hi: "बिजली का झटका" },
    { id: "flooding", icon: "💧", en: "Water + electrical hazard", hi: "पानी + बिजली का खतरा" },
    { id: "other", icon: "🔧", en: "Other urgent issue", hi: "अन्य जरूरी समस्या" },
  ];

  const handleUseLocation = () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition((pos) => {
      setAddress(`Lat: ${pos.coords.latitude.toFixed(4)}, Lng: ${pos.coords.longitude.toFixed(4)}`);
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!address || !issue || !phone) return;

    setStep("matching");

    setTimeout(() => {
      const pro = getNearestAvailableElectrician(city) || electricians[0];
      setDispatchedPro(pro);

      const bookingId = generateBookingId();
      const warrantyId = generateWarrantyId();
      const issueLabel = issues.find((i) => i.id === issue)?.[hi ? "hi" : "en"] || issue;

      const booking: Booking = {
        id: bookingId,
        serviceIds: ["emergency"],
        serviceNames: [hi ? "इमरजेंसी सेवा" : "Emergency Service"],
        address,
        city: city || "Unknown",
        phone,
        slot: hi ? "आज — अभी" : "Today — ASAP",
        proId: pro.id,
        proName: pro.name,
        status: "en_route",
        totalAmount: EMERGENCY_FEE,
        paymentMethod: "cash",
        paymentStatus: "pending",
        isEmergency: true,
        issueType: issueLabel,
        createdAt: new Date().toISOString(),
        etaMinutes: pro.eta,
        warrantyId,
      };

      const warranty = {
        id: warrantyId,
        bookingId,
        service: hi ? "इमरजेंसी सेवा" : "Emergency Service",
        proName: pro.name,
        amount: EMERGENCY_FEE,
        date: new Date().toISOString(),
        expiresAt: getWarrantyExpiry(new Date()),
        status: "active" as const,
      };

      addBooking(booking);
      addWarranty(warranty);

      const waLink = buildWhatsAppEmergency(address, issueLabel);
      window.open(waLink, "_blank");

      setStep("confirmed");
    }, 2800);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

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
              {hi ? "इमरजेंसी इलेक्ट्रीशियन" : "Emergency Electrician"}
            </h1>
            <p className="text-red-100 text-lg max-w-xl mx-auto">
              {hi
                ? "2 घंटे में वेरिफाइड इलेक्ट्रीशियन। ₹49 तय इमरजेंसी फीस। कोई सर्ज प्राइसिंग नहीं।"
                : "Verified electrician dispatched in under 2 hours. Fixed ₹49 emergency fee. No surge pricing."}
            </p>
          </div>
        </div>

        {/* Trust bar */}
        <div className="bg-red-50 border-b border-red-100 py-3">
          <div className="max-w-4xl mx-auto px-4 flex flex-wrap justify-center gap-6 text-sm">
            {[
              { icon: Clock, label: hi ? "औसत रिस्पांस: 37 मिनट" : "Avg. response: 37 min", color: "text-red-600" },
              { icon: ShieldCheck, label: hi ? "बैकग्राउंड वेरिफाइड" : "Background verified", color: "text-green-600" },
              { icon: CheckCircle2, label: hi ? "सिर्फ ₹49 तय फीस" : "Fixed ₹49 fee only", color: "text-blue-600" },
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
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                  <h2 className="text-xl font-bold text-slate-900">
                    {hi ? "अभी मदद लें" : "Get help now"}
                  </h2>
                </div>
                <p className="text-slate-500 text-sm mb-6">
                  {hi
                    ? "4 फील्ड भरें। हम नजदीकी उपलब्ध इलेक्ट्रीशियन भेजेंगे।"
                    : "Fill in 4 fields. We dispatch the nearest verified electrician."}
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                      {hi ? "आपका मोबाइल नंबर" : "Your mobile number"}
                    </label>
                    <div className="flex">
                      <span className="flex items-center px-3 bg-slate-100 border border-r-0 border-slate-300 rounded-l-xl text-slate-500 text-sm">+91</span>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                        placeholder="9876543210"
                        className="flex-1 border border-slate-300 rounded-r-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                      {hi ? "शहर" : "City"}
                    </label>
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
                    >
                      <option value="">{hi ? "शहर चुनें" : "Select city"}</option>
                      {cities.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                      {hi ? "आपका पता" : "Your address"}
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder={hi ? "मकान नं., इलाका, शहर" : "House no., area, city"}
                        className="w-full border border-slate-300 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
                        required
                      />
                    </div>
                    <button
                      type="button"
                      onClick={handleUseLocation}
                      className="mt-1.5 text-xs text-red-600 flex items-center gap-1 hover:text-red-700"
                    >
                      <Navigation className="w-3 h-3" />
                      {hi ? "मेरी वर्तमान लोकेशन उपयोग करें" : "Use my current location"}
                    </button>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                      {hi ? "क्या समस्या है?" : "What's the issue?"}
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
                          <span className="text-xs">{hi ? iss.hi : iss.en}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={!address || !issue || phone.length < 10}
                    className="w-full bg-red-600 hover:bg-red-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-colors flex items-center justify-center gap-2 text-base"
                  >
                    <Zap className="w-5 h-5" />
                    {hi ? "अभी इलेक्ट्रीशियन भेजें" : "Dispatch Electrician Now"}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <p className="text-center text-xs text-slate-500">
                    {hi
                      ? "₹49 इमरजेंसी फीस • WhatsApp पर कन्फर्मेशन मिलेगी"
                      : "₹49 emergency fee • WhatsApp confirmation will open"}
                  </p>
                </form>
              </div>

              {/* Info panel */}
              <div className="space-y-4">
                <div className="bg-slate-50 rounded-2xl p-5">
                  <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-red-500" />
                    {hi ? "आगे क्या होगा" : "What happens next"}
                  </h3>
                  <div className="space-y-3">
                    {[
                      { time: "0 min", en: "You submit this form", hi: "आप फॉर्म जमा करते हैं" },
                      { time: "2 min", en: "We find nearest verified pro", hi: "हम नजदीकी वेरिफाइड प्रो ढूंढते हैं" },
                      { time: "5 min", en: "WhatsApp opens with booking details", hi: "WhatsApp पर बुकिंग डिटेल खुलती है" },
                      { time: "~37 min", en: "Electrician arrives at your door", hi: "इलेक्ट्रीशियन आपके दरवाजे पर" },
                    ].map((row, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="w-12 text-xs font-bold text-red-600 mt-0.5 shrink-0">{row.time}</div>
                        <div className="flex-1 text-sm text-slate-600">{hi ? row.hi : row.en}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl p-5">
                  <h3 className="font-bold text-slate-900 mb-3">
                    {hi ? "इमरजेंसी कीमत (पारदर्शी)" : "Emergency pricing (transparent)"}
                  </h3>
                  <div className="space-y-2 text-sm">
                    {[
                      { label: hi ? "इमरजेंसी डिस्पैच फीस" : "Emergency dispatch fee", value: "₹49" },
                      { label: hi ? "सर्विस काम (तय)" : "Service work (fixed)", value: hi ? "आने पर दिखाया जाएगा" : "shown on arrival", note: hi ? "कोई हैरानी नहीं" : "No surprises" },
                      { label: hi ? "रात का सरचार्ज" : "Night surcharge (10pm–6am)", value: "₹0", note: hi ? "हम अतिरिक्त नहीं लेते" : "We never charge extra" },
                      { label: hi ? "वीकेंड सरचार्ज" : "Weekend surcharge", value: "₹0" },
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

                <div className="bg-red-50 border border-red-200 rounded-2xl p-4 text-center">
                  <p className="text-sm text-red-600 font-medium mb-2">
                    {hi ? "या सीधे कॉल करें" : "Or call us directly"}
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
                {hi ? "नजदीकी इलेक्ट्रीशियन ढूंढ रहे हैं..." : "Finding nearest electrician..."}
              </h2>
              <p className="text-slate-500 mb-2">
                {hi
                  ? "आपकी लोकेशन के 5km में उपलब्ध प्रो चेक कर रहे हैं"
                  : "Checking available pros within 5km of your location"}
              </p>
              {city && (
                <p className="text-sm font-medium text-orange-600">
                  {hi ? `${city} में मिलान हो रहा है` : `Matching in ${city}`}
                </p>
              )}
              <div className="mt-6 flex justify-center gap-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-2.5 h-2.5 bg-red-400 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                ))}
              </div>
            </div>
          )}

          {step === "confirmed" && (
            <div className="max-w-lg mx-auto">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">
                  {hi ? "इलेक्ट्रीशियन भेज दिया!" : "Electrician dispatched!"}
                </h2>
                <p className="text-slate-500 text-sm">
                  {hi
                    ? "WhatsApp पर बुकिंग डिटेल खुल रही है।"
                    : "WhatsApp booking confirmation is opening."}
                </p>
              </div>

              <TrackingView pro={dispatchedPro} initialEta={dispatchedPro.eta} lang={lang} />

              <div className="text-center mt-6">
                <Link href="/profile" className="text-orange-600 text-sm font-medium hover:underline">
                  {hi ? "बुकिंग ट्रैक करें →" : "Track booking in profile →"}
                </Link>
              </div>
              <div className="text-center mt-2">
                <Link href="/" className="text-slate-400 text-sm hover:text-orange-600 transition-colors">
                  ← {hi ? "होम पर वापस" : "Back to home"}
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

"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Zap, CheckCircle2, Award, Clock, MapPin, ArrowRight,
  ArrowLeft, Calendar, ShieldCheck, Star,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Language, services, electricians, cities } from "@/data/content";

type BookingStep = 1 | 2 | 3 | 4;

function BookingContent() {
  const searchParams = useSearchParams();
  const preSelectedService = searchParams.get("service") || "";
  const preSelectedPro = searchParams.get("pro") || "";

  const [lang, setLang] = useState<Language>("en");
  const [step, setStep] = useState<BookingStep>(1);
  const [selectedServices, setSelectedServices] = useState<string[]>(
    preSelectedService ? [preSelectedService] : []
  );
  const [selectedPro, setSelectedPro] = useState(preSelectedPro);
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [slot, setSlot] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  const selectedServiceData = services.filter((s) => selectedServices.includes(s.id));
  const total = selectedServiceData.reduce((s, i) => s + i.price, 0);
  const selectedProData = electricians.find((e) => e.id === selectedPro);

  const toggleService = (id: string) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const timeSlots = [
    "Today, 10:00–11:00 AM",
    "Today, 12:00–1:00 PM",
    "Today, 3:00–4:00 PM",
    "Tomorrow, 9:00–10:00 AM",
    "Tomorrow, 11:00–12:00 PM",
    "Tomorrow, 2:00–3:00 PM",
  ];

  const canNext = () => {
    if (step === 1) return selectedServices.length > 0;
    if (step === 2) return city !== "" && address !== "" && phone.length === 10;
    if (step === 3) return slot !== "";
    return false;
  };

  const handleConfirm = () => {
    setConfirmed(true);
  };

  if (confirmed) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">
          {lang === "en" ? "Booking confirmed! 🎉" : "बुकिंग कन्फर्म! 🎉"}
        </h2>
        <p className="text-slate-500 mb-6">
          {lang === "en"
            ? "Your booking is confirmed. You'll receive confirmation on WhatsApp shortly."
            : "आपकी बुकिंग कन्फर्म हो गई। WhatsApp पर पुष्टि मिलेगी।"}
        </p>

        <div className="bg-white rounded-2xl p-6 border border-slate-100 card-shadow text-left mb-6">
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-500">{lang === "en" ? "Services" : "सेवाएं"}</span>
              <span className="font-medium text-right">
                {selectedServiceData.map((s) => lang === "en" ? s.name_en : s.name_hi).join(", ")}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">{lang === "en" ? "Slot" : "समय"}</span>
              <span className="font-medium">{slot}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">{lang === "en" ? "Electrician" : "इलेक्ट्रीशियन"}</span>
              <span className="font-medium">{selectedProData?.name || "Auto-assigned"}</span>
            </div>
            <div className="flex justify-between border-t pt-3">
              <span className="font-bold">{lang === "en" ? "Total" : "कुल"}</span>
              <span className="font-bold text-orange-600">₹{total}</span>
            </div>
          </div>
          <div className="mt-4 bg-green-50 rounded-xl p-3 flex items-center gap-2">
            <Award className="w-4 h-4 text-green-600" />
            <span className="text-xs text-green-700 font-medium">
              {lang === "en" ? "90-day warranty will be issued after job completion" : "काम पूरा होने के बाद 90 दिन वारंटी मिलेगी"}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Link
            href="/warranty"
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-colors text-sm"
          >
            <Award className="w-4 h-4" />
            {lang === "en" ? "Track your warranty" : "वारंटी ट्रैक करें"}
          </Link>
          <Link
            href="/"
            className="text-slate-500 text-sm hover:text-orange-600 transition-colors"
          >
            ← {lang === "en" ? "Back to home" : "होम पर वापस"}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {/* Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          {[
            lang === "en" ? "Services" : "सेवाएं",
            lang === "en" ? "Details" : "विवरण",
            lang === "en" ? "Schedule" : "शेड्यूल",
            lang === "en" ? "Confirm" : "पुष्टि",
          ].map((label, i) => (
            <div key={i} className="flex-1 flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mb-1 ${
                  step > i + 1
                    ? "bg-green-500 text-white"
                    : step === i + 1
                    ? "bg-orange-500 text-white"
                    : "bg-slate-200 text-slate-500"
                }`}
              >
                {step > i + 1 ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
              </div>
              <span className={`text-xs hidden sm:block ${step === i + 1 ? "text-orange-600 font-medium" : "text-slate-400"}`}>
                {label}
              </span>
            </div>
          ))}
          <div className="absolute left-8 right-8 h-0.5 bg-slate-200 -z-10" />
        </div>
        <div className="w-full bg-slate-100 rounded-full h-1.5">
          <div
            className="bg-orange-500 h-1.5 rounded-full transition-all"
            style={{ width: `${((step - 1) / 3) * 100}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main form */}
        <div className="lg:col-span-2">
          {/* Step 1: Services */}
          {step === 1 && (
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-1">
                {lang === "en" ? "What do you need?" : "आपको क्या चाहिए?"}
              </h2>
              <p className="text-slate-500 text-sm mb-5">
                {lang === "en" ? "Select one or more services" : "एक या अधिक सेवाएं चुनें"}
              </p>
              <div className="grid grid-cols-2 gap-3">
                {services.map((svc) => (
                  <button
                    key={svc.id}
                    onClick={() => toggleService(svc.id)}
                    className={`text-left p-4 rounded-xl border transition-all ${
                      selectedServices.includes(svc.id)
                        ? "border-orange-500 bg-orange-50 ring-1 ring-orange-300"
                        : "border-slate-200 bg-white hover:border-orange-300"
                    }`}
                  >
                    <div className="text-2xl mb-2">{svc.icon}</div>
                    <p className="font-medium text-slate-900 text-sm">
                      {lang === "en" ? svc.name_en : svc.name_hi}
                    </p>
                    <p className="text-orange-600 font-bold text-sm mt-1">₹{svc.price}</p>
                    <p className="text-slate-400 text-xs mt-0.5">{svc.time}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Address */}
          {step === 2 && (
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-1">
                {lang === "en" ? "Where do you need help?" : "आपको कहाँ मदद चाहिए?"}
              </h2>
              <p className="text-slate-500 text-sm mb-5">
                {lang === "en" ? "We'll send a pro to this address" : "हम इस पते पर प्रो भेजेंगे"}
              </p>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    {lang === "en" ? "City" : "शहर"}
                  </label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                  >
                    <option value="">{lang === "en" ? "Select your city" : "शहर चुनें"}</option>
                    {cities.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    {lang === "en" ? "Full address" : "पूरा पता"}
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                    <textarea
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder={lang === "en" ? "House no., street, area, landmark" : "मकान नं., गली, इलाका, लैंडमार्क"}
                      rows={3}
                      className="w-full border border-slate-300 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    {lang === "en" ? "Mobile number" : "मोबाइल नंबर"}
                  </label>
                  <div className="flex">
                    <span className="flex items-center px-3 bg-slate-100 border border-r-0 border-slate-300 rounded-l-xl text-slate-500 text-sm">+91</span>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                      placeholder="10-digit number"
                      className="flex-1 border border-slate-300 rounded-r-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Schedule + Pro */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900 mb-1">
                  {lang === "en" ? "When do you want it?" : "कब चाहिए?"}
                </h2>
                <p className="text-slate-500 text-sm mb-4">
                  {lang === "en" ? "Pick a time slot" : "समय स्लॉट चुनें"}
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {timeSlots.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSlot(s)}
                      className={`flex items-center gap-2 px-3 py-3 rounded-xl border text-sm transition-all ${
                        slot === s
                          ? "border-orange-500 bg-orange-50 text-orange-700 font-medium"
                          : "border-slate-200 bg-white text-slate-600 hover:border-orange-300"
                      }`}
                    >
                      <Calendar className="w-4 h-4 shrink-0" />
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 mb-3">
                  {lang === "en" ? "Choose your electrician (optional)" : "इलेक्ट्रीशियन चुनें (वैकल्पिक)"}
                </h3>
                <div className="space-y-3">
                  {electricians.filter((e) => e.available).map((pro) => (
                    <button
                      key={pro.id}
                      onClick={() => setSelectedPro(pro.id === selectedPro ? "" : pro.id)}
                      className={`w-full text-left flex items-center gap-3 p-4 rounded-xl border transition-all ${
                        selectedPro === pro.id
                          ? "border-orange-500 bg-orange-50"
                          : "border-slate-200 bg-white hover:border-orange-300"
                      }`}
                    >
                      <div className={`w-10 h-10 ${pro.color} rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0`}>
                        {pro.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-slate-900 text-sm">{pro.name}</p>
                          {pro.bgCheck && <ShieldCheck className="w-3.5 h-3.5 text-green-500" />}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                          <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                          {pro.rating} · {pro.jobs} jobs · {pro.experience}y exp
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-green-600 font-medium">~{pro.eta} min</p>
                        <p className="text-xs text-slate-400">away</p>
                      </div>
                    </button>
                  ))}
                  <p className="text-xs text-slate-400 text-center">
                    {lang === "en"
                      ? "Or skip to auto-assign the best available pro"
                      : "या सर्वश्रेष्ठ उपलब्ध प्रो के लिए छोड़ें"}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Confirm */}
          {step === 4 && (
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-5">
                {lang === "en" ? "Review & confirm" : "समीक्षा और पुष्टि"}
              </h2>
              <div className="space-y-4">
                {[
                  {
                    label: lang === "en" ? "Services" : "सेवाएं",
                    value: selectedServiceData.map((s) => lang === "en" ? s.name_en : s.name_hi).join(", "),
                  },
                  { label: lang === "en" ? "Address" : "पता", value: `${address}, ${city}` },
                  { label: lang === "en" ? "Mobile" : "मोबाइल", value: `+91 ${phone}` },
                  { label: lang === "en" ? "Slot" : "समय", value: slot },
                  {
                    label: lang === "en" ? "Electrician" : "इलेक्ट्रीशियन",
                    value: selectedProData?.name || (lang === "en" ? "Auto-assigned" : "ऑटो-असाइन"),
                  },
                ].map((row) => (
                  <div key={row.label} className="flex gap-3 text-sm">
                    <span className="text-slate-400 w-24 shrink-0">{row.label}</span>
                    <span className="font-medium text-slate-900">{row.value}</span>
                  </div>
                ))}

                <div className="bg-green-50 rounded-xl p-4 flex items-center gap-3">
                  <Award className="w-5 h-5 text-green-600 shrink-0" />
                  <p className="text-sm text-green-700">
                    {lang === "en"
                      ? "Your job will come with a 90-day warranty. Digital warranty card sent to your WhatsApp."
                      : "आपके काम पर 90 दिन की वारंटी मिलेगी। डिजिटल वारंटी कार्ड WhatsApp पर भेजा जाएगा।"}
                  </p>
                </div>

                <div className="bg-blue-50 rounded-xl p-4 flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0" />
                  <p className="text-sm text-blue-700">
                    {lang === "en"
                      ? "Price is FIXED. The electrician cannot charge more than what's shown below."
                      : "कीमत तय है। इलेक्ट्रीशियन नीचे दिखाई गई कीमत से ज्यादा नहीं ले सकता।"}
                  </p>
                </div>
              </div>

              <button
                onClick={handleConfirm}
                className="w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-xl transition-colors flex items-center justify-center gap-2 text-base"
              >
                <CheckCircle2 className="w-5 h-5" />
                {lang === "en" ? `Confirm & Pay ₹${total}` : `₹${total} कन्फर्म करें`}
              </button>
              <p className="text-center text-xs text-slate-400 mt-2">
                {lang === "en" ? "Pay after the job is done" : "काम पूरा होने के बाद भुगतान करें"}
              </p>
            </div>
          )}

          {/* Navigation */}
          <div className="flex gap-3 mt-6">
            {step > 1 && (
              <button
                onClick={() => setStep((s) => (s - 1) as BookingStep)}
                className="flex items-center gap-2 px-5 py-3 border border-slate-300 rounded-xl text-slate-700 hover:bg-slate-50 transition-colors text-sm font-medium"
              >
                <ArrowLeft className="w-4 h-4" />
                {lang === "en" ? "Back" : "वापस"}
              </button>
            )}
            {step < 4 && (
              <button
                disabled={!canNext()}
                onClick={() => setStep((s) => (s + 1) as BookingStep)}
                className="flex-1 flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 disabled:bg-slate-200 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl transition-colors text-sm"
              >
                {lang === "en" ? "Continue" : "आगे बढ़ें"}
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Summary sidebar */}
        <div>
          <div className="sticky top-24 bg-white rounded-2xl border border-slate-100 card-shadow overflow-hidden">
            <div className="bg-slate-50 px-5 py-3">
              <h3 className="font-bold text-slate-900 text-sm">
                {lang === "en" ? "Your order summary" : "आपका ऑर्डर सारांश"}
              </h3>
            </div>
            <div className="p-5">
              {selectedServiceData.length === 0 ? (
                <p className="text-slate-400 text-sm text-center py-4">
                  {lang === "en" ? "No services selected yet" : "अभी कोई सेवा नहीं चुनी"}
                </p>
              ) : (
                <div className="space-y-2">
                  {selectedServiceData.map((svc) => (
                    <div key={svc.id} className="flex justify-between text-sm">
                      <span className="text-slate-600">{lang === "en" ? svc.name_en : svc.name_hi}</span>
                      <span className="font-semibold">₹{svc.price}</span>
                    </div>
                  ))}
                  <div className="border-t pt-2 mt-2 flex justify-between font-bold">
                    <span>{lang === "en" ? "Total" : "कुल"}</span>
                    <span className="text-orange-600">₹{total}</span>
                  </div>
                </div>
              )}

              <div className="mt-4 space-y-2">
                {[
                  { icon: CheckCircle2, label: lang === "en" ? "Fixed price. No hidden charges." : "तय कीमत। कोई छुपी फीस नहीं।", color: "text-green-500" },
                  { icon: Award, label: lang === "en" ? "90-day warranty included" : "90 दिन वारंटी शामिल", color: "text-blue-500" },
                  { icon: ShieldCheck, label: lang === "en" ? "BG-verified electrician" : "BG-वेरिफाइड इलेक्ट्रीशियन", color: "text-purple-500" },
                  { icon: Clock, label: lang === "en" ? "Pay after job completion" : "काम के बाद भुगतान", color: "text-orange-500" },
                ].map(({ icon: Icon, label, color }) => (
                  <div key={label} className="flex items-center gap-2 text-xs text-slate-600">
                    <Icon className={`w-3.5 h-3.5 ${color} shrink-0`} />
                    {label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BookingPage() {
  const [lang, setLang] = useState<Language>("en");

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar lang={lang} setLang={setLang} />
      <div className="flex-1 pt-20 bg-slate-50">
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 py-8">
          <div className="max-w-4xl mx-auto px-4 flex items-center gap-3 text-white">
            <Zap className="w-6 h-6 text-orange-400" />
            <div>
              <h1 className="text-xl font-bold">
                {lang === "en" ? "Book a Service" : "सेवा बुक करें"}
              </h1>
              <p className="text-slate-400 text-sm">
                {lang === "en"
                  ? "Fixed price · Verified pro · 90-day warranty"
                  : "तय कीमत · वेरिफाइड प्रो · 90 दिन वारंटी"}
              </p>
            </div>
          </div>
        </div>
        <Suspense fallback={
          <div className="flex items-center justify-center py-20">
            <div className="flex gap-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-3 h-3 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
              ))}
            </div>
          </div>
        }>
          <BookingContent />
        </Suspense>
      </div>
      <Footer />
    </div>
  );
}

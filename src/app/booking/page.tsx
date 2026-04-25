"use client";

import { useState, Suspense, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  Zap, CheckCircle2, Award, Clock, MapPin, ArrowRight,
  ArrowLeft, Calendar, ShieldCheck, Star, Camera, MessageSquare,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PaymentModal from "@/components/PaymentModal";
import { useApp } from "@/context/AppContext";
import { Booking, PaymentMethod } from "@/context/AppContext";
import { services, cities, electricians, getNearestAvailableElectrician } from "@/data/content";
import {
  generateBookingId, generateWarrantyId, generateTimeSlots,
  buildWhatsAppBookingConfirm, getWarrantyExpiry,
} from "@/lib/utils";

type BookingStep = 1 | 2 | 3 | 4;

function BookingContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { state: { lang, user, cart }, addBooking, addWarranty, clearCart } = useApp();
  const hi = lang === "hi";

  const preSelectedService = searchParams.get("service") || "";

  // Prefill from cart if present, otherwise from URL param
  const cartServiceIds = cart.map((c) => c.serviceId);
  const initialServices = cartServiceIds.length > 0
    ? cartServiceIds
    : preSelectedService ? [preSelectedService] : [];

  const [step, setStep] = useState<BookingStep>(1);
  const [selectedServices, setSelectedServices] = useState<string[]>(initialServices);
  const [city, setCity] = useState(user?.city || "");
  const [address, setAddress] = useState(user?.address || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [slot, setSlot] = useState("");
  const [selectedProId, setSelectedProId] = useState("");
  const [issueDescription, setIssueDescription] = useState("");
  const [photoNote, setPhotoNote] = useState("");
  const [showPayment, setShowPayment] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);
  const [timeSlots] = useState(() => generateTimeSlots());

  const selectedServiceData = services.filter((s) => selectedServices.includes(s.id));
  const total = selectedServiceData.reduce((s, i) => s + i.price, 0);
  const selectedProData = electricians.find((e) => e.id === selectedProId);

  const toggleService = (id: string) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const canNext = () => {
    if (step === 1) return selectedServices.length > 0;
    if (step === 2) return city !== "" && address.trim().length > 5 && phone.length === 10;
    if (step === 3) return slot !== "";
    return false;
  };

  const handleOpenPayment = () => setShowPayment(true);

  const handlePaymentSuccess = (method: PaymentMethod) => {
    setShowPayment(false);

    const bookingId = generateBookingId();
    const warrantyId = generateWarrantyId();
    const pro = selectedProData || getNearestAvailableElectrician(city) || electricians[0];
    const serviceNames = selectedServiceData.map((s) => hi ? s.name_hi : s.name_en);
    const slotLabel = timeSlots.find((ts) => ts.value === slot)?.label || slot;

    const booking: Booking = {
      id: bookingId,
      serviceIds: selectedServices,
      serviceNames,
      address,
      city,
      phone,
      slot: slotLabel,
      proId: pro.id,
      proName: pro.name,
      status: "confirmed",
      totalAmount: total,
      paymentMethod: method,
      paymentStatus: method === "cash" ? "pending" : "paid",
      isEmergency: false,
      issueType: issueDescription || undefined,
      photoDescription: photoNote || undefined,
      createdAt: new Date().toISOString(),
      etaMinutes: pro.eta,
      warrantyId,
    };

    const warranty = {
      id: warrantyId,
      bookingId,
      service: serviceNames.join(", "),
      proName: pro.name,
      amount: total,
      date: new Date().toISOString(),
      expiresAt: getWarrantyExpiry(new Date()),
      status: "active" as const,
    };

    addBooking(booking);
    addWarranty(warranty);
    clearCart();
    setConfirmedBooking(booking);

    // Open WhatsApp confirmation
    const waLink = buildWhatsAppBookingConfirm(bookingId, serviceNames.join(", "), pro.name, slotLabel, total);
    setTimeout(() => window.open(waLink, "_blank"), 500);
  };

  if (confirmedBooking) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">
          {hi ? "बुकिंग कन्फर्म! 🎉" : "Booking Confirmed! 🎉"}
        </h2>
        <p className="text-slate-500 mb-6">
          {hi
            ? "WhatsApp पर कन्फर्मेशन भेजा जा रहा है।"
            : "WhatsApp confirmation opening now."}
        </p>

        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm text-left mb-6">
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-500">{hi ? "बुकिंग ID" : "Booking ID"}</span>
              <span className="font-mono font-bold text-orange-600">{confirmedBooking.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">{hi ? "सेवाएं" : "Services"}</span>
              <span className="font-medium text-right max-w-[180px]">{confirmedBooking.serviceNames.join(", ")}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">{hi ? "समय" : "Slot"}</span>
              <span className="font-medium">{confirmedBooking.slot}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">{hi ? "इलेक्ट्रीशियन" : "Electrician"}</span>
              <span className="font-medium">{confirmedBooking.proName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">{hi ? "भुगतान" : "Payment"}</span>
              <span className="font-medium capitalize">
                {confirmedBooking.paymentStatus === "paid" ? (hi ? "UPI ✓" : "UPI Paid ✓") : (hi ? "नकद" : "Cash on completion")}
              </span>
            </div>
            <div className="flex justify-between border-t pt-3">
              <span className="font-bold">{hi ? "कुल" : "Total"}</span>
              <span className="font-bold text-orange-600">₹{confirmedBooking.totalAmount}</span>
            </div>
          </div>
          <div className="mt-4 bg-green-50 rounded-xl p-3 flex items-center gap-2">
            <Award className="w-4 h-4 text-green-600 shrink-0" />
            <span className="text-xs text-green-700 font-medium">
              {hi ? "90 दिन वारंटी सक्रिय हो गई!" : "90-day warranty activated!"}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Link
            href="/profile"
            className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition-colors text-sm"
          >
            <CheckCircle2 className="w-4 h-4" />
            {hi ? "बुकिंग ट्रैक करें" : "Track Your Booking"}
          </Link>
          <Link
            href="/warranty"
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-colors text-sm"
          >
            <Award className="w-4 h-4" />
            {hi ? "वारंटी देखें" : "View Warranty"}
          </Link>
          <Link href="/" className="text-slate-500 text-sm hover:text-orange-600 transition-colors">
            ← {hi ? "होम पर वापस" : "Back to home"}
          </Link>
        </div>
      </div>
    );
  }

  const availableSlots = timeSlots.filter((ts) => ts.available);
  const cityPros = city
    ? electricians.filter((e) => e.city.toLowerCase() === city.toLowerCase() && e.available)
    : electricians.filter((e) => e.available).slice(0, 4);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {/* Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3 relative">
          {[
            hi ? "सेवाएं" : "Services",
            hi ? "विवरण" : "Details",
            hi ? "शेड्यूल" : "Schedule",
            hi ? "पुष्टि" : "Confirm",
          ].map((label, i) => (
            <div key={i} className="flex-1 flex flex-col items-center z-10">
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
        </div>
        <div className="w-full bg-slate-100 rounded-full h-1.5">
          <div
            className="bg-orange-500 h-1.5 rounded-full transition-all duration-300"
            style={{ width: `${((step - 1) / 3) * 100}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {/* Step 1: Services */}
          {step === 1 && (
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-1">
                {hi ? "क्या चाहिए?" : "What do you need?"}
              </h2>
              <p className="text-slate-500 text-sm mb-5">
                {hi ? "एक या अधिक सेवाएं चुनें" : "Select one or more services"}
              </p>

              {cart.length > 0 && (
                <div className="mb-4 bg-orange-50 border border-orange-200 rounded-xl px-4 py-3 text-sm text-orange-700 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  {hi ? `${cart.length} सेवाएं कार्ट से जोड़ी गईं` : `${cart.length} service(s) pre-loaded from your cart`}
                </div>
              )}

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
                      {hi ? svc.name_hi : svc.name_en}
                    </p>
                    <p className="text-orange-600 font-bold text-sm mt-1">₹{svc.price}</p>
                    <p className="text-slate-400 text-xs mt-0.5">{svc.time}</p>
                  </button>
                ))}
              </div>

              {/* Issue description */}
              <div className="mt-5">
                <label className="block text-sm font-medium text-slate-700 mb-1.5 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-slate-400" />
                  {hi ? "समस्या का विवरण (वैकल्पिक)" : "Describe the issue (optional)"}
                </label>
                <textarea
                  value={issueDescription}
                  onChange={(e) => setIssueDescription(e.target.value)}
                  placeholder={hi ? "उदा. पंखा चलता है लेकिन धीमा है, MCB बार-बार ट्रिप होती है..." : "e.g. Fan runs slow, MCB keeps tripping, socket sparks when plugging in..."}
                  rows={3}
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none"
                />
              </div>
              <div className="mt-3">
                <label className="block text-sm font-medium text-slate-700 mb-1.5 flex items-center gap-2">
                  <Camera className="w-4 h-4 text-slate-400" />
                  {hi ? "फोटो विवरण (वैकल्पिक)" : "Photo description (optional)"}
                </label>
                <input
                  type="text"
                  value={photoNote}
                  onChange={(e) => setPhotoNote(e.target.value)}
                  placeholder={hi ? "फोटो में क्या दिख रहा है?" : "Describe what the photo shows (or paste image URL)"}
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>
            </div>
          )}

          {/* Step 2: Address */}
          {step === 2 && (
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-1">
                {hi ? "कहाँ मदद चाहिए?" : "Where do you need help?"}
              </h2>
              <p className="text-slate-500 text-sm mb-5">
                {hi ? "हम इस पते पर प्रो भेजेंगे" : "We'll send a verified pro to this address"}
              </p>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    {hi ? "शहर" : "City"}
                  </label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                  >
                    <option value="">{hi ? "शहर चुनें" : "Select your city"}</option>
                    {cities.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                  {city && (
                    <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      {hi
                        ? `${city} में ${electricians.filter((e) => e.city === city && e.available).length} इलेक्ट्रीशियन उपलब्ध`
                        : `${electricians.filter((e) => e.city === city && e.available).length} electricians available in ${city}`}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    {hi ? "पूरा पता" : "Full address"}
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                    <textarea
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder={hi ? "मकान नं., गली, इलाका, लैंडमार्क" : "House no., street, area, landmark"}
                      rows={3}
                      className="w-full border border-slate-300 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    {hi ? "मोबाइल नंबर" : "Mobile number"}
                  </label>
                  <div className="flex">
                    <span className="flex items-center px-3 bg-slate-100 border border-r-0 border-slate-300 rounded-l-xl text-slate-500 text-sm font-medium">+91</span>
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
                  {hi ? "कब चाहिए?" : "When do you want it?"}
                </h2>
                <p className="text-slate-500 text-sm mb-4">
                  {hi ? "समय स्लॉट चुनें" : "Choose a time slot"}
                </p>
                {availableSlots.length === 0 ? (
                  <p className="text-slate-400 text-sm">
                    {hi ? "कोई स्लॉट उपलब्ध नहीं। कल फिर कोशिश करें।" : "No slots available. Check back tomorrow."}
                  </p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {availableSlots.map((ts) => (
                      <button
                        key={ts.value}
                        onClick={() => setSlot(ts.value)}
                        className={`flex items-center gap-2 px-3 py-3 rounded-xl border text-sm transition-all text-left ${
                          slot === ts.value
                            ? "border-orange-500 bg-orange-50 text-orange-700 font-medium"
                            : "border-slate-200 bg-white text-slate-600 hover:border-orange-300"
                        }`}
                      >
                        <Calendar className="w-4 h-4 shrink-0 text-slate-400" />
                        {hi ? ts.label_hi : ts.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <h3 className="font-bold text-slate-900 mb-1">
                  {hi ? "इलेक्ट्रीशियन चुनें (वैकल्पिक)" : "Choose electrician (optional)"}
                </h3>
                <p className="text-slate-400 text-xs mb-3">
                  {hi ? "या सर्वश्रेष्ठ उपलब्ध प्रो के लिए छोड़ें" : "Skip to auto-assign the best available pro in your city"}
                </p>
                <div className="space-y-2">
                  {cityPros.slice(0, 4).map((pro) => (
                    <button
                      key={pro.id}
                      onClick={() => setSelectedProId(pro.id === selectedProId ? "" : pro.id)}
                      className={`w-full text-left flex items-center gap-3 p-3.5 rounded-xl border transition-all ${
                        selectedProId === pro.id
                          ? "border-orange-500 bg-orange-50"
                          : "border-slate-200 bg-white hover:border-orange-300"
                      }`}
                    >
                      <div className={`w-9 h-9 ${pro.color} rounded-full flex items-center justify-center text-white font-bold text-xs shrink-0`}>
                        {pro.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <p className="font-semibold text-slate-900 text-sm">{pro.name}</p>
                          {pro.bgCheck && <ShieldCheck className="w-3.5 h-3.5 text-green-500 shrink-0" />}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                          <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                          {pro.rating} · {pro.jobs} jobs · {pro.area}
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-xs text-green-600 font-medium">~{pro.eta} min</p>
                        <p className="text-xs text-slate-400">{hi ? "दूर" : "away"}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Confirm */}
          {step === 4 && (
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-5">
                {hi ? "समीक्षा और पुष्टि" : "Review & Confirm"}
              </h2>
              <div className="space-y-3 text-sm">
                {[
                  { label: hi ? "सेवाएं" : "Services", value: selectedServiceData.map((s) => hi ? s.name_hi : s.name_en).join(", ") },
                  { label: hi ? "पता" : "Address", value: `${address}, ${city}` },
                  { label: hi ? "मोबाइल" : "Mobile", value: `+91 ${phone}` },
                  { label: hi ? "समय" : "Slot", value: timeSlots.find((ts) => ts.value === slot)?.[hi ? "label_hi" : "label"] || slot },
                  {
                    label: hi ? "इलेक्ट्रीशियन" : "Electrician",
                    value: selectedProData?.name || (hi ? "ऑटो-असाइन (शहर के हिसाब से)" : `Auto-assigned (best in ${city})`),
                  },
                  ...(issueDescription ? [{ label: hi ? "समस्या" : "Issue", value: issueDescription }] : []),
                ].map((row) => (
                  <div key={row.label} className="flex gap-3">
                    <span className="text-slate-400 w-28 shrink-0">{row.label}</span>
                    <span className="font-medium text-slate-900">{row.value}</span>
                  </div>
                ))}

                <div className="bg-green-50 rounded-xl p-4 flex items-center gap-3 mt-2">
                  <Award className="w-5 h-5 text-green-600 shrink-0" />
                  <p className="text-sm text-green-700">
                    {hi
                      ? "90 दिन की वारंटी मिलेगी। बुकिंग के बाद WhatsApp पर कन्फर्मेशन।"
                      : "90-day warranty included. WhatsApp confirmation will open after booking."}
                  </p>
                </div>

                <div className="bg-blue-50 rounded-xl p-4 flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0" />
                  <p className="text-sm text-blue-700">
                    {hi
                      ? "कीमत तय है — इलेक्ट्रीशियन ज्यादा नहीं ले सकता।"
                      : "Price is FIXED — the pro cannot charge more than shown."}
                  </p>
                </div>
              </div>

              <button
                onClick={handleOpenPayment}
                className="w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-xl transition-colors flex items-center justify-center gap-2 text-base"
              >
                <CheckCircle2 className="w-5 h-5" />
                {hi ? `₹${total} भुगतान करें` : `Pay ₹${total} & Confirm`}
              </button>
              <p className="text-center text-xs text-slate-400 mt-2">
                {hi ? "UPI या नकद — आपकी पसंद" : "Pay by UPI or cash after completion"}
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
                {hi ? "वापस" : "Back"}
              </button>
            )}
            {step < 4 && (
              <button
                disabled={!canNext()}
                onClick={() => setStep((s) => (s + 1) as BookingStep)}
                className="flex-1 flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 disabled:bg-slate-200 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl transition-colors text-sm"
              >
                {hi ? "आगे बढ़ें" : "Continue"}
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Order summary sidebar */}
        <div>
          <div className="sticky top-24 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="bg-slate-50 px-5 py-3">
              <h3 className="font-bold text-slate-900 text-sm">
                {hi ? "ऑर्डर सारांश" : "Order Summary"}
              </h3>
            </div>
            <div className="p-5">
              {selectedServiceData.length === 0 ? (
                <p className="text-slate-400 text-sm text-center py-4">
                  {hi ? "अभी कोई सेवा नहीं चुनी" : "No services selected yet"}
                </p>
              ) : (
                <div className="space-y-2">
                  {selectedServiceData.map((svc) => (
                    <div key={svc.id} className="flex justify-between text-sm">
                      <span className="text-slate-600">{hi ? svc.name_hi : svc.name_en}</span>
                      <span className="font-semibold">₹{svc.price}</span>
                    </div>
                  ))}
                  <div className="border-t pt-2 mt-2 flex justify-between font-bold">
                    <span>{hi ? "कुल" : "Total"}</span>
                    <span className="text-orange-600">₹{total}</span>
                  </div>
                </div>
              )}

              <div className="mt-4 space-y-2">
                {[
                  { icon: CheckCircle2, label: hi ? "तय कीमत। कोई छुपी फीस नहीं।" : "Fixed price. No hidden charges.", color: "text-green-500" },
                  { icon: Award, label: hi ? "90 दिन वारंटी शामिल" : "90-day warranty included", color: "text-blue-500" },
                  { icon: ShieldCheck, label: hi ? "BG-वेरिफाइड इलेक्ट्रीशियन" : "BG-verified electrician", color: "text-purple-500" },
                  { icon: Clock, label: hi ? "काम के बाद भुगतान" : "Pay after job completion", color: "text-orange-500" },
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

      {showPayment && (
        <PaymentModal
          amount={total}
          bookingId="preview"
          lang={lang}
          onSuccess={handlePaymentSuccess}
          onClose={() => setShowPayment(false)}
        />
      )}
    </div>
  );
}

export default function BookingPage() {
  const { state: { lang } } = useApp();
  const hi = lang === "hi";

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 pt-20 bg-slate-50">
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 py-8">
          <div className="max-w-4xl mx-auto px-4 flex items-center gap-3 text-white">
            <Zap className="w-6 h-6 text-orange-400" />
            <div>
              <h1 className="text-xl font-bold">
                {hi ? "सेवा बुक करें" : "Book a Service"}
              </h1>
              <p className="text-slate-400 text-sm">
                {hi
                  ? "तय कीमत · वेरिफाइड प्रो · 90 दिन वारंटी"
                  : "Fixed price · Verified pro · 90-day warranty"}
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

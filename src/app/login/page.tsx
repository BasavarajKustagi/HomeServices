"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Zap, ArrowRight, CheckCircle2, Shield } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useApp } from "@/context/AppContext";
import { DEMO_OTP, validateOtp, generateReferralCode } from "@/lib/utils";

type Step = "phone" | "otp" | "profile";

export default function LoginPage() {
  const { state: { lang }, login } = useApp();
  const router = useRouter();
  const hi = lang === "hi";

  const [step, setStep] = useState<Step>("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);

  const handleSendOtp = () => {
    if (phone.length !== 10) { setError(hi ? "10 अंकों का नंबर डालें" : "Enter a 10-digit number"); return; }
    setError("");
    setSending(true);
    setTimeout(() => { setSending(false); setStep("otp"); }, 1200);
  };

  const handleVerifyOtp = () => {
    const entered = otp.join("");
    if (!validateOtp(entered)) { setError(hi ? "गलत OTP। 1234 आज़माएं (Demo)" : "Wrong OTP. Try 1234 (Demo)"); return; }
    setError("");
    setStep("profile");
  };

  const handleOtpInput = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 3) {
      (document.getElementById(`otp-${index + 1}`) as HTMLInputElement)?.focus();
    }
  };

  const handleComplete = () => {
    login({
      phone,
      name: name || `User ${phone.slice(-4)}`,
      city,
      address: "",
      referralCode: generateReferralCode(phone),
      credits: 0,
      joinedAt: new Date().toISOString(),
    });
    router.push("/");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 pt-20 bg-slate-50 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-sm">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-14 h-14 bg-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg">
              <Zap className="w-8 h-8 text-white" fill="white" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900">BijliWala</h1>
            <p className="text-slate-500 text-sm mt-1">
              {hi ? "लॉगिन करें या अकाउंट बनाएं" : "Login or create your account"}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 card-shadow">
            {step === "phone" && (
              <div>
                <h2 className="font-bold text-slate-900 mb-1">{hi ? "मोबाइल नंबर" : "Mobile Number"}</h2>
                <p className="text-slate-500 text-sm mb-5">{hi ? "OTP से वेरिफाई करें" : "We'll send you an OTP"}</p>
                <div className="flex mb-4">
                  <span className="flex items-center px-3 bg-slate-100 border border-r-0 border-slate-300 rounded-l-xl text-slate-600 text-sm font-medium">+91</span>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                    placeholder="9876543210"
                    className="flex-1 border border-slate-300 rounded-r-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-orange-400"
                    onKeyDown={(e) => e.key === "Enter" && handleSendOtp()}
                  />
                </div>
                {error && <p className="text-red-500 text-xs mb-3">{error}</p>}
                <button
                  onClick={handleSendOtp}
                  disabled={phone.length !== 10 || sending}
                  className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-slate-200 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  {sending ? (
                    <span className="flex gap-1">
                      {[1,2,3].map((i) => <span key={i} className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: `${i*0.15}s` }} />)}
                    </span>
                  ) : (
                    <>{hi ? "OTP भेजें" : "Send OTP"} <ArrowRight className="w-4 h-4" /></>
                  )}
                </button>
                <p className="text-xs text-slate-400 text-center mt-3">
                  {hi ? "कोई पासवर्ड नहीं। बस OTP।" : "No password. Just OTP."}
                </p>
              </div>
            )}

            {step === "otp" && (
              <div>
                <h2 className="font-bold text-slate-900 mb-1">{hi ? "OTP डालें" : "Enter OTP"}</h2>
                <p className="text-slate-500 text-sm mb-2">
                  {hi ? `+91 ${phone} पर भेजा गया` : `Sent to +91 ${phone}`}
                </p>
                <div className="bg-amber-50 rounded-lg px-3 py-2 mb-4 text-xs text-amber-700 flex items-center gap-2">
                  <Shield className="w-3.5 h-3.5 shrink-0" />
                  {hi ? `Demo OTP: ${DEMO_OTP}` : `Demo OTP: ${DEMO_OTP}`}
                </div>
                <div className="flex justify-center gap-3 mb-4">
                  {otp.map((digit, i) => (
                    <input
                      key={i}
                      id={`otp-${i}`}
                      type="text"
                      inputMode="numeric"
                      value={digit}
                      onChange={(e) => handleOtpInput(i, e.target.value)}
                      className="w-12 h-12 text-center text-xl font-bold border-2 border-slate-200 rounded-xl focus:border-orange-400 focus:outline-none transition-colors"
                      maxLength={1}
                    />
                  ))}
                </div>
                {error && <p className="text-red-500 text-xs mb-3 text-center">{error}</p>}
                <button
                  onClick={handleVerifyOtp}
                  disabled={otp.join("").length !== 4}
                  className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-slate-200 text-white font-bold py-3.5 rounded-xl transition-colors"
                >
                  {hi ? "वेरिफाई करें" : "Verify OTP"}
                </button>
                <button onClick={() => setStep("phone")} className="w-full text-slate-400 text-sm py-2 hover:text-orange-600 transition-colors">
                  {hi ? "नंबर बदलें" : "Change number"}
                </button>
              </div>
            )}

            {step === "profile" && (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <p className="text-green-600 text-sm font-medium">{hi ? "नंबर वेरिफाइड!" : "Number verified!"}</p>
                </div>
                <h2 className="font-bold text-slate-900 mb-4">{hi ? "अपना नाम बताएं" : "Quick setup (optional)"}</h2>
                <div className="space-y-3 mb-5">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={hi ? "आपका नाम" : "Your name"}
                    className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                  />
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder={hi ? "आपका शहर" : "Your city"}
                    className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                  />
                </div>
                <button onClick={handleComplete} className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3.5 rounded-xl transition-colors">
                  {hi ? "शुरू करें!" : "Get Started!"} 🎉
                </button>
                <button onClick={handleComplete} className="w-full text-slate-400 text-sm py-2 hover:text-orange-600 transition-colors">
                  {hi ? "अभी छोड़ें" : "Skip for now"}
                </button>
              </div>
            )}
          </div>

          {/* Benefits */}
          <div className="mt-6 space-y-2">
            {[
              { icon: "📋", en: "View all bookings & warranty cards", hi: "सभी बुकिंग और वारंटी देखें" },
              { icon: "🎁", en: "Earn ₹50 credits per referral", hi: "प्रत्येक रेफरल पर ₹50 क्रेडिट" },
              { icon: "⚡", en: "1-tap re-book your favorite pro", hi: "पसंदीदा प्रो को 1-टैप में बुक करें" },
            ].map((b) => (
              <div key={b.en} className="flex items-center gap-3 text-sm text-slate-600">
                <span className="text-lg">{b.icon}</span>
                {hi ? b.hi : b.en}
              </div>
            ))}
          </div>

          <p className="text-center text-xs text-slate-400 mt-6">
            {hi ? "लॉगिन करके आप हमारी " : "By logging in you agree to our "}
            <Link href="#" className="text-orange-500 hover:underline">
              {hi ? "शर्तें" : "Terms"}
            </Link>
            {hi ? " और " : " & "}
            <Link href="#" className="text-orange-500 hover:underline">
              {hi ? "प्राइवेसी पॉलिसी" : "Privacy Policy"}
            </Link>
            {hi ? " से सहमत हैं।" : "."}
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

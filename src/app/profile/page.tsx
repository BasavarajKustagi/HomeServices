"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  User, Award, Clock, Copy, CheckCircle2, Star, Zap,
  ChevronRight, Gift, LogOut, Edit3, ShieldCheck,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ReviewModal from "@/components/ReviewModal";
import { useApp } from "@/context/AppContext";
import { formatDate, formatAmount } from "@/lib/utils";

const statusColors: Record<string, string> = {
  pending: "bg-yellow-50 text-yellow-700 border-yellow-200",
  confirmed: "bg-blue-50 text-blue-700 border-blue-200",
  en_route: "bg-orange-50 text-orange-700 border-orange-200",
  arrived: "bg-purple-50 text-purple-700 border-purple-200",
  in_progress: "bg-indigo-50 text-indigo-700 border-indigo-200",
  completed: "bg-green-50 text-green-700 border-green-200",
  cancelled: "bg-slate-50 text-slate-500 border-slate-200",
};

const statusLabel: Record<string, Record<string, string>> = {
  en: { pending: "Pending", confirmed: "Confirmed", en_route: "On the way", arrived: "Arrived", in_progress: "In progress", completed: "Completed", cancelled: "Cancelled" },
  hi: { pending: "प्रतीक्षा", confirmed: "कन्फर्म", en_route: "रास्ते में", arrived: "पहुँच गए", in_progress: "काम जारी", completed: "पूरा", cancelled: "रद्द" },
};

export default function ProfilePage() {
  const { state, logout, updateBooking, notify } = useApp();
  const { lang, user, bookings, warranties } = state;
  const router = useRouter();
  const hi = lang === "hi";

  const [tab, setTab] = useState<"bookings" | "warranties" | "referral">("bookings");
  const [copied, setCopied] = useState(false);
  const [reviewBookingId, setReviewBookingId] = useState<string | null>(null);

  if (!user) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-1 pt-20 flex items-center justify-center">
          <div className="text-center px-4">
            <div className="text-5xl mb-4">🔐</div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">
              {hi ? "लॉगिन करें" : "Please login"}
            </h2>
            <p className="text-slate-500 text-sm mb-6">
              {hi ? "बुकिंग और वारंटी देखने के लिए" : "To view your bookings and warranties"}
            </p>
            <Link href="/login" className="inline-flex items-center gap-2 bg-orange-500 text-white font-bold px-6 py-3 rounded-xl hover:bg-orange-600 transition-colors">
              {hi ? "लॉगिन करें" : "Login / Sign Up"}
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const copyReferral = () => {
    navigator.clipboard.writeText(user.referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReviewSubmit = (bookingId: string, rating: number, text: string) => {
    updateBooking(bookingId, { rating, reviewText: text });
    notify({ type: "booking", title: hi ? "रिव्यू के लिए धन्यवाद!" : "Review submitted!", body: hi ? "आपका रिव्यू पड़ोसियों की मदद करेगा।" : "Your review helps neighbors choose better." });
    setReviewBookingId(null);
  };

  const activeWarranties = warranties.filter((w) => w.status === "active");
  const completedBookings = bookings.filter((b) => b.status === "completed");

  const reviewBooking = reviewBookingId ? bookings.find((b) => b.id === reviewBookingId) : null;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      {reviewBooking && (
        <ReviewModal
          bookingId={reviewBooking.id}
          proName={reviewBooking.proName}
          service={reviewBooking.serviceNames[0] || "Service"}
          lang={lang}
          onSubmit={(rating, text) => handleReviewSubmit(reviewBooking.id, rating, text)}
          onClose={() => setReviewBookingId(null)}
        />
      )}

      <div className="flex-1 pt-20">
        {/* Profile header */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 py-10">
          <div className="max-w-4xl mx-auto px-4">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                {(user.name || user.phone).charAt(0).toUpperCase()}
              </div>
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-white">{user.name || hi ? "मेरा अकाउंट" : "My Account"}</h1>
                <p className="text-slate-400">+91 {user.phone}</p>
                {user.city && <p className="text-slate-400 text-sm flex items-center gap-1"><span>📍</span>{user.city}</p>}
              </div>
              <div className="flex gap-2">
                <button className="p-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors">
                  <Edit3 className="w-4 h-4" />
                </button>
                <button onClick={() => { logout(); router.push("/"); }} className="p-2 bg-white/10 text-white rounded-lg hover:bg-red-500/30 transition-colors">
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Summary stats */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: Zap, label: hi ? "बुकिंग" : "Bookings", value: bookings.length, color: "text-orange-400" },
                { icon: Award, label: hi ? "वारंटी" : "Warranties", value: activeWarranties.length, color: "text-blue-400" },
                { icon: Gift, label: hi ? "क्रेडिट" : "Credits", value: `₹${user.credits}`, color: "text-green-400" },
              ].map(({ icon: Icon, label, value, color }) => (
                <div key={label} className="bg-white/10 rounded-xl p-3 text-center">
                  <Icon className={`w-5 h-5 ${color} mx-auto mb-1`} />
                  <p className="font-bold text-white text-lg">{value}</p>
                  <p className="text-slate-400 text-xs">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="sticky top-16 bg-white border-b border-slate-100 z-10">
          <div className="max-w-4xl mx-auto px-4 flex">
            {[
              { id: "bookings" as const, label: hi ? "बुकिंग" : "Bookings", icon: Clock },
              { id: "warranties" as const, label: hi ? "वारंटी" : "Warranties", icon: ShieldCheck },
              { id: "referral" as const, label: hi ? "रेफरल" : "Referral", icon: Gift },
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setTab(id)}
                className={`flex items-center gap-2 px-4 py-3.5 text-sm font-medium border-b-2 transition-colors ${
                  tab === id ? "border-orange-500 text-orange-600" : "border-transparent text-slate-500 hover:text-slate-700"
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Bookings tab */}
          {tab === "bookings" && (
            <div>
              {bookings.length === 0 ? (
                <div className="text-center py-16">
                  <div className="text-5xl mb-4">📋</div>
                  <h3 className="font-bold text-slate-900 mb-2">{hi ? "अभी कोई बुकिंग नहीं" : "No bookings yet"}</h3>
                  <p className="text-slate-500 text-sm mb-6">{hi ? "अपनी पहली सेवा बुक करें" : "Book your first service"}</p>
                  <Link href="/booking" className="inline-flex items-center gap-2 bg-orange-500 text-white font-bold px-6 py-3 rounded-xl hover:bg-orange-600 transition-colors">
                    {hi ? "बुक करें" : "Book Now"}
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {bookings.map((booking) => (
                    <div key={booking.id} className="bg-white rounded-2xl p-5 border border-slate-100 card-shadow">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <p className="font-bold text-slate-900">{booking.serviceNames.join(", ")}</p>
                          <p className="text-xs text-orange-600 font-mono mt-0.5">{booking.id}</p>
                          <p className="text-xs text-slate-500 mt-0.5">{formatDate(booking.createdAt)}</p>
                        </div>
                        <span className={`text-xs px-2.5 py-1 rounded-full border font-medium ${statusColors[booking.status]}`}>
                          {statusLabel[lang][booking.status]}
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-xs text-slate-500 mb-3">
                        <div><span className="text-slate-400">{hi ? "प्रो" : "Pro"}: </span>{booking.proName}</div>
                        <div><span className="text-slate-400">{hi ? "शहर" : "City"}: </span>{booking.city}</div>
                        <div><span className="text-slate-400">{hi ? "राशि" : "Amount"}: </span><span className="font-semibold text-slate-800">{formatAmount(booking.totalAmount)}</span></div>
                      </div>
                      <div className="flex gap-2">
                        {booking.status === "completed" && !booking.rating && (
                          <button
                            onClick={() => setReviewBookingId(booking.id)}
                            className="flex items-center gap-1.5 text-xs bg-amber-50 text-amber-700 border border-amber-200 px-3 py-1.5 rounded-lg hover:bg-amber-100 transition-colors font-medium"
                          >
                            <Star className="w-3.5 h-3.5" />
                            {hi ? "रिव्यू दें" : "Rate this job"}
                          </button>
                        )}
                        {booking.rating && (
                          <div className="flex items-center gap-1 text-xs text-amber-600">
                            {"★".repeat(booking.rating)} <span className="text-slate-500 ml-1">{hi ? "रिव्यू दिया" : "Reviewed"}</span>
                          </div>
                        )}
                        {booking.warrantyId && (
                          <Link href="/warranty" className="flex items-center gap-1.5 text-xs bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition-colors font-medium">
                            <Award className="w-3.5 h-3.5" />
                            {hi ? "वारंटी देखें" : "View warranty"}
                          </Link>
                        )}
                        {["confirmed", "en_route", "arrived"].includes(booking.status) && (
                          <Link href={`/booking?track=${booking.id}`} className="flex items-center gap-1.5 text-xs bg-orange-50 text-orange-700 border border-orange-200 px-3 py-1.5 rounded-lg hover:bg-orange-100 transition-colors font-medium">
                            <Clock className="w-3.5 h-3.5" />
                            {hi ? "ट्रैक करें" : "Track"}
                          </Link>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Warranties tab */}
          {tab === "warranties" && (
            <div>
              {warranties.length === 0 ? (
                <div className="text-center py-16">
                  <div className="text-5xl mb-4">🛡️</div>
                  <h3 className="font-bold text-slate-900 mb-2">{hi ? "अभी कोई वारंटी नहीं" : "No warranties yet"}</h3>
                  <p className="text-slate-500 text-sm mb-4">{hi ? "पहली बुकिंग के बाद वारंटी मिलेगी" : "Warranties appear after your first booking"}</p>
                  <Link href="/warranty" className="text-blue-600 text-sm font-medium hover:underline flex items-center gap-1 justify-center">
                    {hi ? "वारंटी डैशबोर्ड" : "Warranty Dashboard"} <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {warranties.map((w) => (
                    <Link key={w.id} href="/warranty" className="block bg-white rounded-2xl p-5 border border-slate-100 card-shadow hover:border-blue-200 transition-colors">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-bold text-slate-900">{w.service}</p>
                          <p className="text-xs text-slate-500">{w.proName}</p>
                          <p className="text-xs font-mono text-blue-600 mt-0.5">{w.id}</p>
                        </div>
                        <span className={`text-xs px-2.5 py-1 rounded-full border font-medium ${
                          w.status === "active" ? "bg-green-50 text-green-700 border-green-200" :
                          w.status === "claimed" ? "bg-orange-50 text-orange-700 border-orange-200" :
                          "bg-slate-50 text-slate-500 border-slate-200"
                        }`}>
                          {w.status === "active" ? (hi ? "सक्रिय" : "Active") : w.status === "claimed" ? (hi ? "क्लेम किया" : "Claimed") : (hi ? "समाप्त" : "Expired")}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Referral tab */}
          {tab === "referral" && (
            <div className="max-w-md mx-auto">
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 text-white text-center mb-6">
                <div className="text-4xl mb-3">🎁</div>
                <h2 className="text-xl font-bold mb-2">
                  {hi ? "दोस्तों को बुलाएं, ₹50 कमाएं" : "Refer friends, earn ₹50"}
                </h2>
                <p className="text-orange-100 text-sm mb-4">
                  {hi
                    ? "हर सफल रेफरल पर आपको और आपके दोस्त दोनों को ₹50 मिलेंगे।"
                    : "Both you and your friend get ₹50 credit on each successful referral."}
                </p>
                <div className="bg-white/20 rounded-xl px-4 py-3 flex items-center justify-between">
                  <span className="font-mono font-bold text-lg tracking-widest">{user.referralCode}</span>
                  <button onClick={copyReferral} className="flex items-center gap-1.5 bg-white text-orange-600 text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-orange-50 transition-colors">
                    {copied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {copied ? (hi ? "कॉपी!" : "Copied!") : (hi ? "कॉपी" : "Copy")}
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-slate-100 card-shadow mb-4">
                <h3 className="font-bold text-slate-900 mb-4">{hi ? "कैसे काम करता है" : "How it works"}</h3>
                <div className="space-y-3">
                  {[
                    { step: "1", en: "Share your code with a friend", hi: "कोड दोस्त के साथ शेयर करें" },
                    { step: "2", en: "They book with your code", hi: "वे आपके कोड से बुक करें" },
                    { step: "3", en: "Both get ₹50 after job completion", hi: "काम पूरा होने पर दोनों को ₹50" },
                  ].map((s) => (
                    <div key={s.step} className="flex items-center gap-3">
                      <div className="w-7 h-7 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-sm font-bold shrink-0">{s.step}</div>
                      <span className="text-sm text-slate-700">{hi ? s.hi : s.en}</span>
                    </div>
                  ))}
                </div>
              </div>

              <a
                href={`https://wa.me/?text=${encodeURIComponent(`🔌 BijliWala — Fixed price electricians with 90-day warranty!\n\nUse my code ${user.referralCode} to get ₹50 off your first booking.\n\nBook now: https://bijliwala.in`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-3.5 rounded-xl transition-colors text-sm"
              >
                📤 {hi ? "WhatsApp पर शेयर करें" : "Share on WhatsApp"}
              </a>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

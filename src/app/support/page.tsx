"use client";

import { useState } from "react";
import Link from "next/link";
import {
  MessageCircle, Phone, ChevronDown, ChevronUp, Send,
  CheckCircle2, AlertTriangle, Clock, Zap,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useApp } from "@/context/AppContext";
import { generateTicketId } from "@/lib/utils";
import { buildWhatsAppWarrantyClaim } from "@/lib/utils";

export default function SupportPage() {
  const { state: { lang, user, bookings, tickets }, addTicket } = useApp();
  const hi = lang === "hi";

  const [tab, setTab] = useState<"new" | "tickets" | "faq">("new");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [form, setForm] = useState({ bookingId: "", category: "", description: "" });
  const [submitted, setSubmitted] = useState<string | null>(null);

  const categories = [
    { id: "no_show", en: "Electrician didn't show up", hi: "इलेक्ट्रीशियन नहीं आया" },
    { id: "overcharge", en: "Charged more than quoted", hi: "तय कीमत से ज्यादा लिया" },
    { id: "poor_work", en: "Poor quality work", hi: "खराब काम" },
    { id: "warranty", en: "Warranty claim", hi: "वारंटी क्लेम" },
    { id: "payment", en: "Payment issue", hi: "पेमेंट समस्या" },
    { id: "other", en: "Other", hi: "अन्य" },
  ];

  const faqs = [
    { q_en: "Can I cancel my booking?", q_hi: "क्या बुकिंग रद्द कर सकते हैं?", a_en: "Yes. Cancel at least 1 hour before the slot for a full refund. Cancellations within 1 hour may incur a ₹29 fee.", a_hi: "हाँ। पूरा रिफंड पाने के लिए स्लॉट से कम से कम 1 घंटे पहले रद्द करें।" },
    { q_en: "The electrician charged extra. What do I do?", q_hi: "इलेक्ट्रीशियन ने ज्यादा लिया। क्या करें?", a_en: "Raise a complaint here. We will contact you within 2 hours and refund the overcharge + ₹100 compensation.", a_hi: "यहाँ शिकायत दर्ज करें। हम 2 घंटे में संपर्क करेंगे और अतिरिक्त राशि + ₹100 मुआवजा वापस देंगे।" },
    { q_en: "How do I claim my warranty?", q_hi: "वारंटी कैसे क्लेम करें?", a_en: "Go to Warranty page, find your warranty card, and tap 'Claim'. We'll schedule a free revisit within 24 hours.", a_hi: "वारंटी पेज पर जाएं, अपना वारंटी कार्ड ढूंढें, और 'क्लेम' टैप करें।" },
    { q_en: "My issue is urgent — can I call?", q_hi: "मेरी समस्या जरूरी है — कॉल कर सकते हैं?", a_en: "Yes. Call 1800-911-BIJLI (free, 24×7) for urgent issues. Average hold time: 2 minutes.", a_hi: "हाँ। जरूरी समस्या के लिए 1800-911-BIJLI पर कॉल करें (मुफ्त, 24×7)।" },
    { q_en: "When will I get my refund?", q_hi: "रिफंड कब मिलेगा?", a_en: "UPI refunds: 2–4 hours. Bank transfer: 5–7 business days. You'll receive an SMS notification.", a_hi: "UPI रिफंड: 2–4 घंटे। बैंक ट्रांसफर: 5–7 कार्यदिवस।" },
  ];

  const handleSubmit = () => {
    if (!form.category || !form.description) return;
    const id = generateTicketId();
    addTicket({
      id,
      bookingId: form.bookingId || undefined,
      category: form.category,
      description: form.description,
      status: "open",
      createdAt: new Date().toISOString(),
    });
    setSubmitted(id);
    setForm({ bookingId: "", category: "", description: "" });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 pt-20">
        {/* Header */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 py-12">
          <div className="max-w-4xl mx-auto px-4 text-center text-white">
            <h1 className="text-3xl font-bold mb-2">{hi ? "हम मदद के लिए यहाँ हैं" : "We're here to help"}</h1>
            <p className="text-slate-300 mb-6">{hi ? "Urban Company से 3× बेहतर सपोर्ट — 2 घंटे में जवाब गारंटी।" : "3× better support than Urban Company — 2-hour response guaranteed."}</p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="tel:18009112455" className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2.5 rounded-xl font-medium text-sm transition-colors">
                <Phone className="w-4 h-4" />
                1800-911-BIJLI
              </a>
              <a href={buildWhatsAppWarrantyClaim("", "", hi ? "सपोर्ट चाहिए" : "Need support")}
                target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 px-4 py-2.5 rounded-xl font-medium text-sm transition-colors">
                <MessageCircle className="w-4 h-4" />
                WhatsApp Support
              </a>
            </div>
          </div>
        </div>

        {/* SLA bar */}
        <div className="bg-orange-50 border-b border-orange-100">
          <div className="max-w-4xl mx-auto px-4 py-3 flex flex-wrap justify-center gap-6 text-sm">
            {[
              { icon: Clock, en: "Response: < 2 hours", hi: "जवाब: 2 घंटे में", color: "text-orange-600" },
              { icon: CheckCircle2, en: "Resolution: < 24 hours", hi: "समाधान: 24 घंटे", color: "text-green-600" },
              { icon: Zap, en: "Overcharge refund + ₹100 comp", hi: "अतिरिक्त राशि + ₹100 मुआवजा", color: "text-blue-600" },
            ].map(({ icon: Icon, en, hi: hiText, color }) => (
              <div key={en} className={`flex items-center gap-1.5 font-medium ${color}`}>
                <Icon className="w-4 h-4" />
                {hi ? hiText : en}
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-slate-100">
          <div className="max-w-4xl mx-auto px-4 flex">
            {[
              { id: "new" as const, label: hi ? "नई शिकायत" : "New Complaint" },
              { id: "tickets" as const, label: hi ? "मेरे टिकट" : "My Tickets" },
              { id: "faq" as const, label: hi ? "FAQ" : "FAQ" },
            ].map(({ id, label }) => (
              <button key={id} onClick={() => setTab(id)}
                className={`px-5 py-3.5 text-sm font-medium border-b-2 transition-colors ${tab === id ? "border-orange-500 text-orange-600" : "border-transparent text-slate-500 hover:text-slate-700"}`}>
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* New ticket */}
          {tab === "new" && (
            <div className="max-w-lg">
              {submitted ? (
                <div className="text-center py-10">
                  <CheckCircle2 className="w-14 h-14 text-green-500 mx-auto mb-4" />
                  <h2 className="text-xl font-bold text-slate-900 mb-2">{hi ? "शिकायत दर्ज हो गई" : "Complaint filed"}</h2>
                  <p className="text-slate-500 text-sm mb-2">{hi ? "टिकट ID:" : "Ticket ID:"} <span className="font-mono font-bold text-orange-600">{submitted}</span></p>
                  <p className="text-slate-500 text-sm mb-6">{hi ? "हम 2 घंटे में WhatsApp/SMS पर जवाब देंगे।" : "We'll respond within 2 hours via WhatsApp/SMS."}</p>
                  <div className="flex flex-col gap-2">
                    <button onClick={() => { setSubmitted(null); setTab("tickets"); }} className="text-orange-600 text-sm font-medium">
                      {hi ? "मेरे टिकट देखें" : "View my tickets"} →
                    </button>
                    <Link href="/" className="text-slate-400 text-sm">{hi ? "होम पर जाएं" : "Back to home"}</Link>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-2xl p-6 card-shadow">
                  <h2 className="font-bold text-slate-900 mb-5">{hi ? "शिकायत दर्ज करें" : "File a Complaint"}</h2>
                  <div className="space-y-4">
                    {/* Booking ID */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">{hi ? "बुकिंग ID (वैकल्पिक)" : "Booking ID (optional)"}</label>
                      {user && bookings.length > 0 ? (
                        <select value={form.bookingId} onChange={(e) => setForm((f) => ({ ...f, bookingId: e.target.value }))}
                          className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400">
                          <option value="">{hi ? "बुकिंग चुनें" : "Select a booking"}</option>
                          {bookings.map((b) => (
                            <option key={b.id} value={b.id}>{b.id} — {b.serviceNames[0]}</option>
                          ))}
                        </select>
                      ) : (
                        <input type="text" value={form.bookingId} onChange={(e) => setForm((f) => ({ ...f, bookingId: e.target.value }))}
                          placeholder="BW-2025-XXXX"
                          className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
                      )}
                    </div>

                    {/* Category */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">{hi ? "समस्या का प्रकार" : "Issue type"}</label>
                      <div className="grid grid-cols-2 gap-2">
                        {categories.map((cat) => (
                          <button key={cat.id} onClick={() => setForm((f) => ({ ...f, category: cat.id }))}
                            className={`text-left p-3 rounded-xl border text-xs transition-all ${form.category === cat.id ? "border-orange-500 bg-orange-50 text-orange-700 font-medium" : "border-slate-200 hover:border-orange-300 text-slate-700"}`}>
                            {hi ? cat.hi : cat.en}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Description */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">{hi ? "विवरण" : "Description"}</label>
                      <textarea value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                        placeholder={hi ? "क्या हुआ? विस्तार से बताएं..." : "What happened? Please describe in detail..."}
                        rows={4}
                        className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none" />
                    </div>

                    <button onClick={handleSubmit} disabled={!form.category || !form.description}
                      className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-slate-200 text-white font-bold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2">
                      <Send className="w-4 h-4" />
                      {hi ? "शिकायत जमा करें" : "Submit Complaint"}
                    </button>

                    <p className="text-xs text-slate-500 text-center">
                      {hi ? "जरूरी मामले के लिए: " : "For urgent issues: "}
                      <a href="tel:18009112455" className="text-orange-600 font-medium">1800-911-BIJLI</a>
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Tickets */}
          {tab === "tickets" && (
            <div>
              {tickets.length === 0 ? (
                <div className="text-center py-12">
                  <AlertTriangle className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <p className="text-slate-500">{hi ? "अभी कोई टिकट नहीं" : "No tickets yet"}</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {tickets.map((ticket) => (
                    <div key={ticket.id} className="bg-white rounded-2xl p-5 border border-slate-100 card-shadow">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <p className="font-mono font-bold text-orange-600 text-sm">{ticket.id}</p>
                          <p className="text-sm text-slate-700 mt-0.5">{categories.find((c) => c.id === ticket.category)?.[hi ? "hi" : "en"] || ticket.category}</p>
                          {ticket.bookingId && <p className="text-xs text-slate-500 mt-0.5">{hi ? "बुकिंग" : "Booking"}: {ticket.bookingId}</p>}
                        </div>
                        <span className={`text-xs px-2.5 py-1 rounded-full border font-medium ${
                          ticket.status === "open" ? "bg-yellow-50 text-yellow-700 border-yellow-200" :
                          ticket.status === "in_progress" ? "bg-blue-50 text-blue-700 border-blue-200" :
                          "bg-green-50 text-green-700 border-green-200"
                        }`}>
                          {ticket.status === "open" ? (hi ? "खुला" : "Open") : ticket.status === "in_progress" ? (hi ? "जारी" : "In progress") : (hi ? "हल" : "Resolved")}
                        </span>
                      </div>
                      <p className="text-sm text-slate-600 line-clamp-2">{ticket.description}</p>
                      <p className="text-xs text-slate-400 mt-2">{new Date(ticket.createdAt).toLocaleString("en-IN")}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* FAQ */}
          {tab === "faq" && (
            <div className="max-w-2xl space-y-2">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-white rounded-xl border border-slate-100 overflow-hidden card-shadow">
                  <button onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                    className="w-full flex items-center justify-between px-5 py-4 text-left">
                    <span className="font-medium text-slate-900 text-sm">{hi ? faq.q_hi : faq.q_en}</span>
                    {expandedFaq === i ? <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />}
                  </button>
                  {expandedFaq === i && (
                    <div className="px-5 pb-4 border-t border-slate-50">
                      <p className="text-sm text-slate-600 pt-3">{hi ? faq.a_hi : faq.a_en}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

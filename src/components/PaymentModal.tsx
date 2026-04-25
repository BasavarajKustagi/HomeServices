"use client";

import { useState } from "react";
import { CheckCircle2, X, Smartphone, Banknote, Loader2 } from "lucide-react";
import { buildUpiLink, formatAmount } from "@/lib/utils";
import { Language } from "@/data/content";

interface PaymentModalProps {
  amount: number;
  bookingId: string;
  lang: Language;
  onSuccess: (method: "upi" | "cash") => void;
  onClose: () => void;
}

const upiApps = [
  { id: "phonepe" as const, name: "PhonePe", emoji: "💜", color: "bg-purple-600" },
  { id: "gpay" as const, name: "Google Pay", emoji: "🔵", color: "bg-blue-500" },
  { id: "paytm" as const, name: "Paytm", emoji: "🔷", color: "bg-blue-700" },
  { id: "generic" as const, name: "Any UPI", emoji: "📱", color: "bg-green-600" },
];

export default function PaymentModal({ amount, bookingId, lang, onSuccess, onClose }: PaymentModalProps) {
  const [tab, setTab] = useState<"upi" | "cash">("upi");
  const [paying, setPaying] = useState(false);
  const [cashConfirmed, setCashConfirmed] = useState(false);

  const hi = lang === "hi";

  const handleUpiApp = (app: typeof upiApps[0]["id"]) => {
    const link = buildUpiLink(amount, bookingId, app);
    window.open(link, "_blank");
    setPaying(true);
    // Simulate payment confirmation after UPI app opens
    setTimeout(() => {
      setPaying(false);
      onSuccess("upi");
    }, 3000);
  };

  const handleCashConfirm = () => {
    setCashConfirmed(true);
    setTimeout(() => onSuccess("cash"), 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
      <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-5 flex items-center justify-between text-white">
          <div>
            <p className="text-slate-400 text-xs mb-0.5">{hi ? "भुगतान करें" : "Complete Payment"}</p>
            <p className="font-bold text-2xl">{formatAmount(amount)}</p>
            <p className="text-slate-400 text-xs mt-0.5">{hi ? "काम के बाद" : "After job completion"} • {bookingId}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-100">
          {[
            { id: "upi" as const, label: hi ? "UPI / ऑनलाइन" : "UPI / Online", icon: Smartphone },
            { id: "cash" as const, label: hi ? "नकद" : "Cash", icon: Banknote },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-colors ${
                tab === id
                  ? "border-b-2 border-orange-500 text-orange-600"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>

        <div className="p-5">
          {tab === "upi" && (
            <div>
              {paying ? (
                <div className="text-center py-8">
                  <Loader2 className="w-10 h-10 text-orange-500 animate-spin mx-auto mb-3" />
                  <p className="font-semibold text-slate-900">{hi ? "पेमेंट कन्फर्म हो रहा है..." : "Confirming payment..."}</p>
                  <p className="text-slate-500 text-sm mt-1">{hi ? "UPI ऐप में पेमेंट पूरी करें" : "Complete payment in your UPI app"}</p>
                </div>
              ) : (
                <>
                  <p className="text-sm text-slate-600 mb-4 text-center">
                    {hi ? "अपना UPI ऐप चुनें" : "Choose your UPI app"}
                  </p>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    {upiApps.map((app) => (
                      <button
                        key={app.id}
                        onClick={() => handleUpiApp(app.id)}
                        className="flex items-center gap-2 p-3 border border-slate-200 rounded-xl hover:border-orange-300 hover:bg-orange-50 transition-all text-sm font-medium text-slate-700"
                      >
                        <span className="text-xl">{app.emoji}</span>
                        {app.name}
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-slate-400 text-center">
                    {hi ? "UPI ID: bijliwala@upi" : "UPI ID: bijliwala@upi"}
                  </p>
                </>
              )}
            </div>
          )}

          {tab === "cash" && (
            <div className="text-center">
              {cashConfirmed ? (
                <div className="py-6">
                  <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-3" />
                  <p className="font-bold text-slate-900">{hi ? "ठीक है!" : "Noted!"}</p>
                  <p className="text-slate-500 text-sm mt-1">{hi ? "काम पूरा होने पर नकद दें" : "Pay cash when job is done"}</p>
                </div>
              ) : (
                <div className="py-4">
                  <div className="text-4xl mb-4">💵</div>
                  <p className="text-sm text-slate-600 mb-2">
                    {hi
                      ? "काम पूरा होने के बाद इलेक्ट्रीशियन को नकद दें।"
                      : "Pay the electrician in cash after the job is done."}
                  </p>
                  <p className="text-xs text-slate-400 mb-5">
                    {hi
                      ? "इलेक्ट्रीशियन डिजिटल रसीद देगा जो वारंटी के रूप में काम करेगी।"
                      : "Electrician will issue a digital receipt which serves as your warranty."}
                  </p>
                  <button
                    onClick={handleCashConfirm}
                    className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 rounded-xl transition-colors text-sm"
                  >
                    {hi ? "नकद भुगतान की पुष्टि करें" : "Confirm Cash Payment"}
                  </button>
                </div>
              )}
            </div>
          )}

          {/* EMI note for large amounts */}
          {amount >= 500 && (
            <div className="mt-3 bg-blue-50 rounded-xl p-3 text-center">
              <p className="text-xs text-blue-700">
                {hi
                  ? `EMI विकल्प: ₹${Math.ceil(amount / 3)}/माह × 3 महीने`
                  : `EMI option: ₹${Math.ceil(amount / 3)}/mo × 3 months`}
                {" · "}
                <span className="font-medium">{hi ? "BijliWala+ सदस्यों के लिए" : "for BijliWala+ members"}</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

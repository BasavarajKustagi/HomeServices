"use client";

import { useState, useEffect, useCallback } from "react";
import { Phone, MapPin, ShieldCheck, CheckCircle2, Clock } from "lucide-react";
import { Electrician } from "@/data/content";
import { Language } from "@/data/content";

export type TrackingStatus = "dispatched" | "en_route" | "nearby" | "arrived";

interface TrackingViewProps {
  pro: Electrician;
  initialEta: number; // minutes
  lang: Language;
  onArrived?: () => void;
}

const statusConfig: Record<TrackingStatus, { label: string; label_hi: string; color: string; progress: number }> = {
  dispatched: { label: "Electrician confirmed, preparing", label_hi: "इलेक्ट्रीशियन कन्फर्म, तैयारी कर रहे हैं", color: "bg-blue-500", progress: 5 },
  en_route: { label: "On the way to you", label_hi: "आपकी तरफ आ रहे हैं", color: "bg-orange-500", progress: 50 },
  nearby: { label: "Almost there — within 5 min", label_hi: "बस आने ही वाले हैं — 5 मिनट में", color: "bg-amber-500", progress: 88 },
  arrived: { label: "Arrived at your location", label_hi: "आपकी लोकेशन पर पहुँच गए", color: "bg-green-500", progress: 100 },
};

export default function TrackingView({ pro, initialEta, lang, onArrived }: TrackingViewProps) {
  const [etaLeft, setEtaLeft] = useState(initialEta);
  const [status, setStatus] = useState<TrackingStatus>("dispatched");
  const hi = lang === "hi";

  const determineStatus = useCallback((remaining: number, total: number): TrackingStatus => {
    const pct = 1 - remaining / total;
    if (pct < 0.1) return "dispatched";
    if (pct < 0.85) return "en_route";
    if (pct < 1) return "nearby";
    return "arrived";
  }, []);

  useEffect(() => {
    if (etaLeft <= 0) {
      setStatus("arrived");
      onArrived?.();
      return;
    }

    const interval = setInterval(() => {
      setEtaLeft((prev) => {
        const next = prev - 1;
        setStatus(determineStatus(next, initialEta));
        if (next <= 0) {
          clearInterval(interval);
          onArrived?.();
          return 0;
        }
        return next;
      });
    }, 60000); // 1 real minute = 1 ETA minute (demo: use 3000 for testing)

    return () => clearInterval(interval);
  }, [etaLeft, initialEta, determineStatus, onArrived]);

  const cfg = statusConfig[status];
  const progressPct = cfg.progress + (status === "en_route" ? Math.min(35, ((initialEta - etaLeft) / initialEta) * 80) : 0);

  return (
    <div className="bg-white rounded-2xl overflow-hidden card-shadow border border-slate-100">
      {/* Status bar */}
      <div className={`${cfg.color} px-5 py-3 flex items-center justify-between text-white`}>
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 bg-white rounded-full animate-pulse" />
          <span className="font-semibold text-sm">{hi ? cfg.label_hi : cfg.label}</span>
        </div>
        {status !== "arrived" && (
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 opacity-80" />
            <span className="font-bold">{etaLeft} {hi ? "मिनट" : "min"}</span>
          </div>
        )}
      </div>

      {/* Progress bar */}
      <div className="h-1.5 bg-slate-100">
        <div
          className={`h-1.5 ${cfg.color} transition-all duration-1000`}
          style={{ width: `${Math.min(100, progressPct)}%` }}
        />
      </div>

      {/* Pro card */}
      <div className="p-5">
        <div className="flex items-center gap-4 mb-4">
          <div className={`w-14 h-14 ${pro.color} rounded-full flex items-center justify-center text-white font-bold text-lg shrink-0`}>
            {pro.avatar}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-slate-900">{pro.name}</h3>
              <ShieldCheck className="w-4 h-4 text-green-500" />
            </div>
            <p className="text-sm text-slate-500">{pro.skill} · {pro.experience}y exp</p>
            <div className="flex items-center gap-1 mt-0.5">
              <span className="text-amber-400 text-xs">{"★".repeat(Math.round(pro.rating))}</span>
              <span className="text-xs text-slate-500">{pro.rating} ({pro.reviews})</span>
            </div>
          </div>
          {status === "arrived" ? (
            <div className="text-center">
              <CheckCircle2 className="w-8 h-8 text-green-500 mx-auto" />
              <p className="text-xs text-green-600 font-medium mt-1">{hi ? "पहुँच गए" : "Arrived"}</p>
            </div>
          ) : (
            <div className="text-center bg-orange-50 rounded-xl px-3 py-2">
              <p className="text-2xl font-bold text-orange-600">{etaLeft}</p>
              <p className="text-xs text-slate-500">{hi ? "मिनट" : "min"}</p>
            </div>
          )}
        </div>

        {/* Steps */}
        <div className="space-y-2 mb-4">
          {([
            { s: "dispatched", label: hi ? "बुकिंग कन्फर्म" : "Booking confirmed" },
            { s: "en_route", label: hi ? "रास्ते में" : "En route" },
            { s: "nearby", label: hi ? "पास में" : "Almost there" },
            { s: "arrived", label: hi ? "पहुँच गए" : "Arrived" },
          ] as { s: TrackingStatus; label: string }[]).map(({ s, label }) => {
            const done =
              Object.keys(statusConfig).indexOf(status) >=
              Object.keys(statusConfig).indexOf(s);
            return (
              <div key={s} className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${done ? "bg-green-500" : "bg-slate-200"}`}>
                  {done && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                </div>
                <span className={`text-sm ${done ? "text-slate-800 font-medium" : "text-slate-400"}`}>{label}</span>
              </div>
            );
          })}
        </div>

        {/* Action buttons */}
        <div className="grid grid-cols-2 gap-3">
          <a
            href={`tel:+91${pro.phone}`}
            className="flex items-center justify-center gap-2 bg-slate-900 text-white text-sm font-medium py-2.5 rounded-xl hover:bg-slate-700 transition-colors"
          >
            <Phone className="w-4 h-4" />
            {hi ? "कॉल करें" : "Call Pro"}
          </a>
          <a
            href={`https://maps.google.com/?q=${encodeURIComponent(pro.area + ", " + pro.city)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-green-600 text-white text-sm font-medium py-2.5 rounded-xl hover:bg-green-700 transition-colors"
          >
            <MapPin className="w-4 h-4" />
            {hi ? "लाइव ट्रैक" : "Live Track"}
          </a>
        </div>

        {/* BG check reassurance */}
        <div className="mt-3 bg-green-50 rounded-xl p-3 flex items-start gap-2">
          <ShieldCheck className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
          <p className="text-xs text-green-700">
            {hi
              ? `${pro.name} BG-वेरिफाइड हैं। आधार, पुलिस क्लियरेंस और ITI सर्टिफिकेट हमारे पास है।`
              : `${pro.name} is BG-verified. Aadhar, police clearance & ITI certificate on file.`}
          </p>
        </div>
      </div>
    </div>
  );
}

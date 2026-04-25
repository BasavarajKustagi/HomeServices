import Link from "next/link";
import { Zap, Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 font-bold text-xl text-white mb-3">
              <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" fill="white" />
              </div>
              BijliWala
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              Trusted electricians with fixed prices and 90-day warranty. Available in Tier-2 & Tier-3 India.
            </p>
            <p className="text-xs text-slate-500 mt-2">भरोसेमंद। तय कीमत। गारंटी।</p>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm">Services</h4>
            <ul className="space-y-2 text-sm">
              {["Switch & Socket Repair", "Fan Installation", "AC Wiring", "MCB Box", "Geyser Wiring", "Full Rewiring"].map((s) => (
                <li key={s}>
                  <Link href="/booking" className="hover:text-orange-400 transition-colors">{s}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm">Company</h4>
            <ul className="space-y-2 text-sm">
              {[
                { label: "Pricing", href: "/pricing" },
                { label: "Our Electricians", href: "/electricians" },
                { label: "Warranty", href: "/warranty" },
                { label: "Emergency Help", href: "/emergency" },
                { label: "Become a Pro", href: "/pro" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-orange-400 transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-orange-400 shrink-0" />
                <span>1800-BIJLI-WA (Free)</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-orange-400 shrink-0" />
                <span>help@bijliwala.in</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                <span>50+ cities across India</span>
              </li>
            </ul>
            <div className="mt-4 p-3 bg-slate-800 rounded-lg">
              <p className="text-xs text-slate-400 mb-1">Emergency Hotline</p>
              <p className="text-orange-400 font-bold text-lg">⚡ 1800-911-BIJLI</p>
              <p className="text-xs text-slate-500">24×7 dispatch</p>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2025 BijliWala. Transforming electrical services across Tier-2 & Tier-3 India.</p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-slate-300">Privacy</Link>
            <Link href="#" className="hover:text-slate-300">Terms</Link>
            <Link href="#" className="hover:text-slate-300">Refund Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

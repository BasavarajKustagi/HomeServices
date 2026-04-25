"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Zap, Globe } from "lucide-react";
import { Language, translations } from "@/data/content";

interface NavbarProps {
  lang: Language;
  setLang: (l: Language) => void;
}

export default function Navbar({ lang, setLang }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const t = translations[lang];

  const links = [
    { href: "/", label: t.nav_home },
    { href: "/pricing", label: t.nav_pricing },
    { href: "/electricians", label: t.nav_electricians },
    { href: "/warranty", label: t.nav_warranty },
    { href: "/emergency", label: t.nav_emergency },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-slate-900">
          <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" fill="white" />
          </div>
          <span>BijliWala</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="px-3 py-2 text-sm text-slate-600 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          {/* Language toggle */}
          <button
            onClick={() => setLang(lang === "en" ? "hi" : "en")}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm border border-slate-200 rounded-lg hover:border-orange-300 hover:text-orange-600 transition-colors"
          >
            <Globe className="w-4 h-4" />
            <span className="font-medium">{lang === "en" ? "हिंदी" : "English"}</span>
          </button>

          {/* Emergency button */}
          <Link
            href="/emergency"
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 text-sm bg-red-50 text-red-600 border border-red-200 rounded-lg hover:bg-red-100 transition-colors font-medium"
          >
            <Zap className="w-4 h-4" />
            {t.nav_emergency}
          </Link>

          {/* Book CTA */}
          <Link
            href="/booking"
            className="flex items-center gap-1.5 px-4 py-1.5 text-sm bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium"
          >
            {t.nav_book}
          </Link>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-2 text-slate-600"
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-slate-100 bg-white px-4 pb-4 pt-2 flex flex-col gap-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="px-3 py-2.5 text-sm text-slate-700 hover:bg-orange-50 hover:text-orange-600 rounded-lg transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/emergency"
            onClick={() => setOpen(false)}
            className="mt-1 px-3 py-2.5 text-sm font-medium text-red-600 bg-red-50 rounded-lg"
          >
            ⚡ {t.nav_emergency}
          </Link>
        </div>
      )}
    </nav>
  );
}

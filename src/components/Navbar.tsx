"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Zap, Globe, Bell, User, ShoppingCart, LogOut } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { translations } from "@/data/content";

export default function Navbar() {
  const { state, setLang, logout, dispatch } = useApp();
  const { lang, user, cart, notifications } = state;
  const t = translations[lang];
  const [open, setOpen] = useState(false);
  const [showNotifs, setShowNotifs] = useState(false);

  const unread = notifications.filter((n) => !n.read).length;
  const cartCount = cart.length;

  const links = [
    { href: "/", label: t.nav_home },
    { href: "/pricing", label: t.nav_pricing },
    { href: "/electricians", label: t.nav_electricians },
    { href: "/warranty", label: t.nav_warranty },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-slate-900 shrink-0">
          <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" fill="white" />
          </div>
          <span className="hidden sm:block">BijliWala</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="px-3 py-2 text-sm text-slate-600 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors">
              {l.label}
            </Link>
          ))}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-1.5">
          {/* Language toggle */}
          <button
            onClick={() => setLang(lang === "en" ? "hi" : "en")}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg hover:border-orange-300 hover:text-orange-600 transition-colors font-medium"
          >
            <Globe className="w-3.5 h-3.5" />
            {lang === "en" ? "हि" : "EN"}
          </button>

          {/* Cart */}
          <Link href="/pricing" className="relative p-2 text-slate-600 hover:text-orange-600 transition-colors">
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-orange-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifs(!showNotifs)}
              className="relative p-2 text-slate-600 hover:text-orange-600 transition-colors"
            >
              <Bell className="w-5 h-5" />
              {unread > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {unread > 9 ? "9+" : unread}
                </span>
              )}
            </button>

            {/* Notification dropdown */}
            {showNotifs && (
              <div className="absolute right-0 top-10 w-80 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-50">
                <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
                  <span className="font-semibold text-slate-900 text-sm">
                    {lang === "en" ? "Notifications" : "सूचनाएं"}
                  </span>
                  {unread > 0 && (
                    <button
                      onClick={() => notifications.forEach((n) => dispatch({ type: "MARK_NOTIFICATION_READ", payload: n.id }))}
                      className="text-xs text-orange-600 hover:text-orange-700"
                    >
                      {lang === "en" ? "Mark all read" : "सभी पढ़े"}
                    </button>
                  )}
                </div>
                <div className="max-h-72 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <p className="text-center text-slate-400 text-sm py-8">
                      {lang === "en" ? "No notifications yet" : "अभी कोई सूचना नहीं"}
                    </p>
                  ) : (
                    notifications.slice(0, 8).map((n) => (
                      <Link
                        key={n.id}
                        href={n.link || "/"}
                        onClick={() => {
                          dispatch({ type: "MARK_NOTIFICATION_READ", payload: n.id });
                          setShowNotifs(false);
                        }}
                        className={`block px-4 py-3 hover:bg-slate-50 border-b border-slate-50 transition-colors ${!n.read ? "bg-orange-50/50" : ""}`}
                      >
                        <p className={`text-sm ${!n.read ? "font-semibold text-slate-900" : "text-slate-700"}`}>{n.title}</p>
                        <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">{n.body}</p>
                        <p className="text-xs text-slate-400 mt-1">{new Date(n.createdAt).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}</p>
                      </Link>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Emergency */}
          <Link href="/emergency" className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 text-xs bg-red-50 text-red-600 border border-red-200 rounded-lg hover:bg-red-100 transition-colors font-medium">
            <Zap className="w-3.5 h-3.5" />
            SOS
          </Link>

          {/* Auth */}
          {user ? (
            <div className="flex items-center gap-1">
              <Link href="/profile" className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-slate-100 text-slate-700 rounded-lg hover:bg-orange-50 hover:text-orange-700 transition-colors font-medium">
                <User className="w-3.5 h-3.5" />
                <span className="hidden sm:block">{user.name || user.phone.slice(-4)}</span>
              </Link>
              <button
                onClick={logout}
                className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <Link href="/login" className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-slate-100 text-slate-700 rounded-lg hover:bg-orange-50 hover:text-orange-600 transition-colors font-medium">
              <User className="w-3.5 h-3.5" />
              {t.nav_login}
            </Link>
          )}

          {/* Book CTA */}
          <Link href="/booking" className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium">
            {t.nav_book}
          </Link>

          {/* Mobile toggle */}
          <button className="md:hidden p-2 text-slate-600" onClick={() => setOpen(!open)}>
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-slate-100 bg-white px-4 pb-4 pt-2 flex flex-col gap-1">
          {links.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="px-3 py-2.5 text-sm text-slate-700 hover:bg-orange-50 hover:text-orange-600 rounded-lg transition-colors">
              {l.label}
            </Link>
          ))}
          <Link href="/emergency" onClick={() => setOpen(false)} className="px-3 py-2.5 text-sm font-medium text-red-600 bg-red-50 rounded-lg flex items-center gap-2">
            <Zap className="w-4 h-4" /> Emergency
          </Link>
          {user ? (
            <>
              <Link href="/profile" onClick={() => setOpen(false)} className="px-3 py-2.5 text-sm text-slate-700 bg-slate-50 rounded-lg">
                👤 {user.name || user.phone}
              </Link>
              <button onClick={() => { logout(); setOpen(false); }} className="px-3 py-2.5 text-sm text-red-600 text-left rounded-lg hover:bg-red-50">
                Logout
              </button>
            </>
          ) : (
            <Link href="/login" onClick={() => setOpen(false)} className="px-3 py-2.5 text-sm text-slate-700 bg-slate-50 rounded-lg">
              🔑 {t.nav_login}
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}

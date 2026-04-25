"use client";

import { useState } from "react";
import Link from "next/link";
import {
  CheckCircle2, Search, ShoppingCart, X, ArrowRight, Info,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Language, pricingCategories } from "@/data/content";

interface CartItem {
  name: string;
  price: number;
}

export default function PricingPage() {
  const [lang, setLang] = useState<Language>("en");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (name: string, price: number) => {
    setCart((prev) => [...prev, { name, price }]);
  };

  const removeFromCart = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const total = cart.reduce((s, i) => s + i.price, 0);

  const filteredCategories = pricingCategories.map((cat) => ({
    ...cat,
    items: cat.items.filter((item) => {
      const q = search.toLowerCase();
      return (
        item.name.toLowerCase().includes(q) ||
        item.name_hi.includes(q) ||
        cat.category.toLowerCase().includes(q)
      );
    }),
  })).filter((cat) => cat.items.length > 0);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar lang={lang} setLang={setLang} />

      <div className="flex-1 pt-20">
        {/* Header */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 py-14">
          <div className="max-w-4xl mx-auto px-4 text-center text-white">
            <h1 className="text-4xl font-bold mb-3">
              {lang === "en" ? "Fixed Price. Published. No Surprises." : "तय कीमत। प्रकाशित। कोई हैरानी नहीं।"}
            </h1>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto mb-6">
              {lang === "en"
                ? "Every service has a fixed, published price. You see it before you book. No hidden charges. Ever."
                : "हर सेवा की एक तय, प्रकाशित कीमत है। बुक करने से पहले देखें। कोई छुपी फीस नहीं। कभी नहीं।"}
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              {[
                { icon: "✅", label: lang === "en" ? "Prices visible before booking" : "बुकिंग से पहले कीमत दिखती है" },
                { icon: "✅", label: lang === "en" ? "No visit charges" : "कोई विजिट चार्ज नहीं" },
                { icon: "✅", label: lang === "en" ? "Materials shown separately" : "सामग्री अलग से दिखाई जाती है" },
              ].map((i) => (
                <span key={i.label} className="text-slate-300">
                  {i.icon} {i.label}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Gap callout */}
        <div className="bg-orange-50 border-b border-orange-100">
          <div className="max-w-4xl mx-auto px-4 py-4 flex items-start gap-3">
            <Info className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
            <p className="text-sm text-orange-700">
              <strong>Why this matters:</strong>{" "}
              {lang === "en"
                ? "Every other platform makes you call/chat before revealing prices. We're the only platform in India that publishes its full electrical rate card publicly."
                : "हर दूसरा प्लेटफॉर्म कीमत बताने से पहले कॉल/चैट करवाता है। हम भारत के एकमात्र प्लेटफॉर्म हैं जो पूरा रेट कार्ड सार्वजनिक रूप से प्रकाशित करते हैं।"}
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-10">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Price list */}
            <div className="flex-1">
              {/* Search */}
              <div className="relative mb-6">
                <Search className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={lang === "en" ? "Search services (e.g. fan, switch, MCB)..." : "सेवा खोजें (जैसे पंखा, स्विच, MCB)..."}
                  className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                />
              </div>

              {/* Categories */}
              <div className="space-y-6">
                {filteredCategories.map((cat) => (
                  <div key={cat.category} className="bg-white rounded-2xl overflow-hidden border border-slate-100">
                    <div className="bg-slate-50 px-5 py-3 flex items-center justify-between">
                      <h3 className="font-bold text-slate-900">
                        {lang === "en" ? cat.category : cat.category_hi}
                      </h3>
                      <span className="text-xs text-slate-400">{cat.items.length} services</span>
                    </div>
                    <div className="divide-y divide-slate-50">
                      {cat.items.map((item) => (
                        <div key={item.name} className="px-5 py-3.5 flex items-center justify-between hover:bg-slate-50 transition-colors">
                          <div>
                            <p className="text-sm font-medium text-slate-900">
                              {lang === "en" ? item.name : item.name_hi}
                            </p>
                            <p className="text-xs text-slate-400 mt-0.5">
                              {lang === "hi" ? item.name : item.name_hi}
                            </p>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="font-bold text-orange-600 text-base">₹{item.price}</span>
                            <button
                              onClick={() => addToCart(lang === "en" ? item.name : item.name_hi, item.price)}
                              className="text-xs bg-orange-500 hover:bg-orange-600 text-white px-3 py-1.5 rounded-lg transition-colors font-medium"
                            >
                              {lang === "en" ? "Add" : "जोड़ें"}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Materials note */}
              <div className="mt-6 bg-blue-50 rounded-xl p-4 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-blue-900 mb-1">
                    {lang === "en" ? "About materials" : "सामग्री के बारे में"}
                  </p>
                  <p className="text-blue-700">
                    {lang === "en"
                      ? "All prices above are labour-only. If parts replacement is needed (switches, MCB, wire), your electrician will show you the exact material cost BEFORE buying. You approve first."
                      : "ऊपर सभी कीमतें केवल श्रम की हैं। अगर पार्ट्स (स्विच, MCB, तार) बदलने की जरूरत हो, तो इलेक्ट्रीशियन खरीदने से पहले सटीक सामग्री लागत दिखाएगा। आप पहले मंजूरी देते हैं।"}
                  </p>
                </div>
              </div>
            </div>

            {/* Cart / estimate */}
            <div className="lg:w-80">
              <div className="sticky top-24 space-y-4">
                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                  <div className="bg-slate-50 px-5 py-3 flex items-center justify-between">
                    <h3 className="font-bold text-slate-900 flex items-center gap-2">
                      <ShoppingCart className="w-4 h-4" />
                      {lang === "en" ? "Your estimate" : "आपका अनुमान"}
                    </h3>
                    {cart.length > 0 && (
                      <span className="bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                        {cart.length}
                      </span>
                    )}
                  </div>

                  {cart.length === 0 ? (
                    <div className="px-5 py-8 text-center text-slate-400 text-sm">
                      {lang === "en"
                        ? "Add services to build your estimate"
                        : "अनुमान बनाने के लिए सेवाएं जोड़ें"}
                    </div>
                  ) : (
                    <div className="px-5 py-4 space-y-2">
                      {cart.map((item, i) => (
                        <div key={i} className="flex items-center justify-between">
                          <span className="text-sm text-slate-700 flex-1 mr-2 leading-tight">{item.name}</span>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-sm">₹{item.price}</span>
                            <button
                              onClick={() => removeFromCart(i)}
                              className="text-slate-300 hover:text-red-400 transition-colors"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}

                      <div className="border-t pt-3 mt-3">
                        <div className="flex justify-between font-bold text-base">
                          <span>{lang === "en" ? "Labour total" : "श्रम कुल"}</span>
                          <span className="text-orange-600">₹{total}</span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1">
                          {lang === "en" ? "+ materials if needed (approved by you)" : "+ सामग्री अगर जरूरी हो (आपकी मंजूरी से)"}
                        </p>
                      </div>

                      <Link
                        href={`/booking?services=${cart.map((i) => i.name).join(",")}`}
                        className="mt-2 w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm"
                      >
                        {lang === "en" ? "Book these services" : "ये सेवाएं बुक करें"}
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  )}
                </div>

                {/* Trust callout */}
                <div className="bg-green-50 rounded-xl p-4 text-sm">
                  <p className="font-semibold text-green-800 mb-1">
                    {lang === "en" ? "Price guarantee" : "कीमत की गारंटी"}
                  </p>
                  <p className="text-green-700">
                    {lang === "en"
                      ? "The price you see is the price you pay. If an electrician charges more, report it and get a full refund."
                      : "जो कीमत आप देखते हैं, वही देते हैं। अगर इलेक्ट्रीशियन ज्यादा लेता है, रिपोर्ट करें और पूरा रिफंड पाएं।"}
                  </p>
                </div>

                {/* Comparison */}
                <div className="bg-white border border-slate-200 rounded-xl p-4 text-sm">
                  <p className="font-semibold text-slate-900 mb-3">
                    {lang === "en" ? "vs. other platforms" : "अन्य प्लेटफॉर्म से तुलना"}
                  </p>
                  <div className="space-y-2">
                    {[
                      { platform: "Urban Company", show: "After clicking", color: "text-red-500" },
                      { platform: "Sulekha", show: "Never (call-based)", color: "text-red-500" },
                      { platform: "JustDial", show: "Never (call-based)", color: "text-red-500" },
                      { platform: "BijliWala ✓", show: "Always public", color: "text-green-600 font-bold" },
                    ].map((row) => (
                      <div key={row.platform} className="flex justify-between">
                        <span className="text-slate-500">{row.platform}</span>
                        <span className={row.color}>{row.show}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

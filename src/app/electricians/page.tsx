"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Star, MapPin, ShieldCheck, Award, Clock, Users,
  Search, Filter, CheckCircle2, Phone, ArrowRight,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SkillLevel from "@/components/SkillLevel";
import TrustBadge from "@/components/TrustBadge";
import { Language, electricians } from "@/data/content";

export default function ElectriciansPage() {
  const [lang, setLang] = useState<Language>("en");
  const [search, setSearch] = useState("");
  const [filterAvailable, setFilterAvailable] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<number | null>(null);
  const [selected, setSelected] = useState<string | null>(null);

  const filtered = electricians.filter((e) => {
    const matchSearch =
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.city.toLowerCase().includes(search.toLowerCase()) ||
      e.area.toLowerCase().includes(search.toLowerCase());
    const matchAvail = filterAvailable ? e.available : true;
    const matchSkill = selectedSkill !== null ? e.skillLevel === selectedSkill : true;
    return matchSearch && matchAvail && matchSkill;
  });

  const selectedPro = selected ? electricians.find((e) => e.id === selected) : null;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar lang={lang} setLang={setLang} />

      <div className="flex-1 pt-20">
        {/* Header */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 py-12">
          <div className="max-w-4xl mx-auto px-4 text-center text-white">
            <h1 className="text-4xl font-bold mb-3">
              {lang === "en" ? "Our Verified Electricians" : "हमारे वेरिफाइड इलेक्ट्रीशियन"}
            </h1>
            <p className="text-slate-300 mb-6">
              {lang === "en"
                ? "Every electrician is background-checked, skill-certified, and has real neighborhood reviews."
                : "हर इलेक्ट्रीशियन बैकग्राउंड-चेक, स्किल-सर्टिफाइड और असली पड़ोस के रिव्यू वाला है।"}
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              {[
                { icon: ShieldCheck, label: lang === "en" ? "Aadhar verified" : "आधार वेरिफाइड" },
                { icon: CheckCircle2, label: lang === "en" ? "Police clearance" : "पुलिस क्लियरेंस" },
                { icon: Award, label: lang === "en" ? "ITI / skill certified" : "ITI / स्किल सर्टिफाइड" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-1.5 text-slate-300">
                  <Icon className="w-4 h-4 text-green-400" />
                  {label}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={lang === "en" ? "Search by name or city..." : "नाम या शहर से खोजें..."}
                className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>
            <button
              onClick={() => setFilterAvailable(!filterAvailable)}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl border text-sm font-medium transition-colors ${
                filterAvailable
                  ? "border-green-500 bg-green-50 text-green-700"
                  : "border-slate-200 bg-white text-slate-600 hover:border-green-300"
              }`}
            >
              <Clock className="w-4 h-4" />
              {lang === "en" ? "Available now" : "अभी उपलब्ध"}
            </button>
            {[1, 2, 3].map((level) => (
              <button
                key={level}
                onClick={() => setSelectedSkill(selectedSkill === level ? null : level)}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl border text-sm font-medium transition-colors ${
                  selectedSkill === level
                    ? "border-orange-500 bg-orange-50 text-orange-700"
                    : "border-slate-200 bg-white text-slate-600 hover:border-orange-300"
                }`}
              >
                <Filter className="w-3.5 h-3.5" />
                {level === 1
                  ? lang === "en" ? "Apprentice" : "अप्रेंटिस"
                  : level === 2
                  ? lang === "en" ? "Journeyman" : "जर्नीमैन"
                  : lang === "en" ? "Master" : "मास्टर"}
              </button>
            ))}
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Card list */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
              {filtered.map((pro) => (
                <button
                  key={pro.id}
                  onClick={() => setSelected(pro.id === selected ? null : pro.id)}
                  className={`text-left bg-white rounded-2xl p-5 border transition-all card-shadow hover:card-shadow-lg ${
                    selected === pro.id
                      ? "border-orange-400 ring-2 ring-orange-200"
                      : "border-slate-100"
                  }`}
                >
                  {/* Header */}
                  <div className="flex items-start gap-3 mb-4">
                    <div
                      className={`w-12 h-12 ${pro.color} rounded-full flex items-center justify-center text-white font-bold shrink-0`}
                    >
                      {pro.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <h3 className="font-bold text-slate-900">{pro.name}</h3>
                        <div
                          className={`w-2.5 h-2.5 rounded-full shrink-0 mt-1.5 ${
                            pro.available ? "bg-green-400" : "bg-slate-300"
                          }`}
                        />
                      </div>
                      <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3" />
                        {pro.area}, {pro.city}
                      </p>
                    </div>
                  </div>

                  {/* Skill level */}
                  <div className="mb-3">
                    <SkillLevel level={pro.skillLevel as 1 | 2 | 3} />
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-2 mb-3">
                    <div className="text-center">
                      <p className="font-bold text-slate-900 text-sm">{pro.rating}</p>
                      <p className="text-xs text-slate-400">Rating</p>
                    </div>
                    <div className="text-center border-x border-slate-100">
                      <p className="font-bold text-slate-900 text-sm">{pro.jobs}</p>
                      <p className="text-xs text-slate-400">{lang === "en" ? "Jobs" : "काम"}</p>
                    </div>
                    <div className="text-center">
                      <p className="font-bold text-slate-900 text-sm">{pro.experience}y</p>
                      <p className="text-xs text-slate-400">{lang === "en" ? "Exp" : "अनुभव"}</p>
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {pro.bgCheck && <TrustBadge type="verified" />}
                    {pro.warranty && <TrustBadge type="warranty" />}
                    {pro.available && pro.eta <= 60 && <TrustBadge type="emergency" />}
                  </div>

                  {/* Community trust */}
                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <Users className="w-3.5 h-3.5 text-orange-400" />
                    <span className="text-orange-600 font-medium">{pro.localTrust} neighbors</span>
                    {lang === "en" ? " in your area used him" : " पड़ोसियों ने बुक किया"}
                  </div>

                  {/* Languages */}
                  <div className="mt-2 flex gap-1">
                    {pro.languages.map((l) => (
                      <span key={l} className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                        {l}
                      </span>
                    ))}
                  </div>
                </button>
              ))}

              {filtered.length === 0 && (
                <div className="md:col-span-2 text-center py-16 text-slate-400">
                  <p className="text-4xl mb-3">🔍</p>
                  <p className="font-medium">{lang === "en" ? "No electricians found" : "कोई इलेक्ट्रीशियन नहीं मिला"}</p>
                </div>
              )}
            </div>

            {/* Detail panel */}
            {selectedPro && (
              <div className="lg:w-80">
                <div className="sticky top-24 bg-white rounded-2xl border border-slate-200 overflow-hidden card-shadow">
                  {/* Pro header */}
                  <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 text-white">
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`w-16 h-16 ${selectedPro.color} rounded-full flex items-center justify-center text-white font-bold text-xl`}>
                        {selectedPro.avatar}
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">{selectedPro.name}</h3>
                        <p className="text-slate-300 text-sm">{selectedPro.skill}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                          <span className="font-semibold">{selectedPro.rating}</span>
                          <span className="text-slate-400 text-sm">({selectedPro.reviews})</span>
                        </div>
                      </div>
                    </div>
                    <SkillLevel level={selectedPro.skillLevel as 1 | 2 | 3} />
                  </div>

                  <div className="p-5 space-y-4">
                    {/* Verification */}
                    <div>
                      <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                        {lang === "en" ? "Verification" : "वेरिफिकेशन"}
                      </h4>
                      <div className="space-y-1.5">
                        {[
                          { label: "Aadhar Card", done: true },
                          { label: "Police Clearance", done: true },
                          { label: "ITI Certificate", done: true },
                          { label: "Skill Assessment", done: true },
                        ].map((v) => (
                          <div key={v.label} className="flex items-center gap-2 text-sm">
                            <CheckCircle2 className={`w-4 h-4 ${v.done ? "text-green-500" : "text-slate-300"}`} />
                            <span className={v.done ? "text-slate-700" : "text-slate-400"}>{v.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Skills */}
                    <div>
                      <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                        {lang === "en" ? "Specializations" : "विशेषज्ञताएं"}
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedPro.badges.map((b) => (
                          <span key={b} className="text-xs bg-orange-50 text-orange-700 border border-orange-200 px-2.5 py-1 rounded-full">
                            {b}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { label: lang === "en" ? "Total jobs" : "कुल काम", value: selectedPro.jobs },
                        { label: lang === "en" ? "Experience" : "अनुभव", value: `${selectedPro.experience} years` },
                        { label: lang === "en" ? "Reviews" : "रिव्यू", value: selectedPro.reviews },
                        { label: lang === "en" ? "Neighborhood" : "पड़ोस", value: `${selectedPro.localTrust} uses` },
                      ].map((s) => (
                        <div key={s.label} className="bg-slate-50 rounded-xl p-3 text-center">
                          <p className="font-bold text-slate-900">{s.value}</p>
                          <p className="text-xs text-slate-500 mt-0.5">{s.label}</p>
                        </div>
                      ))}
                    </div>

                    {/* Languages */}
                    <div>
                      <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                        {lang === "en" ? "Languages" : "भाषाएं"}
                      </h4>
                      <div className="flex gap-2">
                        {selectedPro.languages.map((l) => (
                          <span key={l} className="text-sm bg-blue-50 text-blue-700 px-3 py-1 rounded-full">
                            {l}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Availability */}
                    <div className={`rounded-xl p-3 flex items-center justify-between ${selectedPro.available ? "bg-green-50" : "bg-slate-50"}`}>
                      <div className="flex items-center gap-2">
                        <div className={`w-2.5 h-2.5 rounded-full ${selectedPro.available ? "bg-green-400" : "bg-slate-300"}`} />
                        <span className={`text-sm font-medium ${selectedPro.available ? "text-green-700" : "text-slate-500"}`}>
                          {selectedPro.available
                            ? lang === "en" ? "Available now" : "अभी उपलब्ध"
                            : lang === "en" ? "Busy — next slot later" : "व्यस्त — अगला स्लॉट बाद में"}
                        </span>
                      </div>
                      {selectedPro.available && (
                        <span className="text-xs text-green-600 font-medium">~{selectedPro.eta} min away</span>
                      )}
                    </div>

                    {/* CTAs */}
                    <div className="flex flex-col gap-2">
                      <Link
                        href={`/booking?pro=${selectedPro.id}`}
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm"
                      >
                        {lang === "en" ? `Book ${selectedPro.name.split(" ")[0]}` : `${selectedPro.name.split(" ")[0]} को बुक करें`}
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                      <button className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm">
                        <Phone className="w-4 h-4" />
                        {lang === "en" ? "Call to verify" : "वेरिफाई के लिए कॉल"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Become a pro CTA */}
          <div className="mt-10 bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-8 text-white text-center">
            <h3 className="text-2xl font-bold mb-2">
              {lang === "en" ? "Are you an electrician?" : "क्या आप इलेक्ट्रीशियन हैं?"}
            </h3>
            <p className="text-slate-300 mb-4">
              {lang === "en"
                ? "Join BijliWala. Get guaranteed leads, build your reputation, earn more."
                : "BijliWala में शामिल हों। गारंटीड लीड पाएं, अपनी प्रतिष्ठा बनाएं, ज्यादा कमाएं।"}
            </p>
            <Link
              href="/pro"
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-xl transition-colors"
            >
              {lang === "en" ? "Join as a Pro" : "प्रो के रूप में जुड़ें"}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

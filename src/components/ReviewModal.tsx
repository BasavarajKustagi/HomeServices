"use client";

import { useState } from "react";
import { Star, X, Send } from "lucide-react";
import { Language } from "@/data/content";

interface ReviewModalProps {
  bookingId: string;
  proName: string;
  service: string;
  lang: Language;
  onSubmit: (rating: number, text: string) => void;
  onClose: () => void;
}

export default function ReviewModal({ bookingId, proName, service, lang, onSubmit, onClose }: ReviewModalProps) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [text, setText] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const hi = lang === "hi";

  const labels = hi
    ? ["बहुत बुरा", "बुरा", "ठीक है", "अच्छा", "बहुत अच्छा"]
    : ["Very bad", "Bad", "Okay", "Good", "Excellent"];

  const quickTags_en = ["On time", "Fixed price honored", "Clean work", "Polite", "Would recommend"];
  const quickTags_hi = ["समय पर", "तय कीमत रखी", "साफ काम", "विनम्र", "सुझाऊंगा"];
  const quickTags = hi ? quickTags_hi : quickTags_en;

  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]);
  };

  const handleSubmit = () => {
    if (!rating) return;
    const fullText = [
      ...selectedTags,
      text.trim(),
    ].filter(Boolean).join(" · ");
    setSubmitted(true);
    setTimeout(() => onSubmit(rating, fullText), 800);
  };

  if (submitted) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
        <div className="bg-white rounded-2xl p-8 text-center shadow-2xl w-full max-w-sm">
          <div className="text-5xl mb-4">🙏</div>
          <h3 className="font-bold text-xl text-slate-900 mb-2">
            {hi ? "धन्यवाद!" : "Thank you!"}
          </h3>
          <p className="text-slate-500 text-sm">
            {hi
              ? "आपका रिव्यू पड़ोसियों की मदद करेगा।"
              : "Your review helps neighbors make better decisions."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
      <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-slate-50 p-5 flex items-start justify-between border-b border-slate-100">
          <div>
            <h3 className="font-bold text-slate-900">{hi ? "काम का रिव्यू दें" : "Rate your experience"}</h3>
            <p className="text-sm text-slate-500 mt-0.5">{service} · {proName}</p>
            <p className="text-xs text-orange-600 font-mono mt-0.5">{bookingId}</p>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-slate-200 rounded-lg transition-colors">
            <X className="w-4 h-4 text-slate-500" />
          </button>
        </div>

        <div className="p-5 space-y-5">
          {/* Star rating */}
          <div>
            <p className="text-sm font-medium text-slate-700 mb-3 text-center">
              {hi ? "कितने स्टार देंगे?" : "How many stars?"}
            </p>
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(0)}
                  onClick={() => setRating(star)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    className={`w-9 h-9 ${
                      star <= (hover || rating) ? "text-amber-400 fill-amber-400" : "text-slate-300"
                    }`}
                  />
                </button>
              ))}
            </div>
            {(hover || rating) > 0 && (
              <p className="text-center text-sm font-medium text-slate-600 mt-2">
                {labels[(hover || rating) - 1]}
              </p>
            )}
          </div>

          {/* Quick tags */}
          {rating >= 4 && (
            <div>
              <p className="text-xs font-medium text-slate-500 mb-2">
                {hi ? "क्या अच्छा लगा?" : "What went well?"}
              </p>
              <div className="flex flex-wrap gap-2">
                {quickTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                      selectedTags.includes(tag)
                        ? "bg-orange-100 border-orange-400 text-orange-700 font-medium"
                        : "border-slate-200 text-slate-600 hover:border-orange-300"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Text review */}
          <div>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={hi ? "अपने शब्दों में बताएं... (वैकल्पिक)" : "Tell us more... (optional)"}
              rows={3}
              className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none"
            />
            <p className="text-xs text-slate-400 mt-1">
              {hi
                ? "आपका रिव्यू आपके इलाके के लोगों को दिखेगा।"
                : "Your review appears to people in your locality."}
            </p>
          </div>

          <button
            onClick={handleSubmit}
            disabled={!rating}
            className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-slate-200 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm"
          >
            <Send className="w-4 h-4" />
            {hi ? "रिव्यू सबमिट करें" : "Submit Review"}
          </button>
        </div>
      </div>
    </div>
  );
}

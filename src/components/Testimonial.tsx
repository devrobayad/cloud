import React, { useState, useEffect } from "react";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { dataStore, TestimonialItem } from "../utils/dataStore";

export default function Testimonial() {
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(() => dataStore.getTestimonials());
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleUpdate = () => {
      setTestimonials(dataStore.getTestimonials());
      setActiveIndex(0);
    };
    window.addEventListener("datastore-update", handleUpdate);
    return () => window.removeEventListener("datastore-update", handleUpdate);
  }, []);

  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  const prev = () => setActiveIndex((i) => (i === 0 ? testimonials.length - 1 : i - 1));
  const next = () => setActiveIndex((i) => (i === testimonials.length - 1 ? 0 : i + 1));

  return (
    <section id="gallery" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column: Title and text */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
              <span className="text-orange-500 font-extrabold uppercase tracking-widest text-[11px] font-sans">
                What Our Clients Say
              </span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Testimonials From Our Valued Institutional Clients
            </h2>

            <p className="text-slate-600 text-sm leading-relaxed max-w-xl">
              — We value every word from our clients. Their honest feedback helps us improve and deliver the best possible results to support continuous nation-scale operations.
            </p>

            {/* Testimonial slider navigation buttons */}
            <div className="flex items-center gap-3 mt-4">
              <button
                onClick={prev}
                className="w-10 h-10 rounded-full border border-slate-200 hover:border-indigo-600 text-slate-600 hover:text-indigo-600 flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={next}
                className="w-10 h-10 rounded-full border border-slate-200 hover:border-indigo-600 text-slate-600 hover:text-indigo-600 flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Custom Visual Testimonial Card */}
          <div className="relative bg-gradient-to-tr from-indigo-950 to-slate-950 rounded-3xl p-8 sm:p-12 text-white shadow-2xl overflow-hidden min-h-[320px] flex flex-col justify-between">
            {/* Background Decorative Quote */}
            <div className="absolute top-4 right-8 text-white/5 pointer-events-none">
              <Quote className="w-36 h-36" />
            </div>

            {/* Core Review Statement */}
            <div className="flex flex-col gap-4 relative z-10">
              <div className="flex gap-1 text-amber-400">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-slate-200 text-sm md:text-base leading-relaxed italic font-medium">
                "{testimonials[activeIndex].text}"
              </p>
            </div>

            {/* Identity badge */}
            <div className="flex items-center gap-4 border-t border-white/10 pt-6 mt-6 relative z-10 select-none">
              <img
                src={testimonials[activeIndex].avatar}
                alt={testimonials[activeIndex].author}
                className="w-12 h-12 rounded-full object-cover border-2 border-white/20 shadow-md flex-shrink-0"
                referrerPolicy="no-referrer"
              />
              <div className="flex flex-col">
                <span className="font-extrabold text-sm text-white">
                  {testimonials[activeIndex].author}
                </span>
                <span className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">
                  {testimonials[activeIndex].role}
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

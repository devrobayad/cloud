import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { dataStore, TestimonialItem } from "../utils/dataStore";

export default function Testimonial() {
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(() => dataStore.getTestimonials());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  useEffect(() => {
    const handleUpdate = () => {
      setTestimonials(dataStore.getTestimonials());
    };
    window.addEventListener("testimonials-updated", handleUpdate);
    window.addEventListener("storage", handleUpdate);
    return () => {
      window.removeEventListener("testimonials-updated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  // Safe fallback if empty
  const items = testimonials.length > 0 ? testimonials : [
    {
      id: "fallback-1",
      text: "We value every word from our clients. Their honest feedback helps us improve and deliver the best possible results.",
      author: "Valued Client Partner",
      role: "Corporate Executive",
      avatar: "https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=800&auto=format&fit=crop"
    }
  ];

  // Auto-play controls
  useEffect(() => {
    if (items.length <= 1) return;
    const interval = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(interval);
  }, [currentIndex, items.length]);

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  const currentItem = items[currentIndex] || items[0];

  // Variants for slide transitions
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 100 : -100,
      opacity: 0
    })
  };

  return (
    <section id="testimonials" className="py-24 bg-white relative overflow-hidden">
      {/* Background Decorative Accent */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-orange-500/5 rounded-full filter blur-3xl -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500/5 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Stylized Quotation tagline and Testimonial quote statement */}
          <div className="md:col-span-7 flex flex-col gap-6 justify-center min-h-[250px]">
            <div className="flex items-center gap-1 font-extrabold text-[15px] sm:text-[16px] tracking-wide font-sans text-slate-900 select-none">
              <span className="text-[#ee6c25] text-2xl font-serif leading-none">“</span>
              <span className="font-extrabold text-slate-900">What Our Clients Say</span>
              <span className="text-[#ee6c25] text-2xl font-serif leading-none">”</span>
            </div>

            <div className="relative overflow-hidden w-full">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentItem.id}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="flex flex-col gap-5"
                >
                  <p className="text-slate-900 font-extrabold text-[14px] leading-relaxed font-sans max-w-xl">
                    — {currentItem.text}
                  </p>
                  
                  {/* Author Meta Details */}
                  {currentItem.author && (
                    <div className="flex flex-col mt-2 select-none">
                      <span className="font-bold text-slate-900 text-[15px]">{currentItem.author}</span>
                      <span className="text-xs text-indigo-600 font-extrabold mt-0.5 uppercase tracking-wide">{currentItem.role}</span>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Slider Navigation Buttons & Indicators */}
            {items.length > 1 && (
              <div className="flex items-center gap-6 mt-4 select-none">
                {/* Dots indicator */}
                <div className="flex items-center gap-2">
                  {items.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setDirection(idx > currentIndex ? 1 : -1);
                        setCurrentIndex(idx);
                      }}
                      className={`h-2.5 rounded-full transition-all duration-300 ${
                        idx === currentIndex ? "w-8 bg-[#ee6c25]" : "w-2.5 bg-slate-200 hover:bg-slate-350"
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>

                {/* Left/Right chevrons */}
                <div className="flex items-center gap-2.5">
                  <button
                    onClick={handlePrev}
                    className="p-2 border border-slate-200 text-slate-600 hover:text-white hover:bg-[#ee6c25] hover:border-[#ee6c25] rounded-full transition-all duration-300 shadow-sm"
                    aria-label="Previous Testimonial"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="p-2 border border-slate-200 text-slate-600 hover:text-white hover:bg-[#ee6c25] hover:border-[#ee6c25] rounded-full transition-all duration-300 shadow-sm"
                    aria-label="Next Testimonial"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Custom Orange Border Image Frame (Synchronized with selected index) */}
          <div className="md:col-span-5 flex justify-center md:justify-end w-full">
            <div className="w-full max-w-[430px] relative">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentItem.id}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="w-full"
                >
                  <div className="p-1.5 border-[4px] border-[#ee6c25] rounded-[28px] bg-white overflow-hidden w-full aspect-[1.5] shadow-lg hover:scale-[1.01] transition-transform duration-500">
                    <img
                      src={currentItem.avatar}
                      alt={currentItem.author || "Client Spotlight"}
                      className="w-full h-full object-cover rounded-[20px]"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

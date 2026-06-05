import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { dataStore, HeroSlide } from "../utils/dataStore";

export default function Hero() {
  const [slides, setSlides] = useState<HeroSlide[]>(() => dataStore.getHeroSlides());
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const handleUpdate = () => {
      const updated = dataStore.getHeroSlides();
      setSlides(updated);
      setCurrent(0);
    };
    window.addEventListener("datastore-update", handleUpdate);
    return () => window.removeEventListener("datastore-update", handleUpdate);
  }, []);

  const prevSlide = () => {
    if (slides.length === 0) return;
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    if (slides.length === 0) return;
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  if (!slides || slides.length === 0) {
    return (
      <section id="home" className="relative w-full h-screen bg-slate-950 flex items-center justify-center text-white">
        <p className="text-sm text-slate-400 font-mono">No slides found. Add one in the Admin Panel!</p>
      </section>
    );
  }

  return (
    <section id="home" className="relative w-full h-screen overflow-hidden bg-slate-950 select-none">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0.8, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0.8 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 w-full h-full"
        >
          {/* Main Background Image */}
          <img
            src={slides[current].image}
            alt={slides[current].title}
            className="w-full h-full object-cover object-center filter brightness-[0.55] contrast-[1.05]"
            referrerPolicy="no-referrer"
          />
          {/* Dynamic Gradient Overlays for maximum readability of text */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40" />

          {/* Slide Text Content Container */}
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto w-full px-6 md:px-12 flex flex-col items-start gap-4 md:gap-6 pt-16">
              {/* Animating Slide Category/Tag */}
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="flex items-center gap-2 bg-indigo-600/90 text-white px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg shadow-indigo-600/20 backdrop-blur-sm"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                {slides[current].tag}
              </motion.div>

              {/* Animating Slide Title */}
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-3xl sm:text-4.5xl md:text-5.5xl lg:text-6.5xl font-extrabold text-white tracking-tight leading-tight max-w-3xl drop-shadow-md font-display"
              >
                {slides[current].title}
              </motion.h1>

              {/* Animating Description */}
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-slate-200 text-sm md:text-lg max-w-lg leading-relaxed font-sans drop-shadow-sm font-medium"
              >
                {slides[current].description}
              </motion.p>

              {/* Animating Call To Action Buttons */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="flex items-center gap-4 mt-2"
              >
                <a 
                  href="#contact"
                  className="px-6 py-3.5 bg-indigo-600 hover:bg-indigo-700 hover:scale-105 active:scale-95 text-white text-xs md:text-sm font-bold rounded-full transition-all shadow-xl shadow-indigo-700/20 cursor-pointer"
                >
                  {slides[current].cta}
                </a>
                <a 
                  href="#solutions"
                  className="px-6 py-3.5 bg-white/10 hover:bg-white/20 hover:scale-105 active:scale-95 text-white text-xs md:text-sm font-bold rounded-full transition-all border border-white/20 backdrop-blur-sm cursor-pointer"
                >
                  Our Solutions
                </a>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Floating Left and Right Controls */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/40 text-white flex items-center justify-center transition-all cursor-pointer z-20 border border-white/20 group"
      >
        <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/40 text-white flex items-center justify-center transition-all cursor-pointer z-20 border border-white/20 group"
      >
        <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
      </button>

      {/* Slide Indicators / Dots */}
      <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2.5 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`transition-all duration-300 rounded-full cursor-pointer ${
              current === i 
                ? "w-2.5 h-2.5 bg-white shadow-md scale-110" 
                : "w-2 h-2 bg-white/40 hover:bg-white/75"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

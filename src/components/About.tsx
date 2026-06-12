import React, { useState, useEffect } from "react";
import { PhoneCall, ArrowRight, Users } from "lucide-react";
import { dataStore } from "../utils/dataStore";
import ScrollReveal from "./ScrollReveal";

import INSTALLER_IMAGE from "../assets/images/security_mounting_1780518506432.png";
import ISOMETRIC_IMAGE from "../assets/images/network_isometric_1780518523273.png";

export default function About() {
  const [contact, setContact] = useState(() => dataStore.getContactInfo());
  const [about, setAbout] = useState(() => dataStore.getAboutConfig());
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleUpdate = () => {
      setContact(dataStore.getContactInfo());
      setAbout(dataStore.getAboutConfig());
    };
    window.addEventListener("datastore-update", handleUpdate);

    // Responsive media query for desktop screen width
    const media = window.matchMedia("(min-width: 1024px)");
    setIsDesktop(media.matches);
    const listener = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    media.addEventListener("change", listener);

    return () => {
      window.removeEventListener("datastore-update", handleUpdate);
      media.removeEventListener("change", listener);
    };
  }, []);

  const handleScrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="about" style={{ paddingBottom: "170px" }} className="pt-24 pb-[170px] bg-[#ffffff] relative overflow-hidden">
      {/* Subtle Background Accent */}
      <div className="absolute top-1/4 left-0 w-80 h-80 bg-indigo-50/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-slate-50 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-15">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Side: Meticulously Positioned Overlapping Image Collage */}
          {/* DESKTOP VIEW ONLY (perfect alignment as before, completely restored) */}
          <div 
            style={{ marginBottom: "0px" }}
            className="hidden lg:col-span-6 lg:relative lg:flex lg:justify-start lg:py-0 lg:mb-0 z-10"
          >
            <ScrollReveal direction="right" duration={0.8}>
              {/* Dots Pattern Accent */}
              <div className="absolute -top-4 -left-4 w-32 h-32 bg-[radial-gradient(#e2e8f0_2px,transparent_2px)] [background-size:12px_12px] opacity-70 z-0" />
              
              {/* Base Image (Installer / Camera Technician) with rich shadow and NO border */}
              <div 
                style={{ width: "400px" }}
                className="relative h-88 sm:h-96 rounded-[32px] overflow-hidden shadow-[0_25px_60px_-15px_rgba(15,23,42,0.15)] border-none transform hover:scale-[1.01] transition-all duration-500 z-10"
              >
                <img
                  src={about.image1 || INSTALLER_IMAGE}
                  alt="Security Installation"
                  className="w-full h-full object-cover filter brightness-[0.98] contrast-[1.01]"
                  referrerPolicy="no-referrer"
                />
              </div>
              
              {/* Overlapping Image (Isometric Network Server Rack) positioned front-right with NO border */}
              <div 
                style={{ bottom: "71px", marginRight: "80px", marginBottom: "-200px", width: "300px", height: "300px" }}
                className="absolute -right-2 sm:right-6 lg:-right-6 rounded-[28px] overflow-hidden shadow-[0_30px_70px_-10px_rgba(79,70,229,0.22)] border-none transform hover:scale-[1.03] transition-all duration-500 z-20 flex bg-indigo-950 p-0.5"
              >
                <img
                  src={about.image2 || ISOMETRIC_IMAGE}
                  alt="Networking Systems"
                  className="w-full h-full object-cover rounded-[20px] filter brightness-95 saturate-[1.10]"
                  referrerPolicy="no-referrer"
                />
              </div>
            </ScrollReveal>
          </div>

          {/* MOBILE & TABLET VIEW ONLY (centered, relative, no overlap with text underneath) */}
          <div 
            className="col-span-1 block lg:hidden relative flex justify-center pt-6 pb-16 z-10"
          >
            <ScrollReveal direction="up" duration={0.8}>
              {/* Dots Pattern Accent */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 -ml-36 w-32 h-32 bg-[radial-gradient(#e2e8f0_2px,transparent_2px)] [background-size:12px_12px] opacity-70 z-0" />
              
              {/* Wrapper matching the base image size to anchor them together perfectly */}
              <div className="relative w-72 h-80 sm:w-80 sm:h-96 flex-shrink-0">
                {/* Base Image */}
                <div className="w-full h-full rounded-[32px] overflow-hidden shadow-[0_20px_50px_-12px_rgba(15,23,42,0.15)] border-none relative z-10">
                  <img
                    src={about.image1 || INSTALLER_IMAGE}
                    alt="Security Installation"
                    className="w-full h-full object-cover filter brightness-[0.98] contrast-[1.01]"
                    referrerPolicy="no-referrer"
                  />
                </div>
                
                {/* Overlapping Image positioned over the bottom right of base image */}
                <div 
                  className="absolute -bottom-8 -right-4 w-44 h-44 sm:w-52 sm:h-52 rounded-[24px] overflow-hidden shadow-[0_20px_45px_-8px_rgba(79,70,229,0.25)] border-none flex bg-indigo-950 p-0.5 z-20"
                >
                  <img
                    src={about.image2 || ISOMETRIC_IMAGE}
                    alt="Networking Systems"
                    className="w-full h-full object-cover rounded-[18px] filter brightness-95 saturate-[1.10]"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Side: High-End Structured Typography Content */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <ScrollReveal direction="left" duration={0.8} delay={0.1}>
              {/* Section Tagline */}
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-5 h-5 rounded-md bg-red-50 flex items-center justify-center text-red-500 border border-red-100/60 shadow-sm">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                  </svg>
                </div>
                <span className="text-red-500 font-extrabold uppercase tracking-widest text-xs font-display">
                  {about.tagline}
                </span>
              </div>

              {/* Main Action Title */}
              <h2 className="text-3xl md:text-[38px] font-extrabold text-[#0f172a] tracking-tight leading-tight md:leading-[1.15] mb-4">
                {about.title}
              </h2>

              {/* Description Text */}
              <div className="flex flex-col gap-4 text-slate-500 text-[14px] leading-relaxed font-sans max-w-2xl mb-4">
                <p>
                  {about.desc1}
                </p>
                {about.desc2 && (
                  <p>
                    {about.desc2}
                  </p>
                )}
              </div>

              {/* Comprehensive trust Badge */}
              <div className="flex items-center gap-4 p-4.5 bg-slate-50/60 rounded-2xl border border-slate-100 hover:border-indigo-100 hover:bg-slate-50 transition-all duration-300 select-none mt-2 mb-6">
                {/* Left Side: Miniature zoom visual of security monitor */}
                <div className="w-20 h-16 rounded-xl overflow-hidden shadow-sm flex-shrink-0 border border-slate-200/60 relative bg-slate-900 group">
                  <img
                    src={about.badgeImage || "https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=150&auto=format&fit=crop"}
                    alt="Surveillance Camera Preview"
                    className="w-full h-full object-cover filter brightness-90 group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-red-600/10 mix-blend-color" />
                </div>

                {/* Right Side: Network connection circular icon with trust textual statement */}
                <div className="flex items-start gap-3 flex-1">
                  <div className="w-9 h-9 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 flex-shrink-0 mt-0.5 shadow-sm overflow-hidden p-1.5">
                    {about.badgeIconUrl ? (
                      <img src={about.badgeIconUrl} alt="Badge Icon" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                    ) : (
                      <Users className="w-4.5 h-4.5" />
                    )}
                  </div>
                  <div className="flex flex-col">
                    <p className="text-slate-800 font-extrabold text-[13.5px] leading-snug tracking-tight">
                      {about.badgeText}
                    </p>
                  </div>
                </div>
              </div>

              {/* Footer level contact row */}
              <div 
                style={{ 
                  width: isDesktop ? "470px" : "100%",
                  paddingLeft: "10px",
                  paddingRight: "10px",
                  paddingBottom: "10px",
                  boxShadow: "0 -2px 12px rgba(15, 23, 42, 0.01), 0 16px 36px -8px rgba(15, 23, 42, 0.14), -8px 8px 30px -10px rgba(15, 23, 42, 0.06), 8px 8px 30px -10px rgba(15, 23, 42, 0.06)"
                }} 
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-5 border border-slate-100/70 rounded-3xl bg-white mt-4 max-w-full"
              >
                
                {/* Call Directly button action element */}
                <div className="flex items-center gap-3.5">
                  <a 
                    href={`tel:${contact.phone.replace(/[^+\d]/g, "")}`} 
                    className="w-12 h-12 bg-indigo-50 hover:bg-indigo-100 rounded-full flex items-center justify-center text-[#4F46E5] border border-indigo-100 hover:scale-105 active:scale-95 transition-all shadow-sm"
                  >
                    <PhoneCall className="w-5 h-5 animate-pulse" />
                  </a>
                  <div className="flex flex-col">
                    <span className="text-slate-400 text-[10px] font-extrabold tracking-widest uppercase">Call Directly 24/7</span>
                    <a 
                      href={`tel:${contact.phone.replace(/[^+\d]/g, "")}`} 
                      className="text-[#0f172a] font-black text-base hover:text-indigo-600 transition-colors"
                    >
                      {contact.phone}
                    </a>
                  </div>
                </div>

                {/* More About Us anchor action button */}
                <button 
                  onClick={handleScrollToContact}
                  style={{ width: "180px", marginRight: "0px" }}
                  className="px-6 py-4 bg-[#2E6FA8] hover:bg-[#243D7A] text-white font-extrabold text-[13px] rounded-full flex items-center justify-center gap-2.5 shadow-lg shadow-indigo-950/20 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer group w-[180px]"
                >
                  More About Us
                  <span className="bg-white/10 p-1 rounded-full group-hover:translate-x-1 transition-transform duration-300">
                    <ArrowRight className="w-3.5 h-3.5 text-white" />
                  </span>
                </button>
              </div>
            </ScrollReveal>
          </div>

        </div>
      </div>
    </section>
  );
}

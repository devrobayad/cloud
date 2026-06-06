import React, { useState, useEffect } from "react";
import PageBanner from "./PageBanner";
import { dataStore } from "../utils/dataStore";
import ScrollReveal from "./ScrollReveal";

export default function MDMessagePage() {
  const [md, setMd] = useState(() => dataStore.getMDConfig());

  useEffect(() => {
    const handleUpdate = () => {
      setMd(dataStore.getMDConfig());
    };
    window.addEventListener("datastore-update", handleUpdate);
    return () => {
      window.removeEventListener("datastore-update", handleUpdate);
    };
  }, []);

  return (
    <section className="py-16 bg-white min-h-screen">
      <PageBanner title="MD Message" />
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row gap-12 mt-6">
          {/* Photo and Details */}
          <ScrollReveal direction="right" duration={0.8} className="md:w-1/3 flex flex-col items-center">
            <div className="w-full max-w-sm aspect-[4/5] bg-slate-200 rounded-lg overflow-hidden mb-4 shadow-md">
              <img 
                src={md.photo || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop"} 
                alt={md.name} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <p className="font-bold text-slate-900 text-lg">{md.name}</p>
            <p className="text-slate-650">{md.role}</p>
          </ScrollReveal>

          {/* Message Text */}
          <ScrollReveal direction="left" duration={0.8} className="md:w-2/3">
            <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed">
              {md.title && (
                <p className="font-semibold text-slate-800 mb-6 text-xl">{md.title}</p>
              )}
              {md.message.split("\n\n").map((para, i) => (
                <p key={i} className="mb-4">
                  {para}
                </p>
              ))}
              <p className="font-semibold text-slate-900 mt-6">Warm regards,</p>
              <p className="font-semibold text-slate-900">{md.name}</p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

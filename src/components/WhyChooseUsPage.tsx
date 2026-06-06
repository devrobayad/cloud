import React, { useState, useEffect } from "react";
import { CheckCircle, ShieldCheck, Zap, Handshake } from "lucide-react";
import PageBanner from "./PageBanner";
import { dataStore } from "../utils/dataStore";
import ScrollReveal from "./ScrollReveal";

export default function WhyChooseUsPage() {
  const [reasons, setReasons] = useState(() => dataStore.getWhyChooseReasons());

  useEffect(() => {
    const handleUpdate = () => {
      setReasons(dataStore.getWhyChooseReasons());
    };
    window.addEventListener("datastore-update", handleUpdate);
    return () => {
      window.removeEventListener("datastore-update", handleUpdate);
    };
  }, []);

  const icons = [CheckCircle, Zap, ShieldCheck, Handshake];

  return (
    <section className="py-16 bg-white min-h-screen">
      <PageBanner title="Why Choose Us" />

      <div className="max-w-7xl mx-auto px-4 md:px-8">

        <ScrollReveal direction="up" duration={0.6}>
          <h2 className="text-3xl font-bold text-[#1e1b4b] mb-12">Why Choose Cloud Technologies?</h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-8">
           {reasons.map((item, i) => {
             const IconComponent = icons[i % icons.length] || CheckCircle;
             return (
               <ScrollReveal
                 key={i}
                 direction="up"
                 duration={0.6}
                 delay={(i % 2) * 0.1}
                 className="flex h-full"
               >
                 <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 flex gap-6 w-full">
                    <IconComponent className="w-12 h-12 text-indigo-600 flex-shrink-0" />
                    <div>
                       <h4 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h4>
                       <p className="text-slate-600 leading-relaxed">{item.desc}</p>
                    </div>
                 </div>
               </ScrollReveal>
             );
           })}
        </div>
      </div>
    </section>
  );
}

import React, { useState, useEffect } from "react";
import { Target, Lightbulb, Users, Award, ShieldCheck, HeartPulse } from "lucide-react";
import PageBanner from "./PageBanner";
import { dataStore } from "../utils/dataStore";
import ScrollReveal from "./ScrollReveal";

export default function VisionMissionPage() {
  const [vm, setVm] = useState(() => dataStore.getVisionMissionConfig());

  useEffect(() => {
    const handleUpdate = () => {
      setVm(dataStore.getVisionMissionConfig());
    };
    window.addEventListener("datastore-update", handleUpdate);
    return () => {
      window.removeEventListener("datastore-update", handleUpdate);
    };
  }, []);

  return (
    <section className="py-16 bg-white min-h-screen">
      <PageBanner title="Vision & Mission" />
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <ScrollReveal direction="up" duration={0.6}>
          <div className="mb-12 rounded-2xl overflow-hidden shadow-lg border border-slate-100">
             <img src={vm.image || "https://images.unsplash.com/photo-1549692520-acc666993f0e?q=80&w=1200&auto=format&fit=crop"} alt="Vision and Mission" className="w-full h-80 object-cover" referrerPolicy="no-referrer" />
          </div>
        </ScrollReveal>

        <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-10">
          <ScrollReveal direction="up" duration={0.6}>
            <div>
              <h3 className="text-2xl font-bold text-[#1e1b4b] mb-4">{vm.visionTitle}</h3>
              <p>{vm.visionText}</p>
            </div>
          </ScrollReveal>

          <div>
             <ScrollReveal direction="up" duration={0.6}>
               <h3 className="text-2xl font-bold text-[#1e1b4b] mb-6">Our Strengths</h3>
             </ScrollReveal>
             <div className="grid md:grid-cols-3 gap-6">
                {[
                  { icon: Users, title: "Skilled Team", desc: "Our certified professionals bring extensive experience across multiple industries, staying ahead of trends to develop future-proof solutions." },
                  { icon: Award, title: "Client Satisfaction", desc: "We build lasting relationships by understanding our clients' needs and consistently delivering projects on time and within budget." },
                  { icon: Target, title: "Strong Vendor Relationships", desc: "Our partnerships with leading global manufacturers allow us to provide a wide range of products at competitive prices." }
                ].map((item, i) => (
                  <ScrollReveal
                    key={i}
                    direction="up"
                    duration={0.6}
                    delay={i * 0.1}
                    className="flex h-full"
                  >
                    <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 w-full">
                       <item.icon className="w-10 h-10 text-indigo-600 mb-4" />
                       <h4 className="font-bold text-slate-900 mb-2">{item.title}</h4>
                       <p className="text-sm">{item.desc}</p>
                    </div>
                  </ScrollReveal>
                ))}
             </div>
          </div>

          <div>
             <ScrollReveal direction="up" duration={0.6}>
               <h3 className="text-2xl font-bold text-[#1e1b4b] mb-6">Our Core Values</h3>
             </ScrollReveal>
             <div className="grid md:grid-cols-2 gap-6">
                {[
                  { icon: ShieldCheck, title: "Integrity & Respect", desc: "We conduct all business with the highest standards of honesty and respect." },
                  { icon: HeartPulse, title: "Client-Centric", desc: "We prioritize building long-term, trust-based relationships with our clients." },
                  { icon: Lightbulb, title: "Innovation", desc: "We are passionate about delivering forward-thinking solutions through creative techniques." },
                  { icon: Target, title: "Value", desc: "We are committed to providing cost-effective services that maximize return on investment." }
                ].map((item, i) => (
                    <ScrollReveal
                      key={i}
                      direction="up"
                      duration={0.6}
                      delay={(i % 2) * 0.1}
                      className="flex h-full"
                    >
                      <div className="flex gap-4 items-start bg-white p-4 rounded-lg border border-slate-100 shadow-sm w-full">
                         <item.icon className="w-8 h-8 text-indigo-600 flex-shrink-0" />
                         <div>
                           <h4 className="font-bold text-slate-900">{item.title}</h4>
                           <p className="text-sm">{item.desc}</p>
                         </div>
                      </div>
                    </ScrollReveal>
                ))}
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}

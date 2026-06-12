import React, { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { dataStore } from "../utils/dataStore";
import ScrollReveal from "./ScrollReveal";

export default function Solutions() {
  const [solutionsList, setSolutionsList] = useState(() => {
    const raw = dataStore.getSolutions();
    const coreKeys = ["conference", "sound", "cctv", "vas", "access", "telephony", "datacenter", "network"];
    const list: { id: string; title: string; image: string }[] = [];
    
    // Add default core keys in order first if they exist
    coreKeys.forEach(key => {
      if (raw[key]) {
        list.push({
          id: key,
          title: raw[key].title,
          image: raw[key].image
        });
      }
    });

    // Gather sub-service IDs that are default, to determine if a dynamic entry is a core node
    const allDefaultSubIds = [
      "conf-solution", "conf-meeting-room",
      "sound-professional", "sound-ip-pa", "sound-pa",
      "cctv-ip-analog", "cctv-anpr", "cctv-ai", "cctv-vms", "cctv-storage", "cctv-centralized",
      "access-facial", "access-biometric", "access-visitor", "access-barrier", "access-hotel", "access-scanning", "access-parking",
      "telephony-pabx",
      "dcim", "ems", "nms", "server-lan", "storage", "dc-power", "rack-management", "raise-floor", "online-ups", "dehumidifier", "precision-cooling",
      "passive-lan", "fiber-optic",
      "vas-managed", "vas-oncall", "vas-onestop", "vas-payment"
    ];

    // Add any dynamically created or other core services (not a default sub and has no parentId)
    Object.keys(raw).forEach(key => {
      if (!coreKeys.includes(key) && !allDefaultSubIds.includes(key) && !raw[key].parentId) {
        list.push({
          id: key,
          title: raw[key].title,
          image: raw[key].image
        });
      }
    });

    return list;
  });

  useEffect(() => {
    const handleUpdate = () => {
      const raw = dataStore.getSolutions();
      const coreKeys = ["conference", "sound", "cctv", "vas", "access", "telephony", "datacenter", "network"];
      const list: { id: string; title: string; image: string }[] = [];
      
      coreKeys.forEach(key => {
        if (raw[key]) {
          list.push({
            id: key,
            title: raw[key].title,
            image: raw[key].image
          });
        }
      });

      const allDefaultSubIds = [
        "conf-solution", "conf-meeting-room",
        "sound-professional", "sound-ip-pa", "sound-pa",
        "cctv-ip-analog", "cctv-anpr", "cctv-ai", "cctv-vms", "cctv-storage", "cctv-centralized",
        "access-facial", "access-biometric", "access-visitor", "access-barrier", "access-hotel", "access-scanning", "access-parking",
        "telephony-pabx",
        "dcim", "ems", "nms", "server-lan", "storage", "dc-power", "rack-management", "raise-floor", "online-ups", "dehumidifier", "precision-cooling",
        "passive-lan", "fiber-optic",
        "vas-managed", "vas-oncall", "vas-onestop", "vas-payment"
      ];

      Object.keys(raw).forEach(key => {
        if (!coreKeys.includes(key) && !allDefaultSubIds.includes(key) && !raw[key].parentId) {
          list.push({
            id: key,
            title: raw[key].title,
            image: raw[key].image
          });
        }
      });

      setSolutionsList(list);
    };

    window.addEventListener("datastore-update", handleUpdate);
    return () => window.removeEventListener("datastore-update", handleUpdate);
  }, []);

  return (
    <section id="solutions" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Section Header */}
        <ScrollReveal direction="up" duration={0.6}>
          <div className="text-center flex flex-col items-center gap-3 mb-16">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse" />
              <span className="text-indigo-600 font-extrabold uppercase tracking-widest text-[11px] font-sans">
                Our Solutions
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#111827] tracking-tight">
              Our Services and Solutions
            </h2>
            <div className="w-12 h-1 bg-indigo-600 rounded mt-1" />
          </div>
        </ScrollReveal>

        {/* Dynamic Solutions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {solutionsList.map((item, index) => {
            return (
              <ScrollReveal 
                key={item.id}
                direction="up" 
                duration={0.6} 
                delay={(index % 3) * 0.1} // Stagger delay in columns
                className="flex flex-col h-full"
              >
                <div 
                  id={item.id}
                  onClick={() => { 
                    window.location.hash = "#" + item.id;
                  }}
                  className="group h-full flex flex-col bg-[#ffffff] rounded-2xl overflow-hidden shadow-md hover:shadow-xl border border-slate-100 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
                >
                  {/* Image Section */}
                  <div className="relative h-48 overflow-hidden bg-slate-100">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Content Section */}
                  <div className="p-6 flex flex-col justify-between flex-grow">
                    <div className="flex flex-col gap-2">
                      <h3 className="text-slate-900 font-extrabold text-base md:text-lg leading-snug tracking-tight group-hover:text-indigo-600 transition-colors">
                        {item.title}
                      </h3>
                    </div>
                    
                    {/* Discover Link */}
                    <div className="flex items-center gap-1.5 text-indigo-600 font-bold text-xs mt-4 group-hover:text-indigo-700 transition-colors">
                      <span>Discover More</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
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

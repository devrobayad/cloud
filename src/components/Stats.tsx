import React, { useState, useEffect } from "react";
import { Award, Briefcase, Cpu, Earth, HelpCircle } from "lucide-react";
import { dataStore, StatItem } from "../utils/dataStore";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Award,
  Briefcase,
  Cpu,
  Earth
};

const colorGlows = [
  "from-blue-600/10 to-indigo-600/10 border-blue-500/20",
  "from-emerald-600/10 to-teal-600/10 border-emerald-500/20",
  "from-purple-600/10 to-indigo-600/10 border-purple-500/20",
  "from-amber-600/10 to-red-600/10 border-amber-500/20"
];

export default function Stats() {
  const [stats, setStats] = useState<StatItem[]>(() => dataStore.getDisplayStats());

  useEffect(() => {
    const handleUpdate = () => {
      setStats(dataStore.getDisplayStats());
    };
    window.addEventListener("datastore-update", handleUpdate);
    return () => window.removeEventListener("datastore-update", handleUpdate);
  }, []);

  if (!stats || stats.length === 0) return null;

  return (
    <section className="bg-[#0b0f19] py-12 border-y border-slate-800">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => {
            const IconComponent = iconMap[stat.iconName] || HelpCircle;
            const glowClass = colorGlows[idx % colorGlows.length];
            
            return (
              <div
                key={stat.id || idx}
                className="relative bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-4 hover:border-indigo-500/40 transition-colors group select-none overflow-hidden"
              >
                {/* Background Glow */}
                <div className="absolute -top-10 -right-10 w-24 h-24 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 blur-xl group-hover:scale-150 transition-transform duration-500 rounded-full" />
                
                {/* Icon Wrapper */}
                <div className="bg-slate-800 p-3 rounded-xl text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                  <IconComponent className="w-5 h-5" />
                </div>

                {/* Numbers & Texts */}
                <div className="flex flex-col text-center md:text-left">
                  <span className="text-2xl md:text-3.5xl font-extrabold text-white tracking-tight leading-none">
                    {stat.value}
                  </span>
                  <span className="text-slate-200 font-bold text-xs mt-1">
                    {stat.label}
                  </span>
                  <span className="text-slate-500 text-[10px] leading-relaxed mt-0.5">
                    {stat.sub}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

import React from "react";
import { Landmark } from "lucide-react";
import { DBClient } from "../utils/dataStore";

export default function ClientLogoRenderer({ client }: { client: DBClient }) {
  const { logoStyle, logoText, category, logoUrl } = client;

  // Custom base64 image logo check
  if (logoUrl) {
    return (
      <div className="flex flex-col items-center justify-center text-center p-1 select-none pointer-events-none">
        <img 
          src={logoUrl} 
          alt={client.name || "Client Logo"} 
          referrerPolicy="no-referrer"
          className="max-h-20 max-w-[150px] object-contain rounded-md select-none" 
        />
      </div>
    );
  }

  // Custom presets for premium default clients
  if (logoStyle === "baywatch") {
    return (
      <div className="flex flex-col items-center gap-1 text-center select-none">
        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-extrabold text-[10px]">BW</div>
        <span className="font-extrabold text-blue-900 text-[10.5px] uppercase tracking-tighter">{logoText || "BAYWATCH"}</span>
      </div>
    );
  }

  if (logoStyle === "greengold") {
    return (
      <div className="flex items-center gap-1 select-none">
        <div className="w-5 h-5 bg-emerald-600 rounded-full flex items-center justify-center text-white text-[9px] font-black">GG</div>
        <span className="font-black text-emerald-800 text-[10px] uppercase">{logoText || "GREEN GOLD"}</span>
      </div>
    );
  }

  if (logoStyle === "farazy") {
    return (
      <div className="flex items-center gap-1.5 bg-emerald-50 px-2 py-1 rounded-full border border-emerald-100 select-none">
        <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold font-sans">+</div>
        <div className="flex flex-col text-left">
          <span className="font-black text-emerald-950 text-[9.5px] leading-none uppercase">{logoText || "FARAZY"}</span>
          <span className="text-[6.5px] text-slate-400 font-bold tracking-widest leading-none">HOSPITAL</span>
        </div>
      </div>
    );
  }

  if (logoStyle === "hbl") {
    return (
      <div className="flex flex-col items-center select-none">
        <span className="font-black text-emerald-700 text-lg tracking-widest">{logoText || "HBL"}</span>
        <span className="text-[6px] text-slate-400 font-extrabold uppercase tracking-wide">Habib Bank</span>
      </div>
    );
  }

  if (logoStyle === "citizens") {
    return (
      <div className="flex flex-col items-center gap-0.5 select-none">
        <div className="flex gap-0.5">
          <span className="w-1.5 h-1.5 bg-amber-500 rounded animate-none" />
          <span className="w-1.5 h-1.5 bg-cyan-700 rounded-full animate-none" />
        </div>
        <span className="font-black text-slate-900 text-[10px] tracking-tight uppercase">{logoText || "CITIZENS BANK"}</span>
      </div>
    );
  }

  if (logoStyle === "gov") {
    return (
      <div className="flex items-center gap-1 text-left select-none">
        <div className="w-7 h-7 rounded-full bg-red-100 flex items-center justify-center text-red-600">
          <Landmark className="w-3.5 h-3.5" />
        </div>
        <div className="flex flex-col">
          <span className="font-black text-slate-805 text-[8.5px] leading-tight-none">{logoText || "MINISTRY OF WOMEN"}</span>
          <span className="text-[6px] text-red-650 font-extrabold tracking-widest">GOVERNMENT DEPT</span>
        </div>
      </div>
    );
  }

  if (logoStyle === "ambala") {
    return (
      <div className="flex flex-col items-center select-none">
        <span className="font-extrabold text-red-605 text-sm tracking-tighter">{logoText || "ambala"}</span>
        <span className="text-[6px] bg-red-600 text-white px-1 font-bold rounded-sm tracking-widest uppercase">foundation</span>
      </div>
    );
  }

  if (logoStyle === "buro") {
    return (
      <div className="flex items-center gap-1 bg-sky-50 px-2 py-1 rounded-lg select-none">
        <span className="font-black text-sky-800 text-xs">{logoText || "BURO"}</span>
        <span className="text-[7px] text-slate-400 font-bold uppercase">Bangladesh</span>
      </div>
    );
  }

  if (logoStyle === "dun") {
    return (
      <div className="flex flex-col items-center select-none">
        <span className="font-extrabold text-blue-900 text-xs italic tracking-tighter font-serif">{logoText || "dun & bradstreet"}</span>
      </div>
    );
  }

  if (logoStyle === "abc") {
    return (
      <div className="flex items-center gap-1.5 select-none">
        <div className="w-5 h-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[9px] font-black rounded flex items-center justify-center">ABC</div>
        <span className="font-bold text-slate-800 text-xs tracking-wider">{logoText || "ABC Corp"}</span>
      </div>
    );
  }

  if (logoStyle === "solaiman") {
    return (
      <div className="flex flex-col items-center select-none">
        <span className="font-black text-emerald-800 text-xs tracking-widest uppercase">{logoText || "SOLAIMAN"}</span>
        <span className="text-[6px] text-slate-400 font-bold tracking-widest">GROUP</span>
      </div>
    );
  }

  if (logoStyle === "anwar") {
    return (
      <div className="flex flex-col items-center border border-red-200 bg-red-50/50 px-2 py-1 rounded-md select-none">
        <span className="font-extrabold text-red-700 text-xs tracking-tight uppercase">{logoText || "ANWAR"}</span>
        <span className="text-[6px] text-slate-400 font-bold tracking-widest leading-none">GROUP</span>
      </div>
    );
  }

  // Dynamic fallback style presets for custom user clients
  const presetColors: Record<string, string> = {
    blue: "bg-blue-50 text-blue-700 border-blue-200",
    green: "bg-emerald-50 text-emerald-700 border-emerald-200",
    red: "bg-red-50 text-red-700 border-red-200",
    indigo: "bg-indigo-50 text-indigo-700 border-indigo-200",
    amber: "bg-amber-50 text-amber-700 border-amber-200",
    purple: "bg-purple-50 text-purple-700 border-purple-200",
    rose: "bg-rose-50 text-rose-700 border-rose-200",
    teal: "bg-teal-50 text-teal-700 border-teal-200",
  };

  const styleClass = presetColors[logoStyle] || "bg-slate-50 text-indigo-700 border-slate-200";
  const initials = logoText ? logoText.split(" ").map(w => w[0]).join("").substring(0, 3).toUpperCase() : client.name.substring(0, 2).toUpperCase();

  return (
    <div className={`flex flex-col items-center justify-center text-center p-2 select-none pointer-events-none`}>
      <div className={`w-9 h-9 rounded-full ${styleClass} border flex items-center justify-center font-black text-xs select-none shadow-sm mb-1`}>
        {initials}
      </div>
      <span className="font-extrabold text-[#1f2937] text-[11px] uppercase tracking-tight truncate max-w-[120px]">{logoText || client.name}</span>
      <span className="text-[7px] font-bold text-slate-450 uppercase truncate max-w-[124px] tracking-wide mt-0.5">{category || "Valued Client"}</span>
    </div>
  );
}

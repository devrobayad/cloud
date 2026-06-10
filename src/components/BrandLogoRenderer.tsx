import React from "react";
import { DBBrand } from "../utils/dataStore";

export default function BrandLogoRenderer({ brand }: { brand: DBBrand }) {
  const { logoStyle, logoText, sub, logoUrl } = brand;

  // Custom base64 image logo check
  if (logoUrl) {
    return (
      <div className="flex flex-col items-center justify-center text-center p-1 select-none pointer-events-none">
        <img 
          src={logoUrl} 
          alt={brand.name || "Brand Logo"} 
          referrerPolicy="no-referrer"
          className="max-h-20 max-w-[150px] object-contain rounded-md select-none" 
        />
      </div>
    );
  }

  if (logoStyle === "cisco") {
    return (
      <div className="flex flex-col items-center gap-1.5 select-none">
        <div className="flex gap-0.5 items-end h-5">
          {[3, 5, 8, 5, 8, 12, 8, 5, 8, 5, 3].map((h, i) => (
            <span key={i} className="w-0.5 bg-sky-500 rounded-full" style={{ height: `${h}px` }} />
          ))}
        </div>
        <span className="font-extrabold text-slate-800 text-xs tracking-wider">{logoText || "CISCO"}</span>
      </div>
    );
  }

  if (logoStyle === "dell") {
    return (
      <div className="flex items-center justify-center border-2 border-blue-600 rounded-full w-12 h-12 select-none">
        <span className="font-black text-blue-600 text-[10px] tracking-tight transform -rotate-12">{logoText || "DELL"}</span>
      </div>
    );
  }

  if (logoStyle === "ruijie") {
    return (
      <div className="flex items-center gap-1 select-none">
        <div className="w-5 h-5 bg-red-600 rounded-md flex items-center justify-center text-white font-extrabold text-[10px]">R</div>
        <span className="font-extrabold text-slate-800 text-xs italic tracking-tight">{logoText || "Reyee"}</span>
      </div>
    );
  }

  if (logoStyle === "fortinet") {
    return (
      <div className="flex flex-col items-center select-none">
        <span className="font-black text-red-600 text-[10px] tracking-wider">{logoText || "FORTINET."}</span>
        <span className="text-[6px] text-slate-400 uppercase tracking-widest font-bold">Enterprise Security</span>
      </div>
    );
  }

  if (logoStyle === "witek") {
    return (
      <div className="flex items-center gap-1 select-none">
        <span className="font-extrabold text-slate-800 text-xs">WI-</span>
        <span className="bg-cyan-500 text-white px-1.5 py-0.5 rounded font-black text-[9px]">TEK</span>
      </div>
    );
  }

  if (logoStyle === "rosenberger") {
    return (
      <div className="flex flex-col items-center select-none">
        <span className="font-bold text-amber-600 text-[10px] tracking-widest">{logoText || "Rosenberger"}</span>
        <span className="text-[7px] text-slate-400 font-semibold uppercase">Optical Solutions</span>
      </div>
    );
  }

  if (logoStyle === "allied") {
    return (
      <div className="flex items-center gap-1 select-none">
        <span className="font-extrabold text-teal-600 text-xs leading-none">{logoText || "Allied Telesis"}</span>
      </div>
    );
  }

  if (logoStyle === "vivanco") {
    return (
      <div className="flex flex-col items-center select-none">
        <span className="font-bold text-indigo-900 text-xs tracking-widest uppercase">{logoText || "VIVANCO"}</span>
        <span className="text-[6px] text-slate-400 font-semibold tracking-widest">GERMANY</span>
      </div>
    );
  }

  if (logoStyle === "mikrotik") {
    return (
      <div className="flex items-center gap-1 select-none">
        <div className="flex flex-col gap-0.5">
          <span className="w-4 h-1 bg-red-600 rounded-sm" />
          <span className="w-4 h-1 bg-slate-800 rounded-sm" />
        </div>
        <span className="font-extrabold text-slate-800 text-xs">{logoText || "MikroTik"}</span>
      </div>
    );
  }

  if (logoStyle === "bdcom") {
    return (
      <div className="flex items-center gap-1 select-none">
        <span className="font-black text-sky-600 text-xs italic tracking-wider">{logoText || "BDCOM"}</span>
      </div>
    );
  }

  if (logoStyle === "netgear") {
    return (
      <div className="flex flex-col items-center select-none">
        <span className="font-extrabold text-slate-950 text-xs tracking-widest">{logoText || "NETGEAR"}</span>
        <span className="text-[6px] text-indigo-600 font-bold uppercase tracking-widest">Solutions</span>
      </div>
    );
  }

  if (logoStyle === "grandstream") {
    return (
      <div className="flex items-center gap-1 select-none">
        <div className="flex flex-col gap-0.5 justify-center">
          <span className="w-1.5 h-1.5 bg-blue-500 rounded-sm" />
          <span className="w-1.5 h-1.5 bg-blue-700 rounded-sm" />
        </div>
        <span className="font-black text-blue-900 text-[10px] tracking-tight">{logoText || "GRANDSTREAM"}</span>
      </div>
    );
  }

  if (logoStyle === "ubiquiti") {
    return (
      <div className="flex items-center gap-1.5 select-none">
        <div className="w-5 h-5 rounded-full border-2 border-cyan-500 flex items-center justify-center">
          <span className="w-2.5 h-2.5 bg-cyan-500 rounded-full" />
        </div>
        <span className="font-extrabold text-slate-900 text-xs">{logoText || "UBIQUITI"}</span>
      </div>
    );
  }

  if (logoStyle === "hikvision") {
    return (
      <div className="flex items-center gap-0.5 select-none">
        <span className="font-extrabold text-red-600 text-xs tracking-tight">HIK</span>
        <span className="font-extrabold text-slate-800 text-xs tracking-tight">VISION</span>
      </div>
    );
  }

  if (logoStyle === "dahua") {
    return (
      <div className="flex items-center gap-1 select-none">
        <span className="font-black text-slate-900 text-xs uppercase leading-none">{logoText || "dahua"}</span>
        <span className="text-red-600 font-extrabold text-xs">technology</span>
      </div>
    );
  }

  if (logoStyle === "tiandy") {
    return (
      <div className="flex items-center gap-1 select-none">
        <span className="font-extrabold text-emerald-600 text-xs">{logoText || "Tiandy"}</span>
        <span className="text-[6px] bg-slate-900 text-white px-1 rounded-sm uppercase font-bold">IP</span>
      </div>
    );
  }

  if (logoStyle === "lenovo") {
    return (
      <div className="bg-red-600 text-white px-2.5 py-1 text-xs font-black tracking-tight rounded-sm select-none">
        {logoText || "lenovo"}
      </div>
    );
  }

  if (logoStyle === "bosch") {
    return (
      <div className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded select-none">
        <div className="w-4.5 h-4.5 rounded-full border border-slate-600 flex items-center justify-center">
          <span className="w-1.5 h-1.5 bg-red-600 rounded-full" />
        </div>
        <span className="font-extrabold text-slate-900 text-xs tracking-widest">{logoText || "BOSCH"}</span>
      </div>
    );
  }

  // Fallback text colors mapping
  const textColors: Record<string, string> = {
    sky: "text-sky-600",
    blue: "text-blue-600",
    red: "text-red-600",
    cyan: "text-cyan-600",
    amber: "text-amber-600",
    teal: "text-teal-600",
    indigo: "text-indigo-600",
    slate: "text-slate-800",
    emerald: "text-emerald-700",
  };

  const selectedTextColor = textColors[logoStyle] || "text-indigo-600";
  const initials = logoText ? logoText.substring(0, 10) : brand.name;

  return (
    <div className="flex flex-col items-center justify-center text-center p-1 select-none pointer-events-none">
      <span className={`font-black text-xs tracking-widest uppercase ${selectedTextColor}`}>
        {initials}
      </span>
      <span className="text-[7px] text-slate-400 font-extrabold uppercase tracking-widest mt-0.5">{sub || "Technology partner"}</span>
    </div>
  );
}

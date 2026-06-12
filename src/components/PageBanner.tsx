import React from "react";

interface PageBannerProps {
  title: string;
}

export default function PageBanner({ title }: PageBannerProps) {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 mb-10 mt-2 select-none">
      <div className="bg-[#2E6FA8] py-11 rounded-2xl border border-indigo-950/20 flex items-center justify-center shadow-sm">
        <h1 className="text-2xl md:text-3xl lg:text-[2.2rem] font-extrabold text-white text-center tracking-wider font-sans uppercase">
          {title}
        </h1>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import { dataStore, DBBrand } from "../utils/dataStore";
import BrandLogoRenderer from "./BrandLogoRenderer";
import ScrollReveal from "./ScrollReveal";

export default function Brands() {
  const [showAll, setShowAll] = useState(false);
  const [brands, setBrands] = useState<DBBrand[]>(() => dataStore.getBrands());

  useEffect(() => {
    const handleUpdate = () => {
      setBrands(dataStore.getBrands());
    };
    window.addEventListener("datastore-update", handleUpdate);
    return () => {
      window.removeEventListener("datastore-update", handleUpdate);
    };
  }, []);

  const visibleBrands = showAll ? brands : brands.slice(0, 12);

  return (
    <section id="brands" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Section Title */}
        <ScrollReveal direction="up" duration={0.6}>
          <div className="text-center flex flex-col items-center gap-3 mb-12">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse" />
              <span className="text-indigo-600 font-extrabold uppercase tracking-widest text-[11px] font-sans">
                Our Partners
              </span>
            </div>
            <h2 className="text-3xl font-extrabold text-[#111827] tracking-tight">
              Our Brands
            </h2>
            <div className="w-12 h-1 bg-indigo-600 rounded mt-1" />
          </div>
        </ScrollReveal>

        {/* Brand Grid Container */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {visibleBrands.map((brand, index) => {
            const hasCustomLink = brand.link && brand.link !== "#" && brand.link !== "";
            const LinkTag = hasCustomLink ? "a" : "div";
            return (
              <ScrollReveal
                key={brand.id}
                direction="up"
                duration={0.5}
                delay={(index % 6) * 0.08}
              >
                <LinkTag
                  {...(hasCustomLink ? {
                    href: brand.link,
                    target: "_blank",
                    rel: "noopener noreferrer"
                  } : {})}
                  className={`flex flex-col items-center justify-center p-6 h-[110px] bg-white border rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group select-none overflow-hidden ${brand.color}`}
                >
                  {/* SVG Logo Container */}
                  <div className="flex items-center justify-center transition-transform duration-300 group-hover:scale-115">
                    <BrandLogoRenderer brand={brand} />
                  </div>
                </LinkTag>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Buttons to See All */}
        <div className="flex justify-center mt-10">
          <ScrollReveal direction="up" duration={0.6} delay={0.1}>
            <button
               onClick={() => {
                 window.location.hash = "#brands";
               }}
              className="px-6 py-3 bg-[#2E6FA8] hover:bg-[#243D7A] text-white text-xs font-bold rounded-lg shadow-md transition-all cursor-pointer flex items-center gap-2"
            >
              See All Brands
            </button>
          </ScrollReveal>
        </div>

      </div>
    </section>
  );
}

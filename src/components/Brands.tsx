import React, { useState, useEffect } from "react";
import { dataStore, DBBrand } from "../utils/dataStore";
import BrandLogoRenderer from "./BrandLogoRenderer";

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

        {/* Brand Grid Container */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {visibleBrands.map((brand) => {
            const hasCustomLink = brand.link && brand.link !== "#" && brand.link !== "";
            const LinkTag = hasCustomLink ? "a" : "div";
            return (
              <LinkTag
                key={brand.id}
                {...(hasCustomLink ? {
                  href: brand.link,
                  target: "_blank",
                  rel: "noopener noreferrer"
                } : {})}
                className={`flex flex-col items-center justify-center p-6 h-36 bg-white border rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-[1.02] cursor-pointer group select-none ${brand.color}`}
              >
                {/* SVG Logo Container */}
                <div className="h-16 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                  <BrandLogoRenderer brand={brand} />
                </div>
              </LinkTag>
            );
          })}
        </div>

        {/* Buttons to See All */}
        {brands.length > 12 && (
          <div className="flex justify-center mt-10">
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-6 py-3 bg-[#4F46E5] hover:bg-slate-900 text-white text-xs font-bold rounded-lg shadow-md transition-all cursor-pointer flex items-center gap-2"
            >
              {showAll ? "Show Less" : "See All Brands"}
            </button>
          </div>
        )}

      </div>
    </section>
  );
}

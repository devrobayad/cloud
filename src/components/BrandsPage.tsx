import React, { useState, useEffect } from "react";
import PageBanner from "./PageBanner";
import { dataStore, DBBrand } from "../utils/dataStore";
import BrandLogoRenderer from "./BrandLogoRenderer";
import ScrollReveal from "./ScrollReveal";

export default function BrandsPage() {
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

  return (
    <section className="py-16 bg-slate-50 min-h-screen">
      <PageBanner title="Our Brands" />
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Section Header */}
        <ScrollReveal direction="up" duration={0.6}>
          <div className="text-center flex flex-col items-center gap-4 mb-16">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
              <span className="text-indigo-600 font-extrabold uppercase tracking-widest text-xs font-sans">
                Global Partnerships
              </span>
            </div>
            <p className="text-slate-600 max-w-2xl text-base mt-2">
              We collaborate with world-class technology manufacturers to deliver reliable, enterprise-grade solutions to our clients.
            </p>
            <div className="w-20 h-1 bg-indigo-600 rounded mt-4" />
          </div>
        </ScrollReveal>

        {/* Brand Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {brands.map((brand, index) => {
            const hasCustomLink = brand.link && brand.link !== "#" && brand.link !== "";
            const LinkTag = hasCustomLink ? "a" : "div";
            return (
              <ScrollReveal
                key={brand.id}
                direction="up"
                duration={0.6}
                delay={(index % 6) * 0.08}
                className="flex h-full"
              >
                <LinkTag
                  {...(hasCustomLink ? {
                    href: brand.link,
                    target: "_blank",
                    rel: "noopener noreferrer"
                  } : {})}
                  className={`flex flex-col items-center justify-center p-6 bg-white border border-slate-200/60 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer w-full text-center overflow-hidden h-[150px] ${brand.color}`}
                >
                  <div className="w-full flex items-center justify-center transition-transform duration-300 group-hover:scale-115 select-none">
                    <BrandLogoRenderer brand={brand} />
                  </div>
                </LinkTag>
              </ScrollReveal>
            );
          })}
        </div>

      </div>
    </section>
  );
}

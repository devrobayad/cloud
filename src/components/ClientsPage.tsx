import React, { useState, useEffect } from "react";
import PageBanner from "./PageBanner";
import { dataStore, DBClient } from "../utils/dataStore";
import ClientLogoRenderer from "./ClientLogoRenderer";
import ScrollReveal from "./ScrollReveal";

export default function ClientsPage() {
  const [clients, setClients] = useState<DBClient[]>(() => dataStore.getClients());

  useEffect(() => {
    const handleUpdate = () => {
      setClients(dataStore.getClients());
    };
    window.addEventListener("datastore-update", handleUpdate);
    return () => {
      window.removeEventListener("datastore-update", handleUpdate);
    };
  }, []);

  return (
    <section className="py-16 bg-slate-50 min-h-screen">
      <PageBanner title="Our Clients" />
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Section Header */}
        <ScrollReveal direction="up" duration={0.6}>
          <div className="text-center flex flex-col items-center gap-4 mb-16">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
              <span className="text-indigo-600 font-extrabold uppercase tracking-widest text-xs font-sans">
                Our Trusted Partners
              </span>
            </div>
            <p className="text-slate-600 max-w-2xl text-base mt-2">
              We are honored to serve a diverse portfolio of organizations, from government bodies to multinational corporations, delivering enterprise-grade solutions.
            </p>
            <div className="w-20 h-1 bg-indigo-600 rounded mt-4" />
          </div>
        </ScrollReveal>

        {/* Clients Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {clients.map((client, index) => {
            const hasCustomLink = client.link && client.link !== "#";
            const LinkTag = hasCustomLink ? "a" : "div";
            return (
              <ScrollReveal
                key={client.id}
                direction="up"
                duration={0.6}
                delay={(index % 4) * 0.08}
                className="flex h-full"
              >
                <LinkTag
                  {...(hasCustomLink ? {
                    href: client.link,
                    target: "_blank",
                    rel: "noopener noreferrer"
                  } : {})}
                  className="flex flex-col items-center justify-center p-6 bg-white border border-slate-200/60 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer w-full text-center overflow-hidden h-[150px]"
                >
                  <div className="w-full flex items-center justify-center transition-transform duration-300 group-hover:scale-115 select-none">
                    <ClientLogoRenderer client={client} />
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

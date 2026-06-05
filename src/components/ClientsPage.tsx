import React, { useState, useEffect } from "react";
import PageBanner from "./PageBanner";
import { dataStore, DBClient } from "../utils/dataStore";
import ClientLogoRenderer from "./ClientLogoRenderer";

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

        {/* Clients Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {clients.map((client) => {
            const hasCustomLink = client.link && client.link !== "#";
            const LinkTag = hasCustomLink ? "a" : "div";
            return (
              <LinkTag
                key={client.id}
                {...(hasCustomLink ? {
                  href: client.link,
                  target: "_blank",
                  rel: "noopener noreferrer"
                } : {})}
                className="flex flex-col items-center justify-between p-8 bg-white border border-slate-200/60 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer"
              >
                <div className="min-h-20 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                  <ClientLogoRenderer client={client} />
                </div>
                <div className="mt-6 text-center select-none">
                  <h3 className="font-bold text-slate-900 text-sm">{client.name}</h3>
                  <p className="text-indigo-600 text-[10px] font-extrabold uppercase tracking-widest mt-1">{client.category}</p>
                </div>
              </LinkTag>
            );
          })}
        </div>

      </div>
    </section>
  );
}

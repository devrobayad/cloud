import React, { useState, useEffect } from "react";
import PageBanner from "./PageBanner";
import { dataStore } from "../utils/dataStore";

export default function ManagementInfoPage() {
  const [members, setMembers] = useState(() => dataStore.getTeamMembers());

  useEffect(() => {
    const handleUpdate = () => {
      setMembers(dataStore.getTeamMembers());
    };
    window.addEventListener("datastore-update", handleUpdate);
    return () => {
      window.removeEventListener("datastore-update", handleUpdate);
    };
  }, []);

  return (
    <section className="py-16 bg-slate-50 min-h-screen">
      <PageBanner title="Management" />
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="space-y-8">
          {members.map((member, index) => (
            <div key={member.name} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row items-center gap-8">
              <div className={`w-40 h-40 flex-shrink-0 rounded-full overflow-hidden border-4 border-slate-100 ${index % 2 !== 0 ? 'md:order-last' : ''}`}>
                <img src={member.image} alt={member.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[#1e1b4b] mb-1">{member.name}</h3>
                <p className="text-indigo-600 font-bold mb-4">{member.role}</p>
                <p className="text-slate-600 leading-relaxed">{member.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

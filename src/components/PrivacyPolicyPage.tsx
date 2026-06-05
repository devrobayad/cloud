import React, { useState, useEffect } from "react";
import { Shield, Eye, Lock, FileText, CheckCircle2, UserCheck, RefreshCw } from "lucide-react";
import PageBanner from "./PageBanner";
import { dataStore } from "../utils/dataStore";

export default function PrivacyPolicyPage() {
  const [contact, setContact] = useState(() => dataStore.getContactInfo());

  useEffect(() => {
    const handleUpdate = () => {
      setContact(dataStore.getContactInfo());
    };
    window.addEventListener("datastore-update", handleUpdate);
    return () => {
      window.removeEventListener("datastore-update", handleUpdate);
    };
  }, []);

  const sections = [
    {
      icon: Eye,
      title: "1. Information We Collect",
      content: "We collect information necessary to provide top-tier enterprise IT and system integration services. This includes contact details (name, corporate email, phone number, address) provided during general business inquiries, project deployment contracts, service requests, and career applications."
    },
    {
      icon: Lock,
      title: "2. How We Protect Your Data",
      content: "Security is at the heart of our operations. We implement appropriate physical, technical, and administrative safeguards to protect your personal and corporate information from unauthorized access, loss, destruction, alteration, or disclosure."
    },
    {
      icon: FileText,
      title: "3. Use of Information",
      content: "We utilize collected data to process your engineering orders, coordinate on-site system integration, communicate critical network alerts, provide SLA support, personalize your portal experiences, and fulfill legal compliance parameters."
    },
    {
      icon: UserCheck,
      title: "4. Sharing & Disclosure",
      content: "Cloud Technologies does not sell or rent our client or visitor databases to third-party brokers. We only share information with certified sub-contractors, system vendors (e.g., Cisco, Hikvision, Dahua) when strictly required to initialize product warranties or resolve complex technical SLA support tickets."
    },
    {
      icon: RefreshCw,
      title: "5. Retention and Policy Updates",
      content: "We retain your data as long as necessary to fulfill business contracts or legal record-keeping obligations. This Privacy Policy is reviewed annually and updated to align with global security frameworks and Local Cyber Security Acts of Bangladesh."
    }
  ];

  return (
    <section className="py-16 bg-white min-h-screen">
      <PageBanner title="Privacy Policy" />
      <div className="max-w-5xl mx-auto px-4 md:px-8">

        {/* Intro */}
        <div className="border bg-slate-50 border-slate-100 rounded-2xl p-8 mb-12 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-indigo-100 text-indigo-700 p-2.5 rounded-xl">
              <Shield className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-[#1e1b4b]">Our Dedication to Privacy</h2>
          </div>
          <p className="text-slate-650 text-sm md:text-base leading-relaxed">
            At <strong>Cloud Technologies</strong>, we value the trust you place in our brand when choosing us to secure and connect your business. This Privacy Policy outlines the types of information we collect, how we safely store and handle it, and the rigorous steps we take to protect your data across our physical and digital services.
          </p>
          <div className="mt-4 pt-4 border-t border-slate-200/60 flex flex-wrap gap-4 text-xs font-semibold text-slate-500">
            <span>Effective Date: June 1, 2026</span>
            <span>•</span>
            <span>Last Updated: June 4, 2026</span>
            <span>•</span>
            <span>Compliance: ISO 27001 Oriented</span>
          </div>
        </div>

        {/* Breakdown of Policies */}
        <div className="space-y-8 mb-12">
          {sections.map((section, index) => (
            <div key={index} className="bg-white border hover:border-slate-200 border-slate-100 rounded-xl p-6 md:p-8 transition-colors shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <span className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                  <section.icon className="w-5 h-5" />
                </span>
                <h3 className="font-extrabold text-slate-900 text-lg">{section.title}</h3>
              </div>
              <p className="text-slate-600 text-sm md:text-base leading-relaxed pl-1">
                {section.content}
              </p>
            </div>
          ))}
        </div>

        {/* Contact info support */}
        <div className="bg-indigo-50/50 border border-indigo-100 rounded-2xl p-6 md:p-8 text-center max-w-xl mx-auto">
          <h4 className="font-extrabold text-slate-900 text-base mb-2">Have Questions About Your Data?</h4>
          <p className="text-slate-600 text-xs leading-relaxed mb-4">
            For data access requests, deletion requests, or general security audit inquiries, please contact our Information Security Officer directly.
          </p>
          <div className="text-xs font-bold text-indigo-900">
            Email: <a href={`mailto:${contact.email}`} className="underline hover:text-indigo-700">{contact.email}</a>
          </div>
        </div>
      </div>
    </section>
  );
}

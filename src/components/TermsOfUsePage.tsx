import React, { useState, useEffect } from "react";
import { Scale, CheckCircle2, AlertTriangle, Play, HelpCircle, FileText, Settings, Hammer } from "lucide-react";
import PageBanner from "./PageBanner";
import { dataStore } from "../utils/dataStore";

export default function TermsOfUsePage() {
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

  const guidelines = [
    {
      title: "1. Acceptance of Terms",
      desc: "By accessing and using this portal or subscribing to our network, server hosting, hardware setup, security installations, and support packages, you fully accept and agree to comply with these terms.",
      icon: Scale
    },
    {
      title: "2. Scope of Services",
      desc: "Cloud Technologies supplies premium physical-logical enterprise infrastructure integration. Final performance rates rely on client hardware compatibility and specified SLA tier contracts.",
      icon: Settings
    },
    {
      title: "3. Proper Allocation & Use",
      desc: "Clients are prohibited from utilizing our servers, cameras, or network pipelines for illegitimate data harvesting, piracy, unauthorized interception, or violating active cyber regulatory rules.",
      icon: AlertTriangle
    },
    {
      title: "4. Intellectual Property Rights",
      desc: "All source programs, software code, custom layout engineering templates, CAD drawings, designs, and content published by our team remain the intellectual property of Cloud Technologies.",
      icon: FileText
    },
    {
      title: "5. Limitation of Liability",
      desc: "While we specialize in 99.99% uptime, we are not liable for transient network dropouts caused by third-party ISPs, force majeure climate disruptions, or physical client misconfigurations.",
      icon: Hammer
    }
  ];

  return (
    <section className="py-16 bg-white min-h-screen">
      <PageBanner title="Terms Of Use" />
      <div className="max-w-5xl mx-auto px-4 md:px-8">

        {/* Intro */}
        <div className="border bg-slate-50 border-slate-100 rounded-2xl p-8 mb-12 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-indigo-100 text-indigo-700 p-2.5 rounded-xl">
              <Scale className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-[#1e1b4b]">General Agreement</h2>
          </div>
          <p className="text-slate-650 text-sm md:text-base leading-relaxed">
            Welcome to the digital portal of <strong>Cloud Technologies</strong>. By accessing our platform, reviewing our technical resources, ordering hardware components, or using our ongoing IT and active SLA services, you signify your compliance with these comprehensive Terms of Use. Please review them carefully before proceeding with business activities.
          </p>
          <div className="mt-4 pt-4 border-t border-slate-200/60 flex flex-wrap gap-4 text-xs font-semibold text-slate-500">
            <span>Last Updated: June 4, 2026</span>
            <span>•</span>
            <span>Governing Laws: Peoples Republic of Bangladesh</span>
            <span>•</span>
            <span>Version: 3.2</span>
          </div>
        </div>

        {/* Breakdown of Terms */}
        <div className="space-y-6 mb-12 animate-fade-in">
          {guidelines.map((item, index) => (
            <div key={index} className="bg-white border hover:border-slate-200 border-slate-100 rounded-xl p-6 transition-all shadow-sm">
              <div className="flex items-start gap-4">
                <div className="bg-indigo-50 text-indigo-600 p-2.5 rounded-xl mt-1">
                  <item.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-base md:text-lg mb-2">{item.title}</h3>
                  <p className="text-slate-600 text-xs md:text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Legal Disclaimer */}
        <div className="bg-amber-50/50 border border-amber-200/50 rounded-2xl p-6 md:p-8 mb-12">
          <div className="flex items-center gap-2 text-amber-800 font-bold text-sm uppercase tracking-wide mb-3">
            <AlertTriangle className="w-5 h-5 flex-shrink-0" />
            <span>Important Regulatory Note</span>
          </div>
          <p className="text-amber-900 text-xs md:text-sm leading-relaxed">
            Any misuse of our deployed systems (including hacking, cyberattacks, bypasses of access control sensors, or unapproved network configuration changes) may lead to immediate contract termination and legal recourse under the Digital Security Act of Bangladesh.
          </p>
        </div>

        {/* Contact info support */}
        <div className="bg-indigo-50/50 border border-indigo-100 rounded-2xl p-6 md:p-8 text-center max-w-xl mx-auto">
          <h4 className="font-extrabold text-slate-900 text-base mb-2">Need a Signed SLA or Custom Enterprise Agreement?</h4>
          <p className="text-slate-600 text-xs leading-relaxed mb-4">
            If you are a bank or multinational corporation requiring dedicated offline service agreements with custom liability clauses, please contact our legal counsel team.
          </p>
          <div className="text-xs font-bold text-indigo-900">
            Email: <a href={`mailto:${contact.email}`} className="underline hover:text-indigo-700">{contact.email}</a>
          </div>
        </div>
      </div>
    </section>
  );
}

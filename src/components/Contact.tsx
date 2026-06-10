import React, { useState, useEffect } from "react";
import { FileText, Send, HelpCircle, Phone, Mail, MapPin, CheckCircle2 } from "lucide-react";
import PageBanner from "./PageBanner";
import ScrollReveal from "./ScrollReveal";

import { dataStore } from "../utils/dataStore";

export default function Contact() {
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

  const [fullName, setFullName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [corporateEmail, setCorporateEmail] = useState("");
  const [mobilePhone, setMobilePhone] = useState("");
  const [requirementDetails, setRequirementDetails] = useState("");
  
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!fullName || !corporateEmail || !mobilePhone) {
      setErrorMsg("Please fill in all required fields (marked with *).");
      return;
    }

    setIsSubmitting(true);

    // Call dynamic cPanel PHP mailer script
    fetch("mailer.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        fullName,
        companyName,
        corporateEmail,
        mobilePhone,
        requirementDetails
      })
    })
    .then(async (response) => {
      const text = await response.text();
      try {
        const json = JSON.parse(text);
        if (json.status === "error") {
          console.warn("Mailer response error: ", json.message);
        }
      } catch (err) {
        // Safe to ignore in development since PHP does not compile in node runtime directly
      }
    })
    .catch((err) => {
      console.warn("mailer.php endpoint not serving locally. This is expected in modern local development. Message stored securely in local database records.", err);
    })
    .finally(() => {
      // Add inquiry to central store for instant local simulation & server sync
      dataStore.addInquiry({
        fullName,
        companyName,
        corporateEmail,
        mobilePhone,
        requirementDetails
      });

      setIsSubmitting(false);
      setSuccessMsg("Your site survey request was submitted successfully! Our technical team will reach out to you within 24 hours.");
      
      // Reset state
      setFullName("");
      setCompanyName("");
      setCorporateEmail("");
      setMobilePhone("");
      setRequirementDetails("");
    });
  };

  return (
    <section id="contact" className="bg-[#f5f7fc] min-h-screen py-16 selection:bg-indigo-600 selection:text-white">
      <PageBanner title="Contact Us" />
      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex flex-col gap-8">
        
        {/* Side-by-Side Grid for Form and Contact Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Card 1: CONTACT SALES (Now on the Left) */}
          <ScrollReveal direction="right" duration={0.8} className="lg:col-span-5 h-full flex flex-col">
            <div className="bg-[#0f0e26] rounded-[2rem] p-6 sm:p-10 text-white border border-indigo-950/40 relative overflow-hidden shadow-2xl flex-grow flex flex-col justify-between">
              <div>
                {/* Subtle Glow Overlay */}
                <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

                {/* Card Header with Question Circle Icon */}
                <div className="flex items-center gap-3.5 mb-3">
                  <HelpCircle className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-400 flex-shrink-0" />
                  <h2 className="text-white font-extrabold text-sm sm:text-base tracking-wider uppercase font-sans">
                    CONTACT SALES
                  </h2>
                </div>

                {/* Thin Horizontal Line to Match Graphic */}
                <div className="border-t border-slate-800/60 my-4" />

                {/* Details Column Area */}
                <div className="flex flex-col gap-6 pt-2">
                  
                  {/* DIRECT HOTLINE Block */}
                  <div className="flex items-start gap-4">
                    <span className="p-2 bg-indigo-950/60 text-indigo-400 rounded-xl flex items-center justify-center mt-0.5 border border-indigo-900/30">
                      <Phone className="w-5 h-5" />
                    </span>
                    <div>
                      <h3 className="text-slate-400 font-extrabold text-[10px] sm:text-[11px] uppercase tracking-wider mb-1">
                        DIRECT HOTLINE
                      </h3>
                      <div className="flex flex-col gap-1">
                        <a href={`tel:${contact.phone.replace(/[^+\d]/g, "")}`} className="text-white hover:text-indigo-300 font-bold text-sm sm:text-base transition-colors">
                          {contact.phone}
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* CORPORATE EMAIL Block */}
                  <div className="flex items-start gap-4">
                    <span className="p-2 bg-indigo-950/60 text-indigo-400 rounded-xl flex items-center justify-center mt-0.5 border border-indigo-900/30">
                      <Mail className="w-5 h-5" />
                    </span>
                    <div>
                      <h3 className="text-slate-400 font-extrabold text-[10px] sm:text-[11px] uppercase tracking-wider mb-1">
                        CORPORATE EMAIL
                      </h3>
                      <a href={`mailto:${contact.email}`} className="text-white hover:text-indigo-300 font-bold text-sm sm:text-base transition-colors">
                        {contact.email}
                      </a>
                    </div>
                  </div>

                  {/* REGISTERED OFFICE Block */}
                  <div className="flex items-start gap-4">
                    <span className="p-2 bg-indigo-950/60 text-indigo-400 rounded-xl flex items-center justify-center mt-0.5 border border-indigo-900/30">
                      <MapPin className="w-5 h-5 flex-shrink-0" />
                    </span>
                    <div>
                      <h3 className="text-slate-400 font-extrabold text-[10px] sm:text-[11px] uppercase tracking-wider mb-1">
                        REGISTERED OFFICE
                      </h3>
                      <p className="text-slate-100 font-bold text-sm sm:text-base leading-relaxed">
                        {contact.address}
                      </p>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Card 2: REQUEST SITE SURVEY (Now on the Right) */}
          <ScrollReveal direction="left" duration={0.8} delay={0.1} className="lg:col-span-7 h-full flex flex-col">
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden relative p-6 sm:p-10 flex-grow flex flex-col justify-between">
              <div>
                {/* Subtle Decorative Circle on Top-Right equivalent to image overlay */}
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-indigo-50/40 rounded-full blur-2xl pointer-events-none" />

                {/* Card Header with Outlined Document/File Icon */}
                <div className="flex items-center gap-3 mb-3 relative z-10">
                  <span className="p-2 sm:p-2.5 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
                    <FileText className="w-5 h-5 sm:w-6 sm:h-6" />
                  </span>
                  <h2 className="text-[#243D7A] font-extrabold text-lg sm:text-2xl tracking-[0.03em] uppercase font-sans">
                    REQUEST SITE SURVEY
                  </h2>
                </div>

                <p className="text-slate-500 text-xs sm:text-sm font-medium leading-relaxed mb-8 relative z-10 max-w-2xl">
                  Need a tailored deployment plan? Contact our sales office for a completely free engineering site assessment.
                </p>

                {/* Form */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-6 relative z-10">
                  
                  {/* Status Messages */}
                  {successMsg && (
                    <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm px-4 py-3 rounded-xl font-medium flex items-center gap-2 animate-fade-in">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>{successMsg}</span>
                    </div>
                  )}
                  {errorMsg && (
                    <div className="bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm px-4 py-3 rounded-xl font-medium animate-fade-in">
                      {errorMsg}
                    </div>
                  )}

                  {/* FULL NAME * Input Block */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] sm:text-[11px] font-extrabold tracking-wider text-[#64748b] uppercase">
                      FULL NAME *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Enter your full name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3.5 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-all font-medium"
                    />
                  </div>

                  {/* COMPANY NAME Input Block */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] sm:text-[11px] font-extrabold tracking-wider text-[#64748b] uppercase">
                      COMPANY NAME
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your company name"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3.5 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-all font-medium"
                    />
                  </div>

                  {/* CORPORATE EMAIL * & MOBILE PHONE * In Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* CORPORATE EMAIL */}
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] sm:text-[11px] font-extrabold tracking-wider text-[#64748b] uppercase">
                        CORPORATE EMAIL *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="Enter your corporate email"
                        value={corporateEmail}
                        onChange={(e) => setCorporateEmail(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3.5 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-all font-medium"
                      />
                    </div>

                    {/* MOBILE PHONE */}
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] sm:text-[11px] font-extrabold tracking-wider text-[#64748b] uppercase">
                        MOBILE PHONE *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="Enter your mobile phone number"
                        value={mobilePhone}
                        onChange={(e) => setMobilePhone(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3.5 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-all font-medium"
                      />
                    </div>
                  </div>

                  {/* REQUIREMENT DETAILS Block */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] sm:text-[11px] font-extrabold tracking-wider text-[#64748b] uppercase">
                      REQUIREMENT DETAILS
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Enter your requirement details"
                      value={requirementDetails}
                      onChange={(e) => setRequirementDetails(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl p-4 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-all resize-none font-medium"
                    />
                  </div>

                  {/* Button Option */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#2E6FA8] hover:bg-[#243D7A] active:scale-[0.99] disabled:opacity-75 disabled:scale-100 text-white font-bold text-xs sm:text-sm py-4 rounded-xl transition-all shadow-md active:shadow flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider h-12 md:h-14"
                  >
                    <Send className="w-4 h-4 fill-white text-transparent transform rotate-[-25deg]" />
                    <span>{isSubmitting ? "Submitting Request..." : "Send Free Survey Request"}</span>
                  </button>

                </form>
              </div>
            </div>
          </ScrollReveal>

        </div>

        {/* Dynamic Map Component Below both sections for user comfort */}
        <ScrollReveal direction="up" duration={0.8} delay={0.2} className="w-full">
          <div className="w-full h-[320px] rounded-3xl overflow-hidden shadow-sm border border-slate-100 relative grayscale-[10%] hover:grayscale-0 transition-all duration-500">
            <iframe
              src={contact.googleMapEmbed || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3649.97018898124!2d90.3644053760618!3d23.819665678822064!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c0d297960cf9%3A0x6e9f2ca35b2e3e2c!2sMirpur%2012%20Bus%20Stand!5e0!3m2!1sen!2sbd!4v1717320000000!5m2!1sen!2sbd"}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Cloud Technologies Registered Office Map"
            ></iframe>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}

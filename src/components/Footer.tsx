import React, { useState, useEffect } from "react";
import { 
  Facebook, 
  Linkedin, 
  Globe, 
  MapPin, 
  Phone, 
  Mail, 
  ArrowUp, 
  MessageSquare,
  MessageCircle,
  Twitter,
  Youtube,
  Instagram
} from "lucide-react";
import { dataStore } from "../utils/dataStore";

export default function Footer() {
  const [showScroll, setShowScroll] = useState(false);
  const [contact, setContact] = useState(() => dataStore.getContactInfo());
  const [footer, setFooter] = useState(() => dataStore.getFooterConfig());
  const [header, setHeader] = useState(() => dataStore.getHeaderConfig());

  useEffect(() => {
    const handleUpdate = () => {
      setContact(dataStore.getContactInfo());
      setFooter(dataStore.getFooterConfig());
      setHeader(dataStore.getHeaderConfig());
    };
    window.dispatchEvent(new Event("datastore-update-local")); // debug hook
    window.addEventListener("datastore-update", handleUpdate);
    return () => {
      window.removeEventListener("datastore-update", handleUpdate);
    };
  }, []);

  useEffect(() => {
    const checkScrollTop = () => {
      if (!showScroll && window.scrollY > 400) {
        setShowScroll(true);
      } else if (showScroll && window.scrollY <= 400) {
        setShowScroll(false);
      }
    };
    window.addEventListener("scroll", checkScrollTop);
    return () => window.removeEventListener("scroll", checkScrollTop);
  }, [showScroll]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleScrollToSection = (id: string) => {
    window.location.hash = `#${id}`;
  };

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase().replace(/\s/g, "")) {
      case "facebook":
        return <Facebook className="w-4 h-4" />;
      case "linkedin":
        return <Linkedin className="w-4 h-4" />;
      case "twitter":
      case "x":
        return <Twitter className="w-4 h-4" />;
      case "youtube":
        return <Youtube className="w-4 h-4" />;
      case "instagram":
        return <Instagram className="w-4 h-4" />;
      default:
        return <Globe className="w-4 h-4" />;
    }
  };

  const defaultSocials = [
    { id: "soc-1", platform: "Facebook", url: footer.facebookUrl || "https://facebook.com" },
    { id: "soc-2", platform: "LinkedIn", url: footer.linkedinUrl || "https://linkedin.com" },
    { id: "soc-3", platform: "Website", url: footer.websiteUrl || "https://www.cloudtechnologies.com.bd" }
  ];

  const socialsToRender = footer.socials && footer.socials.length > 0 ? footer.socials : defaultSocials;

  const defaultQuickLinks = [
    { id: "qk-1", labelText: "Running Projects", url: "#running-projects" },
    { id: "qk-2", labelText: "CSR Initiatives", url: "#csr" },
    { id: "qk-3", labelText: "Career Opportunities", url: "#career" },
    { id: "qk-4", labelText: "Our Brands", url: "#brands" },
    { id: "qk-5", labelText: "Our Clients", url: "#clients" }
  ];

  const quickLinksToRender = footer.quickLinks && footer.quickLinks.length > 0 ? footer.quickLinks : defaultQuickLinks;

  const handleQuickLinkClick = (url: string) => {
    if (url.startsWith("#")) {
      const id = url.replace("#", "");
      handleScrollToSection(id);
    } else {
      window.location.href = url;
    }
  };

  return (
    <footer id="footer" className="bg-[#0b0c16] text-[#9ca3af] relative border-t border-slate-900">
      
      {/* Footer Top widget area */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Column 1: About (Col span 5) */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            <div className="flex items-center gap-2">
              {footer.logoUrl ? (
                <img src={footer.logoUrl} alt={header.logoText} className="h-10 w-auto object-contain rounded-lg" referrerPolicy="no-referrer" />
              ) : (
                <div className="bg-indigo-600 text-white p-2.5 rounded-xl font-bold text-sm tracking-widest">{header.logoText}</div>
              )}
              <div className="flex flex-col">
                <span className="text-white font-extrabold text-sm tracking-wider leading-none">
                  {header.companyNameRow1}
                </span>
                <span className="text-indigo-400 text-[9px] font-bold tracking-widest uppercase mt-0.5">
                  {header.companyNameRow2}
                </span>
              </div>
            </div>
            
            <p className="text-slate-400 text-[13.5px] leading-relaxed max-w-sm">
              {footer.aboutText}
            </p>
            
            {/* Social Icons inside circles */}
            <div className="flex items-center gap-3 mt-2 select-none">
              {socialsToRender.map((soc) => (
                <a 
                  key={soc.id} 
                  href={soc.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-9 h-9 rounded-full border border-slate-800 hover:border-indigo-500 hover:text-indigo-400 flex items-center justify-center transition-all bg-slate-900/40"
                  title={soc.platform}
                >
                  {getSocialIcon(soc.platform)}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links (Col span 3) */}
          <div className="lg:col-span-3 lg:pl-8 flex flex-col gap-4">
            <h3 className="text-white font-extrabold text-sm uppercase tracking-wider relative pb-2 select-none">
              Quick Links
              <span className="absolute bottom-0 left-0 w-8 h-0.5 bg-indigo-500" />
            </h3>
            <ul className="flex flex-col gap-2.5 text-[13px]">
              {quickLinksToRender.map((link) => (
                <li key={link.id}>
                  <button 
                    onClick={() => handleQuickLinkClick(link.url)} 
                    className="hover:text-white hover:underline transition-all text-left cursor-pointer font-sans"
                  >
                    {link.labelText}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact (Col span 4) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <h3 className="text-white font-extrabold text-sm uppercase tracking-wider relative pb-2 select-none">
              Contact Us
              <span className="absolute bottom-0 left-0 w-8 h-0.5 bg-indigo-500" />
            </h3>
            <ul className="flex flex-col gap-3.5 text-[13.5px]">
              <li className="flex items-start gap-3">
                <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800 text-indigo-400 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] uppercase font-bold tracking-wider text-slate-500">Corporate Office</span>
                  <span className="text-slate-300">{contact.addressBrief}</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800 text-indigo-400 mt-0.5">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] uppercase font-bold tracking-wider text-slate-500">Call Us Anytime</span>
                  <a href={`tel:${contact.phone.replace(/[^+\d]/g, "")}`} className="text-slate-200 hover:text-white transition-colors">
                    {contact.phone}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800 text-indigo-400 mt-0.5">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] uppercase font-bold tracking-wider text-slate-500">Email Address</span>
                  <a href={`mailto:${contact.email}`} className="text-slate-200 hover:text-white transition-colors">
                    {contact.email}
                  </a>
                </div>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Floating Buttons: WhatsApp, Messenger, and ScrollToTop */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-40 select-none">
        
        {/* Messenger Action Floating Button */}
        <a 
          href={contact.facebookPage} 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center shadow-xl hover:scale-105 active:scale-95 transition-all text-xs"
          title="Open Messenger"
        >
          <MessageSquare className="w-5 h-5 fill-white" />
        </a>

        {/* WhatsApp Action Floating Button */}
        <a 
          href={contact.whatsapp} 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-12 h-11.5 rounded-full bg-green-500 hover:bg-green-400 text-white flex items-center justify-center shadow-xl hover:scale-105 active:scale-95 transition-all"
          title="Chat on WhatsApp"
        >
          <MessageCircle className="w-5.5 h-5.5 fill-white" />
        </a>

        {/* Dynamic Scroll to top arrow */}
        {showScroll && (
          <button
            onClick={scrollToTop}
            className="w-12 h-12 rounded-full bg-indigo-950 hover:bg-slate-800 text-white flex items-center justify-center shadow-xl hover:scale-105 active:scale-95 transition-all border border-slate-800 cursor-pointer"
            title="Scroll To Top"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Bottom Bar: Copyright line with proper spacing */}
      <div className="border-t border-slate-900 bg-[#07080f] py-6 text-center select-none text-[11.5px] text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2.5">
          <span>{footer.copyrightText}</span>
          <div className="flex items-center gap-4 text-slate-600">
            <a href="#privacy-policy" className="hover:text-indigo-400 transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="#terms-of-use" className="hover:text-indigo-400 transition-colors">Terms of Use</a>
          </div>
        </div>
      </div>

    </footer>
  );
}

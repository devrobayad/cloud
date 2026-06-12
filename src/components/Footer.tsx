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
  const [floatingChats, setFloatingChats] = useState(() => dataStore.getFloatingChats());

  useEffect(() => {
    const handleUpdate = () => {
      setContact(dataStore.getContactInfo());
      setFooter(dataStore.getFooterConfig());
      setHeader(dataStore.getHeaderConfig());
      setFloatingChats(dataStore.getFloatingChats());
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
    window.location.hash = "#" + id;
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

  const getFloatingChatIcon = (platform: string) => {
    const plat = platform.toLowerCase().replace(/\s/g, "");
    switch (plat) {
      case "whatsapp":
        return <MessageCircle className="w-5.5 h-5.5 fill-white" />;
      case "messenger":
        return <MessageSquare className="w-5 h-5 fill-white" />;
      case "phone":
        return <Phone className="w-5 h-5" />;
      case "email":
        return <Mail className="w-5 h-5" />;
      default:
        return <MessageCircle className="w-5.5 h-5.5 fill-white" />;
    }
  };

  const defaultSocials = [
    { id: "soc-1", platform: "Facebook", url: footer.facebookUrl || "https://facebook.com" },
    { id: "soc-2", platform: "LinkedIn", url: footer.linkedinUrl || "https://linkedin.com" },
    { id: "soc-3", platform: "Website", url: footer.websiteUrl || "https://www.cloudtechnologies.com.bd" }
  ];

  const socialsToRender = footer.socials && footer.socials.length > 0 ? footer.socials : defaultSocials;

  const defaultQuickLinks = [
    { id: "qk-1", labelText: "Running Projects", url: "/running-projects" },
    { id: "qk-2", labelText: "CSR Initiatives", url: "/csr" },
    { id: "qk-3", labelText: "Career Opportunities", url: "/career" },
    { id: "qk-4", labelText: "Our Brands", url: "/brands" },
    { id: "qk-5", labelText: "Our Clients", url: "/clients" }
  ];

  const quickLinksToRender = footer.quickLinks && footer.quickLinks.length > 0 ? footer.quickLinks : defaultQuickLinks;

  const handleQuickLinkClick = (url: string, e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    
    let target = url;
    if (target.startsWith("/")) {
      target = "#" + target.substring(1);
    } else if (!target.startsWith("#") && !target.startsWith("http") && !target.includes(".")) {
      target = "#" + target;
    }

    if (target.startsWith("#")) {
      window.location.hash = target;
    } else {
      window.location.href = target;
    }
  };

  return (
    <footer id="footer" className="bg-[#2E6FA8] text-white/90 relative border-t border-indigo-400/20">
      
      {/* Footer Top widget area */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Column 1: About (Col span 5) */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            <div className="flex items-center gap-2">
              {footer.logoUrl ? (
                <img src={footer.logoUrl} alt={header.logoText} className="h-10 w-auto object-contain rounded-lg" referrerPolicy="no-referrer" />
              ) : (
                <div className="bg-[#243D7A] text-white p-2.5 rounded-xl font-bold text-sm tracking-widest">{header.logoText}</div>
              )}
              <div className="flex flex-col">
                <span className="text-white font-extrabold text-sm tracking-wider leading-none">
                  {header.companyNameRow1}
                </span>
                <span className="text-blue-100 text-[9px] font-bold tracking-widest uppercase mt-0.5">
                  {header.companyNameRow2}
                </span>
              </div>
            </div>
            
            <p className="text-blue-50 text-[13.5px] leading-relaxed max-w-sm">
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
                  className="w-9 h-9 rounded-full border border-white/20 hover:border-white text-white/90 hover:text-white flex items-center justify-center transition-all bg-white/10 hover:bg-white/20"
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
              <span className="absolute bottom-0 left-0 w-8 h-0.5 bg-white" />
            </h3>
            <ul className="flex flex-col gap-2.5 text-[13px] text-blue-50">
              {quickLinksToRender.map((link) => (
                <li key={link.id}>
                  <button 
                    onClick={(e) => handleQuickLinkClick(link.url, e)} 
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
              <span className="absolute bottom-0 left-0 w-8 h-0.5 bg-white" />
            </h3>
            <ul className="flex flex-col gap-3.5 text-[13.5px] text-blue-50">
              <li className="flex items-start gap-3">
                <div className="bg-white/10 p-2 rounded-lg border border-white/10 text-white mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] uppercase font-bold tracking-wider text-blue-105">Corporate Office</span>
                  <span className="text-white font-medium">{contact.addressBrief}</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="bg-white/10 p-2 rounded-lg border border-white/10 text-white mt-0.5">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] uppercase font-bold tracking-wider text-blue-105">Call Us Anytime</span>
                  <a href={`tel:${contact.phone.replace(/[^+\d]/g, "")}`} className="text-white hover:underline transition-all font-medium">
                    {contact.phone}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="bg-white/10 p-2 rounded-lg border border-white/10 text-white mt-0.5">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] uppercase font-bold tracking-wider text-blue-105">Email Address</span>
                  <a href={`mailto:${contact.email}`} className="text-white hover:underline transition-all font-medium">
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
        
        {floatingChats.filter(chat => chat.active).map((chat) => (
          <a 
            key={chat.id}
            href={chat.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className={`w-12 h-12 rounded-full text-white flex items-center justify-center shadow-xl hover:scale-105 active:scale-95 transition-all ${
              chat.color && !chat.color.startsWith('#') ? chat.color : (!chat.color ? "bg-indigo-600 hover:bg-indigo-500" : "")
            }`}
            style={chat.color && chat.color.startsWith('#') ? { backgroundColor: chat.color } : undefined}
            title={chat.label || chat.platform}
          >
            {chat.svgCode ? (
              <span 
                className="w-6 h-6 flex items-center justify-center [&>svg]:w-6 [&>svg]:h-6 [&>svg]:block"
                dangerouslySetInnerHTML={{ __html: chat.svgCode }}
              />
            ) : (
              getFloatingChatIcon(chat.platform)
            )}
          </a>
        ))}

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
      <div className="border-t border-white/10 bg-[#243D7A] py-6 text-center select-none text-[11.5px] text-white/80">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2.5">
          <span>{footer.copyrightText}</span>
          <div className="flex items-center gap-4 text-white/70">
            <a 
              href="/privacy-policy" 
              onClick={(e) => handleQuickLinkClick("/privacy-policy", e)} 
              className="hover:text-white hover:underline transition-colors"
            >
              Privacy Policy
            </a>
            <span>•</span>
            <a 
              href="/terms-of-use" 
              onClick={(e) => handleQuickLinkClick("/terms-of-use", e)} 
              className="hover:text-white hover:underline transition-colors"
            >
              Terms of Use
            </a>
          </div>
        </div>
      </div>

    </footer>
  );
}

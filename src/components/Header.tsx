import React, { useState, useEffect } from "react";
import { ChevronDown, Menu, X, Shield, Phone, Mail } from "lucide-react";
import { dataStore } from "../utils/dataStore";

const SUB_PAGES = [
  "contact", "news", "video-gallery", "photo-gallery", "clients", "brands",
  "running-projects", "completed-projects", "about", "chairman", "md",
  "vision", "management", "why-choose-us", "csr", "career", "privacy-policy", "terms-of-use",
  "conference", "sound", "cctv", "vas", "access", "telephony", "datacenter", "network",
  "dcim", "ems", "nms", "server-lan", "storage",
  "passive-lan", "fiber-optic", "dc-power", "rack-management", "raise-floor", "online-ups", "dehumidifier", "precision-cooling",
  "cctv-ip-analog", "cctv-anpr", "cctv-ai", "cctv-vms", "cctv-storage", "cctv-centralized",
  "conf-solution", "conf-meeting-room",
  "sound-professional", "sound-ip-pa", "sound-pa", "telephony-pabx",
  "access-facial", "access-biometric", "access-visitor", "access-barrier", "access-hotel", "access-scanning", "access-parking",
  "vas-managed", "vas-oncall", "vas-onestop", "vas-payment"
];

const isSubpageId = (id: string) => {
  return SUB_PAGES.includes(id) || Object.keys(dataStore.getSolutions()).includes(id);
};

interface SubDropdownItem {
  name: string;
  href: string;
  hasSubmenu?: boolean;
  submenuItems?: { name: string; href: string }[];
}

interface MenuItem {
  name: string;
  href: string;
  hasDropdown?: boolean;
  dropdownItems?: SubDropdownItem[];
}

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [header, setHeader] = useState(() => dataStore.getHeaderConfig());

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleUpdate = () => {
      setHeader(dataStore.getHeaderConfig());
    };
    window.addEventListener("datastore-update", handleUpdate);
    return () => window.removeEventListener("datastore-update", handleUpdate);
  }, []);

  const menuItems = header.menuItems || [];

  const handleScrollTo = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 pt-4 md:px-6" style={{ marginTop: "10px" }}>
      {/* Top Bar for Phone, Email and Floating Navigation Container */}
      <div className={`max-w-7xl mx-auto rounded-3xl bg-white shadow-lg border border-slate-100 transition-all duration-300 p-3 md:px-8 flex items-center justify-between ${isScrolled ? "bg-opacity-95 backdrop-blur-md" : ""}`}>
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => { setIsOpen(false); window.location.hash = "#home"; }}>
          {header.logoUrl ? (
            <img src={header.logoUrl} alt={header.logoText} className="h-10 w-auto object-contain rounded-lg" referrerPolicy="no-referrer" />
          ) : (
            <div className="bg-gradient-to-tr from-slate-900 to-indigo-950 text-white p-2 rounded-xl flex items-center justify-center shadow-md">
              <span className="font-extrabold text-lg tracking-wider font-sans select-none">{header.logoText}</span>
            </div>
          )}
          <div className="flex flex-col">
            <span className="text-slate-900 font-extrabold text-sm md:text-base tracking-tight leading-none">
              {header.companyNameRow1}
            </span>
            <span className="text-slate-500 font-semibold text-[8px] md:text-[10px] tracking-widest leading-none mt-1">
              {header.companyNameRow2}
            </span>
          </div>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden xl:flex items-center gap-1">
          {menuItems.map((item) => (
            <div key={item.name} className="relative group">
              <a
                href={item.href}
                onClick={(e) => {
                  setIsOpen(false);
                  const id = item.href.replace("#", "");
                  
                  // If we are navigating to a page, let hash changed router in App.tsx handle it
                  const isPageRoute = isSubpageId(id);
                  const wasPageRoute = isSubpageId(window.location.hash.replace("#", ""));

                  if (!isPageRoute && !wasPageRoute) {
                    e.preventDefault();
                    const element = document.getElementById(id);
                    if (element) {
                      element.scrollIntoView({ behavior: "smooth" });
                    }
                    window.location.hash = item.href;
                  } else {
                    window.location.hash = item.href;
                  }
                }}
                className="flex items-center gap-1 px-3 py-2 text-slate-700 font-medium text-xs hover:text-indigo-700 transition-colors cursor-pointer"
              >
                {item.name}
                {item.hasDropdown && <ChevronDown className="w-3 h-3 text-slate-400" />}
              </a>
              {/* Dropdown Menu Indicator */}
              {item.hasDropdown && item.dropdownItems && (
                <div className="absolute left-0 mt-2 w-64 bg-white border border-slate-100 rounded-xl shadow-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-1 group-hover:translate-y-0 z-50">
                  {item.dropdownItems.map((subItem) => (
                    <div key={subItem.name} className="relative group/sub">
                      {subItem.hasSubmenu ? (
                        <>
                          <div className="flex items-center justify-between w-full hover:bg-slate-50 transition-colors">
                            <a 
                              href={subItem.href} 
                              onClick={(e) => { 
                                setIsOpen(false); 
                                const subId = subItem.href.replace("#", "");
                                const isPageRoute = isSubpageId(subId);
                                const wasPageRoute = isSubpageId(window.location.hash.replace("#", ""));
                                
                                if (!isPageRoute && !wasPageRoute) {
                                  e.preventDefault();
                                  const element = document.getElementById(subId);
                                  if (element) {
                                    element.scrollIntoView({ behavior: "smooth" });
                                  }
                                  window.location.hash = subItem.href;
                                } else {
                                  window.location.hash = subItem.href;
                                }
                              }} 
                              className="flex-1 text-left px-4 py-2.5 text-[11px] sm:text-xs text-slate-700 hover:text-indigo-600 font-semibold flex items-center justify-between"
                            >
                              <span>{subItem.name}</span>
                              <ChevronDown className="w-3.5 h-3.5 -rotate-90 text-slate-400 group-hover/sub:text-indigo-600 transition-colors" />
                            </a>
                          </div>
                          
                          {/* Nested submenu on hover */}
                          <div className="absolute left-full top-0 ml-1 w-72 bg-white border border-slate-100 rounded-xl shadow-xl py-2 opacity-0 invisible group-hover/sub:opacity-100 group-hover/sub:visible transition-all duration-200 transform translate-x-1 group-hover/sub:translate-x-0 z-50">
                            {subItem.submenuItems?.map((nestedItem) => (
                              <a
                                key={nestedItem.name}
                                href={nestedItem.href}
                                onClick={(e) => {
                                  setIsOpen(false);
                                  const nestedId = nestedItem.href.replace("#", "");
                                  const isPageRoute = isSubpageId(nestedId);
                                  const wasPageRoute = isSubpageId(window.location.hash.replace("#", ""));
                                  
                                  if (!isPageRoute && !wasPageRoute) {
                                    e.preventDefault();
                                    const element = document.getElementById(nestedId);
                                    if (element) {
                                      element.scrollIntoView({ behavior: "smooth" });
                                    }
                                    window.location.hash = nestedItem.href;
                                  } else {
                                    window.location.hash = nestedItem.href;
                                  }
                                }}
                                className="block px-4 py-2 text-[11px] text-slate-600 hover:bg-slate-50 hover:text-indigo-600 font-medium"
                              >
                                {nestedItem.name}
                              </a>
                            ))}
                          </div>
                        </>
                      ) : (
                        <a 
                          href={subItem.href} 
                          onClick={(e) => { 
                            setIsOpen(false); 
                            const subId = subItem.href.replace("#", "");
                            const isPageRoute = isSubpageId(subId);
                            const wasPageRoute = isSubpageId(window.location.hash.replace("#", ""));
                            
                            if (!isPageRoute && !wasPageRoute) {
                              e.preventDefault();
                              const element = document.getElementById(subId);
                              if (element) {
                                element.scrollIntoView({ behavior: "smooth" });
                              }
                              window.location.hash = subItem.href;
                            } else {
                              window.location.hash = subItem.href;
                            }
                          }} 
                          className="block px-4 py-2.5 text-[11px] sm:text-xs text-slate-700 hover:bg-slate-50 hover:text-indigo-600 font-semibold"
                        >
                          {subItem.name}
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
          
          {header.buttons && header.buttons.map((btn) => (
            <a
              key={btn.id}
              href={btn.url} 
              target={btn.isOpenNewTab ? "_blank" : "_self"} 
              rel="noopener noreferrer"
              className="ml-3 px-4 py-2 bg-indigo-50 text-indigo-700 font-bold text-xs rounded-full hover:bg-indigo-100 transition-all border border-indigo-200/50 block text-center"
            >
              {btn.labelText}
            </a>
          ))}
        </nav>

        {/* Mobile Toggle Button */}
        <div className="flex items-center gap-3 xl:hidden">
          {header.buttons && header.buttons.map((btn) => (
            <a
              key={btn.id}
              href={btn.url} 
              className="px-3 py-1.5 bg-indigo-50 text-indigo-700 font-bold text-xs rounded-full inline-block"
              target={btn.isOpenNewTab ? "_blank" : "_self"}
              rel="noopener noreferrer"
            >
              {btn.labelText}
            </a>
          ))}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="xl:hidden mt-2 max-w-7xl mx-auto bg-white rounded-2xl shadow-xl border border-slate-100 p-4 transition-all duration-300 max-h-[75vh] overflow-y-auto">
          <nav className="flex flex-col gap-2">
            {menuItems.map((item) => (
              <div key={item.name} className="flex flex-col gap-1">
                <a
                  href={item.href}
                  onClick={(e) => {
                    const id = item.href.replace("#", "");
                    const isPageRoute = isSubpageId(id);
                    const wasPageRoute = isSubpageId(window.location.hash.replace("#", ""));

                    if (!isPageRoute && !wasPageRoute) {
                      e.preventDefault();
                      setIsOpen(false);
                      const element = document.getElementById(id);
                      if (element) {
                        element.scrollIntoView({ behavior: "smooth" });
                      }
                      window.location.hash = item.href;
                    } else {
                      setIsOpen(false);
                      window.location.hash = item.href;
                    }
                  }}
                  className="w-full text-left px-4 py-2 text-slate-800 hover:bg-slate-50 hover:text-indigo-600 rounded-lg font-extrabold text-xs tracking-tight transition-all"
                >
                  {item.name}
                </a>

                {item.hasDropdown && item.dropdownItems && (
                  <div className="pl-4 border-l border-slate-100 flex flex-col gap-1.5 mb-1 bg-slate-50/50 py-1 rounded">
                    {item.dropdownItems.map((subItem) => (
                      <div key={subItem.name} className="flex flex-col">
                        <a
                          href={subItem.href}
                          onClick={(e) => {
                            const subId = subItem.href.replace("#", "");
                            const isPageRoute = isSubpageId(subId);
                            const wasPageRoute = isSubpageId(window.location.hash.replace("#", ""));

                            if (!isPageRoute && !wasPageRoute) {
                              e.preventDefault();
                              setIsOpen(false);
                              const element = document.getElementById(subId);
                              if (element) {
                                element.scrollIntoView({ behavior: "smooth" });
                              }
                              window.location.hash = subItem.href;
                            } else {
                              setIsOpen(false);
                              window.location.hash = subItem.href;
                            }
                          }}
                          className="px-4 py-1.5 text-xs text-slate-600 hover:text-indigo-600 rounded font-semibold transition-all"
                        >
                          • {subItem.name}
                        </a>
                        
                        {subItem.hasSubmenu && subItem.submenuItems && (
                          <div className="pl-4 ml-4 border-l border-slate-200/60 flex flex-col gap-1 mt-0.5 mb-1.5 py-0.5">
                            {subItem.submenuItems.map((nestedItem) => (
                              <a
                                key={nestedItem.name}
                                href={nestedItem.href}
                                onClick={(e) => {
                                  const nestedId = nestedItem.href.replace("#", "");
                                  const isPageRoute = isSubpageId(nestedId);
                                  const wasPageRoute = isSubpageId(window.location.hash.replace("#", ""));

                                  if (!isPageRoute && !wasPageRoute) {
                                    e.preventDefault();
                                    setIsOpen(false);
                                    const element = document.getElementById(nestedId);
                                    if (element) {
                                      element.scrollIntoView({ behavior: "smooth" });
                                    }
                                    window.location.hash = nestedItem.href;
                                  } else {
                                    setIsOpen(false);
                                    window.location.hash = nestedItem.href;
                                  }
                                }}
                                className="px-3 py-1 text-[11px] text-slate-500 hover:text-indigo-600 rounded font-medium transition-all"
                              >
                                — {nestedItem.name}
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

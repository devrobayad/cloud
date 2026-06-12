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

  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);
  const [expandedSubmenu, setExpandedSubmenu] = useState<string | null>(null);

  const toggleMenu = (name: string) => {
    setExpandedMenu(expandedMenu === name ? null : name);
  };

  const toggleSubmenu = (name: string) => {
    setExpandedSubmenu(expandedSubmenu === name ? null : name);
  };

  const closeDrawer = () => {
    setIsOpen(false);
    setExpandedMenu(null);
    setExpandedSubmenu(null);
  };

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

  const handlePageNavigationClick = (href: string, e: React.MouseEvent) => {
    if (href.startsWith("/")) {
      e.preventDefault();
      setIsOpen(false);
      window.location.hash = "#" + href.replace(/^\//, "");
      return true;
    }
    return false;
  };

  const handleScrollTo = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-[50px] pt-[30px]">
      {/* Top Bar for Phone, Email and Navigation Container - Floating bar layout */}
      <div className={`w-full max-w-full bg-white shadow-md border border-slate-100 rounded-2xl transition-all duration-300 py-3.5 px-6 md:px-12 lg:px-16 flex items-center justify-between ${isScrolled ? "bg-opacity-95 backdrop-blur-md" : ""}`}>
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => { 
          setIsOpen(false); 
          window.location.hash = "#home";
        }}>
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
        <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1.5 flex-nowrap">
          {menuItems.map((item) => (
            <div key={item.name} className="relative group">
              <a
                href={item.href}
                onClick={(e) => {
                  if (handlePageNavigationClick(item.href, e)) return;
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
                className="flex items-center gap-1 px-2 py-2 2xl:px-3 text-slate-700 font-normal text-[16px] hover:text-indigo-700 transition-colors cursor-pointer whitespace-nowrap"
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
                                if (handlePageNavigationClick(subItem.href, e)) return;
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
                              className="flex-1 text-left px-4 py-2.5 text-[16px] text-slate-700 hover:text-indigo-600 font-normal flex items-center justify-between"
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
                                  if (handlePageNavigationClick(nestedItem.href, e)) return;
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
                                className="block px-4 py-2 text-[16px] text-slate-600 hover:bg-slate-50 hover:text-indigo-600 font-normal"
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
                            if (handlePageNavigationClick(subItem.href, e)) return;
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
                          className="block px-4 py-2.5 text-[16px] text-slate-700 hover:bg-slate-50 hover:text-indigo-600 font-normal"
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
              className="ml-2.5 px-3.5 py-1.5 bg-[#2E6FA8] text-white font-normal text-[16px] rounded-full hover:bg-[#243D7A] transition-all border border-transparent block text-center whitespace-nowrap"
            >
              {btn.labelText}
            </a>
          ))}
        </nav>

        {/* Mobile Toggle Button */}
        <div className="flex items-center gap-3 lg:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer - Immersive same-to-same design with the header photo */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] bg-[#2E6FA8] lg:hidden flex flex-col overflow-hidden animate-in fade-in slide-in-from-top duration-300">
          {/* Top Row: Brand Logo Panel (White BG) and Custom Dark Close Button */}
          <div className="bg-white px-5 py-4 flex items-center justify-between border-b border-slate-100 shadow-sm">
            {/* Logo Layout */}
            <div 
              className="flex items-center gap-2.5 cursor-pointer" 
              onClick={() => { 
                closeDrawer(); 
                window.location.hash = "#home";
              }}
            >
              {header.logoUrl ? (
                <img src={header.logoUrl} alt={header.logoText} className="h-10 w-auto object-contain rounded-lg" referrerPolicy="no-referrer" />
              ) : (
                <div className="bg-gradient-to-tr from-slate-900 to-indigo-950 text-white p-2 rounded-xl flex items-center justify-center shadow-md">
                  <span className="font-extrabold text-sm tracking-wider font-sans select-none">{header.logoText}</span>
                </div>
              )}
              <div className="flex flex-col">
                <span className="text-slate-900 font-extrabold text-xs md:text-sm tracking-tight leading-none">
                  {header.companyNameRow1}
                </span>
                <span className="text-slate-500 font-semibold text-[7px] md:text-[9px] tracking-widest leading-none mt-1 uppercase">
                  {header.companyNameRow2}
                </span>
              </div>
            </div>

            {/* Premium Dark Navy Rounded Close Button with white close icon */}
            <button
              onClick={closeDrawer}
              className="p-3 bg-[#2E6FA8] hover:bg-[#243D7A] text-white rounded-xl transition-all shadow-md cursor-pointer flex items-center justify-center transform active:scale-95"
              aria-label="Close menu"
            >
              <X className="w-5 h-5 stroke-[2.5]" />
            </button>
          </div>

          {/* Scrolling Corporate Dark Navy List Menu panel */}
          <div className="flex-1 bg-[#2E6FA8] overflow-y-auto px-5 py-4 pb-12">
            <nav className="flex flex-col">
              {menuItems.map((item) => {
                const isExpanded = expandedMenu === item.name;
                return (
                  <div key={item.name} className="border-b border-white/5 py-1">
                    {/* Level 1 Parent Link / Accordion Control Button */}
                    {item.hasDropdown && item.dropdownItems && item.dropdownItems.length > 0 ? (
                      <button
                        onClick={() => toggleMenu(item.name)}
                        className="w-full flex items-center justify-between py-3 px-4 text-left font-normal text-[#f3f4f6] hover:text-white hover:bg-white/5 rounded-xl transition-all cursor-pointer text-[16px] tracking-wide"
                      >
                        <span className="tracking-tight uppercase">{item.name}</span>
                        <ChevronDown className={`w-4 h-4 text-slate-300 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`} />
                      </button>
                    ) : (
                      <a
                        href={item.href}
                        onClick={(e) => {
                          if (handlePageNavigationClick(item.href, e)) return;
                          const id = item.href.replace("#", "");
                          const isPageRoute = isSubpageId(id);
                          const wasPageRoute = isSubpageId(window.location.hash.replace("#", ""));

                          if (!isPageRoute && !wasPageRoute) {
                            e.preventDefault();
                            closeDrawer();
                            const element = document.getElementById(id);
                            if (element) {
                              element.scrollIntoView({ behavior: "smooth" });
                            }
                            window.location.hash = item.href;
                          } else {
                            closeDrawer();
                            window.location.hash = item.href;
                          }
                        }}
                        className="block py-3 px-4 font-normal text-[#f3f4f6] hover:text-white hover:bg-white/5 rounded-xl transition-all text-[16px] tracking-wide"
                      >
                        <span className="tracking-tight uppercase">{item.name}</span>
                      </a>
                    )}

                    {/* Level 2 Submenus container (Initially Closed, toggles on parent click) */}
                    {item.hasDropdown && item.dropdownItems && isExpanded && (
                      <div className="mt-1 ml-4 pl-3 border-l-2 border-indigo-500/40   flex flex-col gap-1 py-1.5 bg-[#1b456a]/80 rounded-xl overflow-hidden transition-all duration-300">
                        {item.dropdownItems.map((subItem) => {
                           const isSubExpanded = expandedSubmenu === subItem.name;
                           return (
                             <div key={subItem.name} className="flex flex-col">
                               {subItem.hasSubmenu && subItem.submenuItems && subItem.submenuItems.length > 0 ? (
                                 <>
                                   {/* Submenu Trigger (Closed by default, click opens it) */}
                                   <button
                                     onClick={() => toggleSubmenu(subItem.name)}
                                     className="w-full flex items-center justify-between px-4 py-2.5 text-[16px] text-[#d1d5db] hover:text-white hover:bg-white/5 rounded-lg transition-all cursor-pointer font-normal"
                                   >
                                     <span>• {subItem.name}</span>
                                     <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-300 ${isSubExpanded ? "rotate-180" : ""}`} />
                                   </button>

                                   {/* Level 3 Sub-submenu Items (Initially Closed, toggles on click) */}
                                   {isSubExpanded && (
                                     <div className="ml-5 pl-3 mt-1 mb-1 border-l border-indigo-400/30 flex flex-col gap-1.5 py-1 bg-[#0a1b2a]/95 rounded-lg">
                                       {subItem.submenuItems.map((nestedItem) => (
                                         <a
                                           key={nestedItem.name}
                                           href={nestedItem.href}
                                           onClick={(e) => {
                                             if (handlePageNavigationClick(nestedItem.href, e)) return;
                                             const nestedId = nestedItem.href.replace("#", "");
                                             const isPageRoute = isSubpageId(nestedId);
                                             const wasPageRoute = isSubpageId(window.location.hash.replace("#", ""));

                                             if (!isPageRoute && !wasPageRoute) {
                                               e.preventDefault();
                                               closeDrawer();
                                               const element = document.getElementById(nestedId);
                                               if (element) {
                                                 element.scrollIntoView({ behavior: "smooth" });
                                               }
                                               window.location.hash = nestedItem.href;
                                             } else {
                                               closeDrawer();
                                               window.location.hash = nestedItem.href;
                                             }
                                           }}
                                           className="block px-4 py-1.5 text-[16px] text-slate-300 hover:text-white hover:bg-white/5 rounded transition-all font-normal"
                                         >
                                           — {nestedItem.name}
                                         </a>
                                       ))}
                                     </div>
                                   )}
                                 </>
                               ) : (
                                 <a
                                   href={subItem.href}
                                   onClick={(e) => {
                                     if (handlePageNavigationClick(subItem.href, e)) return;
                                     const subId = subItem.href.replace("#", "");
                                     const isPageRoute = isSubpageId(subId);
                                     const wasPageRoute = isSubpageId(window.location.hash.replace("#", ""));

                                     if (!isPageRoute && !wasPageRoute) {
                                       e.preventDefault();
                                       closeDrawer();
                                       const element = document.getElementById(subId);
                                       if (element) {
                                         element.scrollIntoView({ behavior: "smooth" });
                                       }
                                       window.location.hash = subItem.href;
                                     } else {
                                       closeDrawer();
                                       window.location.hash = subItem.href;
                                     }
                                   }}
                                   className="block px-4 py-2.5 text-[16px] text-[#d1d5db] hover:text-white hover:bg-white/5 rounded-lg transition-all font-normal"
                                 >
                                   • {subItem.name}
                                 </a>
                               )}
                             </div>
                           );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Dynamic Action Buttons (e.g. Webmail) styled beautifully inside a premium button style */}
              {header.buttons && header.buttons.map((btn) => (
                <div key={btn.id} className="mt-5 px-3">
                  <a
                    href={btn.url}
                    target={btn.isOpenNewTab ? "_blank" : "_self"}
                    rel="noopener noreferrer"
                    onClick={closeDrawer}
                    className="w-full flex items-center justify-center gap-2.5 py-3.5 px-5 bg-gradient-to-r from-red-650 to-indigo-600 hover:from-indigo-600 hover:to-indigo-500 text-white font-normal text-[16px] tracking-widest uppercase rounded-2xl shadow-lg border border-white/10 transition-all duration-300 transform active:scale-95 text-center"
                  >
                    <span>{btn.labelText}</span>
                  </a>
                </div>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}

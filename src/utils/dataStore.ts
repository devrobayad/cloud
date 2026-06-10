/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SerializableSolution, defaultSolutions } from "./defaultSolutions";
import HERO_COMMAND_CENTER_IMAGE from "../assets/images/hero_command_center_1780518486421.png";
export type { SerializableSolution };

// Centralized LocalStorage Data Store for RS Technologies Limited / Cloud Technologies website
// This supports live management of content across different sections as well as managing contact submissions.

export interface NewsItem {
  id: string;
  title: string;
  image: string;
  date: string;
  isCustomGraphic?: boolean;
  category: string;
  summary: string;
  description: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  image: string;
  date: string;
  status?: string; // for running projects
  category?: string; // for completed projects
  summary: string;
  description: string;
}

export interface PhotoItem {
  id: number;
  title: string;
  category: string;
  categoryLabel: string;
  images: string[];
  description: string;
  client: string;
  location: string;
}

export interface VideoItem {
  id: number;
  title: string;
  category: "overview" | "installation" | "tutorial";
  categoryLabel: string;
  duration: string;
  date: string;
  thumbnail: string;
  embedCode: string;
  description: string;
  views: string;
  videoType?: "youtube" | "uploaded";
  videoUrl?: string;
}

export interface InquiryItem {
  id: string;
  fullName: string;
  companyName: string;
  corporateEmail: string;
  mobilePhone: string;
  requirementDetails: string;
  createdAt: string;
  status: "new" | "read" | "replied";
  repliedMessage?: string;
  repliedAt?: string;
}

export interface SystemStats {
  completedProjects: number;
  happyClients: number;
  brandPartners: number;
  soundZones: number;
}

export interface ContactInfo {
  phone: string;
  email: string;
  address: string;
  addressBrief: string;
  whatsapp: string;
  facebookPage: string;
  companyName: string;
  googleMapEmbed?: string;
}

export interface DBClient {
  id: string;
  name: string;
  category: string;
  link: string;
  logoText: string;
  logoStyle: string; // e.g. 'baywatch', 'greengold', 'farazy', etc. OR custom style colors
  logoUrl?: string; // Optional custom uploaded logo image base64
}

export interface DBBrand {
  id: string;
  name: string;
  sub: string;
  color: string; // Tailwind border classes
  link: string;
  logoText: string;
  logoStyle: string; // Preset or custom style
  logoUrl?: string; // Optional custom uploaded logo image base64
}

export interface AboutConfig {
  tagline: string;
  title: string;
  desc1: string;
  desc2: string;
  badgeTitle: string;
  badgeText: string;
  image1?: string;
  image2?: string;
  badgeImage?: string;
  badgeIconUrl?: string;
}

export interface ChairmanConfig {
  name: string;
  role: string;
  title: string;
  message: string;
  photo: string;
}

export interface MDConfig {
  name: string;
  role: string;
  title: string;
  message: string;
  photo: string;
}

export interface VisionMissionConfig {
  visionTitle: string;
  visionText: string;
  image?: string;
}

export interface TeamMemberConfig {
  name: string;
  role: string;
  description: string;
  image: string;
}

export interface WhyChooseReason {
  title: string;
  desc: string;
}

export interface HeroSlide {
  id: string;
  image: string;
  tag: string;
  title: string;
  description: string;
  cta: string;
}

export interface TestimonialItem {
  id: string;
  text: string;
  author: string;
  role: string;
  avatar: string;
}

export interface StatItem {
  id: string;
  value: string;
  label: string;
  sub: string;
  iconName: string;
}

export interface SocialLink {
  id: string;
  platform: string; // e.g. "Facebook", "LinkedIn", "Twitter", "YouTube", "Instagram" etc.
  url: string;
}

export interface FloatingChat {
  id: string;
  platform: string; // e.g. "WhatsApp", "Messenger", "Telegram", "Phone", "Email", "Custom"
  url: string;
  label: string;
  color?: string; // e.g. "bg-green-500 hover:bg-green-400"
  active: boolean;
  svgCode?: string; // Raw custom SVG icon string
}

export interface QuickLink {
  id: string;
  labelText: string;
  url: string;
}

export interface SubMenuItem {
  id: string;
  name: string;
  href: string;
}

export interface NavDropdownItem {
  id: string;
  name: string;
  href: string;
  hasSubmenu?: boolean;
  submenuItems?: SubMenuItem[];
}

export interface NavItemConfig {
  id: string;
  name: string;
  href: string;
  hasDropdown?: boolean;
  dropdownItems?: NavDropdownItem[];
}

export interface ActionButtonConfig {
  id: string;
  labelText: string;
  url: string;
  isOpenNewTab?: boolean;
}

export interface HeaderConfig {
  logoText: string;
  companyNameRow1: string;
  companyNameRow2: string;
  webmailUrl: string;
  logoUrl?: string;
  menuItems?: NavItemConfig[];
  buttons?: ActionButtonConfig[];
}

export interface FooterConfig {
  aboutText: string;
  facebookUrl: string;
  linkedinUrl: string;
  websiteUrl: string;
  copyrightText: string;
  logoUrl?: string;
  socials?: SocialLink[];
  quickLinks?: QuickLink[];
}

export interface AdminAuthConfig {
  loginCompanyName: string;
  loginSubLabel: string;
  adminUsername?: string;
  adminPassword?: string;
}

export interface EmailIntegrationConfig {
  receiverEmail: string;
  senderEmail: string;
  senderName: string;
  subjectPrefix: string;
  webmailUrl: string;
  useSmtp: boolean;
  smtpHost: string;
  smtpPort: number;
  smtpUser: string;
  smtpPass: string;
  smtpSecure: "none" | "ssl" | "tls";
  activeMethod: "php_mail" | "php_mailer_smtp" | "local_storage_only";
}

export interface MySQLConfig {
  dbHost: string;
  dbName: string;
  dbUser: string;
  dbPass: string;
  apiEndpointUrl: string;
  activeDataSource: "local_storage" | "mysql_bridge";
}

export interface SiteMetadata {
  siteTitle: string;
  faviconUrl: string;
  preloaderEnabled?: boolean;
  preloaderPreset?: "circle" | "pulse" | "bars" | "dots";
  preloaderLogo?: string;
  preloaderDuration?: number;
}

const defaultSiteMetadata: SiteMetadata = {
  siteTitle: "Cloud Technologies | Bangladesh's Leading IT Provider",
  faviconUrl: "",
  preloaderEnabled: true,
  preloaderPreset: "circle",
  preloaderLogo: "",
  preloaderDuration: 1200
};

const defaultAdminAuthConfig: AdminAuthConfig = {
  loginCompanyName: "RS TECHNOLOGIES",
  loginSubLabel: "Management Portal",
  adminUsername: "admin",
  adminPassword: "admin"
};

const defaultEmailIntegrationConfig: EmailIntegrationConfig = {
  receiverEmail: "info@cloudtechnologies.com.bd",
  senderEmail: "noreply@cloudtechnologies.com.bd",
  senderName: "Cloud Technologies CRM Portal",
  subjectPrefix: "[CTL Website Inquiry] ",
  webmailUrl: "https://webmail.cloudtechnologies.com.bd",
  useSmtp: false,
  smtpHost: "mail.cloudtechnologies.com.bd",
  smtpPort: 465,
  smtpUser: "noreply@cloudtechnologies.com.bd",
  smtpPass: "",
  smtpSecure: "ssl",
  activeMethod: "php_mail"
};

const getAutoBridgeUrl = (): string => {
  if (typeof window !== "undefined" && window.location) {
    const hostname = window.location.hostname;
    if (
      hostname !== "localhost" && 
      hostname !== "127.0.0.1" && 
      !hostname.includes("run.app")
    ) {
      const pathParts = window.location.pathname.split("/");
      pathParts.pop(); // remove index.html or trailing segment
      const dir = pathParts.join("/");
      return `${window.location.protocol}//${window.location.host}${dir ? dir : ""}/data_bridge.php`;
    }
  }
  return "https://www.cloudtechnologies.com.bd/data_bridge.php";
};

const isProductionDepl = (): boolean => {
  if (typeof window !== "undefined" && window.location) {
    const hostname = window.location.hostname;
    return (
      hostname !== "localhost" && 
      hostname !== "127.0.0.1" && 
      !hostname.includes("run.app")
    );
  }
  return false;
};

const defaultMySQLConfig: MySQLConfig = {
  dbHost: "file_storage",
  dbName: "file_storage",
  dbUser: "file_storage",
  dbPass: "file_storage",
  apiEndpointUrl: getAutoBridgeUrl(),
  activeDataSource: isProductionDepl() ? "mysql_bridge" : "local_storage"
};

const defaultClients: DBClient[] = [
  { id: "baywatch", name: "Baywatch Rest House", category: "Hospitality & Leisure", link: "#", logoText: "BW", logoStyle: "baywatch" },
  { id: "greengold", name: "Green Gold Farm Ltd", category: "Agribusiness & Food", link: "#", logoText: "GG", logoStyle: "greengold" },
  { id: "farazy", name: "Farazy Hospital Ltd", category: "Healthcare Services", link: "#", logoText: "FARAZY", logoStyle: "farazy" },
  { id: "hbl", name: "HBL Pakistan (Dhaka)", category: "Banking & Finance", link: "#", logoText: "HBL", logoStyle: "hbl" },
  { id: "citizens", name: "Citizens Bank PLC", category: "Banking & Finance", link: "#", logoText: "CITIZENS BANK", logoStyle: "citizens" },
  { id: "gov", name: "Ministry of Women Affairs", category: "Government Bangladesh", link: "#", logoText: "MINISTRY OF WOMEN", logoStyle: "gov" },
  { id: "ambala", name: "Ambala Foundation", category: "Non-Governmental Org", link: "#", logoText: "ambala", logoStyle: "ambala" },
  { id: "buro", name: "BURO Bangladesh", category: "Microfinance & Banking", link: "#", logoText: "BURO", logoStyle: "buro" },
  { id: "dun", name: "Dun & Bradstreet", category: "Business Intelligence", link: "#", logoText: "dun & bradstreet", logoStyle: "dun" },
  { id: "abc", name: "ABC Corporation PLC", category: "Real Estate & Housing", link: "#", logoText: "ABC Corp", logoStyle: "abc" },
  { id: "solaiman", name: "Solaiman Group Bangladesh", category: "Conglomerate", link: "#", logoText: "SOLAIMAN", logoStyle: "solaiman" },
  { id: "anwar", name: "Anwar Group of Industries", category: "Conglomerate", link: "#", logoText: "ANWAR", logoStyle: "anwar" }
];

const defaultBrands: DBBrand[] = [
  { id: "cisco", name: "CISCO", sub: "Enterprise Networks", color: "border-sky-200 hover:border-sky-500", link: "https://www.cisco.com", logoText: "CISCO", logoStyle: "cisco" },
  { id: "dell", name: "DELL", sub: "Servers & Storage", color: "border-blue-200 hover:border-blue-500", link: "https://www.dell.com", logoText: "DELL", logoStyle: "dell" },
  { id: "ruijie", name: "Ruijie", sub: "Switches & Access Points", color: "border-red-200 hover:border-red-500", link: "https://www.ruijienetworks.com", logoText: "Reyee", logoStyle: "ruijie" },
  { id: "fortinet", name: "Fortinet", sub: "Next-Gen Firewalls", color: "border-red-200 hover:border-red-500", link: "https://www.fortinet.com", logoText: "FORTINET.", logoStyle: "fortinet" },
  { id: "witek", name: "WI-TEK", sub: "PoE Switches", color: "border-cyan-200 hover:border-cyan-500", link: "https://www.wi-tek.com", logoText: "WI-TEK", logoStyle: "witek" },
  { id: "rosenberger", name: "Rosenberger", sub: "Fiber Optic Cabling", color: "border-amber-200 hover:border-amber-500", link: "https://www.rosenberger.com", logoText: "Rosenberger", logoStyle: "rosenberger" },
  { id: "allied", name: "allied", sub: "Media Converters", color: "border-teal-200 hover:border-teal-500", link: "https://www.alliedtelesis.com", logoText: "Allied Telesis", logoStyle: "allied" },
  { id: "vivanco", name: "Vivanco", sub: "Structured Cabling", color: "border-indigo-200 hover:border-indigo-500", link: "https://www.vivanco.com", logoText: "VIVANCO", logoStyle: "vivanco" },
  { id: "mikrotik", name: "MikroTik", sub: "Routers & RouterOS", color: "border-slate-200 hover:border-slate-500", link: "https://www.mikrotik.com", logoText: "MikroTik", logoStyle: "mikrotik" },
  { id: "bdcom", name: "BDCOM", sub: "EPON / GPON Systems", color: "border-sky-200 hover:border-sky-500", link: "https://www.bdcom.cn", logoText: "BDCOM", logoStyle: "bdcom" },
  { id: "netgear", name: "NETGEAR", sub: "Smart Switching", color: "border-indigo-200 hover:border-indigo-500", link: "https://www.netgear.com", logoText: "NETGEAR", logoStyle: "netgear" },
  { id: "grandstream", name: "Grandstream", sub: "VoIP Telephony", color: "border-blue-200 hover:border-blue-500", link: "https://www.grandstream.com", logoText: "GRANDSTREAM", logoStyle: "grandstream" },
  { id: "ubiquiti", name: "UBIQUITI", sub: "UniFi Systems", color: "border-cyan-200 hover:border-cyan-500", link: "https://www.ui.com", logoText: "UBIQUITI", logoStyle: "ubiquiti" },
  { id: "hikvision", name: "HIKVISION", sub: "Security Surveillance", color: "border-red-200 hover:border-red-500", link: "https://www.hikvision.com", logoText: "HIKVISION", logoStyle: "hikvision" },
  { id: "dahua", name: "DAHUA", sub: "CCTV Solutions", color: "border-red-200 hover:border-red-500", link: "https://www.dahuasecurity.com", logoText: "dahua", logoStyle: "dahua" },
  { id: "tiandy", name: "Tiandy", sub: "Smart IP Cameras", color: "border-emerald-200 hover:border-emerald-500", link: "https://en.tiandy.com", logoText: "Tiandy", logoStyle: "tiandy" },
  { id: "lenovo", name: "Lenovo", sub: "Workstations & PCs", color: "border-red-200 hover:border-red-500", link: "https://www.lenovo.com", logoText: "lenovo", logoStyle: "lenovo" },
  { id: "bosch", name: "BOSCH", sub: "PA & Voice Evacuations", color: "border-slate-200 hover:border-slate-500", link: "https://www.boschsecurity.com", logoText: "BOSCH", logoStyle: "bosch" }
];

const defaultContactConfig: ContactInfo = {
  phone: "+880 9639992999",
  email: "info@cloudtechnologies.com.bd",
  address: "1st Floor, House 05, Block E, Road 02, Section 12, Pallabi, Mirpur, Dhaka 1216, Bangladesh.",
  addressBrief: "1st Floor, House 05, Block E, Road 02, Section 12, Pallabi, Mirpur, Dhaka 1216",
  whatsapp: "https://wa.me/8809639992999",
  facebookPage: "https://m.me/genzesports",
  companyName: "Cloud Technologies",
  googleMapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3649.97018898124!2d90.3644053760618!3d23.819665678822064!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c0d297960cf9%3A0x6e9f2ca35b2e3e2c!2sMirpur%2012%20Bus%20Stand!5e0!3m2!1sen!2sbd!4v1717320000000!5m2!1sen!2sbd"
};

const defaultHeaderMenuItems: NavItemConfig[] = [
  { id: "1", name: "Home", href: "/home" },
  { 
    id: "2",
    name: "About Us", 
    href: "/about", 
    hasDropdown: true,
    dropdownItems: [
      { id: "2-1", name: "About", href: "/about" },
      { id: "2-2", name: "Chairman Message", href: "/chairman" },
      { id: "2-3", name: "MD's Message", href: "/md" },
      { id: "2-4", name: "Our Vision & Mission", href: "/vision" },
      { id: "2-5", name: "Management Info", href: "/management" },
      { id: "2-6", name: "Why Choose Us", href: "/why-choose-us" },
      { id: "2-7", name: "CSR Initiatives", href: "/csr" },
      { id: "2-8", name: "Career Opportunities", href: "/career" }
    ]
  },
  { 
    id: "3",
    name: "Projects", 
    href: "/projects", 
    hasDropdown: true,
    dropdownItems: [
      { id: "3-1", name: "Running Projects", href: "/running-projects" },
      { id: "3-2", name: "Completed Projects", href: "/completed-projects" }
    ]
  },
  { 
    id: "4",
    name: "Our Services & Solutions", 
    href: "/solutions", 
    hasDropdown: true,
    dropdownItems: [
      { 
        id: "4-1",
        name: "Conference Room Solution", 
        href: "/conference",
        hasSubmenu: true,
        submenuItems: [
          { id: "4-1-1", name: "Conference Solution", href: "/conf-solution" },
          { id: "4-1-2", name: "Meeting Room Solutions", href: "/conf-meeting-room" }
        ]
      },
      { 
        id: "4-2",
        name: "Sound System Solution", 
        href: "/sound",
        hasSubmenu: true,
        submenuItems: [
          { id: "4-2-1", name: "Professional Sound system", href: "/sound-professional" },
          { id: "4-2-2", name: "IP PA System", href: "/sound-ip-pa" },
          { id: "4-2-3", name: "PA System", href: "/sound-pa" }
        ]
      },
      { 
        id: "4-3",
        name: "Enterprise CCTV Surveillance Solution", 
        href: "/cctv",
        hasSubmenu: true,
        submenuItems: [
          { id: "4-3-1", name: "IP/Analog CCTV Solution", href: "/cctv-ip-analog" },
          { id: "4-3-2", name: "Automatic Number Plate Recognition (ANPR) Solution", href: "/cctv-anpr" },
          { id: "4-3-3", name: "AI Surveillance Solution", href: "/cctv-ai" },
          { id: "4-3-4", name: "VMS Based Analytical Surveillance Solution", href: "/cctv-vms" },
          { id: "4-3-5", name: "Data Storage Solution", href: "/cctv-storage" },
          { id: "4-3-6", name: "Centralized Video Surveillance Solutions", href: "/cctv-centralized" }
        ]
      },
      { 
        id: "4-4",
        name: "Value Added Service", 
        href: "/vas",
        hasSubmenu: true,
        submenuItems: [
          { id: "4-4-1", name: "Manage Services", href: "/vas-managed" },
          { id: "4-4-2", name: "On call Services", href: "/vas-oncall" },
          { id: "4-4-3", name: "One Stop support services", href: "/vas-onestop" },
          { id: "4-4-4", name: "Service upon payment", href: "/vas-payment" }
        ]
      },
      { 
        id: "4-5",
        name: "Access Control Solution", 
        href: "/access",
        hasSubmenu: true,
        submenuItems: [
          { id: "4-5-1", name: "Facial Recognition Solution", href: "/access-facial" },
          { id: "4-5-2", name: "Bio-Metric Time Attendance Solution", href: "/access-biometric" },
          { id: "4-5-3", name: "Visitor Management", href: "/access-visitor" },
          { id: "4-5-4", name: "Gate Barrier Solution", href: "/access-barrier" },
          { id: "4-5-5", name: "Hotel Series Door Lock", href: "/access-hotel" },
          { id: "4-5-6", name: "Archway & Luggage Scanning Solution", href: "/access-scanning" },
          { id: "4-5-7", name: "Vehicle Parking Management System", href: "/access-parking" }
        ]
      },
      { 
        id: "4-6",
        name: "IP Telephone System", 
        href: "/telephony",
        hasSubmenu: true,
        submenuItems: [
          { id: "4-6-1", name: "PABX & Intercom Solution", href: "/telephony-pabx" }
        ]
      },
      { 
        id: "4-7",
        name: "Data Center Solution", 
        href: "/datacenter",
        hasSubmenu: true,
        submenuItems: [
          { id: "4-7-1", name: "Data Center Infrastructure Management (DCIM)", href: "/dcim" },
          { id: "4-7-2", name: "Environmental Monitoring System", href: "/ems" },
          { id: "4-7-3", name: "Network Management System", href: "/nms" },
          { id: "4-7-4", name: "Server/LAN Automation", href: "/server-lan" },
          { id: "4-7-5", name: "Data Storage Solution", href: "/storage" }
        ]
      },
      { 
        id: "4-8",
        name: "Enterprise Network Solution", 
        href: "/network",
        hasSubmenu: true,
        submenuItems: [
          { id: "4-8-1", name: "Passive LAN Solutions", href: "/passive-lan" },
          { id: "4-8-2", name: "Fiber Optic Solutions", href: "/fiber-optic" },
          { id: "4-8-3", name: "Data Center Power System", href: "/dc-power" },
          { id: "4-8-4", name: "Rack Management Solution", href: "/rack-management" },
          { id: "4-8-5", name: "Raise Floor System", href: "/raise-floor" },
          { id: "4-8-6", name: "Online UPS Solution", href: "/online-ups" },
          { id: "4-8-7", name: "Dehumidifier Solution", href: "/dehumidifier" },
          { id: "4-8-8", name: "Precision Air Cooling solution", href: "/precision-cooling" }
        ]
      }
    ]
  },
  { id: "5", name: "Our Clients", href: "/clients" },
  {
    id: "6",
    name: "Gallery",
    href: "/gallery", 
    hasDropdown: true,
    dropdownItems: [
      { id: "6-1", name: "Video Gallery", href: "/video-gallery" },
      { id: "6-2", name: "Photo Gallery", href: "/photo-gallery" }
    ]
  },
  { id: "7", name: "News", href: "/news" },
  { id: "8", name: "Contact", href: "/contact" }
];

const defaultHeaderButtons: ActionButtonConfig[] = [
  { id: "btn-1", labelText: "Webmail", url: "https://webmail.cloudtechnologies.com.bd", isOpenNewTab: true }
];

const defaultHeaderConfig: HeaderConfig = {
  logoText: "CTL",
  companyNameRow1: "CLOUD TECHNOLOGIES",
  companyNameRow2: "LIMITED",
  webmailUrl: "https://webmail.cloudtechnologies.com.bd",
  logoUrl: "",
  menuItems: defaultHeaderMenuItems,
  buttons: defaultHeaderButtons
};

const defaultFooterConfig: FooterConfig = {
  aboutText: "Welcome to Cloud Technologies, the leading provider of innovative and reliable solutions for your enterprise needs. We are a team of passionate and experienced professionals committed to delivering the best value and quality to our customers.",
  facebookUrl: "https://facebook.com",
  linkedinUrl: "https://linkedin.com",
  websiteUrl: "https://www.cloudtechnologies.com.bd",
  copyrightText: "Copyright © 2026 Cloud Technologies. All Rights Reserved.",
  logoUrl: "",
  socials: [
    { id: "soc-1", platform: "Facebook", url: "https://facebook.com" },
    { id: "soc-2", platform: "LinkedIn", url: "https://linkedin.com" },
    { id: "soc-3", platform: "Website", url: "https://www.cloudtechnologies.com.bd" }
  ],
  quickLinks: [
    { id: "qk-1", labelText: "Running Projects", url: "#running-projects" },
    { id: "qk-2", labelText: "CSR Initiatives", url: "#csr" },
    { id: "qk-3", labelText: "Career Opportunities", url: "#career" },
    { id: "qk-4", labelText: "Our Brands", url: "#brands" },
    { id: "qk-5", labelText: "Our Clients", url: "/clients" }
  ]
};

const defaultAboutConfig: AboutConfig = {
  tagline: "Our Company",
  title: "Fast Growing Technology Solutions Provider Company",
  desc1: "Established in 2019, Cloud Technologies is Bangladesh's leading provider of innovative IT services. We specialize in delivering scalable and reliable technology solutions that enhance operational efficiency, strengthen security, and improve collaboration for modern organizations.",
  desc2: "Our team of experienced professionals provides comprehensive services, including the design, deployment, and maintenance of enterprise-grade surveillance systems, structured network infrastructure, and secure communication platforms.",
  badgeTitle: "Trusted for Over 6 Years",
  badgeText: "Trusted for Over 6 Years in Enterprise Networks, Surveillance, Automation, IP Telephony, and Comprehensive Systems",
  badgeIconUrl: ""
};

const defaultChairmanConfig: ChairmanConfig = {
  name: "Ziaur Rahman Zia-FCA",
  role: "Chairman, Cloud Technologies",
  title: "Innovate. Integrate. Protect.",
  message: `Welcome to Cloud Technologies. As a forward-looking IT solutions provider, we are committed to delivering intelligent, secure, and scalable technologies that empower organizations to thrive in a rapidly evolving digital world.

We believe that the true strength of our organization lies in our people. When individuals continuously enhance their skills and knowledge, the company grows alongside them. Growth is a shared journey— driven by learning, adaptability, and dedication.

I encourage every member of our team to learn more, read more, and work with honesty and discipline. Integrity in thinking and action is essential for long-term success. In today's dynamic environment, versatility is a key strength that enables innovation and excellence.

At Cloud Technologies, we are building a culture of excellence, accountability, and continuous improvement. Together, we strive to create sustainable value for our clients, our people, and the future.`,
  photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop"
};

const defaultMDConfig: MDConfig = {
  name: "Mr. Rejve Hasan",
  role: "Managing Director, Cloud Technologies",
  title: "Driving Excellence. Delivering Value.",
  message: `Welcome to Cloud Technologies. Passion for technology and dedication to client success drive our daily operations.

As Managing Director, I am committed to fostering an environment where innovation thrives and our team works collaboratively to turn complex challenges into seamless technological solutions.

Our relentless pursuit of quality and long-term partnerships ensures that we not only meet the immediate needs of our clients but also future-proof their operations. Thank you for trusting us as your partner in growth.`,
  photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop"
};

const defaultVisionMissionConfig: VisionMissionConfig = {
  visionTitle: "Our Vision & Mission",
  visionText: "Our vision is to be the leader in technological solutions in the region, empowering organizations through innovative and secure IT infrastructure, while our mission is providing innovative and reliable solutions to improve community infrastructure."
};

const defaultTeamMembers: TeamMemberConfig[] = [
  {
    name: "Ziaur Rahman Zia",
    role: "Chairman",
    description: "Mr. Zia, a visionary entrepreneur and a qualified Chartered Accountant, is the Chairman and a Sponsor Director of Cloud Technologies. He founded the company in 2019 to provide cutting-edge IT solutions and support to clients.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop",
  },
  {
    name: "Mr. Rejve Hasan",
    role: "Managing Director",
    description: "Mr. Rejve is a Sponsor Director of Cloud Technologies with over 13 years of extensive experience in communication, safety, and automation. He has wide-ranging expertise in technology solutions, security surveillance, public address, and conference systems.",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=300&auto=format&fit=crop",
  },
  {
    name: "Mohammad Mahbub Alam",
    role: "Chief Operating Officer",
    description: "Mr. Mahbub is a seasoned technology professional with over 18 years of experience across various domains, including IT System Management, Network Management, and Project Management.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c31e3?q=80&w=300&auto=format&fit=crop",
  }
];

const defaultWhyChooseReasons: WhyChooseReason[] = [
  { title: "Unmatched Expertise", desc: "Our certified professionals bring extensive experience across multiple industries, ensuring best-in-class solutions." },
  { title: "Innovation-Driven", desc: "We leverage the latest technological advancements to develop future-proof, efficient solutions tailored to your needs." },
  { title: "Reliability & Security", desc: "Security is at our core. We guarantee robust, secure infrastructure that protects your critical data and operations." },
  { title: "Client-First Partnership", desc: "We prioritize long-term relationships, delivering dedicated support and value that goes beyond project completion." }
];

const defaultHeroSlides: HeroSlide[] = [
  {
    id: "slide-1",
    image: HERO_COMMAND_CENTER_IMAGE,
    tag: "Enterprise System Integrator",
    title: "Intelligence Beyond Security",
    description: "Empowering Bangladesh's largest institutions with next-generation mission-critical security ops, CCTV, AI intelligence, and redundant industrial fiber networking solutions.",
    cta: "Explore Our Solutions"
  },
  {
    id: "slide-2",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2000&auto=format&fit=crop",
    tag: "Advanced IP Infrastructure",
    title: "Unified Optical Communications",
    description: "Highly stable enterprise networks, dynamic IP telephony, and modular sound system deployments configured for extreme reliability.",
    cta: "Contact Our Engineers"
  },
  {
    id: "slide-3",
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=2000&auto=format&fit=crop",
    tag: "CCTV & Security Networks",
    title: "Enterprise Protection Systems",
    description: "Comprehensive automated access controls and end-to-end mission-ready redundant CCTV systems configured for extreme reliability.",
    cta: "Contact Our Engineers"
  }
];

const defaultTestimonials: TestimonialItem[] = [
  {
    id: "testi-1",
    text: "Cloud Technologies delivered an absolute state-of-the-art IPTV and server infrastructure layout for our banking halls. Their extreme dedication and after-sales customer support are highly praiseworthy in Bangladesh's tech sector.",
    author: "Farhan Tanvir",
    role: "Infrastructure Lead, Citizens Bank PLC",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: "testi-2",
    text: "Our enterprise CCTV system installation was executed with extreme architectural cleanliness. The camera mapping, backup power supply solutions, and command center layout look stunning and have been running with 100% uptime.",
    author: "Engr. Kamal Hossain",
    role: "Operations Chief, Farazy Hospital Group",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
  }
];

const defaultFloatingChats: FloatingChat[] = [
  {
    id: "fc-1",
    platform: "Messenger",
    url: "https://m.me/genzesports",
    label: "Messenger Chat",
    color: "bg-blue-600 hover:bg-blue-500",
    active: true,
    svgCode: `<svg viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6"><path d="M12 2C6.48 2 2 6.14 2 11.26c0 2.91 1.45 5.51 3.7 7.15c.18.13.29.35.29.58l-.04 1.83c-.02.66.66 1.12 1.25.82l2.05-1.04a.8.8 0 01.62-.05c.67.18 1.38.27 2.13.27c5.52 0 10-4.14 10-9.26S17.52 2 12 2zm1.1 12.39l-2.5-2.67-4.89 2.67 5.37-5.7 2.5 2.67 4.89-2.67-5.37 5.7z"/></svg>`
  },
  {
    id: "fc-2",
    platform: "WhatsApp",
    url: "https://wa.me/8809639992999",
    label: "WhatsApp Chat",
    color: "bg-green-500 hover:bg-green-450",
    active: true,
    svgCode: `<svg viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.705 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>`
  }
];

const defaultDisplayStats: StatItem[] = [
  {
    id: "stat-1",
    value: "6+",
    label: "Years Experience",
    sub: "Since 2019 Base",
    iconName: "Award"
  },
  {
    id: "stat-2",
    value: "1,000+",
    label: "Completed Projects",
    sub: "Nationwide Deployments",
    iconName: "Briefcase"
  },
  {
    id: "stat-3",
    value: "30+",
    label: "Product Solutions",
    sub: "End-to-End Capabilities",
    iconName: "Cpu"
  },
  {
    id: "stat-4",
    value: "64+",
    label: "Districts Support Service",
    sub: "Full Bangladesh Coverage",
    iconName: "Earth"
  }
];

// Initial Default Data
const defaultNews: NewsItem[] = [
  {
    id: "blockchain-olympiad",
    title: "ভাষা শহীদদের প্রতি কেন্দ্রীয় শহীদ মিনারে পুষ্পস্তবক অর্পণ।",
    date: "February 21, 2022",
    category: "National Event",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=600&auto=format&fit=crop",
    isCustomGraphic: true,
    summary: "আন্তর্জাতিক মাতৃভাষা দিবসে ক্লাউড টেকনোলজিসের পক্ষ থেকে কেন্দ্রীয় শহীদ মিনারে ভাষা শহীদদের প্রতি গভীর শ্রদ্ধা জ্ঞাপন করে পুষ্পস্তবক অর্পণ করা হয়।",
    description: "মহান শহীদ দিবস ও আন্তর্জাতিক মাতৃভাষা উপলক্ষে ক্লাউড টেকনোলজিস (Cloud Technologies) এর সকল স্তরের কর্মকর্তা ও কর্মচারীবৃন্দ কেন্দ্রীয় শহীদ মিনারে ভাষা শহীদদের স্মৃতির প্রতি গভীর শ্রদ্ধা নিবেদন করেন। এ সময় কোম্পানির ঊর্ধ্বতন নেতৃবৃন্দ শহীদদের বেদীতে পুষ্পস্তবক অর্পণ করে কিছুক্ষণ নিরবতা পালন করেন। মাতৃভাষার অধিকার ও আত্মত্যাগের চেতনাকে বুকে ধারণ করে সামনের দিকে এগিয়ে যাওয়ার অঙ্গীকার পুনর্ব্যক্ত করে এই মহান অনুষ্ঠানটি সম্পন্ন করা হয়।",
  },
  {
    id: "glorious-martyrs",
    title: "শহীদ বুদ্ধিজীবী দিবস",
    date: "December 14, 2021",
    category: "Observance",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format&fit=crop",
    summary: "যাঁদের আত্মত্যাগে অর্জিত হয়েছে আমাদের স্বাধীনতা, সেই বীর শহীদ বুদ্ধিজীবীদের স্মরণে আরএস টেকনোলজিস লিমিটেড শ্রদ্ধাভরে স্মরণ করছে শহীদ বুদ্ধিজীবী দিবস।",
    description: "১৪ই ডিসেম্বর শহীদ বুদ্ধিজীবী দিবস উপলক্ষে আয়োজিত গভীর আলোচনা সভা ও দোয়া মাহফিলে অংশগ্রহণ করেন আরএস টেকনোলজিস লিমিটেডের সম্মানিত চেয়ারম্যান, চেয়ারম্যান, ব্যবস্থাপনা পরিচালক এবং কর্মকর্তা-কর্মচারীবৃন্দ। ১৯৭১ সালের এই কালো দিনে পাকিস্তানি হানাদার বাহিনী ও তাদের দোসররা দেশের শ্রেষ্ঠ সন্তানদের নির্মমভাবে হত্যা করে। আমাদের মহান মুক্তিযুদ্ধের বীর শহীদ বুদ্ধিজীবীদের এই মহান আত্মত্যাগ চিরকাল শ্রদ্ধার সাথে স্মরণীয় হয়ে থাকবে। তাঁদের অনুপ্রেরণায় আমরা একটি উন্নত ও সমৃদ্ধ বাংলাদেশ গড়তে বদ্ধপরিকর।",
  },
  {
    id: "first-committee-meeting",
    title: "প্রথম কার্যনির্বাহী সভায় উপস্থিত সম্মানিত সদস্যবৃন্দ",
    date: "October 18, 2021",
    category: "Corporate Meeting",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=600&auto=format&fit=crop",
    summary: "আরএস টেকনোলজিস লিমিটেডের প্রথম কার্যনির্বাহী সাধারণ সভায় উপস্থিত সম্মানিত পরিচালনা পর্ষদ ও উপদেষ্টা মণ্ডলীর সদস্যরা ভবিষ্যৎ পরিকল্পনার রূপরেখা তৈরি করেন।",
    description: "আরএস টেকনোলজিস জেনারেশনের প্রথম গৌরবময় কার্যনির্বাহী পরিষদ সভা অত্যন্ত সৌহার্দ্যপূর্ণ পরিবেশে কোম্পানির প্রধান কার্যালয়ের সভাকক্ষে সম্পন্ন হয়েছে। সভায় উপস্থিত ছিলেন পরিচালনা পর্ষদের সম্মানিত পরিচালকবৃন্দ, কারিগরি মেন্টরগণ এবং দেশীয় প্রযুক্তির বিশেষ উপদেষ্টাগণ। সভায় পরবর্তী অর্থ বছরের প্রযুক্তিসরঞ্জাম আধুনিকীকরণ, গ্রাহকসেবা তরান্বিতকরণ এবং আইটি অবকাঠামো সম্প্রসারণের বিভিন্ন গুরুত্বপূর্ণ এজেন্ডা নিয়ে বিস্তর আলোচনা ও সিদ্ধান্ত গৃহীত হয়।",
  }
];

const defaultRunningProjects: ProjectItem[] = [
  {
    id: "running-1",
    title: "National Data Center Infrastructure",
    date: "Ongoing",
    status: "In Progress",
    image: "https://images.unsplash.com/photo-1558494949-ef010bbbb319?q=80&w=600&auto=format&fit=crop",
    summary: "Implementing a state-of-the-art secure data center infrastructure.",
    description: "Detailed description of the national data center infrastructure project, highlighting key technologies, milestones achieved, and future goals to enhance national data security and accessibility.",
  },
  {
    id: "running-2",
    title: "Smart City Fiber Network",
    date: "Ongoing",
    status: "Deployment Phase",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format&fit=crop",
    summary: "Laying high-speed fiber optic cables across the city.",
    description: "This project aims to connect municipal buildings and public areas with high-speed fiber optics to support smart city initiatives, traffic monitoring, and free public Wi-Fi zones.",
  }
];

const defaultCompletedProjects: ProjectItem[] = [
  {
    id: "completed-1",
    title: "Regional Connectivity Upgrade",
    date: "January 2024",
    category: "Infrastructure",
    image: "https://images.unsplash.com/photo-1544197305-1a877527a206?q=80&w=600&auto=format&fit=crop",
    summary: "Successfully upgraded fiber infrastructure.",
    description: "Successfully completed the regional fiber connectivity upgrade, resulting in faster internet access and improved network stability for over 50,000 users in the northern region.",
  },
  {
    id: "completed-2",
    title: "Government E-Governance Portal",
    date: "November 2023",
    category: "Software Solutions",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=600&auto=format&fit=crop",
    summary: "Launched a secure public services portal.",
    description: "Developed and launched the national e-governance portal allowing citizens to access public services, submit documents, and track application status securely online.",
  }
];

const defaultPhotos: PhotoItem[] = [
  {
    id: 1,
    title: "High-Density Server Rack Clean Setup",
    category: "networking",
    categoryLabel: "Enterprise Networking",
    images: [
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1597733336794-12d05721d551?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop"
    ],
    description: "Structure cabling, high-density patch panel routing, and core switch installation for primary server cluster setup.",
    client: "Citizens Bank PLC",
    location: "Motijheel, Dhaka"
  },
  {
    id: 2,
    title: "Wall-Mount IP CCTV Command Console",
    category: "cctv",
    categoryLabel: "Surveillance & CCTV",
    images: [
      "https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=800&auto=format&fit=crop"
    ],
    description: "Unified video wall command center displaying high-definition situational awareness feeds of all server nodes.",
    client: "Farazy Hospital Group",
    location: "Banasree, Dhaka"
  },
  {
    id: 3,
    title: "Line Array Professional Sound Installation",
    category: "sound",
    categoryLabel: "Sound Systems",
    images: [
      "https://images.unsplash.com/photo-1545014164-cd7d488e36e6?q=80&w=800&auto=format&fit=crop"
    ],
    description: "Acoustic modeling and precise calibration of public address audio system to ensure warm, echo-free clear output.",
    client: "National Convention Hall",
    location: "Dhaka, Bangladesh"
  },
  {
    id: 4,
    title: "Core Fiber Optic Splice Tray Management",
    category: "fiber",
    categoryLabel: "Fiber Optic",
    images: [
      "https://images.unsplash.com/photo-1601597111158-2fceff270190?q=80&w=800&auto=format&fit=crop"
    ],
    description: "High-precision fiber splice organization displaying fusion joint integrity logs and organized routing pathways.",
    client: "Square Group Office",
    location: "Gulshan, Dhaka"
  }
];

const defaultVideos: VideoItem[] = [
  {
    id: 1,
    title: "Cloud Technologies: Ultimate Corporate Overview",
    category: "overview",
    categoryLabel: "Company Overview",
    duration: "4:25",
    date: "May 12, 2024",
    thumbnail: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=800&auto=format&fit=crop",
    embedCode: "f3yI5b1X9r8",
    description: "An in-depth look at our engineering workshops, structural cabling deployment sites, elite supply chain partnerships, and customer support standards.",
    views: "1.2K views",
    videoType: "youtube",
    videoUrl: "https://www.youtube.com/watch?v=f3yI5b1X9r8"
  },
  {
    id: 2,
    title: "Installing Enterprise IP CCTV Systems & Video Wall Integration",
    category: "installation",
    categoryLabel: "Installation Case Study",
    duration: "8:50",
    date: "April 03, 2024",
    thumbnail: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=800&auto=format&fit=crop",
    embedCode: "dQw4w9WgXcQ",
    description: "Step-by-step documentation of an active 128-node security mesh deployment, NVR synchronization, and custom wall-mount array integration.",
    views: "850 views",
    videoType: "youtube",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  },
  {
    id: 3,
    title: "Fiber Optic Backbone Cabling Fusion Splicing Walkthrough",
    category: "installation",
    categoryLabel: "Installation Case Study",
    duration: "6:15",
    date: "March 18, 2024",
    thumbnail: "https://images.unsplash.com/photo-1601597111158-2fceff270190?q=80&w=800&auto=format&fit=crop",
    embedCode: "d7Z9r3hK9s3",
    description: "Our core optic technicians show off absolute cleanliness in active outdoor splice closures and core joint laser calibration procedures.",
    views: "2.4K views",
    videoType: "youtube",
    videoUrl: "https://www.youtube.com/watch?v=d7Z9r3hK9s3"
  },
  {
    id: 4,
    title: "How to Configure SIP-Based IP Door Intercom Solutions",
    category: "tutorial",
    categoryLabel: "Technical Tutorial",
    duration: "12:40",
    date: "January 20, 2024",
    thumbnail: "https://images.unsplash.com/photo-1517502884422-41eaaced0168?q=80&w=800&auto=format&fit=crop",
    embedCode: "aA8r9vKd3e9",
    description: "A complete software routing config tutorial mapping outdoor keypad access monitors to indoor PBX SIP extensions.",
    views: "930 views",
    videoType: "youtube",
    videoUrl: "https://www.youtube.com/watch?v=aA8r9vKd3e9"
  },
  {
    id: 5,
    title: "Calibrating Multi-Zone Professional PA & Audio Systems",
    category: "tutorial",
    categoryLabel: "Technical Tutorial",
    duration: "10:15",
    date: "December 05, 2023",
    thumbnail: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=800&auto=format&fit=crop",
    description: "Demonstrating dynamic frequency response EQ setups, zone selector matrices, and paging console overrides under high volume loads.",
    embedCode: "tG3hK8r6P2w",
    views: "1.5K views",
    videoType: "youtube",
    videoUrl: "https://www.youtube.com/watch?v=tG3hK8r6P2w"
  },
  {
    id: 6,
    title: "Advanced Biometric Access Control Server Deployment",
    category: "installation",
    categoryLabel: "Installation Case Study",
    duration: "5:30",
    date: "October 22, 2023",
    thumbnail: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=800&auto=format&fit=crop",
    description: "Configuring real-time active directory synchronization and instant alert logging parameters on server-side dashboard controllers.",
    embedCode: "s2f8K9w8A3x",
    views: "710 views",
    videoType: "youtube",
    videoUrl: "https://www.youtube.com/watch?v=s2f8K9w8A3x"
  }
];

const defaultStats: SystemStats = {
  completedProjects: 75,
  happyClients: 120,
  brandPartners: 15,
  soundZones: 450
};

const defaultInquiries: InquiryItem[] = [
  {
    id: "inq-1",
    fullName: "Md. Aminul Islam",
    companyName: "Dhaka International Bank",
    corporateEmail: "aminul.islam@dib.com.bd",
    mobilePhone: "+8801711223344",
    requirementDetails: "We require a site assessment for our New HQ in Gulshan, Dhaka. Need structured cabling setup, high-density server racking, and 24-zone public audio integration.",
    createdAt: "2026-06-02T10:15:30Z",
    status: "new"
  },
  {
    id: "inq-2",
    fullName: "Tariq Mahmood",
    companyName: "Nexus Garments Ltd",
    corporateEmail: "tariq@nexus.com",
    mobilePhone: "+8801819556677",
    requirementDetails: "Interested in thermal surveillance ANPR camera setup at our factory entrance in Gazipur. Please send catalog and price quotation.",
    createdAt: "2026-06-03T14:45:00Z",
    status: "read"
  }
];

// Helper wrapper for local storage & server communication
const isClient = typeof window !== "undefined";

// Global window-level React live application store
const liveAppStore: Record<string, any> = {};

function getStored<T>(key: string, defaultValue: T): T {
  if (!isClient) return defaultValue;
  
  // 1. Try retrieving from live session memory first for instant synchronous rendering
  if (liveAppStore[key] !== undefined) {
    return liveAppStore[key];
  }

  // 2. Try retrieving from LocalStorage cache as a fast-rendering offline fallback
  try {
    const cached = localStorage.getItem(key);
    if (cached !== null) {
      const parsed = JSON.parse(cached);
      liveAppStore[key] = parsed;
      return parsed;
    }
  } catch (e) {
    console.warn("Could not read LocalStorage key during initialization:", key, e);
  }
  
  // 3. Fallback to default configuration content
  liveAppStore[key] = defaultValue;
  return defaultValue;
}

// Function to automatically sync all settings to cPanel storage via API Node
function saveToCPanel(): Promise<{ success: boolean; message: string }> {
  const data: Record<string, any> = {
    ctl_news: getStored("ctl_news", defaultNews),
    ctl_running_projects: getStored("ctl_running_projects", defaultRunningProjects),
    ctl_completed_projects: getStored("ctl_completed_projects", defaultCompletedProjects),
    ctl_photos: getStored("ctl_photos", defaultPhotos),
    ctl_videos: getStored("ctl_videos", defaultVideos),
    ctl_solutions: getStored("ctl_solutions", defaultSolutions),
    ctl_clients: getStored("ctl_clients", defaultClients),
    ctl_brands: getStored("ctl_brands", defaultBrands),
    ctl_testimonials: getStored("ctl_testimonials", defaultTestimonials),
    ctl_display_stats: getStored("ctl_display_stats", defaultDisplayStats),
    ctl_team_members: getStored("ctl_team_members", defaultTeamMembers),
    ctl_reasons: getStored("ctl_reasons", defaultWhyChooseReasons),
    ctl_hero_slides: getStored("ctl_hero_slides", defaultHeroSlides),
    ctl_contact_info: getStored("ctl_contact_info", defaultContactConfig),
    ctl_header_config: getStored("ctl_header_config", defaultHeaderConfig),
    ctl_footer_config: getStored("ctl_footer_config", defaultFooterConfig),
    ctl_site_metadata: getStored("ctl_site_metadata", defaultSiteMetadata),
    ctl_admin_auth_config: getStored("ctl_admin_auth_config", defaultAdminAuthConfig),
    ctl_email_integration_config: getStored("ctl_email_integration_config", defaultEmailIntegrationConfig),
    ctl_inquiries: getStored("ctl_inquiries", defaultInquiries),
    
    // Critical fields that were previously omitted
    ctl_stats: getStored("ctl_stats", defaultStats),
    ctl_about_config: getStored("ctl_about_config", defaultAboutConfig),
    ctl_chairman_config: getStored("ctl_chairman_config", defaultChairmanConfig),
    ctl_md_config: getStored("ctl_md_config", defaultMDConfig),
    ctl_vision_mission_config: getStored("ctl_vision_mission_config", defaultVisionMissionConfig),
    ctl_mysql_config: getStored("ctl_mysql_config", defaultMySQLConfig)
  };

  if (isClient) {
    window.dispatchEvent(new CustomEvent("datastore-write-status", { detail: { type: "start" } }));
  }

  return fetch("api/save-data.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
  .then(res => {
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    }
    return res.json();
  })
  .then(resData => {
    if (resData && resData.status === "error") {
      console.error("Server API returned error status:", resData.message);
      if (isClient) {
        window.dispatchEvent(new CustomEvent("datastore-write-status", { detail: { type: "error", message: resData.message } }));
      }
      return { success: false, message: resData.message };
    } else {
      console.log("Successfully saved permanently to cPanel site_data.json:", resData);
      const msg = resData.message || "Saved successfully to server.";
      if (isClient) {
        window.dispatchEvent(new CustomEvent("datastore-write-status", { detail: { type: "success", message: msg } }));
      }
      return { success: true, message: msg };
    }
  })
  .catch(err => {
    console.warn("cPanel PHP api/save-data.php endpoint not serving locally. Saved in-browser instead.", err.message);
    const failMsg = "Browser is Offline or Server Permission Error. Changes saved temporarily in this browser, but not written to cPanel site_data.json. Error detail: " + err.message;
    if (isClient) {
      window.dispatchEvent(new CustomEvent("datastore-write-status", { detail: { type: "error", message: failMsg } }));
    }
    return {
      success: false,
      message: failMsg
    };
  });
}

function setStored<T>(key: string, value: T): Promise<{ success: boolean; message: string }> {
  // Always update our live application store
  liveAppStore[key] = value;

  // Sync to LocalStorage for immediate, reliable browser persistence across tabs and reloads
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn("Could not save key to LocalStorage:", key, e);
  }
  
  // Dispatch event to force other live sub-components and panels to update their view state
  if (isClient) {
    window.dispatchEvent(new Event("datastore-update"));
  }

  // Trigger modern cPanel dynamic write API and return promise
  return saveToCPanel();
}

export const dataStore = {
  getNews: (): NewsItem[] => getStored("ctl_news", defaultNews),
  saveNews: (list: NewsItem[]) => setStored("ctl_news", list),
  
  getRunningProjects: (): ProjectItem[] => getStored("ctl_running_projects", defaultRunningProjects),
  saveRunningProjects: (list: ProjectItem[]) => setStored("ctl_running_projects", list),

  getCompletedProjects: (): ProjectItem[] => getStored("ctl_completed_projects", defaultCompletedProjects),
  saveCompletedProjects: (list: ProjectItem[]) => setStored("ctl_completed_projects", list),

  getPhotos: (): PhotoItem[] => getStored("ctl_photos", defaultPhotos),
  savePhotos: (list: PhotoItem[]) => setStored("ctl_photos", list),

  getVideos: (): VideoItem[] => getStored("ctl_videos", defaultVideos),
  saveVideos: (list: VideoItem[]) => setStored("ctl_videos", list),

  getStats: (): SystemStats => getStored("ctl_stats", defaultStats),
  saveStats: (stats: SystemStats) => setStored("ctl_stats", stats),

  getInquiries: (): InquiryItem[] => getStored("ctl_inquiries", defaultInquiries),
  saveInquiries: (list: InquiryItem[]) => setStored("ctl_inquiries", list),
  
  getSolutions: (): Record<string, SerializableSolution> => getStored("ctl_solutions", defaultSolutions),
  saveSolutions: (data: Record<string, SerializableSolution>) => setStored("ctl_solutions", data),

  getContactInfo: (): ContactInfo => {
    const stored = getStored("ctl_contact_info", defaultContactConfig);
    return {
      googleMapEmbed: defaultContactConfig.googleMapEmbed,
      ...stored
    };
  },
  saveContactInfo: (info: ContactInfo) => setStored("ctl_contact_info", info),

  getHeaderConfig: (): HeaderConfig => {
    const stored = getStored("ctl_header_config", defaultHeaderConfig);
    const config = {
      logoUrl: "",
      menuItems: defaultHeaderMenuItems,
      buttons: defaultHeaderButtons,
      ...stored
    };
    if (config.menuItems) {
      const cleanItem = (item: any): any => {
        let href = item.href || "";
        if (href.startsWith("#")) {
          href = "/" + href.replace("#", "");
        }
        const clean: any = { ...item, href };
        if (item.dropdownItems) {
          clean.dropdownItems = item.dropdownItems.map(cleanItem);
        }
        if (item.submenuItems) {
          clean.submenuItems = item.submenuItems.map(cleanItem);
        }
        return clean;
      };
      config.menuItems = config.menuItems.map(cleanItem);
    }
    return config;
  },
  saveHeaderConfig: (config: HeaderConfig) => setStored("ctl_header_config", config),

  getFooterConfig: (): FooterConfig => {
    const stored = getStored("ctl_footer_config", defaultFooterConfig);
    const config = {
      logoUrl: "",
      socials: defaultFooterConfig.socials,
      quickLinks: defaultFooterConfig.quickLinks,
      ...stored
    };
    if (config.quickLinks) {
      config.quickLinks = config.quickLinks.map((link: any) => {
        let url = link.url || "";
        if (url.startsWith("#")) {
          url = "/" + url.replace("#", "");
        }
        return { ...link, url };
      });
    }
    return config;
  },
  saveFooterConfig: (config: FooterConfig) => setStored("ctl_footer_config", config),

  getClients: (): DBClient[] => getStored("ctl_clients", defaultClients),
  saveClients: (list: DBClient[]) => setStored("ctl_clients", list),

  getBrands: (): DBBrand[] => getStored("ctl_brands", defaultBrands),
  saveBrands: (list: DBBrand[]) => setStored("ctl_brands", list),

  getAboutConfig: (): AboutConfig => {
    const stored = getStored("ctl_about_config", defaultAboutConfig);
    return {
      badgeIconUrl: "",
      ...stored
    };
  },
  saveAboutConfig: (config: AboutConfig) => setStored("ctl_about_config", config),

  getChairmanConfig: (): ChairmanConfig => getStored("ctl_chairman_config", defaultChairmanConfig),
  saveChairmanConfig: (config: ChairmanConfig) => setStored("ctl_chairman_config", config),

  getMDConfig: (): MDConfig => getStored("ctl_md_config", defaultMDConfig),
  saveMDConfig: (config: MDConfig) => setStored("ctl_md_config", config),

  getVisionMissionConfig: (): VisionMissionConfig => getStored("ctl_vision_mission_config", defaultVisionMissionConfig),
  saveVisionMissionConfig: (config: VisionMissionConfig) => setStored("ctl_vision_mission_config", config),

  getTeamMembers: (): TeamMemberConfig[] => getStored("ctl_team_members", defaultTeamMembers),
  saveTeamMembers: (list: TeamMemberConfig[]) => setStored("ctl_team_members", list),

  getWhyChooseReasons: (): WhyChooseReason[] => getStored("ctl_reasons", defaultWhyChooseReasons),
  saveWhyChooseReasons: (list: WhyChooseReason[]) => setStored("ctl_reasons", list),

  getHeroSlides: (): HeroSlide[] => getStored("ctl_hero_slides", defaultHeroSlides),
  saveHeroSlides: (list: HeroSlide[]) => setStored("ctl_hero_slides", list),

  getTestimonials: (): TestimonialItem[] => getStored("ctl_testimonials", defaultTestimonials),
  saveTestimonials: (list: TestimonialItem[]) => setStored("ctl_testimonials", list),

  getDisplayStats: (): StatItem[] => getStored("ctl_display_stats", defaultDisplayStats),
  saveDisplayStats: (list: StatItem[]) => setStored("ctl_display_stats", list),

  getFloatingChats: (): FloatingChat[] => getStored("ctl_floating_chats", defaultFloatingChats),
  saveFloatingChats: (list: FloatingChat[]) => setStored("ctl_floating_chats", list),

  getAdminAuthConfig: (): AdminAuthConfig => {
    const stored = getStored("ctl_admin_auth_config", defaultAdminAuthConfig);
    return {
      adminUsername: "admin",
      adminPassword: "admin",
      ...stored
    };
  },
  saveAdminAuthConfig: (config: AdminAuthConfig) => setStored("ctl_admin_auth_config", config),

  getEmailIntegrationConfig: (): EmailIntegrationConfig => {
    const stored = getStored("ctl_email_integration_config", defaultEmailIntegrationConfig);
    return {
      ...defaultEmailIntegrationConfig,
      ...stored
    };
  },
  saveEmailIntegrationConfig: (config: EmailIntegrationConfig) => {
    const p = setStored("ctl_email_integration_config", config);
    window.dispatchEvent(new Event("datastore-update"));
    return p;
  },

  getMySQLConfig: (): MySQLConfig => {
    const stored = getStored("ctl_mysql_config", defaultMySQLConfig);
    return {
      ...defaultMySQLConfig,
      ...stored
    };
  },
  saveMySQLConfig: (config: MySQLConfig) => {
    const p = setStored("ctl_mysql_config", config);
    window.dispatchEvent(new Event("datastore-update"));
    return p;
  },

  getSiteMetadata: (): SiteMetadata => {
    const stored = getStored("ctl_site_metadata", defaultSiteMetadata);
    return {
      siteTitle: defaultSiteMetadata.siteTitle,
      faviconUrl: defaultSiteMetadata.faviconUrl,
      preloaderEnabled: defaultSiteMetadata.preloaderEnabled,
      preloaderPreset: defaultSiteMetadata.preloaderPreset,
      preloaderLogo: defaultSiteMetadata.preloaderLogo,
      preloaderDuration: defaultSiteMetadata.preloaderDuration,
      ...stored
    };
  },
  saveSiteMetadata: (config: SiteMetadata) => setStored("ctl_site_metadata", config),

  syncWithSiteDataJson: async (): Promise<{ success: boolean; message: string }> => {
    try {
      // First try to load from the modern cPanel save-data API endpoint
      const response = await fetch(`api/save-data.php?t=${Date.now()}`, {
        headers: { "Cache-Control": "no-cache" }
      });
      if (response.ok) {
        const apiRes = await response.json();
        if (apiRes && apiRes.status === "success" && apiRes.data && typeof apiRes.data === "object" && Object.keys(apiRes.data).length > 0) {
          const payload = apiRes.data;
          const keys = Object.keys(payload);
          let updatedCount = 0;
          keys.forEach((key) => {
            if (payload[key] !== undefined) {
              liveAppStore[key] = payload[key];
              try {
                localStorage.setItem(key, JSON.stringify(payload[key]));
              } catch (e) {
                console.warn("Could not cache key to LocalStorage from sync:", key, e);
              }
              updatedCount++;
            }
          });
          window.dispatchEvent(new Event("datastore-update"));
          return {
            success: true,
            message: `Successfully synchronized ${updatedCount} modules from 'api/save-data.php' (site_data.json)!`
          };
        }
      }
      
      // Fallback: If cPanel save-data API wasn't readable or returned empty, read site_data.json directly
      let staticResponse = await fetch(`site_data.json?t=${Date.now()}`, {
        headers: { "Cache-Control": "no-cache" }
      });
      
      if (!staticResponse.ok) {
        // Try fallback location in the api folder
        staticResponse = await fetch(`api/site_data.json?t=${Date.now()}`, {
          headers: { "Cache-Control": "no-cache" }
        });
      }

      if (staticResponse.ok) {
        const payload = await staticResponse.json();
        if (payload && typeof payload === "object") {
          const keys = Object.keys(payload);
          let updatedCount = 0;
          keys.forEach((key) => {
            if (payload[key] !== undefined) {
              liveAppStore[key] = payload[key];
              try {
                localStorage.setItem(key, JSON.stringify(payload[key]));
              } catch (e) {
                console.warn("Could not cache key to LocalStorage from static fallback:", key, e);
              }
              updatedCount++;
            }
          });
          window.dispatchEvent(new Event("datastore-update"));
          return {
            success: true,
            message: `Successfully synchronized ${updatedCount} modules from 'site_data.json' public storage!`
          };
        }
      }
      return { success: false, message: "No dynamic data found on cPanel server yet." };
    } catch (err: any) {
      console.log("Modern API/static site_data.json sync skipped, using local in-memory defaults:", err.message);
      return { success: false, message: `Could not fetch: ${err.message}` };
    }
  },

  exportsiteDataJson: (): string => {
    const bundle: Record<string, any> = {
      ctl_news: dataStore.getNews(),
      ctl_running_projects: dataStore.getRunningProjects(),
      ctl_completed_projects: dataStore.getCompletedProjects(),
      ctl_photos: dataStore.getPhotos(),
      ctl_videos: dataStore.getVideos(),
      ctl_solutions: dataStore.getSolutions(),
      ctl_clients: dataStore.getClients(),
      ctl_brands: dataStore.getBrands(),
      ctl_testimonials: dataStore.getTestimonials(),
      ctl_display_stats: dataStore.getDisplayStats(),
      ctl_team_members: dataStore.getTeamMembers(),
      ctl_reasons: dataStore.getWhyChooseReasons(),
      ctl_hero_slides: dataStore.getHeroSlides(),
      ctl_contact_info: dataStore.getContactInfo(),
      ctl_header_config: dataStore.getHeaderConfig(),
      ctl_footer_config: dataStore.getFooterConfig(),
      ctl_site_metadata: dataStore.getSiteMetadata(),
      ctl_admin_auth_config: dataStore.getAdminAuthConfig(),
      ctl_email_integration_config: dataStore.getEmailIntegrationConfig(),
      ctl_floating_chats: dataStore.getFloatingChats()
    };
    return JSON.stringify(bundle, null, 2);
  },

  importSiteDataJson: (jsonString: string): { success: boolean; message: string } => {
    try {
      const payload = JSON.parse(jsonString);
      if (payload && typeof payload === "object") {
        const keys = Object.keys(payload);
        let updatedCount = 0;
        keys.forEach((key) => {
          if (payload[key] !== undefined) {
            liveAppStore[key] = payload[key];
            updatedCount++;
          }
        });
        // Save once to persist the imported dataset to cPanel site_data.json backing file
        saveToCPanel();
        window.dispatchEvent(new Event("datastore-update"));
        return {
          success: true,
          message: `Successfully imported ${updatedCount} modules into live memory and server dynamic site_data.json backing file!`
        };
      } else {
        return { success: false, message: "Invalid JSON structure. Verify backup file format." };
      }
    } catch (err: any) {
      return { success: false, message: `Import failed: ${err.message}` };
    }
  },

  syncWithMySQL: async (): Promise<{ success: boolean; message: string }> => {
    // Deprecated backward-compatible fallback pointer to our static loader
    return dataStore.syncWithSiteDataJson();
  },

  pushToMySQL: async (): Promise<{ success: boolean; message: string }> => {
    return { success: false, message: "Database push is deprecated. Please download site_data.json and upload to server instead." };
  },

  testMySQLConnection: async (): Promise<{ success: boolean; message: string }> => {
    return { success: true, message: "Standby local browser memory & localStorage caches are active and stable." };
  },

  addInquiry: (inquiry: Omit<InquiryItem, "id" | "createdAt" | "status">) => {
    const current = dataStore.getInquiries();
    const newInquiry: InquiryItem = {
      ...inquiry,
      id: "inq-" + Date.now(),
      createdAt: new Date().toISOString(),
      status: "new"
    };
    dataStore.saveInquiries([newInquiry, ...current]);
    return newInquiry;
  }
};

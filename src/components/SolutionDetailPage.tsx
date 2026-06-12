import React, { useState, useEffect } from "react";
import { dataStore } from "../utils/dataStore";
import PageBanner from "./PageBanner";
import ScrollReveal from "./ScrollReveal";
import { 
  ArrowRight, 
  ChevronRight, 
  Phone, 
  Mail, 
  MapPin, 
  CheckCircle2, 
  Video, 
  Volume2, 
  Eye, 
  HeartHandshake, 
  Fingerprint, 
  PhoneCall, 
  Server, 
  Network,
  Clock,
  Briefcase,
  FileText,
  Send,
  HelpCircle,
  Database,
  Activity,
  Cable,
  Zap,
  Grid,
  Battery,
  Droplets,
  Snowflake,
  Power,
  Camera,
  Cpu,
  Layers,
  Monitor,
  Users,
  Presentation,
  Mic,
  Megaphone,
  ScanFace,
  Lock,
  Shield,
  Car,
  Wrench,
  CreditCard
} from "lucide-react";

export interface Solution {
  id: string;
  title: string;
  tagline: string;
  image: string;
  icon: React.ComponentType<{ className?: string }>;
  overview: string;
  features: { title: string; desc: string }[];
  applications: string[];
  techSpecs: { label: string; value: string }[];
}

export const SOLUTIONS_DATA: Record<string, Solution> = {
  conference: {
    id: "conference",
    title: "Conference Room Solution",
    tagline: "Smart Audio-Visual & Interactive Wireless Collaboration Systems",
    image: "https://images.unsplash.com/photo-1517502884422-41eaaced0168?q=80&w=1200&auto=format&fit=crop",
    icon: Video,
    overview: "We deliver world-class corporate meeting room solutions integrating smart interactive displays, motorized high-contrast screens, high-definition camera tracking, and omnidirectional ceiling microphone arrays designed for seamless hybrid communication.",
    features: [
      { title: "Digital Interactive Boards", desc: "4K smart touchboards with real-time screen annotations, canvas saving, and dual-OS compatibility." },
      { title: "Wireless Screen Sharing", desc: "Cast multiple laptop screens or mobile devices instantly without wires or adapter cables." },
      { title: "DSP Audio Integration", desc: "Digital Signal Processing to remove room echoes, noise-floor hums, and balance voice volumes dynamically." },
      { title: "Auto PTZ Camera Tracking", desc: "Smart high-resolution cameras that automatically zoom and refocus on the active speaker in the room." },
      { title: "One-Touch Conference Launch", desc: "Native Zoom Rooms, Microsoft Teams, and Google Meet integration kits for frictionless meeting startups." },
      { title: "Acoustic Consultation", desc: "Professional acoustic board layouts and reverberation assessments to guarantee perfect vocal clarity." }
    ],
    applications: [
      "Enterprise Executive Boardrooms",
      "Medium-Sized Co-working Huddle Spaces",
      "University Lecture & Seminar Halls",
      "High-Tech Government Operations Centers",
      "Corporate Training Facilities",
      "Creative Design Studio Review Rooms"
    ],
    techSpecs: [
      { label: "Display Panels", value: "65\", 75\", 86\" 4K UHD LED Touch screens" },
      { label: "Microphones", value: "Beamforming Steerable Ceiling Microphone Arrays" },
      { label: "Camera Spec", value: "4K PTZ Camera tracking with up to 12x optical zoom" },
      { label: "Centralized Routing", value: "Multi-format matrix switchers & HDBaseT receivers" }
    ]
  },
  sound: {
    id: "sound",
    title: "Sound System Solution",
    tagline: "Professional Public Address, Background Music & Acoustic Audio Layouts",
    image: "https://images.unsplash.com/photo-1545014164-cd7d488e36e6?q=80&w=1200&auto=format&fit=crop",
    icon: Volume2,
    overview: "High-fidelity, reliable sound distribution designed for auditorium acoustics, public commercial spaces, executive corporate offices, and voice paging. We engineer audio layouts for maximum speech audibility and rich music playback.",
    features: [
      { title: "Line Array Distributions", desc: "Professional line array layouts for stadium-level and multi-story auditorium acoustic configurations." },
      { title: "Voice Alarm (PA/VA) Integration", desc: "Evacuation audio and public paging systems which link automatically to active smoke/fire alarms." },
      { title: "Digital Audio Matrix", desc: "Configurable multi-zone audio routers allowing distinct backing tracks in lobbies, corridors, and workspaces." },
      { title: "Premium Ceiling Speakers", desc: "High-comfort acoustic backcans that distribute sound evenly without causing ear fatigue." },
      { title: "Professional Microphones", desc: "Encrypted wireless handheld, lapel, and gooseneck podium microphones with zero RF dropouts." },
      { title: "Environmental Noise Sensing", desc: "Smart volume controls that automatically adjust background track levels based on crowd noise thresholds." }
    ],
    applications: [
      "Auditoriums & Public Event Venues",
      "Corporate Commercial Offices & Lobbies",
      "Industrial Factories & Manufacturing Parks",
      "Shopping Malls & Retail Department Complexes",
      "Airports, Subways & Transport Hubs",
      "Educational Campus Announcement Networks"
    ],
    techSpecs: [
      { label: "Speaker Power Rating", value: "30W - 1000W continuous output ratings" },
      { label: "Frequency Range", value: "45Hz - 22kHz professional acoustic tuning" },
      { label: "Amplifier Class", value: "Ultra-efficient Class-D digital multi-zone units" },
      { label: "Audio Connectivity", value: "Analog Balanced XLR, Dante Audio-over-IP networking" }
    ]
  },
  cctv: {
    id: "cctv",
    title: "Enterprise CCTV Surveillance Solution",
    tagline: "Smart AI-Powered IP Camera Networks & Security Operations Centers",
    image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=1200&auto=format&fit=crop",
    icon: Eye,
    overview: "Advanced high-definition IP camera networks backed by high-capacity centralized storage, intelligent analytics, and customized client visual matrixes that protect your institutional physical assets with 24/7 coverage.",
    features: [
      { title: "4K MegaPixel Cameras", desc: "Superb details and sharpness with optical Zoom, remote lens rotation, and intelligent focus guides." },
      { title: "Next-Gen Color Night Vision", desc: "Full-color filming even in dark or near-pitch-black areas using smart starlight sensors." },
      { title: "Advanced License Plate (ANPR)", desc: "Automatic tracking of vehicle arrivals, license logs, and integration with dynamic parking gates." },
      { title: "Intelligent Video Analytics", desc: "Perimeter crossing notifications, left-baggage monitoring, crowd gathering alerts, and loitering warnings." },
      { title: "Mass Central Storage Arrays", desc: "High-availability NVR configurations with redundant multi-drive RAID structures for month-long retention." },
      { title: "Universal Secure Mobile App", desc: "Securely view real-time operations, timeline histories, and cameras from any location on encrypted links." }
    ],
    applications: [
      "Corporate High-Rises & Headquarters",
      "Industrial Warehouses & Distribution hubs",
      "Banking & Financial Institution Branches",
      "Residential Gated Communities & Housing estates",
      "Hospitals, Government Offices & Public assets",
      "Active Construction Site Materials monitoring"
    ],
    techSpecs: [
      { label: "Camera Resolutions", value: "4MP, 8MP (4K UHD), 12MP Ultra-HD sensors" },
      { label: "Storage Capacity", value: "Scalable RAID-5/RAID-6 configurations up to 250TB" },
      { label: "Video Standards", value: "H.265+ High-Efficiency compression profiles" },
      { label: "AI Object Detection", value: "Precision categorization filtering out weather and animal false alarms" }
    ]
  },
  vas: {
    id: "vas",
    title: "Value Added Service",
    tagline: "Dedicated IT Support, Annual SLA Tuning, Maintenance & Operational Support",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop",
    icon: HeartHandshake,
    overview: "Our expert support engineers keep your specialized systems in pristine condition. Through proactive monitoring, hardware replacements, and custom configuration audits, we make sure you have zero system downtime.",
    features: [
      { title: "Dedicated SLA Agreements", desc: "Custom contracts tailored to your response speed needs, with up to 4-hour on-site crisis resolution." },
      { title: "Preventative Auditing Reports", desc: "Monthly checkups on camera lenses, audio signals, backup power batteries, and ventilation fans." },
      { title: "Priority Spares Inventory", desc: "Access call reserves of spare cameras, routers, SIP engines, and modules to bypass shipping queues." },
      { title: "Live Help Desk Tickets", desc: "Connect with our engineers through instant chat, telephone, or online portal ticketing." },
      { title: "Operator Masterclass Training", desc: "Onsite onboarding workshops for your team, keeping them fully capable in system management." },
      { title: "Critical Patch Audits", desc: "Regular updating of central server software and security patches to close hardware weaknesses." }
    ],
    applications: [
      "Multinational Offices needing strict uptime",
      "Government Offices and Data Center Facilities",
      "High-Traffic Warehouses and Processing Centers",
      "Educational Institutes and Campus infrastructures",
      "Corporate Boardrooms with high meeting volumes",
      "Commercial Building management agencies"
    ],
    techSpecs: [
      { label: "Help Desk Hours", value: "24/7/365 standby teams for critical infrastructures" },
      { label: "Onsite Arrival Time", value: "Under 4 Hours for Class-A emergency cases" },
      { label: "Audits Frequency", value: "Monthly, quarterly or semi-annual custom schedules" },
      { label: "Spares Sourcing", value: "Direct agreements with leading manufacture parts reserves" }
    ]
  },
  access: {
    id: "access",
    title: "Access Control Solution",
    tagline: "Advanced Biometric Security, Turnstiles & Integrated Attendance Platforms",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1200&auto=format&fit=crop",
    icon: Fingerprint,
    overview: "Control entry, secure data cabinets, and automate workforce attendance. We provide high-throughput turnstiles, biometric door readers, magnetic door locks, and high-performance central attendance mapping engines.",
    features: [
      { title: "Biometric & Face Identification", desc: "Industry-leading verification speeds under 0.2 seconds, with advanced anti-spoofing live detection." },
      { title: "Attendance Software Integration", desc: "Synchronize door swipes directly with payroll, shift rosters, and HR portals." },
      { title: "Magnetic Lock Assemblies", desc: "Heavy-duty electromagnetic locks with robust holding force, linked to fail-safe emergency exits." },
      { title: "Access Turnstiles & Gates", desc: "Durable stainless steel flap barriers, tripod gates, and speedlanes for high-throughput lobbies." },
      { title: "Centralized Authority Console", desc: "Instantly create or cancel badges, track room occupancy, and restrict floors from a central dashboard." },
      { title: "Multi-Location WAN Sync", desc: "Link readers across multiple country-wide branches to a single management system." }
    ],
    applications: [
      "Corporate High-Rises & Access Gates",
      "High-Security Data Centers & Server Rooms",
      "Industrial Factories & Employee Exit Points",
      "Government Buildings & Executive Chambers",
      "Hospitals, Labs & Safe Materials lockers",
      "Gated Commercial Business Hubs & Lobbies"
    ],
    techSpecs: [
      { label: "Authentication Modes", value: "Face, Touch Fingerprint, RFID card, Mobile NFC, QR Badge" },
      { label: "Door Lock Strengths", value: "600 lbs / 1200 lbs sheer holding force grades" },
      { label: "Terminal Capacities", value: "Up to 50,000 distinct faces stored per-device" },
      { label: "Power Configurations", value: "Centralized power supply with backup gel-cell batteries" }
    ]
  },
  telephony: {
    id: "telephony",
    title: "IP Telephone System",
    tagline: "Unified Communications, Enterprise SIP Trunking, & Voice Over IP Solutions",
    image: "https://images.unsplash.com/photo-1583071299210-c6c113f4cb91?q=80&w=1200&auto=format&fit=crop",
    icon: PhoneCall,
    overview: "State-of-the-art IP Telephony (VoIP) uniting voice, desktop terminals, and video communications into one cost-effective system. We connect branch systems, home-office phones, and central consoles perfectly.",
    features: [
      { title: "Hybrid IP PBX Controllers", desc: "Modern central on-premises servers or secure off-site cloud software packages." },
      { title: "HD Sound Quality Audio", desc: "Crystal clear call capabilities that block static noise and reduce bandwidth usage." },
      { title: "Auto Attendance & IVR Call routing", desc: "Custom multi-tier menus ('Press 1 for Sales') to handle phone volumes efficiently." },
      { title: "PC & Mobile SIP Clients", desc: "Accept corporate desk extension calls on your mobile phone or laptop while traveling." },
      { title: "Comprehensive Call Logging", desc: "Detailed records on staff times, voice recording archives, and caller analytics dashboards." },
      { title: "CRM Integration Ready", desc: "Trigger automatic CRM screen openings containing caller files as soon as the phone rings." }
    ],
    applications: [
      "Customer Support Call Centers",
      "Multinational Corporate Head Offices",
      "Hospitals & Patient Appointment Desks",
      "Chains of Retail Yards or Outlets",
      "Financial Brokerages needing recorded call lines",
      "Co-working Corporates with flexible seating"
    ],
    techSpecs: [
      { label: "Voice Compression Protocols", value: "G.711, G.729, G.722 HD audio" },
      { label: "Supported Devices", value: "IP Phones, Video Terminals, Softphones, Analog adapters" },
      { label: "System Scalability", value: "From 10 extensions to 5,000 active extensions" },
      { label: "SIP Compatibility", value: "Works natively with all leading network carriers" }
    ]
  },
  datacenter: {
    id: "datacenter",
    title: "Data Center Solution",
    tagline: "Resilient Structural Server Rooms and Specialized Infrastructure Systems",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200&auto=format&fit=crop",
    icon: Server,
    overview: "We construct reliable secure rooms for your critical central IT gear. From network racks to clean fire suppression systems and high-precision temperature controls, we shield your data core.",
    features: [
      { title: "Specialized Precision Air (CRAC)", desc: "Maintains optimal cold-row temperatures and strict humidity ranges, operating 365 days a year." },
      { title: "Redundant Online Double-UPS", desc: "Smooth transition of loads to backup battery storage with zero electrical interference." },
      { title: "Structured Copper & Fiber Systems", desc: "Neat overhead raceways, high-grade patch modules, and multi-core fiber pathways." },
      { title: "Inert Gas Fire Control (FM-200)", desc: "Rapid deployment of oxygen-displacing eco-friendly gas that smothers fires without damaging hardware." },
      { title: "Intelligent Environmental Controls", desc: "Sensors that alert your team on water leaks, humidity shifts, and smoke development." },
      { title: "Modular Racks & Containment", desc: "Hot/Cold aisle separation doors, locking server cabinets, and neat power feeds." }
    ],
    applications: [
      "Institutional Server and Firewall Hubs",
      "Banking & Trading Engine Server Rooms",
      "Cloud Web Hosting and Storage Centers",
      "Telecom Operations and Carrier facilities",
      "Government Record and Intelligence Stores",
      "Hospital EMR Diagnostic server houses"
    ],
    techSpecs: [
      { label: "Precision Temperature Control", value: "22°C ± 1°C, Humidity levels kept at 50% ± 5%" },
      { label: "Alternative Fire Gas", value: "FM-200, Novec 1230 eco-friendly setups" },
      { label: "UPS Power Scale", value: "Modular designs from 10kVA up to 500kVA setups" },
      { label: "Cabling Standards", value: "TIA-568-C compliance, high density Cat6A STP and OM4 fiber" }
    ]
  },
  network: {
    id: "network",
    title: "Enterprise Network Solution",
    tagline: "Secure, High-Throughput Wired, Enterprise Wireless & Fiber Systems",
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=1200&auto=format&fit=crop",
    icon: Network,
    overview: "High-class networks that serve as the backbone of your business files and connectivity. We offer physical network installations, unified network management consoles, and robust security firewalls.",
    features: [
      { title: "Layer 2 & Layer 3 Switched Cores", desc: "High-availability switches with multi-gigabit connections to prevent pipeline congestion." },
      { title: "Enterprise Wi-Fi 6 Layouts", desc: "Full floor roaming coordinates that transfer device links seamlessly without dropped calls." },
      { title: "Unified Security Firewalls", desc: "Central firewalls with daily malware signatures, threat blocks, and user filters." },
      { title: "Cat6A Cable & Fiber Splicing", desc: "Pristine physical installations certified with advanced CableAnalyzer testing reports." },
      { title: "Site-to-Site Encrypted VPNs", desc: "Safe encryption tunnels linking multi-branch staff instantly to main server folders." },
      { title: "Next-Gen WAN Optimization", desc: "Intelligent data prioritizing that makes sure office VoIP and systems bypass minor downloads." }
    ],
    applications: [
      "Corporate Headquarters & Campus sites",
      "High-Density Public Assembly Spaces & Parks",
      "Hospital Emergency & EMR Core systems",
      "Multi-Branch Retail and Inventory logistics",
      "University Campus Outdoor Wi-Fi layouts",
      "Industrial Processing Automation backbones"
    ],
    techSpecs: [
      { label: "Copper Speed Ratings", value: "Cat6/Cat6A up to 10Gbps transmission bandwidths" },
      { label: "Optical Fiber Standards", value: "Single-mode and multimode links with high precision core fusion" },
      { label: "Firewall Throughput", value: "Multi-gigabit deep-packet firewall inspections" },
      { label: "Wireless Standards", value: "Wi-Fi 6 (802.11ax) dual-radio high-concurrency Access Devices" }
    ]
  },
  dcim: {
    id: "dcim",
    title: "Data Center Infrastructure Management (DCIM)",
    tagline: "Real-time Monitoring, Capacity Planning & Energy Optimization",
    image: "https://images.unsplash.com/photo-155848994949-ef010cbdcc31?q=80&w=1200&auto=format&fit=crop",
    icon: Server,
    overview: "Our DCIM solutions provide unified, real-time visibility across facilities and IT components. Track cooling performance, electrical loads, device health status, and physical rack spacing in a single intuitive interface.",
    features: [
      { title: "Real-time Power Strips monitoring", desc: "Monitor continuous current loads per socket to identify power bottlenecks and balance loads." },
      { title: "3D Floor Plans representation", desc: "Interactive high-precision 3D layouts indicating room temperature hot spots and empty cabinet assets." },
      { title: "Capacity Planning tools", desc: "Simulate future equipment additions to estimate peak power draw and cooling demands over time." },
      { title: "Thermal Sensors mapping", desc: "Intelligent maps that correlate air-conditioner output with actual cabinet back-draw heats." },
      { title: "Auto Alerts system integration", desc: "Instantly broadcast critical power drops or cooling anomalies to on-duty engineering squads." },
      { title: "PUE Performance Calculator", desc: "Live calculation of continuous Power Usage Effectiveness to drive carbon and cost optimizations." }
    ],
    applications: [
      "Enterprise Private Server Facilities",
      "Multinational Operations Control Hubs",
      "Banking & Trading Machine Rooms",
      "Cloud Web Hosting Facilities",
      "Government Secure Archives Centers",
      "High-Density Compute Clusters Rooms"
    ],
    techSpecs: [
      { label: "Standard Protocols", value: "Modbus TCP/RTU, SNMP v1/v2/v3, BACnet/IP, IPMI" },
      { label: "Dashboard Display", value: "HTML5 dynamic responsive widgets with auto-refresh rates" },
      { label: "Visual Tracking", value: "3D real-time thermal spatial heatmaps with layered filters" },
      { label: "Alert Notification", value: "Dedicated SMS SMTP gateway integration, dynamic Webhooks & E-mail logs" }
    ]
  },
  ems: {
    id: "ems",
    title: "Environmental Monitoring System",
    tagline: "Continuous Room Humidity, Temp, Water Leak, and Airflow Control",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
    icon: Activity,
    overview: "Protect sensitive server equipment from physical and environmental threats before they result in catastrophic downtime. Our EMS platform continuously tracks air moisture, temperature thresholds, water leaks, and unauthorized door access.",
    features: [
      { title: "Intelligent Temp coordinates", desc: "High-accuracy dual sensors tracking hot-row and cold-row air intakes concurrently." },
      { title: "Spot & Dual Rope leak detectors", desc: "Water leak ropes placed beneath raised floor panels to detect moisture instantly across wide areas." },
      { title: "Digital Airflow measuring tubes", desc: "Monitor precision cooling fan speeds and detect blocked vents or static pressure drops." },
      { title: "Siren & Beacon nodes", desc: "On-site flashing beacons and loud horn sirens that activate instantly when safety limits are breached." },
      { title: "Remote sensor hubs backup power", desc: "Internal gel-cell battery backup ensuring environmental alerting remains active during main power outages." },
      { title: "Cloud Server centralization", desc: "Sync environmental data from multiple distributed branch server rooms to a central website." }
    ],
    applications: [
      "High-Density Server Rack Closets",
      "Remote Telecom Base Station Cabinets",
      "Historical Document Vault Archives",
      "Medical Laboratory Sample Closets",
      "Industrial Control Rooms & Hubs",
      "Secure Bank Vault and Safe Deposit Rooms"
    ],
    techSpecs: [
      { label: "Temp Measurement Range", value: "-40°C to 85°C with high ±0.5°C accuracy" },
      { label: "Sensor Port Connectivity", value: "RJ45 daisy-chain hubs supporting up to 24 sensors per controller" },
      { label: "Battery Backup duration", value: "Up to 12 hours continuous alert operation on lead backup" },
      { label: "Safety Certifications", value: "Fully compliant with CE, FCC, RoHS, and UL safety standards" }
    ]
  },
  nms: {
    id: "nms",
    title: "Network Management System",
    tagline: "Unified Bandwidth Tracking, Device Configuration, & Network Visibility",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1200&auto=format&fit=crop",
    icon: Network,
    overview: "Take absolute command over all your enterprise switches, firewalls, routers, and wireless APs from a single pane of glass. Our NMS platform collects telemetry, detects throughput choke points, and streamlines link fault-finding.",
    features: [
      { title: "Auto Network mapping", desc: "Dynamically discover and plot physical and logical network interconnect designs." },
      { title: "Bandwidth Usage tracking", desc: "Deploy NetFlow metrics to analyze top talkers, application usages, and circuit limits." },
      { title: "Config Auto-Backups", desc: "Schedule continuous snapshots of router/switch configurations with automatic file comparisons." },
      { title: "IP Address tracker", desc: "Central visibility of active IP-Address leases, avoiding IP conflicts and cataloging rogue devices." },
      { title: "Active Audit Logs", desc: "Track credentialed user access, command histories, and configuration adjustments." },
      { title: "Reliability Failover", desc: "Redundant secondary server monitoring backup keeping alert lines active 24/7." }
    ],
    applications: [
      "Multi-story Corporate Offices",
      "Chains of Branch Banking Systems",
      "University Campus Fiber Networks",
      "Government WAN Services Networks",
      "Industrial Utility Grid Operations",
      "High-traffic Server and App Farms"
    ],
    techSpecs: [
      { label: "Supported Protocols", value: "SNMP v1/v2c/v3, NetFlow, IPFIX, sFlow, SSH, Syslog" },
      { label: "Telemetry Polling frequency", value: "User-configurable from 5-second ultra-high precision up to 5 minutes" },
      { label: "Export File Support", value: "Automated report formats including PDF, XLS, CSV, and Web portal dashboards" },
      { label: "Deployment Footprint", value: "Agentless device discovery and telemetry collections" }
    ]
  },
  "server-lan": {
    id: "server-lan",
    title: "Server/LAN Automation",
    tagline: "Automated provisioning, Application Deployments & Server Scripting",
    image: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=1200&auto=format&fit=crop",
    icon: Server,
    overview: "Accelerate system deliveries and eliminate human errors. We bundle infrastructure orchestration scripts, operating system pre-configurations, security firmware rollouts, and automatic standard compliance reviews.",
    features: [
      { title: "Infrastructure as Code designs", desc: "Represent compute nodes, hypervisors, and LAN switch ports in clean, reproducible text blueprints." },
      { title: "OS Auto Installation scripts", desc: "Automate bare-metal and VM initializations on physical hardware with zero manual keyboard inputs." },
      { title: "Batch patch update managers", desc: "Deploy vital OS patches and software upgrades concurrently to hundreds of targets safely." },
      { title: "Dynamic Resource Scaling", desc: "Automate server scale-outs and load-balancer settings based on CPU and memory limits." },
      { title: "Central Compliance checks", desc: "Validate that system files conform to your enterprise cybersecurity rules automatically." },
      { title: "Security rule validations", desc: "Automate firewalls rule deployments and sync switch ACLs across remote sites instantly." }
    ],
    applications: [
      "Enterprise Private Compute Hypervisors",
      "Active Software Engineering Environments",
      "High-Frequency Core Billing Networks",
      "Automated Large-scale File Backup Routines",
      "Educational Institutes Online Portals",
      "Advanced AI Engine training server arrays"
    ],
    techSpecs: [
      { label: "Automation standard tools", value: "Ansible Playbooks, Terraform modules, Chef Recipes, and Puppet Manifests" },
      { label: "Bare-Metal provisioning", value: "Secure PXE Boot environments, RedHat Kickstart, and Debian Preseed" },
      { label: "Compatible DB Engines", value: "PostgreSQL clusters, MySQL clusters, MSSQL servers, Oracle Database" },
      { label: "Hypervisor Integrations", value: "VMware vSphere API, Proxmox VE clustering, Kernel-based Virtual Machine (KVM)" }
    ]
  },
  storage: {
    id: "storage",
    title: "Data Storage Solution",
    tagline: "High-Availability SAN, NAS Storage, & Enterprise Backups",
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=1100&auto=format&fit=crop",
    icon: Database,
    overview: "Establish absolute data safety and storage speed. We engineer unified block and file storage arrays using redundant Storage Area Networks (SAN) and high-throughput Network Attached Storage (NAS) configurations.",
    features: [
      { title: "Ultra-fast Fiber Channel SAN arrays", desc: "Sub-millisecond access timings using high-performance host adapters over glass fibers." },
      { title: "Real-time Block deduplication", desc: "Next-gen storage compression optimizing and shrinking actual disk requirements by up to 70%." },
      { title: "Immutable backup repositories", desc: "Create read-only system backups that cannot be overwritten or altered by ransomware infections." },
      { title: "Continuous Remote Replication", desc: "Instantly stream local data changes to a secondary disaster recovery site miles away." },
      { title: "Automatic File Snapshots", desc: "Schedule frequent point-in-time file recovery captures with zero volume slowdowns." },
      { title: "Hot-Swap Drive Enclosures", desc: "Replace faulty disks or power units mid-operation with zero system downtime." }
    ],
    applications: [
      "Professional High-Def Video Editing Yards",
      "Core Banking Transaction Log Hubs",
      "Enterprise Resource Planning (ERP) databases",
      "Legal and Institutional Archive Repositories",
      "Massive Scale CCTV Video Footage Vaults",
      "Off-Site Disaster Recovery Backup Sites"
    ],
    techSpecs: [
      { label: "Supported Interface Speeds", value: "16Gb/32Gb Fiber Channel, 10GbE / 25GbE iSCSI, 12Gb/s SAS connections" },
      { label: "Storage System Tiers", value: "All-Flash NVMe structures, Hybrid Solid State Disk & SAS HDD storage vaults" },
      { label: "Enterprise Backup engine", value: "Fully integrated with Veeam, Commvault, and NDMP standard interfaces" },
      { label: "Hardware Redundancy level", value: "Dual active-active network controllers, duplicate backup PSUs & cooling fans" }
    ]
  },
  "passive-lan": {
    id: "passive-lan",
    title: "Passive LAN Solutions",
    tagline: "Structured Copper & Coaxial Cabling, Patching & Clean Cable Management",
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=1200&auto=format&fit=crop",
    icon: Cable,
    overview: "High-density structural copper networks laying down the core channels of corporate connectivity. We deploy premium Category 6, Cat6A, and Category 7 structured cabling, pristine patch panels, overhead tray systems, and wall-mount enclosures certified with precise Fluke Analyzer reports.",
    features: [
      { title: "Certified Structured Cabling", desc: "Category 6, 6A, and 7 copper setups optimized for gigabit and 10Gbps local throughput rates." },
      { title: "Smart Patch Fields & Panels", desc: "Angled high-density panels that ease patch cord tension and keep racks incredibly nested and clean." },
      { title: "Precision Cable Testing", desc: "Every connector and link undergoes rigorous Fluke DSX testing to guarantee absolute zero packets drop of data." },
      { title: "Neat Tray & Conduit Routes", desc: "Deploy overhead wire meshes, floor ducts, and wall raceways that protect physical copper runs." },
      { title: "Voice & Data Segregation", desc: "Isolate analog voice feeds, VOIP lines, and corporate file transfer channels to avoid interference." },
      { title: "Rack Organization Audits", desc: "We restructure disorganized high-density legacy server racks into beautifully color-coded and labeled modules." }
    ],
    applications: [
      "Multi-story Corporate Offices",
      "Hospitals & Healthcare Clinics",
      "University Infrastructure Cabling",
      "Retail Store Branch Networks",
      "Research Laboratories & Facilities",
      "Financial High-Rise Headspaces"
    ],
    techSpecs: [
      { label: "Copper Standards", value: "ANSI/TIA-568-C.2, ISO/IEC 11801 Class Ea" },
      { label: "Testing Equipment", value: "Fluke DSX-8000 CableAnalyzer calibration certification" },
      { label: "Bandwidth Rating", value: "Supporting 250MHz (Cat6) to 500MHz (Cat6A) bandwidth spectrums" },
      { label: "Insulation Compliance", value: "Low Smoke Zero Halogen (LSZH) retardant jacket profiles" }
    ]
  },
  "fiber-optic": {
    id: "fiber-optic",
    title: "Fiber Optic Solutions",
    tagline: "High-Speed Single-Mode & Multi-Mode Glass Core Fusion Splicing & Backbone Channels",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1200&auto=format&fit=crop",
    icon: Network,
    overview: "Ultra-high-speed backbone connections utilizing glass fiber links. We design, install, terminate, and splice high-capacity optical fiber grids inside multi-building campus networks, linking server arrays to distribution centers with speed.",
    features: [
      { title: "Core Fusion Splicing", desc: "State-of-the-art core-alignment splicers that weld fibers with minuscule signal dB losses." },
      { title: "Multi-Mode (OM3/OM4) backbone", desc: "Short-range laser-optimized optical lines ideal for linking high-compute switches inside server complexes." },
      { title: "Single-Mode (OS2) long runs", desc: "Inter-facility links covering kilometers with zero signal degradation under secure outdoor conduit paths." },
      { title: "Fiber Distribution Panels (FODP)", desc: "Pristine drawer-style sliding fiber panels with tidy pigtail splices and premium LC/SC connectors." },
      { title: "OTDR Signal Diagnostics", desc: "Complete Optical Time-Domain Reflectometer graphs pinpointing fiber faults or micro-bends instantly." },
      { title: "Armored Conduit Security", desc: "Deploy heavy metallized and gel-filled outer jackets shield glass cores from rodent or crush hazards." }
    ],
    applications: [
      "Inter-building Campus Backbones",
      "High-Throughput Co-location Centers",
      "Metropolitan Area Networks (MAN)",
      "Industrial CCTV Core Integrations",
      "Substation Automation backbones",
      "Internet Service Provider Access rings"
    ],
    techSpecs: [
      { label: "Splicing Standard Accuracy", value: "Core-alignment laser fusion under 0.02dB average splice loss" },
      { label: "Fiber Standards", value: "ITU-T G.652.D (Single-Mode), IEC 60793-2-10 (Multi-Mode)" },
      { label: "Supported Speeds", value: "10Gbps, 40Gbps, and 100Gbps high-performance links" },
      { label: "Test Wavebands", value: "Double OTDR testing at 850/1300nm and 1310/1550nm wavelengths" }
    ]
  },
  "dc-power": {
    id: "dc-power",
    title: "Data Center Power System",
    tagline: "Industrial Busway Bar Distributions, Clean Earthing & Power Management Panel installations",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200&auto=format&fit=crop",
    icon: Power,
    overview: "Uncompromising electrical infrastructure designed to deliver steady energy to high-load datacenter complexes. We engineer robust power distribution boards, precision isolation transformers, industrial ground grids, and circuit monitoring models.",
    features: [
      { title: "Precision power boards", desc: "Dual-feed utility and backup supply distributions engineered to bypass partial mains faults safely." },
      { title: "Overhead Power Busways", desc: "Replace messy copper cabling with modular overhead track busways supporting easy tap-off box revisions." },
      { title: "Transient Surge Suppressors", desc: "Deploy class-leading TVSS protectors absorbing massive voltage spikes or local lightning events." },
      { title: "Copper Grounding meshes", desc: "Establish absolute low-impedance ground lines to shield high-sensitivity servers from static currents." },
      { title: "Automatic Transfer (ATS)", desc: "Trigger fast, automatic transfers between physical backup sources with zero cross-phasing hazards." },
      { title: "Branch Circuit Monitorings", desc: "Intelligent current-meters reporting active loading margins across every individual server cabinet breaker." }
    ],
    applications: [
      "Large Institutional Server Farms",
      "Banking Central Transaction houses",
      "Industrial Operations Control Centers",
      "Co-location Web Hosting grids",
      "Disaster Prevention Control rooms",
      "High-Power Cloud Computing parks"
    ],
    techSpecs: [
      { label: "Supported Phase scale", value: "3-Phase 380V/400V/415V AC, 50/60Hz clean balanced power" },
      { label: "Ground Impedance target", value: "Under 1.0 Ohm structural copper earthing grid standards" },
      { label: "Busway Ampacity", value: "From 100A copper bus up to 800A overhead continuous installations" },
      { label: "Protective Ingress ratings", value: "NEMA Type-1 indoor distribution boards, IP54 dust enclosures" }
    ]
  },
  "rack-management": {
    id: "rack-management",
    title: "Rack Management Solution",
    tagline: "Intelligent Server Cabinets, Smart Cable Organizers, and Locking Access Monitors",
    image: "https://images.unsplash.com/photo-155848994949-ef010cbdcc31?q=80&w=1200&auto=format&fit=crop",
    icon: Server,
    overview: "Housing your central enterprise hardware securely. We deliver heavy-capacity smart server cabinets equipped with vertical power bars, tool-less cable organizer managers, dynamic visual temperature maps, and electronic locks.",
    features: [
      { title: "Heavy Load Frames", desc: "Engineered high-gauge structural steel frames supporting static hardware weights up to 1500kg safely." },
      { title: "Integrated Cable managers", desc: "Durable high-capacity vertical fingers and horizontal metal hooks preventing fiber-optic bend bottlenecks." },
      { title: "Smart PDU Power bars", desc: "Network-ready vertical power rails supporting outlet-level energy meters and remote power cycles." },
      { title: "Electromagnetic Lock handles", desc: "Deploy RFID card readers direct on cabinet doors, tracking entry cards in local log tables." },
      { title: "High Perforation ventilation", desc: "Cabinet front and back doors styled with 80%+ hex openings to enable optimal airflow sweeps." },
      { title: "Modular Tray shelves", desc: "Heavy-duty sliding and fixed utility shelves holding non-mountable consoles and systems neatly." }
    ],
    applications: [
      "Data Center server rows",
      "Telecom ISP terminal racks",
      "Active Corporate IT Closets",
      "Broadcast Recording Master vaults",
      "Military tactical communications racks",
      "Central CCTV storage hub spaces"
    ],
    techSpecs: [
      { label: "Standard Cabinet sizes", value: "42U, 45U, 47U heights, 600mm / 800mm widths, 1000mm / 1200mm depths" },
      { label: "Door Security", value: "Smart RFID card handles with fallback security keycylinders" },
      { label: "Static Load Capacity", value: "1,500 kg (3,300 lbs) heavy-load certified frames" },
      { label: "PDU Connectivity options", value: "Gigabit Ethernet LAN, Daisy-clink ports, Modbus serial links" }
    ]
  },
  "raise-floor": {
    id: "raise-floor",
    title: "Raise Floor System",
    tagline: "High-Load Anti-Static Raised Floor Panels, Underfloor Air Cavities & Pedestal Grids",
    image: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=1200&auto=format&fit=crop",
    icon: Grid,
    overview: "Creating modular pathways for cabling and cold air distribution. We build precise underfloor grid frameworks using high-rigidity steel pedestals, anti-static high-pressure laminate panels (HPL), and directional air flow panels.",
    features: [
      { title: "High-Load steel pedestals", desc: "Adjustable central steel pillars locking panels securely at heights ranging from 150mm to over 600mm." },
      { title: "Anti-Static HPL Panels", desc: "High-Pressure Laminate toppings that disperse electrostatic buildup instantly to protect server circuits." },
      { title: "Directional airflow panels", desc: "Solid steel perforated tiles placed under racks, directing heavy cold air streams exactly where needed." },
      { title: "Modular Underfloor routes", desc: "Tidy separation of power cables and high-speed data trunks beneath the walking deck." },
      { title: "Sealed Plenum underfloor", desc: "Pristine dust-free concrete sealing of sub-floors to maintain clean air channels under positive pressure." },
      { title: "Special Lifter systems", desc: "Vacuum suction tile lifters provided on-site allowing quick, safe underfloor access by IT staff." }
    ],
    applications: [
      "Central Datacenter Server Halls",
      "Active Control & Command Center rooms",
      "High-Tech Research Labs",
      "Corporate Server Room closets",
      "Electronic Assembly Floors",
      "Industrial SCADA Operation rooms"
    ],
    techSpecs: [
      { label: "Finished Floor Height", value: "Custom adjustable from 150mm to 800mm clearance" },
      { label: "Panel Concentrated load", value: "Class-leading 450kg (1000 lbs) to 675kg (1500 lbs) rating options" },
      { label: "Surface Resistivity scale", value: "Antistatic resistance from 1.0x10^6 to 1.0x10^9 Ohms" },
      { label: "Panel Core Composition", value: "Rigid cementitious compound core encased in high-grade galvanized steel sheets" }
    ]
  },
  "online-ups": {
    id: "online-ups",
    title: "Online UPS Solution",
    tagline: "Double-Conversion Online UPS Networks & Scalable Lead-Acid/Lithium Safe Battery Banks",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop",
    icon: Battery,
    overview: "Shielding critical hardware from utility power anomalies, surges, and blackouts. We provide high-integrity True Double-Conversion Online Uninterruptible Power Supplies (UPS) delivering pristine sine-wave electricity with absolute zero transition delays.",
    features: [
      { title: "True Double-Conversion", desc: "Continuous AC-DC-AC conversion isolating servers completely from utility frequency or voltage noise." },
      { title: "Scalable Battery cabinets", desc: "High-discharge valve-regulated lead-acid VRLA or next-gen Lithium-Iron Phosphate (LiFePO4) backup bays." },
      { title: "Redundant Modular structures", desc: "N+1 active power modules sharing loads, enabling hot-swaps of cells without taking down servers." },
      { title: "Intelligent Battery trackers", desc: "Continuous cell-level monitoring tracking temperature, voltage health, and charging profiles in real time." },
      { title: "Static Bypass systems", desc: "Internal ultra-fast static switches that bypass to utility routes instantly if internal faults are detected." },
      { title: "Network Management integration", desc: "SNMP remote monitoring interfaces allowing automated safe server shutdowns over SNMP triggers." }
    ],
    applications: [
      "Data Center Server complexes",
      "Hospital Critical ICU & Lab equipments",
      "Broadcast Telecommunication Towers",
      "Bank Transaction Core rooms",
      "Airport Control operations",
      "Industrial Automation PLC racks"
    ],
    techSpecs: [
      { label: "Power Sizing ranges", value: "From 10kVA to 600kVA high-efficiency scalable modules" },
      { label: "Switching Transfer Time", value: "0ms (True continuous double-conversion online routing)" },
      { label: "Power Factor rating", value: "0.99 Input PF, 1.0 Unitary output power factor" },
      { label: "Battery Enclosure standards", value: "Venting steel cabinets with high-capacity over-current DC breakers" }
    ]
  },
  "dehumidifier": {
    id: "dehumidifier",
    title: "Dehumidifier Solution",
    tagline: "Precision Air Dehumidification & Industrial Desiccant Moisture Management Controls",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
    icon: Droplets,
    overview: "Maintaining clean, safe air moisture limits. High room humidity leads to water droplets forming on processor circuits, while dry environments trigger high electrostatic hazards. We deploy precise automatic dehumidifiers keeping humidity balanced.",
    features: [
      { title: "Desiccant & Refrigerated units", desc: "High-capacity heavy-duty drying wheels optimized for low temperature and low moisture spaces." },
      { title: "Intelligent Moisture sensors", desc: "Wall-mount digital humidistats tracking moisture levels, cycling fans dynamically." },
      { title: "Automatic Condensate Pumps", desc: "Built-in continuous lift drain pumps running condensate water safely out of server facilities." },
      { title: "Clean Air Filters matching", desc: "Washable high-grade prefilters protecting drying elements from datacenter dust accumulation." },
      { title: "Nondisruptive Silent Motors", desc: "Low-acoustic continuous blower fans designed for enclosed room operations." },
      { title: "Central Telemetry links", desc: "Connects securely into existing building management systems using Modbus protocols." }
    ],
    applications: [
      "Critical Server Vault archives",
      "Paper Document and Records stores",
      "Pharmaceutical clean storage vaults",
      "Electronics Testing Facilities",
      "Sub-level Cable distribution tunnels",
      "Battery Charging storage rooms"
    ],
    techSpecs: [
      { label: "Extraction Performance", value: "50 Liters up to 250 Liters per day continuous dry outputs" },
      { label: "Humidity Control Range", value: "Precision adjustable from 30% to 90% RH with high accuracy" },
      { label: "Refrigerant Medium", value: "Eco-friendly non-ozone depleting R410A / R134a fluids" },
      { label: "Ingress Dust Filtration", value: "G4-grade prefilters or customized MERV-11 high performance filters" }
    ]
  },
  "precision-cooling": {
    id: "precision-cooling",
    title: "Precision Air Cooling solution",
    tagline: "Close-Loop CRAC Units, Downflow Constant Air Cooling & Smart Cold-Aisle Containments",
    image: "https://images.unsplash.com/photo-155848994949-ef010cbdcc31?q=80&w=1200&auto=format&fit=crop",
    icon: Snowflake,
    overview: "High-precision environment controls running continuously. Standard commercial AC systems cannot handle dry heat generated by dense server rows. We build state-of-the-art downflow and in-row Close Control Units (CCU) directing cold air precisely.",
    features: [
      { title: "Downflow Constant Fans", desc: "Blows high-pressure chilled air beneath raised floor grids, cooling server intakes evenly." },
      { title: "EC Fan Speed optimizations", desc: "Electronically Commutated fans adjusting speeds automatically based on real cabinet heatmap sensors." },
      { title: "Dual Compressor backings", desc: "Dual refrigerant cooling loop circuits ensuring continuous cooling if one fails." },
      { title: "Water-Cooled and Dx options", desc: "Deploy direct expansion refrigerant air setups or centralized energy-efficient chilled water systems." },
      { title: "Steam Cylinder humidifiers", desc: "Highly sterile boiling steam chambers adding micro-moisture instantly in dry seasons." },
      { title: "Close-aisle Containment kits", desc: "Framed glass panels enclosing the cold aisles to maximize hot-air partition efficiency." }
    ],
    applications: [
      "High Density Computing centers",
      "Corporate Server Hall suites",
      "Telecom ISP terminal halls",
      "Government secure storage zones",
      "Bank Online Backup server complexes",
      "Industrial SCADA command server spaces"
    ],
    techSpecs: [
      { label: "Cooling Capacities scale", value: "Under 15kW up to 100kW+ modular cooling capacities per unit" },
      { label: "Air Delivery patterns", value: "Underfloor Downflow, In-Row side blasts, or Overhead Upflow conduits" },
      { label: "Compressor Technologies", value: "Brushless DC Inverter scroll compressors for supreme energy efficiency" },
      { label: "Environmental Tolerances", value: "Operating continuously in extreme outdoor temperatures up to 45°C" }
    ]
  },
  "cctv-ip-analog": {
    id: "cctv-ip-analog",
    title: "IP/Analog CCTV Solution",
    tagline: "High-Definition Coaxial, Network Cameras & Hybrid Infrastructure",
    image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=1200&auto=format&fit=crop",
    icon: Camera,
    overview: "Upgrade or deploy state-of-the-art visual surveillance setups. We bridge legacy analog video networks with modern ultra-high-definition IP cameras, integrating active recorders, high-speed fiber transceivers, and hybrid routing configurations.",
    features: [
      { title: "Ultra HD Resolution (4K+)", desc: "Deploy cameras packing deep sensor arrays to extract license plates, facial details, and currency values clearly." },
      { title: "PoE Network Deployment", desc: "Power over Ethernet protocols minimizing cabling runs by delivering both high-speed video feeds and stable electricity on a single Cat6 line." },
      { title: "Hybrid Coaxial Upgrades", desc: "Keep legacy physical routes but upgrade cameras to HD-TVI or HD-CVI systems to enjoy 4K visuals with zero cable replacement cost." },
      { title: "Zero Latency Direct Out", desc: "Direct zero-compression local monitor matrix decoders providing live screen matrices to onsite security personnel." },
      { title: "Optimal H.265+ Compression", desc: "Save up to 80% database storage footprint with clean, high-performance video compression codecs." },
      { title: "Advanced IR/Low-Light Vision", desc: "Enjoy high-contrast night coverage using powerful infrared matrix arrays or active starlight low-light ambient enhancements." }
    ],
    applications: [
      "Corporate Offices",
      "Multi-facility Retail Banks",
      "Apartment complexes",
      "Educational campuses",
      "Logistics Warehouses",
      "Critical Border entries"
    ],
    techSpecs: [
      { label: "Video Transmission Standard", value: "TCP/IP Gigabit Ethernet networks & HD-TVI long distance over RG6 coaxial links" },
      { label: "Resolution standard", value: "Supporting Full HD 1080p, 5MP, and 8MP 4K Ultra-High Definition feeds" },
      { label: "Ingress Protection scale", value: "IP66 / IP67 Weatherproof ratings, IK10 vandal-proof structural shieldings" },
      { label: "Supported Frames rate", value: "Adaptive 15fps, 25fps, and 30fps smooth streamings" }
    ]
  },
  "cctv-anpr": {
    id: "cctv-anpr",
    title: "Automatic Number Plate Recognition (ANPR) Solution",
    tagline: "High-Speed Vehicle License Capture, Custom Database Access & Gate Integrations",
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=1200&auto=format&fit=crop",
    icon: Cpu,
    overview: "Intelligent vehicle logging tailored for modern access nodes. We deliver specialized high-speed shutter cameras powered by optoelectronic sensors and deep-learning plate OCR text parsing models, operating perfectly under extreme headlight glare and high speeds.",
    features: [
      { title: "High Speed License Capture", desc: "Extract plate text confidently with vehicle velocities surpassing 120km/h on multiple active highway lanes." },
      { title: "Plate Light Glare Filtering", desc: "Built-in optical filters absorbing heavy headlight glare to reveal clear characters in pitch-black nights." },
      { title: "Automatic Gate Interlocking", desc: "Trigger automatic barriers and access gates instantly when an approved whitelist plate is identified." },
      { title: "Country-Wide Syntax Match", desc: "Deep OCR dictionaries trained to decode regional and international numbering syntaxes quickly." },
      { title: "Blacklist Alarms Triggers", desc: "Receive system alerts and automated SMS/email alerts when stolen or unauthorized plates are detected." },
      { title: "Flexible SQL Logs Database", desc: "Logs every check-in event with time-stamped visual plate snaps and clear meta text for quick audit lookups." }
    ],
    applications: [
      "Corporate Toll Gates",
      "Automated Parking Garages",
      "Airport Terminal entrance gates",
      "Highway Traffic monitoring sites",
      "Residential Gated colonies",
      "Industrial Zone loading docks"
    ],
    techSpecs: [
      { label: "ANPR Capture Accuracy", value: "99.2% overall accuracy in all-weather day and night conditions" },
      { label: "OCR Decode Latency", value: "Under 150 milliseconds from snapshot to DB registry update" },
      { label: "Image Illumination", value: "850nm dedicated high-power IR LED flash strobe arrays" },
      { label: "Database Integrations", value: "SQL Server, Postgres, Oracle db links, and RESTful API endpoints" }
    ]
  },
  "cctv-ai": {
    id: "cctv-ai",
    title: "AI Surveillance Solution",
    tagline: "Smart Deep-Learning Human/Vehicle Classifications, Face Matchings & Boundary Protection",
    image: "https://images.unsplash.com/photo-1507146426996-ef05306b995a?q=80&w=1200&auto=format&fit=crop",
    icon: Cpu,
    overview: "Replacing blind standard recording with smart, proactive deep learning. Our AI-driven algorithms isolate pixel changes made by humans, animals, or vehicles, eliminating false motion triggers caused by rustling leaves or raindrops.",
    features: [
      { title: "Deep Crowd Heatmaps", desc: "Analyze footfall densities across retail areas to optimize personnel distribution and discover dead zones." },
      { title: "Smart Line Crossing Rules", desc: "Establish virtual boundary lines over perimeter fences, highlighting intruders instantly while ignoring harmless birds." },
      { title: "Facial Recognition Engines", desc: "Identify VIP clients or block harmful threats instantly with database match matrices." },
      { title: "Object Left Behind Alarms", desc: "Automatically trace abandoned luggage under terminal areas, alerting control hubs within seconds." },
      { title: "Active Behavior Analytics", desc: "Detect sudden physical falls, running crowds, or loitering patterns to enhance critical secure premises." },
      { title: "Smart Video Search Filters", desc: "Filter days of recordings in seconds by querying attributes (e.g. 'Red Shirt Person' or 'Blue Sedan')." }
    ],
    applications: [
      "High-Security Banking hubs",
      "Public Metro Stations",
      "Industrial Chemical complexes",
      "Public Retail malls",
      "VIP Residence Estates",
      "Airports & Logistics hubs"
    ],
    techSpecs: [
      { label: "AI Engine Frame Rate", value: "Real-time full-framing analysis up to 30fps at 4K stream" },
      { label: "Database Capacity scale", value: "High-performance local metadata library indexing up to 50,000 face profiles" },
      { label: "AI Processing location", value: "Hybrid edge-computing cameras and backend GPU server farms" },
      { label: "Protocol Compatibility", value: "ONVIF Profile S, G, T standard interfaces for global integration" }
    ]
  },
  "cctv-vms": {
    id: "cctv-vms",
    title: "VMS Based Analytical Surveillance Solution",
    tagline: "Enterprise Video Management Servers, Virtual Video Walls and Intelligent Dashboards",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1200&auto=format&fit=crop",
    icon: Layers,
    overview: "The ultimate control cockpit for massive camera fleets. We deploy industry-leading Video Management Systems (VMS) like Milestone, Genetec, and Nx Filter that unite thousands of camera feeds into a single unified window with dynamic mapping.",
    features: [
      { title: "Interactive e-Maps Layer", desc: "Pin camera locations directly on responsive floor plans, clicking on nodes to view active channels instantly." },
      { title: "Dynamic Video Wall Control", desc: "Drag and drop feeds across multiple television matrices from a central web console dashboard." },
      { title: "State-of-the-Art failover", desc: "1:1 server auto-hot swap, ensuring live video feeds and file pipelines never drop if hardware crashes." },
      { title: "Unified Event Console", desc: "Logs and displays all motion triggers, fire alarms, access card swipes, and AI boundaries side-by-side." },
      { title: "Secure Mobile Client apps", desc: "Encrypted remote access providing live layouts, telemetry search, and camera stream control on iOS & Android." },
      { title: "Advanced Metadata Tracking", desc: "Overlay and link telemetry streams (like POS registers checkout data or access card numbers) directly onto files." }
    ],
    applications: [
      "Smart City control rooms",
      "Large Airport terminal zones",
      "Metropolitan Stadium campuses",
      "Multi-city Corporate Headquarters",
      "Government administrative zones",
      "Complex Seaport facilities"
    ],
    techSpecs: [
      { label: "Server OS Compatibility", value: "Enterprise Windows Server 2022, Red Hat Enterprise Linux configurations" },
      { label: "Client Streaming support", value: "Uncapped concurrent user clients using smart GPU hardware acceleration decoding" },
      { label: "Database Integration APIs", value: "Rich REST APIs, Webhooks, TCP/UDP sockets, and SDK toolkits" },
      { label: "Failover Event latency", value: "Under 5 seconds automated node bypass and failover triggers" }
    ]
  },
  "cctv-storage": {
    id: "cctv-storage",
    title: "Data Storage Solution",
    tagline: "High-Reliability Surveillance SAN/NAS, Hot-Swap RAID Pools & Long-Term Video Archiving",
    image: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=1200&auto=format&fit=crop",
    icon: Database,
    overview: "Securing your high-priority CCTV video data. We deploy resilient, high-throughput network-attached storage databases, redundant RAID groups, and hybrid cloud archiving tiers that keep video files secure, accessible, and intact.",
    features: [
      { title: "Uninterrupted RAID storage", desc: "Configure RAID 5, RAID 6, or RAID 10 pools ensuring data safety even if multiple physical drives fail." },
      { title: "Massive Scalability limits", desc: "Expand local and network disk space up to petabytes without needing to stop active systems." },
      { title: "Hot-Swap Spare drive slots", desc: "Enables onsite IT personnel to replace dead drives without shutting down active operations." },
      { title: "Surveillance Grade Hard Disks", desc: "Deploy premium enterprise drives like WD Purple or Seagate SkyHawk rated for 24/7/365 heavy writing loads." },
      { title: "Smart Storage Tiering", desc: "Keep recent videos on ultra-fast local drives, shifting older files onto cheaper cold backup storage pools." },
      { title: "AES-256 File Encryption", desc: "Scramble video data with enterprise military-grade passwords to shield leaks from compromised volumes." }
    ],
    applications: [
      "Corporate Central IT vaults",
      "Large scale banking records",
      "Safe City long-term vaults",
      "Industrial facilities storage rooms",
      "Multi-site Retail records archives",
      "Private server room repositories"
    ],
    techSpecs: [
      { label: "Storage Architecture", value: "High-throughput iSCSI SAN, NFS/CIFS NAS, and SAS direct expansion arrays" },
      { label: "Drive Interface standards", value: "In-row Enterprise SATA-III, SAS 12Gbps interface platforms" },
      { label: "Long-Term retention support", value: "Optimized configs for 30-day, 90-day, or over 1-year compliance requirements" },
      { label: "Power Backup levels", value: "Dual-active hot-plug power supplies and intelligent battery-backed caches" }
    ]
  },
  "cctv-centralized": {
    id: "cctv-centralized",
    title: "Centralized Video Surveillance Solutions",
    tagline: "Multi-site CCTV Command Centers, Integrated Incident Dashboards and HQ Central Control Rooms",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200&auto=format&fit=crop",
    icon: Monitor,
    overview: "We unify hundreds of remote offices, showrooms, and warehouse hubs under a single master command center. We deploy fiber-optic networks, redundant cloud bridges, and secure streaming decoders to pipe visuals to headquarters.",
    features: [
      { title: "Unified HQ Master View", desc: "Monitor all regional and international branches from a single screen control center." },
      { title: "Dynamic Bandwidth Scaling", desc: "Optimized sub-streaming protocols that automatically scale resolutions on slow WAN lines." },
      { title: "Integrated Incident Dispatch", desc: "Instantly flag critical events across branches, routing active camera feeds to emergency response units." },
      { title: "Centralized Users Console", desc: "HQ super admins can instantly create, modify, or delete user access levels for any remote location." },
      { title: "Geographic GIS Map Links", desc: "Interactive maps featuring live status beacons for quick point-and-click video feeds." },
      { title: "Global Health Dashboard", desc: "Provides immediate notifications if any remote camera, storage drive, or network switch goes offline." }
    ],
    applications: [
      "Global Enterprise HQ networks",
      "Retail Showroom chains",
      "National Highway Operations",
      "State Police command stations",
      "Utility Grid Infrastructure",
      "Private Security Command sites"
    ],
    techSpecs: [
      { label: "Centralized user access", value: "Seamless Active Directory, LDAP, and SAML 2.0 Single Sign-On integrations" },
      { label: "Bandwidth optimization", value: "Continuous dynamic multi-stream switching and H.265 Smart Codecs" },
      { label: "Encryption and security", value: "AES-256 end-to-end stream encryption and secure VPN tunneling" },
      { label: "Supported Camera node count", value: "Scales to over 10,000 active cameras from a single central master command node" }
    ]
  },
  "conf-solution": {
    id: "conf-solution",
    title: "Conference Solution",
    tagline: "High-Performance Lecture Halls, Multi-Purpose Auditoriums & Large Boards Systems",
    image: "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?q=80&w=1200&auto=format&fit=crop",
    icon: Presentation,
    overview: "Our large-scale Conference Solutions support massive boardrooms, auditoriums, and corporate training centers. We deploy advanced beamforming audio mics, multi-screen matrix setups, and high-definition video pipelines enabling seamless mass communication with extreme fidelity.",
    features: [
      { title: "Large-Scale Presentation Setup", desc: "Dual or triple high-luminance laser screens displaying slide decks, active web video feeds, and audience stats simultaneously." },
      { title: "Smart Beamforming Microphone Array", desc: "Ceiling-mounted microphones designed to map speaker locations in 3D, canceling background ambient noise dynamically." },
      { title: "Integrated Room Central Control", desc: "Centralized iPads or touch screens managing lighting dimmers, audio faders, shades, and camera modes instantly." },
      { title: "Fiber-Optic Matrix Switchers", desc: "Ultra-low-latency 4K fiber video switchboards keeping raw audio and video streams pristine across huge distances." },
      { title: "Live Event Web Streaming Integration", desc: "Broadcast live townhalls on YouTube, Facebook, or private CDNs with high-quality redundant encoders." },
      { title: "Active Feedback Suppressors", desc: "DSP-driven multi-band audio filters that squash annoying mic screeching and feedback loops in real time." }
    ],
    applications: [
      "Large Corporate Executive Boardrooms",
      "Academic Lecture & Seminar Halls",
      "Multipurpose Exhibition Auditoriums",
      "Government Emergency Operations Labs",
      "International Convention Centers",
      "High-Density Interactive Classrooms"
    ],
    techSpecs: [
      { label: "Recommended Area capability", value: "Up to 500+ square meters room layout capacities" },
      { label: "Video Delivery format", value: "End-to-end uncompressed 4K HDMI over HDBaseT Cat6 channels" },
      { label: "Wireless RF Security encryption", value: "128-bit AES encrypted signal pathways on mic nodes" },
      { label: "Control System protocols", value: "Crestron, AMX, and Extron central automation compatibility" }
    ]
  },
  "conf-meeting-room": {
    id: "conf-meeting-room",
    title: "Meeting Room Solutions",
    tagline: "Interactive Team Collaboration, Hybrid Video Huddles & Rapid Booking Units",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop",
    icon: Users,
    overview: "Engineered for rapid everyday collaboration. We streamline local and hybrid communication in small-to-medium rooms and huddle spaces with dynamic plug-and-play soundbars, interactive whiteboards, and intelligent active calendar screens.",
    features: [
      { title: "All-In-One Unified Soundbar", desc: "Chic single-cable soundbars containing a wide-angle camera, direct beamforming mics, and hi-fi audio drivers." },
      { title: "BYOD Bring-Your-Own-Device Casting", desc: "Plug-and-play Type-C or HDMI transmitter dongles allowing visitors to cast laptops instantly with zero app installs." },
      { title: "Active Calendar Booking Pads", desc: "Beautiful wall-mount touch screens displaying seat calendars, highlighting red/green for room availability." },
      { title: "Smart Whiteboarding Syncing", desc: "Interactive touchboards that save, convert, and email meeting notes or brain maps to remote users automatically." },
      { title: "AI-Powered Face Framing", desc: "Integrated cams that auto-crop, focus, and follow remote partners to keep faces perfectly aligned on center screens." },
      { title: "Environment Comfort Tracking", desc: "Smart sensors tracking CO2 levels, temperature adjustments, and occupancy densities to optimize employee comfort." }
    ],
    applications: [
      "Co-working Huddle Spaces",
      "Interactive Brainstorming centers",
      "Private Recruiter Interview cabins",
      "Executive Single Offices",
      "Medium Project Development hubs",
      "Agile Stand-up Meeting zones"
    ],
    techSpecs: [
      { label: "Recommended Room Occupancy", value: "Optimized for 2 to 12 active participants comfortably" },
      { label: "Casting Compatibility list", value: "Apple AirPlay, Miracast, Google Chromecast, and USB-C hardware dongles" },
      { label: "All-in-One Bar Resolution", value: "4K UHD ePTZ camera with a wide 120-degree viewing angle" },
      { label: "Scheduler Platform integrations", value: "Native synchronization with MS Exchange, Outlook, Google Calendar, and Robin" }
    ]
  },
  "sound-professional": {
    id: "sound-professional",
    title: "Professional Sound system",
    tagline: "Concert-Grade Line Arrays, Stage Monitoring & Room Tuning Systems",
    image: "https://images.unsplash.com/photo-1516280440614-37939bbacd6a?q=80&w=1200&auto=format&fit=crop",
    icon: Mic,
    overview: "High-end balanced acoustic experiences engineered specifically for public Auditoriums, Large-scale Classrooms, Theaters, and complex live performance stages. We calibrate spatial delays and optimize feedback suppression for crisp, stunning sound.",
    features: [
      { title: "Smart Acoustic Spatial Alignment", desc: "Combines multi-cabinet layouts to maintain perfectly flat pressure across the entire audience area." },
      { title: "Professional Line Array Columns", desc: "Delivers balanced sound energy over long distances with less dropoff." },
      { title: "Feedback Suppression & Leveling", desc: "DSP-driven filters that lock onto annoying mic squeaks instantly and reduce their levels." },
      { title: "Digital Sound Mixing Consoles", desc: "iPad-controlled remote faders, scene presets, and multi-channel input routing." },
      { title: "Bi-amp Speaker Configurations", desc: "High and low frequencies driven by individual power modules for absolute purity." },
      { title: "Wireless Mic Encrypted Streams", desc: "High-end dual-receiver sets running on safe, interference-free frequencies." }
    ],
    applications: [
      "Auditoriums & Theatre Complex Halls",
      "Large Academic Lecture Centers",
      "Live Concert & Worship Spaces",
      "High-end Ballroom Banquet Halls",
      "Dynamic Studio Listening Rooms",
      "Multi-facility Municipal Centers"
    ],
    techSpecs: [
      { label: "Power Distribution capability", value: "Up to 50,000 Watts continuous Class-D amplifier pools" },
      { label: "Frequency dispersion profiles", value: "Adaptive 110° Horizontal and 15° Vertical coverage patterns" },
      { label: "Signal Processing matrixes", value: "96kHz/24-bit floating point high-precision processing engine" },
      { label: "Total Harmonic Distortion scale", value: "Below 0.005% for hyper-clear transparency" }
    ]
  },
  "sound-ip-pa": {
    id: "sound-ip-pa",
    title: "IP PA System",
    tagline: "Network-Powered SIP Audio, Mass Communication & Multi-Zone IP Paging",
    image: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?q=80&w=1200&auto=format&fit=crop",
    icon: Megaphone,
    overview: "Leveraging standard corporate IT network pipelines to distribute clear, zoned audio. Our IP Public Address systems connect easily to existing switches and SIP telephone hubs to enable flexible, centralized paging.",
    features: [
      { title: "PoE Network Active Speakers", desc: "Speakers containing their own digital amplifiers powered directly over thin Cat6 cables." },
      { title: "SIP Trunk Interlock", desc: "Dial a secure extension on any workspace desk telephone to broadcast directly out of the PA horns." },
      { title: "Multi-Branch Site Syncing", desc: "Pipe voice announcements to branches or offices hundreds of miles away in real time over VPNs." },
      { title: "Drag-and-Drop Software Control", desc: "Central web maps where administrators can group speakers into new paging zones on the fly." },
      { title: "Active Ambient Volume Listeners", desc: "Integrated mics that measure ambient factory noise and boost output automatically." },
      { title: "Schedule Message Engines", desc: "Pre-record and schedule daily drills, class bells, or closing alerts dynamically." }
    ],
    applications: [
      "Multi-Floor Corporate Campus Networks",
      "Deep Logistics & Distribution warehouses",
      "Regional Railway & Subway Platforms",
      "Chemical & Heavy Assembly Factories",
      "Healthcare Clinics & Hospital wings",
      "National Educational Campuses"
    ],
    techSpecs: [
      { label: "Audio Streaming Protocol", value: "Multicast RTP, SIP (RFC3261) compatibility" },
      { label: "Network Interface standards", value: "10/100/1000 Base-TX RJ45 ports" },
      { label: "Supported Codec list", value: "G.711a, G.711u, G.722 broadband clean voice codecs" },
      { label: "Internal Amplifier rating", value: "15W/30W active class-D units powered by standard PoE/PoE+" }
    ]
  },
  "sound-pa": {
    id: "sound-pa",
    title: "PA System",
    tagline: "Analog 100V Audio Networks, Fail-safe Evacuation Piping & Background Ambiance",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1200&auto=format&fit=crop",
    icon: Volume2,
    overview: "Reliable traditional 70V/100V high-impedance sound distribution. Perfect for long-distance background music (BGM) and clear, fail-safe public address. Highly durable and immune to line resistance.",
    features: [
      { title: "100V Low-Loss Long Lines", desc: "Allows thin copper cables to power hundreds of ceiling nodes up to kilometers away with zero signal loss." },
      { title: "Fire Alarm Emergency Override", desc: "Built-in priority override triggers that mute background music and blast evacuation tracks in high danger." },
      { title: "Step-style Attenuator Control", desc: "Wall-mounted volume dials for individual office rooms that safely drop or boost sound levels." },
      { title: "Balanced Mic Inputs", desc: "Priority inputs for paging mics that automatically duck background music when anyone speaks." },
      { title: "High-Durability Horn Assemblies", desc: "Weatherproof paging horns built to operate through heavy rains and extreme heat." },
      { title: "Clean AM/FM/USB Media Hubs", desc: "Integrated multi-media players with continuous auto-loop play for ambient business lobbies." }
    ],
    applications: [
      "Retail Supermarkets & Shopping Centers",
      "Industrial Assembly & Storage Complexes",
      "Public Office Corridors & Stairwells",
      "Budget School & Academic blocks",
      "Parking Garage Levels & Driveways",
      "Outdoor Recreation parks & Arenas"
    ],
    techSpecs: [
      { label: "System Voltage Standard", value: "70V, 100V constant high-impedance and low-impedance 4-16 Ohm outputs" },
      { label: "Priority Relay Activation", value: "24V DC priority input trigger for emergency messaging overrides" },
      { label: "Frequency Response width", value: "80Hz - 16kHz optimized for voice audibility and pleasant backing music" },
      { label: "Enclosure Ratings", value: "IP65 dust and moisture resistance ratings for outdoor horns" }
    ]
  },
  "telephony-pabx": {
    id: "telephony-pabx",
    title: "PABX & Intercom Solution",
    tagline: "On-Premises Hybrid PABX Systems, Secure Office Intercoms & Gate Access Panels",
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=1200&auto=format&fit=crop",
    icon: Phone,
    overview: "Robust hybrid telephone networks designed for reliable, high-density corporate intercom loops and gate entry. We integrate traditional copper lines (CO/FXO), digital extensions (FXS), and IP links into a single unified business loop.",
    features: [
      { title: "Hybrid Line Configuration", desc: "Supports analogue phones, digital executive desk phones, and modern cost-effective IP endpoints." },
      { title: "Secure Door Station Interlocks", desc: "Voice intercom terminals at gate locks that let receptionists buzz visitors inside with a code." },
      { title: "Instant Office Ring Groups", desc: "Group multiple extensions such as Support or Billing to ring simultaneously for faster answers." },
      { title: "Automatic Day/Night Scheduling", desc: "Diverts incoming customer calls to automated voicemail boxes or off-site phones after-hours." },
      { title: "Built-in Voice Recording", desc: "Records incoming/outgoing conversations onto central storage drives for security and training." },
      { title: "Direct Page & Intercom", desc: "Instantly page an employee's desk speaker without waiting for them to pick up the receiver." }
    ],
    applications: [
      "General Corporate & Academic Offices",
      "Residential Security Gates & Guard Houses",
      "Multi-floor Office Buildings",
      "Private Medical Clinics & Hospitals",
      "Manufacturing Plant Floor Centers",
      "Hotel Room Extensions & Front Desks"
    ],
    techSpecs: [
      { label: "Trunks support interfaces", value: "FXO analogue CO lines, PRI E1 ISDN connections, and SIP digital channels" },
      { label: "Extension ports configurations", value: "RJ11 analog terminal lines, digital master line groups, and Ethernet networks" },
      { label: "Simultaneous Active Calls support", value: "Scales from 4 to over 120 concurrent lines without bottlenecking" },
      { label: "Hardware configuration details", value: "Modular wall-mountable or 19-inch server-rackable chassis options" }
    ]
  },
  "access-facial": {
    id: "access-facial",
    title: "Facial Recognition Solution",
    tagline: "Deep Learning Instant Face Matching, High-Accuracy Mask Detection & Access Control Integration",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop",
    icon: ScanFace,
    overview: "Enterprise-grade facial recognition algorithms designed for zero-contact high-speed access control. Our systems run deep neural networks to match faces in milliseconds, identify whitelist profiles, verify mask compliance, and trigger automatic doors.",
    features: [
      { title: "Sub-Second Face Matching", desc: "Recognizes face profiles in under 0.2 seconds with a highly optimized neural matching model." },
      { title: "Dynamic Ambient Compensation", desc: "Performs flawlessly under extreme backlight, low dark ambient, or sudden brightness changes." },
      { title: "Dual-Lens Anti-Spoofing Sensors", desc: "Uses advanced infrared depth stereography to prevent cheating via phone photos or printouts." },
      { title: "Body-Temperature Monitoring", desc: "Optional integrated thermal modules that measure skin temperature and flag fevers as people walk through." },
      { title: "Whitelist & Blacklist Alert Engines", desc: "Instantly alert security desks when an unauthorized profile or bad actor is identified." },
      { title: "No-Contact Sanitary Entry", desc: "Eliminates germ spread by opening glass sliding gates with just a physical facial gaze." }
    ],
    applications: [
      "High-Security Banking Vaults",
      "Executive Headquarters Entrances",
      "Government Administrative Wings",
      "Modern Co-Working Lift Lobbies",
      "Restricted Airport Terminal boarding gates",
      "Confidential R&D Laboratory rooms"
    ],
    techSpecs: [
      { label: "Matching Accuracy rate", value: "99.9% precision under diverse lighting layouts" },
      { label: "Face Database limits", value: "Scales up to 100,000 unique face profiles on local edge terminals" },
      { label: "Recognition Reading range", value: "Supports physical read distances from 0.5 to 3.0 meters" },
      { label: "Network interface protocols", value: "Wiegand output, RS-485, TCP/IP, and built-in Wi-Fi adapters" }
    ]
  },
  "access-biometric": {
    id: "access-biometric",
    title: "Bio-Metric Time Attendance Solution",
    tagline: "Automated Staff Time Logging, Anti-buddy Punching, & Payroll Software Sync",
    image: "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?q=80&w=1200&auto=format&fit=crop",
    icon: Fingerprint,
    overview: "Durable and accurate employee logging solutions. With options for fingerprint, vein pattern, and iris scanners, we offer complete time-attendance automation that connects with major HR and ERP tools.",
    features: [
      { title: "Zero Live Punch Buddying", desc: "Stops employees from logging hours on behalf of absent colleagues using physical biometric locks." },
      { title: "High-Sensitivity Glass Scanners", desc: "Optical glass fingerprint arrays that excel at reading faded, wet, or grease-stained fingers." },
      { title: "Dynamic Shift Planners", desc: "Accommodates intricate shift, rotating, overnight, and split employee rotas easily." },
      { title: "Real-time Push Technology", desc: "Instantly relays check-in updates directly to central HR office dashboards via local networks." },
      { title: "USB Offsite Logs Backup", desc: "Enables manual logs retrieval using standard USB drives during sudden connectivity drops." },
      { title: "Built-in Voice Prompts", desc: "Greets personnel with clear auditive 'Thank You' alerts and confirmation highlights upon successful logging." }
    ],
    applications: [
      "Factory Assembly Line floors",
      "Multi-Location Retail Chain showrooms",
      "Corporate Office Headquarters",
      "Educational staff rooms",
      "Hotel & Restaurant kitchen centers",
      "Construction site check-in cabins"
    ],
    techSpecs: [
      { label: "Verification Speed ratings", value: "Under 0.5 seconds comparison check times" },
      { label: "Logs Transaction capacity", value: "Saves up to 1,000,000 offline event logs during internet disruptions" },
      { label: "Validation Scan support", value: "Fingerprint, PIN entry, RF Card tap, and hybrid choices" },
      { label: "Database Sync connectivity", value: "SQL integrations, direct SDK links, and automated CSV reports generation" }
    ]
  },
  "access-visitor": {
    id: "access-visitor",
    title: "Visitor Management",
    tagline: "Touchscreen Visitor Badges, Digital NDAs & Automated Host Alerts",
    image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=1200&auto=format&fit=crop",
    icon: Users,
    overview: "Create an elegant first impression for visitors. Our Visitor Management solution replaces paper notebooks with smart digital terminals that print badges, sign NDAs, and text hosts when guests arrive.",
    features: [
      { title: "Smart Self-Check-In Desks", desc: "Interactive tablets where corporate visitors type their names and click on hosts independently." },
      { title: "Instant QR Entry Badges", desc: "Generate and send QR entry passes to visitors via email in advance for instant gate passage." },
      { title: "High-Speed Label Printing", desc: "Automated badge machines spitting out high-contrast photo sticker labels within seconds." },
      { title: "Integrated Digital NDAs", desc: "Prompt visitors to review and digitally sign safety agreements or NDA terms during check-in." },
      { title: "Automated WhatsApp Alerts", desc: "Sends instant SMS and email notifications to employees when guests arrive to pick them up." },
      { title: "Real-Time Occupancy Logs", desc: "Instantly see the exact list of visitors inside your premises in emergency evacuations." }
    ],
    applications: [
      "Modern Corporate Lobby desks",
      "Industrial chemical compounds",
      "Co-working community offices",
      "High-End Residential Towers",
      "Creative Design Agencies",
      "Healthcare Clinic entry gates"
    ],
    techSpecs: [
      { label: "Terminal App Platform support", value: "Designed for Apple iPad, Android Tablets, and Windows kiosks" },
      { label: "Supported Printer standard", value: "Epson and Brother High-Speed direct thermal USB/WiFi barcode printers" },
      { label: "Security compliance standard", value: "GDPR compliant visitor record hashing and customizable auto-delete rules" },
      { label: "Push Notification protocols", value: "Native SMS APIs, Twilio WhatsApp, and direct SMTP mail engines" }
    ]
  },
  "access-barrier": {
    id: "access-barrier",
    title: "Gate Barrier Solution",
    tagline: "Rapid Automatic Boom Barriers, Long-Range RFID Readers & Guard Controls",
    image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=1200&auto=format&fit=crop",
    icon: Shield,
    overview: "Heavy-duty outdoor automatic boom barriers, sliding gates, and card readers built to manage access at busy vehicle entrances with extreme speed and long-term durability.",
    features: [
      { title: "High-Frequency Brushless DC Motors", desc: "Engineered for 100% continuous duty cycles without overheating or thermal stalls." },
      { title: "Long-Range UHF RFID Sensors", desc: "Read passive vehicle decals up to 10 meters away, raising the gate before drivers stop." },
      { title: "Anti-Crush loop detectors", desc: "Underground loops that pause barrier descent if a car or human is directly underneath." },
      { title: "Telescopic & Folding boom arms", desc: "Special folding arm kits designed for basement garages with restricted overhead heights." },
      { title: "Heavy Impact Quick Release", desc: "Boom hinges that detach safely if hit by a car, saving the motor from expensive damage." },
      { title: "Manual Emergency Override", desc: "Includes easy-turn keys to lock barriers open during total power outages or physical drills." }
    ],
    applications: [
      "Shopping Mall parking docks",
      "Residential estate entry gates",
      "Airport Terminal curbside gates",
      "Sea Port logistics entries",
      "Private Corporate toll points",
      "Industrial factory security nodes"
    ],
    techSpecs: [
      { label: "Gate Opening velocity", value: "Adjustable speed options from 1.5 to 6.0 seconds" },
      { label: "Chassis Ingress rating", value: "IP54 / IP55 Weatherproof heavy-duty cold-rolled steel cabinet with powder coating" },
      { label: "Expected lifespan cycles", value: "Over 5,000,000 trouble-free opening and closing operations" },
      { label: "Boom physical arm lengths", value: "Scalable arm kits covering 3.0 meters up to 6.0 meters wide" }
    ]
  },
  "access-hotel": {
    id: "access-hotel",
    title: "Hotel Series Door Lock",
    tagline: "Elegant Smart Handles, High-Security Mifare RFID Keycards & Software Check-In Logs",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200&auto=format&fit=crop",
    icon: Lock,
    overview: "Sophisticated lock handles crafted for modern hospitality properties. We provide robust RFID door units alongside card encoders and management software, allowing easy control of room bookings and visitor logs.",
    features: [
      { title: "Mifare smart card scanners", desc: "Secure multi-sector card reading that prevents unauthorized room card duplication." },
      { title: "Stainless Steel ANSI Mortise", desc: "Super-duty 5-latch mortise layouts built to survive millions of door movements." },
      { title: "Low Battery Warning buzzer", desc: "Warns hotel maids with sound indicators and lights when lock batteries need replacing." },
      { title: "Hidden Emergency Keys", desc: "Discreet mechanical barrels hidden behind handles for physical entry during emergencies." },
      { title: "Audit Trail memory chips", desc: "Logs the last 200 physical unlocks, showing exactly which cards and keys were used." },
      { title: "Corrosion Resistant plating", desc: "Specially treated with electrophoretic paint to survive beach resorts and damp hallways." }
    ],
    applications: [
      "Luxury Holiday Coast resorts",
      "Multi-Floor Corporate guest houses",
      "High-End Airbnb apartments",
      "University student hostels",
      "Luxury boutique design hotels",
      "Private members club compounds"
    ],
    techSpecs: [
      { label: "Door lock power model", value: "4 standard AA Alkaline batteries lasting up to 18 months" },
      { label: "Lock Handle Material", value: "Heavy Solid Zinc Alloy or SUS304 Premium Stainless steel options" },
      { label: "Door width requirements", value: "Compatible with door thickness dimensions from 35mm to 60mm" },
      { label: "Card Reader speed scale", value: "Reading and verifying cards in under 0.25 seconds" }
    ]
  },
  "access-scanning": {
    id: "access-scanning",
    title: "Archway & Luggage Scanning Solution",
    tagline: "Multi-Zone Metal Detectors, High-Throughput X-Ray Scanning & Security Checkpoints",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1200&auto=format&fit=crop",
    icon: Shield,
    overview: "Heavy-duty security checkpoint hardware built to protect entries. We supply and integrate highly sensitive walk-through metal detectors alongside X-ray belt systems to safely flag hidden threats.",
    features: [
      { title: "Multi-Zone pinpoints alerts", desc: "Splits detection grid into 18, 33, or 45 zones, showing exact threat heights using side LEDs." },
      { title: "Intelligent Passenger Counter", desc: "Saves high-accuracy statistics of check-in volume separate from metal threat flags." },
      { title: "Organic/Inorganic separation", desc: "Belt screening software that highlights explosives or weapons with contrasting colors." },
      { title: "Low Radiation belt systems", desc: "X-ray lines designed to protect airport operators and nearby travelers." },
      { title: "Instant Threat Alarm triggers", desc: "Pipes high-priority sound tones and red visual screens to police/security desks." },
      { title: "Wheelchair Accessible frames", desc: "Provides wide interior walk-through structures to ensure all visitors can enter comfortably." }
    ],
    applications: [
      "Airport Terminal checking hubs",
      "State District court entrances",
      "Metropolitan Rail & Train Stations",
      "Five Star Hotel lobby gates",
      "Stadium & Auditorium entrances",
      "Government buildings & Embassy gates"
    ],
    techSpecs: [
      { label: "Walk-Through Sensitivity scales", value: "256 separate gain levels to optimize detection thresholds" },
      { label: "X-Ray Tunnel sizes", value: "Standard 60x40cm, 80x65cm, or 100x100cm pallet loading options" },
      { label: "Belt Loading load limits", value: "Supports continuous weight loads from 150kg to 250kg on moving belts" },
      { label: "System health monitoring", value: "Self-diagnostic alerts during boot up to verify correct sensor alignment" }
    ]
  },
  "access-parking": {
    id: "access-parking",
    title: "Vehicle Parking Management System",
    tagline: "Smart Ticket Dispensers, Fee Calculation Terminals & Dynamic LED Space Indicators",
    image: "https://images.unsplash.com/photo-1506521788773-a90d54026bb0?q=80&w=1200&auto=format&fit=crop",
    icon: Car,
    overview: "End-to-end ticketing, space tracking, and payment architectures for busy parking garages. We combine automated ticket dispensers, centralized cashier software, and electronic space indicators to boost efficiency.",
    features: [
      { title: "Fast QR thermal ticket print", desc: "High-contrast thermal dispensers with rapid paper cutters that emit tickets in under 1 second." },
      { title: "Automatic License Plate matching", desc: "Compares vehicle check-in plates with check-out tickets to stop ticket fraud and vehicle theft." },
      { title: "Central Cashier Station screens", desc: "Cashier software that instantly scans ticket barcodes and calculates parking fees." },
      { title: "Dynamic Space Indicator LEDs", desc: "Ceiling-mounted sensors that highlight green/red over spaces to guide empty spots." },
      { title: "Multi-Floor Master Boards", desc: "Bright lobby LED boards showcasing vacant space numbers across different levels." },
      { title: "Uninterruptible offline mode", desc: "Saves parking events on local controllers when network connections drop." }
    ],
    applications: [
      "Commercial Shopping malls",
      "Hospital parking zones",
      "Enterprise corporate garages",
      "Subway Park & Ride stations",
      "Airport Terminal parking towers",
      "Multi-Leveled public parking silos"
    ],
    techSpecs: [
      { label: "Ticket scanning speed", value: "Under 0.5 seconds barcode recognition times" },
      { label: "Space sensors precision", value: "Ultrasonic echo tracking covering 99.8% precision" },
      { label: "Integrated Payment formats", value: "Barcode, smart cards, NFC mobile taps, and Cash systems" },
      { label: "Outdoor LED screen pitch", value: "P10 High-Luminance outdoor arrays visible in blazing sun" }
    ]
  },
  "vas-managed": {
    id: "vas-managed",
    title: "Manage Services",
    tagline: "Proactive Network Health Monitoring, Cloud VM Administration & SLA Support Contracts",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&auto=format&fit=crop",
    icon: Wrench,
    overview: "Complete technical outsourcing for your peace of mind. We take full responsibility for monitoring, managing, and maintaining your network gear, servers, and smart security setups to ensure 99.99% uptime.",
    features: [
      { title: "Proactive 24/7 Server Checks", desc: "We monitor performance, disk health, and memory load continuously, correcting issues before they hit operations." },
      { title: "Automated Software Updates", desc: "Scheduling OS security patches and firmware updates overnight to completely avoid disrupting workflows." },
      { title: "Offsite cloud backups sync", desc: "Continuous backup engines protecting database files and configurations with secure, remote cloud storage." },
      { title: "Monthly Performance Reviews", desc: "Receive transparent reports highlighting network bottlenecks, security flags, and recommended hardware upgrades." },
      { title: "Strict SLA response times", desc: "Guarantees direct access to senior emergency engineers within minutes of critical event tickets." },
      { title: "Enterprise Anti-Virus Guard", desc: "Centrally managed antivirus suites protecting office workstations from dangerous ransomware." }
    ],
    applications: [
      "Small to Mid-Scale Corporate IT networks",
      "Corporate financial services centers",
      "Continuous E-Commerce platforms",
      "Multi-site logistics headquarters",
      "Academic research server rooms",
      "Evolving SME business offices"
    ],
    techSpecs: [
      { label: "SLA Response Guarantee", value: "Tier 1 Critical response guarantee under 30 minutes, 24/7/365 active" },
      { label: "Monitoring check interval", value: "Automated heartbeat checks every 60 seconds on critical devices" },
      { label: "Dedicated Helpdesk options", value: "Web tickets portal, direct whatsapp channels, and phone support" },
      { label: "Encryption safety level", value: "End-to-end AES-256 encrypted VPN links for remote support monitoring" }
    ]
  },
  "vas-oncall": {
    id: "vas-oncall",
    title: "On call Services",
    tagline: "On-Demand Hardware Repairs, Rapid On-Site Troubleshooting & Emergency Help",
    image: "https://images.unsplash.com/photo-1521791136368-1a46827d52bc?q=80&w=1200&auto=format&fit=crop",
    icon: PhoneCall,
    overview: "Pay-as-you-go technical troubleshooting whenever hardware fails. We deploy certified, fully-equipped engineers directly to your facilities to rapidly diagnose and resolve issues.",
    features: [
      { title: "Rapid On-Site dispatch", desc: "Deploying certified field engineers to your facility when severe network or hardware faults occur." },
      { title: "Certified Hardware Engineers", desc: "Our technicians hold official certifications (Cisco, Hikvision, Dahua, Crestron) to ensure pristine support." },
      { title: "Clear Diagnostics reporting", desc: "Receive a detailed post-visit audit report explaining root causes, fixes applied, and preventive advice." },
      { title: "Direct Spare Parts sourcing", desc: "Immediate access to genuine spare parts from major brands at optimal pricing without delay." },
      { title: "Accidental physical damage fix", desc: "Troubleshoots water-damaged routers, blown capacitors, burnt adapters, or damaged camera sensors." },
      { title: "Flexible Hourly pricing models", desc: "Pay only for actual hours worked, avoiding expensive long-term retainer agreements." }
    ],
    applications: [
      "Small local retail shops",
      "Corporate offices without in-house IT",
      "Schools experiencing sudden WiFi blocks",
      "Apartment complex intercom failures",
      "Commercial showrooms with loose wiring",
      "Warehouses with damaged barcode arrays"
    ],
    techSpecs: [
      { label: "Average Dispatch Latency", value: "Under 2 hours for standard city metropolitan areas" },
      { label: "Engineer Certification lists", value: "Cisco CCNA, CompTIA A+, HikVision HCSA, and Dahua DHSP" },
      { label: "Emergency Callback speed", value: "Receive a phone call back from a senior field architect within 15 minutes Of booking" },
      { label: "Diagnostic Hardware tools", value: "Fluke network testers, OTDR fiber checkers, and dynamic sound meters" }
    ]
  },
  "vas-onestop": {
    id: "vas-onestop",
    title: "One Stop support services",
    tagline: "All-in-One IT, CCTV, Access & Audio Care, Multi-vendor Coordination & Simple Billing",
    image: "https://images.unsplash.com/photo-1450133064473-71024230f91b?q=80&w=1200&auto=format&fit=crop",
    icon: HeartHandshake,
    overview: "A single point of contact for your entire tech infrastructure. We simplify your operations by managing all your IT, CCTV, networking, and telecom gear under a single contract, eliminating multi-vendor finger-pointing.",
    features: [
      { title: "Single Dedicated Account Rep", desc: "No call-centers. You get a single assigned manager who knows your layout and history." },
      { title: "Complete Vendor coordination", desc: "We call and coordinate directly with third-party ISPs, telephone carriers, and hardware brands for you." },
      { title: "Unified Invoicing loops", desc: "Combines domain hosting, internet billing, phone accounts, and hardware support into one clean bill." },
      { title: "Annual Preventive checkups", desc: "Includes thorough yearly physical sweep-ups of dust, lens cleaning, and cable tension checks." },
      { title: "All-In-One Warranty manage", desc: "We track and handle warranty repairs or replacements with diverse manufacturers on your behalf." },
      { title: "Continuous tech advisory", desc: "Expert advice on upgrading systems without disrupting your business budget." }
    ],
    applications: [
      "Large scale corporate headquarters",
      "Multi-Facility Private Hospitals",
      "Evolving Academic University colleges",
      "Multi-Floor Manufacturing compound facilities",
      "Multi-site Corporate logistics centers",
      "Government Administrative departments"
    ],
    techSpecs: [
      { label: "Supported Vendor brands", value: "Cisco, Ubiquiti, Fortinet, Milestone, Bosch, Honeywell, Crestron, Yealink, etc." },
      { label: "Coverage scope standard", value: "Covers local networks, active firewalls, servers, storage, CCTV, access systems, and meeting rooms" },
      { label: "Contract duration options", value: "Flexible 1-Year, 3-Year, or 5-Year Enterprise packages available" },
      { label: "Emergency standby levels", value: "Provides secure hot-spare replacement devices stored in our local warehouses" }
    ]
  },
  "vas-payment": {
    id: "vas-payment",
    title: "Service upon payment",
    tagline: "Pre-Paid IT Credits, Flexible Maintenance Packages & Pay-Per-Incident Billing",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=1200&auto=format&fit=crop",
    icon: CreditCard,
    overview: "No complex monthly retainers or long-term SLAs required. Secure top-shelf corporate IT, audio-visual, and CCTV engineering exactly when you need it with our straightforward, transparent pay-per-incident rates.",
    features: [
      { title: "Pre-Paid IT Support Credits", desc: "Purchase blocks of technician hours at a discount, spending them as needs arise with no expiration." },
      { title: "Clear Flat-Rate pricing sheet", desc: "Enjoy upfront pricing for standard work like running network cables, adding cameras, or fixing servers." },
      { title: "Instant Mobile Card Payment", desc: "Our field engineers carry mobile POS terminals to easily accept credit cards and mobile taps." },
      { title: "Digital Quote approvals", desc: "Review and approve dynamic quotes on your mobile phone before we start any repair work." },
      { title: "No hidden administrative fees", desc: "You only pay for actual time spent on-site and the raw cost of replacement hardware." },
      { title: "Itemized Digital receipts", desc: "Get itemized invoices with photos of the repaired/installed equipment sent straight to your email." }
    ],
    applications: [
      "Fast-moving commercial retail shops",
      "Startup business incubator houses",
      "Community worship locations",
      "Private medical clinics & offices",
      "Local food and drink restaurants",
      "Individual security installations"
    ],
    techSpecs: [
      { label: "Payment processors accepted", value: "Visa, Mastercard, Amex, Mobile wallets, Bank wire, and secure Online portal checkouts" },
      { label: "Credit validity window", value: "Pre-paid support credit packages remain valid for 24 months from purchase date" },
      { label: "Support Dispatch tier", value: "Assigned within 24 hours of successful ticket/payment check" },
      { label: "Ticket refund window guidelines", value: "No-fix-no-fee guarantee - complete refund on diagnostic fee if we cannot isolate the issue" }
    ]
  }
};

const LucideIcons: Record<string, React.ComponentType<any>> = {
  ArrowRight, 
  ChevronRight, 
  Phone, 
  Mail, 
  MapPin, 
  CheckCircle2, 
  Video, 
  Volume2, 
  Eye, 
  HeartHandshake, 
  Fingerprint, 
  PhoneCall, 
  Server, 
  Network,
  Clock,
  Briefcase,
  FileText,
  Send,
  HelpCircle,
  Database,
  Activity,
  Cable,
  Zap,
  Grid,
  Battery,
  Droplets,
  Snowflake,
  Power,
  Camera,
  Cpu,
  Layers,
  Monitor,
  Users,
  Presentation,
  Mic,
  Megaphone,
  ScanFace,
  Lock,
  Shield,
  Car,
  Wrench,
  CreditCard
};

interface SolutionDetailPageProps {
  solutionId: string;
}

export default function SolutionDetailPage({ solutionId }: SolutionDetailPageProps) {
  const [solutions, setSolutions] = useState(() => dataStore.getSolutions());
  const [contact, setContact] = useState(() => dataStore.getContactInfo());

  useEffect(() => {
    const handleUpdate = () => {
      setSolutions(dataStore.getSolutions());
      setContact(dataStore.getContactInfo());
    };
    window.addEventListener("datastore-update", handleUpdate);
    return () => {
      window.removeEventListener("datastore-update", handleUpdate);
    };
  }, []);

  const SOLUTIONS_DATA = Object.keys(solutions).reduce((acc, key) => {
    const item = solutions[key];
    acc[key] = {
      ...item,
      icon: LucideIcons[item.iconName] || Briefcase
    };
    return acc;
  }, {} as Record<string, any>);

  const currentSolution = SOLUTIONS_DATA[solutionId] || SOLUTIONS_DATA.conference || {
    id: "conference",
    title: "",
    tagline: "",
    image: "",
    icon: Briefcase,
    overview: "",
    features: [],
    applications: [],
    techSpecs: []
  };

  
  // Local states for the consultation request form
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Scroll to top when solution changes (Turned off as requested)
  useEffect(() => {
    // window.scrollTo({ top: 0, behavior: "smooth" });
    setIsSuccess(false); // Reset form success message when changing pages
    setFormData({ name: "", company: "", email: "", phone: "", message: "" });
  }, [solutionId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) return;

    setIsSubmitting(true);
    // Simulate API calls
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1200);
  };

  // Icons configuration of current solution
  const IconComponent = currentSolution.icon;

  // 1. Subpage Navigation Menu for Services & Solutions
  const renderSolutionsList = () => (
    <div id="solutions-list-nav" className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6">
      <h3 className="text-slate-900 font-extrabold text-sm uppercase tracking-wider mb-4 pb-3 border-b border-slate-100 flex items-center gap-2">
        <Briefcase className="w-4 h-4 text-indigo-600" />
        Our Solutions
      </h3>
      
      <div className="flex flex-col gap-2">
        {[
          "conference",
          "sound",
          "cctv",
          "vas",
          "access",
          "telephony",
          "datacenter",
          "network"
        ].map((id) => {
          const sol = SOLUTIONS_DATA[id];
          if (!sol) return null;
          const isActive = sol.id === currentSolution.id;
          const SolIcon = sol.icon;
          
          // Check if the current solution being viewed is one of the sub-menus of Datacenter, Network, CCTV, or Conference
          const isDatacenterGroupActive = ["datacenter", "dcim", "ems", "nms", "server-lan", "storage"].includes(currentSolution.id);
          const isNetworkGroupActive = ["network", "passive-lan", "fiber-optic", "dc-power", "rack-management", "raise-floor", "online-ups", "dehumidifier", "precision-cooling"].includes(currentSolution.id);
          const isCctvGroupActive = ["cctv", "cctv-ip-analog", "cctv-anpr", "cctv-ai", "cctv-vms", "cctv-storage", "cctv-centralized"].includes(currentSolution.id);
          const isConferenceGroupActive = ["conference", "conf-solution", "conf-meeting-room"].includes(currentSolution.id);
          const isSoundGroupActive = ["sound", "sound-professional", "sound-ip-pa", "sound-pa"].includes(currentSolution.id);
          const isTelephonyGroupActive = ["telephony", "telephony-pabx"].includes(currentSolution.id);
          const isAccessGroupActive = ["access", "access-facial", "access-biometric", "access-visitor", "access-barrier", "access-hotel", "access-scanning", "access-parking"].includes(currentSolution.id);
          const isVasGroupActive = ["vas", "vas-managed", "vas-oncall", "vas-onestop", "vas-payment"].includes(currentSolution.id);
          const isMainDatacenter = sol.id === "datacenter";
          const isMainNetwork = sol.id === "network";
          const isMainCctv = sol.id === "cctv";
          const isMainConference = sol.id === "conference";
          const isMainSound = sol.id === "sound";
          const isMainTelephony = sol.id === "telephony";
          const isMainAccess = sol.id === "access";
          const isMainVas = sol.id === "vas";
          const shouldHighlightParent = (isMainDatacenter && isDatacenterGroupActive && !isActive) || (isMainNetwork && isNetworkGroupActive && !isActive) || (isMainCctv && isCctvGroupActive && !isActive) || (isMainConference && isConferenceGroupActive && !isActive) || (isMainSound && isSoundGroupActive && !isActive) || (isMainTelephony && isTelephonyGroupActive && !isActive) || (isMainAccess && isAccessGroupActive && !isActive) || (isMainVas && isVasGroupActive && !isActive);

          return (
            <div key={sol.id} className="flex flex-col gap-1.5">
              <a
                href={`#${sol.id}`}
                className={`flex items-center justify-between p-3 rounded-xl text-left border transition-all text-xs group ${
                  isActive 
                  ? "bg-indigo-600 text-white border-indigo-600 font-bold shadow-md shadow-indigo-600/10" 
                  : shouldHighlightParent
                  ? "bg-indigo-50 hover:bg-slate-100 text-indigo-700 border-indigo-100 font-bold"
                  : "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-100 hover:border-slate-200 font-semibold"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`p-1.5 rounded-lg ${isActive ? "bg-white/20 text-white" : shouldHighlightParent ? "bg-indigo-100 text-indigo-700 font-bold" : "bg-white text-slate-500 border border-slate-100"}`}>
                    <SolIcon className="w-3.5 h-3.5" />
                  </span>
                  <span className="line-clamp-1">{sol.title}</span>
                </div>
                <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isActive ? "translate-x-0.5 text-white" : "text-slate-400 group-hover:translate-x-0.5"}`} />
              </a>
              
              {/* Render nested sub-items under Conference Room Solution if active */}
              {isMainConference && isConferenceGroupActive && (
                <div className="ml-5 pl-4 border-l-2 border-indigo-100 flex flex-col gap-1.5 py-1 mb-1">
                  {[
                    "conf-solution",
                    "conf-meeting-room"
                  ].map((subId) => {
                    const subSol = SOLUTIONS_DATA[subId];
                    if (!subSol) return null;
                    const isSubActive = subSol.id === currentSolution.id;
                    const SubIcon = subSol.icon;
                    return (
                      <a
                        key={subSol.id}
                        href={`#${subSol.id}`}
                        className={`flex items-center justify-between p-2.5 rounded-lg text-left border transition-all text-[11px] group ${
                          isSubActive 
                          ? "bg-indigo-500 text-white border-indigo-100 font-bold shadow-sm" 
                          : "bg-white hover:bg-slate-50 text-slate-600 border-slate-100 hover:border-slate-200 font-semibold"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className={`p-1 rounded-md ${isSubActive ? "bg-white/20 text-white" : "bg-slate-50 text-slate-400"}`}>
                            <SubIcon className="w-3.5 h-3.5" />
                          </span>
                          <span className="line-clamp-1">{subSol.title}</span>
                        </div>
                        <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isSubActive ? "translate-x-0.5 text-white" : "text-slate-400 group-hover:translate-x-0.5"}`} />
                      </a>
                    );
                  })}
                </div>
              )}

              {/* Render nested sub-items under Sound System Solution if active */}
              {isMainSound && isSoundGroupActive && (
                <div className="ml-5 pl-4 border-l-2 border-indigo-100 flex flex-col gap-1.5 py-1 mb-1">
                  {[
                    "sound-professional",
                    "sound-ip-pa",
                    "sound-pa"
                  ].map((subId) => {
                    const subSol = SOLUTIONS_DATA[subId];
                    if (!subSol) return null;
                    const isSubActive = subSol.id === currentSolution.id;
                    const SubIcon = subSol.icon;
                    return (
                      <a
                        key={subSol.id}
                        href={`#${subSol.id}`}
                        className={`flex items-center justify-between p-2.5 rounded-lg text-left border transition-all text-[11px] group ${
                          isSubActive 
                          ? "bg-indigo-500 text-white border-indigo-100 font-bold shadow-sm" 
                          : "bg-white hover:bg-slate-50 text-slate-600 border-slate-100 hover:border-slate-200 font-semibold"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className={`p-1 rounded-md ${isSubActive ? "bg-white/20 text-white" : "bg-slate-50 text-slate-400"}`}>
                            <SubIcon className="w-3.5 h-3.5" />
                          </span>
                          <span className="line-clamp-1">{subSol.title}</span>
                        </div>
                        <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isSubActive ? "translate-x-0.5 text-white" : "text-slate-400 group-hover:translate-x-0.5"}`} />
                      </a>
                    );
                  })}
                </div>
              )}

              {/* Render nested sub-items under Access Control Solution if active */}
              {isMainAccess && isAccessGroupActive && (
                <div className="ml-5 pl-4 border-l-2 border-indigo-100 flex flex-col gap-1.5 py-1 mb-1">
                  {[
                    "access-facial",
                    "access-biometric",
                    "access-visitor",
                    "access-barrier",
                    "access-hotel",
                    "access-scanning",
                    "access-parking"
                  ].map((subId) => {
                    const subSol = SOLUTIONS_DATA[subId];
                    if (!subSol) return null;
                    const isSubActive = subSol.id === currentSolution.id;
                    const SubIcon = subSol.icon;
                    return (
                      <a
                        key={subSol.id}
                        href={`#${subSol.id}`}
                        className={`flex items-center justify-between p-2.5 rounded-lg text-left border transition-all text-[11px] group ${
                          isSubActive 
                          ? "bg-indigo-500 text-white border-indigo-100 font-bold shadow-sm" 
                          : "bg-white hover:bg-slate-50 text-slate-600 border-slate-100 hover:border-slate-200 font-semibold"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className={`p-1 rounded-md ${isSubActive ? "bg-white/20 text-white" : "bg-slate-50 text-slate-400"}`}>
                            <SubIcon className="w-3.5 h-3.5" />
                          </span>
                          <span className="line-clamp-1">{subSol.title}</span>
                        </div>
                        <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isSubActive ? "translate-x-0.5 text-white" : "text-slate-400 group-hover:translate-x-0.5"}`} />
                      </a>
                    );
                  })}
                </div>
              )}

              {/* Render nested sub-items under Value Added Service if active */}
              {isMainVas && isVasGroupActive && (
                <div className="ml-5 pl-4 border-l-2 border-indigo-100 flex flex-col gap-1.5 py-1 mb-1">
                  {[
                    "vas-managed",
                    "vas-oncall",
                    "vas-onestop",
                    "vas-payment"
                  ].map((subId) => {
                    const subSol = SOLUTIONS_DATA[subId];
                    if (!subSol) return null;
                    const isSubActive = subSol.id === currentSolution.id;
                    const SubIcon = subSol.icon;
                    return (
                      <a
                        key={subSol.id}
                        href={`#${subSol.id}`}
                        className={`flex items-center justify-between p-2.5 rounded-lg text-left border transition-all text-[11px] group ${
                          isSubActive 
                          ? "bg-indigo-500 text-white border-indigo-100 font-bold shadow-sm" 
                          : "bg-white hover:bg-slate-50 text-slate-600 border-slate-100 hover:border-slate-200 font-semibold"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className={`p-1 rounded-md ${isSubActive ? "bg-white/20 text-white" : "bg-slate-50 text-slate-400"}`}>
                            <SubIcon className="w-3.5 h-3.5" />
                          </span>
                          <span className="line-clamp-1">{subSol.title}</span>
                        </div>
                        <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isSubActive ? "translate-x-0.5 text-white" : "text-slate-400 group-hover:translate-x-0.5"}`} />
                      </a>
                    );
                  })}
                </div>
              )}

              {/* Render nested sub-items under IP Telephone System if active */}
              {isMainTelephony && isTelephonyGroupActive && (
                <div className="ml-5 pl-4 border-l-2 border-indigo-100 flex flex-col gap-1.5 py-1 mb-1">
                  {[
                    "telephony-pabx"
                  ].map((subId) => {
                    const subSol = SOLUTIONS_DATA[subId];
                    if (!subSol) return null;
                    const isSubActive = subSol.id === currentSolution.id;
                    const SubIcon = subSol.icon;
                    return (
                      <a
                        key={subSol.id}
                        href={`#${subSol.id}`}
                        className={`flex items-center justify-between p-2.5 rounded-lg text-left border transition-all text-[11px] group ${
                          isSubActive 
                          ? "bg-indigo-500 text-white border-indigo-100 font-bold shadow-sm" 
                          : "bg-white hover:bg-slate-50 text-slate-600 border-slate-100 hover:border-slate-200 font-semibold"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className={`p-1 rounded-md ${isSubActive ? "bg-white/20 text-white" : "bg-slate-50 text-slate-400"}`}>
                            <SubIcon className="w-3.5 h-3.5" />
                          </span>
                          <span className="line-clamp-1">{subSol.title}</span>
                        </div>
                        <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isSubActive ? "translate-x-0.5 text-white" : "text-slate-400 group-hover:translate-x-0.5"}`} />
                      </a>
                    );
                  })}
                </div>
              )}

              {/* Render nested sub-items under Enterprise CCTV Surveillance Solution if active */}
              {isMainCctv && isCctvGroupActive && (
                <div className="ml-5 pl-4 border-l-2 border-indigo-100 flex flex-col gap-1.5 py-1 mb-1">
                  {[
                    "cctv-ip-analog",
                    "cctv-anpr",
                    "cctv-ai",
                    "cctv-vms",
                    "cctv-storage",
                    "cctv-centralized"
                  ].map((subId) => {
                    const subSol = SOLUTIONS_DATA[subId];
                    if (!subSol) return null;
                    const isSubActive = subSol.id === currentSolution.id;
                    const SubIcon = subSol.icon;
                    return (
                      <a
                        key={subSol.id}
                        href={`#${subSol.id}`}
                        className={`flex items-center justify-between p-2.5 rounded-lg text-left border transition-all text-[11px] group ${
                          isSubActive 
                          ? "bg-indigo-500 text-white border-indigo-100 font-bold shadow-sm" 
                          : "bg-white hover:bg-slate-50 text-slate-600 border-slate-100 hover:border-slate-200 font-semibold"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className={`p-1 rounded-md ${isSubActive ? "bg-white/20 text-white" : "bg-slate-50 text-slate-400"}`}>
                            <SubIcon className="w-3.5 h-3.5" />
                          </span>
                          <span className="line-clamp-1">{subSol.title}</span>
                        </div>
                        <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isSubActive ? "translate-x-0.5 text-white" : "text-slate-400 group-hover:translate-x-0.5"}`} />
                      </a>
                    );
                  })}
                </div>
              )}

              {/* Render nested sub-items under Data Center Solution if Data Center Solution or any of its sub-items are active */}
              {isMainDatacenter && isDatacenterGroupActive && (
                <div className="ml-5 pl-4 border-l-2 border-indigo-100 flex flex-col gap-1.5 py-1 mb-1">
                  {[
                    "dcim",
                    "ems",
                    "nms",
                    "server-lan",
                    "storage"
                  ].map((subId) => {
                    const subSol = SOLUTIONS_DATA[subId];
                    if (!subSol) return null;
                    const isSubActive = subSol.id === currentSolution.id;
                    const SubIcon = subSol.icon;
                    return (
                      <a
                        key={subSol.id}
                        href={`#${subSol.id}`}
                        className={`flex items-center justify-between p-2.5 rounded-lg text-left border transition-all text-[11px] group ${
                          isSubActive 
                          ? "bg-indigo-500 text-white border-indigo-500 font-bold shadow-sm" 
                          : "bg-white hover:bg-slate-50 text-slate-600 border-slate-100 hover:border-slate-200 font-semibold"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className={`p-1 rounded-md ${isSubActive ? "bg-white/20 text-white" : "bg-slate-50 text-slate-400"}`}>
                            <SubIcon className="w-3 h-3" />
                          </span>
                          <span className="line-clamp-1">{subSol.title}</span>
                        </div>
                        <ChevronRight className={`w-3 h-3 transition-transform ${isSubActive ? "translate-x-0.5 text-white" : "text-slate-400 group-hover:translate-x-0.5"}`} />
                      </a>
                    );
                  })}
                </div>
              )}

              {/* Render nested sub-items under Enterprise Network Solution if active */}
              {isMainNetwork && isNetworkGroupActive && (
                <div className="ml-5 pl-4 border-l-2 border-indigo-100 flex flex-col gap-1.5 py-1 mb-1">
                  {[
                    "passive-lan",
                    "fiber-optic",
                    "dc-power",
                    "rack-management",
                    "raise-floor",
                    "online-ups",
                    "dehumidifier",
                    "precision-cooling"
                  ].map((subId) => {
                    const subSol = SOLUTIONS_DATA[subId];
                    if (!subSol) return null;
                    const isSubActive = subSol.id === currentSolution.id;
                    const SubIcon = subSol.icon;
                    return (
                      <a
                        key={subSol.id}
                        href={`#${subSol.id}`}
                        className={`flex items-center justify-between p-2.5 rounded-lg text-left border transition-all text-[11px] group ${
                          isSubActive 
                          ? "bg-indigo-500 text-white border-indigo-500 font-bold shadow-sm" 
                          : "bg-white hover:bg-slate-50 text-slate-600 border-slate-100 hover:border-slate-200 font-semibold"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className={`p-1 rounded-md ${isSubActive ? "bg-white/20 text-white" : "bg-slate-50 text-slate-400"}`}>
                            <SubIcon className="w-3 h-3" />
                          </span>
                          <span className="line-clamp-1">{subSol.title}</span>
                        </div>
                        <ChevronRight className={`w-3 h-3 transition-transform ${isSubActive ? "translate-x-0.5 text-white" : "text-slate-400 group-hover:translate-x-0.5"}`} />
                      </a>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

  // 2. Interactive consultation request form
  const renderSiteSurveyForm = () => (
    <div id="survey-form-block" className="bg-white rounded-3xl border border-slate-100 shadow-md p-6 relative overflow-hidden">
      {/* Absolute Visual decoration */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-b from-indigo-50 to-transparent rounded-bl-full" />
      
      <h3 className="text-slate-900 font-extrabold text-sm uppercase tracking-wider mb-1.5 pb-2 border-b border-slate-100 flex items-center gap-2 relative z-10">
        <FileText className="w-4 h-4 text-indigo-600" />
        Request Site Survey
      </h3>
      <p className="text-xs text-slate-500 mb-4 font-sans leading-normal relative z-10">
        Need a tailored deployment plan? Contact our sales office for a completely free engineering site assessment.
      </p>

      {isSuccess ? (
        <div className="bg-emerald-50 border border-emerald-100 p-5 rounded-2xl text-center flex flex-col items-center gap-3 animate-fade-in">
          <span className="p-3 bg-emerald-500 text-white rounded-full flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6" />
          </span>
          <p className="text-xs font-bold text-emerald-800">Request Received Successfully!</p>
          <p className="text-[11px] text-emerald-600 leading-normal">
            Thank you {formData.name}. Our technical system engineer will reach out to schedule your survey within 24 business hours.
          </p>
          <button 
            type="button"
            onClick={() => setIsSuccess(false)}
            className="text-xs text-indigo-600 underline font-bold mt-2 hover:text-indigo-800 transition-colors"
          >
            Send another request
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 relative z-10">
          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
              Full Name *
            </label>
            <input 
              type="text" 
              name="name"
              required
              placeholder="Enter your full name" 
              value={formData.name}
              onChange={handleInputChange}
              className="w-full text-xs px-3.5 py-2 rounded-xl border border-slate-200 outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 bg-slate-50/50"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
              Company Name
            </label>
            <input 
              type="text" 
              name="company"
              placeholder="Enter your company name" 
              value={formData.company}
              onChange={handleInputChange}
              className="w-full text-xs px-3.5 py-2 rounded-xl border border-slate-200 outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 bg-slate-50/50"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                Corporate Email *
              </label>
              <input 
                type="email" 
                name="email"
                required
                placeholder="Enter your corporate email" 
                value={formData.email}
                onChange={handleInputChange}
                className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 bg-slate-50/50"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                Mobile Phone *
              </label>
              <input 
                type="tel" 
                name="phone"
                required
                placeholder="Enter your mobile phone number" 
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 bg-slate-50/50"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
              Requirement Details
            </label>
            <textarea 
              name="message"
              rows={2}
              placeholder="Enter your requirement details" 
              value={formData.message}
              onChange={handleInputChange}
              className="w-full text-xs px-3.5 py-2 rounded-xl border border-slate-200 outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 bg-slate-50/50 resize-none h-16"
            />
          </div>

          <button 
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-2 py-2.5 bg-[#2E6FA8] hover:bg-[#243D7A] text-white font-bold rounded-xl text-xs transition-all shadow-md shadow-indigo-600/10 flex items-center justify-center gap-1.5 disabled:opacity-75"
          >
            {isSubmitting ? (
              <>
                <span className="w-3.5 h-3.5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                <span>Submitting...</span>
              </>
            ) : (
              <>
                <Send className="w-3.5 h-3.5" />
                <span>Send Free Survey Request</span>
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );

  // 3. Help Contact Card
  const renderContactSales = () => (
    <div id="contact-sales-block" className="bg-[#2E6FA8] rounded-3xl p-6 text-white text-xs shadow-md flex flex-col gap-4 border border-indigo-400/20">
      <h3 className="font-extrabold text-sm tracking-wider uppercase border-b border-white/20 pb-3 flex items-center gap-2">
        <HelpCircle className="w-4 h-4 text-white" />
        Contact Sales
      </h3>
      
      <div className="flex flex-col gap-3 font-sans font-medium text-slate-100">
        <div className="flex items-start gap-2.5">
          <Phone className="w-4 h-4 text-white flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-extrabold text-white text-[11px] uppercase tracking-wider mb-0.5">Direct Hotline</p>
            <p><a href={`tel:${contact.phone.replace(/[^+\d]/g, "")}`} className="hover:text-slate-200 transition-colors font-bold">{contact.phone}</a></p>
          </div>
        </div>

        <div className="flex items-start gap-2.5">
          <Mail className="w-4 h-4 text-white flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-extrabold text-white text-[11px] uppercase tracking-wider mb-0.5">Corporate Email</p>
            <p className="hover:text-slate-200 pointer-events-auto font-bold"><a href={`mailto:${contact.email}`}>{contact.email}</a></p>
          </div>
        </div>

        <div className="flex items-start gap-2.5">
          <MapPin className="w-4 h-4 text-white flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-extrabold text-white text-[11px] uppercase tracking-wider mb-0.5">Registered Office</p>
            <p className="leading-normal">{contact.address}</p>
          </div>
        </div>
      </div>
    </div>
  );

  // 4. Main Details Content
  const renderMainContent = () => (
    <div id="main-solutions-content" className="flex flex-col gap-10">
      
      {/* Large Featured Visual representation */}
      <ScrollReveal direction="up" duration={0.6}>
        <div className="relative h-[250px] sm:h-[400px] rounded-3xl overflow-hidden shadow-lg group border border-white bg-slate-200">
          <img 
            src={currentSolution.image} 
            alt={currentSolution.title} 
            className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
          
          {/* Overlay Badge */}
          <div className="absolute bottom-6 left-6 right-6 flex flex-wrap justify-between items-end gap-4">
            <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white max-w-md">
              <p className="text-xs font-bold uppercase tracking-wider text-indigo-300">Technology Focus</p>
              <p className="text-sm font-semibold mt-0.5">High Performance, Certified Installs & Turnkey Delivery</p>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Overview Section */}
      <ScrollReveal direction="up" duration={0.6} delay={0.1}>
        <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-100 shadow-sm flex flex-col gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-2.5 h-2.5 rounded-full bg-indigo-600" />
            <h2 className="text-lg sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Overview & Methodology
            </h2>
          </div>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-sans font-medium">
            {currentSolution.overview}
          </p>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-sans mt-1">
            At Cloud Technologies, we don't believe in generic off-the-shelf system packages. We conduct complete engineering evaluations on site acoustics, light, bandwidth, and cabling layouts to tailor the solution specific to your organizational goals. This holistic approach guarantees an installation that functions reliably with high performance.
          </p>
        </div>
      </ScrollReveal>

      {/* Key Features & Deliverables Section */}
      <div className="flex flex-col gap-6">
        <ScrollReveal direction="up" duration={0.6}>
          <div className="flex items-center gap-2.5">
            <div className="w-2.5 h-2.5 rounded-full bg-indigo-600" />
            <h2 className="text-lg sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Key Features & Deliverables
            </h2>
          </div>
        </ScrollReveal>
        
        {/* Features grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {currentSolution.features.map((item, index) => (
            <ScrollReveal
              key={index}
              direction="up"
              duration={0.6}
              delay={(index % 2) * 0.1}
              className="flex h-full"
            >
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 hover:border-indigo-100 group transition-all duration-300 flex flex-col gap-2 w-full">
                <div className="flex items-center gap-2.5">
                  <span className="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg group-hover:bg-indigo-600 group-hover:text-white transition-all">
                    <CheckCircle2 className="w-4 h-4" />
                  </span>
                  <h3 className="font-extrabold text-slate-900 text-sm md:text-base tracking-tight">
                    {item.title}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Typical Applications & Industries served */}
      <ScrollReveal direction="up" duration={0.6}>
        <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-100 shadow-sm flex flex-col gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-2.5 h-2.5 rounded-full bg-indigo-600" />
            <h2 className="text-lg sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Typical Applications & Industries Served
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {currentSolution.applications.map((app, index) => (
              <div key={index} className="flex items-center gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 flex-shrink-0" />
                <span className="text-slate-700 text-xs sm:text-sm font-bold font-sans">
                  {app}
                </span>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* Tech Specs block */}
      <ScrollReveal direction="up" duration={0.6} delay={0.1}>
        <div className="bg-[#1e1b4b] p-6 sm:p-10 rounded-3xl text-white shadow-md flex flex-col gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-2.5 h-2.5 rounded-full bg-indigo-400" />
            <h2 className="text-lg sm:text-xl font-extrabold tracking-tight font-display text-white">
              Technical System Parameters
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {currentSolution.techSpecs.map((spec, index) => (
              <div key={index} className="flex flex-col pb-4 border-b border-indigo-950/40">
                <span className="text-xs text-indigo-300 font-semibold tracking-wider uppercase mb-1">{spec.label}</span>
                <span className="text-sm font-bold text-slate-100">{spec.value}</span>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>

    </div>
  );

  return (
    <section className="bg-slate-50 min-h-screen py-16">
      <PageBanner title={currentSolution.title} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Responsive Layout wrappers for Desktop and Mobile/Tablet */}
        <div>
          {/* Desktop Layout - sticky left column, right details column */}
          <div className="hidden lg:grid lg:grid-cols-12 gap-8 items-start">
            {/* Left Sidebar Column - 4 Columns */}
            <div className="lg:col-span-4 flex flex-col gap-8 sticky top-24">
              {renderSolutionsList()}
              {renderSiteSurveyForm()}
              {renderContactSales()}
            </div>

            {/* Right Main Content - 8 Columns */}
            <div className="lg:col-span-8 flex flex-col gap-10">
              {renderMainContent()}
            </div>
          </div>

          {/* Mobile/Tablet Layout - Navigation at top, Details in middle, Forms at bottom, completely scroll-lock safe */}
          <div className="flex lg:hidden flex-col gap-8">
            {/* 1. Our Solutions selection list at the TOP of the service content */}
            {renderSolutionsList()}

            {/* 2. Main Service content details */}
            {renderMainContent()}

            {/* 3. Site Survey form at the bottom */}
            {renderSiteSurveyForm()}

            {/* 4. Contact details at the bottom */}
            {renderContactSales()}
          </div>
        </div>

      </div>
    </section>
  );
}

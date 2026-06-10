/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { 
  Lock, Unlock, Shield, AlertCircle, LayoutDashboard, MessageSquare, MessageCircle,
  FileText, Briefcase, Image as ImageIcon, Video, LogOut, CheckCircle, 
  Trash2, Plus, Edit2, Save, X, Search, Clock, ExternalLink, RefreshCw, Eye,
  Upload, Users, Award, BarChart2, Sliders, Share2, Link as LinkIcon, HelpCircle,
  Loader2, Mail, Server, Code, Download, Terminal, Database
} from "lucide-react";
import { 
  dataStore, NewsItem, ProjectItem, PhotoItem, VideoItem, InquiryItem, ContactInfo, DBClient, DBBrand,
  AboutConfig, ChairmanConfig, MDConfig, VisionMissionConfig, TeamMemberConfig, WhyChooseReason, HeroSlide,
  TestimonialItem, StatItem, HeaderConfig, FooterConfig, SocialLink, QuickLink, AdminAuthConfig,
  NavItemConfig, NavDropdownItem, SubMenuItem, EmailIntegrationConfig, MySQLConfig, FloatingChat
} from "../utils/dataStore";
import ClientLogoRenderer from "./ClientLogoRenderer";
import BrandLogoRenderer from "./BrandLogoRenderer";

const DEFAULT_WHATSAPP_SVG = `<svg viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.705 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>`;

export default function AdminPanel() {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return typeof window !== "undefined" && sessionStorage.getItem("admin_auth") === "true";
  });
  const [adminAuthConfig, setAdminAuthConfig] = useState<AdminAuthConfig>(() => dataStore.getAdminAuthConfig());
  const [emailConfig, setEmailConfig] = useState<EmailIntegrationConfig>(() => dataStore.getEmailIntegrationConfig());
  const [saveEmailSuccess, setSaveEmailSuccess] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [adminCredentialsSuccess, setAdminCredentialsSuccess] = useState("");

  // Navigation Panel State
  const [activeTab, setActiveTab] = useState<"dashboard" | "inquiries" | "news" | "running-projects" | "completed-projects" | "photos" | "videos" | "solutions" | "contact-info font-sans" | "contact-info" | "clients" | "brands" | "about-sublinks" | "hero-slider" | "testimonials" | "stats" | "header-footer font-sans" | "header-footer" | "admin-settings" | "email-settings" | "floating-chats">("dashboard");

  // MySQL Integration States
  const [mysqlConfig, setMysqlConfig] = useState<MySQLConfig>(() => dataStore.getMySQLConfig());
  const [saveMySQLSuccess, setSaveMySQLSuccess] = useState("");
  const [mysqlSyncing, setMysqlSyncing] = useState(false);
  const [mysqlSyncMsg, setMysqlSyncMsg] = useState("");
  const [mysqlSyncErr, setMysqlSyncErr] = useState("");
  const [mysqlTesting, setMysqlTesting] = useState(false);

  // Live MySQL Dynamic Ping Status States
  const [dbPingStatus, setDbPingStatus] = useState<"checking" | "connected" | "disconnected" | "local_storage" | "unconfigured">("checking");
  const [dbPingError, setDbPingError] = useState("");

  // Header & Footer Editor State
  const [headerConfig, setHeaderConfig] = useState<HeaderConfig>(() => dataStore.getHeaderConfig());
  const [footerConfig, setFooterConfig] = useState<FooterConfig>(() => dataStore.getFooterConfig());
  const [siteMetadata, setSiteMetadata] = useState(() => dataStore.getSiteMetadata());
  const [saveHeaderFooterSuccess, setSaveHeaderFooterSuccess] = useState("");

  // Social Links management states
  const [editingSocialId, setEditingSocialId] = useState<string | null>(null);
  const [socialForm, setSocialForm] = useState<{ platform: string; url: string }>({ platform: "Facebook", url: "" });
  const [isAddingSocial, setIsAddingSocial] = useState(false);

  // Quick Links management states
  const [editingQuickLinkId, setEditingQuickLinkId] = useState<string | null>(null);
  const [quickLinkForm, setQuickLinkForm] = useState<{ labelText: string; url: string }>({ labelText: "", url: "" });
  const [isAddingQuickLink, setIsAddingQuickLink] = useState(false);

  // Dynamic Navigation states
  const [navFormOpen, setNavFormOpen] = useState(false);
  const [navFormMode, setNavFormMode] = useState<"add-top" | "edit-top" | "add-sub" | "edit-sub" | "add-nested" | "edit-nested">("add-top");
  const [navFormParentId, setNavFormParentId] = useState<string | null>(null);
  const [navFormSubParentId, setNavFormSubParentId] = useState<string | null>(null);
  const [navFormId, setNavFormId] = useState<string | null>(null);
  const [navForm, setNavForm] = useState<{ name: string; href: string; hasDropdown?: boolean; hasSubmenu?: boolean }>({
    name: "",
    href: "",
    hasDropdown: false,
    hasSubmenu: false
  });

  // Dynamic Action Buttons states
  const [buttonFormOpen, setButtonFormOpen] = useState(false);
  const [buttonFormId, setButtonFormId] = useState<string | null>(null);
  const [buttonForm, setButtonForm] = useState<{ labelText: string; url: string; isOpenNewTab: boolean }>({
    labelText: "",
    url: "",
    isOpenNewTab: true
  });

  // Testimonials States
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(() => dataStore.getTestimonials());
  const [isAddingTestimonial, setIsAddingTestimonial] = useState(false);
  const [editingTestimonialIndex, setEditingTestimonialIndex] = useState<number | null>(null);
  const [testimonialForm, setTestimonialForm] = useState<Omit<TestimonialItem, "id">>({
    text: "",
    author: "",
    role: "",
    avatar: ""
  });
  const [saveTestimonialSuccess, setSaveTestimonialSuccess] = useState("");

  // Floating Chats States
  const [floatingChats, setFloatingChats] = useState<FloatingChat[]>(() => dataStore.getFloatingChats());
  const [isAddingFloatingChat, setIsAddingFloatingChat] = useState(false);
  const [editingFloatingChatIndex, setEditingFloatingChatIndex] = useState<number | null>(null);
  const [floatingChatForm, setFloatingChatForm] = useState<Omit<FloatingChat, "id">>({
    platform: "Custom SVG",
    url: "",
    label: "",
    color: "bg-indigo-600 hover:bg-indigo-500",
    active: true,
    svgCode: ""
  });
  const [saveFloatingChatSuccess, setSaveFloatingChatSuccess] = useState("");

  // Stats States
  const [displayStats, setDisplayStats] = useState<StatItem[]>(() => dataStore.getDisplayStats());
  const [editingStatIndex, setEditingStatIndex] = useState<number | null>(null);
  const [isAddingStat, setIsAddingStat] = useState(false);
  const [statForm, setStatForm] = useState<Omit<StatItem, "id">>({
    value: "",
    label: "",
    sub: "",
    iconName: "Award"
  });
  const [saveStatSuccess, setSaveStatSuccess] = useState("");

  // Hero Slider States
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>(() => dataStore.getHeroSlides());
  const [isAddingSlide, setIsAddingSlide] = useState(false);
  const [editingSlideIndex, setEditingSlideIndex] = useState<number | null>(null);
  const [slideForm, setSlideForm] = useState<Omit<HeroSlide, "id">>({
    image: "",
    tag: "",
    title: "",
    description: "",
    cta: "Explore Our Solutions"
  });
  const [saveSlideSuccess, setSaveSlideSuccess] = useState("");

  // Contact Info Management State
  const [contactInfo, setContactInfo] = useState<ContactInfo>(() => dataStore.getContactInfo());
  const [saveContactSuccess, setSaveContactSuccess] = useState(false);

  // About Us & Sublinks Edit States
  const [aboutConfig, setAboutConfig] = useState<AboutConfig>(() => dataStore.getAboutConfig());
  const [chairmanConfig, setChairmanConfig] = useState<ChairmanConfig>(() => dataStore.getChairmanConfig());
  const [mdConfig, setMDConfig] = useState<MDConfig>(() => dataStore.getMDConfig());
  const [visionMissionConfig, setVisionMissionConfig] = useState<VisionMissionConfig>(() => dataStore.getVisionMissionConfig());
  const [teamMembersList, setTeamMembersList] = useState<TeamMemberConfig[]>(() => dataStore.getTeamMembers());
  const [whyChooseReasonsList, setWhyChooseReasonsList] = useState<WhyChooseReason[]>(() => dataStore.getWhyChooseReasons());
  const [saveAboutSuccess, setSaveAboutSuccess] = useState("");
  const [activeAboutSubTab, setActiveAboutSubTab] = useState<"about" | "chairman" | "md" | "vision" | "team" | "reasons">("about");

  const [editingMemberIndex, setEditingMemberIndex] = useState<number | null>(null);
  const [memberForm, setMemberForm] = useState<TeamMemberConfig>({ name: "", role: "", description: "", image: "" });
  const [isAddingMember, setIsAddingMember] = useState(false);

  const [editingReasonIndex, setEditingReasonIndex] = useState<number | null>(null);
  const [reasonForm, setReasonForm] = useState<WhyChooseReason>({ title: "", desc: "" });
  const [isAddingReason, setIsAddingReason] = useState(false);

  // Dynamic Lists State
  const [inquiries, setInquiries] = useState<InquiryItem[]>([]);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [runningProjects, setRunningProjects] = useState<ProjectItem[]>([]);
  const [completedProjects, setCompletedProjects] = useState<ProjectItem[]>([]);
  const [photos, setPhotos] = useState<PhotoItem[]>([]);
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [solutions, setSolutions] = useState<Record<string, any>>({});
  const [clients, setClients] = useState<DBClient[]>([]);
  const [brands, setBrands] = useState<DBBrand[]>([]);

  // Clients Tab States
  const [isAddingClient, setIsAddingClient] = useState(false);
  const [editingClient, setEditingClient] = useState<DBClient | null>(null);
  const [clientForm, setClientForm] = useState<Omit<DBClient, "id">>({
    name: "",
    category: "",
    link: "#",
    logoText: "",
    logoStyle: "blue",
    logoUrl: undefined,
  });

  // Brands Tab States
  const [isAddingBrand, setIsAddingBrand] = useState(false);
  const [editingBrand, setEditingBrand] = useState<DBBrand | null>(null);
  const [brandForm, setBrandForm] = useState<Omit<DBBrand, "id">>({
    name: "",
    sub: "",
    color: "border-indigo-200 hover:border-indigo-500",
    link: "#",
    logoText: "",
    logoStyle: "standard",
    logoUrl: undefined,
  });
  const [editingSolution, setEditingSolution] = useState<any | null>(null);
  const [activeSolutionTab, setActiveSolutionTab] = useState<"general" | "features" | "applications" | "techSpecs">("general");

  // Solutions Manager Dynamic Creations
  const [isAddingCoreSolution, setIsAddingCoreSolution] = useState(false);
  const [isAddingSubSolution, setIsAddingSubSolution] = useState(false);
  const [newSolutionForm, setNewSolutionForm] = useState({
    id: "",
    title: "",
    tagline: "",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1200&auto=format&fit=crop",
    iconName: "Monitor",
    overview: "We offer professional, end-to-end setups tailored to maximize efficiency and reliability.",
    parentId: ""
  });

  // Search & Filters State
  const [searchQuery, setSearchQuery] = useState("");

  // Modal / Form Editor State
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [formError, setFormError] = useState("");

  // Local Image Upload States
  const [currentImage, setCurrentImage] = useState<string>("");
  const [currentImagesList, setCurrentImagesList] = useState<string[]>([]);
  const [currentThumbnail, setCurrentThumbnail] = useState<string>("");
  const [currentVideoType, setCurrentVideoType] = useState<"youtube" | "uploaded">("youtube");
  const [currentVideoUrl, setCurrentVideoUrl] = useState<string>("");

  useEffect(() => {
    if (editingItem) {
      setCurrentImage(editingItem.image || "");
      setCurrentImagesList(editingItem.images || []);
      setCurrentThumbnail(editingItem.thumbnail || "");
      
      const vType = editingItem.videoType || (editingItem.embedCode ? "youtube" : "youtube");
      setCurrentVideoType(vType);
      
      let vUrl = editingItem.videoUrl || "";
      if (!vUrl && editingItem.embedCode) {
        vUrl = `https://www.youtube.com/watch?v=${editingItem.embedCode}`;
      }
      setCurrentVideoUrl(vUrl);
    } else {
      setCurrentImage("");
      setCurrentImagesList([]);
      setCurrentThumbnail("");
      setCurrentVideoType("youtube");
      setCurrentVideoUrl("");
    }
  }, [editingItem]);

  // cPanel Server Write Sync Status Tracking States
  const [writeState, setWriteState] = useState<{
    isLoading: boolean;
    status: "idle" | "saving" | "success" | "error";
    message: string;
  }>({
    isLoading: false,
    status: "idle",
    message: ""
  });

  useEffect(() => {
    const handleWriteStatus = (e: Event) => {
      const customEvent = e as CustomEvent<{ type: "start" | "success" | "error"; message?: string }>;
      const { type, message } = customEvent.detail;
      if (type === "start") {
        setWriteState({
          isLoading: true,
          status: "saving",
          message: "Synchronizing your changes to the cPanel web host..."
        });
      } else if (type === "success") {
        setWriteState({
          isLoading: false,
          status: "success",
          message: message || "Changes saved permanently to cPanel site_data.json successfully!"
        });
        // Clear success message after 5 seconds to keep screen neat
        setTimeout(() => {
          setWriteState(prev => prev.status === "success" ? { isLoading: false, status: "idle", message: "" } : prev);
        }, 5000);
      } else if (type === "error") {
        setWriteState({
          isLoading: false,
          status: "error",
          message: message || "Failed to write changes to cPanel server."
        });
      }
    };

    window.addEventListener("datastore-write-status", handleWriteStatus);
    return () => window.removeEventListener("datastore-write-status", handleWriteStatus);
  }, []);

  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
  } | null>(null);

  const withConfirmation = (title: string, message: string, callback: () => void) => {
    setConfirmModal({
      isOpen: true,
      title,
      message,
      onConfirm: () => {
        callback();
        setConfirmModal(null);
      }
    });
  };

  const handleSingleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, setter: (val: string) => void) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Support raw photos up to 12MB from cameras/devices because they'll compress to <100kb
    if (file.size > 12 * 1024 * 1024) {
      alert("Image file is too large! Please upload images under 12MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const maxDim = 800; // Optimal 800px wide/tall for responsive previews & fast loading
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxDim) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          }
        } else {
          if (height > maxDim) {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressed = canvas.toDataURL("image/jpeg", 0.75); // Highly optimized JPEG
          setter(compressed);
        }
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      alert("Selected video exceeds the 10MB size limit. Please upload files under 10MB for optimal browser and database storage efficiency.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      setCurrentVideoUrl(dataUrl);
    };
    reader.readAsDataURL(file);
  };

  const handleCompressedImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: (val: string) => void,
    maxDim = 350
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 12 * 1024 * 1024) {
      alert("Image is too large! Please upload images under 12MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxDim) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          }
        } else {
          if (height > maxDim) {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressed = canvas.toDataURL("image/png");
          setter(compressed);
        }
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleMultipleImagesUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const loadedImages: string[] = [];
    let processed = 0;

    Array.from(files).forEach((file: File) => {
      if (file.size > 12 * 1024 * 1024) {
        alert(`File ${file.name} is too large and will be skipped. (Max size 12MB)`);
        processed++;
        if (processed === files.length) {
          setCurrentImagesList((prev) => [...prev, ...loadedImages]);
        }
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const maxDim = 800;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > maxDim) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            }
          } else {
            if (height > maxDim) {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            const compressed = canvas.toDataURL("image/jpeg", 0.75);
            loadedImages.push(compressed);
          }
          processed++;
          if (processed === files.length) {
            setCurrentImagesList((prev) => [...prev, ...loadedImages]);
          }
        };
        img.src = event.target?.result as string;
      };
      reader.readAsDataURL(file);
    });
  };

  // Auto Reply Helpers
  const [replyText, setReplyText] = useState("");
  const [activeInquiryForReply, setActiveInquiryForReply] = useState<InquiryItem | null>(null);

  // Load datasets initially and subscribe to updates
  const loadAllData = () => {
    setInquiries(dataStore.getInquiries());
    setNews(dataStore.getNews());
    setRunningProjects(dataStore.getRunningProjects());
    setCompletedProjects(dataStore.getCompletedProjects());
    setPhotos(dataStore.getPhotos());
    setVideos(dataStore.getVideos());
    setSolutions(dataStore.getSolutions());
    setContactInfo(dataStore.getContactInfo());
    setClients(dataStore.getClients());
    setBrands(dataStore.getBrands());
    
    // About us sets
    setAboutConfig(dataStore.getAboutConfig());
    setChairmanConfig(dataStore.getChairmanConfig());
    setMDConfig(dataStore.getMDConfig());
    setVisionMissionConfig(dataStore.getVisionMissionConfig());
    setTeamMembersList(dataStore.getTeamMembers());
    setWhyChooseReasonsList(dataStore.getWhyChooseReasons());
    setHeroSlides(dataStore.getHeroSlides());
    setTestimonials(dataStore.getTestimonials());
    setDisplayStats(dataStore.getDisplayStats());
    setAdminAuthConfig(dataStore.getAdminAuthConfig());
    setMysqlConfig(dataStore.getMySQLConfig());
    setEmailConfig(dataStore.getEmailIntegrationConfig());
  };

  const handleSaveContactInfo = (e: React.FormEvent) => {
    e.preventDefault();
    withConfirmation(
      "Save Contact Information?",
      "Are you sure you want to save the updated contact details? This will update the contact pages and global headers.",
      () => {
        dataStore.saveContactInfo(contactInfo);
        setSaveContactSuccess(true);
        setTimeout(() => {
          setSaveContactSuccess(false);
        }, 4500);
      }
    );
  };

  const handleSaveHeaderConfig = (e: React.FormEvent) => {
    e.preventDefault();
    withConfirmation(
      "Save Header Design?",
      "Are you sure you want to save the custom header layouts and brand settings?",
      () => {
        dataStore.saveHeaderConfig(headerConfig);
        setSaveHeaderFooterSuccess("Header layout customized successfully!");
        window.dispatchEvent(new Event("datastore-update"));
        setTimeout(() => setSaveHeaderFooterSuccess(""), 4500);
      }
    );
  };

  const handleSaveSiteMetadata = (e: React.FormEvent) => {
    e.preventDefault();
    withConfirmation(
      "Save Website Tab Settings?",
      "Are you sure you want to save these global tab settings (Website Title and browser Favicon)?",
      () => {
        dataStore.saveSiteMetadata(siteMetadata);
        setSaveHeaderFooterSuccess("Website settings (title and favicon) updated successfully!");
        window.dispatchEvent(new Event("datastore-update"));
        setTimeout(() => setSaveHeaderFooterSuccess(""), 4500);
      }
    );
  };

  const saveHeader = (newConfig: HeaderConfig) => {
    setHeaderConfig(newConfig);
    dataStore.saveHeaderConfig(newConfig);
    window.dispatchEvent(new Event("datastore-update"));
  };

  const handleSaveNavItem = (e: React.FormEvent) => {
    e.preventDefault();
    const menuItems = [...(headerConfig.menuItems || [])];

    if (navFormMode === "add-top") {
      const newItem: NavItemConfig = {
        id: "nav-" + Date.now().toString(),
        name: navForm.name,
        href: navForm.href,
        hasDropdown: navForm.hasDropdown,
        dropdownItems: []
      };
      const updated = [...menuItems, newItem];
      saveHeader({ ...headerConfig, menuItems: updated });
    } else if (navFormMode === "edit-top") {
      const updated = menuItems.map(item => {
        if (item.id === navFormId) {
          return {
            ...item,
            name: navForm.name,
            href: navForm.href,
            hasDropdown: navForm.hasDropdown,
            dropdownItems: navForm.hasDropdown ? (item.dropdownItems || []) : []
          };
        }
        return item;
      });
      saveHeader({ ...headerConfig, menuItems: updated });
    } else if (navFormMode === "add-sub") {
      const updated = menuItems.map(item => {
        if (item.id === navFormParentId) {
          const currentSubs = item.dropdownItems || [];
          const newSub: NavDropdownItem = {
            id: "sub-" + Date.now().toString(),
            name: navForm.name,
            href: navForm.href,
            hasSubmenu: navForm.hasSubmenu,
            submenuItems: []
          };
          return {
            ...item,
            dropdownItems: [...currentSubs, newSub]
          };
        }
        return item;
      });
      saveHeader({ ...headerConfig, menuItems: updated });
    } else if (navFormMode === "edit-sub") {
      const updated = menuItems.map(item => {
        if (item.id === navFormParentId) {
          const currentSubs = item.dropdownItems || [];
          const updatedSubs = currentSubs.map(sub => {
            if (sub.id === navFormId) {
              return {
                ...sub,
                name: navForm.name,
                href: navForm.href,
                hasSubmenu: navForm.hasSubmenu,
                submenuItems: navForm.hasSubmenu ? (sub.submenuItems || []) : []
              };
            }
            return sub;
          });
          return {
            ...item,
            dropdownItems: updatedSubs
          };
        }
        return item;
      });
      saveHeader({ ...headerConfig, menuItems: updated });
    } else if (navFormMode === "add-nested") {
      const updated = menuItems.map(item => {
        if (item.id === navFormParentId) {
          const currentSubs = item.dropdownItems || [];
          const updatedSubs = currentSubs.map(sub => {
            if (sub.id === navFormSubParentId) {
              const currentNesteds = sub.submenuItems || [];
              const newNested: SubMenuItem = {
                id: "nested-" + Date.now().toString(),
                name: navForm.name,
                href: navForm.href
              };
              return {
                ...sub,
                submenuItems: [...currentNesteds, newNested]
              };
            }
            return sub;
          });
          return {
            ...item,
            dropdownItems: updatedSubs
          };
        }
        return item;
      });
      saveHeader({ ...headerConfig, menuItems: updated });
    } else if (navFormMode === "edit-nested") {
      const updated = menuItems.map(item => {
        if (item.id === navFormParentId) {
          const currentSubs = item.dropdownItems || [];
          const updatedSubs = currentSubs.map(sub => {
            if (sub.id === navFormSubParentId) {
              const currentNesteds = sub.submenuItems || [];
              const updatedNesteds = currentNesteds.map(nested => {
                if (nested.id === navFormId) {
                  return {
                    ...nested,
                    name: navForm.name,
                    href: navForm.href
                  };
                }
                return nested;
              });
              return {
                ...sub,
                submenuItems: updatedNesteds
              };
            }
            return sub;
          });
          return {
            ...item,
            dropdownItems: updatedSubs
          };
        }
        return item;
      });
      saveHeader({ ...headerConfig, menuItems: updated });
    }

    setNavFormOpen(false);
    setNavFormId(null);
    setNavFormParentId(null);
    setNavFormSubParentId(null);
    setNavForm({ name: "", href: "", hasDropdown: false, hasSubmenu: false });
    setSaveHeaderFooterSuccess("Navigation structure updated successfully!");
    setTimeout(() => setSaveHeaderFooterSuccess(""), 4000);
  };

  const handleDeleteNavItem = (topId: string, subId?: string, nestedId?: string) => {
    withConfirmation(
      "Remove Menu Item?",
      "Are you sure you want to delete this menu item and all of its associated submenus?",
      () => {
        const menuItems = [...(headerConfig.menuItems || [])];
        let updated: NavItemConfig[] = [];

        if (topId && subId && nestedId) {
          updated = menuItems.map(item => {
            if (item.id === topId) {
              const subs = item.dropdownItems || [];
              const updatedSubs = subs.map(sub => {
                if (sub.id === subId) {
                  const nesteds = sub.submenuItems || [];
                  return {
                    ...sub,
                    submenuItems: nesteds.filter(n => n.id !== nestedId)
                  };
                }
                return sub;
              });
              return {
                ...item,
                dropdownItems: updatedSubs
              };
            }
            return item;
          });
        } else if (topId && subId) {
          updated = menuItems.map(item => {
            if (item.id === topId) {
              const subs = item.dropdownItems || [];
              return {
                ...item,
                dropdownItems: subs.filter(s => s.id !== subId)
              };
            }
            return item;
          });
        } else {
          updated = menuItems.filter(item => item.id !== topId);
        }

        saveHeader({ ...headerConfig, menuItems: updated });
        setSaveHeaderFooterSuccess("Menu item removed successfully.");
        setTimeout(() => setSaveHeaderFooterSuccess(""), 4000);
      }
    );
  };

  const handleSaveActionButton = (e: React.FormEvent) => {
    e.preventDefault();
    const buttons = [...(headerConfig.buttons || [])];

    if (buttonFormId === null) {
      const newBtn = {
        id: "btn-" + Date.now().toString(),
        labelText: buttonForm.labelText,
        url: buttonForm.url,
        isOpenNewTab: buttonForm.isOpenNewTab
      };
      const updated = [...buttons, newBtn];
      saveHeader({ ...headerConfig, buttons: updated });
    } else {
      const updated = buttons.map(btn => {
        if (btn.id === buttonFormId) {
          return {
            ...btn,
            labelText: buttonForm.labelText,
            url: buttonForm.url,
            isOpenNewTab: buttonForm.isOpenNewTab
          };
        }
        return btn;
      });
      saveHeader({ ...headerConfig, buttons: updated });
    }

    setButtonFormOpen(false);
    setButtonFormId(null);
    setButtonForm({ labelText: "", url: "", isOpenNewTab: true });
    setSaveHeaderFooterSuccess("Action buttons saved successfully!");
    setTimeout(() => setSaveHeaderFooterSuccess(""), 4000);
  };

  const handleDeleteActionButton = (id: string) => {
    withConfirmation(
      "Delete Action Button?",
      "Are you sure you want to remove this navigation action button?",
      () => {
        const buttons = [...(headerConfig.buttons || [])];
        const updated = buttons.filter(btn => btn.id !== id);
        saveHeader({ ...headerConfig, buttons: updated });
        setSaveHeaderFooterSuccess("Action button removed.");
        setTimeout(() => setSaveHeaderFooterSuccess(""), 4000);
      }
    );
  };

  const handleSaveFooterConfig = (e: React.FormEvent) => {
    e.preventDefault();
    withConfirmation(
      "Save Footer Design?",
      "Are you sure you want to save the customized footer links, text, and layouts?",
      () => {
        dataStore.saveFooterConfig(footerConfig);
        setSaveHeaderFooterSuccess("Footer layout customized successfully!");
        window.dispatchEvent(new Event("datastore-update"));
        setTimeout(() => setSaveHeaderFooterSuccess(""), 4500);
      }
    );
  };

  const handleSaveAboutConfig = (e: React.FormEvent) => {
    e.preventDefault();
    withConfirmation(
      "Save About Us?",
      "Are you sure you want to save the updated About Us section details?",
      () => {
        dataStore.saveAboutConfig(aboutConfig);
        setSaveAboutSuccess("About Section updated successfully!");
        setTimeout(() => setSaveAboutSuccess(""), 4500);
      }
    );
  };

  const handleSaveChairmanConfig = (e: React.FormEvent) => {
    e.preventDefault();
    withConfirmation(
      "Save Chairman's Message?",
      "Are you sure you want to save the executive Chairman's message on the website?",
      () => {
        dataStore.saveChairmanConfig(chairmanConfig);
        setSaveAboutSuccess("Chairman Message updated successfully!");
        setTimeout(() => setSaveAboutSuccess(""), 4500);
      }
    );
  };

  const handleSaveMDConfig = (e: React.FormEvent) => {
    e.preventDefault();
    withConfirmation(
      "Save Managing Director's Message?",
      "Are you sure you want to save the Managing Director's message details?",
      () => {
        dataStore.saveMDConfig(mdConfig);
        setSaveAboutSuccess("MD's Message updated successfully!");
        setTimeout(() => setSaveAboutSuccess(""), 4500);
      }
    );
  };

  const handleSaveVisionMissionConfig = (e: React.FormEvent) => {
    e.preventDefault();
    withConfirmation(
      "Save Vision & Mission?",
      "Are you sure you want to save the enterprise values, vision, and mission settings?",
      () => {
        dataStore.saveVisionMissionConfig(visionMissionConfig);
        setSaveAboutSuccess("Vision & Mission updated successfully!");
        setTimeout(() => setSaveAboutSuccess(""), 4500);
      }
    );
  };

  const handleSaveMember = (e: React.FormEvent) => {
    e.preventDefault();
    withConfirmation(
      editingMemberIndex !== null ? "Update Team Member?" : "Add New Team Member?",
      "Are you sure you want to save this team member's details to the directory list?",
      () => {
        const updatedList = [...teamMembersList];
        if (editingMemberIndex !== null) {
          updatedList[editingMemberIndex] = memberForm;
          setEditingMemberIndex(null);
        } else {
          updatedList.push(memberForm);
        }
        dataStore.saveTeamMembers(updatedList);
        setTeamMembersList(updatedList);
        setIsAddingMember(false);
        setMemberForm({ name: "", role: "", description: "", image: "" });
        setSaveAboutSuccess("Team Members updated successfully!");
        setTimeout(() => setSaveAboutSuccess(""), 4500);
      }
    );
  };

  const handleDeleteMember = (idx: number) => {
    withConfirmation(
      "Delete Team Member?",
      "Are you sure you want to remove this profile from the executive board directory?",
      () => {
        const updatedList = teamMembersList.filter((_, i) => i !== idx);
        dataStore.saveTeamMembers(updatedList);
        setTeamMembersList(updatedList);
        setSaveAboutSuccess("Team Member deleted successfully!");
        setTimeout(() => setSaveAboutSuccess(""), 4500);
      }
    );
  };

  const handleSaveReason = (e: React.FormEvent) => {
    e.preventDefault();
    withConfirmation(
      editingReasonIndex !== null ? "Update Reason?" : "Add New Reason?",
      "Are you sure you want to save this feature point in the Why Choose Us list?",
      () => {
        const updatedList = [...whyChooseReasonsList];
        if (editingReasonIndex !== null) {
          updatedList[editingReasonIndex] = reasonForm;
          setEditingReasonIndex(null);
        } else {
          updatedList.push(reasonForm);
        }
        dataStore.saveWhyChooseReasons(updatedList);
        setWhyChooseReasonsList(updatedList);
        setIsAddingReason(false);
        setReasonForm({ title: "", desc: "" });
        setSaveAboutSuccess("Why Choose Us reason updated successfully!");
        setTimeout(() => setSaveAboutSuccess(""), 4500);
      }
    );
  };

  const handleDeleteReason = (idx: number) => {
    withConfirmation(
      "Delete Feature Point?",
      "Are you sure you want to remove this reason card from the Why Choose Us listing?",
      () => {
        const updatedList = whyChooseReasonsList.filter((_, i) => i !== idx);
        dataStore.saveWhyChooseReasons(updatedList);
        setWhyChooseReasonsList(updatedList);
        setSaveAboutSuccess("Reason deleted successfully!");
        setTimeout(() => setSaveAboutSuccess(""), 4500);
      }
    );
  };

  // Clients Action Handlers
  const handleSaveClient = (e: React.FormEvent) => {
    e.preventDefault();
    withConfirmation(
      editingClient ? "Update Client?" : "Add Client?",
      "Are you sure you want to save this client and their digital partner branding details?",
      () => {
        const currentClients = [...clients];
        
        // Extract logical fallbacks based on available fields since UI inputs are optional/removed
        const textLabel = clientForm.logoText && clientForm.logoText.trim() !== "" ? clientForm.logoText.trim() : "";
        const computedName = textLabel || (clientForm.logoUrl ? "Client logo image" : "Valued Partner");
        const computedCategory = "Corporate Partner";
        const computedLink = clientForm.link && clientForm.link.trim() !== "" ? clientForm.link.trim() : "#";
        const computedLogoText = textLabel || (clientForm.logoUrl ? "LOGO" : "PARTNER");

        const resolvedForm = {
          ...clientForm,
          name: computedName,
          category: computedCategory,
          link: computedLink,
          logoText: computedLogoText,
        };

        if (editingClient) {
          const idx = currentClients.findIndex(c => c.id === editingClient.id);
          if (idx !== -1) {
            currentClients[idx] = { ...editingClient, ...resolvedForm };
          }
        } else {
          const newClient: DBClient = {
            ...resolvedForm,
            id: "client-" + Date.now(),
          };
          currentClients.push(newClient);
        }
        dataStore.saveClients(currentClients);
        setClients(currentClients);
        setIsAddingClient(false);
        setEditingClient(null);
        setClientForm({ name: "", category: "", link: "#", logoText: "", logoStyle: "blue", logoUrl: undefined });
      }
    );
  };

  const handleEditClientClick = (client: DBClient) => {
    setEditingClient(client);
    setClientForm({
      name: client.name,
      category: client.category,
      link: client.link,
      logoText: client.logoText === "LOGO" || client.logoText === "PARTNER" ? "" : client.logoText,
      logoStyle: client.logoStyle,
      logoUrl: client.logoUrl,
    });
    setIsAddingClient(true);
  };

  const handleDeleteClient = (id: string) => {
    withConfirmation(
      "Delete Client?",
      "Are you sure you want to remove this client from your corporate partner list?",
      () => {
        const updated = clients.filter(c => c.id !== id);
        dataStore.saveClients(updated);
        setClients(updated);
      }
    );
  };

  // Brands Action Handlers
  const handleSaveBrand = (e: React.FormEvent) => {
    e.preventDefault();
    withConfirmation(
      editingBrand ? "Update Brand?" : "Add Brand?",
      "Are you sure you want to save this dynamic corporate brand branding details?",
      () => {
        const currentBrands = [...brands];

        const textLabel = brandForm.logoText && brandForm.logoText.trim() !== "" ? brandForm.logoText.trim() : "";
        const brandNameInput = brandForm.name && brandForm.name.trim() !== "" ? brandForm.name.trim() : "";
        
        // Resolve dynamic values
        const computedName = brandNameInput || textLabel || (brandForm.logoUrl ? "Brand logo image" : "Global Brand");
        const computedSub = brandForm.sub && brandForm.sub.trim() !== "" ? brandForm.sub.trim() : "Technology partner";
        const computedLink = brandForm.link && brandForm.link.trim() !== "" ? brandForm.link.trim() : "#";
        const computedLogoText = textLabel || brandNameInput || (brandForm.logoUrl ? "BRAND" : "PARTNER");

        const resolvedForm = {
          ...brandForm,
          name: computedName,
          sub: computedSub,
          link: computedLink,
          logoText: computedLogoText,
        };

        if (editingBrand) {
          const idx = currentBrands.findIndex(b => b.id === editingBrand.id);
          if (idx !== -1) {
            currentBrands[idx] = { ...editingBrand, ...resolvedForm };
          }
        } else {
          const newBrand: DBBrand = {
            ...resolvedForm,
            id: "brand-" + Date.now(),
          };
          currentBrands.push(newBrand);
        }
        dataStore.saveBrands(currentBrands);
        setBrands(currentBrands);
        setIsAddingBrand(false);
        setEditingBrand(null);
        setBrandForm({
          name: "",
          sub: "",
          color: "border-indigo-200 hover:border-indigo-500",
          link: "#",
          logoText: "",
          logoStyle: "standard",
          logoUrl: undefined,
        });
      }
    );
  };

  const handleEditBrandClick = (brand: DBBrand) => {
    setEditingBrand(brand);
    setBrandForm({
      name: brand.name,
      sub: brand.sub,
      color: brand.color,
      link: brand.link,
      logoText: brand.logoText === "BRAND" || brand.logoText === "PARTNER" ? "" : brand.logoText,
      logoStyle: brand.logoStyle,
      logoUrl: brand.logoUrl,
    });
    setIsAddingBrand(true);
  };

  const handleDeleteBrand = (id: string) => {
    withConfirmation(
      "Delete Brand?",
      "Are you sure you want to remove this brand from your corporate partner register?",
      () => {
        const updated = brands.filter(b => b.id !== id);
        dataStore.saveBrands(updated);
        setBrands(updated);
      }
    );
  };

  const handleSaveSlide = (e: React.FormEvent) => {
    e.preventDefault();
    if (!slideForm.image) {
      alert("Please select or upload a slider background image.");
      return;
    }

    withConfirmation(
      editingSlideIndex !== null ? "Update Hero Slide?" : "Add Hero Slide?",
      "Are you sure you want to save this interactive showcase slide to the homepage hero carousel?",
      () => {
        const currentSlides = [...heroSlides];
        if (editingSlideIndex !== null) {
          // Editing Mode
          currentSlides[editingSlideIndex] = {
            ...currentSlides[editingSlideIndex],
            ...slideForm
          };
          setSaveSlideSuccess("Hero slide updated successfully!");
        } else {
          // Adding Mode
          const newSlide: HeroSlide = {
            id: "slide-" + Date.now(),
            ...slideForm
          };
          currentSlides.push(newSlide);
          setSaveSlideSuccess("New Hero slide added successfully!");
        }

        dataStore.saveHeroSlides(currentSlides);
        setHeroSlides(currentSlides);
        setIsAddingSlide(false);
        setEditingSlideIndex(null);
        setSlideForm({
          image: "",
          tag: "",
          title: "",
          description: "",
          cta: "Explore Our Solutions"
        });

        setTimeout(() => {
          setSaveSlideSuccess("");
        }, 4000);
      }
    );
  };

  const handleDeleteSlide = (index: number) => {
    if (heroSlides.length <= 1) {
      alert("At least one slide is required for the Home screen hero slider layout. You cannot delete all slides.");
      return;
    }
    if (window.confirm("Are you sure you want to delete this hero slide?")) {
      const updated = heroSlides.filter((_, i) => i !== index);
      dataStore.saveHeroSlides(updated);
      setHeroSlides(updated);
      setSaveSlideSuccess("Hero slide deleted successfully!");
      setTimeout(() => {
        setSaveSlideSuccess("");
      }, 4000);
    }
  };

  const handleSaveTestimonial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!testimonialForm.text || !testimonialForm.author || !testimonialForm.role) {
      alert("Please fill in all required fields: Text, Author, and Role are required.");
      return;
    }

    const currentTestis = [...testimonials];
    if (editingTestimonialIndex !== null) {
      currentTestis[editingTestimonialIndex] = {
        ...currentTestis[editingTestimonialIndex],
        ...testimonialForm
      };
      setSaveTestimonialSuccess("Testimonial updated successfully!");
    } else {
      const newTesti: TestimonialItem = {
        id: "testi-" + Date.now(),
        ...testimonialForm,
        avatar: testimonialForm.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop"
      };
      currentTestis.push(newTesti);
      setSaveTestimonialSuccess("New testimonial added successfully!");
    }

    dataStore.saveTestimonials(currentTestis);
    setTestimonials(currentTestis);
    window.dispatchEvent(new Event("testimonials-updated"));
    setIsAddingTestimonial(false);
    setEditingTestimonialIndex(null);
    setTestimonialForm({
      text: "",
      author: "",
      role: "",
      avatar: ""
    });

    setTimeout(() => {
      setSaveTestimonialSuccess("");
    }, 4000);
  };

  const handleDeleteTestimonial = (index: number) => {
    if (testimonials.length <= 1) {
      alert("At least one testimonial is required for client reviews slideshow layout. You cannot delete all of them.");
      return;
    }
    if (window.confirm("Are you sure you want to delete this testimonial?")) {
      const updated = testimonials.filter((_, i) => i !== index);
      dataStore.saveTestimonials(updated);
      setTestimonials(updated);
      window.dispatchEvent(new Event("testimonials-updated"));
      setSaveTestimonialSuccess("Testimonial deleted successfully!");
      setTimeout(() => {
        setSaveTestimonialSuccess("");
      }, 4000);
    }
  };

  const handleSvgUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith(".svg") && file.type !== "image/svg+xml") {
      alert("Please upload a valid .svg file.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      if (text.includes("<svg") && text.includes("</svg>")) {
        setFloatingChatForm(prev => ({
          ...prev,
          svgCode: text
        }));
      } else {
        alert("Selected file does not appear to contain valid SVG code.");
      }
    };
    reader.readAsText(file);
  };

  const handleSaveFloatingChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!floatingChatForm.url || !floatingChatForm.label) {
      alert("Please fill in all required fields (URL/Link and Label).");
      return;
    }

    if (!floatingChatForm.svgCode || !floatingChatForm.svgCode.trim()) {
      alert("Please upload an SVG icon file or paste SVG markup code.");
      return;
    }

    const currentChats = [...floatingChats];
    if (editingFloatingChatIndex !== null) {
      currentChats[editingFloatingChatIndex] = {
        ...currentChats[editingFloatingChatIndex],
        ...floatingChatForm
      };
      setSaveFloatingChatSuccess("Floating chat option updated successfully!");
    } else {
      const newChat: FloatingChat = {
        id: "fc-" + Date.now(),
        ...floatingChatForm
      };
      currentChats.push(newChat);
      setSaveFloatingChatSuccess("New floating chat option added successfully!");
    }

    dataStore.saveFloatingChats(currentChats);
    setFloatingChats(currentChats);
    window.dispatchEvent(new Event("datastore-update"));
    setIsAddingFloatingChat(false);
    setEditingFloatingChatIndex(null);
    setFloatingChatForm({
      platform: "Custom SVG",
      url: "",
      label: "",
      color: "bg-indigo-600 hover:bg-indigo-500",
      active: true,
      svgCode: ""
    });

    setTimeout(() => {
      setSaveFloatingChatSuccess("");
    }, 4000);
  };

  const handleDeleteFloatingChat = (index: number) => {
    if (window.confirm("Are you sure you want to remove this floating chat option?")) {
      const updated = floatingChats.filter((_, i) => i !== index);
      dataStore.saveFloatingChats(updated);
      setFloatingChats(updated);
      window.dispatchEvent(new Event("datastore-update"));
      setSaveFloatingChatSuccess("Floating chat option removed successfully!");
      setTimeout(() => {
        setSaveFloatingChatSuccess("");
      }, 4000);
    }
  };

  const handleSaveStat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!statForm.value || !statForm.label || !statForm.sub) {
      alert("Please fill in all fields: Value, Label, and Subtitle are required.");
      return;
    }

    const currentStats = [...displayStats];
    if (editingStatIndex !== null) {
      currentStats[editingStatIndex] = {
        ...currentStats[editingStatIndex],
        ...statForm
      };
      setSaveStatSuccess("Stat counter updated successfully!");
    } else {
      const newStat: StatItem = {
        id: "stat-" + Date.now(),
        ...statForm
      };
      currentStats.push(newStat);
      setSaveStatSuccess("New stat countering parameter created successfully!");
    }

    dataStore.saveDisplayStats(currentStats);
    setDisplayStats(currentStats);
    setIsAddingStat(false);
    setEditingStatIndex(null);
    setStatForm({
      value: "",
      label: "",
      sub: "",
      iconName: "Award"
    });

    setTimeout(() => {
      setSaveStatSuccess("");
    }, 4000);
  };

  const handleDeleteStat = (index: number) => {
    if (displayStats.length <= 1) {
      alert("At least one stat card is required on the home page. You cannot delete all of them.");
      return;
    }
    if (window.confirm("Are you sure you want to delete this statistics counter card?")) {
      const updated = displayStats.filter((_, i) => i !== index);
      dataStore.saveDisplayStats(updated);
      setDisplayStats(updated);
      setSaveStatSuccess("Stat counter card deleted successfully!");
      setTimeout(() => {
        setSaveStatSuccess("");
      }, 4000);
    }
  };

  // Reactively ping the MySQL database connection to check active connectivity
  useEffect(() => {
    let active = true;
    const checkStatus = async () => {
      const config = dataStore.getMySQLConfig();
      if (config.activeDataSource === "local_storage") {
        if (active) {
          setDbPingStatus("local_storage");
          setDbPingError("");
        }
        return;
      }

      if (!config.apiEndpointUrl) {
        if (active) {
          setDbPingStatus("unconfigured");
          setDbPingError("MySQL Bridge PHP script URL is not configured yet.");
        }
        return;
      }

      if (active) {
        setDbPingStatus("checking");
      }

      try {
        const res = await dataStore.testMySQLConnection();
        if (active) {
          if (res.success) {
            setDbPingStatus("connected");
            setDbPingError("");
          } else {
            setDbPingStatus("disconnected");
            setDbPingError(res.message);
          }
        }
      } catch (e: any) {
        if (active) {
          setDbPingStatus("disconnected");
          setDbPingError(e.message || "Could not reach the database bridge file.");
        }
      }
    };

    checkStatus();

    const handleUpdate = () => {
      checkStatus();
    };

    window.addEventListener("datastore-update", handleUpdate);
    return () => {
      active = false;
      window.removeEventListener("datastore-update", handleUpdate);
    };
  }, [mysqlConfig.activeDataSource, mysqlConfig.apiEndpointUrl]);

  useEffect(() => {
    loadAllData();
    window.addEventListener("datastore-update", loadAllData);
    return () => window.removeEventListener("datastore-update", loadAllData);
  }, []);

  // Login handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const config = dataStore.getAdminAuthConfig();
    const expectedUser = config.adminUsername || "admin";
    const expectedPass = config.adminPassword || "admin";

    if (username.trim() === expectedUser && password === expectedPass) {
      setIsAuthenticated(true);
      sessionStorage.setItem("admin_auth", "true");
      setLoginError("");
    } else {
      setLoginError("Incorrect username or password. Please try again.");
    }
  };

  // Logout handler
  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("admin_auth");
  };

  // Inquiry actions
  const markInquiryAsRead = (id: string) => {
    const updated = inquiries.map(inq => inq.id === id ? { ...inq, status: "read" as const } : inq);
    dataStore.saveInquiries(updated);
  };

  const deleteInquiry = (id: string) => {
    withConfirmation(
      "Delete Customer Inquiry?",
      "Are you sure you want to delete this customer inquiry record from your dashboard?",
      () => {
        const updated = inquiries.filter(inq => inq.id !== id);
        dataStore.saveInquiries(updated);
      }
    );
  };

  const handleSendReply = (inquiryId: string) => {
    if (!replyText.trim()) return;
    const updated = inquiries.map(inq => {
      if (inq.id === inquiryId) {
        return {
          ...inq,
          status: "replied" as const,
          repliedMessage: replyText,
          repliedAt: new Date().toISOString()
        };
      }
      return inq;
    });
    dataStore.saveInquiries(updated);
    setReplyText("");
    setActiveInquiryForReply(null);
  };

  // General CRUD helper functions
  const handleDeleteItem = (targetId: string | number, type: typeof activeTab) => {
    withConfirmation(
      "Delete Content Item?",
      `Are you sure you want to permanently delete this ${type === "news" ? "news article" : "item"}? This action cannot be undone.`,
      () => {
        if (type === "news") {
          const updated = news.filter(n => n.id !== targetId);
          dataStore.saveNews(updated);
        } else if (type === "running-projects") {
          const updated = runningProjects.filter(p => p.id !== targetId);
          dataStore.saveRunningProjects(updated);
        } else if (type === "completed-projects") {
          const updated = completedProjects.filter(p => p.id !== targetId);
          dataStore.saveCompletedProjects(updated);
        } else if (type === "photos") {
          const updated = photos.filter(p => p.id !== targetId);
          dataStore.savePhotos(updated);
        } else if (type === "videos") {
          const updated = videos.filter(v => v.id !== targetId);
          dataStore.saveVideos(updated);
        }
      }
    );
  };

  // Submit handler for adding or editing an item
  const handleSaveItem = (e: React.FormEvent, type: typeof activeTab) => {
    e.preventDefault();
    setFormError("");

    // Read form inputs
    const fd = new FormData(e.currentTarget as HTMLFormElement);
    
    if (type === "news") {
      const title = fd.get("title") as string;
      const category = fd.get("category") as string;
      const date = fd.get("date") as string;
      const image = fd.get("image") as string;
      const summary = fd.get("summary") as string;
      const description = fd.get("description") as string;

      if (!title || !category || !date || !image || !summary || !description) {
        setFormError("All fields are required.");
        return;
      }

      const item: NewsItem = {
        id: editingItem?.id || `news-${Date.now()}`,
        title,
        category,
        date,
        image,
        summary,
        description
      };

      if (isAddingNew) {
        dataStore.saveNews([item, ...news]);
      } else {
        const updated = news.map(n => n.id === editingItem.id ? item : n);
        dataStore.saveNews(updated);
      }
    } 
    
    else if (type === "running-projects" || type === "completed-projects") {
      const title = fd.get("title") as string;
      const date = fd.get("date") as string;
      const image = fd.get("image") as string;
      const summary = fd.get("summary") as string;
      const description = fd.get("description") as string;
      const extraField = fd.get("extraField") as string; // 'status' for running, 'category' for completed

      if (!title || !date || !image || !summary || !description || !extraField) {
        setFormError("All fields are required.");
        return;
      }

      const item: ProjectItem = {
        id: editingItem?.id || `proj-${Date.now()}`,
        title,
        date,
        image,
        summary,
        description,
        ...(type === "running-projects" ? { status: extraField } : { category: extraField })
      };

      if (type === "running-projects") {
        if (isAddingNew) {
          dataStore.saveRunningProjects([item, ...runningProjects]);
        } else {
          const updated = runningProjects.map(p => p.id === editingItem.id ? item : p);
          dataStore.saveRunningProjects(updated);
        }
      } else {
        if (isAddingNew) {
          dataStore.saveCompletedProjects([item, ...completedProjects]);
        } else {
          const updated = completedProjects.map(p => p.id === editingItem.id ? item : p);
          dataStore.saveCompletedProjects(updated);
        }
      }
    } 
    
    else if (type === "photos") {
      const title = fd.get("title") as string;
      const category = fd.get("category") as string;
      const categoryLabel = fd.get("categoryLabel") as string;
      const client = fd.get("client") as string;
      const location = fd.get("location") as string;
      const description = fd.get("description") as string;
      const imagesString = fd.get("imagesString") as string;

      if (!title || !category || !categoryLabel || !client || !location || !imagesString) {
        setFormError("All fields except description are required.");
        return;
      }

      // Safe split handling comma and/or newline, but preserving base64 strings
      const rawArray = imagesString.split(/[\n,]/).map(img => img.trim()).filter(Boolean);
      const imagesArray: string[] = [];
      for (let i = 0; i < rawArray.length; i++) {
        const str = rawArray[i];
        if (str.startsWith("data:image/") && str.includes(";base64") && i + 1 < rawArray.length) {
          imagesArray.push(str + "," + rawArray[i + 1]);
          i++; // skip next merged part
        } else {
          imagesArray.push(str);
        }
      }

      const item: PhotoItem = {
        id: editingItem?.id || Date.now(),
        title,
        category,
        categoryLabel,
        location,
        client,
        description: description || "",
        images: imagesArray.length > 0 ? imagesArray : ["https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800"]
      };

      if (isAddingNew) {
        dataStore.savePhotos([item, ...photos]);
      } else {
        const updated = photos.map(p => p.id === editingItem.id ? item : p);
        dataStore.savePhotos(updated);
      }
    } 
    
    else if (type === "videos") {
      const title = fd.get("title") as string;
      const category = fd.get("category") as "overview" | "installation" | "tutorial";
      const categoryLabel = fd.get("categoryLabel") as string;
      const duration = fd.get("duration") as string;
      const date = fd.get("date") as string;
      const thumbnail = currentThumbnail || fd.get("thumbnail") as string;
      const description = fd.get("description") as string;

      const videoUrl = currentVideoUrl;
      const videoType = currentVideoType;

      // Parse YouTube ID out of various possible links or input
      let embedCode = fd.get("embedCode") as string || "dQw4w9WgXcQ";
      if (videoType === "youtube" && videoUrl) {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = videoUrl.match(regExp);
        embedCode = (match && match[2].length === 11) ? match[2] : videoUrl;
      }

      if (!title || !category || !categoryLabel || !duration || !date || !thumbnail) {
        setFormError("All fields except description and file are required.");
        return;
      }

      if (videoType === "uploaded" && !videoUrl) {
        setFormError("Please upload a local video file (up to 10MB) to utilize local video streaming.");
        return;
      }

      if (videoType === "youtube" && !videoUrl) {
        setFormError("Please specify a YouTube video URL, short link, or 11-char Video ID.");
        return;
      }

      const item: VideoItem = {
        id: editingItem?.id || Date.now(),
        title,
        category,
        categoryLabel,
        duration,
        date,
        thumbnail,
        embedCode,
        description: description || "",
        views: editingItem?.views || "0 views",
        videoType,
        videoUrl
      };

      if (isAddingNew) {
        dataStore.saveVideos([item, ...videos]);
      } else {
        const updated = videos.map(v => v.id === editingItem.id ? item : v);
        dataStore.saveVideos(updated);
      }
    }

    // Reset modals
    setEditingItem(null);
    setIsAddingNew(false);
  };

  // Close form/modal
  const closeForm = () => {
    setEditingItem(null);
    setIsAddingNew(false);
    setFormError("");
  };

  // Login Screen
  if (!isAuthenticated) {
    const compName = adminAuthConfig.loginCompanyName || "RS TECHNOLOGIES";
    const subLabel = adminAuthConfig.loginSubLabel || "Management Portal";

    return (
      <div className="bg-[#0c0d21] min-h-[85vh] flex items-center justify-center p-4">
        {/* Deep background mesh glow design */}
        <div className="absolute inset-0 bg-[#0c0d21] pointer-events-none select-none overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vh] bg-indigo-500/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[40vw] h-[40vh] bg-blue-500/10 rounded-full blur-[120px]" />
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px]" />
        </div>

        <div className="bg-[#121434]/80 backdrop-blur-xl border border-indigo-950/50 p-8 rounded-[2rem] w-full max-w-md shadow-2xl relative z-10 transition-all duration-300">
          <div className="flex flex-col items-center mb-6 text-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-600 to-blue-500 flex items-center justify-center text-white mb-4 shadow-lg shadow-indigo-500/20">
              <Shield className="w-8 h-8" />
            </div>
            <h1 className="text-white text-2xl font-extrabold tracking-wide uppercase font-sans">{compName}</h1>
            <p className="text-indigo-400 text-xs font-bold tracking-widest uppercase mt-1 font-sans">{subLabel}</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-slate-400 text-[10.5px] font-extrabold uppercase tracking-wider mb-2 font-sans">
                Admin Username
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="e.g. admin"
                  className="w-full bg-[#171a44]/70 border border-indigo-950/45 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm pl-11 font-sans"
                  required
                  autoFocus
                />
                <Users className="w-4 h-4 text-slate-500 absolute left-4 top-3.5" />
              </div>
            </div>

            <div>
              <label className="block text-slate-400 text-[10.5px] font-extrabold uppercase tracking-wider mb-2 font-sans">
                Admin Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#171a44]/70 border border-indigo-950/45 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm pl-11 font-sans"
                  required
                />
                <Lock className="w-4 h-4 text-slate-500 absolute left-4 top-3.5" />
              </div>
            </div>

            {loginError && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3 flex gap-2.5 items-center text-red-400 text-xs leading-relaxed font-sans">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-bold py-3.5 px-6 rounded-xl hover:from-indigo-500 hover:to-indigo-400 active:scale-98 transition-all duration-150 flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/10 cursor-pointer font-sans"
            >
              <Unlock className="w-4 h-4" />
              <span>Verify and Login</span>
            </button>
            
            <div className="text-center pt-2">
              <p className="text-[11px] text-slate-500 font-medium font-sans">
                development by <a href="https://devrobayad.com/" target="_blank" rel="noopener noreferrer" className="text-indigo-400 font-bold hover:underline">dev-robayad</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Count metrics for first-glance dashboard
  const unreadInquiriesCount = inquiries.filter(i => i.status === "new").length;

  return (
    <div className="bg-[#f0f4f9] min-h-screen pb-16">
      {/* Top Banner Control Header */}
      <div className="bg-gradient-to-r from-[#0d0f2b] to-[#161a49] text-white py-6 px-4 md:px-8 shadow-md border-b border-indigo-950/10 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="bg-indigo-600 text-white p-2.5 rounded-xl text-center shadow-lg">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-lg md:text-xl font-black tracking-wide font-display">ADMINISTRATOR CONTROL DESK</h1>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-semibold uppercase tracking-wider">
              <span className="text-indigo-300">Live Content Management & Leads Engine</span>
              <span className="text-indigo-500">•</span>
              <div className="flex items-center gap-1.5 select-none font-sans lowercase">
                <span className="text-[10px] text-slate-400 capitalize">cPanel Link:</span>
                {dbPingStatus === "checking" && (
                  <span className="inline-flex items-center gap-1 bg-amber-500/15 text-amber-300 text-[10px] px-2 py-0.5 rounded-full font-bold border border-amber-500/20 capitalize">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                    Checking...
                  </span>
                )}
                {dbPingStatus === "connected" && (
                  <span className="inline-flex items-center gap-1 bg-emerald-500/15 text-emerald-400 text-[10px] px-2 py-0.5 rounded-full font-bold border border-emerald-500/20 capitalize">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Connected
                  </span>
                )}
                {dbPingStatus === "disconnected" && (
                  <span className="inline-flex items-center gap-1 bg-rose-500/15 text-rose-400 text-[10px] px-2 py-0.5 rounded-full font-bold border border-rose-500/20 capitalize" title={dbPingError}>
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-ping" />
                    Offline fallback
                  </span>
                )}
                {dbPingStatus === "unconfigured" && (
                  <span className="inline-flex items-center gap-1 bg-rose-500/15 text-rose-400 text-[10px] px-2 py-0.5 rounded-full font-bold border border-rose-500/20 capitalize" title="Unconfigured">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                    Unconfigured
                  </span>
                )}
                {dbPingStatus === "local_storage" && (
                  <span className="inline-flex items-center gap-1 bg-indigo-500/15 text-indigo-300 text-[10px] px-2 py-0.5 rounded-full font-bold border border-indigo-500/20 capitalize">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                    Web LocalStorage
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => {
              window.location.hash = "#";
              window.location.reload();
            }}
            className="bg-white/10 hover:bg-white/20 text-white text-xs px-4 py-2.5 rounded-xl font-bold transition-all flex items-center gap-1.5 border border-white/10 cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Go to Site Frontend</span>
          </button>
          
          <button
            onClick={handleLogout}
            className="bg-red-600/90 hover:bg-red-500 text-white text-xs px-4 py-2.5 rounded-xl font-bold transition-all flex items-center gap-1.5 shadow-md hover:scale-103 active:scale-97 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Admin Dashboard Container Grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Sidebar Controls Panel (Col span 3) */}
        <aside className="lg:col-span-3 bg-white border border-slate-200/60 rounded-3xl p-5 shadow-sm flex flex-col gap-2">
          <h2 className="text-slate-400 text-[10px] font-extrabold uppercase tracking-widest px-3 mb-2 select-none">Navigation Matrix</h2>
          
          <button
            onClick={() => { setActiveTab("dashboard"); setSearchQuery(""); }}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-extrabold text-sm transition-all cursor-pointer ${
              activeTab === "dashboard" 
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/10" 
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <LayoutDashboard className="w-4 h-4" />
              <span>Overview Console</span>
            </div>
          </button>

          <button
            onClick={() => { setActiveTab("inquiries"); setSearchQuery(""); }}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-extrabold text-sm transition-all cursor-pointer ${
              activeTab === "inquiries" 
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/10" 
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <MessageSquare className="w-4 h-4" />
              <span>Site Inquiries</span>
            </div>
            {unreadInquiriesCount > 0 && (
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-black ${
                activeTab === "inquiries" ? "bg-white text-indigo-600" : "bg-indigo-600 text-white animate-bounce"
              }`}>
                {unreadInquiriesCount}
              </span>
            )}
          </button>

          <div className="border-t border-slate-100 my-2 select-none" />
          <h2 className="text-slate-400 text-[10px] font-extrabold uppercase tracking-widest px-3 mb-2 select-none font-sans">Content Managers</h2>

          <button
            onClick={() => { setActiveTab("news"); setSearchQuery(""); }}
            className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-xl font-extrabold text-sm transition-all cursor-pointer ${
              activeTab === "news" 
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/10" 
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Articles / News</span>
          </button>

          <button
            onClick={() => { setActiveTab("running-projects"); setSearchQuery(""); }}
            className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-xl font-extrabold text-sm transition-all cursor-pointer ${
              activeTab === "running-projects" 
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/10" 
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Running Projects</span>
          </button>

          <button
            onClick={() => { setActiveTab("completed-projects"); setSearchQuery(""); }}
            className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-xl font-extrabold text-sm transition-all cursor-pointer ${
              activeTab === "completed-projects" 
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/10" 
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            <CheckCircle className="w-4 h-4" />
            <span>Completed Projects</span>
          </button>

          <button
            onClick={() => { setActiveTab("photos"); setSearchQuery(""); }}
            className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-xl font-extrabold text-sm transition-all cursor-pointer ${
              activeTab === "photos" 
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/10" 
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>Photo Studio Gallery</span>
          </button>

          <button
            onClick={() => { setActiveTab("videos"); setSearchQuery(""); }}
            className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-xl font-extrabold text-sm transition-all cursor-pointer ${
              activeTab === "videos" 
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/10" 
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            <Video className="w-4 h-4" />
            <span>Video Library</span>
          </button>

          <button
            onClick={() => { setActiveTab("solutions"); setSearchQuery(""); }}
            className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-xl font-extrabold text-sm transition-all cursor-pointer ${
              activeTab === "solutions" 
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/10" 
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            <Shield className="w-4 h-4" />
            <span>Services & Solutions</span>
          </button>

          <button
            onClick={() => { setActiveTab("contact-info"); setSearchQuery(""); }}
            className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-xl font-extrabold text-sm transition-all cursor-pointer ${
              activeTab === "contact-info" 
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/10" 
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Contact & Identity</span>
          </button>

          <button
            onClick={() => { setActiveTab("about-sublinks"); setSearchQuery(""); }}
            className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-xl font-extrabold text-sm transition-all cursor-pointer ${
              activeTab === "about-sublinks" 
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/10" 
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>About Us & Sublinks</span>
          </button>

          <button
            onClick={() => { setActiveTab("clients"); setSearchQuery(""); }}
            className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-xl font-extrabold text-sm transition-all cursor-pointer ${
              activeTab === "clients" 
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/10" 
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Our Clients</span>
          </button>

          <button
            onClick={() => { setActiveTab("brands"); setSearchQuery(""); }}
            className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-xl font-extrabold text-sm transition-all cursor-pointer ${
              activeTab === "brands" 
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/10" 
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Our Brands</span>
          </button>

          <button
            onClick={() => { setActiveTab("hero-slider"); setSearchQuery(""); }}
            className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-xl font-extrabold text-sm transition-all cursor-pointer ${
              activeTab === "hero-slider" 
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/10" 
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>Hero Slider</span>
          </button>

          <button
            onClick={() => { setActiveTab("testimonials"); setSearchQuery(""); }}
            className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-xl font-extrabold text-sm transition-all cursor-pointer ${
              activeTab === "testimonials" 
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/10" 
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Testimonials</span>
          </button>

          <button
            onClick={() => { setActiveTab("floating-chats"); setSearchQuery(""); }}
            className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-xl font-extrabold text-sm transition-all cursor-pointer ${
              activeTab === "floating-chats" 
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/10" 
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            <MessageCircle className="w-4 h-4" />
            <span>Floating Chat Icons</span>
          </button>

          <button
            onClick={() => { setActiveTab("stats"); setSearchQuery(""); }}
            className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-xl font-extrabold text-sm transition-all cursor-pointer ${
              activeTab === "stats" 
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/10" 
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            <BarChart2 className="w-4 h-4" />
            <span>Stat Counters</span>
          </button>

          <button
            onClick={() => { setActiveTab("header-footer"); setSearchQuery(""); }}
            className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-xl font-extrabold text-sm transition-all cursor-pointer ${
              activeTab === "header-footer" 
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/10" 
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>Header & Footer</span>
          </button>

          <div className="border-t border-slate-100 my-2 select-none" />
          <h2 className="text-slate-400 text-[10px] font-extrabold uppercase tracking-widest px-3 mb-2 select-none font-sans">System Settings</h2>

          <button
            onClick={() => { setActiveTab("admin-settings"); setSearchQuery(""); }}
            className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-xl font-extrabold text-sm transition-all cursor-pointer ${
              activeTab === "admin-settings" 
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/10" 
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            <Lock className="w-4 h-4" />
            <span>Admin Credentials</span>
          </button>

          <button
            onClick={() => { setActiveTab("email-settings"); setSearchQuery(""); }}
            className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-xl font-extrabold text-sm transition-all cursor-pointer ${
              activeTab === "email-settings" 
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/10" 
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            <Mail className="w-4 h-4" />
            <span>Email & Webmail</span>
          </button>
        </aside>

        {/* Content Panel Box (Col span 9) */}
        <main className="lg:col-span-9 bg-white border border-slate-200/60 rounded-3xl p-6 md:p-8 shadow-sm min-h-[60vh] flex flex-col justify-between">
          
          <div>
            {/* ====== TAB 1: OVERVIEW CONSOLE (DASHBOARD) ====== */}
            {activeTab === "dashboard" && (
              <div className="space-y-8 animate-fade-in">
                {/* Header info */}
                <div>
                  <h2 className="text-xl font-extrabold text-slate-800">Operational Overview</h2>
                  <p className="text-slate-500 text-xs font-semibold mt-1">Status report of company web metrics, customer survey logs, and service catalogs.</p>
                </div>

                {/* KPI Metrics Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-gradient-to-tr from-indigo-50 to-indigo-100/60 p-5 rounded-2xl border border-indigo-100 text-left relative overflow-hidden select-none">
                    <MessageSquare className="w-8 h-8 text-indigo-500 absolute -bottom-2 -right-2 opacity-25" />
                    <span className="text-xs text-indigo-700 font-extrabold block uppercase tracking-wider">Unread Inquiries</span>
                    <span className="text-3xl font-black text-indigo-900 mt-2 block leading-none">{unreadInquiriesCount}</span>
                    <span className="text-[10px] text-slate-400 block mt-2.5">{inquiries.length} total inquiries logged</span>
                  </div>

                  <div className="bg-gradient-to-tr from-cyan-50 to-cyan-100/60 p-5 rounded-2xl border border-cyan-100 text-left relative overflow-hidden select-none">
                    <Briefcase className="w-8 h-8 text-cyan-500 absolute -bottom-2 -right-2 opacity-25" />
                    <span className="text-xs text-cyan-700 font-extrabold block uppercase tracking-wider">Active Deployments</span>
                    <span className="text-3xl font-black text-cyan-900 mt-2 block leading-none">{runningProjects.length}</span>
                    <span className="text-[10px] text-slate-400 block mt-2.5">Real-time tracker running</span>
                  </div>

                  <div className="bg-gradient-to-tr from-emerald-50 to-emerald-100/40 p-5 rounded-2xl border border-emerald-100 text-left relative overflow-hidden select-none">
                    <CheckCircle className="w-8 h-8 text-emerald-500 absolute -bottom-2 -right-2 opacity-25" />
                    <span className="text-xs text-emerald-700 font-extrabold block uppercase tracking-wider">Completed Portfolios</span>
                    <span className="text-3xl font-black text-emerald-900 mt-2 block leading-none">{completedProjects.length}</span>
                    <span className="text-[10px] text-slate-400 block mt-2.5">Endorsed tech case studies</span>
                  </div>

                  <div className="bg-gradient-to-tr from-amber-50 to-amber-100/60 p-5 rounded-2xl border border-amber-100 text-left relative overflow-hidden select-none">
                    <FileText className="w-8 h-8 text-amber-500 absolute -bottom-2 -right-2 opacity-25" />
                    <span className="text-xs text-amber-700 font-extrabold block uppercase tracking-wider">News Announcements</span>
                    <span className="text-3xl font-black text-amber-900 mt-2 block leading-none">{news.length}</span>
                    <span className="text-[10px] text-slate-400 block mt-2.5">National-focused logs</span>
                  </div>
                </div>

                {/* Guidelines Checklist */}
                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 select-none">
                  <h3 className="font-extrabold text-slate-800 text-sm uppercase tracking-wider mb-2">Platform Administration Guides</h3>
                  <ul className="space-y-2 text-[12.5px] text-slate-600 leading-relaxed list-disc list-inside">
                    <li>All updates are written and synchronized immediately to cPanel server files (<span className="font-bold text-slate-900 font-mono">site_data.json</span>).</li>
                    <li>Frontend pages reflect added/edited items dynamically upon navigation or page change.</li>
                    <li>When adding image URLs, you may use standard <span className="font-semibold text-slate-900">Unsplash urls</span> or corporate CDN linkages.</li>
                    <li>To check your submissions, test the <span className="font-semibold text-indigo-600">Contact page form</span> then return here to view live leads.</li>
                  </ul>
                </div>

                {/* Quick Unread Inquiries Table inside Dashboard */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-slate-800 font-extrabold text-sm uppercase tracking-wider">Recent Inbound Survey Leads</h3>
                    <button onClick={() => setActiveTab("inquiries")} className="text-xs text-indigo-600 font-bold hover:underline">
                      View all ({inquiries.length})
                    </button>
                  </div>

                  {inquiries.filter(i => i.status === "new").length === 0 ? (
                    <div className="border border-dashed border-slate-200 rounded-xl py-8 text-center text-slate-400 text-xs">
                      No new unread inquiries logged. Nice job keeping inbox clean!
                    </div>
                  ) : (
                    <div className="border border-slate-100 rounded-2xl overflow-hidden divide-y divide-slate-100">
                      {inquiries.filter(i => i.status === "new").slice(0, 3).map((inq) => (
                        <div key={inq.id} className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 hover:bg-slate-50 transition-all">
                          <div>
                            <p className="font-extrabold text-slate-800 text-sm">{inq.fullName}</p>
                            <p className="text-xs text-slate-500 font-medium">{inq.companyName} • <span className="text-indigo-600">{inq.mobilePhone}</span></p>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => markInquiryAsRead(inq.id)}
                              className="bg-indigo-50 hover:bg-indigo-100 text-indigo-600 text-xs px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer"
                            >
                              Mark Read
                            </button>
                            <button
                              onClick={() => setActiveTab("inquiries")}
                              className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer"
                            >
                              Check Details
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ====== TAB 2: INQUIRIES VIEW ====== */}
            {activeTab === "inquiries" && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <h2 className="text-xl font-extrabold text-slate-800 font-display">Inbound Site Surveys & Business Leads</h2>
                  <p className="text-slate-500 text-xs mt-1">Review the survey requests and commercial inquiry notes submitted by client corporations.</p>
                </div>

                {/* Submissions List */}
                {inquiries.length === 0 ? (
                  <div className="border-2 border-dashed border-slate-200 rounded-3xl py-16 text-center text-slate-400">
                    <MessageSquare className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                    <p className="font-extrabold text-sm text-slate-600">No submissions found</p>
                    <p className="text-xs text-slate-400 mt-1">Submit a real inquiry on the Contact page to view it live here.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {inquiries.map((inq) => (
                      <div 
                        key={inq.id} 
                        className={`border rounded-2xl p-5 md:p-6 transition-all ${
                          inq.status === "new" 
                            ? "border-l-4 border-l-indigo-600 bg-indigo-50/20 border-slate-200" 
                            : "border-slate-200 bg-white"
                        }`}
                      >
                        {/* Summary Block */}
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-100 pb-4 mb-4">
                          <div>
                            <div className="flex items-center gap-2.5">
                              <span className="font-extrabold text-slate-800 text-base">{inq.fullName}</span>
                              <span className={`text-[9px] uppercase font-black px-2 py-0.5 rounded-full tracking-wider ${
                                inq.status === "new" 
                                  ? "bg-indigo-600 text-white" 
                                  : inq.status === "replied" 
                                    ? "bg-emerald-500 text-white" 
                                    : "bg-slate-200 text-slate-600"
                              }`}>
                                {inq.status}
                              </span>
                            </div>
                            
                            <p className="text-xs text-slate-500 font-semibold mt-1">
                              {inq.companyName} • <span className="text-slate-800">{inq.corporateEmail}</span> • <span className="text-indigo-600 font-bold">{inq.mobilePhone}</span>
                            </p>
                          </div>

                          <div className="flex items-center gap-2.5 text-xs">
                            <span className="text-[10px] text-slate-400 font-mono font-medium flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5" />
                              {new Date(inq.createdAt).toLocaleString()}
                            </span>
                            
                            <button
                              onClick={() => deleteInquiry(inq.id)}
                              className="text-red-500 hover:text-red-700 p-2 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                              title="Delete inquiry entry"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {/* Description/Requirements Notes Block */}
                        <div className="text-slate-700 text-sm leading-relaxed whitespace-pre-line bg-slate-50 p-4 rounded-xl border border-slate-100 font-medium">
                          <p className="text-[10px] text-slate-400 uppercase font-extrabold tracking-widest mb-1.5 self-start">Requirement Details</p>
                          {inq.requirementDetails}
                        </div>

                        {/* Replied Section */}
                        {inq.status === "replied" && inq.repliedMessage && (
                          <div className="mt-4 bg-emerald-500/5 text-slate-700 border border-emerald-500/15 rounded-xl p-4 text-xs leading-relaxed">
                            <span className="font-bold text-emerald-700 uppercase block tracking-wider mb-1">Response Sent ({new Date(inq.repliedAt || "").toLocaleDateString()})</span>
                            <p className="font-medium italic text-emerald-800">"{inq.repliedMessage}"</p>
                          </div>
                        )}

                        {/* Interactive actions */}
                        <div className="flex justify-end gap-2.5 mt-4">
                          {inq.status === "new" && (
                            <button
                              onClick={() => markInquiryAsRead(inq.id)}
                              className="bg-indigo-50 hover:bg-indigo-100 text-indigo-600 text-xs px-4 py-2 rounded-xl font-bold transition-all cursor-pointer"
                            >
                              Mark as Read
                            </button>
                          )}
                          
                          {inq.status !== "replied" && activeInquiryForReply?.id !== inq.id && (
                            <button
                              onClick={() => {
                                setActiveInquiryForReply(inq);
                                setReplyText("");
                              }}
                              className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs px-4 py-2 rounded-xl font-bold transition-all cursor-pointer shadow-sm"
                            >
                              Compose Reply
                            </button>
                          )}
                        </div>

                        {/* Embedded inline Reply drafting form */}
                        {activeInquiryForReply?.id === inq.id && (
                          <div className="mt-4 border-t border-slate-100 pt-4 animate-fade-in space-y-3">
                            <label className="block text-slate-600 text-xs font-bold uppercase tracking-wider">
                              Draft Reply Email/SMS to {inq.fullName}
                            </label>
                            <textarea
                              rows={3}
                              value={replyText}
                              onChange={(e) => setReplyText(e.target.value)}
                              placeholder={`Dear ${inq.fullName},\nThank you for reaching out to RS Technologies. Our technician team is reviewing your survey details and will contact you shortly...`}
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                            <div className="flex justify-end gap-2 text-xs">
                              <button
                                onClick={() => setActiveInquiryForReply(null)}
                                className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-lg font-bold cursor-pointer"
                              >
                                Cancel
                              </button>
                              <button
                                onClick={() => handleSendReply(inq.id)}
                                className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-1.5 rounded-lg font-bold shadow-sm cursor-pointer"
                              >
                                Send Reply
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ====== TAB 3: NEWS CRUD / ARTICLE LIST ===== */}
            {(activeTab === "news" || 
              activeTab === "running-projects" || 
              activeTab === "completed-projects" || 
              activeTab === "photos" || 
              activeTab === "videos") && (
              <div className="space-y-6 animate-fade-in">
                
                {/* Search, Filter & New Button Bar */}
                <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
                  <div>
                    <h2 className="text-xl font-extrabold text-slate-800 font-display capitalize">
                      {activeTab.replace("-", " ")} Catalog
                    </h2>
                    <p className="text-slate-500 text-xs mt-1">
                      Perform Live CRUD updates immediately reflected onto client pages.
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setIsAddingNew(true);
                      setEditingItem({});
                    }}
                    className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs px-4 py-3 rounded-xl font-bold transition-all shadow-md shadow-indigo-600/5 flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Entry</span>
                  </button>
                </div>

                {/* Sub list representation */}
                <div className="mt-6">
                  {/* NEWS ARTICLES */}
                  {activeTab === "news" && (
                    <div className="border border-slate-200/60 rounded-3xl overflow-hidden divide-y divide-slate-150">
                      {news.map((item) => (
                        <div key={item.id} className="p-5 flex flex-col sm:flex-row items-stretch sm:items-center gap-5 justify-between hover:bg-slate-50 transition-colors">
                          <div className="flex gap-4 items-center">
                            <img src={item.image} alt={item.title} className="w-16 h-16 rounded-xl object-cover border bg-slate-100 flex-shrink-0" />
                            <div>
                              <span className="text-[10px] uppercase font-bold tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">{item.category}</span>
                              <h3 className="font-bold text-slate-800 text-sm mt-1 mb-0.5 line-clamp-1">{item.title}</h3>
                              <p className="text-slate-400 text-xs">{item.date} • <span className="italic">Summary: {item.summary.slice(0, 50)}...</span></p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 self-end sm:self-center">
                            <button
                              onClick={() => {
                                setEditingItem(item);
                                setIsAddingNew(false);
                              }}
                              className="bg-slate-100 hover:bg-slate-200 text-slate-700 p-2 rounded-xl transition-all cursor-pointer"
                              title="Edit item"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteItem(item.id, "news")}
                              className="bg-red-50 hover:bg-red-100 text-red-600 p-2 rounded-xl transition-all cursor-pointer"
                              title="Delete item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* RUNNING PROJECTS LIST */}
                  {activeTab === "running-projects" && (
                    <div className="border border-slate-200/60 rounded-3xl overflow-hidden divide-y divide-slate-150">
                      {runningProjects.map((item) => (
                        <div key={item.id} className="p-5 flex flex-col sm:flex-row items-stretch sm:items-center gap-5 justify-between hover:bg-slate-50 transition-colors">
                          <div className="flex gap-4 items-center">
                            <img src={item.image} alt={item.title} className="w-16 h-16 rounded-xl object-cover border bg-slate-100 flex-shrink-0" />
                            <div>
                              <span className="text-[10px] uppercase font-bold tracking-wider text-teal-600 bg-teal-50 px-2 py-0.5 rounded-full">{item.status}</span>
                              <h3 className="font-bold text-slate-800 text-sm mt-1 mb-0.5 line-clamp-1">{item.title}</h3>
                              <p className="text-slate-400 text-xs">{item.date} • <span className="italic">{item.summary}</span></p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 self-end sm:self-center">
                            <button
                              onClick={() => {
                                setEditingItem(item);
                                setIsAddingNew(false);
                              }}
                              className="bg-slate-100 hover:bg-slate-200 text-slate-700 p-2 rounded-xl transition-all cursor-pointer"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteItem(item.id, "running-projects")}
                              className="bg-red-50 hover:bg-red-100 text-red-600 p-2 rounded-xl transition-all cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* COMPLETED PROJECTS LIST */}
                  {activeTab === "completed-projects" && (
                    <div className="border border-slate-200/60 rounded-3xl overflow-hidden divide-y divide-slate-150">
                      {completedProjects.map((item) => (
                        <div key={item.id} className="p-5 flex flex-col sm:flex-row items-stretch sm:items-center gap-5 justify-between hover:bg-slate-50 transition-colors">
                          <div className="flex gap-4 items-center">
                            <img src={item.image} alt={item.title} className="w-16 h-16 rounded-xl object-cover border bg-slate-100 flex-shrink-0" />
                            <div>
                              <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">{item.category}</span>
                              <h3 className="font-bold text-slate-800 text-sm mt-1 mb-0.5 line-clamp-1">{item.title}</h3>
                              <p className="text-slate-400 text-xs">{item.date} • <span className="italic">{item.summary}</span></p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 self-end sm:self-center">
                            <button
                              onClick={() => {
                                setEditingItem(item);
                                setIsAddingNew(false);
                              }}
                              className="bg-slate-100 hover:bg-slate-200 text-slate-700 p-2 rounded-xl transition-all cursor-pointer"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteItem(item.id, "completed-projects")}
                              className="bg-red-50 hover:bg-red-100 text-red-600 p-2 rounded-xl transition-all cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* PHOTO ALBUMS */}
                  {activeTab === "photos" && (
                    <div className="border border-slate-200/60 rounded-3xl overflow-hidden divide-y divide-slate-150">
                      {photos.map((item) => (
                        <div key={item.id} className="p-5 flex flex-col sm:flex-row items-stretch sm:items-center gap-5 justify-between hover:bg-slate-50 transition-colors">
                          <div className="flex gap-4 items-center">
                            <img src={item.images[0]} alt={item.title} className="w-16 h-16 rounded-xl object-cover border bg-slate-100 flex-shrink-0" />
                            <div>
                              <span className="text-[10px] uppercase font-bold tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">{item.categoryLabel}</span>
                              <h3 className="font-bold text-slate-800 text-sm mt-1 mb-0.5 line-clamp-1">{item.title}</h3>
                              <p className="text-slate-400 text-xs">Client: <span className="text-slate-700 font-bold">{item.client}</span> • {item.location} • <span className="text-indigo-600 font-bold font-mono">{item.images.length} photos</span></p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 self-end sm:self-center">
                            <button
                              onClick={() => {
                                setEditingItem(item);
                                setIsAddingNew(false);
                              }}
                              className="bg-slate-100 hover:bg-slate-200 text-slate-700 p-2 rounded-xl transition-all cursor-pointer"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteItem(item.id, "photos")}
                              className="bg-red-50 hover:bg-red-100 text-red-600 p-2 rounded-xl transition-all cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* VIDEO CLIPS */}
                  {activeTab === "videos" && (
                    <div className="border border-slate-200/60 rounded-3xl overflow-hidden divide-y divide-slate-150">
                      {videos.map((item) => (
                        <div key={item.id} className="p-5 flex flex-col sm:flex-row items-stretch sm:items-center gap-5 justify-between hover:bg-slate-50 transition-colors">
                          <div className="flex gap-4 items-center whitespace-normal">
                            <img src={item.thumbnail} alt={item.title} className="w-20 h-14 rounded-xl object-cover border bg-slate-100 flex-shrink-0" />
                            <div className="flex-grow min-w-0">
                              <span className="text-[10px] uppercase font-bold tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">{item.categoryLabel}</span>
                              <h3 className="font-bold text-slate-800 text-sm mt-1 mb-0.5 line-clamp-1">{item.title}</h3>
                              <p className="text-slate-400 text-xs">Duration: {item.duration} • Views: {item.views} • Embed: <span className="font-mono text-indigo-600">{item.embedCode}</span></p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 self-end sm:self-center">
                            <button
                              onClick={() => {
                                setEditingItem(item);
                                setIsAddingNew(false);
                              }}
                              className="bg-slate-100 hover:bg-slate-200 text-slate-700 p-2 rounded-xl transition-all cursor-pointer"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteItem(item.id, "videos")}
                              className="bg-red-50 hover:bg-red-100 text-red-600 p-2 rounded-xl transition-all cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

              </div>
            )}

            {/* ====== TAB 8: SOLUTIONS & SERVICES MANAGEMENT ====== */}
            {activeTab === "solutions" && (
              <div className="space-y-6 animate-fade-in text-slate-800">
                {/* Header context info */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-extrabold text-slate-800">Services & Solutions Engine</h2>
                    <p className="text-slate-500 text-xs font-semibold mt-1">Live management of core services, sub-specialties, dynamic feature lists, and technical specifications.</p>
                  </div>
                  <div className="bg-slate-105 px-3.5 py-1.5 rounded-full text-xs font-bold text-slate-600 border border-slate-200">
                    Total Nodes: <span className="text-indigo-650 font-extrabold">{Object.keys(solutions).length}</span> cataloged
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  
                  {/* Left Column: Solutions List Matrix (Col span 4) */}
                  <div className="lg:col-span-4 bg-slate-50 border border-slate-200/70 p-4 rounded-2xl flex flex-col gap-4 max-h-[75vh] overflow-y-auto">
                    <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest px-2 font-sans">Catalog Structure</span>
                    
                    {/* Action buttons to construct new nodes */}
                    <div className="grid grid-cols-2 gap-2 px-1">
                      <button
                        type="button"
                        onClick={() => {
                          const tempId = "service-" + Date.now();
                          setNewSolutionForm({
                            id: tempId,
                            title: "",
                            tagline: "",
                            image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1200&auto=format&fit=crop",
                            iconName: "Monitor",
                            overview: "This is a brief, user-facing summary introducing this newly added core service node.",
                            parentId: ""
                          });
                          setIsAddingCoreSolution(true);
                        }}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white text-[10.5px] py-2 px-2.5 rounded-xl font-extrabold flex items-center justify-center gap-1 cursor-pointer transition-all shadow-sm"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Core Service</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          const tempId = "sub-" + Date.now();
                          setNewSolutionForm({
                            id: tempId,
                            title: "",
                            tagline: "",
                            image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200&auto=format&fit=crop",
                            iconName: "Cpu",
                            overview: "A focused, structured sub-specialist catalog page expanding on our core physical deliveries.",
                            parentId: "conference" // Default fallback parent
                          });
                          setIsAddingSubSolution(true);
                        }}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white text-[10.5px] py-2 px-2.5 rounded-xl font-extrabold flex items-center justify-center gap-1 cursor-pointer transition-all shadow-sm"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Sub-Service</span>
                      </button>
                    </div>

                    {/* MODAL 1: ADD NEW CORE SERVICE */}
                    {isAddingCoreSolution && (
                      <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in font-sans">
                        <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-6 md:p-8 space-y-6">
                          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                            <h3 className="font-extrabold text-slate-800 text-base">Create New Core Service</h3>
                            <button
                              type="button"
                              onClick={() => setIsAddingCoreSolution(false)}
                              className="text-slate-400 hover:text-slate-650 transition-colors cursor-pointer"
                            >
                              ✕
                            </button>
                          </div>

                          <div className="space-y-4">
                            <div>
                              <label className="block text-[10px] text-slate-400 font-extrabold uppercase mb-1">Service Title *</label>
                              <input
                                type="text"
                                value={newSolutionForm.title}
                                onChange={(e) => {
                                  const title = e.target.value;
                                  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
                                  setNewSolutionForm({ ...newSolutionForm, title, id: slug });
                                }}
                                placeholder="e.g. Artificial Intelligence Controls"
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-indigo-500 font-bold"
                              />
                            </div>

                            <div>
                              <label className="block text-[10px] text-slate-400 font-extrabold uppercase mb-1">Unique Identifier Key (Slugified) *</label>
                              <input
                                type="text"
                                value={newSolutionForm.id}
                                onChange={(e) => setNewSolutionForm({ ...newSolutionForm, id: e.target.value })}
                                placeholder="e.g. ai-controls"
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-805 font-mono"
                              />
                            </div>

                            <div>
                              <label className="block text-[10px] text-slate-400 font-extrabold uppercase mb-1">Tagline Overview *</label>
                              <input
                                type="text"
                                value={newSolutionForm.tagline}
                                onChange={(e) => setNewSolutionForm({ ...newSolutionForm, tagline: e.target.value })}
                                placeholder="e.g. Smart cognitive software and infrastructure automation"
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800"
                              />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="block text-[10px] text-slate-400 font-extrabold uppercase mb-1">Cover Image Source</label>
                                <div className="flex gap-2">
                                  <input
                                    type="text"
                                    value={newSolutionForm.image}
                                    onChange={(e) => setNewSolutionForm({ ...newSolutionForm, image: e.target.value })}
                                    className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-850"
                                    placeholder="Select file or paste link"
                                  />
                                  <label className="bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl px-3 py-2 text-xs font-bold cursor-pointer flex items-center justify-center shrink-0 border border-slate-200">
                                    <Upload className="w-3.5 h-3.5" />
                                    <input
                                      type="file"
                                      accept="image/*"
                                      className="hidden"
                                      onChange={(e) => {
                                        handleSingleImageUpload(e, (val) => setNewSolutionForm({ ...newSolutionForm, image: val }));
                                      }}
                                    />
                                  </label>
                                </div>
                              </div>
                              <div>
                                <label className="block text-[10px] text-slate-400 font-extrabold uppercase mb-1">Lucide Icon Class</label>
                                <select
                                  value={newSolutionForm.iconName}
                                  onChange={(e) => setNewSolutionForm({ ...newSolutionForm, iconName: e.target.value })}
                                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 font-bold cursor-pointer"
                                >
                                  {["Cpu", "Monitor", "Network", "Server", "Database", "Shield", "Lock", "Camera", "Video", "Volume2", "Eye", "Phone", "Activity", "Layers"].map((ic) => (
                                    <option key={ic} value={ic}>{ic}</option>
                                  ))}
                                </select>
                              </div>
                            </div>

                            <div>
                              <label className="block text-[10px] text-slate-400 font-extrabold uppercase mb-1">Overview Description *</label>
                              <textarea
                                value={newSolutionForm.overview}
                                onChange={(e) => setNewSolutionForm({ ...newSolutionForm, overview: e.target.value })}
                                rows={3}
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 resize-none"
                              />
                            </div>
                          </div>

                          <div className="flex justify-end gap-3.5 pt-3 border-t border-slate-100">
                            <button
                              type="button"
                              onClick={() => setIsAddingCoreSolution(false)}
                              className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-xs px-4 py-2.5 rounded-xl transition-all cursor-pointer"
                            >
                              Cancel
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                if (!newSolutionForm.title || !newSolutionForm.id) {
                                  alert("Please fill in the title and dynamic key.");
                                  return;
                                }
                                if (solutions[newSolutionForm.id]) {
                                  alert("This unique ID is already taken. Please customize it.");
                                  return;
                                }
                                const newObj = {
                                  ...newSolutionForm,
                                  features: [
                                    { title: "Standard Delivery Setup", desc: "Consultation, structural assessments, cabling, standard mounts, and full network verification." }
                                  ],
                                  applications: ["Corporate Enterprise Hubs", "Commercial Offices"],
                                  techSpecs: [{ label: "Standard Support SLA", value: "Compliant" }]
                                };
                                const updated = { ...solutions, [newSolutionForm.id]: newObj };
                                dataStore.saveSolutions(updated);
                                setSolutions(updated);
                                setEditingSolution(newObj);
                                setActiveSolutionTab("general");
                                setIsAddingCoreSolution(false);
                                window.dispatchEvent(new Event("datastore-update"));
                                alert(`Success! Core Service "${newSolutionForm.title}" added and activated for further designs.`);
                              }}
                              className="bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs px-5 py-2.5 rounded-xl transition-all cursor-pointer shadow-md shadow-indigo-600/10"
                            >
                              Create Service
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* MODAL 2: ADD NEW SUB SERVICE */}
                    {isAddingSubSolution && (
                      <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in font-sans">
                        <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-6 md:p-8 space-y-6">
                          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                            <h3 className="font-extrabold text-slate-800 text-base">Create New Sub-Service Specialty</h3>
                            <button
                              type="button"
                              onClick={() => setIsAddingSubSolution(false)}
                              className="text-slate-400 hover:text-slate-650 transition-colors cursor-pointer"
                            >
                              ✕
                            </button>
                          </div>

                          <div className="space-y-4">
                            <div>
                              <label className="block text-[10px] text-slate-400 font-extrabold uppercase mb-1">Select Parent Core Service *</label>
                              <select
                                value={newSolutionForm.parentId}
                                onChange={(e) => setNewSolutionForm({ ...newSolutionForm, parentId: e.target.value })}
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 font-bold focus:outline cursor-pointer"
                              >
                                {(() => {
                                  const coreNodes: { id: string; title: string }[] = [];
                                  const coreKeysOrder = ["conference", "sound", "cctv", "access", "telephony", "datacenter", "network", "vas"];
                                  coreKeysOrder.forEach(k => {
                                    if (solutions[k]) coreNodes.push({ id: k, title: solutions[k].title });
                                  });
                                  Object.keys(solutions).forEach(k => {
                                    if (!coreKeysOrder.includes(k) && solutions[k] && !solutions[k].parentId) {
                                      // Determine if it matches any default sub service ID
                                      const allDefaultSubIds = [
                                        "conf-solution", "conf-meeting-room", "sound-professional", "sound-ip-pa", "sound-pa",
                                        "cctv-ip-analog", "cctv-anpr", "cctv-ai", "cctv-vms", "cctv-storage", "cctv-centralized",
                                        "access-facial", "access-biometric", "access-visitor", "access-barrier", "access hotel", "access-scanning", "access-parking",
                                        "telephony-pabx", "dcim", "ems", "nms", "server-lan", "storage", "dc-power", "rack-management", "raise-floor", "online-ups", "dehumidifier", "precision-cooling",
                                        "passive-lan", "fiber-optic", "vas-managed", "vas-oncall", "vas-onestop", "vas-payment"
                                      ];
                                      if (!allDefaultSubIds.includes(k)) {
                                        coreNodes.push({ id: k, title: solutions[k].title });
                                      }
                                    }
                                  });
                                  return coreNodes.map(cn => (
                                    <option key={cn.id} value={cn.id}>{cn.title} ({cn.id})</option>
                                  ));
                                })()}
                              </select>
                            </div>

                            <div>
                              <label className="block text-[10px] text-slate-400 font-extrabold uppercase mb-1">Sub-Service Title *</label>
                              <input
                                type="text"
                                value={newSolutionForm.title}
                                onChange={(e) => {
                                  const title = e.target.value;
                                  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
                                  setNewSolutionForm({ ...newSolutionForm, title, id: slug });
                                }}
                                placeholder="e.g. Bio-metric Gate Scanners"
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline font-bold"
                              />
                            </div>

                            <div>
                              <label className="block text-[10px] text-slate-400 font-extrabold uppercase mb-1">Unique Identifier Key (Slugified) *</label>
                              <input
                                type="text"
                                value={newSolutionForm.id}
                                onChange={(e) => setNewSolutionForm({ ...newSolutionForm, id: e.target.value })}
                                placeholder="e.g. biometric-scanners"
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 font-mono"
                              />
                            </div>

                            <div>
                              <label className="block text-[10px] text-slate-400 font-extrabold uppercase mb-1">Tagline Overview *</label>
                              <input
                                type="text"
                                value={newSolutionForm.tagline}
                                onChange={(e) => setNewSolutionForm({ ...newSolutionForm, tagline: e.target.value })}
                                placeholder="e.g. Touchless authentication and turnstile integration"
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800"
                              />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="block text-[10px] text-slate-400 font-extrabold uppercase mb-1">Cover Image Source</label>
                                <div className="flex gap-2">
                                  <input
                                    type="text"
                                    value={newSolutionForm.image}
                                    onChange={(e) => setNewSolutionForm({ ...newSolutionForm, image: e.target.value })}
                                    className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800"
                                    placeholder="Select file or paste link"
                                  />
                                  <label className="bg-slate-100 hover:bg-slate-200 text-slate-750 rounded-xl px-3 py-2 text-xs font-bold cursor-pointer flex items-center justify-center shrink-0 border border-slate-200">
                                    <Upload className="w-3.5 h-3.5" />
                                    <input
                                      type="file"
                                      accept="image/*"
                                      className="hidden"
                                      onChange={(e) => {
                                        handleSingleImageUpload(e, (val) => setNewSolutionForm({ ...newSolutionForm, image: val }));
                                      }}
                                    />
                                  </label>
                                </div>
                              </div>
                              <div>
                                <label className="block text-[10px] text-slate-400 font-extrabold uppercase mb-1">Lucide Icon Class</label>
                                <select
                                  value={newSolutionForm.iconName}
                                  onChange={(e) => setNewSolutionForm({ ...newSolutionForm, iconName: e.target.value })}
                                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 font-bold cursor-pointer"
                                >
                                  {["Cpu", "Monitor", "Network", "Server", "Database", "Shield", "Lock", "Camera", "Video", "Volume2", "Eye", "Phone", "Activity", "Layers"].map((ic) => (
                                    <option key={ic} value={ic}>{ic}</option>
                                  ))}
                                </select>
                              </div>
                            </div>

                            <div>
                              <label className="block text-[10px] text-slate-400 font-extrabold uppercase mb-1">Overview Description *</label>
                              <textarea
                                value={newSolutionForm.overview}
                                onChange={(e) => setNewSolutionForm({ ...newSolutionForm, overview: e.target.value })}
                                rows={3}
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 resize-none"
                              />
                            </div>
                          </div>

                          <div className="flex justify-end gap-3.5 pt-3 border-t border-slate-100">
                            <button
                              type="button"
                              onClick={() => setIsAddingSubSolution(false)}
                              className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-xs px-4 py-2.5 rounded-xl transition-all cursor-pointer"
                            >
                              Cancel
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                if (!newSolutionForm.title || !newSolutionForm.id || !newSolutionForm.parentId) {
                                  alert("Please fill in parent selection, title, and dynamic key.");
                                  return;
                                }
                                if (solutions[newSolutionForm.id]) {
                                  alert("This unique ID is already taken. Please customize it.");
                                  return;
                                }
                                const newObj = {
                                  ...newSolutionForm,
                                  features: [
                                    { title: "Standard Delivery Setup", desc: "Configuring system layout and dynamic operational tests." }
                                  ],
                                  applications: ["Corporate Enterprise Hubs", "Security Checkpoints"],
                                  techSpecs: [{ label: "Standard Operations Mode", value: "Fully Certified" }]
                                };
                                const updated = { ...solutions, [newSolutionForm.id]: newObj };
                                dataStore.saveSolutions(updated);
                                setSolutions(updated);
                                setEditingSolution(newObj);
                                setActiveSolutionTab("general");
                                setIsAddingSubSolution(false);
                                window.dispatchEvent(new Event("datastore-update"));
                                alert(`Success! Sub-Service Specialty "${newSolutionForm.title}" added and registered under parent core node.`);
                              }}
                              className="bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs px-5 py-2.5 rounded-xl transition-all cursor-pointer shadow-md shadow-emerald-600/10"
                            >
                              Create Sub-Service
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="space-y-4">
                      {(() => {
                        const DEFAULT_HIERARCHY: Record<string, string[]> = {
                          conference: ["conf-solution", "conf-meeting-room"],
                          sound: ["sound-professional", "sound-ip-pa", "sound-pa"],
                          cctv: ["cctv-ip-analog", "cctv-anpr", "cctv-ai", "cctv-vms", "cctv-storage", "cctv-centralized"],
                          access: ["access-facial", "access-biometric", "access-visitor", "access-barrier", "access-hotel", "access-scanning", "access-parking"],
                          telephony: ["telephony-pabx"],
                          datacenter: ["dcim", "ems", "nms", "server-lan", "storage", "dc-power", "rack-management", "raise-floor", "online-ups", "dehumidifier", "precision-cooling"],
                          network: ["passive-lan", "fiber-optic"],
                          vas: ["vas-managed", "vas-oncall", "vas-onestop", "vas-payment"]
                        };

                        const groups: { title: string; mainId: string; subIds: string[] }[] = [];
                        const coreKeysOrder = ["conference", "sound", "cctv", "access", "telephony", "datacenter", "network", "vas"];
                        const allDefaultSubIds = Object.values(DEFAULT_HIERARCHY).flat();

                        // Add default core keys first
                        coreKeysOrder.forEach(key => {
                          if (solutions[key]) {
                            const subIds = new Set<string>(DEFAULT_HIERARCHY[key] || []);
                            
                            // Find any dynamically added sub-solutions belonging to this parentId
                            Object.keys(solutions).forEach(subK => {
                              if (solutions[subK]?.parentId === key) {
                                subIds.add(subK);
                              }
                            });

                            groups.push({
                              title: solutions[key].title,
                              mainId: key,
                              subIds: Array.from(subIds).filter(id => !!solutions[id])
                            });
                          }
                        });

                        // Add dynamically created core services (not a default sub and has no parentId)
                        Object.keys(solutions).forEach(key => {
                          if (!coreKeysOrder.includes(key) && !allDefaultSubIds.includes(key)) {
                            const sol = solutions[key];
                            if (sol && !sol.parentId) {
                              const subIds = new Set<string>();
                              Object.keys(solutions).forEach(subK => {
                                if (solutions[subK]?.parentId === key) {
                                  subIds.add(subK);
                                }
                              });
                              groups.push({
                                title: sol.title,
                                mainId: key,
                                subIds: Array.from(subIds).filter(id => !!solutions[id])
                              });
                            }
                          }
                        });

                        return groups;
                      })().map((grp, gidx) => {
                        const mainItem = solutions[grp.mainId];
                        if (!mainItem) return null;
                        
                        return (
                          <div key={grp.mainId} className="border-b border-slate-200/50 pb-3 last:border-0 last:pb-0">
                            <span className="text-[9.5px] font-bold text-indigo-700/80 block uppercase tracking-wide mb-1.5 px-2">{grp.title}</span>
                            
                            <div className="space-y-1">
                              {/* Main item row */}
                              <button
                                type="button"
                                onClick={() => {
                                  setEditingSolution(JSON.parse(JSON.stringify(mainItem)));
                                  setActiveSolutionTab("general");
                                }}
                                className={`w-full flex items-center justify-between text-left px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                  editingSolution?.id === mainItem.id
                                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-650/10"
                                    : "text-slate-700 hover:bg-slate-200/50"
                                }`}
                              >
                                <span>{mainItem.title}</span>
                                <span className={`text-[8.5px] uppercase font-black px-1.5 py-0.5 rounded ${
                                  editingSolution?.id === mainItem.id ? "bg-white/20 text-white" : "bg-indigo-50 text-indigo-600 border border-indigo-100"
                                }`}>Core</span>
                              </button>

                              {/* Nested sub-items rows */}
                              {grp.subIds.map((subId) => {
                                const subItem = solutions[subId];
                                if (!subItem) return null;
                                return (
                                  <button
                                    key={subId}
                                    type="button"
                                    onClick={() => {
                                      setEditingSolution(JSON.parse(JSON.stringify(subItem)));
                                      setActiveSolutionTab("general");
                                    }}
                                    className={`w-full flex items-center justify-between text-left pl-6 pr-2.5 py-1 rounded-lg text-[11.5px] font-semibold transition-all cursor-pointer ${
                                      editingSolution?.id === subItem.id
                                        ? "bg-indigo-500 text-white shadow-sm"
                                        : "text-slate-500 hover:bg-slate-200/40"
                                    }`}
                                  >
                                    <span>{subItem.title}</span>
                                    <span className={`text-[8px] uppercase font-black px-1 py-0.5 rounded ${
                                      editingSolution?.id === subItem.id ? "bg-white/20 text-white" : "bg-slate-200/50 text-slate-500"
                                    }`}>Sub</span>
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Right Column: Active Solution Form Editor (Col span 8) */}
                  <div className="lg:col-span-8">
                    {editingSolution ? (
                      <div className="bg-white border border-slate-200/80 shadow-sm p-6 rounded-3xl space-y-6">
                        
                        {/* Editor Header Title & Quick visual bar */}
                        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                          <div>
                            <span className="text-[9px] text-indigo-650 font-extrabold uppercase tracking-widest font-mono">Editing Node: {editingSolution.id}</span>
                            <h3 className="text-sm font-extrabold text-slate-800">{editingSolution.title || "Untitled Solution"}</h3>
                          </div>
                          <span className="px-3 py-1 rounded-full text-[10px] bg-slate-100 text-slate-500 font-extrabold border border-slate-200">
                            ID Key: <code className="font-mono">{editingSolution.id}</code>
                          </span>
                        </div>

                        {/* Secondary Navigation Tabs for sections */}
                        <div className="flex overflow-x-auto gap-1 bg-slate-50 border border-slate-200/60 p-1.5 rounded-xl text-xs font-bold">
                          {[
                            { id: "general", label: "General Settings" },
                            { id: "features", label: "Dynamic Features" },
                            { id: "applications", label: "Applications Range" },
                            { id: "techSpecs", label: "Tech Specs Matrix" }
                          ].map((t) => (
                            <button
                              key={t.id}
                              type="button"
                              onClick={() => setActiveSolutionTab(t.id as any)}
                              className={`px-3.5 py-2 rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                                activeSolutionTab === t.id
                                  ? "bg-white text-indigo-600 shadow-sm"
                                  : "text-slate-500 hover:text-slate-800 hover:bg-slate-200/40"
                              }`}
                            >
                              {t.label}
                            </button>
                          ))}
                        </div>

                        {/* --- TAB SECTION 1: GENERAL SETTINGS --- */}
                        {activeSolutionTab === "general" && (
                          <div className="space-y-4 animate-fade-in text-xs">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-[10px] text-slate-400 font-extrabold uppercase tracking-widest mb-1.5 font-sans">Service Title *</label>
                                <input
                                  type="text"
                                  value={editingSolution.title}
                                  onChange={(e) => setEditingSolution({ ...editingSolution, title: e.target.value })}
                                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 font-bold focus:ring-2 focus:ring-indigo-500"
                                />
                              </div>
                              <div>
                                <label className="block text-[10px] text-slate-400 font-extrabold uppercase tracking-widest mb-1.5 font-sans">Lucide Icon Class *</label>
                                <select
                                  value={editingSolution.iconName}
                                  onChange={(e) => setEditingSolution({ ...editingSolution, iconName: e.target.value })}
                                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 font-bold focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                                >
                                  {["Video", "Volume2", "Eye", "HeartHandshake", "Fingerprint", "PhoneCall", "Server", "Network", "Clock", "Briefcase", "FileText", "Database", "Activity", "Cable", "Zap", "Grid", "Battery", "Droplets", "Snowflake", "Power", "Camera", "Cpu", "Layers", "Monitor", "Users", "Presentation", "Mic", "Megaphone", "ScanFace", "Lock", "Shield", "Car", "Wrench", "CreditCard", "Phone"].map((ic) => (
                                    <option key={ic} value={ic}>{ic}</option>
                                  ))}
                                </select>
                              </div>
                            </div>

                            <div>
                              <label className="block text-[10px] text-slate-400 font-extrabold uppercase tracking-widest mb-1.5 font-sans">Descriptive Tagline *</label>
                              <input
                                type="text"
                                value={editingSolution.tagline}
                                onChange={(e) => setEditingSolution({ ...editingSolution, tagline: e.target.value })}
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 font-semibold focus:ring-2 focus:ring-indigo-500"
                              />
                            </div>

                            <div>
                              <label className="block text-[10px] text-slate-400 font-extrabold uppercase tracking-widest mb-1.5 font-sans">System Overview Passage (Markdown or Text) *</label>
                              <textarea
                                rows={4}
                                value={editingSolution.overview}
                                onChange={(e) => setEditingSolution({ ...editingSolution, overview: e.target.value })}
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs text-slate-800 leading-relaxed focus:ring-2 focus:ring-indigo-500"
                              />
                            </div>

                            {/* Base64 & Text URL Image Upload Interface */}
                            <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-3">
                              <label className="block text-[10px] text-slate-400 font-extrabold uppercase tracking-widest font-sans">Display Cover Image *</label>
                              
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="border-2 border-dashed border-slate-200 hover:border-indigo-400 rounded-xl p-3 text-center relative bg-white flex flex-col items-center justify-center min-h-[120px] group transition-colors">
                                  <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                      handleSingleImageUpload(e, (val) => setEditingSolution({ ...editingSolution, image: val }));
                                    }}
                                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                                  />
                                  <Upload className="w-5 h-5 text-slate-400 group-hover:text-indigo-500 mb-1 transition-colors" />
                                  <span className="text-[11px] font-bold text-slate-600">Select Local Image</span>
                                  <span className="text-[9px] text-slate-400">Supports JPG, PNG (Max 2MB)</span>
                                </div>
                                <div className="rounded-xl overflow-hidden border border-slate-200 h-[120px] bg-slate-100 relative">
                                  {editingSolution.image ? (
                                    <img src={editingSolution.image} alt="Preview" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                                  ) : (
                                    <div className="w-full h-full flex items-center justify-center text-[10px] text-slate-400 font-bold">No image loaded</div>
                                  )}
                                </div>
                              </div>

                              <div>
                                <span className="text-[9.5px] text-slate-400 font-extrabold block mb-1 font-sans">Direct Image Web Link URL:</span>
                                <input
                                  type="text"
                                  value={editingSolution.image}
                                  onChange={(e) => setEditingSolution({ ...editingSolution, image: e.target.value })}
                                  className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-700 font-mono focus:ring-2 focus:ring-indigo-500"
                                />
                              </div>
                            </div>
                          </div>
                        )}

                        {/* --- TAB SECTION 2: DYNAMIC FEATURES --- */}
                        {activeSolutionTab === "features" && (
                          <div className="space-y-4 animate-fade-in text-xs">
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest font-sans">Key Features List</span>
                              <span className="text-[10px] text-indigo-600 font-bold">Rows: {editingSolution.features?.length || 0}</span>
                            </div>

                            <div className="space-y-3 max-h-[40vh] overflow-y-auto pr-1">
                              {editingSolution.features?.map((feat: any, fidx: number) => (
                                <div key={fidx} className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex gap-3 items-start relative group">
                                  <div className="flex-1 space-y-2">
                                    <input
                                      type="text"
                                      value={feat.title}
                                      onChange={(e) => {
                                        const newFeats = [...editingSolution.features];
                                        newFeats[fidx].title = e.target.value;
                                        setEditingSolution({ ...editingSolution, features: newFeats });
                                      }}
                                      className="w-full bg-white border border-slate-250 rounded-lg px-2.5 py-1 text-xs font-bold text-slate-800 focus:ring-1 focus:ring-indigo-500"
                                      placeholder="Feature Title"
                                    />
                                    <textarea
                                      rows={2}
                                      value={feat.desc}
                                      onChange={(e) => {
                                        const newFeats = [...editingSolution.features];
                                        newFeats[fidx].desc = e.target.value;
                                        setEditingSolution({ ...editingSolution, features: newFeats });
                                      }}
                                      className="w-full bg-white border border-slate-250 rounded-lg p-2 text-xs text-slate-600 focus:ring-1 focus:ring-indigo-500"
                                      placeholder="Feature Description content notes..."
                                    />
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const newFeats = editingSolution.features.filter((_: any, idx: number) => idx !== fidx);
                                      setEditingSolution({ ...editingSolution, features: newFeats });
                                    }}
                                    className="bg-red-50 hover:bg-red-100 text-red-650 p-1.5 rounded-lg transition-colors cursor-pointer"
                                    title="Delete Feature"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              ))}
                            </div>

                            <button
                              type="button"
                              onClick={() => {
                                const activeFeats = editingSolution.features || [];
                                setEditingSolution({
                                  ...editingSolution,
                                  features: [...activeFeats, { title: "New Feature Spec", desc: "Detailed technical functionality description detail." }]
                                });
                              }}
                              className="w-full border-2 border-dashed border-slate-200 hover:border-indigo-400 py-2.5 rounded-xl flex items-center justify-center gap-1.5 text-xs text-slate-500 font-bold hover:text-indigo-600 transition-all cursor-pointer"
                            >
                              <Plus className="w-4 h-4" />
                              <span>Add New Feature Segment</span>
                            </button>
                          </div>
                        )}

                        {/* --- TAB SECTION 3: APPLICATIONS RANGE --- */}
                        {activeSolutionTab === "applications" && (
                          <div className="space-y-4 animate-fade-in text-xs">
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest font-sans">Applications Demographics</span>
                              <span className="text-[10px] text-indigo-600 font-bold">Items: {editingSolution.applications?.length || 0}</span>
                            </div>

                            <div className="space-y-2 max-h-[40vh] overflow-y-auto pr-1">
                              {editingSolution.applications?.map((appStr: string, aidx: number) => (
                                <div key={aidx} className="flex gap-2 items-center">
                                  <input
                                    type="text"
                                    value={appStr}
                                    onChange={(e) => {
                                        const newApps = [...editingSolution.applications];
                                        newApps[aidx] = e.target.value;
                                        setEditingSolution({ ...editingSolution, applications: newApps });
                                    }}
                                    className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-800 font-bold focus:ring-1 focus:ring-indigo-500"
                                    placeholder="e.g. Enterprise Corporate Headspaces"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const newApps = editingSolution.applications.filter((_: any, idx: number) => idx !== aidx);
                                      setEditingSolution({ ...editingSolution, applications: newApps });
                                    }}
                                    className="bg-red-50 hover:bg-red-100 text-red-650 p-1.5 rounded-lg transition-colors cursor-pointer"
                                  >
                                    <X className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              ))}
                            </div>

                            <button
                              type="button"
                              onClick={() => {
                                const activeApps = editingSolution.applications || [];
                                setEditingSolution({
                                  ...editingSolution,
                                  applications: [...activeApps, "New Target Sector"]
                                });
                              }}
                              className="w-full border-2 border-dashed border-slate-200 hover:border-indigo-400 py-2 rounded-xl flex items-center justify-center gap-1 text-xs text-slate-500 font-bold hover:text-indigo-600 transition-all cursor-pointer"
                            >
                              <Plus className="w-3.5 h-3.5" />
                              <span>Add Target Application Row</span>
                            </button>
                          </div>
                        )}

                        {/* --- TAB SECTION 4: TECH SPECS MATRIX --- */}
                        {activeSolutionTab === "techSpecs" && (
                          <div className="space-y-4 animate-fade-in text-xs">
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest font-sans">Technical Specifications Matrix</span>
                              <span className="text-[10px] text-indigo-600 font-bold">Specs: {editingSolution.techSpecs?.length || 0}</span>
                            </div>

                            <div className="space-y-2 max-h-[40vh] overflow-y-auto pr-1">
                              {editingSolution.techSpecs?.map((spec: any, sidx: number) => (
                                <div key={sidx} className="grid grid-cols-12 gap-2 items-center bg-slate-50/50 border border-slate-200 p-2 rounded-xl">
                                  <div className="col-span-5">
                                    <input
                                      type="text"
                                      value={spec.label}
                                      onChange={(e) => {
                                        const newSpecs = [...editingSolution.techSpecs];
                                        newSpecs[sidx].label = e.target.value;
                                        setEditingSolution({ ...editingSolution, techSpecs: newSpecs });
                                      }}
                                      className="w-full bg-white border border-slate-250 rounded-lg px-2 py-1 text-xs font-bold text-slate-700"
                                      placeholder="e.g. Temperature Limits"
                                    />
                                  </div>
                                  <div className="col-span-6">
                                    <input
                                      type="text"
                                      value={spec.value}
                                      onChange={(e) => {
                                        const newSpecs = [...editingSolution.techSpecs];
                                        newSpecs[sidx].value = e.target.value;
                                        setEditingSolution({ ...editingSolution, techSpecs: newSpecs });
                                      }}
                                      className="w-full bg-white border border-slate-250 rounded-lg px-2 py-1 text-xs text-slate-600"
                                      placeholder="e.g. 22°C - 35°C compliant"
                                    />
                                  </div>
                                  <div className="col-span-1 text-center font-sans">
                                    <button
                                      type="button"
                                      onClick={() => {
                                        const newSpecs = editingSolution.techSpecs.filter((_: any, idx: number) => idx !== sidx);
                                        setEditingSolution({ ...editingSolution, techSpecs: newSpecs });
                                      }}
                                      className="hover:bg-red-50 text-red-500 hover:text-red-700 p-1 rounded-lg transition-colors cursor-pointer animate-none"
                                    >
                                      <Trash2 className="w-3.5 h-3.5 mx-auto" />
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>

                            <button
                              type="button"
                              onClick={() => {
                                const activeSpecs = editingSolution.techSpecs || [];
                                setEditingSolution({
                                  ...editingSolution,
                                  techSpecs: [...activeSpecs, { label: "Technical Standard", value: "Compliant" }]
                                });
                              }}
                              className="w-full border-2 border-dashed border-slate-200 hover:border-indigo-400 py-2 rounded-xl flex items-center justify-center gap-1 text-xs text-slate-500 font-bold hover:text-indigo-600 transition-all cursor-pointer"
                            >
                              <Plus className="w-3.5 h-3.5" />
                              <span>Add New Spec Column</span>
                            </button>
                          </div>
                        )}

                        {/* Editor Action buttons */}
                        <div className="border-t border-slate-100 pt-5 flex justify-between items-center gap-3.5">
                          <button
                            type="button"
                            onClick={() => {
                              withConfirmation(
                                "Delete Service Node?",
                                `Are you sure you want to completely delete the service node "${editingSolution.title || editingSolution.id}"? This will recursively delete all its sub-services and cannot be undone.`,
                                () => {
                                  const updated = { ...solutions };
                                  const idToDelete = editingSolution.id;
                                  delete updated[idToDelete];
                                  
                                  // Recursive delete of children sub-services if deleting a core service
                                  Object.keys(updated).forEach(k => {
                                    if (updated[k]?.parentId === idToDelete) {
                                      delete updated[k];
                                    }
                                  });

                                  dataStore.saveSolutions(updated);
                                  setSolutions(updated);
                                  setEditingSolution(null);
                                  window.dispatchEvent(new Event("datastore-update"));
                                }
                              );
                            }}
                            className="bg-red-50 hover:bg-red-100 text-red-650 border border-slate-200/60 font-bold text-xs px-4 py-2.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Delete Node</span>
                          </button>

                          <div className="flex gap-3.5">
                            <button
                              type="button"
                              onClick={() => setEditingSolution(null)}
                              className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs px-4 py-2.5 rounded-xl transition-all cursor-pointer"
                            >
                              Discard
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                const updatedSolutions = { ...solutions, [editingSolution.id]: editingSolution };
                                dataStore.saveSolutions(updatedSolutions);
                                setSolutions(updatedSolutions);
                                window.dispatchEvent(new Event("datastore-update"));
                                alert("Database synchronized! Services and Sub-services alterations saved and compiled on the live pages instantly.");
                              }}
                              className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer shadow-indigo-600/10"
                            >
                              <Save className="w-3.5 h-3.5" />
                              <span>Save Service Changes</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-slate-50 border-2 border-dashed border-slate-200 p-8 rounded-3xl text-center min-h-[40vh] flex flex-col items-center justify-center space-y-3">
                        <Shield className="w-10 h-10 text-slate-400 animate-pulse" />
                        <h4 className="text-sm font-extrabold text-slate-700">No Node Selected</h4>
                        <p className="text-slate-400 text-xs max-w-sm leading-relaxed mx-auto">Select a main service or nested sub-service from the hierarchical catalog layout in the left pane to modify its configurations.</p>
                      </div>
                    )}
                  </div>

                </div>
              </div>
            )}

            {/* ====== TAB 9: CONTACT INFO MANAGEMENT ====== */}
            {activeTab === "contact-info" && (
              <div className="space-y-6 animate-fade-in text-slate-800">
                <div>
                  <h2 className="text-xl font-extrabold text-slate-800">Contact & Identity Center</h2>
                  <p className="text-slate-500 text-xs font-semibold mt-1">
                    Manage the main phone numbers, emails, addresses, social channels, and branding text across the entire website instantly.
                  </p>
                </div>

                <form onSubmit={handleSaveContactInfo} className="bg-slate-50 border border-slate-200/70 p-6 md:p-8 rounded-3xl space-y-6">
                  {saveContactSuccess && (
                    <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-xl text-xs flex gap-2 items-center leading-relaxed font-sans">
                      <CheckCircle className="w-4 h-4 flex-shrink-0 text-green-600" />
                      <span>Contact settings updated and compiled successfully! Changes are propagated across all website channels.</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-slate-705">
                    <div>
                      <label className="block text-slate-500 text-[10.5px] uppercase font-extrabold tracking-wider mb-1.5 font-sans">Company / Brand Name</label>
                      <input 
                        type="text" 
                        value={contactInfo.companyName}
                        onChange={(e) => setContactInfo({...contactInfo, companyName: e.target.value})}
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 font-bold" 
                        placeholder="e.g. Cloud Technologies" 
                        required 
                      />
                    </div>

                    <div>
                      <label className="block text-slate-500 text-[10.5px] uppercase font-extrabold tracking-wider mb-1.5 font-sans">Support Hotline Number</label>
                      <input 
                        type="text" 
                        value={contactInfo.phone}
                        onChange={(e) => setContactInfo({...contactInfo, phone: e.target.value})}
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 font-bold" 
                        placeholder="e.g. +880 9639992999" 
                        required 
                      />
                    </div>

                    <div>
                      <label className="block text-slate-500 text-[10.5px] uppercase font-extrabold tracking-wider mb-1.5 font-sans">Corporate Email Address</label>
                      <input 
                        type="email" 
                        value={contactInfo.email}
                        onChange={(e) => setContactInfo({...contactInfo, email: e.target.value})}
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 font-bold" 
                        placeholder="e.g. info@cloudtechnologies.com.bd" 
                        required 
                      />
                    </div>

                    <div>
                      <label className="block text-slate-500 text-[10.5px] uppercase font-extrabold tracking-wider mb-1.5 font-sans">WhatsApp Link or Hotline Number</label>
                      <input 
                        type="text" 
                        value={contactInfo.whatsapp}
                        onChange={(e) => setContactInfo({...contactInfo, whatsapp: e.target.value})}
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 font-bold" 
                        placeholder="e.g. https://wa.me/8809639992999" 
                        required 
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-slate-500 text-[10.5px] uppercase font-extrabold tracking-wider mb-1.5 font-sans">Facebook Page / Messenger Link</label>
                      <input 
                        type="text" 
                        value={contactInfo.facebookPage}
                        onChange={(e) => setContactInfo({...contactInfo, facebookPage: e.target.value})}
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 font-bold" 
                        placeholder="e.g. https://m.me/genzesports" 
                        required 
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-slate-500 text-[10.5px] uppercase font-extrabold tracking-wider mb-1.5 font-sans">Brief Registered Office Address (Footer, Sidebar, About)</label>
                      <input 
                        type="text" 
                        value={contactInfo.addressBrief}
                        onChange={(e) => setContactInfo({...contactInfo, addressBrief: e.target.value})}
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800" 
                        placeholder="e.g. 1st Floor, House 05, Block E, Road 02, Section 12, Pallabi, Mirpur, Dhaka 1216" 
                        required 
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-slate-500 text-[10.5px] uppercase font-extrabold tracking-wider mb-1.5 font-sans">Full Detailed Office Address (Contact Us Form)</label>
                      <textarea 
                        value={contactInfo.address}
                        onChange={(e) => setContactInfo({...contactInfo, address: e.target.value})}
                        rows={3}
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 leading-relaxed font-sans" 
                        placeholder="e.g. 1st Floor, House 05, Block E, Road 02, Section 12, Pallabi, Mirpur, Dhaka 1216, Bangladesh." 
                        required 
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-slate-500 text-[10.5px] uppercase font-extrabold tracking-wider mb-1.5 font-sans">Google Maps Embed iframe Link (src URL only)</label>
                      <input 
                        type="text" 
                        value={contactInfo.googleMapEmbed || ""}
                        onChange={(e) => setContactInfo({...contactInfo, googleMapEmbed: e.target.value})}
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 font-medium" 
                        placeholder="e.g. https://www.google.com/maps/embed?pb=..." 
                      />
                      <p className="text-slate-400 text-[10px] mt-1 font-medium italic font-sans leading-normal">
                        Instructions: Search location on Google Maps → Share → Embed Map → Copy the link (the exact URL inside the src="..." attribute of the iframe) and paste it here.
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-4 border-t border-slate-200/50">
                    <button
                      type="button"
                      onClick={() => setContactInfo(dataStore.getContactInfo())}
                      className="bg-slate-200 hover:bg-slate-100 text-slate-600 font-bold text-xs px-4 py-2.5 rounded-xl transition-all border border-slate-200 cursor-pointer"
                    >
                      Reset to Saved
                    </button>
                    <button
                      type="submit"
                      className="bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs px-5 py-2.5 rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer shadow-indigo-650/10"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Save & Apply Contact Info</span>
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* ====== TAB: ABOUT US & SUB-LINKS ====== */}
            {activeTab === "about-sublinks" && (
              <div className="space-y-6 animate-fade-in text-slate-800">
                <div>
                  <h2 className="text-xl font-extrabold text-slate-800">About Us & Sub-Links Editor</h2>
                  <p className="text-slate-500 text-xs font-semibold mt-1">
                    Manage all sub-pages and sections nested under the "About Us" dropdown navigation instantly.
                  </p>
                </div>

                {saveAboutSuccess && (
                  <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl text-xs flex gap-2 items-center leading-relaxed font-sans shadow-sm">
                    <CheckCircle className="w-4 h-4 flex-shrink-0 text-emerald-600" />
                    <span>{saveAboutSuccess}</span>
                  </div>
                )}

                {/* Sub-Tabs Grid */}
                <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3">
                  {[
                    { id: "about", label: "About Page" },
                    { id: "chairman", label: "Chairman Message" },
                    { id: "md", label: "MD Message" },
                    { id: "vision", label: "Vision & Mission" },
                    { id: "team", label: "Management Team" },
                    { id: "reasons", label: "Why Choose Us" }
                  ].map((sub) => (
                    <button
                      key={sub.id}
                      onClick={() => setActiveAboutSubTab(sub.id as any)}
                      className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
                        activeAboutSubTab === sub.id 
                          ? "bg-indigo-600 text-white shadow-sm" 
                          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                      }`}
                    >
                      {sub.label}
                    </button>
                  ))}
                </div>

                {/* SUB TAB 1: ABOUT COMPANY */}
                {activeAboutSubTab === "about" && (
                  <form onSubmit={handleSaveAboutConfig} className="bg-slate-50 border border-slate-200/70 p-6 md:p-8 rounded-3xl space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="md:col-span-2">
                        <label className="block text-slate-500 text-[10.5px] uppercase font-extrabold tracking-wider mb-1.5 font-sans">Section Tagline</label>
                        <input
                          type="text"
                          value={aboutConfig.tagline}
                          onChange={(e) => setAboutConfig({ ...aboutConfig, tagline: e.target.value })}
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-650"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-slate-500 text-[10.5px] uppercase font-extrabold tracking-wider mb-1.5 font-sans">Main Display Header Title</label>
                        <input
                          type="text"
                          value={aboutConfig.title}
                          onChange={(e) => setAboutConfig({ ...aboutConfig, title: e.target.value })}
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-650"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-slate-500 text-[10.5px] uppercase font-extrabold tracking-wider mb-1.5 font-sans">Overview Paragraph 1</label>
                        <textarea
                          rows={4}
                          value={aboutConfig.desc1}
                          onChange={(e) => setAboutConfig({ ...aboutConfig, desc1: e.target.value })}
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-600 font-sans"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-slate-500 text-[10.5px] uppercase font-extrabold tracking-wider mb-1.5 font-sans">Overview Paragraph 2</label>
                        <textarea
                          rows={4}
                          value={aboutConfig.desc2}
                          onChange={(e) => setAboutConfig({ ...aboutConfig, desc2: e.target.value })}
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-600 font-sans"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-slate-500 text-[10.5px] uppercase font-extrabold tracking-wider mb-1.5 font-sans">Trust Badge Text Description</label>
                        <input
                          type="text"
                          value={aboutConfig.badgeText}
                          onChange={(e) => setAboutConfig({ ...aboutConfig, badgeText: e.target.value })}
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-600"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-slate-500 text-[10.5px] uppercase font-extrabold tracking-wider mb-1.5 font-sans">Trust Badge Custom Icon Image / Upload</label>
                        <div className="flex gap-4">
                          {aboutConfig.badgeIconUrl && (
                            <div className="w-10 h-10 border border-slate-200 rounded-xl bg-indigo-50 shrink-0 flex items-center justify-center p-1.5 relative">
                              <img src={aboutConfig.badgeIconUrl} alt="Icon Preview" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                              <button
                                type="button"
                                onClick={() => setAboutConfig({ ...aboutConfig, badgeIconUrl: "" })}
                                className="absolute -top-1.5 -right-1.5 bg-red-600 hover:bg-red-500 text-white rounded-full p-0.5 shadow-sm text-[8px] cursor-pointer flex items-center justify-center w-4 h-4"
                                title="Remove Icon"
                              >
                                <X className="w-2.5 h-2.5" />
                              </button>
                            </div>
                          )}
                          <input
                            type="text"
                            value={aboutConfig.badgeIconUrl || ""}
                            onChange={(e) => setAboutConfig({ ...aboutConfig, badgeIconUrl: e.target.value })}
                            className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-xs focus:outline-none"
                            placeholder="Custom Icon Image URL (or upload file)"
                          />
                          <label className="bg-white border border-slate-200 text-slate-600 rounded-xl px-4 py-3 text-xs font-bold hover:bg-slate-150 cursor-pointer flex items-center gap-1.5 shadow-sm">
                            <Upload className="w-3.5 h-3.5" />
                            <span>Upload Icon</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                handleSingleImageUpload(e, (val) => setAboutConfig({ ...aboutConfig, badgeIconUrl: val }));
                              }}
                            />
                          </label>
                        </div>
                        <p className="text-slate-400 text-[10px] mt-1 font-medium italic leading-normal font-sans font-sans">
                          Leave blank to use the default "Users" icon. Uploading a small, transparent square PNG icon is recommended.
                        </p>
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-slate-500 text-[10.5px] uppercase font-extrabold tracking-wider mb-1.5 font-sans">About Page Base Image (Installer) URL or Upload</label>
                        <div className="flex gap-4">
                          <input
                            type="text"
                            value={aboutConfig.image1 || ""}
                            onChange={(e) => setAboutConfig({ ...aboutConfig, image1: e.target.value })}
                            className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-xs focus:outline-none"
                            placeholder="Image URL"
                          />
                          <label className="bg-white border border-slate-200 text-slate-600 rounded-xl px-4 py-3 text-xs font-bold hover:bg-slate-150 cursor-pointer flex items-center gap-1.5 shadow-sm">
                            <Upload className="w-3.5 h-3.5" />
                            <span>Upload File</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                handleSingleImageUpload(e, (val) => setAboutConfig({ ...aboutConfig, image1: val }));
                              }}
                            />
                          </label>
                        </div>
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-slate-500 text-[10.5px] uppercase font-extrabold tracking-wider mb-1.5 font-sans">About Page Overlay Image (Isometric Server) URL or Upload</label>
                        <div className="flex gap-4">
                          <input
                            type="text"
                            value={aboutConfig.image2 || ""}
                            onChange={(e) => setAboutConfig({ ...aboutConfig, image2: e.target.value })}
                            className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-xs focus:outline-none"
                            placeholder="Image URL"
                          />
                          <label className="bg-white border border-slate-200 text-slate-600 rounded-xl px-4 py-3 text-xs font-bold hover:bg-slate-150 cursor-pointer flex items-center gap-1.5 shadow-sm">
                            <Upload className="w-3.5 h-3.5" />
                            <span>Upload File</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                handleSingleImageUpload(e, (val) => setAboutConfig({ ...aboutConfig, image2: val }));
                              }}
                            />
                          </label>
                        </div>
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-slate-500 text-[10.5px] uppercase font-extrabold tracking-wider mb-1.5 font-sans">Trust Badge Mini Preview Image URL or Upload</label>
                        <div className="flex gap-4">
                          <input
                            type="text"
                            value={aboutConfig.badgeImage || ""}
                            onChange={(e) => setAboutConfig({ ...aboutConfig, badgeImage: e.target.value })}
                            className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-xs focus:outline-none"
                            placeholder="Image URL"
                          />
                          <label className="bg-white border border-slate-200 text-slate-600 rounded-xl px-4 py-3 text-xs font-bold hover:bg-slate-150 cursor-pointer flex items-center gap-1.5 shadow-sm">
                            <Upload className="w-3.5 h-3.5" />
                            <span>Upload File</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                handleSingleImageUpload(e, (val) => setAboutConfig({ ...aboutConfig, badgeImage: val }));
                              }}
                            />
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end pt-4 border-t border-slate-200">
                      <button
                        type="submit"
                        className="bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs px-5 py-2.5 rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer shadow-indigo-650/10"
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>Save About Us Info</span>
                      </button>
                    </div>
                  </form>
                )}

                {/* SUB TAB 2: CHAIRMAN MESSAGE */}
                {activeAboutSubTab === "chairman" && (
                  <form onSubmit={handleSaveChairmanConfig} className="bg-slate-50 border border-slate-200/70 p-6 md:p-8 rounded-3xl space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-slate-500 text-[10.5px] uppercase font-extrabold tracking-wider mb-1.5 font-sans">Chairman Name</label>
                        <input
                          type="text"
                          value={chairmanConfig.name}
                          onChange={(e) => setChairmanConfig({ ...chairmanConfig, name: e.target.value })}
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-600"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-500 text-[10.5px] uppercase font-extrabold tracking-wider mb-1.5 font-sans">Designation / Role Title</label>
                        <input
                          type="text"
                          value={chairmanConfig.role}
                          onChange={(e) => setChairmanConfig({ ...chairmanConfig, role: e.target.value })}
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-600"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-slate-500 text-[10.5px] uppercase font-extrabold tracking-wider mb-1.5 font-sans">Chairman Image (Unsplash URL or Base64 / File)</label>
                        <div className="flex gap-4">
                          <input
                            type="text"
                            value={chairmanConfig.photo}
                            onChange={(e) => setChairmanConfig({ ...chairmanConfig, photo: e.target.value })}
                            className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-xs focus:outline-none"
                            placeholder="Image URL"
                          />
                          <label className="bg-white border border-slate-200 text-slate-600 rounded-xl px-4 py-3 text-xs font-bold hover:bg-slate-150 cursor-pointer flex items-center gap-1.5 shadow-sm">
                            <Upload className="w-3.5 h-3.5" />
                            <span>Upload File</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                handleSingleImageUpload(e, (val) => setChairmanConfig({ ...chairmanConfig, photo: val }));
                              }}
                            />
                          </label>
                        </div>
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-slate-500 text-[10.5px] uppercase font-extrabold tracking-wider mb-1.5 font-sans">Inspirational Quote Headline</label>
                        <input
                          type="text"
                          value={chairmanConfig.title}
                          onChange={(e) => setChairmanConfig({ ...chairmanConfig, title: e.target.value })}
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-600"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-slate-500 text-[10.5px] uppercase font-extrabold tracking-wider mb-1.5 font-sans">Message Body (Paragraphs separated by double linebreaks)</label>
                        <textarea
                          rows={8}
                          value={chairmanConfig.message}
                          onChange={(e) => setChairmanConfig({ ...chairmanConfig, message: e.target.value })}
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-600 font-sans"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end pt-4 border-t border-slate-200">
                      <button
                        type="submit"
                        className="bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs px-5 py-2.5 rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer shadow-indigo-650/10"
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>Save Chairman Message</span>
                      </button>
                    </div>
                  </form>
                )}

                {/* SUB TAB 3: MD MESSAGE */}
                {activeAboutSubTab === "md" && (
                  <form onSubmit={handleSaveMDConfig} className="bg-slate-50 border border-slate-200/70 p-6 md:p-8 rounded-3xl space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-slate-500 text-[10.5px] uppercase font-extrabold tracking-wider mb-1.5 font-sans">MD Name</label>
                        <input
                          type="text"
                          value={mdConfig.name}
                          onChange={(e) => setMDConfig({ ...mdConfig, name: e.target.value })}
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-650"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-500 text-[10.5px] uppercase font-extrabold tracking-wider mb-1.5 font-sans">Designation / Role Title</label>
                        <input
                          type="text"
                          value={mdConfig.role}
                          onChange={(e) => setMDConfig({ ...mdConfig, role: e.target.value })}
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-600"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-slate-500 text-[10.5px] uppercase font-extrabold tracking-wider mb-1.5 font-sans">MD Image (Unsplash URL or Base64 / File)</label>
                        <div className="flex gap-4">
                          <input
                            type="text"
                            value={mdConfig.photo}
                            onChange={(e) => setMDConfig({ ...mdConfig, photo: e.target.value })}
                            className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-xs focus:outline-none"
                            placeholder="Image URL"
                          />
                          <label className="bg-white border border-slate-100 text-slate-600 rounded-xl px-4 py-3 text-xs font-bold hover:bg-slate-150 cursor-pointer flex items-center gap-1.5 shadow-sm">
                            <Upload className="w-3.5 h-3.5" />
                            <span>Upload File</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                handleSingleImageUpload(e, (val) => setMDConfig({ ...mdConfig, photo: val }));
                              }}
                            />
                          </label>
                        </div>
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-slate-500 text-[10.5px] uppercase font-extrabold tracking-wider mb-1.5 font-sans">Inspirational Quote Headline</label>
                        <input
                          type="text"
                          value={mdConfig.title}
                          onChange={(e) => setMDConfig({ ...mdConfig, title: e.target.value })}
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-650"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-slate-500 text-[10.5px] uppercase font-extrabold tracking-wider mb-1.5 font-sans">Message Body (Paragraphs separated by double linebreaks)</label>
                        <textarea
                          rows={8}
                          value={mdConfig.message}
                          onChange={(e) => setMDConfig({ ...mdConfig, message: e.target.value })}
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-600 font-sans"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end pt-4 border-t border-slate-200">
                      <button
                        type="submit"
                        className="bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs px-5 py-2.5 rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer shadow-indigo-650/10"
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>Save MD Message</span>
                      </button>
                    </div>
                  </form>
                )}

                {/* SUB TAB 4: VISION & MISSION */}
                {activeAboutSubTab === "vision" && (
                  <form onSubmit={handleSaveVisionMissionConfig} className="bg-slate-50 border border-slate-200/70 p-6 md:p-8 rounded-3xl space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="md:col-span-2">
                        <label className="block text-slate-500 text-[10.5px] uppercase font-extrabold tracking-wider mb-1.5 font-sans">Vision & Mission Title</label>
                        <input
                          type="text"
                          value={visionMissionConfig.visionTitle}
                          onChange={(e) => setVisionMissionConfig({ ...visionMissionConfig, visionTitle: e.target.value })}
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-650"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-slate-500 text-[10.5px] uppercase font-extrabold tracking-wider mb-1.5 font-sans">Vision & Mission Description Statement</label>
                        <textarea
                          rows={6}
                          value={visionMissionConfig.visionText}
                          onChange={(e) => setVisionMissionConfig({ ...visionMissionConfig, visionText: e.target.value })}
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-4 text-slate-800 text-xs focus:outline-none font-sans"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-slate-500 text-[10.5px] uppercase font-extrabold tracking-wider mb-1.5 font-sans">Vision & Mission Page Hero Image URL or Upload</label>
                        <div className="flex gap-4">
                          <input
                            type="text"
                            value={visionMissionConfig.image || ""}
                            onChange={(e) => setVisionMissionConfig({ ...visionMissionConfig, image: e.target.value })}
                            className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-xs focus:outline-none"
                            placeholder="Image URL"
                          />
                          <label className="bg-white border border-slate-200 text-slate-600 rounded-xl px-4 py-3 text-xs font-bold hover:bg-slate-150 cursor-pointer flex items-center gap-1.5 shadow-sm">
                            <Upload className="w-3.5 h-3.5" />
                            <span>Upload File</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                handleSingleImageUpload(e, (val) => setVisionMissionConfig({ ...visionMissionConfig, image: val }));
                              }}
                            />
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end pt-4 border-t border-slate-200">
                      <button
                        type="submit"
                        className="bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs px-5 py-2.5 rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer shadow-indigo-650/10"
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>Save Vision & Mission</span>
                      </button>
                    </div>
                  </form>
                )}

                {/* SUB TAB 5: TEAM / MANAGEMENT MEMBERS */}
                {activeAboutSubTab === "team" && (
                  <div className="space-y-6">
                    <div className="bg-slate-50 border border-slate-200/60 p-6 rounded-3xl flex justify-between items-center">
                      <div>
                        <h4 className="font-extrabold text-slate-800 text-sm">Registered Advisory Board & Core Executives</h4>
                        <p className="text-xs text-slate-500 mt-1 font-semibold">{teamMembersList.length} total members registered</p>
                      </div>
                      {!isAddingMember && editingMemberIndex === null && (
                        <button
                          onClick={() => {
                            setIsAddingMember(true);
                            setMemberForm({ name: "", role: "", description: "", image: "" });
                          }}
                          className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1 cursor-pointer transition-all shadow-md shadow-indigo-600/10"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add Team Member</span>
                        </button>
                      )}
                    </div>

                    {(isAddingMember || editingMemberIndex !== null) && (
                      <form onSubmit={handleSaveMember} className="bg-indigo-50/40 border border-indigo-100/80 p-6 rounded-3xl space-y-4">
                        <h4 className="font-extrabold text-indigo-950 text-xs uppercase tracking-wider">
                          {editingMemberIndex !== null ? "Edit Officer Profile" : "Register New Officer"}
                        </h4>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-slate-500 text-[10px] uppercase font-bold tracking-wider mb-1 font-sans">Full Name</label>
                            <input
                              type="text"
                              required
                              value={memberForm.name}
                              onChange={(e) => setMemberForm({ ...memberForm, name: e.target.value })}
                              className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-900 focus:outline-none"
                            />
                          </div>

                          <div>
                            <label className="block text-slate-500 text-[10px] uppercase font-bold tracking-wider mb-1 font-sans">Officer Role/Designation</label>
                            <input
                              type="text"
                              required
                              value={memberForm.role}
                              onChange={(e) => setMemberForm({ ...memberForm, role: e.target.value })}
                              className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-900 focus:outline-none"
                              placeholder="e.g. Chief Executive Officer"
                            />
                          </div>

                          <div className="md:col-span-2">
                            <label className="block text-slate-500 text-[10px] uppercase font-bold tracking-wider mb-1 font-sans">Image Photo (URL or Upload)</label>
                            <div className="flex gap-4">
                              <input
                                type="text"
                                value={memberForm.image}
                                onChange={(e) => setMemberForm({ ...memberForm, image: e.target.value })}
                                className="flex-1 bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs focus:outline-none text-slate-900"
                                placeholder="Photo URL"
                              />
                              <label className="bg-white border border-slate-200 text-slate-600 rounded-xl px-4 py-2 text-xs font-bold hover:bg-slate-100 cursor-pointer flex items-center gap-1.5 shadow-sm">
                                <Upload className="w-3.5 h-3.5" />
                                <span>Upload File</span>
                                <input
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  onChange={(e) => {
                                    handleSingleImageUpload(e, (val) => setMemberForm({ ...memberForm, image: val }));
                                  }}
                                />
                              </label>
                            </div>
                          </div>

                          <div className="md:col-span-2">
                            <label className="block text-slate-500 text-[10px] uppercase font-bold tracking-wider mb-1 font-sans">Professional Biography/Role Description</label>
                            <textarea
                              rows={3}
                              required
                              value={memberForm.description}
                              onChange={(e) => setMemberForm({ ...memberForm, description: e.target.value })}
                              className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs focus:outline-none text-slate-900"
                            />
                          </div>
                        </div>

                        <div className="flex justify-end gap-2 pt-2 border-t border-slate-200/50">
                          <button
                            type="button"
                            onClick={() => {
                              setIsAddingMember(false);
                              setEditingMemberIndex(null);
                              setMemberForm({ name: "", role: "", description: "", image: "" });
                            }}
                            className="bg-slate-200 hover:bg-slate-150 text-slate-700 text-xs font-bold px-4 py-2 rounded-xl transition-all cursor-pointer"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold px-5 py-2.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-md shadow-emerald-600/20"
                          >
                            <Save className="w-3.5 h-3.5" />
                            <span>Save Officer Profile</span>
                          </button>
                        </div>
                      </form>
                    )}

                    <div className="grid grid-cols-1 gap-4">
                      {teamMembersList.map((member, index) => (
                        <div key={index} className="border border-slate-150 p-4.5 rounded-2xl flex items-center gap-4.5 bg-white shadow-sm hover:border-slate-300 transition-all">
                          <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0 bg-slate-150 border border-slate-100">
                            <img src={member.image || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400"} alt={member.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h5 className="font-extrabold text-slate-900 text-sm truncate">{member.name}</h5>
                            <p className="text-indigo-600 text-xs font-bold">{member.role}</p>
                            <p className="text-slate-500 text-[11px] truncate mt-1 leading-normal">{member.description}</p>
                          </div>
                          <div className="flex gap-1.5 flex-shrink-0">
                            <button
                              onClick={() => {
                                setEditingMemberIndex(index);
                                setMemberForm(member);
                                setIsAddingMember(false);
                              }}
                              className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-slate-50 rounded-lg border border-slate-100"
                              title="Edit"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteMember(index)}
                              className="p-2 text-red-505 hover:bg-red-50 hover:text-red-700 rounded-lg border border-slate-100"
                              title="Delete"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* SUB TAB 6: WHY CHOOSE US - KEY REASONS */}
                {activeAboutSubTab === "reasons" && (
                  <div className="space-y-6">
                    <div className="bg-slate-50 border border-slate-200/60 p-6 rounded-3xl flex justify-between items-center">
                      <div>
                        <h4 className="font-extrabold text-slate-800 text-sm">Key Reasons & Competitive Edge</h4>
                        <p className="text-xs text-slate-500 mt-1 font-semibold">{whyChooseReasonsList.length} total reasons listed</p>
                      </div>
                      {!isAddingReason && editingReasonIndex === null && (
                        <button
                          onClick={() => {
                            setIsAddingReason(true);
                            setReasonForm({ title: "", desc: "" });
                          }}
                          className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1 cursor-pointer transition-all shadow-md shadow-indigo-600/10"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add New Reason</span>
                        </button>
                      )}
                    </div>

                    {(isAddingReason || editingReasonIndex !== null) && (
                      <form onSubmit={handleSaveReason} className="bg-indigo-50/40 border border-indigo-100/80 p-6 rounded-3xl space-y-4">
                        <h4 className="font-extrabold text-indigo-950 text-xs uppercase tracking-wider">
                          {editingReasonIndex !== null ? "Edit Highlight Reason" : "Create New Highlights Reason"}
                        </h4>

                        <div className="space-y-4">
                          <div>
                            <label className="block text-slate-500 text-[10px] uppercase font-bold tracking-wider mb-1 font-sans">Reason Title Header</label>
                            <input
                              type="text"
                              required
                              value={reasonForm.title}
                              onChange={(e) => setReasonForm({ ...reasonForm, title: e.target.value })}
                              className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-900 focus:outline-none"
                              placeholder="e.g. Unmatched Security Focus"
                            />
                          </div>

                          <div>
                            <label className="block text-slate-500 text-[10px] uppercase font-bold tracking-wider mb-1 font-sans">Reason Detail Statement</label>
                            <textarea
                              rows={3}
                              required
                              value={reasonForm.desc}
                              onChange={(e) => setReasonForm({ ...reasonForm, desc: e.target.value })}
                              className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs focus:outline-none text-slate-900 shadow-none font-sans"
                              placeholder="Detailed paragraph context..."
                            />
                          </div>
                        </div>

                        <div className="flex justify-end gap-2 pt-2 border-t border-slate-200/50">
                          <button
                            type="button"
                            onClick={() => {
                              setIsAddingReason(false);
                              setEditingReasonIndex(null);
                              setReasonForm({ title: "", desc: "" });
                            }}
                            className="bg-slate-200 hover:bg-slate-150 text-slate-700 text-xs font-bold px-4 py-2 rounded-xl transition-all cursor-pointer"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold px-5 py-2.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-md shadow-emerald-600/20"
                          >
                            <Save className="w-3.5 h-3.5" />
                            <span>Save Highlight</span>
                          </button>
                        </div>
                      </form>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {whyChooseReasonsList.map((reason, index) => (
                        <div key={index} className="border border-slate-150 p-5 rounded-2xl flex flex-col justify-between bg-white shadow-sm hover:border-slate-300 transition-all">
                          <div>
                            <h5 className="font-extrabold text-slate-900 text-sm mb-1.5">{reason.title}</h5>
                            <p className="text-slate-500 text-xs leading-relaxed mb-4">{reason.desc}</p>
                          </div>
                          <div className="flex justify-end gap-1.5 pt-3 border-t border-slate-100">
                            <button
                              onClick={() => {
                                setEditingReasonIndex(index);
                                setReasonForm(reason);
                                setIsAddingReason(false);
                              }}
                              className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-slate-50 rounded-lg border border-slate-100"
                              title="Edit"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteReason(index)}
                              className="p-1.5 text-red-505 hover:bg-red-50 hover:text-red-700 rounded-lg border border-slate-100"
                              title="Delete"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ====== TAB 10: OUR CLIENTS DIRECTORY ====== */}
            {activeTab === "clients" && (
              <div className="space-y-6 animate-fade-in text-slate-800">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-extrabold text-slate-800">Clients & Corporate Directory</h2>
                    <p className="text-slate-500 text-xs font-semibold mt-1">
                      Manage the registered companies, banks, and corporate entities that are featured across the homepage sections.
                    </p>
                  </div>
                  {!isAddingClient && (
                    <button
                      onClick={() => {
                        setEditingClient(null);
                        setClientForm({ name: "", category: "", link: "#", logoText: "", logoStyle: "blue" });
                        setIsAddingClient(true);
                      }}
                      className="bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5 self-start cursor-pointer shadow-md shadow-indigo-600/10"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add New Client</span>
                    </button>
                  )}
                </div>

                {isAddingClient && (
                  <form onSubmit={handleSaveClient} className="bg-slate-50 border border-indigo-100 p-6 md:p-8 rounded-3xl space-y-5 animate-fade-in">
                    <div className="flex items-center justify-between border-b border-indigo-100/50 pb-3">
                      <h3 className="font-bold text-sm text-indigo-900 uppercase tracking-wider">
                        {editingClient ? "Edit Client Partner Profile" : "Register New Client Partner"}
                      </h3>
                      <button
                        type="button"
                        onClick={() => {
                          setIsAddingClient(false);
                          setEditingClient(null);
                        }}
                        className="text-slate-450 hover:text-slate-650"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <label className="block text-slate-500 text-[10.5px] uppercase font-extrabold tracking-wider mb-1.5 font-sans">External Website Link</label>
                        <input
                          type="text"
                          value={clientForm.link}
                          onChange={(e) => setClientForm({ ...clientForm, link: e.target.value })}
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 font-mono"
                          placeholder="e.g. https://www.bb.org.bd or #"
                        />
                      </div>

                      {/* Image Upload for Client */}
                      <div className="bg-white border border-slate-200/80 p-4 rounded-xl flex flex-col sm:flex-row items-center gap-5 justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-center overflow-hidden shrink-0">
                            {clientForm.logoUrl ? (
                              <img src={clientForm.logoUrl} alt="Preview" className="w-full h-full object-contain" />
                            ) : (
                              <div className="text-[9px] text-slate-400 font-extrabold uppercase text-center">NO IMAGE</div>
                            )}
                          </div>
                          <div>
                            <span className="block text-slate-800 text-xs font-bold font-sans">Client Logo Image</span>
                            <span className="block text-slate-400 text-[10px] font-semibold mt-0.5 max-w-sm">
                              Upload a clean corporate logo or brand image. (Max size 2MB)
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <label className="bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-extrabold text-[11px] px-3.5 py-2.5 rounded-lg border border-indigo-200 transition-all cursor-pointer select-none">
                            <span>Choose Logo Image</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => handleSingleImageUpload(e, (val) => setClientForm({ ...clientForm, logoUrl: val }))}
                            />
                          </label>
                          {clientForm.logoUrl && (
                            <button
                              type="button"
                              onClick={() => setClientForm({ ...clientForm, logoUrl: undefined })}
                              className="px-3.5 py-2.5 bg-red-50 hover:bg-red-105 text-red-650 rounded-lg border border-red-200 transition-all font-bold text-[11px] cursor-pointer"
                            >
                              Reset
                            </button>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end gap-2.5 border-t border-slate-200/50 pt-4">
                      <button
                        type="button"
                        onClick={() => {
                          setIsAddingClient(false);
                          setEditingClient(null);
                        }}
                        className="bg-slate-200 hover:bg-slate-100 text-slate-650 font-bold text-xs px-4 py-2.5 rounded-xl cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs px-5 py-2.5 rounded-xl flex items-center gap-1.5 shadow-md shadow-emerald-600/20 cursor-pointer transition-all"
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>{editingClient ? "Apply Modifications" : "Register Partner Profile"}</span>
                      </button>
                    </div>
                  </form>
                )}

                <div className="border border-slate-200/70 rounded-2xl overflow-hidden">
                  <div className="bg-slate-50 px-5 py-4 border-b border-slate-200/50">
                    <span className="font-extrabold text-slate-700 text-xs uppercase tracking-wider">Registered Clients Directory ({clients.length})</span>
                  </div>

                  {clients.length === 0 ? (
                    <div className="p-8 text-center text-slate-400 font-sans">
                      No corporate clients found. Click "Add New Client" to start adding partner entries.
                    </div>
                  ) : (
                    <div className="divide-y divide-slate-100 max-h-[500px] overflow-y-auto">
                      {clients.map((c) => (
                        <div key={c.id} className="p-4 flex items-center justify-between hover:bg-slate-50/55 transition-all">
                          <div className="flex items-center gap-4 min-w-0">
                            {/* Visual Logo Preview */}
                            <div className="w-20 h-20 bg-slate-50 border border-slate-200/60 rounded-xl flex items-center justify-center shrink-0 overflow-hidden">
                              <ClientLogoRenderer client={c} />
                            </div>
                            <div className="min-w-0">
                              <h4 className="font-extrabold text-sm text-slate-800 leading-tight truncate">{c.name}</h4>
                              <p className="text-slate-400 text-[11px] font-semibold mt-0.5">{c.category}</p>
                              <p className="text-indigo-600 font-mono text-[9.5px] font-bold mt-1 max-w-[150px] sm:max-w-xs truncate">{c.link}</p>
                            </div>
                          </div>

                          <div className="flex gap-1.5 shrink-0 ml-4">
                            <button
                              onClick={() => handleEditClientClick(c)}
                              className="p-2 text-indigo-600 hover:bg-indigo-50/80 rounded-lg transition-all cursor-pointer"
                              title="Modify Profile"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteClient(c.id)}
                              className="p-2 text-red-500 hover:bg-red-50/80 rounded-lg transition-all cursor-pointer"
                              title="Delete Client"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ====== TAB 11: OUR BRANDS DIRECTORY ====== */}
            {activeTab === "brands" && (
              <div className="space-y-6 animate-fade-in text-slate-800">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-extrabold text-slate-800">Brands & Manufacturer Partners</h2>
                    <p className="text-slate-500 text-xs font-semibold mt-1">
                      Manage the global hardware, networking, and software brands displayed in our visual gallery and product segments.
                    </p>
                  </div>
                  {!isAddingBrand && (
                    <button
                      onClick={() => {
                        setEditingBrand(null);
                        setBrandForm({
                          name: "",
                          sub: "",
                          color: "border-indigo-200 hover:border-indigo-500",
                          link: "#",
                          logoText: "",
                          logoStyle: "standard",
                        });
                        setIsAddingBrand(true);
                      }}
                      className="bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5 self-start cursor-pointer shadow-md shadow-indigo-600/10"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add New Brand</span>
                    </button>
                  )}
                </div>

                {isAddingBrand && (
                  <form onSubmit={handleSaveBrand} className="bg-slate-50 border border-indigo-100 p-6 md:p-8 rounded-3xl space-y-5 animate-fade-in">
                    <div className="flex items-center justify-between border-b border-indigo-100/50 pb-3">
                      <h3 className="font-bold text-sm text-indigo-900 uppercase tracking-wider">
                        {editingBrand ? "Modify Brand Partner Profile" : "Register Global Brand Partner"}
                      </h3>
                      <button
                        type="button"
                        onClick={() => {
                          setIsAddingBrand(false);
                          setEditingBrand(null);
                        }}
                        className="text-slate-450 hover:text-slate-650"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <label className="block text-slate-500 text-[10.5px] uppercase font-extrabold tracking-wider mb-1.5 font-sans">Brand Website Link</label>
                        <input
                          type="text"
                          value={brandForm.link}
                          onChange={(e) => setBrandForm({ ...brandForm, link: e.target.value })}
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 font-mono"
                          placeholder="e.g. https://www.cisco.com or #"
                        />
                      </div>

                      {/* Image Upload for Brand */}
                      <div className="bg-white border border-slate-200/80 p-4 rounded-xl flex flex-col sm:flex-row items-center gap-5 justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-center overflow-hidden shrink-0">
                            {brandForm.logoUrl ? (
                              <img src={brandForm.logoUrl} alt="Preview" className="w-full h-full object-contain" />
                            ) : (
                              <div className="text-[9px] text-slate-400 font-extrabold uppercase text-center">NO IMAGE</div>
                            )}
                          </div>
                          <div>
                            <span className="block text-slate-800 text-xs font-bold font-sans">Brand Logo Image</span>
                            <span className="block text-slate-400 text-[10px] font-semibold mt-0.5 max-w-sm">
                              Upload a clean brand logo image with white/transparent background. (Max size 2MB)
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <label className="bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-extrabold text-[11px] px-3.5 py-2.5 rounded-lg border border-indigo-200 transition-all cursor-pointer select-none">
                            <span>Choose Logo Image</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => handleSingleImageUpload(e, (val) => setBrandForm({ ...brandForm, logoUrl: val }))}
                            />
                          </label>
                          {brandForm.logoUrl && (
                            <button
                              type="button"
                              onClick={() => setBrandForm({ ...brandForm, logoUrl: undefined })}
                              className="px-3.5 py-2.5 bg-red-50 hover:bg-red-105 text-red-650 rounded-lg border border-red-200 transition-all font-bold text-[11px] cursor-pointer"
                            >
                              Reset
                            </button>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end gap-2.5 border-t border-slate-200/50 pt-4">
                      <button
                        type="button"
                        onClick={() => {
                          setIsAddingBrand(false);
                          setEditingBrand(null);
                        }}
                        className="bg-slate-200 hover:bg-slate-100 text-slate-650 font-bold text-xs px-4 py-2.5 rounded-xl cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs px-5 py-2.5 rounded-xl flex items-center gap-1.5 shadow-md shadow-emerald-600/20 cursor-pointer transition-all"
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>{editingBrand ? "Apply Modifications" : "Register Brand Partner"}</span>
                      </button>
                    </div>
                  </form>
                )}

                <div className="border border-slate-200/70 rounded-2xl overflow-hidden">
                  <div className="bg-slate-50 px-5 py-4 border-b border-slate-200/50">
                    <span className="font-extrabold text-slate-700 text-xs uppercase tracking-wider">Partner Brand Directory ({brands.length})</span>
                  </div>

                  {brands.length === 0 ? (
                    <div className="p-8 text-center text-slate-400 font-sans">
                      No brands found. Click "Add New Brand" to register global manufacturing partners.
                    </div>
                  ) : (
                    <div className="divide-y divide-slate-100 max-h-[500px] overflow-y-auto">
                      {brands.map((b) => (
                        <div key={b.id} className="p-4 flex items-center justify-between hover:bg-slate-50/55 transition-all">
                          <div className="flex items-center gap-4 min-w-0">
                            {/* Accent Visual Preview Card */}
                            <div className={`w-20 h-20 bg-white border ${b.color} rounded-2xl flex items-center justify-center shrink-0 overflow-hidden`}>
                              <BrandLogoRenderer brand={b} />
                            </div>
                            <div className="min-w-0">
                              <h4 className="font-extrabold text-sm text-slate-800 leading-tight truncate">{b.name}</h4>
                              <p className="text-slate-450 text-[11px] font-semibold mt-0.5">{b.sub}</p>
                              <p className="text-indigo-600 font-mono text-[9.5px] font-bold mt-1 max-w-[150px] sm:max-w-xs truncate">{b.link}</p>
                            </div>
                          </div>

                          <div className="flex gap-1.5 shrink-0 ml-4">
                            <button
                              onClick={() => handleEditBrandClick(b)}
                              className="p-2 text-indigo-600 hover:bg-indigo-50/80 rounded-lg transition-all cursor-pointer"
                              title="Modify Profile"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteBrand(b.id)}
                              className="p-2 text-red-500 hover:bg-red-50/80 rounded-lg transition-all cursor-pointer"
                              title="Delete Brand"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ====== TAB: HERO SLIDER EDITOR ====== */}
            {activeTab === "hero-slider" && (
              <div className="space-y-6 animate-fade-in text-slate-800">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-extrabold text-slate-800">Hero Section Slideshow Editor</h2>
                    <p className="text-slate-500 text-xs font-semibold mt-1">
                      Add, modify, or rearrange slides displayed dynamically on the main landing page hero screen.
                    </p>
                  </div>
                  {!isAddingSlide && editingSlideIndex === null && (
                    <button
                      onClick={() => {
                        setIsAddingSlide(true);
                        setEditingSlideIndex(null);
                        setSlideForm({
                          image: "",
                          tag: "",
                          title: "",
                          description: "",
                          cta: "Explore Our Solutions"
                        });
                      }}
                      className="bg-indigo-600 hover:bg-indigo-555 text-white text-xs font-extrabold px-4.5 py-3 rounded-xl flex items-center gap-1.5 cursor-pointer transition-all shadow-md shadow-indigo-600/15"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Slide</span>
                    </button>
                  )}
                </div>

                {saveSlideSuccess && (
                  <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl text-xs flex gap-2 items-center leading-relaxed font-sans shadow-sm">
                    <CheckCircle className="w-4 h-4 flex-shrink-0 text-emerald-600" />
                    <span>{saveSlideSuccess}</span>
                  </div>
                )}

                {/* SLIDE ADD / EDIT FORM CONTAINER */}
                {(isAddingSlide || editingSlideIndex !== null) && (
                  <form onSubmit={handleSaveSlide} className="bg-slate-50 border border-slate-200/70 p-6 md:p-8 rounded-3xl space-y-5">
                    <h3 className="font-extrabold text-slate-800 text-sm">
                      {editingSlideIndex !== null ? "Modify Slide Parameters" : "Create New Slide Option"}
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 font-sans">
                      <div>
                        <label className="block text-slate-500 text-[10.5px] uppercase font-extrabold tracking-wider mb-1.5">Slide Tag / Badge Text (Optional)</label>
                        <input
                          type="text"
                          value={slideForm.tag}
                          onChange={(e) => setSlideForm({ ...slideForm, tag: e.target.value })}
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-600"
                          placeholder="e.g. Enterprise System Integrator (leave blank to hide)"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-500 text-[10.5px] uppercase font-extrabold tracking-wider mb-1.5">Button Call to Action (CTA) Text (Optional)</label>
                        <input
                          type="text"
                          value={slideForm.cta}
                          onChange={(e) => setSlideForm({ ...slideForm, cta: e.target.value })}
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-600"
                          placeholder="e.g. Explore Our Solutions (leave blank to hide)"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-slate-500 text-[10.5px] uppercase font-extrabold tracking-wider mb-1.5">Slide Display Heading / Title (Optional)</label>
                        <input
                          type="text"
                          value={slideForm.title}
                          onChange={(e) => setSlideForm({ ...slideForm, title: e.target.value })}
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-600"
                          placeholder="e.g. Intelligence Beyond Security (leave blank to hide)"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-slate-500 text-[10.5px] uppercase font-extrabold tracking-wider mb-1.5">Description Statement (Optional)</label>
                        <textarea
                          rows={3}
                          value={slideForm.description}
                          onChange={(e) => setSlideForm({ ...slideForm, description: e.target.value })}
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-600"
                          placeholder="Provide a compelling details snippet describing this solution slide... (leave blank to hide)"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-slate-500 text-[10.5px] uppercase font-extrabold tracking-wider mb-1.5">Background Hero Image (URL or Local Upload File) <span className="text-red-500 font-bold">*</span></label>
                        <div className="flex gap-4">
                          <input
                            type="text"
                            value={slideForm.image}
                            onChange={(e) => setSlideForm({ ...slideForm, image: e.target.value })}
                            className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-850 text-xs focus:outline-none"
                            placeholder="Image URL (e.g. https://images.unsplash.com/...)"
                          />
                          <label className="bg-white border border-slate-200 text-slate-600 rounded-xl px-4.5 py-3 text-xs font-bold hover:bg-slate-100 cursor-pointer flex items-center gap-1.5 shadow-sm shrink-0">
                            <Upload className="w-4 h-4 text-indigo-600" />
                            <span>Upload File</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                handleSingleImageUpload(e, (val) => setSlideForm({ ...slideForm, image: val }));
                              }}
                            />
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end gap-2.5 pt-4 border-t border-slate-200/50">
                      <button
                        type="button"
                        onClick={() => {
                          setIsAddingSlide(false);
                          setEditingSlideIndex(null);
                        }}
                        className="bg-slate-200 hover:bg-slate-150 text-slate-700 text-xs font-bold px-4 py-2.5 rounded-xl transition-all cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="bg-indigo-600 hover:bg-indigo-550 text-white text-xs font-extrabold px-5 py-2.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-md shadow-indigo-600/10"
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>Save Hero Slide</span>
                      </button>
                    </div>
                  </form>
                )}

                {/* CURRENT SLIDES DATABASE LIST */}
                <div className="space-y-4 font-sans">
                  <h3 className="font-extrabold text-slate-700 text-xs uppercase tracking-wider">Active Slides ({heroSlides.length})</h3>
                  
                  {heroSlides.length === 0 ? (
                    <div className="border border-dashed border-slate-200 p-8 text-center rounded-3xl bg-slate-50/50">
                      <p className="text-slate-400 text-xs font-medium">No slides configured. Please add one to render the slideshow homepage.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-4">
                      {heroSlides.map((slide, index) => (
                        <div key={slide.id || index} className="border border-slate-150 p-4.5 rounded-2xl flex flex-col md:flex-row md:items-center gap-4 bg-white shadow-sm hover:border-slate-300 transition-all">
                          {/* Image Thumbnail */}
                          <div className="w-full md:w-36 h-24 rounded-xl overflow-hidden bg-slate-900 border border-slate-200/40 flex-shrink-0">
                            <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
                          </div>

                          {/* Content Detail */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="bg-indigo-50 text-indigo-700 text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider truncate max-w-[200px]">
                                {slide.tag}
                              </span>
                              <span className="text-slate-400 text-[10px] font-mono">Index: #{index + 1}</span>
                            </div>
                            <h4 className="font-extrabold text-slate-900 text-sm leading-snug">{slide.title}</h4>
                            <p className="text-slate-500 text-xs line-clamp-1 mt-1 leading-normal">{slide.description}</p>
                            <p className="text-indigo-600 text-[10.5px] font-bold mt-1">CTA: <span className="underline">{slide.cta}</span></p>
                          </div>

                          {/* Action Controls */}
                          <div className="flex gap-2 shrink-0 md:self-center border-t border-slate-100 pt-3 md:pt-0 md:border-0 justify-end">
                            <button
                              onClick={() => {
                                setEditingSlideIndex(index);
                                setSlideForm({
                                  image: slide.image,
                                  tag: slide.tag,
                                  title: slide.title,
                                  description: slide.description,
                                  cta: slide.cta
                                });
                                setIsAddingSlide(false);
                              }}
                              className="p-2 text-indigo-600 hover:bg-indigo-555 rounded-lg border border-slate-100 transition-all cursor-pointer"
                              title="Edit Slide"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteSlide(index)}
                              className="p-2 text-red-500 hover:bg-red-50/80 rounded-lg border border-slate-100 transition-all cursor-pointer"
                              title="Delete Slide"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteSlide(index)}
                              className="p-2 text-red-500 hover:bg-red-50/80 rounded-lg border border-slate-100 transition-all cursor-pointer"
                              title="Delete Slide"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

                     {activeTab === "testimonials" && (
              <div className="space-y-6 animate-fade-in text-slate-800">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-extrabold text-slate-800">Institutional Testimonials Manager</h2>
                    <p className="text-slate-500 text-xs font-semibold mt-1">
                      Manage client reviews, professional testimonials, and commendation quotes visible on the home page.
                    </p>
                  </div>
                  {!isAddingTestimonial && editingTestimonialIndex === null && (
                    <button
                      onClick={() => {
                        setIsAddingTestimonial(true);
                        setEditingTestimonialIndex(null);
                        setTestimonialForm({
                          text: "",
                          author: "",
                          role: "",
                          avatar: ""
                        });
                      }}
                      className="bg-indigo-600 hover:bg-indigo-555 text-white text-xs font-extrabold px-4.5 py-3 rounded-xl flex items-center gap-1.5 cursor-pointer transition-all shadow-md shadow-indigo-600/15"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Testimonial</span>
                    </button>
                  )}
                </div>

                {saveTestimonialSuccess && (
                  <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl text-xs flex gap-2 items-center leading-relaxed font-sans shadow-sm">
                    <CheckCircle className="w-4 h-4 flex-shrink-0 text-emerald-600" />
                    <span>{saveTestimonialSuccess}</span>
                  </div>
                )}

                {/* FORM PANEL CONTAINER */}
                {(isAddingTestimonial || editingTestimonialIndex !== null) && (
                  <form onSubmit={handleSaveTestimonial} className="bg-slate-50 border border-slate-200/70 p-6 md:p-8 rounded-3xl space-y-5">
                    <h3 className="font-extrabold text-slate-800 text-sm">
                      {editingTestimonialIndex !== null ? "Modify Testimonial Parameters" : "Create New Institutional Testimonial"}
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 font-sans">
                      <div>
                        <label className="block text-slate-500 text-[10.5px] uppercase font-extrabold tracking-wider mb-1.5">Client & Author Name</label>
                        <input
                          type="text"
                          required
                          value={testimonialForm.author}
                          onChange={(e) => setTestimonialForm({ ...testimonialForm, author: e.target.value })}
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-600"
                          placeholder="e.g. Farhan Tanvir"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-500 text-[10.5px] uppercase font-extrabold tracking-wider mb-1.5">Designation, Role & Organization</label>
                        <input
                          type="text"
                          required
                          value={testimonialForm.role}
                          onChange={(e) => setTestimonialForm({ ...testimonialForm, role: e.target.value })}
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-600"
                          placeholder="e.g. Infrastructure Lead, Citizens Bank PLC"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-slate-500 text-[10.5px] uppercase font-extrabold tracking-wider mb-1.5">Review / Client Endorsement Text</label>
                        <textarea
                          rows={4}
                          required
                          value={testimonialForm.text}
                          onChange={(e) => setTestimonialForm({ ...testimonialForm, text: e.target.value })}
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-600 leading-normal"
                          placeholder="Write feedback statement describing key operations handled or praising deliverables..."
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-slate-500 text-[10.5px] uppercase font-extrabold tracking-wider mb-1.5">Client Avatar / Profile Picture (URL or File Upload)</label>
                        <div className="flex gap-4">
                          <input
                            type="text"
                            value={testimonialForm.avatar}
                            onChange={(e) => setTestimonialForm({ ...testimonialForm, avatar: e.target.value })}
                            className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-850 text-xs focus:outline-none"
                            placeholder="Image URL or leave empty for dynamic placeholder avatar"
                          />
                          <label className="bg-white border border-slate-200 text-slate-600 rounded-xl px-4.5 py-3 text-xs font-bold hover:bg-slate-100 cursor-pointer flex items-center gap-1.5 shadow-sm shrink-0">
                            <Upload className="w-4 h-4 text-indigo-600" />
                            <span>Upload Avatar</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                handleSingleImageUpload(e, (val) => setTestimonialForm({ ...testimonialForm, avatar: val }));
                              }}
                            />
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end gap-2.5 pt-4 border-t border-slate-200/50">
                      <button
                        type="button"
                        onClick={() => {
                          setIsAddingTestimonial(false);
                          setEditingTestimonialIndex(null);
                        }}
                        className="bg-slate-200 hover:bg-slate-150 text-slate-700 text-xs font-bold px-4 py-2.5 rounded-xl transition-all cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="bg-indigo-600 hover:bg-indigo-550 text-white text-xs font-extrabold px-5 py-2.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-md shadow-indigo-600/10"
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>Save Testimonial</span>
                      </button>
                    </div>
                  </form>
                )}

                {/* TESTIMONIALS LIST */}
                <div className="space-y-4 font-sans">
                  <h3 className="font-extrabold text-slate-700 text-xs uppercase tracking-wider">Active Testimonials ({testimonials.length})</h3>
                  
                  {testimonials.length === 0 ? (
                    <div className="border border-dashed border-slate-200 p-8 text-center rounded-3xl bg-slate-50/50">
                      <p className="text-slate-400 text-xs font-medium">No testimonials found. Add a client recommendation to display it on the homepage carousel!</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-4">
                      {testimonials.map((testi, index) => (
                        <div key={testi.id || index} className="border border-slate-150 p-4.5 rounded-2xl flex flex-col md:flex-row md:items-start gap-4 bg-white shadow-sm hover:border-slate-300 transition-all">
                          {/* Profile Avatar */}
                          <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-100 border border-slate-200/50 flex-shrink-0">
                            <img src={testi.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop"} alt={testi.author} className="w-full h-full object-cover" />
                          </div>

                          {/* Content Detail */}
                          <div className="flex-1 min-w-0">
                            <h4 className="font-extrabold text-slate-900 text-sm leading-tight">{testi.author}</h4>
                            <p className="text-indigo-600 font-bold text-[10px] uppercase tracking-wider mt-0.5">{testi.role}</p>
                            <p className="text-slate-600 text-xs italic leading-relaxed mt-2.5">
                              "{testi.text}"
                            </p>
                          </div>

                          {/* Action Controls */}
                          <div className="flex gap-2 shrink-0 md:self-center border-t border-slate-100 pt-3 md:pt-0 md:border-0 justify-end">
                            <button
                              onClick={() => {
                                setEditingTestimonialIndex(index);
                                setTestimonialForm({
                                  text: testi.text,
                                  author: testi.author,
                                  role: testi.role,
                                  avatar: testi.avatar
                                });
                                setIsAddingTestimonial(false);
                              }}
                              className="p-2 text-indigo-600 hover:bg-slate-100 rounded-lg border border-slate-100 transition-all cursor-pointer"
                              title="Edit Review"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteTestimonial(index)}
                              className="p-2 text-red-500 hover:bg-red-50/80 rounded-lg border border-slate-100 transition-all cursor-pointer"
                              title="Delete Review"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ====== TAB: FLOATING CHAT ICONS EDITOR ====== */}
            {activeTab === "floating-chats" && (
              <div className="space-y-6 animate-fade-in text-slate-800">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-extrabold text-slate-800">Floating Chat Shortcuts</h2>
                    <p className="text-slate-500 text-xs font-semibold mt-1">
                      Manage dynamic brand icons shown as round click-to-chat widgets (WhatsApp, Messenger, Telegram etc.) at the bottom right corner of the website.
                    </p>
                  </div>
                  {!isAddingFloatingChat && editingFloatingChatIndex === null && (
                    <button
                      onClick={() => {
                        setIsAddingFloatingChat(true);
                        setEditingFloatingChatIndex(null);
                        setFloatingChatForm({
                          platform: "WhatsApp",
                          url: "https://wa.me/8809639992999",
                          label: "Chat with Us",
                          color: "bg-green-500 hover:bg-green-450",
                          active: true,
                          svgCode: DEFAULT_WHATSAPP_SVG
                        });
                      }}
                      className="bg-indigo-600 hover:bg-indigo-555 text-white text-xs font-extrabold px-4.5 py-3 rounded-xl flex items-center gap-1.5 cursor-pointer transition-all shadow-md shadow-indigo-600/15"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Floating Chat Icon</span>
                    </button>
                  )}
                </div>

                {saveFloatingChatSuccess && (
                  <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl text-xs flex gap-2 items-center leading-relaxed font-sans shadow-sm">
                    <CheckCircle className="w-4 h-4 flex-shrink-0 text-emerald-600" />
                    <span>{saveFloatingChatSuccess}</span>
                  </div>
                )}

                {/* FLOATING CHAT FORM PANEL */}
                {(isAddingFloatingChat || editingFloatingChatIndex !== null) && (
                  <form onSubmit={handleSaveFloatingChat} className="bg-slate-50 border border-slate-200/70 p-6 md:p-8 rounded-3xl space-y-5">
                    <h3 className="font-extrabold text-slate-800 text-sm">
                      {editingFloatingChatIndex !== null ? "Edit Chat Shortcut Settings" : "Deploy New Chat Shortcut Action"}
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 font-sans">
                      <div>
                        <label className="block text-slate-500 text-[10.5px] uppercase font-extrabold tracking-wider mb-1.5 font-sans">Tooltip Label (Hover Description)</label>
                        <input
                          type="text"
                          required
                          value={floatingChatForm.label}
                          onChange={(e) => setFloatingChatForm({ ...floatingChatForm, label: e.target.value })}
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-600"
                          placeholder="e.g. Chat on WhatsApp"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-500 text-[10.5px] uppercase font-extrabold tracking-wider mb-1.5 font-sans">Widget Background Color Style</label>
                        <select
                          value={floatingChatForm.color && floatingChatForm.color.startsWith('#') ? "custom_hex" : floatingChatForm.color}
                          onChange={(e) => {
                            const val = e.target.value;
                            if (val === "custom_hex") {
                              setFloatingChatForm({ ...floatingChatForm, color: "#10b981" });
                            } else {
                              setFloatingChatForm({ ...floatingChatForm, color: val });
                            }
                          }}
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-600"
                        >
                          <option value="bg-green-500 hover:bg-green-450">WhatsApp Green (bg-green-500)</option>
                          <option value="bg-blue-600 hover:bg-blue-500">Messenger Blue (bg-blue-600)</option>
                          <option value="bg-sky-500 hover:bg-sky-400">Telegram Sky (bg-sky-500)</option>
                          <option value="bg-indigo-650 hover:bg-indigo-600">Indigo Action (bg-indigo-650)</option>
                          <option value="bg-slate-700 hover:bg-slate-650">Slate Metal (bg-slate-700)</option>
                          <option value="bg-purple-600 hover:bg-purple-500">Brilliant Purple (bg-purple-600)</option>
                          <option value="custom_hex">Custom Hex Color (কাস্টম কালার)</option>
                        </select>
                      </div>

                      {/* Custom Hex Color Picker */}
                      {floatingChatForm.color && floatingChatForm.color.startsWith('#') && (
                        <div className="animate-fade-in">
                          <label className="block text-indigo-600 text-[10.5px] uppercase font-extrabold tracking-wider mb-1.5 font-sans">
                            Pick Custom Hex Color (কাস্টম কালার)
                          </label>
                          <div className="flex gap-2">
                            <input
                              type="color"
                              value={floatingChatForm.color}
                              onChange={(e) => setFloatingChatForm({ ...floatingChatForm, color: e.target.value })}
                              className="w-12 h-10 border border-slate-200 rounded-xl p-1 cursor-pointer bg-white"
                            />
                            <input
                              type="text"
                              required
                              value={floatingChatForm.color}
                              onChange={(e) => setFloatingChatForm({ ...floatingChatForm, color: e.target.value })}
                              className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-indigo-600"
                              placeholder="e.g. #10B981"
                            />
                          </div>
                        </div>
                      )}

                      <div className="md:col-span-2">
                        <label className="block text-slate-500 text-[10.5px] uppercase font-extrabold tracking-wider mb-1.5 font-sans">Target Action Link / URL</label>
                        <input
                          type="text"
                          required
                          value={floatingChatForm.url}
                          onChange={(e) => setFloatingChatForm({ ...floatingChatForm, url: e.target.value })}
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-600"
                          placeholder="e.g. https://wa.me/8809639992999 or tel:+8809639992999"
                        />
                        <span className="text-slate-400 text-[10px] mt-1 block">
                          Include complete prefixes: <strong>https://wa.me/[PhoneWithCountry]</strong>, <strong>https://m.me/[PageUsername]</strong>, <strong>tel:[PhoneNumber]</strong>, or <strong>mailto:[EmailAddress]</strong>.
                        </span>
                      </div>

                      <div className="md:col-span-2">
                        <div className="border-2 border-dashed border-slate-200 hover:border-indigo-400 bg-white rounded-2xl p-6 text-center transition-all relative">
                          <input
                            type="file"
                            accept=".svg"
                            onChange={handleSvgUpload}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          />
                          <Upload className="w-8 h-8 text-indigo-500 mx-auto mb-2" />
                          <p className="text-slate-700 text-xs font-bold">Upload SVG Icon File (এসভিজি আইকন ফাইল আপলোড)</p>
                          <p className="text-slate-400 text-[11px] mt-1">Drag and drop or click to upload your custom `.svg` asset</p>
                        </div>
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-slate-500 text-[10.5px] uppercase font-extrabold tracking-wider mb-1.5 font-sans">
                          Raw SVG Code Mark-up (এসভিজি কোড প্রিভিউ ও এডিট)
                        </label>
                        <textarea
                          rows={4}
                          value={floatingChatForm.svgCode || ""}
                          onChange={(e) => setFloatingChatForm({ ...floatingChatForm, svgCode: e.target.value })}
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-[11px] font-mono focus:outline-none focus:ring-2 focus:ring-indigo-600"
                          placeholder='<svg viewBox="0 0 24 24" fill="currentColor">...</svg>'
                          required
                        />
                        <span className="text-slate-400 text-[10px] mt-1 block">
                          You can paste your custom SVG XML tags here directly. Ensure there are active SVG path elements inside.
                        </span>
                      </div>

                      {/* Live Preview representation */}
                      {floatingChatForm.svgCode && (
                        <div className="md:col-span-2 bg-indigo-50/50 rounded-2xl p-4 border border-indigo-100 flex items-center justify-between gap-4 font-sans">
                          <div>
                            <p className="text-indigo-950 text-xs font-bold">Live Icon View (লাইভ আইকন প্রিভিউ)</p>
                            <p className="text-slate-500 text-[10.5px] mt-1">Verify if the custom SVG renders correctly inside the round widget container.</p>
                          </div>
                          <div 
                            className={`w-12 h-12 rounded-full flex items-center justify-center text-white shrink-0 ${
                              floatingChatForm.color && !floatingChatForm.color.startsWith('#') ? floatingChatForm.color : (!floatingChatForm.color ? "bg-indigo-600" : "")
                            }`}
                            style={floatingChatForm.color && floatingChatForm.color.startsWith('#') ? { backgroundColor: floatingChatForm.color } : undefined}
                          >
                            <span 
                              className="w-6 h-6 flex items-center justify-center [&>svg]:w-6 [&>svg]:h-6 [&>svg]:block"
                              dangerouslySetInnerHTML={{ __html: floatingChatForm.svgCode }} 
                            />
                          </div>
                        </div>
                      )}

                      <div className="flex items-center gap-2 pt-4">
                        <input
                          type="checkbox"
                          id="fc-active-checkbox"
                          checked={floatingChatForm.active}
                          onChange={(e) => setFloatingChatForm({ ...floatingChatForm, active: e.target.checked })}
                          className="w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500"
                        />
                        <label htmlFor="fc-active-checkbox" className="text-slate-700 text-xs font-bold select-none cursor-pointer">
                          Activate Link & Display floating widget right away
                        </label>
                      </div>
                    </div>

                    <div className="flex justify-end gap-2.5 pt-4 border-t border-slate-200/50">
                      <button
                        type="button"
                        onClick={() => {
                          setIsAddingFloatingChat(false);
                          setEditingFloatingChatIndex(null);
                        }}
                        className="bg-slate-200 hover:bg-slate-150 text-slate-700 text-xs font-bold px-4 py-2.5 rounded-xl transition-all cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="bg-indigo-600 hover:bg-indigo-550 text-white text-xs font-extrabold px-5 py-2.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-md shadow-indigo-600/10"
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>Save Chat Shortcut</span>
                      </button>
                    </div>
                  </form>
                )}

                {/* ACTIVE FLOATING LINKS LIST */}
                <div className="space-y-4 font-sans">
                  <h3 className="font-extrabold text-slate-700 text-xs uppercase tracking-wider">Configured Chat Widgets ({floatingChats.length})</h3>

                  {floatingChats.length === 0 ? (
                    <div className="border border-dashed border-slate-200 p-8 text-center rounded-3xl bg-slate-50/50">
                      <p className="text-slate-400 text-xs font-medium">No floating chat icons found. Add a WhatsApp, Messenger, or dial shortcut to show up in the lower corner of pages!</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-4">
                      {floatingChats.map((chat, idx) => (
                        <div key={chat.id || idx} className="border border-slate-150 p-4 rounded-2xl flex items-center justify-between bg-white shadow-sm hover:border-slate-300 transition-all">
                          <div className="flex items-center gap-3.5 min-w-0">
                            {/* Round Preview Container mimicking actual floating widget layout */}
                            <div 
                              className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-extrabold shadow-sm ${
                                chat.color && !chat.color.startsWith('#') ? chat.color : ""
                              }`}
                              style={chat.color && chat.color.startsWith('#') ? { backgroundColor: chat.color } : undefined}
                            >
                              {chat.svgCode ? (
                                <span 
                                  className="w-5.5 h-5.5 flex items-center justify-center [&>svg]:w-5.5 [&>svg]:h-5.5 [&>svg]:block"
                                  dangerouslySetInnerHTML={{ __html: chat.svgCode }}
                                />
                              ) : chat.platform.toLowerCase() === "whatsapp" ? (
                                <MessageCircle className="w-5 h-5 fill-white" />
                              ) : (
                                <MessageSquare className="w-5.5 h-5.5 fill-white" />
                              )}
                            </div>

                            <div className="min-w-0">
                              <div className="flex items-center gap-2">
                                <h4 className="font-extrabold text-slate-900 text-xs leading-none">{chat.label || chat.platform}</h4>
                                <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase leading-none ${
                                  chat.active ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-500"
                                }`}>
                                  {chat.active ? "ACTIVE" : "DISABLED"}
                                </span>
                              </div>
                              <p className="text-slate-400 text-[10.5px] mt-1 hover:underline truncate max-w-sm sm:max-w-md">{chat.url}</p>
                              <p className="text-indigo-600 text-[9px] font-bold uppercase tracking-wider mt-0.5">Platform Setup: Custom SVG Widget</p>
                            </div>
                          </div>

                          <div className="flex gap-2 shrink-0">
                            <button
                              type="button"
                              onClick={() => {
                                setEditingFloatingChatIndex(idx);
                                setFloatingChatForm({
                                  platform: chat.platform || "Custom SVG",
                                  url: chat.url,
                                  label: chat.label,
                                  color: chat.color || "bg-indigo-600 hover:bg-indigo-500",
                                  active: chat.active,
                                  svgCode: chat.svgCode || ""
                                });
                                setIsAddingFloatingChat(false);
                              }}
                              className="p-2 text-indigo-600 hover:bg-slate-100 rounded-lg border border-slate-100 transition-all cursor-pointer"
                              title="Edit settings"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteFloatingChat(idx)}
                              className="p-2 text-red-500 hover:bg-red-50/80 rounded-lg border border-slate-100 transition-all cursor-pointer"
                              title="Delete shortcut"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ====== TAB: STATS EDITOR ====== */}
            {activeTab === "stats" && (
              <div className="space-y-6 animate-fade-in text-slate-800">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-extrabold text-slate-800">Statistics Counters Manager</h2>
                    <p className="text-slate-500 text-xs font-semibold mt-1">
                      Add, update or rearrange home screen progress blocks (Years of Experience, Completed Projects, Product Solutions, Districts Support, etc.)
                    </p>
                  </div>
                  {!isAddingStat && editingStatIndex === null && (
                    <button
                      onClick={() => {
                        setIsAddingStat(true);
                        setEditingStatIndex(null);
                        setStatForm({
                          value: "",
                          label: "",
                          sub: "",
                          iconName: "Award"
                        });
                      }}
                      className="bg-indigo-600 hover:bg-indigo-555 text-white text-xs font-extrabold px-4.5 py-3 rounded-xl flex items-center gap-1.5 cursor-pointer transition-all shadow-md shadow-indigo-600/15"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Stat Card</span>
                    </button>
                  )}
                </div>

                {saveStatSuccess && (
                  <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl text-xs flex gap-2 items-center leading-relaxed font-sans shadow-sm">
                    <CheckCircle className="w-4 h-4 flex-shrink-0 text-emerald-600" />
                    <span>{saveStatSuccess}</span>
                  </div>
                )}

                {/* STAT EDIT FORM CONTROLS */}
                {(isAddingStat || editingStatIndex !== null) && (
                  <form onSubmit={handleSaveStat} className="bg-slate-50 border border-slate-200/70 p-6 md:p-8 rounded-3xl space-y-5">
                    <h3 className="font-extrabold text-slate-800 text-sm">
                      {editingStatIndex !== null ? "Modify Stat Counter Info" : "Create Brand New Stat Counter block"}
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 font-sans">
                      <div>
                        <label className="block text-slate-500 text-[10.5px] uppercase font-extrabold tracking-wider mb-1.5">Metric Value / Counter State</label>
                        <input
                          type="text"
                          required
                          value={statForm.value}
                          onChange={(e) => setStatForm({ ...statForm, value: e.target.value })}
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-600"
                          placeholder="e.g. 1,000+ or 6+ or 64+"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-500 text-[10.5px] uppercase font-extrabold tracking-wider mb-1.5">Indicator Title / Label</label>
                        <input
                          type="text"
                          required
                          value={statForm.label}
                          onChange={(e) => setStatForm({ ...statForm, label: e.target.value })}
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-600"
                          placeholder="e.g. Completed Projects"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-500 text-[10.5px] uppercase font-extrabold tracking-wider mb-1.5">Secondary Details / Subtitle Description</label>
                        <input
                          type="text"
                          required
                          value={statForm.sub}
                          onChange={(e) => setStatForm({ ...statForm, sub: e.target.value })}
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-600"
                          placeholder="e.g. Nationwide Deployments"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-500 text-[10.5px] uppercase font-extrabold tracking-wider mb-1.5">Brand Representation Icon</label>
                        <select
                          value={statForm.iconName}
                          onChange={(e) => setStatForm({ ...statForm, iconName: e.target.value })}
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-600 cursor-pointer"
                        >
                          <option value="Award">Award Badge (Years of Experience)</option>
                          <option value="Briefcase">Briefcase (Completed Projects)</option>
                          <option value="Cpu">CPU Tech Chip (Product Solutions)</option>
                          <option value="Earth">Global Earth map (Districts Covered & Services)</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex justify-end gap-2.5 pt-4 border-t border-slate-200/50">
                      <button
                        type="button"
                        onClick={() => {
                          setIsAddingStat(false);
                          setEditingStatIndex(null);
                        }}
                        className="bg-slate-200 hover:bg-slate-150 text-slate-700 text-xs font-bold px-4 py-2.5 rounded-xl transition-all cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="bg-indigo-600 hover:bg-indigo-555 text-white text-xs font-extrabold px-5 py-2.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-md shadow-indigo-600/10"
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>Save Counter Card</span>
                      </button>
                    </div>
                  </form>
                )}

                {/* STATS ITEMS PREVIEW GRID */}
                <div className="space-y-4 font-sans">
                  <h3 className="font-extrabold text-slate-700 text-xs uppercase tracking-wider">Active Counter Stats ({displayStats.length})</h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {displayStats.map((stat, index) => (
                      <div key={stat.id || index} className="border border-slate-150 p-5 rounded-2xl flex items-center justify-between gap-4 bg-white shadow-sm hover:border-slate-300 transition-all select-none">
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 mb-1.5">
                            <span className="bg-slate-100 text-slate-700 text-[10px] font-mono px-2 py-0.5 rounded-md font-bold">
                              Icon: {stat.iconName}
                            </span>
                            <span className="text-slate-400 text-[10px]">Pos #{index + 1}</span>
                          </div>
                          <h4 className="text-2xl font-extrabold text-slate-900 leading-none">{stat.value}</h4>
                          <p className="text-slate-800 font-bold text-xs mt-1.5">{stat.label}</p>
                          <p className="text-slate-400 text-[10.5px] mt-0.5">{stat.sub}</p>
                        </div>

                        {/* Control buttons */}
                        <div className="flex flex-col gap-1.5 shrink-0">
                          <button
                            onClick={() => {
                              setEditingStatIndex(index);
                              setStatForm({
                                value: stat.value,
                                label: stat.label,
                                sub: stat.sub,
                                iconName: stat.iconName
                              });
                              setIsAddingStat(false);
                            }}
                            className="p-1.5 text-indigo-600 hover:bg-indigo-50 rounded-lg border border-slate-100 transition-all cursor-pointer flex items-center justify-center"
                            title="Edit Counter Stat"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteStat(index)}
                            className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg border border-slate-100 transition-all cursor-pointer flex items-center justify-center"
                            title="Delete Counter Stat"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ====== TAB: HEADER & FOOTER EDITOR ====== */}
            {activeTab === "header-footer" && (
              <div className="space-y-6 animate-fade-in text-slate-800 font-sans">
                <div>
                  <h2 className="text-xl font-extrabold text-slate-800 font-sans">Header & Footer Design Customizer</h2>
                  <p className="text-slate-500 text-xs font-semibold mt-1 font-sans">
                    Manage top bar navigation, logo texts, Webmail links, social media handles, and official copyright text on the website.
                  </p>
                </div>

                {saveHeaderFooterSuccess && (
                  <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl text-xs flex gap-2 items-center leading-relaxed font-sans shadow-sm">
                    <CheckCircle className="w-4 h-4 flex-shrink-0 text-emerald-600" />
                    <span>{saveHeaderFooterSuccess}</span>
                  </div>
                )}

                {/* WEBSITE TITLE & FAVICON SETTINGS */}
                <form onSubmit={handleSaveSiteMetadata} className="bg-slate-50 border border-slate-200/70 p-6 md:p-8 rounded-3xl space-y-5">
                  <div className="flex items-center gap-2 pb-3 border-b border-slate-200/60">
                    <Sliders className="w-4 h-4 text-indigo-600" />
                    <h3 className="font-extrabold text-slate-800 text-sm font-sans">Website Global Settings (Tab Title & Favicon)</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Website Title Column */}
                    <div className="space-y-4">
                      <div>
                        <label className="block text-slate-500 text-[10.5px] uppercase font-bold tracking-wider mb-1.5 font-sans">Website browser dynamic title</label>
                        <input
                          type="text"
                          required
                          value={siteMetadata.siteTitle}
                          onChange={(e) => setSiteMetadata({ ...siteMetadata, siteTitle: e.target.value })}
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-600"
                          placeholder="e.g. Cloud Technologies | IT Solutions Bangladesh"
                        />
                        <p className="text-slate-400 text-[10px] mt-1 font-medium font-sans">
                          This controls the text displayed on the web browser tab title bar. Keep it elegant and SEO-friendly.
                        </p>
                      </div>

                      {/* Cool Real-time Tab Preview Box */}
                      <div className="border border-slate-200 bg-white rounded-2xl p-4 shadow-sm">
                        <span className="block text-slate-400 text-[9px] uppercase font-bold tracking-wider mb-2 font-sans">Live tab bar mockup</span>
                        <div className="bg-slate-100 rounded-lg p-2 flex items-center justify-start border border-slate-200 select-none">
                          {/* Miniature Browser tab */}
                          <div className="bg-white border hover:bg-white border-b-0 border-slate-300 rounded-t-md px-3 py-1 flex items-center gap-2 max-w-sm shrink shadow-sm text-[10.5px] font-medium text-slate-700">
                            {siteMetadata.faviconUrl ? (
                              <img src={siteMetadata.faviconUrl} alt="Tab Icon preview" className="w-3.5 h-3.5 object-contain rounded-sm" referrerPolicy="no-referrer" />
                            ) : (
                              <div className="w-3.5 h-3.5 bg-slate-300 rounded-sm" />
                            )}
                            <span className="truncate max-w-[150px] font-semibold">{siteMetadata.siteTitle || "Dynamic Web Page Tab"}</span>
                            <span className="text-[9px] text-slate-400 ml-1 font-bold">×</span>
                          </div>
                          {/* Miniature Browser background line */}
                          <div className="flex-1 h-[1px] bg-slate-300" />
                        </div>
                      </div>
                    </div>

                    {/* Website Favicon Column */}
                    <div className="space-y-4">
                      <div>
                        <label className="block text-slate-500 text-[10.5px] uppercase font-bold tracking-wider mb-1.5 font-sans">Upload browser tab icon (Favicon)</label>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 bg-white p-3 border border-slate-200 rounded-xl">
                          {siteMetadata.faviconUrl ? (
                            <div className="relative shrink-0 mb-2 sm:mb-0">
                              <img src={siteMetadata.faviconUrl} alt="Favicon Preview" className="h-10 w-10 object-contain rounded border border-slate-200 p-1 bg-white" referrerPolicy="no-referrer" />
                              <button
                                type="button"
                                onClick={() => setSiteMetadata({ ...siteMetadata, faviconUrl: "" })}
                                className="absolute -top-2 -right-2 bg-red-650 hover:bg-red-500 text-white rounded-full p-0.5 shadow-sm text-[9px] cursor-pointer flex items-center justify-center w-5 h-5"
                                title="Remove Favicon"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ) : (
                            <div className="text-slate-400 text-[10px] font-medium font-sans">No custom browser favicon uploaded. Defaulting to site placeholder.</div>
                          )}
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleCompressedImageUpload(e, (val) => setSiteMetadata({ ...siteMetadata, faviconUrl: val }), 128)}
                            className="text-xs text-slate-600 font-medium font-sans cursor-pointer flex-1"
                          />
                        </div>
                        <p className="text-slate-400 text-[10px] mt-1 font-medium italic leading-normal font-sans">
                          A square dimensions logo with transparent background is recommended. Favicons are downscaled for optimum storage efficiency (Max size 15KB).
                        </p>
                      </div>

                      <div className="flex justify-end pt-5">
                        <button
                          type="submit"
                          className="bg-indigo-600 hover:bg-indigo-550 text-white text-xs font-extrabold px-6 py-2.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-md shadow-indigo-600/10"
                        >
                          <Save className="w-3.5 h-3.5" />
                          <span>Save Website Global Settings</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </form>

                {/* PAGE PRELOADER & RE-LOADING CUSTOMIZATION */}
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    withConfirmation(
                      "Save Page Preloader Settings?",
                      "Are you sure you want to update the website's loading indicator, custom logo image, loader preset style, and animation speed? This will affect website tab loading, design presets and layout transition indicators.",
                      () => {
                        dataStore.saveSiteMetadata(siteMetadata);
                        setSaveHeaderFooterSuccess("Page Preloader settings updated successfully!");
                        window.dispatchEvent(new Event("datastore-update"));
                        setTimeout(() => setSaveHeaderFooterSuccess(""), 4500);
                      }
                    );
                  }} 
                  className="bg-slate-50 border border-slate-200/70 p-6 md:p-8 rounded-3xl space-y-6"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200/60">
                    <div className="flex items-center gap-2">
                      <RefreshCw className="w-4 h-4 text-indigo-600 animate-spin [animation-duration:8s]" />
                      <h3 className="font-extrabold text-slate-800 text-sm font-sans">Page Preloader & Loading Animation Customizer</h3>
                    </div>
                    {/* Status Indicator Badge */}
                    <span className={`text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-full ${
                      siteMetadata.preloaderEnabled !== false 
                        ? "bg-emerald-100 text-emerald-800 border border-emerald-200" 
                        : "bg-slate-250 text-slate-605 border border-slate-350"
                    }`}>
                      {siteMetadata.preloaderEnabled !== false ? "● Active on Navigation" : "Disabled"}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left Column: Basic Toggles, Speeds, Brand Logo Upload */}
                    <div className="space-y-4">
                      {/* Active switch */}
                      <div className="bg-white border border-slate-200 p-4.5 rounded-2xl flex items-center justify-between shadow-sm">
                        <div className="space-y-0.5">
                          <label className="text-xs font-extrabold text-slate-800 block font-sans">Enable Page Reloading Preloader</label>
                          <p className="text-[10px] text-slate-400 font-semibold font-sans">Show a dynamic graphical preloader on initial load and route changes.</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => setSiteMetadata({ ...siteMetadata, preloaderEnabled: !siteMetadata.preloaderEnabled })}
                          className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                            siteMetadata.preloaderEnabled !== false ? "bg-indigo-600" : "bg-slate-200"
                          }`}
                        >
                          <span
                            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                              siteMetadata.preloaderEnabled !== false ? "translate-x-5" : "translate-x-0"
                            }`}
                          />
                        </button>
                      </div>

                      {/* Custom Logo Upload */}
                      <div>
                        <label className="block text-slate-500 text-[10.5px] uppercase font-bold tracking-wider mb-1.5 font-sans">Preloader Logo Image (Upload custom, or fallback to company text)</label>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 bg-white p-3 border border-slate-200 rounded-xl">
                          {siteMetadata.preloaderLogo ? (
                            <div className="relative shrink-0 mb-2 sm:mb-0">
                              <img src={siteMetadata.preloaderLogo} alt="Preloader Logo Preview" className="h-12 w-12 object-contain rounded border border-slate-200 p-1 bg-white" referrerPolicy="no-referrer" />
                              <button
                                type="button"
                                onClick={() => setSiteMetadata({ ...siteMetadata, preloaderLogo: "" })}
                                className="absolute -top-2 -right-2 bg-red-650 hover:bg-red-500 text-white rounded-full p-0.5 shadow-sm text-[9px] cursor-pointer flex items-center justify-center w-5 h-5"
                                title="Remove preloader logo"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ) : (
                            <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center font-sans font-bold text-xs text-slate-400">
                              Default
                            </div>
                          )}
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleSingleImageUpload(e, (val) => setSiteMetadata({ ...siteMetadata, preloaderLogo: val }))}
                            className="text-xs text-slate-600 font-semibold font-sans cursor-pointer flex-1"
                          />
                        </div>
                        <p className="text-slate-400 text-[10px] mt-1 font-semibold italic font-sans leading-normal">
                          Recommended format: SVG symbol or high-contrast PNG/JPEG. Image files up to 12MB are compatible (automatically optimized to fit storage).
                        </p>
                      </div>

                      {/* Load speed duration */}
                      <div className="bg-white border border-slate-200 p-4 shadow-sm rounded-2xl font-sans">
                        <div className="flex justify-between items-center text-xs font-bold text-slate-700 font-sans mb-1">
                          <span>Animation Duration / Loading Speed</span>
                          <span className="text-indigo-600 font-mono">{(siteMetadata.preloaderDuration || 1200) / 1000}s ({siteMetadata.preloaderDuration || 1200}ms)</span>
                        </div>
                        <input
                          type="range"
                          min="400"
                          max="4000"
                          step="100"
                          value={siteMetadata.preloaderDuration || 1200}
                          onChange={(e) => setSiteMetadata({ ...siteMetadata, preloaderDuration: parseInt(e.target.value) })}
                          className="w-full h-1.5 bg-slate-250 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                        />
                        <div className="flex justify-between text-[9px] text-slate-400 font-semibold tracking-wider font-sans mt-1.5">
                          <span>LIGHTNING FAST (0.4s)</span>
                          <span>BALANCED (1.5s)</span>
                          <span>MAX VISUAL (4.0s)</span>
                        </div>
                      </div>
                    </div>

                    {/* Right Column: Premium Loader Style Selectors (3/4 interactive presets) */}
                    <div className="space-y-3">
                      <label className="block text-slate-500 text-[10.5px] uppercase font-bold tracking-wider font-sans">
                        Select Loader Animation Style Preset (Demo Items)
                      </label>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {/* Preset 1: Elegant Circular Spinner */}
                        <button
                          type="button"
                          onClick={() => setSiteMetadata({ ...siteMetadata, preloaderPreset: "circle" })}
                          className={`p-4 border rounded-2xl text-left transition-all cursor-pointer ${
                            (siteMetadata.preloaderPreset || "circle") === "circle"
                              ? "bg-indigo-50/70 border-indigo-500 text-slate-800 shadow-sm"
                              : "bg-white hover:bg-slate-50 border-slate-200 text-slate-600"
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <RefreshCw className="w-4 h-4 text-indigo-600 animate-spin" />
                            <span className="text-xs font-extrabold uppercase font-sans">1. Double Circular</span>
                          </div>
                          <p className="text-[10px] text-slate-400 font-semibold leading-relaxed font-sans">
                            Double rotating rings overlaid on a glass background. Professional and high tech.
                          </p>
                        </button>

                        {/* Preset 2: Pulsing Brand Logo */}
                        <button
                          type="button"
                          onClick={() => setSiteMetadata({ ...siteMetadata, preloaderPreset: "pulse" })}
                          className={`p-4 border rounded-2xl text-left transition-all cursor-pointer ${
                            siteMetadata.preloaderPreset === "pulse"
                              ? "bg-indigo-50/70 border-indigo-500 text-slate-800 shadow-sm"
                              : "bg-white hover:bg-slate-50 border-slate-200 text-slate-600"
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <span className="w-3.5 h-3.5 rounded-full bg-indigo-500 inline-block animate-ping" />
                            <span className="text-xs font-extrabold uppercase font-sans">2. Brand Pulse Glow</span>
                          </div>
                          <p className="text-[10px] text-slate-400 font-semibold leading-relaxed font-sans">
                            Intense pulsing scale animation of your customized logo with soft backglow.
                          </p>
                        </button>

                        {/* Preset 3: Growing Elastic Bars */}
                        <button
                          type="button"
                          onClick={() => setSiteMetadata({ ...siteMetadata, preloaderPreset: "bars" })}
                          className={`p-4 border rounded-2xl text-left transition-all cursor-pointer ${
                            siteMetadata.preloaderPreset === "bars"
                              ? "bg-indigo-50/70 border-indigo-500 text-slate-800 shadow-sm"
                              : "bg-white hover:bg-slate-50 border-slate-200 text-slate-600"
                          }`}
                        >
                          <div className="flex items-end gap-1 h-4.5 mb-2">
                            <div className="w-1 bg-indigo-500 rounded h-1.5 animate-bounce [animation-delay:0.1s]" />
                            <div className="w-1 bg-indigo-500 rounded h-3 animate-bounce [animation-delay:0.2s]" />
                            <div className="w-1 bg-indigo-500 rounded h-2.5 animate-bounce [animation-delay:0.3s]" />
                            <div className="w-1 bg-indigo-500 rounded h-1.5 animate-bounce [animation-delay:0.4s]" />
                            <span className="text-xs font-extrabold uppercase font-sans ml-1 text-slate-800 leading-none">3. Elastic Decibels</span>
                          </div>
                          <p className="text-[10px] text-slate-400 font-semibold leading-relaxed font-sans">
                            Modern equalizing soundbars rhythmically expanding, paired with initials of the firm.
                          </p>
                        </button>

                        {/* Preset 4: Classic Dot Bounce */}
                        <button
                          type="button"
                          onClick={() => setSiteMetadata({ ...siteMetadata, preloaderPreset: "dots" })}
                          className={`p-4 border rounded-2xl text-left transition-all cursor-pointer ${
                            siteMetadata.preloaderPreset === "dots"
                              ? "bg-indigo-50/70 border-indigo-500 text-slate-800 shadow-sm"
                              : "bg-white hover:bg-slate-50 border-slate-200 text-slate-600"
                          }`}
                        >
                          <div className="flex items-center gap-1.5 mb-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce [animation-delay:-0.3s] block" />
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce [animation-delay:-0.15s] block" />
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce block" />
                            <span className="text-xs font-extrabold uppercase font-sans ml-1">4. Wave Dot Bounce</span>
                          </div>
                          <p className="text-[10px] text-slate-400 font-semibold leading-relaxed font-sans">
                            Three playful spheres bouncing fluidly in an endless sequence. Friendly and minimalist.
                          </p>
                        </button>
                      </div>

                      {/* Immediate Live Preview Container of selected style inside admin panel! */}
                      <div className="mt-4 p-4 border border-dashed border-indigo-200 rounded-2xl bg-indigo-50/30">
                        <span className="text-[9px] uppercase font-bold tracking-wider text-indigo-600 block mb-2 text-center font-semibold font-sans">Selected Loader Preset preview</span>
                        <div className="bg-slate-900 rounded-xl p-4 flex flex-col items-center justify-center text-white min-h-[120px] shadow-inner font-sans border border-slate-800">
                          {/* Simulated Preloader */}
                          <div className="flex flex-col items-center justify-center space-y-3">
                            {/* Logo */}
                            {siteMetadata.preloaderLogo ? (
                              <img referrerPolicy="no-referrer" src={siteMetadata.preloaderLogo} alt="Admin Preview" className={`h-10 w-10 object-contain rounded-lg ${siteMetadata.preloaderPreset === "pulse" ? "animate-pulse" : ""}`} />
                            ) : (
                              <div className={`w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-[10px] font-black select-none ${siteMetadata.preloaderPreset === "pulse" ? "animate-pulse" : ""}`}>
                                {headerConfig.logoText || "CTL"}
                              </div>
                            )}

                            {/* Center style */}
                            <div className="h-6 flex items-center justify-center">
                              {(!siteMetadata.preloaderPreset || siteMetadata.preloaderPreset === "circle") && (
                                <Loader2 className="w-5 h-5 text-indigo-400 animate-spin" />
                              )}
                              {siteMetadata.preloaderPreset === "pulse" && (
                                <span className="text-[8px] font-mono text-indigo-300 tracking-widest uppercase animate-pulse">PULSING...</span>
                              )}
                              {siteMetadata.preloaderPreset === "bars" && (
                                <div className="flex items-end gap-1 h-4">
                                  <div className="w-0.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.1s] h-3" />
                                  <div className="w-0.5 bg-indigo-500 rounded-full animate-bounce [animation-delay:0.2s] h-4" />
                                  <div className="w-0.5 bg-blue-400 rounded-full animate-bounce [animation-delay:0.3s] h-2.5" />
                                </div>
                              )}
                              {siteMetadata.preloaderPreset === "dots" && (
                                <div className="flex items-center gap-1">
                                  <div className="w-1 h-1 rounded-full bg-indigo-400 animate-bounce [animation-delay:-0.3s]" />
                                  <div className="w-1 h-1 rounded-full bg-indigo-400 animate-bounce [animation-delay:-0.15s]" />
                                  <div className="w-1 h-1 rounded-full bg-indigo-400 animate-bounce" />
                                </div>
                              )}
                            </div>
                            
                            <span className="text-[8px] text-slate-400 uppercase tracking-widest font-mono">Simulating preloader layout on black canvas</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Submit Block */}
                  <div className="flex justify-end pt-2 border-t border-slate-200/60 font-sans">
                    <button
                      type="submit"
                      className="bg-indigo-600 hover:bg-indigo-550 text-white text-xs font-extrabold px-6 py-2.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-md shadow-indigo-600/15"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Save Preloader Settings</span>
                    </button>
                  </div>
                </form>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* HEADER CONFIG SECTION */}
                  <form onSubmit={handleSaveHeaderConfig} className="bg-slate-50 border border-slate-200/70 p-6 md:p-8 rounded-3xl space-y-5">
                    <div className="flex items-center gap-2 pb-3 border-b border-slate-200/60">
                      <Sliders className="w-4 h-4 text-indigo-600" />
                      <h3 className="font-extrabold text-slate-800 text-sm font-sans">Header Identity & Controls</h3>
                    </div>

                    <div className="space-y-4">
                      {/* Logo Upload Slot for Header */}
                      <div>
                        <label className="block text-slate-500 text-[10.5px] uppercase font-bold tracking-wider mb-1.5 font-sans">Navbar Logo Image File (Upload)</label>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 bg-white p-3 border border-slate-200 rounded-xl">
                          {headerConfig.logoUrl ? (
                            <div className="relative shrink-0 mb-2 sm:mb-0">
                              <img src={headerConfig.logoUrl} alt="Header Logo Preview" className="h-10 w-auto object-contain rounded border border-slate-200" referrerPolicy="no-referrer" />
                              <button
                                type="button"
                                onClick={() => setHeaderConfig({ ...headerConfig, logoUrl: "" })}
                                className="absolute -top-2 -right-2 bg-red-650 hover:bg-red-500 text-white rounded-full p-0.5 shadow-sm text-[9px] cursor-pointer flex items-center justify-center w-5 h-5"
                                title="Remove Logo"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ) : (
                            <div className="text-slate-400 text-[10px] font-medium font-sans">No custom static header logo uploaded. Falling back to Navbar Text.</div>
                          )}
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleCompressedImageUpload(e, (val) => setHeaderConfig({ ...headerConfig, logoUrl: val }))}
                            className="text-xs text-slate-600 font-medium font-sans cursor-pointer flex-1"
                          />
                        </div>
                        <p className="text-slate-400 text-[10px] mt-1 font-medium italic leading-normal font-sans">
                          Tip: Transparent PNG layout with standard horizontal dimension works best on navigation.
                        </p>
                      </div>

                      <div>
                        <label className="block text-slate-500 text-[10.5px] uppercase font-bold tracking-wider mb-1.5 font-sans">Navbar Logo Abbreviation</label>
                        <input
                          type="text"
                          required
                          value={headerConfig.logoText}
                          onChange={(e) => setHeaderConfig({ ...headerConfig, logoText: e.target.value })}
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-600"
                          placeholder="e.g. CTL"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-500 text-[10.5px] uppercase font-bold tracking-wider mb-1.5 font-sans">Branding Primary Row (Title)</label>
                        <input
                          type="text"
                          required
                          value={headerConfig.companyNameRow1}
                          onChange={(e) => setHeaderConfig({ ...headerConfig, companyNameRow1: e.target.value })}
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-600"
                          placeholder="e.g. CLOUD TECHNOLOGIES"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-500 text-[10.5px] uppercase font-bold tracking-wider mb-1.5 font-sans">Branding Secondary Row (Subtitle)</label>
                        <input
                          type="text"
                          required
                          value={headerConfig.companyNameRow2}
                          onChange={(e) => setHeaderConfig({ ...headerConfig, companyNameRow2: e.target.value })}
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-600"
                          placeholder="e.g. LIMITED"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-500 text-[10.5px] uppercase font-bold tracking-wider mb-1.5 font-sans">Portal Webmail URL link</label>
                        <input
                          type="url"
                          required
                          value={headerConfig.webmailUrl}
                          onChange={(e) => setHeaderConfig({ ...headerConfig, webmailUrl: e.target.value })}
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-600"
                          placeholder="e.g. https://webmail.cloudtechnologies.com.bd"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end pt-3 border-t border-slate-200/40">
                      <button
                        type="submit"
                        className="bg-indigo-600 hover:bg-indigo-550 text-white text-xs font-extrabold px-5 py-2.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-md shadow-indigo-600/10"
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>Save Header Layout</span>
                      </button>
                    </div>
                  </form>

                  {/* FOOTER CONFIG SECTION */}
                  <form onSubmit={handleSaveFooterConfig} className="bg-slate-50 border border-slate-200/70 p-6 md:p-8 rounded-3xl space-y-5">
                    <div className="flex items-center gap-2 pb-3 border-b border-slate-200/60">
                      <Sliders className="w-4 h-4 text-indigo-600" />
                      <h3 className="font-extrabold text-slate-800 text-sm font-sans">Footer Content & Links</h3>
                    </div>

                    <div className="space-y-4">
                      {/* Logo Upload Slot for Footer */}
                      <div>
                        <label className="block text-slate-500 text-[10.5px] uppercase font-bold tracking-wider mb-1.5 font-sans">Footer Logo Image File (Upload)</label>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 bg-[#0d0f1a] p-3 border border-slate-800 rounded-xl">
                          {footerConfig.logoUrl ? (
                            <div className="relative shrink-0 mb-2 sm:mb-0 bg-slate-900 border border-slate-800 rounded p-1.5">
                              <img src={footerConfig.logoUrl} alt="Footer Logo Preview" className="h-10 w-auto object-contain rounded border border-slate-800" referrerPolicy="no-referrer" />
                              <button
                                type="button"
                                onClick={() => setFooterConfig({ ...footerConfig, logoUrl: "" })}
                                className="absolute -top-2 -right-2 bg-red-650 hover:bg-red-500 text-white rounded-full p-0.5 shadow-sm text-[9px] cursor-pointer flex items-center justify-center w-5 h-5"
                                title="Remove Logo"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ) : (
                            <div className="text-slate-500 text-[10px] font-medium font-sans">No custom footer logo uploaded. Falling back to default Header Text box.</div>
                          )}
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleCompressedImageUpload(e, (val) => setFooterConfig({ ...footerConfig, logoUrl: val }))}
                            className="text-xs text-slate-300 font-medium font-sans cursor-pointer flex-1"
                          />
                        </div>
                        <p className="text-slate-400 text-[10px] mt-1 font-medium italic leading-normal font-sans">
                          Note: Since the footer has a dark theme background, a bright or light-colored horizontal logo with a transparent background looks ideal first.
                        </p>
                      </div>

                      <div>
                        <label className="block text-slate-500 text-[10.5px] uppercase font-bold tracking-wider mb-1.5 font-sans">About Corporate Pitch Text</label>
                        <textarea
                          rows={3}
                          required
                          value={footerConfig.aboutText}
                          onChange={(e) => setFooterConfig({ ...footerConfig, aboutText: e.target.value })}
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-600 leading-normal font-sans"
                          placeholder="Enter short presentation narrative for bottom footer..."
                        />
                      </div>

                      <div>
                        <label className="block text-slate-500 text-[10.5px] uppercase font-bold tracking-wider mb-1.5 font-sans">Default Facebook Profile (Fallback link)</label>
                        <input
                          type="url"
                          required
                          value={footerConfig.facebookUrl}
                          onChange={(e) => setFooterConfig({ ...footerConfig, facebookUrl: e.target.value })}
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-600"
                          placeholder="e.g. https://facebook.com/company"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-500 text-[10.5px] uppercase font-bold tracking-wider mb-1.5 font-sans">Default LinkedIn Profile (Fallback link)</label>
                        <input
                          type="url"
                          required
                          value={footerConfig.linkedinUrl}
                          onChange={(e) => setFooterConfig({ ...footerConfig, linkedinUrl: e.target.value })}
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-600"
                          placeholder="e.g. https://linkedin.com/company"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-500 text-[10.5px] uppercase font-bold tracking-wider mb-1.5 font-sans">Default Official Website (Fallback link)</label>
                        <input
                          type="url"
                          required
                          value={footerConfig.websiteUrl}
                          onChange={(e) => setFooterConfig({ ...footerConfig, websiteUrl: e.target.value })}
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-600"
                          placeholder="e.g. https://www.cloudtechnologies.com.bd"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-500 text-[10.5px] uppercase font-bold tracking-wider mb-1.5 font-sans">Copyright Notice Info Text</label>
                        <input
                          type="text"
                          required
                          value={footerConfig.copyrightText}
                          onChange={(e) => setFooterConfig({ ...footerConfig, copyrightText: e.target.value })}
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-600"
                          placeholder="Copyright © 2026..."
                        />
                      </div>
                    </div>

                    <div className="flex justify-end pt-3 border-t border-slate-200/40">
                      <button
                        type="submit"
                        className="bg-indigo-600 hover:bg-indigo-550 text-white text-xs font-extrabold px-5 py-2.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-md shadow-indigo-600/10"
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>Save Footer Layout</span>
                      </button>
                    </div>
                  </form>

                  {/* FOOTER SOCIAL LINKS SECTION */}
                  <div className="bg-slate-50 border border-slate-200/70 p-6 md:p-8 rounded-3xl space-y-5 lg:col-span-2">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-200/60">
                      <div className="flex items-center gap-2">
                        <Share2 className="w-4 h-4 text-indigo-600" />
                        <h3 className="font-extrabold text-slate-800 text-sm font-sans">Footer Social Links Manager</h3>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setIsAddingSocial(true);
                          setEditingSocialId(null);
                          setSocialForm({ platform: "Facebook", url: "" });
                        }}
                        className="bg-indigo-600 hover:bg-indigo-550 text-white text-[11px] font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 cursor-pointer transition-all font-sans"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Social Link</span>
                      </button>
                    </div>

                    {/* Social Link Form Inline (when active) */}
                    {(isAddingSocial || editingSocialId !== null) && (
                      <div className="bg-white border border-slate-200 p-4 rounded-2xl space-y-4 max-w-xl animate-fade-in text-xs font-sans">
                        <h4 className="font-bold text-xs text-slate-700 uppercase tracking-wider font-sans">
                          {editingSocialId !== null ? "Edit Social Link" : "Add Social Link"}
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-slate-500 text-[10px] uppercase font-bold tracking-wider mb-1">Platform</label>
                            <select
                              value={socialForm.platform}
                              onChange={(e) => setSocialForm({ ...socialForm, platform: e.target.value })}
                              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-800 focus:outline-none font-sans"
                            >
                              <option value="Facebook">Facebook</option>
                              <option value="LinkedIn">LinkedIn</option>
                              <option value="Twitter">Twitter / X</option>
                              <option value="YouTube">YouTube</option>
                              <option value="Instagram">Instagram</option>
                              <option value="Website">Website (Globe)</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-slate-500 text-[10px] uppercase font-bold tracking-wider mb-1">Profile / Link URL</label>
                            <input
                              type="url"
                              required
                              placeholder="e.g. https://facebook.com/mycompany"
                              value={socialForm.url}
                              onChange={(e) => setSocialForm({ ...socialForm, url: e.target.value })}
                              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-800 focus:outline-none font-sans"
                            />
                          </div>
                        </div>
                        <div className="flex justify-end gap-2 text-xs">
                          <button
                            type="button"
                            onClick={() => {
                              setIsAddingSocial(false);
                              setEditingSocialId(null);
                            }}
                            className="border border-slate-200 hover:bg-slate-50 text-slate-600 px-3.5 py-1.5 rounded-lg font-bold cursor-pointer font-sans"
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              const currentSocials = footerConfig.socials || [];
                              let updated: SocialLink[] = [];
                              if (editingSocialId !== null) {
                                updated = currentSocials.map((soc) => 
                                  soc.id === editingSocialId ? { ...soc, platform: socialForm.platform, url: socialForm.url } : soc
                                );
                              } else {
                                const newSocial: SocialLink = {
                                  id: "soc-" + Date.now(),
                                  platform: socialForm.platform,
                                  url: socialForm.url
                                };
                                updated = [...currentSocials, newSocial];
                              }
                              const newFooterConfig = { ...footerConfig, socials: updated };
                              setFooterConfig(newFooterConfig);
                              dataStore.saveFooterConfig(newFooterConfig);
                              setIsAddingSocial(false);
                              setEditingSocialId(null);
                              setSaveHeaderFooterSuccess("Social links updated. Remember to save Footer Layout!");
                              setTimeout(() => setSaveHeaderFooterSuccess(""), 4500);
                            }}
                            className="bg-indigo-600 hover:bg-indigo-550 text-white px-3.5 py-1.5 rounded-lg font-bold cursor-pointer font-sans"
                          >
                            Save Link
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Socials List Table/List Representation */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                      {(footerConfig.socials || []).length === 0 ? (
                        <div className="col-span-full py-4 text-center text-slate-400 text-xs font-medium font-sans">
                          No social links configured. Add some or defaults will be used on the client.
                        </div>
                      ) : (
                        (footerConfig.socials || []).map((soc) => (
                          <div key={soc.id} className="bg-white border border-slate-200 p-3.5 rounded-2xl flex items-center justify-between shadow-sm">
                            <div className="truncate pr-2">
                              <span className="font-extrabold text-[11px] text-slate-900 block font-sans tracking-wide">{soc.platform}</span>
                              <a href={soc.url} target="_blank" rel="noopener noreferrer" className="text-[10.5px] font-medium text-indigo-605 hover:underline truncate block max-w-[180px] font-sans">
                                {soc.url}
                              </a>
                            </div>
                            <div className="flex items-center gap-1.5 shrink-0">
                              <button
                                type="button"
                                onClick={() => {
                                  setEditingSocialId(soc.id);
                                  setIsAddingSocial(false);
                                  setSocialForm({ platform: soc.platform, url: soc.url });
                                }}
                                className="p-1.5 hover:bg-slate-50 text-slate-500 hover:text-indigo-600 rounded-lg transition-colors cursor-pointer"
                                title="Edit"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  withConfirmation(
                                    "Delete Social Link?",
                                    "Are you sure you want to delete this social media handle from your footer?",
                                    () => {
                                      const updated = (footerConfig.socials || []).filter((s) => s.id !== soc.id);
                                      const newFooterConfig = { ...footerConfig, socials: updated };
                                      setFooterConfig(newFooterConfig);
                                      dataStore.saveFooterConfig(newFooterConfig);
                                      setSaveHeaderFooterSuccess("Social link removed. Save Footer Layout to finalize!");
                                      setTimeout(() => setSaveHeaderFooterSuccess(""), 4500);
                                    }
                                  );
                                }}
                                className="p-1.5 hover:bg-red-50 text-slate-400 hover:text-red-650 rounded-lg transition-colors cursor-pointer"
                                title="Delete"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  {/* FOOTER QUICK LINKS SECTION */}
                  <div className="bg-slate-50 border border-slate-200/70 p-6 md:p-8 rounded-3xl space-y-5 lg:col-span-2">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-200/60">
                      <div className="flex items-center gap-2">
                        <LinkIcon className="w-4 h-4 text-indigo-600" />
                        <h3 className="font-extrabold text-slate-800 text-sm font-sans">Footer Quick Links Manager</h3>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setIsAddingQuickLink(true);
                          setEditingQuickLinkId(null);
                          setQuickLinkForm({ labelText: "", url: "" });
                        }}
                        className="bg-indigo-600 hover:bg-indigo-550 text-white text-[11px] font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 cursor-pointer transition-all font-sans"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Quick Link</span>
                      </button>
                    </div>

                    {/* Quick Link Form Inline (when active) */}
                    {(isAddingQuickLink || editingQuickLinkId !== null) && (
                      <div className="bg-white border border-slate-200 p-4 rounded-2xl space-y-4 max-w-xl animate-fade-in text-xs font-sans">
                        <h4 className="font-bold text-xs text-slate-700 uppercase tracking-wider font-sans">
                          {editingQuickLinkId !== null ? "Edit Quick Link" : "Add Quick Link"}
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-slate-500 text-[10px] uppercase font-bold tracking-wider mb-1">Link Label (Text)</label>
                            <input
                              type="text"
                              required
                              placeholder="e.g. Contact Us, News Portal"
                              value={quickLinkForm.labelText}
                              onChange={(e) => setQuickLinkForm({ ...quickLinkForm, labelText: e.target.value })}
                              className="w-full bg-slate-55 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-800 focus:outline-none font-sans"
                            />
                          </div>
                          <div>
                            <label className="block text-slate-500 text-[10px] uppercase font-bold tracking-wider mb-1 font-sans">Target Action / URL</label>
                            <input
                              type="text"
                              required
                              placeholder="e.g. #contact (for anchor), or custom url"
                              value={quickLinkForm.url}
                              onChange={(e) => setQuickLinkForm({ ...quickLinkForm, url: e.target.value })}
                              className="w-full bg-slate-55 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-800 focus:outline-none font-sans"
                            />
                          </div>
                        </div>
                        <div className="flex justify-end gap-2 text-xs">
                          <button
                            type="button"
                            onClick={() => {
                              setIsAddingQuickLink(false);
                              setEditingQuickLinkId(null);
                            }}
                            className="border border-slate-200 hover:bg-slate-50 text-slate-600 px-3.5 py-1.5 rounded-lg font-bold cursor-pointer font-sans"
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              if (!quickLinkForm.labelText.trim()) {
                                alert("Link text is required!");
                                return;
                              }
                              const currentLinks = footerConfig.quickLinks || [];
                              let updated: QuickLink[] = [];
                              if (editingQuickLinkId !== null) {
                                updated = currentLinks.map((lin) => 
                                  lin.id === editingQuickLinkId ? { ...lin, labelText: quickLinkForm.labelText, url: quickLinkForm.url } : lin
                                );
                              } else {
                                const newLink: QuickLink = {
                                  id: "qk-" + Date.now(),
                                  labelText: quickLinkForm.labelText,
                                  url: quickLinkForm.url
                                };
                                updated = [...currentLinks, newLink];
                              }
                              const newFooterConfig = { ...footerConfig, quickLinks: updated };
                              setFooterConfig(newFooterConfig);
                              dataStore.saveFooterConfig(newFooterConfig);
                              setIsAddingQuickLink(false);
                              setEditingQuickLinkId(null);
                              setSaveHeaderFooterSuccess("Quick links updated. Remember to save Footer Layout!");
                              setTimeout(() => setSaveHeaderFooterSuccess(""), 4500);
                            }}
                            className="bg-indigo-600 hover:bg-indigo-550 text-white px-3.5 py-1.5 rounded-lg font-bold cursor-pointer font-sans"
                          >
                            Save Quick Link
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Quick links List */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                      {(footerConfig.quickLinks || []).length === 0 ? (
                        <div className="col-span-full py-4 text-center text-slate-400 text-xs font-medium font-sans">
                          No quick links configured. Add some or defaults will be used on the client.
                        </div>
                      ) : (
                        (footerConfig.quickLinks || []).map((lin) => (
                          <div key={lin.id} className="bg-white border border-slate-200 p-3.5 rounded-2xl flex items-center justify-between shadow-sm">
                            <div className="truncate pr-2">
                              <span className="font-extrabold text-[11px] text-slate-900 block font-sans tracking-wide">{lin.labelText}</span>
                              <span className="text-[10px] font-medium text-slate-500 font-mono translate-y-[-1px] truncate block max-w-[180px] font-sans">
                                {lin.url}
                              </span>
                            </div>
                            <div className="flex items-center gap-1.5 shrink-0">
                              <button
                                type="button"
                                onClick={() => {
                                  setEditingQuickLinkId(lin.id);
                                  setIsAddingQuickLink(false);
                                  setQuickLinkForm({ labelText: lin.labelText, url: lin.url });
                                }}
                                className="p-1.5 hover:bg-slate-50 text-slate-500 hover:text-indigo-600 rounded-lg transition-colors cursor-pointer"
                                title="Edit"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  withConfirmation(
                                    "Delete Quick Link?",
                                    "Are you sure you want to delete this navigation quick link from your footer links?",
                                    () => {
                                      const updated = (footerConfig.quickLinks || []).filter((l) => l.id !== lin.id);
                                      const newFooterConfig = { ...footerConfig, quickLinks: updated };
                                      setFooterConfig(newFooterConfig);
                                      dataStore.saveFooterConfig(newFooterConfig);
                                      setSaveHeaderFooterSuccess("Quick link removed. Save Footer Layout to finalize!");
                                      setTimeout(() => setSaveHeaderFooterSuccess(""), 4500);
                                    }
                                  );
                                }}
                                className="p-1.5 hover:bg-red-50 text-slate-400 hover:text-red-650 rounded-lg transition-colors cursor-pointer"
                                title="Delete"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  {/* NAVIGATION TREE MANAGER SECTION */}
                  <div className="bg-slate-50 border border-slate-200/70 p-6 md:p-8 rounded-3xl space-y-5 lg:col-span-2">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-200/60">
                      <div className="flex items-center gap-2">
                        <Sliders className="w-5 h-5 text-indigo-600" />
                        <h3 className="font-extrabold text-slate-800 text-sm font-sans">Header Navigation List Manager</h3>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setNavFormMode("add-top");
                          setNavFormParentId(null);
                          setNavFormSubParentId(null);
                          setNavFormId(null);
                          setNavForm({ name: "", href: "", hasDropdown: false, hasSubmenu: false });
                          setNavFormOpen(true);
                        }}
                        className="bg-indigo-600 hover:bg-indigo-550 text-white text-[11px] font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 cursor-pointer transition-all font-sans"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Top-Level Menu</span>
                      </button>
                    </div>

                    {/* Navigation Form Inline */}
                    {navFormOpen && (
                      <form onSubmit={handleSaveNavItem} className="bg-white border border-slate-200 p-5 rounded-2xl space-y-4 max-w-xl animate-fade-in text-xs font-sans">
                        <h4 className="font-bold text-xs text-slate-700 uppercase tracking-wider">
                          {navFormMode === "add-top" && "Add Top-Level Menu Item"}
                          {navFormMode === "edit-top" && "Edit Top-Level Menu Item"}
                          {navFormMode === "add-sub" && "Add Dropdown Sub-menu Item"}
                          {navFormMode === "edit-sub" && "Edit Dropdown Sub-menu Item"}
                          {navFormMode === "add-nested" && "Add Nested Sub-menu Item"}
                          {navFormMode === "edit-nested" && "Edit Nested Sub-menu Item"}
                        </h4>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-slate-500 text-[10px] uppercase font-bold tracking-wider mb-1">Menu Label Name *</label>
                            <input
                              type="text"
                              required
                              placeholder="e.g. Services, About Us"
                              value={navForm.name}
                              onChange={(e) => setNavForm({ ...navForm, name: e.target.value })}
                              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-slate-500 text-[10px] uppercase font-bold tracking-wider mb-1">Menu Target Link (URL / Href) *</label>
                            <input
                              type="text"
                              required
                              placeholder="e.g. #services, #about"
                              value={navForm.href}
                              onChange={(e) => setNavForm({ ...navForm, href: e.target.value })}
                              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none"
                            />
                          </div>
                        </div>

                        {/* Dropdown Options depending on level */}
                        {(navFormMode === "add-top" || navFormMode === "edit-top") && (
                          <div className="flex items-center gap-2 pt-1">
                            <input
                              type="checkbox"
                              id="hasDropdown"
                              checked={!!navForm.hasDropdown}
                              onChange={(e) => setNavForm({ ...navForm, hasDropdown: e.target.checked })}
                              className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label htmlFor="hasDropdown" className="text-slate-600 text-xs font-semibold select-none cursor-pointer">
                              Enable Dropdown items under this menu
                            </label>
                          </div>
                        )}

                        {(navFormMode === "add-sub" || navFormMode === "edit-sub") && (
                          <div className="flex items-center gap-2 pt-1">
                            <input
                              type="checkbox"
                              id="hasSubmenu"
                              checked={!!navForm.hasSubmenu}
                              onChange={(e) => setNavForm({ ...navForm, hasSubmenu: e.target.checked })}
                              className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label htmlFor="hasSubmenu" className="text-slate-600 text-xs font-semibold select-none cursor-pointer">
                              Enable Nested 3rd-level submenu under this item
                            </label>
                          </div>
                        )}

                        <div className="flex justify-end gap-2 pt-2">
                          <button
                            type="button"
                            onClick={() => {
                              setNavFormOpen(false);
                              setNavFormId(null);
                            }}
                            className="border border-slate-200 hover:bg-slate-50 text-slate-600 px-4 py-2 rounded-xl font-bold cursor-pointer font-sans"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="bg-indigo-600 hover:bg-indigo-550 text-white px-4 py-2 rounded-xl font-bold cursor-pointer font-sans shadow-md shadow-indigo-600/10"
                          >
                            Apply Changes
                          </button>
                        </div>
                      </form>
                    )}

                    {/* Hierarchy Navigation Editor Tree */}
                    <div className="space-y-4 max-w-5xl">
                      {(headerConfig.menuItems || []).length === 0 ? (
                        <div className="py-6 text-center text-slate-400 text-xs font-semibold font-sans">
                          No navigation menus specified.
                        </div>
                      ) : (
                        (headerConfig.menuItems || []).map((item) => (
                          <div key={item.id} className="border border-slate-200 rounded-2xl bg-white shadow-sm overflow-hidden animate-fade-in text-slate-800">
                            {/* Level 1: Top-Level Item header bar */}
                            <div className="bg-slate-50/50 px-5 py-4 flex items-center justify-between border-b border-slate-150">
                              <div>
                                <span className="bg-indigo-55 text-indigo-700 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full mr-2">Top Menu</span>
                                <span className="font-extrabold text-sm text-slate-900 font-sans tracking-tight">{item.name}</span>
                                <span className="text-xs text-slate-400 font-mono ml-2">({item.href})</span>
                              </div>
                              
                              <div className="flex items-center gap-2">
                                {item.hasDropdown && (
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setNavFormMode("add-sub");
                                      setNavFormParentId(item.id);
                                      setNavFormSubParentId(null);
                                      setNavFormId(null);
                                      setNavForm({ name: "", href: "", hasSubmenu: false });
                                      setNavFormOpen(true);
                                    }}
                                    className="bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-[10.5px] font-extrabold px-2.5 py-1.5 rounded-lg flex items-center gap-1 transition-all"
                                  >
                                    <Plus className="w-3 h-3" />
                                    <span>Add Sub-menu</span>
                                  </button>
                                )}
                                <button
                                  type="button"
                                  onClick={() => {
                                    setNavFormMode("edit-top");
                                    setNavFormId(item.id);
                                    setNavFormParentId(null);
                                    setNavFormSubParentId(null);
                                    setNavForm({ name: item.name, href: item.href, hasDropdown: item.hasDropdown });
                                    setNavFormOpen(true);
                                  }}
                                  className="p-1.5 hover:bg-slate-100 text-slate-500 hover:text-indigo-600 rounded-lg transition-all"
                                >
                                  <Edit2 className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleDeleteNavItem(item.id)}
                                  className="p-1.5 hover:bg-red-50 text-slate-400 hover:text-red-600 rounded-lg transition-all"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>

                            {/* Level 2: Dropdown items under top-level */}
                            {item.hasDropdown && (
                              <div className="p-4 bg-white space-y-3 pl-8 md:pl-12 border-b border-slate-100">
                                {(!item.dropdownItems || item.dropdownItems.length === 0) ? (
                                  <p className="text-slate-400 text-xs italic font-medium">No sub-items added. Click Add Sub-menu inside the top bar above.</p>
                                ) : (
                                  item.dropdownItems.map((subItem) => (
                                    <div key={subItem.id} className="border border-slate-150 rounded-xl p-3 bg-slate-50/20 shadow-xs space-y-2">
                                      <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-1">
                                          <span className="bg-amber-50 text-amber-700 text-[8px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full mr-1">Dropdown Sub</span>
                                          <span className="font-bold text-xs text-slate-800">{subItem.name}</span>
                                          <span className="text-[10px] text-slate-400 font-mono ml-2">({subItem.href})</span>
                                        </div>

                                        <div className="flex items-center gap-1.5">
                                          {subItem.hasSubmenu && (
                                            <button
                                              type="button"
                                              onClick={() => {
                                                setNavFormMode("add-nested");
                                                setNavFormParentId(item.id);
                                                setNavFormSubParentId(subItem.id);
                                                setNavFormId(null);
                                                setNavForm({ name: "", href: "" });
                                                setNavFormOpen(true);
                                              }}
                                              className="bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-[10px] font-extrabold px-1.5 py-1 rounded-md flex items-center gap-0.5 transition-all"
                                            >
                                              <Plus className="w-2.5 h-2.5" />
                                              <span>Add Nested</span>
                                            </button>
                                          )}
                                          <button
                                            type="button"
                                            onClick={() => {
                                              setNavFormMode("edit-sub");
                                              setNavFormParentId(item.id);
                                              setNavFormSubParentId(null);
                                              setNavFormId(subItem.id);
                                              setNavForm({ name: subItem.name, href: subItem.href, hasSubmenu: subItem.hasSubmenu });
                                              setNavFormOpen(true);
                                            }}
                                            className="p-1 hover:bg-slate-100 text-slate-500 rounded transition-all"
                                          >
                                            <Edit2 className="w-3 h-3" />
                                          </button>
                                          <button
                                            type="button"
                                            onClick={() => handleDeleteNavItem(item.id, subItem.id)}
                                            className="p-1 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded transition-all"
                                          >
                                            <Trash2 className="w-3 h-3" />
                                          </button>
                                        </div>
                                      </div>

                                      {/* Level 3: Nested items under Level 2 Sub-dropdown */}
                                      {subItem.hasSubmenu && (
                                        <div className="pl-6 border-l-2 border-slate-150 py-1.5 space-y-2 mt-2">
                                          {(!subItem.submenuItems || subItem.submenuItems.length === 0) ? (
                                            <p className="text-slate-400 text-[10px] italic">No nested items inside this sub-group.</p>
                                          ) : (
                                            subItem.submenuItems.map((nestedItem) => (
                                              <div key={nestedItem.id} className="flex items-center justify-between p-2 rounded-lg bg-white border border-slate-200 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
                                                <div className="flex items-center">
                                                  <span className="bg-teal-50 text-teal-700 text-[8px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-full mr-2">Nested Menu</span>
                                                  <span className="text-xs font-semibold text-slate-700">{nestedItem.name}</span>
                                                  <span className="text-[10px] text-slate-400 font-mono ml-2">({nestedItem.href})</span>
                                                </div>

                                                <div className="flex items-center gap-1.5">
                                                  <button
                                                    type="button"
                                                    onClick={() => {
                                                      setNavFormMode("edit-nested");
                                                      setNavFormParentId(item.id);
                                                      setNavFormSubParentId(subItem.id);
                                                      setNavFormId(nestedItem.id);
                                                      setNavForm({ name: nestedItem.name, href: nestedItem.href });
                                                      setNavFormOpen(true);
                                                    }}
                                                    className="p-1 hover:bg-slate-100 text-slate-500 rounded transition-all"
                                                  >
                                                    <Edit2 className="w-3 h-3" />
                                                  </button>
                                                  <button
                                                    type="button"
                                                    onClick={() => handleDeleteNavItem(item.id, subItem.id, nestedItem.id)}
                                                    className="p-1 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded transition-all"
                                                  >
                                                    <Trash2 className="w-3 h-3" />
                                                  </button>
                                                </div>
                                              </div>
                                            ))
                                          )}
                                        </div>
                                      )}
                                    </div>
                                  ))
                                )}
                              </div>
                            )}
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  {/* ACTION BUTTONS MANAGER */}
                  <div className="bg-slate-50 border border-slate-200/70 p-6 md:p-8 rounded-3xl space-y-5 lg:col-span-2">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-200/60">
                      <div className="flex items-center gap-2">
                        <ExternalLink className="w-5 h-5 text-indigo-600" />
                        <h3 className="font-extrabold text-slate-800 text-sm font-sans">Header Action Buttons Manager</h3>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setButtonFormId(null);
                          setButtonForm({ labelText: "", url: "", isOpenNewTab: true });
                          setButtonFormOpen(true);
                        }}
                        className="bg-indigo-600 hover:bg-indigo-550 text-white text-[11px] font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 cursor-pointer transition-all font-sans"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add New Button</span>
                      </button>
                    </div>

                    {/* Button Form Inline */}
                    {buttonFormOpen && (
                      <form onSubmit={handleSaveActionButton} className="bg-white border border-slate-200 p-5 rounded-2xl space-y-4 max-w-xl animate-fade-in text-xs font-sans">
                        <h4 className="font-bold text-xs text-slate-700 uppercase tracking-wider font-sans">
                          {buttonFormId !== null ? "Edit Action Button" : "Add Action Button"}
                        </h4>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-slate-500 text-[10px] uppercase font-bold tracking-wider mb-1">Button Label Text *</label>
                            <input
                              type="text"
                              required
                              placeholder="e.g. Webmail, Login"
                              value={buttonForm.labelText}
                              onChange={(e) => setButtonForm({ ...buttonForm, labelText: e.target.value })}
                              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-slate-500 text-[10px] uppercase font-bold tracking-wider mb-1">Target Action / URL Link *</label>
                            <input
                              type="text"
                              required
                              placeholder="e.g. https://..., #contact"
                              value={buttonForm.url}
                              onChange={(e) => setButtonForm({ ...buttonForm, url: e.target.value })}
                              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none"
                            />
                          </div>
                        </div>

                        <div className="flex items-center gap-2 pt-1">
                          <input
                            type="checkbox"
                            id="isOpenNewTab"
                            checked={buttonForm.isOpenNewTab}
                            onChange={(e) => setButtonForm({ ...buttonForm, isOpenNewTab: e.target.checked })}
                            className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <label htmlFor="isOpenNewTab" className="text-slate-600 text-xs font-semibold select-none cursor-pointer">
                            Open link in a new browser tab
                          </label>
                        </div>

                        <div className="flex justify-end gap-2 pt-2">
                          <button
                            type="button"
                            onClick={() => {
                              setButtonFormOpen(false);
                              setButtonFormId(null);
                            }}
                            className="border border-slate-200 hover:bg-slate-50 text-slate-600 px-4 py-2 rounded-xl font-bold cursor-pointer font-sans"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="bg-indigo-600 hover:bg-indigo-550 text-white px-4 py-2 rounded-xl font-bold cursor-pointer font-sans shadow-md shadow-indigo-600/10"
                          >
                            Save Button
                          </button>
                        </div>
                      </form>
                    )}

                    {/* Buttons List */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {(!headerConfig.buttons || headerConfig.buttons.length === 0) ? (
                        <div className="col-span-full py-4 text-center text-slate-400 text-xs font-semibold font-sans">
                          No corporate action buttons configured.
                        </div>
                      ) : (
                        headerConfig.buttons.map((btn) => (
                          <div key={btn.id} className="bg-white border border-slate-200 p-4 rounded-2xl flex items-center justify-between shadow-sm text-slate-800">
                            <div>
                              <span className="font-extrabold text-xs text-slate-900 block font-sans tracking-wide">{btn.labelText}</span>
                              <span className="text-[10px] font-semibold text-slate-400 font-mono truncate block max-w-[170px] mt-0.5">
                                {btn.url}
                              </span>
                              {btn.isOpenNewTab && (
                                <span className="bg-indigo-50 text-indigo-700 text-[8px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-md mt-1.5 inline-block">New Tab</span>
                              )}
                            </div>
                            <div className="flex items-center gap-1 shrink-0">
                              <button
                                type="button"
                                onClick={() => {
                                  setButtonFormId(btn.id);
                                  setButtonForm({ labelText: btn.labelText, url: btn.url, isOpenNewTab: btn.isOpenNewTab || false });
                                  setButtonFormOpen(true);
                                }}
                                className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteActionButton(btn.id)}
                                className="p-1.5 text-slate-400 hover:text-red-650 hover:bg-red-55/40 rounded-lg transition-colors cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "admin-settings" && (
              <div className="space-y-6 animate-fade-in font-sans">
                <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                  <div>
                    <h2 className="text-slate-800 text-lg font-black uppercase tracking-wide">Admin Portal Settings & Credentials</h2>
                    <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Configure company metadata and credentials for portal login</p>
                  </div>
                </div>

                {adminCredentialsSuccess && (
                  <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 p-4 rounded-2xl text-xs flex gap-3 items-center leading-relaxed">
                    <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <div>
                      <p className="font-bold">{adminCredentialsSuccess}</p>
                    </div>
                  </div>
                )}

                <form onSubmit={(e) => {
                  e.preventDefault();
                  dataStore.saveAdminAuthConfig(adminAuthConfig);
                  setAdminCredentialsSuccess("Administrator settings and login credentials have been saved successfully!");
                  setTimeout(() => setAdminCredentialsSuccess(""), 4500);
                }} className="space-y-6">

                  {/* Section 1: Authentication settings */}
                  <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl space-y-4">
                    <h3 className="text-slate-800 text-xs font-extrabold uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-100 pb-2">
                      <Lock className="w-3.5 h-3.5 text-indigo-600" />
                      <span>Admin Login Credentials</span>
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-slate-500 text-[10.5px] uppercase font-bold tracking-wider mb-1.5 font-sans">New Admin Username *</label>
                        <input
                          type="text"
                          value={adminAuthConfig.adminUsername || ""}
                          onChange={(e) => setAdminAuthConfig({ ...adminAuthConfig, adminUsername: e.target.value })}
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-medium"
                          required
                          placeholder="admin"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-500 text-[10.5px] uppercase font-bold tracking-wider mb-1.5 font-sans">New Admin Password *</label>
                        <input
                          type="password"
                          value={adminAuthConfig.adminPassword || ""}
                          onChange={(e) => setAdminAuthConfig({ ...adminAuthConfig, adminPassword: e.target.value })}
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-medium"
                          required
                          placeholder="e.g. admin"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Section 2: Logo and layout information */}
                  <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl space-y-4">
                    <h3 className="text-slate-800 text-xs font-extrabold uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-100 pb-2">
                       <Shield className="w-3.5 h-3.5 text-indigo-600" />
                       <span>Login Form Branding</span>
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-slate-500 text-[10.5px] uppercase font-bold tracking-wider mb-1.5 font-sans font-sans">Login Page Company Name Title *</label>
                        <input
                          type="text"
                          value={adminAuthConfig.loginCompanyName || ""}
                          onChange={(e) => setAdminAuthConfig({ ...adminAuthConfig, loginCompanyName: e.target.value })}
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-medium"
                          required
                          placeholder="e.g. RS TECHNOLOGIES"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-500 text-[10.5px] uppercase font-bold tracking-wider mb-1.5 font-sans font-sans font-sans">Login Page Sub-label Title *</label>
                        <input
                          type="text"
                          value={adminAuthConfig.loginSubLabel || ""}
                          onChange={(e) => setAdminAuthConfig({ ...adminAuthConfig, loginSubLabel: e.target.value })}
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-medium"
                          required
                          placeholder="e.g. Management Portal"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      type="submit"
                      className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2.5 px-6 rounded-xl transition-all shadow-md active:scale-98 cursor-pointer text-xs flex items-center gap-1.5 font-sans"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Save and Update Settings</span>
                    </button>
                  </div>
                </form>
              </div>
            )}

            {activeTab === "email-settings" && (
              <div className="space-y-6 animate-fade-in font-sans">
                <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                  <div>
                    <h2 className="text-slate-800 text-lg font-black uppercase tracking-wide">Webmail & Email Integration Control</h2>
                    <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider font-sans leading-relaxed">
                      Configure your cPanel Webmail access and download generated PHP contact form mailer scripts
                    </p>
                  </div>
                  
                  {emailConfig.webmailUrl && (
                    <a
                      href={emailConfig.webmailUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-indigo-50 border border-indigo-200 text-indigo-700 hover:bg-indigo-100 text-[11px] font-extrabold uppercase px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 shadow-sm"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Launch Webmail</span>
                    </a>
                  )}
                </div>

                {saveEmailSuccess && (
                  <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 p-4 rounded-2xl text-xs flex gap-3 items-center leading-relaxed font-semibold animate-fade-in">
                    <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <div>
                      <p>{saveEmailSuccess}</p>
                    </div>
                  </div>
                )}

                {/* Grid layout for configuration forms */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                  
                  {/* Left Column (Forms): Col span 7 */}
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    dataStore.saveEmailIntegrationConfig(emailConfig);
                    setSaveEmailSuccess("Email & integration configurations saved securely!");
                    setTimeout(() => setSaveEmailSuccess(""), 4500);
                  }} className="lg:col-span-12 xl:col-span-7 space-y-6">

                    {/* Section 1: Webmail Links */}
                    <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl space-y-4">
                      <h3 className="text-slate-800 text-xs font-extrabold uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-100 pb-2 bg-transparent select-none font-sans">
                        <Server className="w-4 h-4 text-indigo-600" />
                        <span>cPanel Webmail Link</span>
                      </h3>
                      <div>
                        <label className="block text-slate-500 text-[10px] uppercase font-bold tracking-wider mb-1.5 font-sans">Enterprise Webmail URL *</label>
                        <input
                          type="url"
                          value={emailConfig.webmailUrl || ""}
                          onChange={(e) => setEmailConfig({ ...emailConfig, webmailUrl: e.target.value })}
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
                          required
                          placeholder="e.g. https://webmail.cloudtechnologies.com.bd"
                        />
                        <p className="text-[10px] text-slate-400 mt-1.5 font-sans leading-relaxed">
                          Your standard cPanel webmail login page. Users can also access this usually by browsing to <strong>yourdomain.com/webmail</strong> or port <strong>2096</strong>.
                        </p>
                      </div>
                    </div>

                    {/* Section 2: Contact Form Mailer Setup */}
                    <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl space-y-4 font-sans">
                      <h3 className="text-slate-800 text-xs font-extrabold uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-100 pb-2 bg-transparent select-none font-sans font-sans">
                        <Mail className="w-4 h-4 text-indigo-600" />
                        <span>Form Submission Email Setup</span>
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-slate-500 text-[10px] uppercase font-bold tracking-wider mb-1.5 font-sans">Receiver Address (Inbox) *</label>
                          <input
                            type="email"
                            value={emailConfig.receiverEmail || ""}
                            onChange={(e) => setEmailConfig({ ...emailConfig, receiverEmail: e.target.value })}
                            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
                            required
                            placeholder="inbox@domain.com"
                          />
                        </div>
                        <div>
                          <label className="block text-slate-500 text-[10px] uppercase font-bold tracking-wider mb-1.5 font-sans">Sender Envelope Address (From) *</label>
                          <input
                            type="email"
                            value={emailConfig.senderEmail || ""}
                            onChange={(e) => setEmailConfig({ ...emailConfig, senderEmail: e.target.value })}
                            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
                            required
                            placeholder="noreply@domain.com"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-slate-500 text-[10px] uppercase font-bold tracking-wider mb-1.5 font-sans font-sans">Sender Display Name *</label>
                          <input
                            type="text"
                            value={emailConfig.senderName || ""}
                            onChange={(e) => setEmailConfig({ ...emailConfig, senderName: e.target.value })}
                            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
                            required
                            placeholder="e.g. Cloud Technologies CRM Portal"
                          />
                        </div>
                        <div>
                          <label className="block text-slate-500 text-[10px] uppercase font-bold tracking-wider mb-1.5 font-sans font-sans font-sans">Subject Prefix *</label>
                          <input
                            type="text"
                            value={emailConfig.subjectPrefix || ""}
                            onChange={(e) => setEmailConfig({ ...emailConfig, subjectPrefix: e.target.value })}
                            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
                            required
                            placeholder="e.g. [CTL Website Inquiry] "
                          />
                        </div>
                      </div>
                    </div>

                    {/* Section 3: Mailer Method */}
                    <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl space-y-4 font-sans font-sans">
                      <h3 className="text-slate-800 text-xs font-extrabold uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-100 pb-2 bg-transparent select-none">
                        <Sliders className="w-4 h-4 text-indigo-600" />
                        <span>Mailer Delivery Protocol</span>
                      </h3>

                      <div className="space-y-3 font-sans">
                        <label className="block text-slate-500 text-[10px] uppercase font-bold tracking-wider mb-1.5 font-sans">Selected Method</label>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <button
                            type="button"
                            onClick={() => setEmailConfig({ ...emailConfig, activeMethod: "php_mail" })}
                            className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                              emailConfig.activeMethod === "php_mail"
                                ? "bg-indigo-50/50 border-indigo-500 shadow-sm"
                                : "bg-white border-slate-200 opacity-60 hover:opacity-100"
                            }`}
                          >
                            <span className="block font-black text-[11px] uppercase tracking-wide text-slate-800">1. Standard PHP mail()</span>
                            <span className="block text-[10px] text-slate-500 mt-1 leading-normal">Uses standard sendmail daemon. Fully compatible with typical cPanel servers.</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => setEmailConfig({ ...emailConfig, activeMethod: "php_mailer_smtp" })}
                            className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                              emailConfig.activeMethod === "php_mailer_smtp"
                                ? "bg-indigo-50/50 border-indigo-500 shadow-sm"
                                : "bg-white border-slate-200 opacity-60 hover:opacity-100"
                            }`}
                          >
                            <span className="block font-black text-[11px] uppercase tracking-wide text-slate-800">2. Custom SMTP Code</span>
                            <span className="block text-[10px] text-slate-500 mt-1 leading-normal">Configures SMTP mail relays. Ideal for premium inbox deliverability.</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => setEmailConfig({ ...emailConfig, activeMethod: "local_storage_only" })}
                            className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                              emailConfig.activeMethod === "local_storage_only"
                                ? "bg-indigo-50/50 border-indigo-500 shadow-sm"
                                : "bg-white border-slate-200 opacity-60 hover:opacity-100"
                            }`}
                          >
                            <span className="block font-black text-[11px] uppercase tracking-wide text-slate-800">3. CRM Logs Only</span>
                            <span className="block text-[10px] text-slate-500 mt-1 leading-normal">Inquiries are stored only in the browser local storage dashboard logs.</span>
                          </button>
                        </div>
                      </div>

                      {emailConfig.activeMethod === "php_mailer_smtp" && (
                        <div className="bg-white border border-indigo-50 p-4 rounded-xl space-y-4 text-xs font-sans animate-fade-in font-sans font-sans">
                          <label className="block text-slate-600 font-extrabold uppercase tracking-wide text-[10px]">SMTP Settings (For PHP script reference below)</label>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-slate-400 text-[9.5px] mt-1 font-semibold uppercase tracking-wider mb-1">SMTP Secret Hostname</label>
                              <input
                                type="text"
                                value={emailConfig.smtpHost || ""}
                                onChange={(e) => setEmailConfig({ ...emailConfig, smtpHost: e.target.value })}
                                className="w-full bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl text-xs text-slate-800 focus:outline-none"
                                placeholder="mail.yourdomain.com"
                              />
                            </div>
                            <div>
                              <label className="block text-slate-400 text-[9.5px] mt-1 font-semibold uppercase tracking-wider mb-1">SMTP Server Port</label>
                              <input
                                type="number"
                                value={emailConfig.smtpPort || 465}
                                onChange={(e) => setEmailConfig({ ...emailConfig, smtpPort: parseInt(e.target.value) || 465 })}
                                className="w-full bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl text-xs text-slate-800 focus:outline-none"
                                placeholder="465"
                              />
                            </div>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <div>
                              <label className="block text-slate-400 text-[9.5px] mt-1 font-semibold uppercase tracking-wider mb-1">SMTP Username *</label>
                              <input
                                type="text"
                                value={emailConfig.smtpUser || ""}
                                onChange={(e) => setEmailConfig({ ...emailConfig, smtpUser: e.target.value })}
                                className="w-full bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl text-xs text-slate-800 focus:outline-none"
                                placeholder="info@yourdomain.com"
                              />
                            </div>
                            <div>
                              <label className="block text-slate-400 text-[9.5px] mt-1 font-semibold uppercase tracking-wider mb-1">SMTP Password *</label>
                              <input
                                type="password"
                                value={emailConfig.smtpPass || ""}
                                onChange={(e) => setEmailConfig({ ...emailConfig, smtpPass: e.target.value })}
                                className="w-full bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl text-xs text-slate-800 focus:outline-none"
                                placeholder="••••••••••••"
                              />
                            </div>
                            <div>
                              <label className="block text-slate-400 text-[9.5px] mt-1 font-semibold uppercase tracking-wider mb-1">SMTP Encryption</label>
                              <select
                                value={emailConfig.smtpSecure}
                                onChange={(e) => setEmailConfig({ ...emailConfig, smtpSecure: e.target.value as any })}
                                className="w-full bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl text-xs text-slate-800 focus:outline-none font-sans"
                              >
                                <option value="ssl">SSL Secured (Port 465)</option>
                                <option value="tls">TLS Secured (Port 587)</option>
                                <option value="none">No Encryption (Plain - Port 25)</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex justify-end pt-2">
                      <button
                        type="submit"
                        className="bg-indigo-600 hover:bg-indigo-505 text-white font-bold py-2.5 px-6 rounded-xl transition-all shadow-md active:scale-98 cursor-pointer text-xs flex items-center gap-1.5 font-sans"
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>Save and Persist Options</span>
                      </button>
                    </div>
                  </form>

                  {/* Right Column (Code live preview & downloads): Col span 5 */}
                  <div className="lg:col-span-12 xl:col-span-5 space-y-6 flex flex-col justify-between">
                    
                    {/* Live PHP File Generation Status info */}
                    <div className="bg-[#0f0e26] border border-slate-800 text-slate-300 p-6 rounded-2xl flex flex-col justify-between h-full space-y-4">
                      
                      <div className="space-y-2 font-sans font-sans">
                        <div className="flex items-center gap-2">
                          <Code className="w-5 h-5 text-indigo-400" />
                          <h4 className="text-white font-extrabold text-xs uppercase tracking-wider font-sans">Dynamic PHP Mailer Code</h4>
                        </div>
                        <p className="text-[10px] text-slate-400 font-sans leading-relaxed">
                          This code updates dynamically based on the inputs in the left column. Download or host this directly on your cPanel next to your production HTML static build!
                        </p>
                      </div>

                      {/* Code preview box */}
                      <div className="bg-[#0b0a1a] rounded-xl border border-slate-900 overflow-hidden font-mono text-[9px] leading-relaxed p-4 h-64 overflow-y-auto relative w-full select-all">
                        <pre className="text-emerald-400">
                          {`<?php
/**
 * Elegant cPanel-Compatible Mailer Script
 * Generated dynamically for Cloud Technologies
 */

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

if (\$_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

\$inputJSON = file_get_contents('php://input');
\$input = json_decode(\$inputJSON, true);

\$config = [
    "receiverEmail" => "${emailConfig.receiverEmail || "info@cloudtechnologies.com.bd"}",
    "senderEmail" => "${emailConfig.senderEmail || "noreply@cloudtechnologies.com.bd"}",
    "senderName" => "${emailConfig.senderName || "Cloud Technologies Inquiry"}",
    "subjectPrefix" => "${emailConfig.subjectPrefix || "[CTL Website Inquiry] "}",
    "useSmtp" => ${emailConfig.activeMethod === "php_mailer_smtp" ? 'true' : 'false'},
    "smtpHost" => "${emailConfig.smtpHost || "mail.cloudtechnologies.com.bd"}",
    "smtpPort" => ${emailConfig.smtpPort || 465},
    "smtpUser" => "${emailConfig.smtpUser || ""}",
    "smtpPass" => "${emailConfig.smtpPass || ""}",
    "smtpSecure" => "${emailConfig.smtpSecure || "ssl"}"
];

function send_mail_routing(\$config, \$subject, \$htmlMessage, \$fullName, \$corporateEmail) {
    if (!\$config['useSmtp']) {
        \$headers = "MIME-Version: 1.0\\r\\n";
        \$headers .= "Content-type:text/html;charset=UTF-8\\r\\n";
        \$headers .= "From: " . \$config['senderName'] . " <" . \$config['senderEmail'] . ">\\r\\n";
        \$headers .= "Reply-To: " . \$fullName . " <" . \$corporateEmail . ">\\r\\n";
        return mail(\$config['receiverEmail'], \$subject, \$htmlMessage, \$headers);
    }
    
    try {
        \$host = \$config['smtpHost'];
        if (\$config['smtpSecure'] === 'ssl') { \$host = 'ssl://' . \$host; }
        \$socket = @fsockopen(\$host, intval(\$config['smtpPort']), \$errno, \$errstr, 15);
        if (!\$socket) { return false; }
        
        \$read = fgets(\$socket, 515);
        fwrite(\$socket, "EHLO " . \$_SERVER['SERVER_NAME'] . "\\r\\n");
        \$read = fgets(\$socket, 515);
        
        if (\$config['smtpSecure'] === 'tls') {
            fwrite(\$socket, "STARTTLS\\r\\n");
            \$read = fgets(\$socket, 515);
            if (!stream_socket_enable_crypto(\$socket, true, STREAM_CRYPTO_METHOD_TLS_CLIENT)) { return false; }
            fwrite(\$socket, "EHLO " . \$_SERVER['SERVER_NAME'] . "\\r\\n");
            \$read = fgets(\$socket, 515);
        }
        
        if (!empty(\$config['smtpUser']) && !empty(\$config['smtpPass'])) {
            fwrite(\$socket, "AUTH LOGIN\\r\\n");
            \$read = fgets(\$socket, 515);
            fwrite(\$socket, base64_encode(\$config['smtpUser']) . "\\r\\n");
            \$read = fgets(\$socket, 515);
            fwrite(\$socket, base64_encode(\$config['smtpPass']) . "\\r\\n");
            \$read = fgets(\$socket, 515);
        }
        
        fwrite(\$socket, "MAIL FROM: <" . \$config['smtpUser'] . ">\\r\\n");
        \$read = fgets(\$socket, 515);
        fwrite(\$socket, "RCPT TO: <" . \$config['receiverEmail'] . ">\\r\\n");
        \$read = fgets(\$socket, 515);
        fwrite(\$socket, "DATA\\r\\n");
        \$read = fgets(\$socket, 515);
        
        \$headers = "MIME-Version: 1.0\\r\\n";
        \$headers .= "Content-Type: text/html; charset=UTF-8\\r\\n";
        \$headers .= "To: <" . \$config['receiverEmail'] . ">\\r\\n";
        \$headers .= "From: \\"" . \$config['senderName'] . "\\" <" . \$config['smtpUser'] . ">\\r\\n";
        \$headers .= "Reply-To: \\"" . \$fullName . "\\" <" . \$corporateEmail . ">\\r\\n";
        \$headers .= "Subject: =?utf-8?B?" . base64_encode(\$subject) . "?=\\r\\n\\r\\n";
        
        fwrite(\$socket, \$headers . \$htmlMessage . "\\r\\n.\\r\\n");
        \$read = fgets(\$socket, 515);
        fwrite(\$socket, "QUIT\\r\\n");
        fclose(\$socket);
        return true;
    } catch (Exception \$e) {
        return false;
    }
}
`}
                        </pre>
                      </div>

                      {/* Download Actions */}
                      <div className="grid grid-cols-2 gap-3 pt-2 font-sans font-sans font-sans">
                        <button
                          type="button"
                          onClick={() => {
                            const code = `<?php
/**
 * Elegant cPanel-Compatible Mailer Script
 * Generated dynamically for Cloud Technologies
 * 
 * Host this script as 'mailer.php' in public_html/ alongside index.html.
 */

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

if (\$_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

\$inputJSON = file_get_contents('php://input');
\$input = json_decode(\$inputJSON, true);

if (!\$input) {
    echo json_encode(["status" => "error", "message" => "No JSON input payload detected."]);
    exit;
}

\$config = [
    "receiverEmail" => "${emailConfig.receiverEmail || "info@cloudtechnologies.com.bd"}",
    "senderEmail" => "${emailConfig.senderEmail || "noreply@cloudtechnologies.com.bd"}",
    "senderName" => "${emailConfig.senderName || "Cloud Technologies CRM Portal"}",
    "subjectPrefix" => "${emailConfig.subjectPrefix || "[CTL Website Inquiry] "}",
    "useSmtp" => ${emailConfig.activeMethod === "php_mailer_smtp" ? 'true' : 'false'},
    "smtpHost" => "${emailConfig.smtpHost || "mail.cloudtechnologies.com.bd"}",
    "smtpPort" => ${emailConfig.smtpPort || 465},
    "smtpUser" => "${emailConfig.smtpUser || ""}",
    "smtpPass" => "${emailConfig.smtpPass || ""}",
    "smtpSecure" => "${emailConfig.smtpSecure || "ssl"}"
];

function send_mail_routing(\$config, \$subject, \$htmlMessage, \$fullName, \$corporateEmail) {
    if (!\$config['useSmtp']) {
        \$headers = "MIME-Version: 1.0\\r\\n";
        \$headers .= "Content-type:text/html;charset=UTF-8\\r\\n";
        \$headers .= "From: " . \$config['senderName'] . " <" . \$config['senderEmail'] . ">\\r\\n";
        \$headers .= "Reply-To: " . \$fullName . " <" . \$corporateEmail . ">\\r\\n";
        \$headers .= "X-Mailer: PHP/" . phpversion() . "\\r\\n";
        return mail(\$config['receiverEmail'], \$subject, \$htmlMessage, \$headers);
    }
    
    try {
        \$host = \$config['smtpHost'];
        if (\$config['smtpSecure'] === 'ssl') { \$host = 'ssl://' . \$host; }
        \$socket = @fsockopen(\$host, intval(\$config['smtpPort']), \$errno, \$errstr, 15);
        if (!\$socket) { return false; }
        
        \$read = fgets(\$socket, 515);
        fwrite(\$socket, "EHLO " . \$_SERVER['SERVER_NAME'] . "\\r\\n");
        \$read = fgets(\$socket, 515);
        
        if (\$config['smtpSecure'] === 'tls') {
            fwrite(\$socket, "STARTTLS\\r\\n");
            \$read = fgets(\$socket, 515);
            if (!stream_socket_enable_crypto(\$socket, true, STREAM_CRYPTO_METHOD_TLS_CLIENT)) { return false; }
            fwrite(\$socket, "EHLO " . \$_SERVER['SERVER_NAME'] . "\\r\\n");
            \$read = fgets(\$socket, 515);
        }
        
        if (!empty(\$config['smtpUser']) && !empty(\$config['smtpPass'])) {
            fwrite(\$socket, "AUTH LOGIN\\r\\n");
            \$read = fgets(\$socket, 515);
            fwrite(\$socket, base64_encode(\$config['smtpUser']) . "\\r\\n");
            \$read = fgets(\$socket, 515);
            fwrite(\$socket, base64_encode(\$config['smtpPass']) . "\\r\\n");
            \$read = fgets(\$socket, 515);
        }
        
        fwrite(\$socket, "MAIL FROM: <" . \$config['smtpUser'] . ">\\r\\n");
        \$read = fgets(\$socket, 515);
        fwrite(\$socket, "RCPT TO: <" . \$config['receiverEmail'] . ">\\r\\n");
        \$read = fgets(\$socket, 515);
        fwrite(\$socket, "DATA\\r\\n");
        \$read = fgets(\$socket, 515);
        
        \$headers = "MIME-Version: 1.0\\r\\n";
        \$headers .= "Content-Type: text/html; charset=UTF-8\\r\\n";
        \$headers .= "To: <" . \$config['receiverEmail'] . ">\\r\\n";
        \$headers .= "From: \\"" . \$config['senderName'] . "\\" <" . \$config['smtpUser'] . ">\\r\\n";
        \$headers .= "Reply-To: \\"" . \$fullName . "\\" <" . \$corporateEmail . ">\\r\\n";
        \$headers .= "Subject: =?utf-8?B?" . base64_encode(\$subject) . "?=\\r\\n\\r\\n";
        
        fwrite(\$socket, \$headers . \$htmlMessage . "\\r\\n.\\r\\n");
        \$read = fgets(\$socket, 515);
        fwrite(\$socket, "QUIT\\r\\n");
        fclose(\$socket);
        return true;
    } catch (Exception \$e) {
        return false;
    }
}

\$fullName = isset(\$input['fullName']) ? strip_tags(trim(\$input['fullName'])) : '';
\$corporateEmail = isset(\$input['corporateEmail']) ? filter_var(trim(\$input['corporateEmail']), FILTER_VALIDATE_EMAIL) : '';
\$mobilePhone = isset(\$input['mobilePhone']) ? strip_tags(trim(\$input['mobilePhone'])) : '';
\$companyName = isset(\$input['companyName']) ? strip_tags(trim(\$input['companyName'])) : 'Not Provided';
\$requirementDetails = isset(\$input['requirementDetails']) ? strip_tags(trim(\$input['requirementDetails'])) : '';

if (empty(\$fullName)) { \$fullName = isset(\$input['name']) ? strip_tags(trim(\$input['name'])) : ''; }
if (empty(\$corporateEmail)) { \$corporateEmail = isset(\$input['email']) ? filter_var(trim(\$input['email']), FILTER_VALIDATE_EMAIL) : ''; }
if (empty(\$mobilePhone)) { \$mobilePhone = isset(\$input['phone']) ? strip_tags(trim(\$input['phone'])) : ''; }
if (empty(\$requirementDetails)) { \$requirementDetails = isset(\$input['message']) ? strip_tags(trim(\$input['message'])) : ''; }

if (empty(\$fullName) || empty(\$corporateEmail)) {
    echo json_encode(["status" => "error", "message" => "Invalid inputs. Required Name & Email values."]);
    exit;
}

\$subject = \$config['subjectPrefix'] . " New Message from " . \$fullName;

\$htmlMessage = "
<html>
<head>
  <title>{\$subject}</title>
</head>
<body style='font-family: sans-serif; background: #f6f9fc; padding: 20px; color: #333;'>
  <div style='max-width: 600px; margin: 0 auto; background: #fff; padding: 30px; border-radius: 12px; border: 1.5px solid #eee;'>
    <h3 style='border-bottom: 2px solid #6366f1; padding-bottom: 10px; color: #0f0e26;'>CLOUD TECHNOLOGIES LTD</h3>
    <p><b>From Name:</b> {\$fullName}</p>
    <p><b>Corporate Email:</b> {\$corporateEmail}</p>
    <p><b>Mobile Phone:</b> {\$mobilePhone}</p>
    <p><b>Company Name:</b> {\$companyName}</p>
    <div style='background: #f8fafc; border-left: 4px solid #6366f1; padding: 15px; border-radius: 6px; margin-top: 20px;'>
      <p style='margin: 0;'><b>Inquiry Messages:</b></p>
      <p style='margin: 10px 0 0;'> " . nl2br(htmlspecialchars(\$requirementDetails)) . "</p>
    </div>
  </div>
</body>
</html>
";

if (send_mail_routing(\$config, \$subject, \$htmlMessage, \$fullName, \$corporateEmail)) {
    echo json_encode(["status" => "success", "message" => "Delivered safely!"]);
} else {
    echo json_encode(["status" => "error", "message" => "cPanel mailer transmission failure."]);
}
?>`;

                            const blob = new Blob([code], { type: "text/plain" });
                            const url = URL.createObjectURL(blob);
                            const link = document.createElement("a");
                            link.href = url;
                            link.download = "mailer.php";
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);
                            URL.revokeObjectURL(url);
                          }}
                          className="bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-[10px] uppercase tracking-wider py-2.5 rounded-xl cursor-pointer transition-all text-center border border-indigo-700 shadow-sm flex items-center justify-center gap-1.5 font-sans"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Get mailer.php</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            const configJson = JSON.stringify({
                              receiverEmail: emailConfig.receiverEmail,
                              senderEmail: emailConfig.senderEmail,
                              senderName: emailConfig.senderName,
                              subjectPrefix: emailConfig.subjectPrefix,
                              webmailUrl: emailConfig.webmailUrl,
                              useSmtp: emailConfig.activeMethod === "php_mailer_smtp",
                              smtpHost: emailConfig.smtpHost,
                              smtpPort: emailConfig.smtpPort,
                              smtpUser: emailConfig.smtpUser,
                              smtpPass: emailConfig.smtpPass,
                              smtpSecure: emailConfig.smtpSecure
                            }, null, 2);

                            const blob = new Blob([configJson], { type: "application/json" });
                            const url = URL.createObjectURL(blob);
                            const link = document.createElement("a");
                            link.href = url;
                            link.download = "mailer_config.json";
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);
                            URL.revokeObjectURL(url);
                          }}
                          className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-extrabold text-[10px] uppercase tracking-wider py-2.5 rounded-xl cursor-pointer transition-all text-center border border-slate-700 shadow-sm flex items-center justify-center gap-1.5 font-sans"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Get config.json</span>
                        </button>
                      </div>

                    </div>

                  </div>
                </div>
              </div>
            )}


                     {/* ====== TAB 20: BACKUP & RESTORE SITE DATA CONTENT ====== */}
            {false && (
              <div className="space-y-8 animate-fade-in text-[12px] font-sans">
                {/* Header info */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-left">
                  <div className="text-left font-sans">
                    <h2 className="text-xl font-extrabold text-slate-800 flex items-center gap-2">
                      <Database className="w-5 h-5 text-indigo-650" />
                      <span>Backup & Restore (কন্টেন্ট ব্যাকআপ ও রিস্টোর)</span>
                    </h2>
                    <p className="text-slate-500 text-xs font-semibold mt-1">
                      ডাটাবেজ (MySQL) ছাড়াই আপনার ওয়েবসাইটের সমস্ত কন্টেন্ট ব্যাকআপ ফাইল হিসেবে ডাউনলোড করুন এবং cPanel হোস্টিংয়ে সরাসরি সিঙ্ক করুন।
                    </p>
                  </div>

                  <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-xl border border-slate-200 font-sans">
                    <span className="text-[10px] uppercase font-extrabold tracking-wider pl-2 pr-1 text-slate-500">Auto Save Status:</span>
                    <span className="text-[10px] px-3 py-1 font-bold rounded-lg uppercase bg-emerald-600 text-white shadow-sm">
                      cPanel Server API Active
                    </span>
                  </div>
                </div>

                {/* Connection Status and Bengali Guidance Card */}
                <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4 shadow-sm text-left font-sans">
                  <h3 className="font-extrabold text-slate-850 text-sm flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-indigo-600" />
                    <span>How to publish edits to cPanel? (ওয়েবসাইট কন্টেন্ট আপডেট করার নিয়ম)</span>
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-[11px] leading-relaxed">
                    {/* Status overview */}
                    <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/60 flex flex-col justify-between space-y-3">
                      <div className="space-y-2">
                        <span className="text-[10px] text-slate-400 uppercase font-black tracking-wider block">Storage Mode</span>
                        <div className="flex items-center gap-2 text-emerald-600 text-xs font-black">
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                          cPanel হোস্টিং ডাইনামিক ডেটা API সক্রিয় (Active)
                        </div>
                      </div>
                      
                      <div className="pt-3 border-t border-slate-200 text-[10.5px] text-slate-500 space-y-1.5 leading-relaxed">
                        <p>
                          <strong>রিয়েল-টাইম সিঙ্ক সুবিধা:</strong> আপনি এডমিন প্যানেল থেকে যেকোনো তথ্য পরিবর্তন করলেই তা সরাসরি <span className="font-semibold text-slate-900">/api/save-data.php</span> কল করে আপনার cPanel হোস্টিং এর <span className="font-semibold text-slate-900">site_data.json</span> ফাইলে অটোমেটিক সেভ হয়ে যাবে।
                        </p>
                        <p className="text-indigo-600 font-extrabold">
                          ব্রাউজার ডাটা বা লোকাল ক্যাশ হারানোর কোনো ভয় নেই এবং ম্যানুয়াল কোনো ফাইল আপলোড করতে হবে না।
                        </p>
                      </div>
                    </div>

                    {/* Step-by-step Setup Bengali Guidance */}
                    <div className="space-y-2 text-slate-600">
                      <span className="text-[10px] text-slate-400 uppercase font-black tracking-wider block">Simplified 4-Step Guide (সহজ ৪টি ধাপ):</span>
                      <ul className="list-decimal pl-4 space-y-1.5 leading-relaxed text-[11px] font-sans">
                        <li>
                          <strong>১. তথ্য পরিবর্তন করুন:</strong> এডমিন প্যানেলের যেকোনো কন্টেন্ট এডিট করুন, এটি মেমোরিতে অটো-সেভ হয়ে থাকে।
                        </li>
                        <li>
                          <strong>২. ব্যাকআপ ডাউনলোড করুন:</strong> নিচের <strong>Export site_data.json Backup</strong> বাটনটিতে ক্লিক করে লেটেস্ট ব্যাকআপ ফাইলটি আপনার কম্পিউটারে ডাউনলোড করুন।
                        </li>
                        <li>
                          <strong>৩. cPanel-এ আপলোড করুন:</strong> আপনার হোস্টিং cPanel File Manager-এ গিয়ে বিল্ড ফোল্ডারের ফাইলগুলো (যেমন <code>dist/</code> এর কন্টেন্ট) যেখানে রেখেছেন, ঠিক সেখানে <code>site_data.json</code> ফাইলটি আপলোড করুন।
                        </li>
                        <li>
                          <strong>৪. ব্যাস, কাজ শেষ!</strong> এখন পৃথিবীর যেকোনো প্রান্ত থেকে যেকোনো ভিজিটর আপনার সাইটে আসলে, তারা রিয়েল-টাইমে আপনার করা কন্টেন্ট চেঞ্জগুলো দেখতে পাবেন!
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Main Operations Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch text-xs font-sans">
                  
                  {/* Export Card */}
                  <div className="bg-slate-50 border border-slate-200 p-6 md:p-8 rounded-3xl flex flex-col justify-between text-left space-y-6">
                    <div className="space-y-2">
                      <span className="text-[10px] bg-indigo-500/10 text-indigo-600 font-extrabold uppercase px-2.5 py-1 rounded-md tracking-wider inline-block">Export Database Backup</span>
                      <h3 className="font-extrabold text-sm text-slate-800">Export site_data.json Backup (কন্টেন্ট ব্যাকআপ ডাউনলোড)</h3>
                      <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                        এডমিন প্যানেলে করা আপনার সমস্ত সর্বশেষ পরিবর্তনগুলো একটি মাত্র ফাইলে ডাউনলোড করুন। এই ফাইলটিই হোস্টিংয়ে লাইভ কন্টেন্ট দেখানোর জন্য মূল সোর্স কোড হিসেবে কাজ করে।
                      </p>
                    </div>

                    <div className="bg-white rounded-2xl border border-slate-100 p-4 font-sans text-slate-500 leading-relaxed text-[10.5px]">
                      <strong>ফাইল নেম:</strong> <span className="font-mono text-indigo-600 font-black">site_data.json</span> <br/>
                      <strong>সাইজ:</strong> ~৫৩ KB (সম্পূর্ণ ডাটা স্ট্রাকচার ব্যাকআপ ফাইল)
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        try {
                          const jsonStr = dataStore.exportsiteDataJson();
                          const blob = new Blob([jsonStr], { type: "application/json" });
                          const url = URL.createObjectURL(blob);
                          const link = document.createElement("a");
                          link.href = url;
                          link.download = "site_data.json";
                          document.body.appendChild(link);
                          link.click();
                          document.body.removeChild(link);
                          URL.revokeObjectURL(url);
                          
                          setMysqlSyncMsg("Successfully prepared and downloaded site_data.json background backup!");
                          setTimeout(() => setMysqlSyncMsg(""), 5000);
                        } catch (err: any) {
                          setMysqlSyncErr("Failed to export backup: " + err.message);
                        }
                      }}
                      className="bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold py-3.5 px-6 rounded-xl transition-all shadow-md active:scale-98 cursor-pointer flex items-center justify-center gap-2 text-xs"
                    >
                      <Download className="w-4 h-4" />
                      <span>Export site_data.json Backup File</span>
                    </button>
                  </div>

                  {/* Import Card */}
                  <div className="bg-slate-50 border border-slate-200 p-6 md:p-8 rounded-3xl flex flex-col justify-between text-left space-y-6">
                    <div className="space-y-2">
                      <span className="text-[10px] bg-amber-500/10 text-amber-700 font-extrabold uppercase px-2.5 py-1 rounded-md tracking-wider inline-block">Restore Database Backup</span>
                      <h3 className="font-extrabold text-sm text-slate-800">Import site_data.json Backup (কন্টেন্ট ব্যাকআপ রিস্টোর)</h3>
                      <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                        পূর্বের কোনো ব্যাকআপ ফাইল বা অন্য ব্রাউজারের কন্টেন্ট ফাইল এখানে আপলোড করে আপনার লোকাল ব্রাউজারে রিস্টোর বা লোড করে নিতে পারেন।
                      </p>
                    </div>

                    {/* Drag and drop zone */}
                    <div className="relative border-2 border-dashed border-slate-300 rounded-2xl bg-white p-6 hover:border-indigo-500 transition-all text-center flex flex-col items-center justify-center space-y-2">
                      <Upload className="w-6 h-6 text-slate-400" />
                      <span className="text-[10.5px] font-bold text-slate-600">Select site_data.json backup to restore</span>
                      <span className="text-[9.5px] text-slate-400 font-sans">Click to browse your local computer folder</span>
                      <input
                        type="file"
                        accept=".json"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          const reader = new FileReader();
                          reader.onload = (event) => {
                            const text = event.target?.result as string;
                            const res = dataStore.importSiteDataJson(text);
                            if (res.success) {
                              setMysqlSyncMsg(res.message);
                              setTimeout(() => {
                                setMysqlSyncMsg("");
                                window.location.reload();
                              }, 1500);
                            } else {
                              setMysqlSyncErr(res.message);
                              setTimeout(() => setMysqlSyncErr(""), 6000);
                            }
                          };
                          reader.readAsText(file);
                        }}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                    </div>

                    <div className="text-[10px] text-slate-400 text-center italic">
                      Note: Importing backup will replace your current browser's local drafts content.
                    </div>
                  </div>

                </div>

                {/* Operation Alerts */}
                {mysqlSyncMsg && (
                  <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 rounded-xl p-4 text-xs leading-relaxed font-sans font-bold text-left animate-bounce">
                    {mysqlSyncMsg}
                  </div>
                )}

                {mysqlSyncErr && (
                  <div className="bg-red-500/10 border border-red-500/30 text-red-650 rounded-xl p-4 text-xs leading-relaxed font-sans font-bold text-left animate-shake">
                    {mysqlSyncErr}
                  </div>
                )}

              </div>
            )}

          </div>

          <div className="border-t border-slate-100 pt-6 mt-8 select-none flex justify-between text-[11px] text-slate-400 font-sans">
            <span>Logged in as: <span className="font-extrabold text-indigo-600">Administrator ({adminAuthConfig.adminUsername || "admin"})</span></span>
            <span>Local Time: {new Date().toLocaleDateString()}</span>
          </div>

        </main>
      </div>

      {/* ====== DIALOG BOX / EDIT FORM MODAL ====== */}
      {editingItem !== null && (
        <div className="fixed inset-0 bg-black/65 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden my-8 border border-slate-100 shrink-0">
            {/* Modal Header */}
            <div className="bg-slate-900 text-white px-6 py-5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Edit2 className="w-5 h-5 text-indigo-400" />
                <h3 className="font-bold text-base uppercase tracking-wide">
                  {isAddingNew ? "Add New" : "Edit"} {activeTab.replace("-", " ")} Entry
                </h3>
              </div>
              <button onClick={closeForm} className="p-1.5 hover:bg-white/10 rounded-full transition-colors cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={(e) => handleSaveItem(e, activeTab)} className="p-6 md:p-8 space-y-5">
              
              {formError && (
                <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-xl text-xs flex gap-2 items-center leading-relaxed">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              {/* DYNAMIC FIELD MODULE 1: NEWS */}
              {activeTab === "news" && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-slate-500 text-[10.5px] uppercase font-bold tracking-wider mb-1.5">Article Title *</label>
                      <input type="text" name="title" defaultValue={editingItem.title || ""} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-800" required />
                    </div>
                    <div>
                      <label className="block text-slate-500 text-[10.5px] uppercase font-bold tracking-wider mb-1.5">Category *</label>
                      <input type="text" name="category" defaultValue={editingItem.category || "National Event"} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-800" placeholder="e.g. National Event, Corporate Meeting, Innovation" required />
                    </div>
                    <div>
                      <label className="block text-slate-500 text-[10.5px] uppercase font-bold tracking-wider mb-1.5">Date *</label>
                      <input type="text" name="date" defaultValue={editingItem.date || "June 04, 2026"} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-800" placeholder="e.g. June 04, 2026, Ongoing" required />
                    </div>
                  </div>

                  {/* Elegant Cover Image Upload Section */}
                  <div className="bg-slate-50/50 border border-slate-200 p-4 rounded-2xl space-y-3">
                    <label className="block text-slate-700 text-xs font-extrabold uppercase tracking-wider mb-0.5">Cover Image Content *</label>
                    <div className="flex flex-col sm:flex-row gap-4 items-stretch">
                      {/* Drag & Drop File Input */}
                      <div className="w-full sm:w-1/2 border-2 border-dashed border-slate-200 hover:border-indigo-400 rounded-2xl p-4 transition-all bg-white flex flex-col items-center justify-center text-center relative group min-h-[140px]">
                        <input 
                          type="file" 
                          accept="image/*" 
                          onChange={(e) => handleSingleImageUpload(e, setCurrentImage)} 
                          className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10" 
                        />
                        <Upload className="w-6 h-6 text-slate-400 group-hover:text-indigo-500 transition-colors mb-2" />
                        <span className="text-xs text-slate-600 font-bold">Upload Local Cover Image</span>
                        <span className="text-[10px] text-slate-400 mt-1">Supports PNG, JPG, WEBP (Max 2MB)</span>
                      </div>

                      {/* Live Preview */}
                      <div className="w-full sm:w-1/2 flex flex-col gap-2">
                        {currentImage ? (
                          <div className="relative rounded-2xl overflow-hidden border border-slate-200 h-[140px] w-full bg-slate-100">
                            <img src={currentImage} alt="Cover Preview" className="w-full h-full object-cover" />
                            <button
                              type="button"
                              onClick={() => setCurrentImage("")}
                              className="absolute top-2 right-2 bg-slate-900/80 hover:bg-slate-900 text-white rounded-full p-1.5 transition-colors z-20 cursor-pointer"
                              title="Remove image"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ) : (
                          <div className="rounded-2xl border border-dashed border-slate-200 h-[140px] flex items-center justify-center bg-white text-slate-400 text-xs">
                            No cover image uploaded/provided
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Image URL text input for backup/URL loading */}
                    <div>
                      <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest block mb-1">Backup Image URL / Data string:</span>
                      <input 
                        type="text" 
                        name="image" 
                        value={currentImage} 
                        onChange={(e) => setCurrentImage(e.target.value)} 
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-800 font-mono focus:ring-2 focus:ring-indigo-500" 
                        placeholder="https://images.unsplash.com/... or auto-populated Upload" 
                        required 
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-500 text-[10.5px] uppercase font-bold tracking-wider mb-1.5">Short Summary *</label>
                    <input type="text" name="summary" defaultValue={editingItem.summary || ""} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-800" placeholder="Two sentence description of article..." required />
                  </div>

                  <div>
                    <label className="block text-slate-500 text-[10.5px] uppercase font-bold tracking-wider mb-1.5">Detailed Description (Markdown or Plain Text) *</label>
                    <textarea rows={5} name="description" defaultValue={editingItem.description || ""} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs text-slate-800 leading-relaxed" placeholder="Complete article content..." required />
                  </div>
                </>
              )}

              {/* DYNAMIC FIELD MODULE 2: REPAIR IN PROGRESS AND COMPLETED PORTFOLIOS */}
              {(activeTab === "running-projects" || activeTab === "completed-projects") && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-slate-500 text-[10.5px] uppercase font-bold tracking-wider mb-1.5">Project Title *</label>
                      <input type="text" name="title" defaultValue={editingItem.title || ""} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-800" required />
                    </div>
                    <div>
                      <label className="block text-slate-500 text-[10.5px] uppercase font-bold tracking-wider mb-1.5">
                        {activeTab === "running-projects" ? "Deployment Status *" : "Technology Category *"}
                      </label>
                      <input 
                        type="text" 
                        name="extraField" 
                        defaultValue={activeTab === "running-projects" ? (editingItem.status || "In Progress") : (editingItem.category || "Infrastructure")} 
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-800" 
                        placeholder={activeTab === "running-projects" ? "e.g., In Progress, Deploying" : "e.g., Telecom, Networking"}
                        required 
                      />
                    </div>
                    <div>
                      <label className="block text-slate-500 text-[10.5px] uppercase font-bold tracking-wider mb-1.5">Date Timeline *</label>
                      <input type="text" name="date" defaultValue={editingItem.date || "Ongoing"} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-800" placeholder="e.g. Ongoing, December 2024" required />
                    </div>
                  </div>

                  {/* Elegant Cover Image Upload Section */}
                  <div className="bg-slate-50/50 border border-slate-200 p-4 rounded-2xl space-y-3">
                    <label className="block text-slate-700 text-xs font-extrabold uppercase tracking-wider mb-0.5">Cover Photo Content *</label>
                    <div className="flex flex-col sm:flex-row gap-4 items-stretch">
                      {/* Drag & Drop File Input */}
                      <div className="w-full sm:w-1/2 border-2 border-dashed border-slate-200 hover:border-indigo-400 rounded-2xl p-4 transition-all bg-white flex flex-col items-center justify-center text-center relative group min-h-[140px]">
                        <input 
                          type="file" 
                          accept="image/*" 
                          onChange={(e) => handleSingleImageUpload(e, setCurrentImage)} 
                          className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10" 
                        />
                        <Upload className="w-6 h-6 text-slate-400 group-hover:text-indigo-500 transition-colors mb-2" />
                        <span className="text-xs text-slate-600 font-bold">Upload Local Cover Photo</span>
                        <span className="text-[10px] text-slate-400 mt-1">Supports PNG, JPG, WEBP (Max 2MB)</span>
                      </div>

                      {/* Live Preview */}
                      <div className="w-full sm:w-1/2 flex flex-col gap-2">
                        {currentImage ? (
                          <div className="relative rounded-2xl overflow-hidden border border-slate-200 h-[140px] w-full bg-slate-100">
                            <img src={currentImage} alt="Cover Preview" className="w-full h-full object-cover" />
                            <button
                              type="button"
                              onClick={() => setCurrentImage("")}
                              className="absolute top-2 right-2 bg-slate-900/80 hover:bg-slate-900 text-white rounded-full p-1.5 transition-colors z-20 cursor-pointer"
                              title="Remove image"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ) : (
                          <div className="rounded-2xl border border-dashed border-slate-200 h-[140px] flex items-center justify-center bg-white text-slate-400 text-xs">
                            No cover image uploaded/provided
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Image URL text input for backup/URL loading */}
                    <div>
                      <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest block mb-1">Backup Cover Photo URL / Data string:</span>
                      <input 
                        type="text" 
                        name="image" 
                        value={currentImage} 
                        onChange={(e) => setCurrentImage(e.target.value)} 
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-800 font-mono focus:ring-2 focus:ring-indigo-500" 
                        placeholder="https://images.unsplash.com/... or auto-generated Upload" 
                        required 
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-500 text-[10.5px] uppercase font-bold tracking-wider mb-1.5">Brief Summary *</label>
                    <input type="text" name="summary" defaultValue={editingItem.summary || ""} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-800" placeholder="One sentence summary of deployment..." required />
                  </div>

                  <div>
                    <label className="block text-slate-500 text-[10.5px] uppercase font-bold tracking-wider mb-1.5">Detailed Case Study Description *</label>
                    <textarea rows={5} name="description" defaultValue={editingItem.description || ""} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs text-slate-800 leading-relaxed" placeholder="Write full details about technologies used..." required />
                  </div>
                </>
              )}

              {/* DYNAMIC FIELD MODULE 3: PHOTOS */}
              {activeTab === "photos" && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-500 text-[10.5px] uppercase font-bold tracking-wider mb-1.5">Project/Album Title *</label>
                      <input type="text" name="title" defaultValue={editingItem.title || ""} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-800" required />
                    </div>
                    <div>
                      <label className="block text-slate-500 text-[10.5px] uppercase font-bold tracking-wider mb-1.5 font-sans">Category Tag *</label>
                      <select name="category" defaultValue={editingItem.category || "networking"} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-800">
                        <option value="networking">networking - Enterprise Routing</option>
                        <option value="cctv">cctv - Surveillance</option>
                        <option value="sound">sound - Audio PA Systems</option>
                        <option value="fiber">fiber - Optics & Cables</option>
                        <option value="boardroom">boardroom - Conference</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-slate-500 text-[10.5px] uppercase font-bold tracking-wider mb-1.5 font-sans">Category Label *</label>
                      <input type="text" name="categoryLabel" defaultValue={editingItem.categoryLabel || "Enterprise Networking"} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-800" placeholder="e.g. Sound Systems, IP CCTV" required />
                    </div>
                    <div>
                      <label className="block text-slate-500 text-[10.5px] uppercase font-bold tracking-wider mb-1.5">Corporate Client *</label>
                      <input type="text" name="client" defaultValue={editingItem.client || ""} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-800" required />
                    </div>
                    <div>
                      <label className="block text-slate-500 text-[10.5px] uppercase font-bold tracking-wider mb-1.5">Deployment Location *</label>
                      <input type="text" name="location" defaultValue={editingItem.location || ""} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-800" placeholder="e.g. Gulshan, Dhaka" required />
                    </div>
                  </div>

                  {/* Elegant Multiple Photos Uploader */}
                  <div className="bg-slate-50/50 border border-slate-200 p-4 rounded-2xl space-y-3">
                    <label className="block text-slate-700 text-xs font-extrabold uppercase tracking-wider mb-0.5">
                      Album Photos (Image Studio Gallery Content) *
                    </label>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
                      {/* Drag and Drop Multiple File Input */}
                      <div className="border-2 border-dashed border-slate-200 hover:border-indigo-400 rounded-2xl p-4 transition-all bg-white flex flex-col items-center justify-center text-center relative group min-h-[140px]">
                        <input 
                          type="file" 
                          accept="image/*" 
                          multiple 
                          onChange={handleMultipleImagesUpload} 
                          className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10" 
                        />
                        <Upload className="w-6 h-6 text-slate-400 group-hover:text-indigo-500 transition-colors mb-2" />
                        <span className="text-xs text-slate-600 font-bold">Drag & Drop or Click to Upload</span>
                        <span className="text-[10px] text-slate-400 mt-1">Select Multiple Photos (Max 2MB each)</span>
                      </div>

                      {/* Previews List */}
                      <div className="border border-slate-200 rounded-2xl p-3 bg-white min-h-[140px] max-h-[180px] overflow-y-auto">
                        {currentImagesList.length === 0 ? (
                          <div className="h-full flex items-center justify-center text-slate-400 text-xs">
                            No album images uploaded yet
                          </div>
                        ) : (
                          <div className="grid grid-cols-3 gap-2">
                            {currentImagesList.map((img, idx) => (
                              <div key={idx} className="relative rounded-lg overflow-hidden h-12 group border border-slate-200">
                                <img src={img} alt={`Preview ${idx + 1}`} className="w-full h-full object-cover" />
                                <button
                                  type="button"
                                  onClick={() => setCurrentImagesList(prev => prev.filter((_, i) => i !== idx))}
                                  className="absolute top-1 right-1 bg-red-600 hover:bg-red-750 text-white rounded-full p-1 opacity-100 transition-opacity z-20 cursor-pointer"
                                  title="Delete photo"
                                >
                                  <X className="w-2 h-2" />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Flat list Input for manual overrides */}
                    <div>
                      <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest block mb-1">Backup Image List (One image URL or Base64 content per line):</span>
                      <textarea 
                        rows={4}
                        name="imagesString" 
                        value={currentImagesList.join("\n")} 
                        onChange={(e) => setCurrentImagesList(e.target.value.split("\n").map(s => s.trim()).filter(Boolean))} 
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-800 font-mono focus:ring-2 focus:ring-indigo-500" 
                        placeholder="http://url-1.jpg&#10;http://url-2.jpg" 
                        required 
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-500 text-[10.5px] uppercase font-bold tracking-wider mb-1.5">Brief description notes</label>
                    <textarea rows={3} name="description" defaultValue={editingItem.description || ""} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs text-slate-800 leading-relaxed" placeholder="Structure wiring..." />
                  </div>
                </>
              )}

              {/* DYNAMIC FIELD MODULE 4: VIDEOS */}
              {activeTab === "videos" && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-500 text-[10.5px] uppercase font-bold tracking-wider mb-1.5">Video Title *</label>
                      <input type="text" name="title" defaultValue={editingItem.title || ""} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-800" required />
                    </div>
                    <div>
                      <label className="block text-slate-500 text-[10.5px] uppercase font-bold tracking-wider mb-1.5 font-sans">Category Filter Tag *</label>
                      <select name="category" defaultValue={editingItem.category || "overview"} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-800">
                        <option value="overview">overview - Corporate Overview</option>
                        <option value="installation">installation - Case Study</option>
                        <option value="tutorial">tutorial - Technical walkthrough</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-500 text-[10.5px] uppercase font-bold tracking-wider mb-1.5">Category Label *</label>
                      <input type="text" name="categoryLabel" defaultValue={editingItem.categoryLabel || "Technical Tutorial"} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-800" required />
                    </div>
                    <div>
                      <label className="block text-slate-500 text-[10.5px] uppercase font-bold tracking-wider mb-1.5 font-sans">Duration *</label>
                      <input type="text" name="duration" defaultValue={editingItem.duration || "5:00"} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-800" placeholder="e.g. 10:15, 4:32" required />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-500 text-[10.5px] uppercase font-bold tracking-wider mb-1.5 font-sans">Post Date *</label>
                      <input type="text" name="date" defaultValue={editingItem.date || "June 04, 2026"} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-800" required />
                    </div>
                    
                    {/* Source Toggle Selector block */}
                    <div>
                      <label className="block text-slate-500 text-[10.5px] uppercase font-bold tracking-wider mb-1.5">Video Source Type *</label>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setCurrentVideoType("youtube");
                          }}
                          className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer border ${
                            currentVideoType === "youtube"
                              ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                              : "bg-white hover:bg-slate-50 text-slate-700 border-slate-200"
                          }`}
                        >
                          <Video className="w-3.5 h-3.5" />
                          <span>YouTube URL / ID</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setCurrentVideoType("uploaded");
                          }}
                          className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer border ${
                            currentVideoType === "uploaded"
                              ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                              : "bg-white hover:bg-slate-50 text-slate-700 border-slate-200"
                          }`}
                        >
                          <Upload className="w-3.5 h-3.5" />
                          <span>Local Clip (Max 10MB)</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Elegant Conditionally Rendered video picker */}
                  <div className="bg-slate-50/50 border border-slate-200 p-4 rounded-2xl space-y-3">
                    {currentVideoType === "youtube" ? (
                      <div className="space-y-1.5">
                        <label className="block text-slate-700 text-xs font-extrabold uppercase tracking-wider mb-0.5">YouTube Link / ID *</label>
                        <input 
                          type="text" 
                          value={currentVideoUrl}
                          onChange={(e) => setCurrentVideoUrl(e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-800 font-mono focus:ring-2 focus:ring-indigo-500" 
                          placeholder="e.g. https://www.youtube.com/watch?v=dQw4w9WgXcQ" 
                          required={currentVideoType === "youtube"} 
                        />
                        <p className="text-[10px] text-slate-400 font-sans italic leading-relaxed">
                          Provide the full YouTube video URL, sharing link, or the direct 11-character video ID code.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <label className="block text-slate-700 text-xs font-extrabold uppercase tracking-wider mb-0.5">Upload Local Video File *</label>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
                          {/* Drag & Drop File Input */}
                          <div className="border-2 border-dashed border-slate-200 hover:border-indigo-400 rounded-2xl p-4 transition-all bg-white flex flex-col items-center justify-center text-center relative group min-h-[140px]">
                            <input 
                              type="file" 
                              accept="video/*" 
                              onChange={handleVideoUpload} 
                              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10" 
                            />
                            <Upload className="w-6 h-6 text-slate-400 group-hover:text-indigo-500 transition-colors mb-2" />
                            <span className="text-xs text-slate-600 font-bold">Drag & Drop or Click</span>
                            <span className="text-[10px] text-slate-400 mt-1">Select video file (.mp4, .webm)</span>
                            <span className="text-[9px] text-indigo-500 font-bold mt-1">Max Upload Limit: 10MB</span>
                          </div>

                          {/* Previews List */}
                          <div className="border border-slate-200 rounded-2xl p-3 bg-white min-h-[140px] flex items-center justify-center relative overflow-hidden">
                            {currentVideoUrl ? (
                              <div className="w-full h-full relative flex items-center justify-center bg-black rounded-xl overflow-hidden">
                                <video src={currentVideoUrl} controls className="w-full h-full object-contain" />
                                <button
                                  type="button"
                                  onClick={() => setCurrentVideoUrl("")}
                                  className="absolute top-2 right-2 bg-slate-900/80 hover:bg-slate-900 text-white rounded-full p-1.5 transition-colors z-20 cursor-pointer"
                                  title="Remove video file"
                                >
                                  <X className="w-3" />
                                </button>
                              </div>
                            ) : (
                              <div className="text-slate-400 text-xs font-sans text-center">
                                No video clip loaded yet
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Elegant Video Thumbnail Image Upload Section */}
                  <div className="bg-slate-50/50 border border-slate-200 p-4 rounded-2xl space-y-3">
                    <label className="block text-slate-700 text-xs font-extrabold uppercase tracking-wider mb-0.5">Video Cover Thumbnail *</label>
                    <div className="flex flex-col sm:flex-row gap-4 items-stretch">
                      {/* Drag & Drop File Input */}
                      <div className="w-full sm:w-1/2 border-2 border-dashed border-slate-200 hover:border-indigo-400 rounded-2xl p-4 transition-all bg-white flex flex-col items-center justify-center text-center relative group min-h-[140px]">
                        <input 
                          type="file" 
                          accept="image/*" 
                          onChange={(e) => handleSingleImageUpload(e, setCurrentThumbnail)} 
                          className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10" 
                        />
                        <Upload className="w-6 h-6 text-slate-400 group-hover:text-indigo-500 transition-colors mb-2" />
                        <span className="text-xs text-slate-600 font-bold">Upload Local Thumbnail</span>
                        <span className="text-[10px] text-slate-400 mt-1">Supports PNG, JPG, WEBP (Max 2MB)</span>
                      </div>

                      {/* Live Preview */}
                      <div className="w-full sm:w-1/2 flex flex-col gap-2">
                        {currentThumbnail ? (
                          <div className="relative rounded-2xl overflow-hidden border border-slate-200 h-[140px] w-full bg-slate-100">
                            <img src={currentThumbnail} alt="Thumbnail Preview" className="w-full h-full object-cover" />
                            <button
                              type="button"
                              onClick={() => setCurrentThumbnail("")}
                              className="absolute top-2 right-2 bg-slate-900/80 hover:bg-slate-900 text-white rounded-full p-1.5 transition-colors z-20 cursor-pointer"
                              title="Remove thumbnail"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ) : (
                          <div className="rounded-2xl border border-dashed border-slate-200 h-[140px] flex items-center justify-center bg-white text-slate-400 text-xs">
                            No thumbnail image uploaded/provided
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Thumbnail URL text input for backup/URL loading */}
                    <div>
                      <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest block mb-1">Backup Thumbnail URL / Data string:</span>
                      <input 
                        type="text" 
                        name="thumbnail" 
                        value={currentThumbnail} 
                        onChange={(e) => setCurrentThumbnail(e.target.value)} 
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-800 font-mono focus:ring-2 focus:ring-indigo-500" 
                        placeholder="https://images.unsplash.com/... or auto-generated Upload" 
                        required 
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-500 text-[10.5px] uppercase font-bold tracking-wider mb-1.5">Video/Technical description notes</label>
                    <textarea rows={3} name="description" defaultValue={editingItem.description || ""} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs text-slate-800 leading-relaxed" placeholder="Walkthrough wiring guides..." />
                  </div>
                </>
              )}

              {/* Submit panel Buttons */}
              <div className="border-t border-slate-150 pt-5 mt-6 flex justify-end gap-3 text-xs">
                <button
                  type="button"
                  onClick={closeForm}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-4 py-2.5 rounded-xl transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-5 py-2.5 rounded-xl transition-all flex items-center gap-1 shadow-md cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Data Changes</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* ====== REUSABLE POPUP DIALOG WITH YES / NO BUTTONS ====== */}
      {confirmModal && confirmModal.isOpen && (
        <div className="fixed inset-0 bg-slate-900/65 backdrop-blur-sm flex items-center justify-center p-4 z-[9999]">
          <div className="bg-white rounded-2xl max-w-sm w-full shadow-2xl p-6 border border-slate-100 transform scale-100 transition-all space-y-4">
            <div className="flex items-start gap-3.5">
              <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl flex-shrink-0">
                <HelpCircle className="w-5 h-5 animate-pulse" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-sm text-slate-900 uppercase tracking-wide font-sans">{confirmModal.title}</h4>
                <p className="text-xs text-slate-500 leading-relaxed font-sans">{confirmModal.message}</p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2 text-xs">
              <button
                type="button"
                onClick={() => setConfirmModal(null)}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold px-4.5 py-2.5 rounded-xl transition-all cursor-pointer"
              >
                No, Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  if (confirmModal.onConfirm) {
                    confirmModal.onConfirm();
                  }
                }}
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold px-5 py-2.5 rounded-xl transition-all shadow-md active:scale-98 cursor-pointer animate-pulse"
              >
                Yes, Proceed
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ====== CPANEL WRITE SYNC STATE TRACKER TOAST/OVERLAY ====== */}
      {writeState.status !== "idle" && (
        <div id="cpanel-sync-toast" className={`fixed bottom-6 right-6 max-w-sm md:max-w-md w-full bg-slate-900 text-white rounded-2xl shadow-2xl p-5 border ${writeState.status === "error" ? "border-red-500/50" : writeState.status === "success" ? "border-emerald-500/50" : "border-indigo-500/30"} z-[99999] transition-all duration-300 transform translate-y-0`}>
          <div className="flex gap-4">
            <div className="flex-shrink-0 mt-0.5">
              {writeState.status === "saving" && (
                <div className="relative">
                  <Loader2 className="w-6 h-6 text-indigo-400 animate-spin" />
                  <span className="absolute inset-0 rounded-full bg-indigo-400/20 animate-ping" />
                </div>
              )}
              {writeState.status === "success" && (
                <div className="bg-emerald-500/20 text-emerald-400 p-1.5 rounded-full">
                  <CheckCircle className="w-5 h-5" />
                </div>
              )}
              {writeState.status === "error" && (
                <div className="bg-rose-500/20 text-rose-400 p-1.5 rounded-full animate-bounce">
                  <AlertCircle className="w-5 h-5" />
                </div>
              )}
            </div>
            
            <div className="space-y-1.5 flex-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400">
                  {writeState.status === "saving" ? "cPanel Sync Active" : writeState.status === "success" ? "Sync Success" : "Sync Error / Cache Mode"}
                </span>
                
                {writeState.status === "error" && (
                  <button 
                    onClick={() => setWriteState({ isLoading: false, status: "idle", message: "" })}
                    className="text-slate-400 hover:text-white transition-colors duration-150 p-1 hover:bg-slate-800 rounded-lg cursor-pointer"
                    title="Dismiss alert"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
              
              <h5 className="font-extrabold text-xs tracking-wide">
                {writeState.status === "saving" ? "Writing changes to host server..." : writeState.status === "success" ? "All database changes written!" : "Write Permission Denied (CHMOD Required)"}
              </h5>
              
              <p className="text-[11px] text-slate-300 leading-relaxed font-sans font-medium">
                {writeState.message}
              </p>

              {writeState.status === "error" && (
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-[10.5px] text-slate-300 space-y-1.5 font-sans leading-normal">
                  <span className="font-extrabold text-rose-400 uppercase tracking-wide block">How to resolve on cPanel:</span>
                  <div className="space-y-1 font-medium">
                    <p>1. Log in to your <strong className="text-white">cPanel File Manager</strong>.</p>
                    <p>2. Locate your <strong className="text-white">public_html</strong> directory (or subfolder).</p>
                    <p>3. Right-click the <strong className="text-white">api</strong> folder and select <strong className="text-white font-mono font-bold">Change Permissions (CHMOD)</strong>.</p>
                    <p>4. Set its permission code to <strong className="text-emerald-400 font-mono font-bold">755</strong> (or <strong className="text-amber-400 font-mono font-bold">775 / 777</strong> if it is owned by a different web server user).</p>
                    <p>5. Inside the <strong className="text-white">api</strong> folder, right-click <strong className="text-white">site_data.json</strong> and set its permissions to <strong className="text-emerald-400 font-mono font-bold">644</strong> or <strong className="text-emerald-400 font-mono font-bold">664</strong>.</p>
                    <p className="text-slate-400 text-[10px] pt-1 leading-normal italic">Disclaimer: Since we also save to in-browser storage, edits display correctly inside your current browser session, but changing permissions makes them immediately public for everyone.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

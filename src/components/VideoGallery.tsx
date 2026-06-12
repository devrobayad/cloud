import React, { useState, useEffect } from "react";
import { Play, Film, X, Video, Heart, Calendar, Building, Clock } from "lucide-react";
import PageBanner from "./PageBanner";
import { dataStore } from "../utils/dataStore";

interface VideoItem {
  id: number;
  title: string;
  category: "overview" | "installation" | "tutorial";
  categoryLabel: string;
  duration: string;
  date: string;
  thumbnail: string;
  embedCode: string; // fallback if embed not working or fake video stream simulation
  description: string;
  views: string;
  videoType?: "youtube" | "uploaded";
  videoUrl?: string;
}

const videoItems: VideoItem[] = [
  {
    id: 1,
    title: "Cloud Technologies: Ultimate Corporate Overview",
    category: "overview",
    categoryLabel: "Company Overview",
    duration: "4:25",
    date: "May 12, 2024",
    thumbnail: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=800&auto=format&fit=crop",
    embedCode: "f3yI5b1X9r8", // mock youtube ID
    description: "An in-depth look at our engineering workshops, structural cabling deployment sites, elite supply chain partnerships, and customer support standards.",
    views: "1.2K views"
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
    views: "850 views"
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
    views: "2.4K views"
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
    views: "930 views"
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
    views: "1.5K views"
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
    views: "710 views"
  }
];

const categories = [
  { id: "all", label: "All Videos" },
  { id: "overview", label: "Overview & Corporate" },
  { id: "installation", label: "Installations & Fields" },
  { id: "tutorial", label: "Technical Guides" }
] as const;

export default function VideoGallery() {
  const [videosState, setVideosState] = useState<VideoItem[]>([]);

  useEffect(() => {
    const stored = dataStore.getVideos();
    if (!stored || stored.length === 0) {
      dataStore.saveVideos(videoItems as any);
      setVideosState(videoItems as any);
    } else {
      setVideosState(stored as any);
    }

    const loadVideos = () => {
      setVideosState(dataStore.getVideos() as any);
    };
    window.addEventListener("datastore-update", loadVideos);
    return () => window.removeEventListener("datastore-update", loadVideos);
  }, []);

  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);

  const filteredItems = selectedCategory === "all"
    ? videosState
    : videosState.filter(item => item.category === selectedCategory);

  const openPlayer = (video: VideoItem) => {
    setActiveVideo(video);
  };

  const closePlayer = () => {
    setActiveVideo(null);
  };

  return (
    <section className="py-16 bg-slate-50 min-h-screen">
      <PageBanner title="Video Gallery" />
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Page Title Header */}
        <div className="flex flex-col gap-3 mb-10 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 text-indigo-600 font-extrabold uppercase tracking-widest text-[11px] font-sans">
            <Video className="w-4 h-4 text-indigo-600 animate-pulse" />
            <span>Interactive Video Bank</span>
          </div>
          <p className="text-slate-500 text-sm md:text-base leading-relaxed max-w-2xl">
            Watch our skilled engineering teams in action splicing physical fiber backbones, integrating massive security command grids, and calibrating stadium acoustic arrays.
          </p>
        </div>

        {/* Featured Video Block if available (Using first item) */}
        {videosState.length > 0 && selectedCategory === "all" && (
          <div className="bg-slate-900 text-white rounded-3xl overflow-hidden shadow-xl mb-12 border border-slate-800 grid grid-cols-1 lg:grid-cols-12">
            <div className="relative lg:col-span-7 h-64 sm:h-96 lg:h-auto overflow-hidden bg-slate-950 group">
              <img
                src={videosState[0].thumbnail}
                alt={videosState[0].title}
                className="w-full h-full object-cover opacity-60 group-hover:scale-105 group-hover:opacity-50 transition-all duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  onClick={() => openPlayer(videosState[0])}
                  className="w-16 h-16 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-2xl hover:bg-indigo-500 hover:scale-110 active:scale-95 transition-all text-lg cursor-pointer animate-bounce-subtle"
                >
                  <Play className="w-6 h-6 fill-white ml-1" />
                </button>
              </div>
              <span className="absolute bottom-4 right-4 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 text-xs font-bold rounded-lg text-slate-300 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-indigo-400" />
                {videosState[0].duration}
              </span>
            </div>
            
            <div className="p-8 sm:p-12 lg:col-span-5 flex flex-col justify-between">
              <div className="flex flex-col gap-4">
                <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-full text-[10px] font-extrabold uppercase tracking-widest max-w-max">
                  {videosState[0].categoryLabel}
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight leading-tight">
                  {videosState[0].title}
                </h2>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                  {videosState[0].description}
                </p>
              </div>

              <div className="flex items-center gap-6 pt-6 border-t border-slate-800 mt-6 text-xs text-slate-500 font-semibold uppercase tracking-wider">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-slate-600" />
                  <span>{videosState[0].date}</span>
                </div>
                <div>
                  <span>{videosState[0].views}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Category Controls Bar */}
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-8 bg-white p-2 rounded-2xl border border-slate-100 shadow-sm max-w-max">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold tracking-tight transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? "bg-[#2E6FA8] text-white shadow-md shadow-indigo-600/20"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Video Grid Feed */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col"
            >
              {/* Thumbnail Stage */}
              <div className="relative h-48 overflow-hidden bg-slate-150">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-550"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-slate-950/40 transition-colors duration-300 flex items-center justify-center">
                  <button
                    onClick={() => openPlayer(item)}
                    className="w-12 h-12 rounded-full bg-white text-indigo-600 flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300 cursor-pointer"
                  >
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  </button>
                </div>
                <span className="absolute bottom-3 right-3 bg-slate-950/80 backdrop-blur-md px-2 py-0.5 text-[10px] font-extrabold rounded text-slate-300">
                  {item.duration}
                </span>
                <span className="absolute top-3 left-3 px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-wider bg-slate-900/80 backdrop-blur-md text-white rounded">
                  {item.categoryLabel}
                </span>
              </div>

              {/* Text Area */}
              <div className="p-5 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="text-slate-950 font-bold text-sm leading-snug tracking-tight mb-2 group-hover:text-indigo-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-500 text-xs line-clamp-2 leading-relaxed mb-4">
                    {item.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-50 text-[10px] text-slate-400 font-bold">
                  <span>{item.date}</span>
                  <span className="text-indigo-600">{item.views}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Video Player Modal Panel (Simulated or embedded) */}
        {activeVideo && (
          <div 
            className="fixed inset-0 bg-slate-950/95 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closePlayer}
          >
            <div 
              className="bg-slate-900 text-white rounded-3xl overflow-hidden shadow-2xl max-w-4xl w-full border border-slate-800 flex flex-col max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top Row with Title & Exit button */}
              <div className="flex items-center justify-between p-4 md:p-6 border-b border-slate-800">
                <span className="px-2.5 py-1 text-[9px] font-extrabold tracking-widest bg-indigo-600 text-white rounded uppercase">
                  {activeVideo.categoryLabel}
                </span>
                <button
                  onClick={closePlayer}
                  className="w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Center Stage Player container */}
              <div className="relative bg-black aspect-video flex-grow flex items-center justify-center overflow-hidden">
                {activeVideo.videoType === "uploaded" && activeVideo.videoUrl ? (
                  <video
                    src={activeVideo.videoUrl}
                    controls
                    autoPlay
                    className="w-full h-full object-contain relative z-10 pointer-events-auto"
                  />
                ) : (activeVideo.videoType === "youtube" || activeVideo.videoUrl || activeVideo.embedCode) ? (
                  <iframe
                    className="w-full h-full absolute inset-0 z-10 pointer-events-auto"
                    src={`https://www.youtube.com/embed/${(() => {
                      const url = activeVideo.videoUrl || activeVideo.embedCode;
                      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
                      const match = url.match(regExp);
                      return (match && match[2].length === 11) ? match[2] : url;
                    })()}?autoplay=1&rel=0`}
                    title={activeVideo.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <>
                    {/* Simulated Beautiful High Tech Stream Preview with interactive video layout */}
                    <div className="absolute inset-0 flex flex-col justify-between p-6 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/30 z-10 pointer-events-none select-none">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-505 animate-pulse" />
                        <span className="text-[10px] tracking-widest bg-red-600/20 text-red-500 px-2 py-0.5 rounded font-extrabold uppercase">ULTRA HD STREAM</span>
                      </div>

                      <div className="flex flex-col items-center gap-3 my-auto text-center px-4">
                        <div className="w-16 h-16 rounded-full bg-indigo-600/30 text-indigo-400 flex items-center justify-center border border-indigo-500/30 shadow-lg border-dashed">
                          <Play className="w-6 h-6 fill-indigo-400 ml-1 animate-pulse" />
                        </div>
                        <span className="text-white text-xs font-bold font-mono tracking-tight bg-slate-950/70 py-1.5 px-3 rounded-full border border-white/5 select-none">
                          STREAM SOURCE CONNECTING... (00:00 / {activeVideo.duration})
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-slate-400 text-[10px] font-mono">
                        <span>PORT: 3000 // DEPLOY_STREAM // ACTIVE_NODE</span>
                        <span>HD 1080P // 60 FPS</span>
                      </div>
                    </div>

                    <img 
                      src={activeVideo.thumbnail} 
                      alt="" 
                      className="w-full h-full object-cover opacity-30 select-none pointer-events-none"
                      referrerPolicy="no-referrer"
                    />
                  </>
                )}
              </div>

              {/* Bottom Row Details */}
              <div className="p-6 md:p-8 bg-slate-950/40">
                <h2 className="text-base sm:text-xl font-extrabold tracking-tight mb-2">
                  {activeVideo.title}
                </h2>
                <p className="text-slate-400 text-xs leading-relaxed max-w-3xl mb-4">
                  {activeVideo.description}
                </p>

                <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-slate-800 text-xs text-slate-500 font-bold uppercase tracking-wider">
                  <div className="flex items-center gap-1.5">
                    <Building className="w-4 h-4 text-slate-600" />
                    <span>RS Tech Field Unit</span>
                  </div>
                  <div>
                    <span>{activeVideo.views}</span>
                  </div>
                  <div>
                    <span>{activeVideo.date}</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}

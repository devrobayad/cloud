import React, { useState, useEffect } from "react";
import { Project } from "../types";
import { Camera, Image as ImageIcon, X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import PageBanner from "./PageBanner";
import { dataStore } from "../utils/dataStore";
import ScrollReveal from "./ScrollReveal";

const projects: Project[] = [
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
  },
  {
    id: 5,
    title: "Interactive Video Conference Boardroom Setup",
    category: "boardroom",
    categoryLabel: "Conference Solutions",
    images: [
      "https://images.unsplash.com/photo-1517502884422-41eaaced0168?q=80&w=800&auto=format&fit=crop"
    ],
    description: "Unified communications matrix layout combining smart dynamic visual controls, noise-canceling mic matrices, and display systems.",
    client: "United Group Corporate HQ",
    location: "Badda, Dhaka"
  },
  {
    id: 6,
    title: "Server Cluster Hot-Aisle Containment System",
    category: "networking",
    categoryLabel: "Enterprise Networking",
    images: [
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=800&auto=format&fit=crop"
    ],
    description: "State-of-the-art server cabinet cooling management and structured backbone cable routing systems.",
    client: "Dhaka Stock Exchange",
    location: "Nikunja, Dhaka"
  },
  {
    id: 7,
    title: "Multi-Zone Public Address Mixing Hub",
    category: "sound",
    categoryLabel: "Sound Systems",
    images: [
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=800&auto=format&fit=crop"
    ],
    description: "Complex audio signals routing array, power amplifiers, and wireless mic configurations for high fidelity public announcement.",
    client: "City University Campus",
    location: "Savar, Dhaka"
  },
  {
    id: 8,
    title: "High-Precision Thermal Surveillance Dome",
    category: "cctv",
    categoryLabel: "Surveillance & CCTV",
    images: [
      "https://images.unsplash.com/photo-1508962914676-134849a727f0?q=80&w=800&auto=format&fit=crop"
    ],
    description: "Implementation of heavy-duty PTZ surveillance camera array configured with instant movement alerts and nighttime thermal arrays.",
    client: "Chittagong Port Authority",
    location: "Sadat Port, Chittagong"
  }
];

const categories = [
  { id: "all", label: "All Works" },
  { id: "networking", label: "Networking" },
  { id: "cctv", label: "IP CCTV" },
  { id: "sound", label: "Sound Systems" },
  { id: "fiber", label: "Fiber Optic" },
  { id: "boardroom", label: "Boardroom" }
] as const;

export default function PhotoGallery() {
  const [projectsList, setProjectsList] = useState<Project[]>([]);

  useEffect(() => {
    // If not set yet in dataStore, initialize it using static fallback projects
    const stored = dataStore.getPhotos();
    if (!stored || stored.length === 0) {
      dataStore.savePhotos(projects as any);
      setProjectsList(projects as any);
    } else {
      setProjectsList(stored as any);
    }

    const loadPhotos = () => {
      setProjectsList(dataStore.getPhotos() as any);
    };
    window.addEventListener("datastore-update", loadPhotos);
    return () => window.removeEventListener("datastore-update", loadPhotos);
  }, []);

  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [lightboxImageIndex, setLightboxImageIndex] = useState<number | null>(null);

  const filteredProjects = selectedCategory === "all"
    ? projectsList
    : projectsList.filter(item => item.category === selectedCategory);

  const openLightbox = (imageIndex: number) => {
    setLightboxImageIndex(imageIndex);
  };

  const closeLightbox = () => {
    setLightboxImageIndex(null);
  };

  const nextPhoto = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (lightboxImageIndex !== null && selectedProject) {
      setLightboxImageIndex((prev) => (prev === null || prev === selectedProject.images.length - 1) ? 0 : prev + 1);
    }
  };

  const prevPhoto = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (lightboxImageIndex !== null && selectedProject) {
      setLightboxImageIndex((prev) => (prev === null || prev === 0) ? selectedProject.images.length - 1 : prev - 1);
    }
  };

  return (
    <section className="py-16 bg-slate-50 min-h-screen">
      <PageBanner title="Photo Gallery" />
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Page Title & Breadcrumb */}
        <ScrollReveal direction="up" duration={0.6}>
          <div className="flex flex-col gap-3 mb-10 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-indigo-600 font-extrabold uppercase tracking-widest text-[11px] font-sans">
              <Camera className="w-4 h-4 text-indigo-600 animate-pulse" />
              <span>Interactive Portfolio</span>
            </div>
            <p className="text-slate-500 text-sm md:text-base leading-relaxed max-w-2xl">
              Explore authentic visual logs showcasing our high-profile enterprise security, networking, professional sound systems, and fiber backbone installation fields in Bangladesh.
            </p>
          </div>
        </ScrollReveal>

        {/* Filter Navigation Bar */}
        {!selectedProject && (
          <ScrollReveal direction="up" duration={0.6} delay={0.1}>
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
          </ScrollReveal>
        )}

        {/* Grid Layout of Projects */}
        {!selectedProject ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProjects.map((project, index) => (
              <ScrollReveal
                key={project.id}
                direction="up"
                duration={0.6}
                delay={(index % 4) * 0.08}
                className="flex h-full"
              >
                <div
                  onClick={() => setSelectedProject(project)}
                  className="group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer flex flex-col justify-between w-full"
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden bg-slate-100">
                    <img
                      src={project.images[0]}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                    
                    <span className="absolute top-3 left-3 px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-wider bg-slate-900/80 backdrop-blur-md text-white rounded-md">
                      {project.categoryLabel}
                    </span>
                    
                    <div className="absolute top-3 right-3 px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-wider bg-white/90 text-indigo-900 rounded-md">
                      {project.images.length} Photos
                    </div>
                  </div>

                  <div className="p-5 flex-grow flex flex-col justify-between">
                    <div>
                      <h3 className="text-slate-900 font-extrabold text-sm leading-snug tracking-tight mb-2 group-hover:text-indigo-600 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-slate-500 text-xs line-clamp-2 leading-relaxed mb-4">
                        {project.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-slate-50 text-[10px] text-slate-400 font-bold">
                      <span className="text-indigo-600 uppercase tracking-tight truncate max-w-[120px]">
                        {project.client}
                      </span>
                      <span className="truncate max-w-[100px]">
                        {project.location}
                      </span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        ) : (
          /* Project Detail View */
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <button
               onClick={() => setSelectedProject(null)}
               className="mb-6 flex items-center gap-2 text-indigo-600 font-bold text-sm hover:underline"
            >
              <ChevronLeft className="w-4 h-4" /> Back to all projects
            </button>
            <h2 className="text-3xl font-extrabold text-slate-900 mb-2">{selectedProject.title}</h2>
            <p className="text-slate-500 text-sm mb-6">{selectedProject.description}</p>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
               {selectedProject.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`${selectedProject.title} - ${idx + 1}`}
                    className="w-full h-48 object-cover rounded-2xl cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => setLightboxImageIndex(idx)}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
               ))}
            </div>
          </div>
        )}

        {/* Empty state descriptor */}
        {!selectedProject && filteredProjects.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
            <ImageIcon className="w-12 h-12 text-slate-300 mb-3" />
            <h3 className="font-extrabold text-slate-800 text-base">No Projects Available</h3>
            <p className="text-slate-500 text-xs mt-1">There are no projects matching the selected category filter.</p>
          </div>
        )}

        {/* Lightbox Popkup Modal Implementation */}
        {lightboxImageIndex !== null && selectedProject && (
          <div 
            className="fixed inset-0 bg-slate-950/95 backdrop-blur-sm z-50 flex flex-col justify-between p-4"
            onClick={closeLightbox}
          >
            {/* Header controls inside Lightbox */}
            <div className="flex items-center justify-between text-white py-2 px-4 max-w-7xl mx-auto w-full z-10">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-widest bg-indigo-600 text-white rounded">
                  {selectedProject.categoryLabel}
                </span>
                <span className="text-xs text-slate-400">
                  {lightboxImageIndex + 1} of {selectedProject.images.length}
                </span>
              </div>
              <button 
                onClick={closeLightbox}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Core Image Stage in Lightbox */}
            <div className="relative flex-grow flex items-center justify-center max-w-6xl mx-auto w-full group/lightbox">
              
              {/* Prev Button */}
              <button
                onClick={prevPhoto}
                className="absolute left-2 md:left-4 w-12 h-12 rounded-full bg-black/40 hover:bg-black/60 border border-white/10 text-white flex items-center justify-center transition-colors cursor-pointer z-10"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Heavy duty slider image container */}
              <div 
                className="max-h-[70vh] flex items-center justify-center px-4"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={selectedProject.images[lightboxImageIndex]}
                  alt={selectedProject.title}
                  className="max-h-[70vh] max-w-full rounded-2xl object-contain shadow-2xl border border-white/5"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Next Button */}
              <button
                onClick={nextPhoto}
                className="absolute right-2 md:right-4 w-12 h-12 rounded-full bg-black/40 hover:bg-black/60 border border-white/10 text-white flex items-center justify-center transition-colors cursor-pointer z-10"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Bottom metadata detailed row */}
            <div 
              className="bg-slate-900/80 border border-white/5 backdrop-blur-md p-6 rounded-2xl max-w-4xl mx-auto w-full text-white mb-4"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="font-extrabold text-[#F8FAFC] tracking-tight text-base md:text-lg mb-1.5">
                {selectedProject.title}
              </h2>
              <p className="text-slate-300 text-xs md:text-sm leading-relaxed mb-4">
                {selectedProject.description}
              </p>
              
              <div className="grid grid-cols-2 gap-4 pt-3 border-t border-white/5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                <div>
                  <span className="block text-[9px] text-slate-500 font-extrabold leading-none mb-1">CLIENT ASSIGNMENT</span>
                  <span className="text-white">{selectedProject.client}</span>
                </div>
                <div>
                  <span className="block text-[9px] text-slate-500 font-extrabold leading-none mb-1">OPERATIONAL SITE</span>
                  <span className="text-white">{selectedProject.location}</span>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}

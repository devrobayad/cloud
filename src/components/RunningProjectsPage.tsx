import React, { useState, useEffect } from "react";
import { Calendar, ArrowRight, X, FileText } from "lucide-react";
import PageBanner from "./PageBanner";
import { dataStore, ProjectItem } from "../utils/dataStore";
import ScrollReveal from "./ScrollReveal";

export default function RunningProjectsPage() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [projectsList, setProjectsList] = useState<ProjectItem[]>([]);

  useEffect(() => {
    const loadProjects = () => {
      setProjectsList(dataStore.getRunningProjects());
    };
    loadProjects();
    window.addEventListener("datastore-update", loadProjects);
    return () => window.removeEventListener("datastore-update", loadProjects);
  }, []);

  return (
    <section className="py-16 bg-slate-50 min-h-screen">
      <PageBanner title="Running Projects" />
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsList.map((project, index) => (
            <ScrollReveal
              key={project.id}
              direction="up"
              duration={0.6}
              delay={(index % 3) * 0.1}
              className="flex h-full"
            >
              <div
                onClick={() => setSelectedProject(project)}
                className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-100 transition-all duration-300 cursor-pointer w-full"
              >
                <div className="h-48 w-full overflow-hidden">
                  <img src={project.image} alt={project.title} referrerPolicy="no-referrer" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <div className="text-indigo-600 text-xs font-bold uppercase mb-2">{project.status}</div>
                    <h3 className="font-bold text-slate-800 text-base mb-2 group-hover:text-indigo-600 transition-colors line-clamp-2">{project.title}</h3>
                    <p className="text-slate-500 text-xs mb-4 line-clamp-2 leading-relaxed">{project.summary}</p>
                  </div>
                  <div className="flex items-center gap-1.5 text-indigo-600 font-extrabold text-xs pt-2 border-t border-slate-55 select-none">
                    <span>View Details</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {selectedProject && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl">
            <div className="p-5 border-b flex items-center justify-between bg-slate-900 text-white">
              <span className="font-bold text-sm tracking-widest">{selectedProject.title}</span>
              <button onClick={() => setSelectedProject(null)} className="p-2 hover:bg-white/20 rounded-full"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6">
              <img src={selectedProject.image} alt={selectedProject.title} referrerPolicy="no-referrer" className="w-full h-64 object-cover rounded-2xl mb-6" />
              <div className="flex items-center gap-2 text-slate-500 text-sm mb-4">
                <Calendar className="w-4 h-4" /> {selectedProject.date}
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900 mb-4">{selectedProject.title}</h2>
              <p className="text-slate-700 leading-relaxed">{selectedProject.description}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

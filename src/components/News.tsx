import React, { useState, useEffect } from "react";
import { ArrowRight, X, Calendar, Award, FileText } from "lucide-react";
import PageBanner from "./PageBanner";
import { dataStore, NewsItem } from "../utils/dataStore";
import ScrollReveal from "./ScrollReveal";

export default function News() {
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [newsList, setNewsList] = useState<NewsItem[]>([]);

  useEffect(() => {
    const loadNews = () => {
      setNewsList(dataStore.getNews());
    };
    loadNews();
    window.addEventListener("datastore-update", loadNews);
    return () => window.removeEventListener("datastore-update", loadNews);
  }, []);

  return (
    <section id="news" className="bg-slate-50 relative min-h-screen py-16">
      <PageBanner title="News" />
      
      {/* 2. News Cards Area */}
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {newsList.map((news, idx) => (
            <ScrollReveal
              key={news.id}
              direction="up"
              duration={0.6}
              delay={idx * 0.1}
              className="flex h-full"
            >
              <div
                onClick={() => setSelectedNews(news)}
                className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.12)] border border-slate-100 transition-all duration-300 transform hover:-translate-y-1.5 cursor-pointer w-full"
              >
                {/* Image Container */}
                <div className="relative h-56 w-full overflow-hidden bg-[#0a0d24]">
                  {news.isCustomGraphic ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-gradient-to-br from-[#0c0f2a] to-[#171c4c] text-center select-none overflow-hidden">
                      {/* Abstract Grid background */}
                      <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]"></div>
                      
                      {/* Olympic styled connected rings */}
                      <div className="relative z-10 flex items-center justify-center gap-1.5 mb-3">
                        <div className="w-5 h-5 rounded-full border-2 border-blue-500 flex items-center justify-center"></div>
                        <div className="w-5 h-5 rounded-full border-2 border-yellow-500 -ml-2.5 mt-2.5 flex items-center justify-center"></div>
                        <div className="w-5 h-5 rounded-full border-2 border-slate-300 -ml-2.5 flex items-center justify-center"></div>
                        <div className="w-5 h-5 rounded-full border-2 border-green-500 -ml-2.5 mt-2.5 flex items-center justify-center"></div>
                        <div className="w-5 h-5 rounded-full border-2 border-red-500 -ml-2.5 flex items-center justify-center"></div>
                      </div>
                      
                      <h4 className="relative z-10 text-[11px] font-bold tracking-[0.2em] text-cyan-400 uppercase">
                        International
                      </h4>
                      <h3 className="relative z-10 text-white font-extrabold text-base tracking-wide mt-1">
                        Blockchain Olympiad
                      </h3>
                      
                      {/* Divider line */}
                      <div className="relative z-10 w-24 h-px bg-slate-600 my-2"></div>
                      
                      <span className="relative z-10 text-amber-400 font-extrabold text-xs tracking-wider">
                        8-10 October 2021
                      </span>
                    </div>
                  ) : (
                    <img
                      src={news.image}
                      alt={news.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                  )}

                  {/* Badge Category Overlay info */}
                  <div className="absolute top-4 left-4 bg-black/45 backdrop-blur-md text-white text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full z-10 select-none">
                    {news.category}
                  </div>

                  {/* The unique theme circle badge at bottom right as requested */}
                  <div className="absolute bottom-4 right-4 w-6 h-6 rounded-full bg-[#121632]/80 backdrop-blur-sm border border-white/10 flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse"></div>
                  </div>
                </div>

                {/* Title & Underline controls */}
                <div className="p-6 flex flex-col justify-between flex-grow">
                  <div>
                    {/* News date info */}
                    <div className="flex items-center gap-1 text-slate-400 text-xs mb-2 select-none">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{news.date}</span>
                    </div>
                    <h3 className="text-slate-800 font-bold text-sm sm:text-base leading-relaxed tracking-wide hover:text-indigo-600 transition-colors line-clamp-3">
                      {news.title}
                    </h3>
                    <p className="text-slate-500 text-xs leading-relaxed mt-2.5 line-clamp-2">
                      {news.summary}
                    </p>
                  </div>

                  {/* Read more button link */}
                  <div className="flex items-center gap-1.5 text-indigo-600 group-hover:text-indigo-800 font-extrabold text-xs mt-6 transition-colors select-none">
                    <span>Read more</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* 3. Detailed View/Read Dialog Modal overlay */}
      {selectedNews && (
        <div id="modal-container" className="fixed inset-0 bg-[#060814]/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto animate-fade-in transition-all duration-300">
          <div className="bg-white rounded-3xl overflow-hidden shadow-2xl max-w-2xl w-full my-8 transform scale-100 transition-all duration-300 relative border border-slate-100 flex flex-col max-h-[85vh]">
            
            {/* Top header area */}
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-[#121632] text-white">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-cyan-400" />
                <span className="text-xs uppercase font-extrabold tracking-widest text-[#9ca3af]">{selectedNews.category}</span>
              </div>
              <button 
                id="close-news-btn"
                onClick={() => setSelectedNews(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content main body */}
            <div className="overflow-y-auto p-6 flex-grow flex flex-col gap-5">
              
              {/* Graphic/Image area */}
              <div className="relative h-64 rounded-2xl overflow-hidden bg-[#0a0d24] select-none shadow-inner">
                <img
                  src={selectedNews.image}
                  alt={selectedNews.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                
                {/* Visual text overlay indicator for custom graphic news items if necessary */}
                {selectedNews.isCustomGraphic && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-4 text-left">
                    <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">
                      International Blockchain Olympiad
                    </span>
                    <span className="text-[9px] text-amber-400 font-extrabold mt-0.5">
                      8-10 October 2021
                    </span>
                  </div>
                )}
              </div>

              {/* News Metadata area */}
              <div className="flex items-center gap-4 text-slate-400 text-xs select-none">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4 text-indigo-500" />
                  <span className="font-medium text-slate-500">{selectedNews.date}</span>
                </div>
                <div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div>
                <div className="flex items-center gap-1">
                  <Award className="w-4 h-4 text-amber-500" />
                  <span className="font-bold text-slate-700">{selectedNews.category}</span>
                </div>
              </div>

              {/* News description text */}
              <div className="flex flex-col gap-3">
                <h2 className="text-slate-900 font-extrabold text-lg sm:text-xl leading-snug tracking-tight">
                  {selectedNews.title}
                </h2>
                
                {/* Thick accent divider */}
                <div className="w-12 h-1 bg-indigo-600 rounded-full my-1"></div>

                <p className="text-slate-700 text-xs sm:text-sm font-semibold leading-relaxed bg-slate-50 p-4 rounded-xl border-l-[3px] border-indigo-500">
                  {selectedNews.summary}
                </p>

                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed tracking-wide whitespace-pre-line my-1">
                  {selectedNews.description}
                </p>

              </div>

            </div>

            {/* Bottom action controls */}
            <div className="p-4 border-t border-slate-100 flex items-center justify-end bg-slate-50">
              <button
                id="modal-close-footer"
                onClick={() => setSelectedNews(null)}
                className="px-5 py-2.5 bg-[#121632] hover:bg-slate-900 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow hover:shadow-md cursor-pointer"
              >
                Close View
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}

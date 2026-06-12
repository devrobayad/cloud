import React from "react";
import { Heart, Leaf, GraduationCap, Award, Calendar, Users, Globe, FlameKindling, MapPin } from "lucide-react";
import PageBanner from "./PageBanner";
import ScrollReveal from "./ScrollReveal";

export default function CSRPage() {
  const initiatives = [
    {
      icon: GraduationCap,
      title: "Digital Literacy & Tech Education",
      desc: "Bridging the digital divide by donating fully equipped computer labs and running free programming and basic computing classes for underprivileged students in rural Bangladesh.",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600&auto=format&fit=crop",
      impact: "15+ Rural Schools Supported | 5,000+ Students Trained"
    },
    {
      icon: Leaf,
      title: "Green IT & E-Waste Recycling",
      desc: "Committed to sustainability. We deploy energy-efficient server systems, guide clients on reduction of power consumption, and run certified electronics-recycling drives to prevent toxic waste.",
      image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=600&auto=format&fit=crop",
      impact: "100% Secure Recycling | 20+ Tons E-Waste Safely Processed"
    },
    {
      icon: Heart,
      title: "Community Outreach & Relief",
      desc: "Supporting vulnerable families through our seasonal clothing drives, distribution of dry rations during flood seasons, and medical checkup camps in backward territories.",
      image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=600&auto=format&fit=crop",
      impact: "10,000+ Underprivileged Families Supported"
    }
  ];

  const stories = [
    {
      title: "Tech-Labs Project 2025",
      date: "November 2025",
      location: "Rangpur Division",
      desc: "Our engineers spent 2 weeks constructing sound computer networks, power backups, and learning consoles for 3 remote high-schools, enabling digital classrooms for the first time in those areas.",
      tag: "Education"
    },
    {
      title: "Annual Warmth Clothing drive",
      date: "December 2025",
      location: "Kurigram & Dinajpur Districts",
      desc: "Distributed over 2,500 high-quality winter blankets and jackets to families fighting severe cold waves, with active volunteering from our corporate technical teams.",
      tag: "Relief"
    },
    {
      title: "Sustain-DC Green Initiative",
      date: "March 2026",
      location: "Dhaka Head Office",
      desc: "Launched a green program assisting 12 corporate client datacenters in moving to certified 1.25 PUE cooling systems and smart standby loops, drastically reducing local power grids load.",
      tag: "Energy"
    }
  ];

  return (
    <section className="py-16 bg-white min-h-screen">
      <PageBanner title="CSR Initiatives" />
      <div className="max-w-7xl mx-auto px-4 md:px-8">

        {/* Intro */}
        <ScrollReveal direction="up" duration={0.6}>
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-extrabold text-[#2E6FA8] mb-4">Our Commitment to Society</h2>
            <div className="w-16 h-1 bg-indigo-600 mx-auto mb-6 rounded-full" />
            <p className="text-slate-600 text-base md:text-lg leading-relaxed font-medium">
              At <span className="font-bold text-slate-900">Cloud Technologies</span>, we believe that real corporate leadership goes beyond commercial services. True craftsmanship is defined by how we give back. Through our CSR pillars, we strive to build equal tech opportunities, secure clean environments, and provide instant disaster relief across the nation.
            </p>
          </div>
        </ScrollReveal>

        {/* Pillars Area */}
        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {initiatives.map((item, i) => (
            <ScrollReveal
              key={i}
              direction="up"
              duration={0.6}
              delay={i * 0.1}
              className="flex h-full"
            >
              <div className="bg-slate-50 rounded-2xl border border-slate-100/80 shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-all duration-300 group w-full">
                <div className="h-56 relative overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 bg-indigo-600 text-white p-3 rounded-xl shadow-lg">
                    <item.icon className="w-5 h-5" />
                  </div>
                </div>
                <div className="p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-6">
                      {item.desc}
                    </p>
                  </div>
                  <div className="bg-indigo-50 border border-indigo-100/50 p-3 rounded-xl flex items-center gap-2">
                    <Award className="w-4 h-4 text-indigo-600 flex-shrink-0" />
                    <span className="text-xs font-bold text-indigo-900 leading-none">{item.impact}</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Global Impact Numbers */}
        <ScrollReveal direction="up" duration={0.8} delay={0.1}>
          <div className="bg-[#2E6FA8] rounded-3xl p-10 mb-20 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#4338ca,transparent)] opacity-30 pointer-events-none" />
            <div className="relative z-10 grid md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-indigo-800/60">
              <div className="pt-6 md:pt-0">
                <div className="text-4xl md:text-5xl font-extrabold text-indigo-400 mb-2">15,000+</div>
                <div className="text-xs uppercase tracking-widest font-bold text-indigo-200">Lives Enhanced</div>
              </div>
              <div className="pt-6 md:pt-0">
                <div className="text-4xl md:text-5xl font-extrabold text-indigo-400 mb-2">18+ Districts</div>
                <div className="text-xs uppercase tracking-widest font-bold text-indigo-200">Across Bangladesh Covered</div>
              </div>
              <div className="pt-6 md:pt-0">
                <div className="text-4xl md:text-5xl font-extrabold text-indigo-400 mb-2">1,000+ Days</div>
                <div className="text-xs uppercase tracking-widest font-bold text-indigo-200">Staff Volunteering Hours</div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Recent Actions & Stories */}
        <div>
          <ScrollReveal direction="up" duration={0.6}>
            <h2 className="text-2xl md:text-3xl font-bold text-[#2E6FA8] mb-4 text-center">Recent CSR Highlights</h2>
            <p className="text-slate-500 text-sm text-center mb-12">Tracking our social responsibility actions and real-world results month by month.</p>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-6">
            {stories.map((story, i) => (
              <ScrollReveal
                key={i}
                direction="up"
                duration={0.6}
                delay={i * 0.1}
                className="flex h-full"
              >
                <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm hover:border-slate-200 transition-all flex flex-col justify-between w-full">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] font-bold uppercase tracking-widest bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full">
                        {story.tag}
                      </span>
                      <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {story.date}
                      </span>
                    </div>
                    <h4 className="font-extrabold text-slate-900 text-lg mb-2">{story.title}</h4>
                    <p className="text-slate-600 text-sm leading-relaxed mb-4">{story.desc}</p>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#2E6FA8]">
                    <MapPin className="w-3.5 h-3.5 text-indigo-600" />
                    <span>{story.location}</span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

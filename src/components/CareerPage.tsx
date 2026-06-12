import React, { useState } from "react";
import { Briefcase, MapPin, Clock, ChevronRight, Send, Sparkles } from "lucide-react";
import PageBanner from "./PageBanner";
import ScrollReveal from "./ScrollReveal";

export default function CareerPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "Senior Network Architect",
    experience: "1-3 Years",
    resumeUrl: "",
    coverLetter: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const jobs = [
    {
      id: "j1",
      title: "Senior Network Architect",
      department: "Data Center & Networking",
      location: "Corporate Office, Pallabi, Mirpur, Dhaka",
      type: "Full-Time",
      experience: "5+ Years",
      salary: "Negotiable",
      desc: "We are seeking a highly specialized Network Architect to lead active/passive LAN layout architecture, fiber trunk design, router security setups, and online UPS deployments for enterprise bank centers.",
      requirements: [
        "Bachelor's degree in CSE, EEE, or relevant Engineering branch",
        "Valid Cisco CCNA/CCNP, Huawei HCIP, or Juniper equivalent credentials",
        "Hands-on background with server racks, optical fiber cabling networks, and structured switches setups",
        "Willingness to travel to local datacenter sites during deployments"
      ]
    },
    {
      id: "j2",
      title: "CCTV & Integrated Security Specialist",
      department: "Security Surveillance Division",
      location: "Corporate Office, Pallabi, Mirpur, Dhaka",
      type: "Full-Time",
      experience: "3+ Years",
      salary: "Negotiable",
      desc: "Responsible for designing commercial IP CCTV, facial recognition portals, temperature biometric monitors, gate barriers, and centralized VMS servers for elite multi-floor buildings.",
      requirements: [
        "Diploma or B.Sc in Electronics, CSE, or Telecommunication IT",
        "Deep knowledge of Dahua, Hikvision, and Bosch enterprise CCTV cameras and storage clusters",
        "Expertise setup of local Access Control ports, hotel door smart locks, and gate systems",
        "Strong network troubleshooting and camera optics knowledge"
      ]
    },
    {
      id: "j3",
      title: "Technical Pre-Sales & Proposals Engineer",
      department: "Pre-Sales Technical Team",
      location: "Corporate Office, Pallabi, Mirpur, Dhaka",
      type: "Full-Time",
      experience: "2+ Years",
      salary: "Competitive Scope",
      desc: "Review corporate RFP documents, construct detailed product BOM databases, design professional PDF system designs, and coordinate layouts directly with product brands.",
      requirements: [
        "Excellent written and vocal Bengali & English client skills",
        "Strong expertise in AutoCAD, MS Visio, and Excel calculation tables",
        "Quick technical understanding over complete IT, video audio, or data storage lines",
        "Ability to work dynamically with tight corporate tender deadlines"
      ]
    }
  ];

  const benefits = [
    { title: "Continuous Technical Growth", desc: "Co-sponsored professional IT certifications (Cisco, Hikvision, Fortinet) to elevate technical expertise." },
    { title: "Balanced Work Culture", desc: "Honesty and discipline-driven environment with supportive colleagues and a cooperative team." },
    { title: "Health & Care Benefits", desc: "Comprehensive health allowances, festive bonuses, and continuous on-site personal security guards." },
    { title: "Cutting-Edge Tech Stack", desc: "Get hands-on daily deployment experience with premium global enterprise technology systems." }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      alert("Please fill in all primary fields (Name, Email, Phone).");
      return;
    }
    setIsSubmitted(true);
  };

  return (
    <section className="py-16 bg-white min-h-screen">
      <PageBanner title="Career" />
      <div className="max-w-7xl mx-auto px-4 md:px-8">

        {/* Culture Intro */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20 bg-slate-50/50 p-8 rounded-3xl border border-slate-100">
          <ScrollReveal direction="right" duration={0.8}>
            <div>
              <span className="text-indigo-600 font-bold text-xs uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-full mb-4 inline-block">
                Our Work Ethics
              </span>
              <h2 className="text-3xl font-extrabold text-[#243D7A] mb-6">
                Learn, Innovate & Grow Together with Absolute Integrity
              </h2>
              <div className="prose prose-slate text-slate-600 text-sm leading-relaxed mb-6 space-y-4">
                <p>
                  Inspired by the vision of our leadership, we believe that the true foundation of our mutual success rests upon the steady, proactive development of our human talent. When integers in our team learn, grow, and upgrade daily, <span className="font-semibold text-slate-800">Cloud Technologies</span> blooms alongside them.
                </p>
                <p>
                  We highly value **honesty, discipline, versatile engineering skills, and a rigorous commitment to corporate quality**. Whether configuring a local enterprise datacentre, installing sound platforms, or setting dynamic AI CCTV systems, our employees work as a unified force of modern innovators.
                </p>
              </div>
              <div className="flex gap-4 items-center bg-indigo-50/60 p-4 rounded-2xl border border-indigo-100/30 font-sans">
                <Sparkles className="w-6 h-6 text-indigo-600 flex-shrink-0" />
                <p className="text-xs font-bold text-indigo-950 leading-normal">
                  "Growth is a collective voyage. We reward team curiosity and invest heavily in continuous field-engineered validations."
                </p>
              </div>
            </div>
          </ScrollReveal>
          
          <ScrollReveal direction="left" duration={0.8} className="h-full">
            <div className="relative rounded-2xl overflow-hidden shadow-lg h-80 lg:h-96">
              <img 
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1200&auto=format&fit=crop" 
                alt="Team collaboration" 
                className="w-full h-full object-cover" 
                referrerPolicy="no-referrer"
              />
            </div>
          </ScrollReveal>
        </div>

        {/* Benefits Grid */}
        <div className="mb-20">
          <ScrollReveal direction="up" duration={0.6}>
            <h2 className="text-2xl md:text-3xl font-bold text-[#243D7A] text-center mb-4">Why Work with Us?</h2>
            <p className="text-slate-500 text-sm text-center mb-12 max-w-xl mx-auto">Explore the resources, growth environments, and professional incentives we supply across our national divisions.</p>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, i) => (
              <ScrollReveal
                key={i}
                direction="up"
                duration={0.6}
                delay={i * 0.1}
                className="flex h-full"
              >
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:border-slate-200 transition-all w-full">
                  <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-4 font-bold">
                    {i + 1}
                  </div>
                  <h4 className="font-bold text-slate-900 text-base mb-2">{benefit.title}</h4>
                  <p className="text-slate-600 text-xs leading-relaxed">{benefit.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Jobs & Form Area */}
        <div className="grid lg:grid-cols-12 gap-12">
          {/* Active Job Openings List */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <ScrollReveal direction="right" duration={0.6}>
              <h3 className="text-2xl font-bold text-[#243D7A] mb-2 flex items-center gap-2">
                <Briefcase className="w-6 h-6 text-[#243D7A]" />
                Active Openings
              </h3>
              <p className="text-slate-500 text-xs mb-4">We are actively sourcing talented professionals to join our offices and field engineering sections.</p>
            </ScrollReveal>

            {jobs.map((job, idx) => (
              <ScrollReveal
                key={job.id}
                direction="up"
                duration={0.6}
                delay={idx * 0.1}
              >
                <div id={job.id} className="bg-slate-50/50 hover:bg-slate-50 p-6 rounded-2xl border border-slate-100 transition-all flex flex-col gap-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="text-[9px] uppercase font-bold tracking-wider bg-indigo-100 text-indigo-800 px-2.5 py-0.5 rounded-md">
                        {job.department}
                      </span>
                      <span className="text-[9px] uppercase font-bold tracking-wider bg-slate-200 text-slate-700 px-2.5 py-0.5 rounded-md">
                        {job.type}
                      </span>
                    </div>
                    <h4 className="text-xl font-bold text-slate-900 mb-1">{job.title}</h4>
                    
                    <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-500 mb-3">
                      <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-slate-400" />{job.location}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-slate-400" />Exp: {job.experience}</span>
                    </div>

                    <p className="text-slate-600 text-xs leading-relaxed mb-4">
                      {job.desc}
                    </p>
                  </div>

                  <div className="border-t border-slate-200/50 pt-4">
                    <h5 className="text-xs font-bold text-slate-800 mb-2">Requirements:</h5>
                    <ul className="flex flex-col gap-1.5 text-xs text-slate-600 pl-4 list-disc">
                      {job.requirements.map((req, rid) => (
                        <li key={rid}>{req}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex justify-end pt-2">
                    <button 
                      onClick={() => {
                        setFormData(prev => ({ ...prev, position: job.title }));
                        const element = document.getElementById("apply-form");
                        if (element) {
                          element.scrollIntoView({ behavior: "smooth" });
                        }
                      }}
                      className="flex items-center gap-1 text-xs font-bold text-indigo-700 hover:text-indigo-800 hover:underline cursor-pointer"
                    >
                      Apply for this Job
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Quick Apply Form Section */}
          <ScrollReveal direction="left" duration={0.8} className="lg:col-span-5 h-full">
            <div id="apply-form" className="bg-slate-50 p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm sticky top-28">
              <h3 className="text-xl font-bold text-[#243D7A] mb-2 flex items-center gap-2">
                <Send className="w-5 h-5 text-indigo-600" />
                Quick Apply
              </h3>
              <p className="text-slate-500 text-xs mb-6">Can't find a matching job? Submit your details directly to our general HR talent pool.</p>

              {isSubmitted ? (
                <div className="bg-indigo-50 border border-indigo-100 p-6 rounded-2xl text-center flex flex-col items-center gap-3">
                  <div className="w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">
                    ✓
                  </div>
                  <h4 className="font-bold text-slate-900 text-base">Application Submitted!</h4>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    Thank you for applying. Our talent acquisition manager will review your details and contact you via phone or email if your skills match our vacancies.
                  </p>
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="mt-2 text-xs font-bold text-indigo-600 hover:underline cursor-pointer"
                  >
                    Apply another position
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5 ml-1">Full Name *</label>
                    <input 
                      type="text" 
                      name="name" 
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name" 
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:outline-none transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5 ml-1">Email Address *</label>
                      <input 
                        type="email" 
                        name="email" 
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email address" 
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5 ml-1">Phone Number *</label>
                      <input 
                        type="tel" 
                        name="phone" 
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Enter your mobile phone number" 
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5 ml-1">Target Position</label>
                    <select 
                      name="position"
                      value={formData.position}
                      onChange={handleInputChange}
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:border-indigo-500 focus:outline-none transition-all"
                    >
                      <option>Senior Network Architect</option>
                      <option>CCTV & Integrated Security Specialist</option>
                      <option>Technical Pre-Sales & Proposals Engineer</option>
                      <option>General HR / Talent Pool Application</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5 ml-1">Relevant Experience</label>
                    <select 
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:border-indigo-500 focus:outline-none transition-all"
                    >
                      <option>Fresh Graduate / Entry Level</option>
                      <option>1-3 Years</option>
                      <option>3-5 Years</option>
                      <option>5+ Years</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5 ml-1">Resume link / PDF drive portal</label>
                    <input 
                      type="url" 
                      name="resumeUrl"
                      value={formData.resumeUrl}
                      onChange={handleInputChange}
                      placeholder="Enter your resume link" 
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5 ml-1">Cover Note / Introduce yourself</label>
                    <textarea 
                      name="coverLetter"
                      rows={3}
                      value={formData.coverLetter}
                      onChange={handleInputChange}
                      placeholder="Enter your cover letter details" 
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:outline-none transition-all resize-none"
                    />
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-[#2E6FA8] hover:bg-[#243D7A] text-white font-extrabold text-xs py-3.5 rounded-xl uppercase tracking-wider transition-all shadow-md active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer h-12"
                  >
                    <Send className="w-4 h-4 ml-1" />
                    Submit Application
                  </button>
                </form>
              )}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Solutions from "./components/Solutions";
import Brands from "./components/Brands";
import Clients from "./components/Clients";
import ClientsPage from "./components/ClientsPage";
import BrandsPage from "./components/BrandsPage";
import RunningProjectsPage from "./components/RunningProjectsPage";
import CompletedProjectsPage from "./components/CompletedProjectsPage";
import AboutPage from "./components/AboutPage";
import ChairmanMessagePage from "./components/ChairmanMessagePage";
import MDMessagePage from "./components/MDMessagePage";
import VisionMissionPage from "./components/VisionMissionPage";
import ManagementInfoPage from "./components/ManagementInfoPage";
import WhyChooseUsPage from "./components/WhyChooseUsPage";
import Testimonial from "./components/Testimonial";
import Stats from "./components/Stats";
import Contact from "./components/Contact";
import News from "./components/News";
import Footer from "./components/Footer";
import VideoGallery from "./components/VideoGallery";
import PhotoGallery from "./components/PhotoGallery";
import SolutionDetailPage from "./components/SolutionDetailPage";
import CSRPage from "./components/CSRPage";
import CareerPage from "./components/CareerPage";
import PrivacyPolicyPage from "./components/PrivacyPolicyPage";
import TermsOfUsePage from "./components/TermsOfUsePage";
import AdminPanel from "./components/AdminPanel";
import { dataStore } from "./utils/dataStore";
import Preloader from "./components/Preloader";
import CustomCursor from "./components/CustomCursor";

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>("home");

  // Synchronize dynamic Website Title and Favicon from dataStore
  useEffect(() => {
    const updateMetadata = () => {
      const meta = dataStore.getSiteMetadata();
      if (meta.siteTitle) {
        document.title = meta.siteTitle;
      }
      if (meta.faviconUrl) {
        let link: HTMLLinkElement | null = document.querySelector("link[rel~='icon']");
        if (!link) {
          link = document.createElement("link");
          link.rel = "icon";
          document.head.appendChild(link);
        }
        link.href = meta.faviconUrl;
      }
    };

    updateMetadata();
    window.addEventListener("datastore-update", updateMetadata);
    return () => window.removeEventListener("datastore-update", updateMetadata);
  }, []);

  // Background site_data.json auto-synchronization for Visitors upon mounting
  useEffect(() => {
    dataStore.syncWithSiteDataJson().then((res) => {
      if (res.success) {
        console.log("Synchronized active dataset from cPanel site_data.json successfully.");
      }
    }).catch((e) => {
      console.warn("Automatic backup site_data.json sync skipped or file not uploaded.", e);
    });
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      let hash = window.location.hash;
      
      // Normalize hash (e.g., #contact -> contact, #/contact -> contact)
      let pageKey = "home";
      if (hash) {
        pageKey = hash.replace(/^#\/?/, "");
      } else {
        // Fallback to checking pathname in case they landed on a pathname URL
        const path = window.location.pathname;
        const cleanPath = path.replace(/^\//, "");
        if (cleanPath && cleanPath !== "index.html") {
          pageKey = cleanPath;
        }
      }

      if (!pageKey) pageKey = "home";

      const performScroll = (options: ScrollToOptions) => {
        window.scrollTo(options);
      };

      if (pageKey === "home") {
        setCurrentPage("home");
        performScroll({ top: 0, behavior: "smooth" });
      } else if (pageKey === "admin") {
        setCurrentPage("admin");
        performScroll({ top: 0, behavior: "smooth" });
      } else if (pageKey === "contact") {
        setCurrentPage("contact");
        performScroll({ top: 0, behavior: "smooth" });
      } else if (pageKey === "news") {
        setCurrentPage("news");
        performScroll({ top: 0, behavior: "smooth" });
      } else if (pageKey === "video-gallery") {
        setCurrentPage("video-gallery");
        performScroll({ top: 0, behavior: "smooth" });
      } else if (pageKey === "photo-gallery") {
        setCurrentPage("photo-gallery");
        performScroll({ top: 0, behavior: "smooth" });
      } else if (pageKey === "clients") {
        setCurrentPage("clients");
        performScroll({ top: 0, behavior: "smooth" });
      } else if (pageKey === "running-projects") {
        setCurrentPage("running-projects");
        performScroll({ top: 0, behavior: "smooth" });
      } else if (pageKey === "completed-projects") {
        setCurrentPage("completed-projects");
        performScroll({ top: 0, behavior: "smooth" });
      } else if (pageKey === "about") {
        setCurrentPage("about");
        performScroll({ top: 0, behavior: "smooth" });
      } else if (pageKey === "chairman") {
        setCurrentPage("chairman");
        performScroll({ top: 0, behavior: "smooth" });
      } else if (pageKey === "md") {
        setCurrentPage("md");
        performScroll({ top: 0, behavior: "smooth" });
      } else if (pageKey === "vision") {
        setCurrentPage("vision");
        performScroll({ top: 0, behavior: "smooth" });
      } else if (pageKey === "management") {
        setCurrentPage("management");
        performScroll({ top: 0, behavior: "smooth" });
      } else if (pageKey === "why-choose-us") {
        setCurrentPage("why-choose-us");
        performScroll({ top: 0, behavior: "smooth" });
      } else if (pageKey === "csr") {
        setCurrentPage("csr");
        performScroll({ top: 0, behavior: "smooth" });
      } else if (pageKey === "career") {
        setCurrentPage("career");
        performScroll({ top: 0, behavior: "smooth" });
      } else if (pageKey === "privacy-policy") {
        setCurrentPage("privacy-policy");
        performScroll({ top: 0, behavior: "smooth" });
      } else if (pageKey === "terms-of-use") {
        setCurrentPage("terms-of-use");
        performScroll({ top: 0, behavior: "smooth" });
      } else if (pageKey === "brands") {
        setCurrentPage("brands");
        performScroll({ top: 0, behavior: "smooth" });
      } else if (Object.keys(dataStore.getSolutions()).includes(pageKey)) {
        setCurrentPage(pageKey);
      } else {
        setCurrentPage("home");
      }
    };

    // Initialize on load
    handleHashChange();

    window.addEventListener("hashchange", handleHashChange);
    window.addEventListener("popstate", handleHashChange);
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      window.removeEventListener("popstate", handleHashChange);
    };
  }, []);

  const [loadTrigger, setLoadTrigger] = useState(0);

  useEffect(() => {
    setLoadTrigger((prev) => prev + 1);
    // Keep desktop and mobile experience flawless by instantly scrolling to the top on page transition
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [currentPage]);

  if (currentPage === "admin") {
    return (
      <>
        <Preloader key={`admin-preloader-${loadTrigger}`} />
        <AdminPanel />
      </>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800 antialiased selection:bg-indigo-500 selection:text-white">
      {/* Premium Desktop Cursor Follower */}
      <CustomCursor />

      {/* Page Preloader */}
      <Preloader key={`site-preloader-${loadTrigger}`} />

      {/* Navigation Header */}
      <Header />

      {currentPage === "home" ? (
        <main className="pt-0">
          {/* Hero Carousel */}
          <Hero />

          {/* About "Our Company" */}
          <About />

          {/* Services & Solutions */}
          <Solutions />

          {/* Brand partners */}
          <Brands />

          {/* Client endorsements */}
          <Clients />

          {/* Dynamic Reviews / Testimonial carousel */}
          <Testimonial />

          {/* Operational Statistics */}
          <Stats />
        </main>
      ) : currentPage === "contact" ? (
        <main className="pt-24 sm:pt-28">
          {/* Real dedicated Contact Us Page Section matching the design photo */}
          <Contact />
        </main>
      ) : currentPage === "video-gallery" ? (
        <main className="pt-24 sm:pt-28">
          <VideoGallery />
        </main>
      ) : currentPage === "photo-gallery" ? (
        <main className="pt-24 sm:pt-28">
          <PhotoGallery />
        </main>
      ) : currentPage === "clients" ? (
        <main className="pt-24 sm:pt-28">
           <ClientsPage />
        </main>
      ) : currentPage === "brands" ? (
        <main className="pt-24 sm:pt-28">
           <BrandsPage />
        </main>
      ) : currentPage === "running-projects" ? (
        <main className="pt-24 sm:pt-28">
           <RunningProjectsPage />
        </main>
      ) : currentPage === "completed-projects" ? (
        <main className="pt-24 sm:pt-28">
           <CompletedProjectsPage />
        </main>
      ) : currentPage === "about" ? (
        <main className="pt-24 sm:pt-28">
           <AboutPage />
        </main>
      ) : currentPage === "chairman" ? (
        <main className="pt-24 sm:pt-28">
           <ChairmanMessagePage />
        </main>
      ) : currentPage === "md" ? (
        <main className="pt-24 sm:pt-28">
           <MDMessagePage />
        </main>
      ) : currentPage === "vision" ? (
        <main className="pt-24 sm:pt-28">
           <VisionMissionPage />
        </main>
      ) : currentPage === "management" ? (
        <main className="pt-24 sm:pt-28">
           <ManagementInfoPage />
        </main>
      ) : currentPage === "why-choose-us" ? (
        <main className="pt-24 sm:pt-28">
           <WhyChooseUsPage />
        </main>
      ) : currentPage === "csr" ? (
        <main className="pt-24 sm:pt-28">
           <CSRPage />
        </main>
      ) : currentPage === "career" ? (
        <main className="pt-24 sm:pt-28">
           <CareerPage />
        </main>
      ) : currentPage === "privacy-policy" ? (
        <main className="pt-24 sm:pt-28">
           <PrivacyPolicyPage />
        </main>
      ) : currentPage === "terms-of-use" ? (
        <main className="pt-24 sm:pt-28">
           <TermsOfUsePage />
        </main>
      ) : Object.keys(dataStore.getSolutions()).includes(currentPage) ? (
        <main className="pt-24 sm:pt-28">
          <SolutionDetailPage solutionId={currentPage} />
        </main>
      ) : (
        <main className="pt-24 sm:pt-28">
          {/* Real dedicated News Page Section matching the design photo */}
          <News />
        </main>
      )}

      {/* Contact information & Footer controls */}
      <Footer />
    </div>
  );
}


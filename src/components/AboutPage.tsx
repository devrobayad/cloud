import React from "react";
import About from "./About";
import PageBanner from "./PageBanner";

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen py-6">
      <PageBanner title="About Us" />
      <About />
    </div>
  );
}

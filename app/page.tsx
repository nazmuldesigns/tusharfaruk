import React from "react";
import Sidebar from "@/components/layout/Sidebar";
import TopNav from "@/components/layout/TopNav";
import HeroSection from "@/components/sections/HeroSection";
import ServicesSection from "@/components/sections/ServicesSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import MetricsBanner from "@/components/sections/MetricsBanner";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import ContactSection from "@/components/sections/ContactSection";
import GradientOrb from "@/components/shared/GradientOrb";
import ScrollProgressBar from "@/components/shared/ScrollProgressBar";
import PageTransition from "@/components/shared/PageTransition";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0B0F19] text-white relative selection:bg-pink-500 selection:text-white">
      {/* Top Neon Scroll Progress Indicator */}
      <ScrollProgressBar />

      {/* Background Ambient Glow Orbs with Breathing Pulse */}
      <GradientOrb
        color="pink-purple"
        size="xl"
        className="top-0 right-10 opacity-25 pointer-events-none animate-pulse-glow"
      />
      <GradientOrb
        color="purple-blue"
        size="lg"
        className="top-[700px] left-80 opacity-20 pointer-events-none animate-pulse-glow"
      />
      <GradientOrb
        color="cyan-blue"
        size="lg"
        className="bottom-40 right-10 opacity-20 pointer-events-none animate-pulse-glow"
      />

      <div className="flex min-h-screen">
        {/* Desktop Fixed Left Sidebar */}
        <div className="hidden lg:block w-72 h-screen fixed left-0 top-0 bottom-0 shrink-0 z-30">
          <Sidebar />
        </div>

        {/* Main Content Area */}
        <main className="flex-1 w-full min-w-0 lg:pl-72 flex flex-col">
          {/* Sticky Top Nav */}
          <TopNav />

          {/* Page Sections Wrapped with Smooth Entrance */}
          <PageTransition className="flex-1 pb-20 lg:pb-16 space-y-4">
            <HeroSection />
            <ServicesSection />
            <ProjectsSection />
            <MetricsBanner />
            <TestimonialsSection />
            <ContactSection />
          </PageTransition>

          {/* Minimal Footer */}
          <footer className="border-t border-[#1E2540] py-6 px-8 text-center text-xs text-gray-400 mb-12 lg:mb-0">
            <p>© {new Date().getFullYear()} Mark Davis. All rights reserved. Crafted with precision.</p>
          </footer>
        </main>
      </div>
    </div>
  );
}

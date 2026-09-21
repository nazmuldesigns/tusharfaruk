"use client";

import React, { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import { ArrowRight, Play, X, Sparkles } from "lucide-react";
import { personalInfo } from "@/lib/data";
import { ImageWithSkeleton } from "@/components/shared/ImageWithSkeleton";
import { InfiniteLogoMarquee } from "./ClientLogos";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

// Adobe Illustrator Badge Component (Floating Top Corner)
const IllustratorBadge = () => (
  <motion.div
    className="absolute -top-4 -right-2 sm:-top-5 sm:-right-5 z-20 flex items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-[#13182C]/90 backdrop-blur-xl border border-amber-500/30 shadow-[0_8px_30px_rgba(255,154,0,0.25)] group cursor-default select-none"
    animate={{ y: [0, -8, 0], rotate: [0, 1.5, 0] }}
    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
  >
    {/* Ai Vector Icon */}
    <div className="w-8 h-8 rounded-xl bg-[#261300] border border-[#FF9A00]/50 flex items-center justify-center shadow-inner shrink-0 group-hover:scale-105 transition-transform">
      <span className="font-black text-[#FF9A00] text-sm tracking-tighter">Ai</span>
    </div>
    <div className="text-left pr-1 hidden xs:block">
      <p className="text-[11px] font-extrabold text-white leading-tight flex items-center gap-1">
        <span>Illustrator</span>
        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
      </p>
      <p className="text-[9px] font-semibold text-amber-300/80 uppercase tracking-wider">Vector Master</p>
    </div>
  </motion.div>
);

// Adobe Photoshop Badge Component (Bottom Corner)
const PhotoshopBadge = () => (
  <motion.div
    className="absolute -bottom-4 -left-2 sm:-bottom-5 sm:-left-5 z-20 flex items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-[#13182C]/90 backdrop-blur-xl border border-sky-500/30 shadow-[0_8px_30px_rgba(49,168,255,0.25)] group cursor-default select-none"
    animate={{ y: [0, 6, 0], rotate: [0, -1.5, 0] }}
    transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
  >
    {/* Ps Vector Icon */}
    <div className="w-8 h-8 rounded-xl bg-[#001826] border border-[#31A8FF]/50 flex items-center justify-center shadow-inner shrink-0 group-hover:scale-105 transition-transform">
      <span className="font-black text-[#31A8FF] text-sm tracking-tighter">Ps</span>
    </div>
    <div className="text-left pr-1 hidden xs:block">
      <p className="text-[11px] font-extrabold text-white leading-tight flex items-center gap-1">
        <span>Photoshop</span>
        <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
      </p>
      <p className="text-[9px] font-semibold text-sky-300/80 uppercase tracking-wider">Visual &amp; Brand Art</p>
    </div>
  </motion.div>
);

export const HeroSection: React.FC = () => {
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [heroData, setHeroData] = useState({
    greeting: personalInfo.greeting,
    name: personalInfo.name,
    title: personalInfo.title,
    tagline: personalInfo.tagline,
    bio: personalInfo.bio,
    heroPortrait: personalInfo.heroPortrait,
    introVideoUrl: personalInfo.introVideoUrl,
    experienceYears: personalInfo.experienceYears,
  });

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((resData) => {
        if (resData.success && resData.data?.hero) {
          setHeroData((prev) => ({
            ...prev,
            ...resData.data.hero,
          }));
        }
      })
      .catch(() => {
        // Fallback to personalInfo
      });
  }, []);

  return (
    <section id="home" className="relative pt-4 pb-14 lg:py-16 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Text Content */}
          <motion.div
            className="lg:col-span-7 space-y-6 z-10"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Greeting Tag */}
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2">
              <span className="text-xs font-extrabold tracking-widest text-[#FF3B81] uppercase flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{heroData.greeting}</span>
              </span>
            </motion.div>

            {/* Name Heading */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]"
            >
              {heroData.name.split(" ")[0]}{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#A855F7] via-[#818CF8] to-[#38BDF8]">
                {heroData.name.split(" ").slice(1).join(" ") || "Faruk"}
              </span>
            </motion.h1>

            {/* Tagline */}
            <motion.h2
              variants={itemVariants}
              className="text-2xl sm:text-3xl font-semibold text-gray-100 leading-snug"
            >
              I Craft Iconic Brands &amp; Visual Systems That Make an{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF3B81] via-[#EC4899] to-[#A855F7] font-bold">
                Impact.
              </span>
            </motion.h2>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-sm sm:text-base text-[#94A3B8] max-w-xl leading-relaxed font-normal"
            >
              {heroData.bio}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#portfolio"
                className="gradient-btn-primary inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full text-xs sm:text-sm font-bold text-white shadow-glow-sm hover:shadow-glow-pink transition-all duration-200"
              >
                <span>View My Work</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={() => setVideoModalOpen(true)}
                aria-label="Watch intro video"
                className="inline-flex items-center gap-2.5 px-5 py-3.5 rounded-full text-xs sm:text-sm font-semibold text-gray-200 bg-white/[0.04] border border-white/[0.12] hover:bg-white/[0.08] hover:border-purple-500/40 transition-all duration-200 group"
              >
                <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-pink-500/20 group-hover:text-pink-400 transition-colors">
                  <Play className="w-3 h-3 fill-current ml-0.5 text-pink-400" />
                </div>
                <span>Watch Intro</span>
              </button>
            </motion.div>
          </motion.div>

          {/* Right Hero Image Artwork with Uiverse Magic Card Glowing Gradient Frame & Adobe Badges */}
          <motion.div
            className="lg:col-span-5 relative flex justify-center items-center py-4"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Magic Card with Glowing Colorful Gradient Border & Ambient Underglow */}
            <div className="magic-hero-card flex items-center justify-center">
              {/* Adobe Illustrator Tool Badge (Floating Top Corner) */}
              <IllustratorBadge />

              {/* Adobe Photoshop Tool Badge (Bottom Corner) */}
              <PhotoshopBadge />

              {/* Inner Card Container Housing Hero Portrait Image */}
              <div className="magic-card-inner shadow-2xl">
                <ImageWithSkeleton
                  src={heroData.heroPortrait}
                  alt={heroData.name}
                  fill
                  priority
                  sizes="(max-width: 768px) 290px, 340px"
                  wrapperClassName="w-full h-full rounded-[1.75rem]"
                  className="object-cover object-top scale-102 hover:scale-108 transition-transform duration-700"
                />
              </div>

              {/* Experience Badge (Side Accent) */}
              <motion.div
                className="absolute -right-3 bottom-14 z-20 px-3.5 py-2.5 rounded-2xl bg-[#13182C]/95 backdrop-blur-md border border-white/20 shadow-xl flex flex-col items-center justify-center min-w-[90px]"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                <span className="text-lg font-black text-white tracking-tight">
                  {heroData.experienceYears}
                </span>
                <span className="text-[9px] font-medium text-[#CBD5E1] text-center leading-tight">
                  Years of<br />Excellence
                </span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Tools & Trusted Clients Continuous Animated Marquee */}
        <motion.div
          className="mt-16 pt-8 border-t border-[#1E2540]"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
            <p className="text-xs font-bold uppercase tracking-wider text-[#64748B] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
              <span>POWERED BY INDUSTRY TOOLS &amp; TRUSTED BY GLOBAL CLIENTS</span>
            </p>
            <span className="text-[11px] text-gray-500 font-mono hidden sm:inline-block">
              Figma • Illustrator • Photoshop • Webflow • Brands
            </span>
          </div>

          {/* Smooth Right to Left Infinite Marquee with Soft Edge Opacity Fade */}
          <InfiniteLogoMarquee />
        </motion.div>
      </div>

      {/* Video Modal (Configurable from Admin Panel) */}
      {videoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-2xl bg-[#13182C] rounded-2xl border border-white/15 p-6 shadow-2xl">
            <button
              onClick={() => setVideoModalOpen(false)}
              aria-label="Close intro video"
              className="absolute top-4 right-4 text-gray-400 hover:text-white p-1 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF3B81] to-[#A855F7]">
                {heroData.name}
              </span>
              <span>— Brand Design Philosophy</span>
            </h3>
            <div className="relative aspect-video rounded-xl bg-black/60 overflow-hidden flex items-center justify-center border border-white/10">
              <iframe
                className="w-full h-full"
                src={heroData.introVideoUrl || "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1"}
                title="Intro Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default HeroSection;

"use client";

import React, { useState } from "react";
import { motion, Variants } from "framer-motion";
import { ArrowRight, Play, X, Sparkles } from "lucide-react";
import { personalInfo } from "@/lib/data";
import { ImageWithSkeleton } from "@/components/shared/ImageWithSkeleton";
import {
  GoogleLogo,
  MicrosoftLogo,
  AirbnbLogo,
  SlackLogo,
  DropboxLogo,
} from "./ClientLogos";

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

export const HeroSection: React.FC = () => {
  const [videoModalOpen, setVideoModalOpen] = useState(false);

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
                <span>{personalInfo.greeting}</span>
              </span>
            </motion.div>

            {/* Name Heading */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]"
            >
              Mark{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#A855F7] via-[#818CF8] to-[#38BDF8]">
                Davis
              </span>
            </motion.h1>

            {/* Tagline */}
            <motion.h2
              variants={itemVariants}
              className="text-2xl sm:text-3xl font-semibold text-gray-100 leading-snug"
            >
              I Design Experiences That Make an{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF3B81] via-[#EC4899] to-[#A855F7] font-bold">
                Impact.
              </span>
            </motion.h2>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-sm sm:text-base text-[#94A3B8] max-w-xl leading-relaxed font-normal"
            >
              {personalInfo.bio}
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

          {/* Right Hero Image Artwork with Glowing Backdrop */}
          <motion.div
            className="lg:col-span-5 relative flex justify-center items-center"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative w-[280px] h-[340px] sm:w-[350px] sm:h-[420px] flex items-center justify-center">
              {/* Vibrant Dual Blue-Purple-Pink Glowing Neon Backdrop */}
              <div className="absolute inset-2 rounded-full bg-gradient-to-tr from-[#38BDF8] via-[#8B5CF6] to-[#FF3B81] opacity-75 blur-2xl animate-pulse-glow" />
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#FF3B81] via-[#A855F7] to-[#38BDF8] opacity-50" />

              {/* Orbiting dashed accent ring */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                viewBox="0 0 350 420"
                fill="none"
              >
                <ellipse
                  cx="175"
                  cy="210"
                  rx="155"
                  ry="185"
                  stroke="url(#heroRingGrad)"
                  strokeWidth="1.5"
                  strokeDasharray="8 12"
                  className="opacity-40 animate-spin"
                  style={{ animationDuration: "35s" }}
                />
                <defs>
                  <linearGradient id="heroRingGrad" x1="0" y1="0" x2="350" y2="420">
                    <stop offset="0%" stopColor="#FF3B81" />
                    <stop offset="50%" stopColor="#A855F7" />
                    <stop offset="100%" stopColor="#38BDF8" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Portrait Image with Shimmer Decode */}
              <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-white/20 shadow-2xl z-10 bg-[#13182C]">
                <ImageWithSkeleton
                  src={personalInfo.heroPortrait}
                  alt={personalInfo.name}
                  fill
                  priority
                  sizes="(max-width: 768px) 280px, 350px"
                  wrapperClassName="w-full h-full rounded-full"
                  className="object-cover object-top scale-105 hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Floating 5+ Years Badge */}
              <motion.div
                className="absolute -right-3 bottom-12 z-20 px-4 py-3 rounded-2xl bg-[#13182C]/90 backdrop-blur-md border border-white/15 shadow-xl flex flex-col items-center justify-center min-w-[100px]"
                animate={{ y: [0, -7, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <span className="text-xl font-black text-white tracking-tight">
                  {personalInfo.experienceYears}
                </span>
                <span className="text-[10px] font-medium text-[#CBD5E1] text-center leading-tight">
                  Years of<br />Experience
                </span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Trusted By Section with High-Fidelity SVG Logos */}
        <motion.div
          className="mt-16 pt-8 border-t border-[#1E2540]"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <p className="text-xs font-semibold uppercase tracking-wider text-[#64748B] mb-6">
            Trusted by clients worldwide
          </p>
          <div className="flex flex-wrap items-center justify-between gap-8 opacity-75 hover:opacity-100 transition-opacity text-gray-400">
            <div className="hover:text-white transition-colors cursor-default" title="Google">
              <GoogleLogo />
            </div>
            <div className="hover:text-white transition-colors cursor-default" title="Microsoft">
              <MicrosoftLogo />
            </div>
            <div className="hover:text-white transition-colors cursor-default" title="Airbnb">
              <AirbnbLogo />
            </div>
            <div className="hover:text-white transition-colors cursor-default" title="Slack">
              <SlackLogo />
            </div>
            <div className="hover:text-white transition-colors cursor-default" title="Dropbox">
              <DropboxLogo />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Video Modal */}
      {videoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-2xl bg-[#13182C] rounded-2xl border border-white/10 p-6 shadow-2xl">
            <button
              onClick={() => setVideoModalOpen(false)}
              aria-label="Close intro video"
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-bold text-white mb-4">Mark Davis - Design Philosophy</h3>
            <div className="relative aspect-video rounded-xl bg-black/50 overflow-hidden flex items-center justify-center">
              <iframe
                className="w-full h-full"
                src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1"
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

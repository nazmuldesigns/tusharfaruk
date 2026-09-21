"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { ArrowRight, ExternalLink, Sparkles } from "lucide-react";
import { Project } from "@/types";
import { fallbackProjects } from "@/lib/data";
import { ImageWithSkeleton } from "@/components/shared/ImageWithSkeleton";

const projectsContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const projectItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export const ProjectsSection: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>(fallbackProjects);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((resData) => {
        const list = resData.projects || resData.data;
        if (resData.success && Array.isArray(list) && list.length > 0) {
          setProjects(list);
        }
      })
      .catch((err) => {
        console.warn("Projects fetch error, using resilient fallback data:", err);
        setProjects(fallbackProjects);
      });
  }, []);

  // Categories extraction
  const categories = ["All", "Brand Identity", "Packaging Design", "Logo Design"];

  const filteredProjects = selectedCategory === "All"
    ? projects
    : projects.filter((p) => p.category?.toLowerCase() === selectedCategory.toLowerCase());

  // Show up to 15 projects in a 3x5 grid
  const displayedProjects = filteredProjects.slice(0, 15);

  return (
    <section id="portfolio" className="py-16 relative">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="space-y-1">
            <span className="text-xs font-extrabold tracking-widest text-[#FF3B81] uppercase flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>PORTFOLIO SHOWCASE</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Selected Brand &amp; Identity Works
            </h2>
          </div>

          <p className="text-xs text-gray-400 max-w-xs sm:text-right">
            Crafted with Adobe Illustrator, Photoshop &amp; Figma across 15+ curated case studies.
          </p>
        </motion.div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all shrink-0 ${
                selectedCategory === cat
                  ? "bg-gradient-to-r from-[#FF3B81] to-[#A855F7] text-white shadow-glow-sm"
                  : "bg-[#13182C] text-gray-400 hover:text-white border border-[#1E2540] hover:border-pink-500/30"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 3 Columns Grid (3 x 5 Rows = Up to 15 Projects) */}
        <motion.div
          key={selectedCategory}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={projectsContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {displayedProjects.map((project) => (
            <motion.div
              key={project._id || project.title}
              variants={projectItemVariants}
              whileHover={{ y: -6, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } }}
              className="group rounded-3xl bg-[#13182C] border border-[#1E2540] hover:border-pink-500/50 hover:bg-[#181F38] overflow-hidden flex flex-col transition-all duration-300 shadow-glow-card hover:shadow-[0_12px_35px_-10px_rgba(255,59,129,0.35)] cursor-pointer"
            >
              <Link href={`/projects/${project.slug || project._id}`} className="flex-1 flex flex-col">
                {/* Image Frame with Shimmer Load */}
                <div className="relative aspect-[4/3] w-full bg-[#181F38] overflow-hidden">
                  <ImageWithSkeleton
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    wrapperClassName="w-full h-full"
                    className="object-cover object-center group-hover:scale-106 transition-transform duration-700 ease-out"
                  />

                  {/* Hover overlay button */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                    <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-[#FF3B81] to-[#A855F7] text-white text-xs font-bold shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <span>View Behance Case Study</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>

                {/* Project Details */}
                <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Category Tag Pill */}
                    <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold bg-white/[0.06] text-pink-300 border border-pink-500/20 mb-2.5">
                      {project.category}
                    </span>

                    {/* Title & Subtitle */}
                    <h3 className="text-base font-bold text-white group-hover:text-pink-400 transition-colors line-clamp-1">
                      {project.title}
                    </h3>
                    <p className="text-xs text-[#94A3B8] font-normal line-clamp-2 mt-1 leading-relaxed">
                      {project.overview || project.subtitle}
                    </p>
                  </div>

                  {/* Tools Row */}
                  <div className="flex items-center justify-between pt-2 border-t border-white/[0.06] text-[11px] text-gray-400">
                    <span className="font-medium text-gray-300 truncate">
                      {project.tools?.slice(0, 2).join(" • ") || "Illustrator • Photoshop"}
                    </span>
                    <span className="inline-flex items-center gap-1 text-pink-400 font-semibold group-hover:translate-x-1 transition-transform shrink-0">
                      <span>Explore</span>
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;

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
      staggerChildren: 0.1,
    },
  },
};

const projectItemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export const ProjectsSection: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>(fallbackProjects);

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((resData) => {
        const list = resData.projects || resData.data;
        if (resData.success && list?.length) {
          setProjects(list);
        }
      })
      .catch(() => {
        setProjects(fallbackProjects);
      });
  }, []);

  return (
    <section id="portfolio" className="py-16 relative">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="space-y-1">
            <span className="text-xs font-extrabold tracking-widest text-[#FF3B81] uppercase flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>MY WORK</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Featured Projects
            </h2>
          </div>

          <a
            href="#portfolio"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-300 hover:text-pink-400 transition-colors group"
          >
            <span>View All Projects</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1 text-pink-400" />
          </a>
        </motion.div>

        {/* 4 Projects Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          variants={projectsContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {projects.map((project) => (
            <motion.div
              key={project._id || project.title}
              variants={projectItemVariants}
              whileHover={{ y: -6, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } }}
              className="group rounded-2xl bg-[#13182C] border border-[#1E2540] hover:border-pink-500/50 hover:bg-[#181F38] overflow-hidden flex flex-col transition-all duration-300 shadow-glow-card hover:shadow-[0_12px_35px_-10px_rgba(255,59,129,0.3)] cursor-pointer"
            >
              <Link href={`/projects/${project.slug || project._id}`} className="flex-1 flex flex-col">
                {/* Image Frame with Shimmer Load */}
                <div className="relative aspect-[4/3] w-full bg-[#181F38] overflow-hidden">
                  <ImageWithSkeleton
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    wrapperClassName="w-full h-full"
                    className="object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                  />

                  {/* Hover overlay button */}
                  <div className="absolute inset-0 bg-black/55 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#FF3B81] to-[#A855F7] text-white text-xs font-bold shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <span>View Case Study</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>

                {/* Project Details */}
                <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Category Tag Pill */}
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-white/[0.06] text-gray-300 border border-white/[0.1] mb-2 group-hover:border-pink-500/30 transition-colors">
                      {project.category}
                    </span>

                    {/* Title & Subtitle */}
                    <h3 className="text-sm font-bold text-white group-hover:text-pink-400 transition-colors truncate">
                      {project.title}
                    </h3>
                    <p className="text-xs text-[#94A3B8] font-normal line-clamp-1">{project.subtitle}</p>
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

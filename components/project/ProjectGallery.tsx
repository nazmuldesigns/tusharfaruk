"use client";

import React from "react";
import { motion } from "framer-motion";
import { ImageWithSkeleton } from "@/components/shared/ImageWithSkeleton";

interface ProjectGalleryProps {
  images?: string[];
  title: string;
  overview?: string;
  challenge?: string;
  solution?: string;
}

export const ProjectGallery: React.FC<ProjectGalleryProps> = ({
  images = [],
  title,
  overview,
  challenge,
  solution,
}) => {
  if (!images || images.length === 0) return null;

  return (
    <div className="w-full space-y-0 relative">
      {/* Editorial Narrative Block 1 */}
      {overview && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mx-auto px-6 py-12 lg:py-16 space-y-4 text-center"
        >
          <span className="text-xs font-extrabold tracking-widest text-[#FF3B81] uppercase">
            PROJECT OVERVIEW
          </span>
          <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-snug">
            Crafting the Next-Gen Digital Experience
          </h3>
          <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed max-w-2xl mx-auto">
            {overview}
          </p>
        </motion.div>
      )}

      {/* Behance-Style Image 1 (Full Bleed Showcase) */}
      {images[0] && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full aspect-[16/9] sm:aspect-[21/9] bg-[#13182C] overflow-hidden border-y border-[#1E2540]"
        >
          <ImageWithSkeleton
            src={images[0]}
            alt={`${title} Preview 1`}
            fill
            sizes="(max-width: 1200px) 100vw, 1400px"
            wrapperClassName="w-full h-full"
            className="object-cover object-center"
            priority
          />
        </motion.div>
      )}

      {/* Editorial Challenge & Solution Columns */}
      {(challenge || solution) && (
        <div className="max-w-5xl mx-auto px-6 py-12 lg:py-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          {challenge && (
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="p-6 rounded-2xl bg-[#13182C] border border-[#1E2540] space-y-3 shadow-glow-card"
            >
              <span className="text-xs font-bold tracking-wider text-purple-400 uppercase">
                THE CHALLENGE
              </span>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-normal">
                {challenge}
              </p>
            </motion.div>
          )}

          {solution && (
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="p-6 rounded-2xl bg-[#13182C] border border-[#1E2540] space-y-3 shadow-glow-card"
            >
              <span className="text-xs font-bold tracking-wider text-pink-400 uppercase">
                THE SOLUTION
              </span>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-normal">
                {solution}
              </p>
            </motion.div>
          )}
        </div>
      )}

      {/* Behance-Style Continuous Gallery Stream (Zero Gap / Continuous Flow) */}
      <div className="w-full space-y-0">
        {images.slice(1).map((imgUrl, idx) => (
          <motion.div
            key={imgUrl + idx}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6 }}
            className="relative w-full aspect-[16/10] sm:aspect-[21/9] bg-[#13182C] overflow-hidden border-b border-[#1E2540]/60 group"
          >
            <ImageWithSkeleton
              src={imgUrl}
              alt={`${title} Showcase ${idx + 2}`}
              fill
              sizes="(max-width: 1200px) 100vw, 1400px"
              wrapperClassName="w-full h-full"
              className="object-cover object-center group-hover:scale-[1.02] transition-transform duration-700"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProjectGallery;

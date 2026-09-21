"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { Smile, FolderCheck, Coffee, Trophy, LucideIcon } from "lucide-react";
import { metricsData } from "@/lib/data";

const iconMap: Record<string, LucideIcon> = {
  Smile,
  FolderCheck,
  Coffee,
  Trophy,
};

const statsContainerVariants: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.1,
    },
  },
};

const statsItemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
  },
};

export const MetricsBanner: React.FC = () => {
  return (
    <section className="py-8 relative">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <motion.div
          variants={statsContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="rounded-2xl p-6 sm:p-8 bg-gradient-to-r from-[#FF3B81] via-[#A855F7] via-[#6366F1] to-[#3B82F6] shadow-glow-md relative overflow-hidden group hover:shadow-[0_0_40px_rgba(255,59,129,0.4)] transition-shadow duration-500"
        >
          {/* Subtle noise/pattern overlay */}
          <div className="absolute inset-0 bg-white/5 mix-blend-overlay pointer-events-none" />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 items-center justify-between relative z-10">
            {metricsData.map((metric, index) => {
              const Icon = iconMap[metric.icon] || Smile;
              return (
                <motion.div
                  key={metric.label}
                  variants={statsItemVariants}
                  className={`flex items-center gap-3.5 sm:gap-4 ${
                    index > 0 ? "md:border-l md:border-white/25 md:pl-6" : ""
                  }`}
                >
                  {/* Icon */}
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white shrink-0 shadow-sm transition-transform group-hover:scale-105 duration-300">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>

                  {/* Numbers & Label */}
                  <div>
                    <h4 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-none">
                      {metric.value}
                    </h4>
                    <p className="text-[11px] sm:text-xs text-white/90 font-medium mt-1 leading-tight">
                      {metric.label}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MetricsBanner;

"use client";

import React, { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";
import { Rocket, Code, Smartphone, Sparkles, ArrowRight, LucideIcon } from "lucide-react";
import { Service } from "@/types";
import { fallbackServices } from "@/lib/data";

const iconMap: Record<string, LucideIcon> = {
  Rocket,
  Code,
  Smartphone,
  Sparkles,
};

const serviceBadgeStyles = [
  {
    bg: "bg-gradient-to-br from-[#FF3B81]/20 to-[#A855F7]/30",
    border: "border-pink-500/40",
    iconColor: "text-pink-400",
    glow: "bg-pink-600/25",
  },
  {
    bg: "bg-gradient-to-br from-[#38BDF8]/20 to-[#6366F1]/30",
    border: "border-cyan-500/40",
    iconColor: "text-cyan-400",
    glow: "bg-blue-600/25",
  },
  {
    bg: "bg-gradient-to-br from-[#FF3B81]/20 to-[#A855F7]/30",
    border: "border-purple-500/40",
    iconColor: "text-pink-400",
    glow: "bg-purple-600/25",
  },
  {
    bg: "bg-gradient-to-br from-[#38BDF8]/20 to-[#6366F1]/30",
    border: "border-cyan-500/40",
    iconColor: "text-cyan-400",
    glow: "bg-indigo-600/25",
  },
];

const cardContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardItemVariants: Variants = {
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

export const ServicesSection: React.FC = () => {
  const [services, setServices] = useState<Service[]>(fallbackServices);

  useEffect(() => {
    fetch("/api/services")
      .then((res) => res.json())
      .then((resData) => {
        const list = resData.services || resData.data;
        if (resData.success && list?.length) {
          setServices(list);
        }
      })
      .catch(() => {
        setServices(fallbackServices);
      });
  }, []);

  return (
    <section id="services" className="py-16 relative">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="space-y-1 mb-10"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-xs font-extrabold tracking-widest text-[#FF3B81] uppercase flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>WHAT I DO</span>
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Services I Offer
          </h2>
        </motion.div>

        {/* 4 Cards Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          variants={cardContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {services.map((service, index) => {
            const Icon = iconMap[service.icon] || Rocket;
            const style = serviceBadgeStyles[index % serviceBadgeStyles.length];

            return (
              <motion.div
                key={service._id || service.title}
                variants={cardItemVariants}
                whileHover={{ y: -6, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } }}
                className="group p-6 rounded-2xl bg-[#13182C] border border-[#1E2540] hover:border-purple-500/50 hover:bg-[#181F38] transition-all duration-300 flex flex-col justify-between relative overflow-hidden shadow-glow-card hover:shadow-[0_12px_35px_-10px_rgba(168,85,247,0.35)] cursor-pointer"
              >
                {/* Background glow on hover */}
                <div
                  className={`absolute -right-8 -top-8 w-28 h-28 rounded-full ${style.glow} blur-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none duration-500`}
                />

                <div className="space-y-4">
                  {/* Icon Badge */}
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 duration-300 border ${style.bg} ${style.border} ${style.iconColor} shadow-sm`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h3 className="text-base font-bold text-white mb-2 group-hover:text-pink-400 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs text-[#94A3B8] leading-relaxed font-normal">
                      {service.description}
                    </p>
                  </div>
                </div>

                {/* Footer Link */}
                <div className="pt-6 mt-2 border-t border-transparent group-hover:border-white/[0.05] transition-colors">
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-300 group-hover:text-white transition-colors"
                  >
                    <span>{service.linkText || "Learn More"}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-pink-400 transition-transform group-hover:translate-x-1.5 duration-200" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;

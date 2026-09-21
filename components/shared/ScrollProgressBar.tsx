"use client";

import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export const ScrollProgressBar: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-[#FF3B81] via-[#A855F7] via-[#6366F1] to-[#38BDF8] origin-left z-50 pointer-events-none shadow-[0_0_12px_rgba(255,59,129,0.7)]"
      style={{ scaleX }}
    />
  );
};

export default ScrollProgressBar;

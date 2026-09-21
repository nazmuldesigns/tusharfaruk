"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Sparkles } from "lucide-react";
import { Testimonial } from "@/types";
import { fallbackTestimonials } from "@/lib/data";
import { ImageWithSkeleton } from "@/components/shared/ImageWithSkeleton";

export const TestimonialsSection: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(fallbackTestimonials);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    fetch("/api/testimonials")
      .then((res) => res.json())
      .then((resData) => {
        const list = resData.testimonials || resData.data;
        if (resData.success && list?.length) {
          setTestimonials(list);
        }
      })
      .catch(() => {
        setTestimonials(fallbackTestimonials);
      });
  }, []);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="py-16 relative">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center space-y-1 mb-10"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-xs font-extrabold tracking-widest text-[#FF3B81] uppercase flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>TESTIMONIALS</span>
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            What Clients Say
          </h2>
        </motion.div>

        {/* Testimonials Carousel & Cards */}
        <div className="relative">
          {/* Prev Arrow Button */}
          <button
            onClick={handlePrev}
            aria-label="Previous testimonial"
            className="absolute -left-3 sm:-left-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-[#13182C] border border-[#1E2540] hover:border-pink-500/60 hover:bg-[#181F38] text-gray-300 hover:text-white flex items-center justify-center transition-all shadow-md hover:scale-110 active:scale-95"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* 3 Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 px-4 sm:px-6">
            {testimonials.map((item, index) => {
              const isActive = activeIndex === index;

              return (
                <motion.div
                  key={item._id || item.clientName}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.45, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => setActiveIndex(index)}
                  className={`p-6 rounded-2xl bg-[#13182C] border transition-all duration-300 flex flex-col justify-between relative shadow-glow-card cursor-pointer group ${
                    isActive
                      ? "border-pink-500/60 shadow-[0_10px_30px_-10px_rgba(255,59,129,0.3)] bg-[#171F38] scale-[1.02]"
                      : "border-[#1E2540] hover:border-purple-500/40 hover:bg-[#161B30]"
                  }`}
                >
                  <div className="space-y-4">
                    {/* Purple Quote Icon */}
                    <div className="text-purple-400 opacity-90 transition-transform group-hover:scale-110 duration-200">
                      <Quote className="w-6 h-6 fill-purple-400" />
                    </div>

                    {/* Quote Text */}
                    <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-normal">
                      &ldquo;{item.quote}&rdquo;
                    </p>
                  </div>

                  {/* Client Profile */}
                  <div className="flex items-center gap-3 pt-6 mt-4 border-t border-[#1E2540]">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-purple-500/40 shrink-0 shadow-sm">
                      <ImageWithSkeleton
                        src={item.avatar}
                        alt={item.clientName}
                        fill
                        sizes="40px"
                        wrapperClassName="w-full h-full rounded-full"
                        className="object-cover"
                      />
                    </div>
                    <div className="truncate">
                      <h4 className="text-xs font-bold text-white truncate group-hover:text-pink-400 transition-colors">
                        {item.clientName}
                      </h4>
                      <p className="text-[11px] text-[#94A3B8] truncate font-medium">
                        {item.clientRole}, {item.clientCompany}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Next Arrow Button */}
          <button
            onClick={handleNext}
            aria-label="Next testimonial"
            className="absolute -right-3 sm:-right-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-[#13182C] border border-[#1E2540] hover:border-pink-500/60 hover:bg-[#181F38] text-gray-300 hover:text-white flex items-center justify-center transition-all shadow-md hover:scale-110 active:scale-95"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

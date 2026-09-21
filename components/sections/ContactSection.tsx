"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, Phone, MapPin, CheckCircle2, AlertCircle, Loader2, Sparkles } from "lucide-react";
import { personalInfo } from "@/lib/data";

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [feedbackMsg, setFeedbackMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus("error");
      setFeedbackMsg("Please fill in all required fields.");
      return;
    }

    setStatus("loading");
    setFeedbackMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setStatus("success");
        setFeedbackMsg(
          data.telegramSent
            ? "Thank you! Your message has been sent and dispatched to Telegram."
            : "Thank you! Your message has been received successfully."
        );
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
        setFeedbackMsg(data.error || "Failed to send message. Please try again.");
      }
    } catch (err) {
      console.error("Submission error:", err);
      setStatus("error");
      setFeedbackMsg("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <section id="contact" className="py-16 relative">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left Gradient Card: Let's Work Together */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-4 p-8 rounded-2xl bg-gradient-to-br from-[#EC4899] via-[#A855F7] to-[#6366F1] shadow-glow-md text-white flex flex-col justify-between relative overflow-hidden group hover:shadow-[0_0_35px_rgba(236,72,153,0.4)] transition-shadow duration-500"
          >
            <div className="space-y-4 relative z-10">
              {/* Paper Plane Icon */}
              <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-105 duration-300">
                <Send className="w-5 h-5" />
              </div>

              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-white/80 flex items-center gap-1 mb-1">
                  <Sparkles className="w-3 h-3" />
                  <span>START A PROJECT</span>
                </span>
                <h3 className="text-2xl font-black text-white tracking-tight">
                  Let&apos;s Work Together!
                </h3>
                <p className="text-xs text-white/90 mt-2 leading-relaxed font-medium">
                  Have a design or engineering project in mind? Let&apos;s build something extraordinary.
                </p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/20 relative z-10">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-white/80">
                Available for freelance &amp; full-time contracts
              </span>
            </div>
          </motion.div>

          {/* Center Form & Right Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-8 p-6 sm:p-8 rounded-2xl bg-[#13182C] border border-[#1E2540] grid grid-cols-1 md:grid-cols-12 gap-6 shadow-glow-card"
          >
            {/* Form Area */}
            <form onSubmit={handleSubmit} className="md:col-span-7 space-y-4 flex flex-col justify-between">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-[#0A0E1A] border border-[#1E2540] text-xs text-white placeholder-gray-500 focus:outline-none focus:border-pink-500/70 focus:shadow-[0_0_15px_rgba(255,59,129,0.15)] transition-all"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-[#0A0E1A] border border-[#1E2540] text-xs text-white placeholder-gray-500 focus:outline-none focus:border-pink-500/70 focus:shadow-[0_0_15px_rgba(255,59,129,0.15)] transition-all"
                  />
                </div>
              </div>

              <div>
                <textarea
                  rows={4}
                  placeholder="Tell me about your project, timeline, and goals..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-[#0A0E1A] border border-[#1E2540] text-xs text-white placeholder-gray-500 focus:outline-none focus:border-pink-500/70 focus:shadow-[0_0_15px_rgba(255,59,129,0.15)] transition-all resize-none"
                />
              </div>

              {/* Status Alert */}
              {feedbackMsg && (
                <div
                  className={`flex items-center gap-2 p-3 rounded-xl text-xs font-medium ${
                    status === "success"
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                      : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                  }`}
                >
                  {status === "success" ? (
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                  ) : (
                    <AlertCircle className="w-4 h-4 shrink-0" />
                  )}
                  <span>{feedbackMsg}</span>
                </div>
              )}

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="gradient-btn-primary inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-xs font-bold text-white shadow-glow-sm hover:shadow-glow-pink disabled:opacity-50 transition-all duration-200"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Sending Alert...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Right Contact Details */}
            <div className="md:col-span-5 md:border-l md:border-[#1E2540] md:pl-6 space-y-6 flex flex-col justify-center">
              {/* Email */}
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400 shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#94A3B8] tracking-wider">
                    Email
                  </span>
                  <p className="text-xs font-medium text-gray-200 hover:text-white transition-colors">
                    <a href={`mailto:${personalInfo.email}`}>{personalInfo.email}</a>
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#94A3B8] tracking-wider">
                    Phone
                  </span>
                  <p className="text-xs font-medium text-gray-200 hover:text-white transition-colors">
                    <a href={`tel:${personalInfo.phone.replace(/\s+/g, "")}`}>
                      {personalInfo.phone}
                    </a>
                  </p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-cyan-400 shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#94A3B8] tracking-wider">
                    Location
                  </span>
                  <p className="text-xs font-medium text-gray-200">
                    {personalInfo.location}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

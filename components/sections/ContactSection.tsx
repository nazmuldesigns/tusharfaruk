"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Mail, Phone, MapPin, CheckCircle2, AlertCircle, Loader2, Sparkles, X, Check } from "lucide-react";
import { personalInfo } from "@/lib/data";

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [feedbackMsg, setFeedbackMsg] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [submittedData, setSubmittedData] = useState<{ name: string; email: string } | null>(null);

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
        setFeedbackMsg("Message received successfully!");
        setSubmittedData({ name: formData.name, email: formData.email });
        setShowModal(true);
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
          
          {/* Left Luxury Animated Brand Card (Neon Navy Blue Theme) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex"
          >
            <motion.div
              initial="rest"
              whileInView="active"
              viewport={{ once: false, amount: 0.4 }}
              className="luxury-brand-card is-active w-full group"
            >
              {/* Rotating Light Neon Navy Blue Border */}
              <div className="card-border" />

              {/* Top Floating Send / Plane Badge */}
              <div className="absolute top-5 right-5 z-20 flex items-center justify-center w-8 h-8 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-white shadow-[0_0_15px_rgba(56,189,248,0.3)] transition-transform group-hover:scale-110 group-hover:rotate-12 duration-300">
                <Send className="w-3.5 h-3.5 text-cyan-300 transform -rotate-12 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>

              {/* Animated Center Content */}
              <div className="card-content">
                <div className="card-logo-container">
                  {/* Logo 1: Geometric TF Monogram with Paper Plane Accent */}
                  <div className="logo1">
                    <div className="relative w-9 h-9 flex items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-400/40 shadow-[0_0_15px_rgba(56,189,248,0.3)]">
                      <svg
                        viewBox="0 0 40 40"
                        className="w-5 h-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6 8 H34 V13 H23 V34 H17 V13 H6 Z"
                          fill="#FFFFFF"
                        />
                        <path
                          d="M17 19 H30 V24 H17 Z"
                          fill="#38BDF8"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Logo 2: Elegant Brand Typography */}
                  <div className="logo2">
                    <div className="flex flex-col justify-center pl-1">
                      <span className="text-sm font-black tracking-wider text-white leading-none uppercase font-heading drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                        Tushar Faruk
                      </span>
                      <span className="text-[8px] font-bold tracking-[2px] text-cyan-300/90 leading-tight mt-1 uppercase flex items-center gap-1">
                        <span>Creative Studio</span>
                        <span className="w-1 h-1 rounded-full bg-cyan-400 animate-pulse" />
                      </span>
                    </div>
                  </div>

                  {/* Dynamic Neon Trail */}
                  <span className="card-trail" />
                </div>

                {/* Subtitle Under Logo with tracking expansion */}
                <span className="card-logo-bottom-text">
                  Brand Designer &amp; Visuals
                </span>
              </div>

              {/* Inset Bottom Text */}
              <span className="card-bottom-text">
                Let&apos;s Build Something Extraordinary
              </span>
            </motion.div>
          </motion.div>

          {/* Right Sleek Dark-Navy Contact Form & Details */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-[#13182C] border border-[#1E2540] grid grid-cols-1 md:grid-cols-12 gap-6 shadow-[0_15px_40px_rgba(0,0,0,0.4)] relative"
          >
            {/* Form Area */}
            <form onSubmit={handleSubmit} className="md:col-span-7 space-y-4 flex flex-col justify-between">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-[#94A3B8] mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-[#0A0E1A] border border-[#1E2540] text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#38BDF8] focus:shadow-[0_0_15px_rgba(56,189,248,0.2)] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-[#94A3B8] mb-1.5">
                    Your Email
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-[#0A0E1A] border border-[#1E2540] text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#38BDF8] focus:shadow-[0_0_15px_rgba(56,189,248,0.2)] transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#94A3B8] mb-1.5">
                  Project Message
                </label>
                <textarea
                  rows={4}
                  placeholder="Tell me about your brand vision, project scope, timeline, and goals..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-[#0A0E1A] border border-[#1E2540] text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#38BDF8] focus:shadow-[0_0_15px_rgba(56,189,248,0.2)] transition-all resize-none"
                />
              </div>

              {/* Status Alert for Inline Error */}
              {feedbackMsg && status === "error" && (
                <div className="flex items-center gap-2 p-3 rounded-xl text-xs font-medium bg-rose-500/10 text-rose-400 border border-rose-500/20">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{feedbackMsg}</span>
                </div>
              )}

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="gradient-btn-primary inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold text-white shadow-glow-sm hover:shadow-glow-pink disabled:opacity-50 transition-all duration-200 cursor-pointer"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Sending Message...</span>
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
              <div className="flex items-start gap-3 group">
                <div className="w-9 h-9 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400 shrink-0 group-hover:scale-105 transition-transform">
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
              <div className="flex items-start gap-3 group">
                <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0 group-hover:scale-105 transition-transform">
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
              <div className="flex items-start gap-3 group">
                <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-cyan-400 shrink-0 group-hover:scale-105 transition-transform">
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

      {/* Success Popup Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-md rounded-2xl bg-[#13182C] border border-[#1E2540] p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.8)] text-center overflow-hidden"
            >
              {/* Background ambient glow */}
              <div className="absolute -top-24 -left-24 w-48 h-48 bg-pink-500/20 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />

              {/* Close Button */}
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 p-2 rounded-xl text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Celebration Icon */}
              <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-0.5 shadow-[0_0_30px_rgba(16,185,129,0.4)] flex items-center justify-center mb-5">
                <div className="w-full h-full bg-[#13182C] rounded-[14px] flex items-center justify-center">
                  <Check className="w-8 h-8 text-emerald-400 stroke-[3]" />
                </div>
              </div>

              <h3 className="text-xl font-black text-white tracking-tight">
                Message Sent Successfully!
              </h3>

              <p className="text-xs text-gray-300 mt-2 leading-relaxed">
                Thank you, <span className="text-white font-bold">{submittedData?.name}</span>! Your message has been safely delivered and dispatched to Tushar Faruk.
              </p>

              <div className="mt-5 p-3.5 rounded-xl bg-[#0A0E1A] border border-[#1E2540] text-[11px] text-left space-y-1.5">
                <div className="flex justify-between items-center text-gray-400">
                  <span>Recipient:</span>
                  <span className="text-white font-medium">Tushar Faruk (Direct)</span>
                </div>
                <div className="flex justify-between items-center text-gray-400">
                  <span>Sender Email:</span>
                  <span className="text-pink-400 font-medium">{submittedData?.email}</span>
                </div>
                <div className="flex justify-between items-center text-gray-400">
                  <span>Response Time:</span>
                  <span className="text-emerald-400 font-medium">Within 24 Hours</span>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#FF3B81] via-[#A855F7] to-[#38BDF8] text-white text-xs font-bold shadow-glow-sm hover:shadow-glow-pink transition-all duration-200 cursor-pointer"
                >
                  Great, Thanks!
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ContactSection;

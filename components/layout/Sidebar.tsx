"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Home,
  User,
  Briefcase,
  Folder,
  Code2,
  FileText,
  Mail,
  ArrowRight,
  Download,
  FileCode2,
  Dribbble,
  Linkedin,
  Github,
} from "lucide-react";
import TopographyLines from "../shared/TopographyLines";
import { personalInfo } from "@/lib/data";

interface SidebarProps {
  activeSection?: string;
  onNavigate?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeSection: propActive, onNavigate }) => {
  const [active, setActive] = useState(propActive || "home");
  const [profileData, setProfileData] = useState({
    name: personalInfo.name,
    title: personalInfo.title,
    cvUrl: personalInfo.cvUrl,
  });

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((resData) => {
        if (resData.success && resData.data?.hero) {
          setProfileData({
            name: resData.data.hero.name || personalInfo.name,
            title: resData.data.hero.title || personalInfo.title,
            cvUrl: resData.data.contact?.cvUrl || personalInfo.cvUrl,
          });
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "services", "portfolio", "skills", "blog", "contact"];
      const scrollPosition = window.scrollY + 240;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActive(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navList = [
    { id: "home", label: "Home", icon: Home, href: "#home" },
    { id: "about", label: "About", icon: User, href: "#about" },
    { id: "services", label: "Services", icon: Briefcase, href: "#services" },
    { id: "portfolio", label: "Portfolio", icon: Folder, href: "#portfolio" },
    { id: "skills", label: "Skills", icon: Code2, href: "#skills" },
    { id: "blog", label: "Blog", icon: FileText, href: "#blog" },
    { id: "contact", label: "Contact", icon: Mail, href: "#contact" },
  ];

  const handleNavClick = (id: string) => {
    setActive(id);
    if (onNavigate) onNavigate();
  };

  return (
    <aside className="w-full h-full bg-gradient-to-b from-[#0D111E] to-[#0A0D17] border-r border-[#1E2540] flex flex-col justify-between overflow-y-auto custom-scrollbar relative select-none">
      {/* Top Header Logo */}
      <div className="p-6 pb-4">
        <Link href="#home" className="flex items-center gap-3.5 group">
          {/* Logo Mark TF */}
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF3B81] via-[#A855F7] to-[#6366F1] p-[2px] shadow-glow-sm group-hover:shadow-glow-pink transition-all">
            <div className="w-full h-full bg-[#101426] rounded-[10px] flex items-center justify-center font-extrabold text-sm tracking-wider text-transparent bg-clip-text bg-gradient-to-br from-[#FF3B81] to-[#A855F7]">
              TF
            </div>
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-wider text-white uppercase group-hover:text-pink-400 transition-colors">
              {profileData.name}
            </h1>
            <p className="text-xs text-[#94A3B8] font-medium">{profileData.title}</p>
          </div>
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className="px-4 py-2 space-y-1.5 flex-1">
        {navList.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.id;
          return (
            <a
              key={item.id}
              href={item.href}
              onClick={() => handleNavClick(item.id)}
              className={`flex items-center gap-3.5 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
                isActive
                  ? "bg-gradient-to-r from-[#4A1944] via-[#2A143D] to-[#15142B] text-pink-400 border border-pink-500/30 shadow-sm"
                  : "text-gray-400 hover:text-white hover:bg-white/[0.04]"
              }`}
            >
              <Icon
                className={`w-4 h-4 transition-transform duration-200 group-hover:scale-110 ${
                  isActive ? "text-pink-400" : "text-gray-400 group-hover:text-pink-400"
                }`}
              />
              <span className={isActive ? "font-semibold text-white" : ""}>{item.label}</span>
            </a>
          );
        })}
      </nav>

      {/* Sidebar Cards & Footer Info */}
      <div className="p-4 space-y-4 relative z-10">
        {/* Available for Freelance & Animated Hire Me Card */}
        <div className="p-4 sm:p-4.5 rounded-2xl bg-gradient-to-br from-[#401944]/90 via-[#201538]/90 to-[#101426] border border-pink-500/35 shadow-[0_8px_30px_rgba(255,59,129,0.2)] relative overflow-hidden group">
          {/* Ambient Glows */}
          <div className="absolute -top-10 -right-10 w-28 h-28 bg-pink-500/25 rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-500" />
          <div className="absolute -bottom-10 -left-10 w-28 h-28 bg-cyan-500/20 rounded-full blur-2xl pointer-events-none" />

          {/* Live Status Badge */}
          <div className="flex items-center gap-2 mb-2.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-400">
              Open for Projects
            </span>
          </div>

          <h3 className="text-xs sm:text-sm font-bold text-white mb-1.5 leading-snug">
            Available for Brand Projects
          </h3>
          <p className="text-[11px] text-gray-300 mb-3.5 leading-relaxed font-normal">
            Let&apos;s build an iconic brand system together!
          </p>

          {/* Larger Animated Hire Me Button */}
          <a
            href="#contact"
            className="relative overflow-hidden inline-flex items-center justify-between w-full px-4 py-3 rounded-xl text-xs sm:text-[13px] font-extrabold text-white bg-gradient-to-r from-[#FF3B81] via-[#EC4899] to-[#A855F7] shadow-[0_4px_20px_rgba(255,59,129,0.4)] hover:shadow-[0_6px_28px_rgba(255,59,129,0.65)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 group/btn cursor-pointer"
          >
            {/* Shimmer sweep */}
            <span className="absolute inset-0 w-1/2 h-full bg-white/20 skew-x-12 -translate-x-full group-hover/btn:translate-x-[300%] transition-transform duration-1000 ease-out pointer-events-none" />
            <span className="tracking-wide">Hire Me Now</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1 duration-200" />
          </a>
        </div>

        {/* Download CV */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between px-1">
            <span className="text-[10px] font-bold tracking-wider text-[#94A3B8] uppercase">
              DOWNLOAD CV
            </span>
            <Download className="w-3 h-3 text-[#94A3B8]" />
          </div>
          <a
            href={profileData.cvUrl}
            target="_blank"
            rel="noopener noreferrer"
            download
            className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.07] hover:border-pink-500/40 hover:bg-white/[0.06] transition-all group"
          >
            <FileCode2 className="w-3.5 h-3.5 text-pink-400 group-hover:scale-110 transition-transform" />
            <span className="text-xs text-gray-300 group-hover:text-white truncate font-medium">
              Tushar_Faruk_CV.pdf
            </span>
          </a>
        </div>

        {/* Follow Me Socials */}
        <div className="space-y-1.5">
          <span className="text-[10px] font-bold tracking-wider text-[#94A3B8] uppercase px-1">
            FOLLOW ME
          </span>
          <div className="flex items-center gap-2 px-1">
            <a
              href={personalInfo.socials.dribbble}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400 hover:bg-pink-500/25 hover:border-pink-500/50 hover:scale-110 transition-all shadow-sm"
              title="Dribbble"
            >
              <Dribbble className="w-3.5 h-3.5" />
            </a>
            <a
              href={personalInfo.socials.behance}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 hover:bg-purple-500/25 hover:border-purple-500/50 hover:scale-110 transition-all font-bold text-xs shadow-sm"
              title="Behance"
            >
              Bē
            </a>
            <a
              href={personalInfo.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-sky-400 hover:bg-sky-500/25 hover:border-sky-500/50 hover:scale-110 transition-all shadow-sm"
              title="LinkedIn"
            >
              <Linkedin className="w-3.5 h-3.5" />
            </a>
            <a
              href={personalInfo.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-white/5 border border-white/15 flex items-center justify-center text-gray-200 hover:bg-white/20 hover:border-white/30 hover:scale-110 transition-all shadow-sm"
              title="GitHub"
            >
              <Github className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Neon Topography Contour Vector Graphic */}
      <TopographyLines className="absolute -bottom-6 -left-6 -right-6 h-56 z-0 pointer-events-none" />
    </aside>
  );
};

export default Sidebar;

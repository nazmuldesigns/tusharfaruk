"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Send, Menu, X, Home, User, Briefcase, Folder, Mail } from "lucide-react";
import { Sidebar } from "./Sidebar";

export const TopNav: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Portfolio", href: "#portfolio" },
    { label: "Blog", href: "#blog" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <>
      {/* Top Header */}
      <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#0B0F19]/85 border-b border-[#1E2540]/60 px-6 lg:px-12 py-3.5 transition-all">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          {/* Mobile Brand / Toggle */}
          <div className="flex items-center gap-3 lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 rounded-xl bg-white/[0.05] border border-white/[0.1] text-gray-300 hover:text-white transition-colors"
              aria-label="Open navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#FF3B81] to-[#A855F7] flex items-center justify-center font-black text-xs text-white shadow-sm">
                M
              </div>
              <span className="font-bold text-xs tracking-wider uppercase text-white">
                MARK DAVIS
              </span>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-gray-300 hover:text-pink-400 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Let's Talk CTA Button */}
          <a
            href="#contact"
            className="gradient-btn-primary flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold text-white shadow-glow-sm hover:shadow-glow-pink transition-all duration-200"
          >
            <span>Let&apos;s Talk</span>
            <Send className="w-3.5 h-3.5" />
          </a>
        </div>
      </header>

      {/* Mobile Bottom Quick Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0D111E]/95 backdrop-blur-lg border-t border-[#1E2540] px-4 py-2.5 flex items-center justify-around shadow-2xl">
        <a
          href="#home"
          className="flex flex-col items-center gap-1 text-[10px] text-gray-400 hover:text-pink-400 transition-colors"
          aria-label="Navigate to Home"
        >
          <Home className="w-4 h-4" />
          <span>Home</span>
        </a>
        <a
          href="#services"
          className="flex flex-col items-center gap-1 text-[10px] text-gray-400 hover:text-pink-400 transition-colors"
          aria-label="Navigate to Services"
        >
          <Briefcase className="w-4 h-4" />
          <span>Services</span>
        </a>
        <a
          href="#portfolio"
          className="flex flex-col items-center gap-1 text-[10px] text-gray-400 hover:text-pink-400 transition-colors"
          aria-label="Navigate to Portfolio"
        >
          <Folder className="w-4 h-4" />
          <span>Projects</span>
        </a>
        <a
          href="#contact"
          className="flex flex-col items-center gap-1 text-[10px] text-pink-400 font-semibold transition-colors"
          aria-label="Navigate to Contact"
        >
          <Mail className="w-4 h-4" />
          <span>Contact</span>
        </a>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer content */}
          <div className="relative w-80 max-w-[85vw] h-full bg-[#0D111E] z-10 flex flex-col shadow-2xl border-r border-[#1E2540] animate-slide-right">
            <button
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close navigation drawer"
              className="absolute top-4 right-4 z-20 p-2 rounded-xl bg-white/[0.05] text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <Sidebar onNavigate={() => setMobileMenuOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
};

export default TopNav;

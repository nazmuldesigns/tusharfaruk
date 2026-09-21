"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  FolderKanban,
  Briefcase,
  MessageSquareQuote,
  Sliders,
  Inbox,
  Settings,
  ExternalLink,
  LogOut,
  X,
} from "lucide-react";

interface AdminSidebarProps {
  onCloseMobile?: () => void;
  unreadCount?: number;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ onCloseMobile, unreadCount = 0 }) => {
  const pathname = usePathname();

  const navLinks = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Projects", href: "/admin/projects", icon: FolderKanban },
    { label: "Services", href: "/admin/services", icon: Briefcase },
    { label: "Testimonials", href: "/admin/testimonials", icon: MessageSquareQuote },
    { label: "Content & Bio", href: "/admin/content", icon: Sliders },
    {
      label: "Inquiries",
      href: "/admin/messages",
      icon: Inbox,
      badge: unreadCount > 0 ? unreadCount : undefined,
    },
    { label: "Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    <aside className="w-full h-full bg-[#0D111E] border-r border-[#1E2540] flex flex-col justify-between select-none">
      {/* Top Header & Brand */}
      <div>
        <div className="p-6 pb-4 flex items-center justify-between border-b border-[#1E2540]/60">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#FF3B81] via-[#A855F7] to-[#6366F1] p-[2px] shadow-glow-sm">
              <div className="w-full h-full bg-[#101426] rounded-[10px] flex items-center justify-center font-extrabold text-sm text-transparent bg-clip-text bg-gradient-to-br from-[#FF3B81] to-[#A855F7]">
                M
              </div>
            </div>
            <div>
              <h1 className="text-xs font-bold tracking-wider text-white uppercase">
                Mark Davis
              </h1>
              <span className="text-[10px] font-semibold text-pink-400 bg-pink-500/10 px-1.5 py-0.5 rounded border border-pink-500/20">
                ADMIN PANEL
              </span>
            </div>
          </Link>

          {onCloseMobile && (
            <button
              onClick={onCloseMobile}
              className="lg:hidden p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-white/5"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Navigation Items */}
        <nav className="p-4 space-y-1.5">
          {navLinks.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href ||
              (item.href !== "/admin" && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onCloseMobile}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 group ${
                  isActive
                    ? "bg-gradient-to-r from-[#4A1944] via-[#2A143D] to-[#15142B] text-pink-400 border border-pink-500/30 shadow-sm"
                    : "text-gray-400 hover:text-white hover:bg-white/[0.04]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                      isActive ? "text-pink-400" : "text-gray-400 group-hover:text-pink-400"
                    }`}
                  />
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-pink-500 text-white">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-[#1E2540]/60 space-y-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between w-full px-3.5 py-2 rounded-xl text-xs font-semibold text-gray-300 hover:text-white bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] transition-all"
        >
          <span>View Live Site</span>
          <ExternalLink className="w-3.5 h-3.5 text-pink-400" />
        </Link>

        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="flex items-center gap-2 w-full px-3.5 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-500/10 transition-all text-left"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;

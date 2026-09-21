"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { Menu, ExternalLink, LogOut, ShieldCheck } from "lucide-react";

interface AdminHeaderProps {
  onOpenMobile?: () => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({ onOpenMobile }) => {
  const pathname = usePathname();
  const { data: session } = useSession();

  // Determine section title from pathname
  const getSectionTitle = () => {
    if (pathname === "/admin") return "Dashboard Overview";
    if (pathname.startsWith("/admin/projects/new")) return "Add New Project";
    if (pathname.startsWith("/admin/projects/")) return "Edit Project";
    if (pathname.startsWith("/admin/projects")) return "Project Management";
    if (pathname.startsWith("/admin/services")) return "Services Management";
    if (pathname.startsWith("/admin/testimonials")) return "Testimonials & Reviews";
    if (pathname.startsWith("/admin/content")) return "Content & Site Bio";
    if (pathname.startsWith("/admin/messages")) return "Inquiries Inbox";
    if (pathname.startsWith("/admin/settings")) return "System & Integrations";
    return "Admin Panel";
  };

  return (
    <header className="h-16 w-full bg-[#0D111E]/95 backdrop-blur-md border-b border-[#1E2540] px-4 lg:px-8 flex items-center justify-between sticky top-0 z-30">
      {/* Left side: Hamburger (mobile) + Section Title */}
      <div className="flex items-center gap-3">
        {onOpenMobile && (
          <button
            onClick={onOpenMobile}
            className="lg:hidden p-2 text-gray-400 hover:text-white rounded-xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.08] transition-colors"
            aria-label="Open Navigation"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        <div>
          <h2 className="text-sm lg:text-base font-bold text-white tracking-wide">
            {getSectionTitle()}
          </h2>
          <p className="text-[11px] text-gray-400 hidden sm:block">
            Mark Davis Portfolio Management
          </p>
        </div>
      </div>

      {/* Right side: View Site + Admin Badge + Sign Out */}
      <div className="flex items-center gap-2.5 sm:gap-4">
        <Link
          href="/"
          target="_blank"
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs font-semibold text-gray-300 hover:text-white hover:bg-white/[0.08] transition-all"
        >
          <span>View Site</span>
          <ExternalLink className="w-3.5 h-3.5 text-pink-400" />
        </Link>

        {/* User profile capsule */}
        <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-[#141829] border border-[#202744]">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#FF3B81] to-[#A855F7] flex items-center justify-center text-white text-xs font-bold shadow-sm">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div className="hidden md:block text-left">
            <p className="text-xs font-bold text-white leading-tight">
              {session?.user?.name || "Admin"}
            </p>
            <p className="text-[10px] text-pink-400 font-medium">Super Admin</p>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="p-2 rounded-xl text-gray-400 hover:text-rose-400 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20 transition-all"
          title="Sign Out"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};

export default AdminHeader;

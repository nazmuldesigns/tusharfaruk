"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { AdminSessionProvider } from "@/components/admin/AdminSessionProvider";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { Loader2 } from "lucide-react";

function AdminLayoutInner({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, status } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  const isLoginPage = pathname === "/admin/login";

  // Fetch unread messages count for sidebar badge
  useEffect(() => {
    if (status === "authenticated" && !isLoginPage) {
      fetch("/api/admin/messages")
        .then((res) => res.json())
        .then((data) => {
          if (data.messages) {
            const unread = data.messages.filter(
              (m: { status: string }) => m.status === "unread"
            ).length;
            setUnreadCount(unread);
          }
        })
        .catch(() => {});
    }
  }, [status, isLoginPage, pathname]);

  // If on login page, just render it without sidebar/header
  if (isLoginPage) {
    return <>{children}</>;
  }

  // Loading state
  if (status === "loading") {
    return (
      <div className="min-h-screen bg-[#0A0B10] flex flex-col items-center justify-center gap-3 text-white">
        <Loader2 className="w-8 h-8 animate-spin text-pink-500" />
        <p className="text-xs text-gray-400 font-mono">Authenticating Tushar Faruk Admin...</p>
      </div>
    );
  }

  // Not authenticated -> redirect to login
  if (status === "unauthenticated") {
    router.replace("/admin/login");
    return (
      <div className="min-h-screen bg-[#0A0B10] flex flex-col items-center justify-center gap-3 text-white">
        <Loader2 className="w-8 h-8 animate-spin text-pink-500" />
        <p className="text-xs text-gray-400 font-mono">Redirecting to login portal...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white flex flex-col lg:flex-row antialiased">
      {/* Desktop Sidebar (Fixed Left) */}
      <aside className="hidden lg:block w-64 h-screen sticky top-0 shrink-0 z-40">
        <AdminSidebar unreadCount={unreadCount} />
      </aside>

      {/* Mobile Sidebar Slide-over Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative w-72 max-w-[80vw] h-full z-10 animate-slide-right shadow-2xl">
            <AdminSidebar
              unreadCount={unreadCount}
              onCloseMobile={() => setMobileMenuOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Main Content Workspace */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        <AdminHeader onOpenMobile={() => setMobileMenuOpen(true)} />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminSessionProvider>
      <AdminLayoutInner>{children}</AdminLayoutInner>
    </AdminSessionProvider>
  );
}

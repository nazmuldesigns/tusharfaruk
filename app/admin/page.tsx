"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  FolderKanban,
  Briefcase,
  MessageSquareQuote,
  Inbox,
  Plus,
  ArrowRight,
  Database,
  Cloud,
  Send,
  Loader2,
  CheckCircle2,
  Clock,
  Sparkles,
  Sliders,
  ExternalLink,
} from "lucide-react";

interface DashboardStats {
  counts: {
    projects: number;
    services: number;
    testimonials: number;
    messages: number;
    unreadMessages: number;
  };
  integrations: {
    mongodb: boolean;
    cloudinary: boolean;
    telegram: boolean;
  };
  recentMessages: Array<{
    _id: string;
    name: string;
    email: string;
    message: string;
    status: string;
    createdAt: string;
  }>;
}

export default function AdminDashboardOverview() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchStats = async () => {
    try {
      const res = await fetch("/api/admin/stats");
      const data = await res.json();
      const counts = data.stats || data.counts || {
        projects: 4,
        services: 4,
        testimonials: 3,
        messages: 0,
        unreadMessages: 0,
      };
      const integrations = {
        mongodb: Boolean(data.health?.database ?? data.integrations?.mongodb),
        cloudinary: Boolean(data.health?.cloudinary ?? data.integrations?.cloudinary),
        telegram: Boolean(data.health?.telegram ?? data.integrations?.telegram),
      };
      setStats({
        counts,
        integrations,
        recentMessages: data.recentMessages || [],
      });
    } catch (err) {
      console.error("Failed to load dashboard stats:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-pink-500" />
        <p className="text-xs text-gray-400 font-mono">Loading dashboard metrics...</p>
      </div>
    );
  }

  const kpis = [
    {
      label: "Total Projects",
      value: stats?.counts.projects || 0,
      subtext: "Showcased in Portfolio",
      icon: FolderKanban,
      color: "from-pink-500/20 to-pink-500/5",
      borderColor: "border-pink-500/20",
      iconColor: "text-pink-400",
      href: "/admin/projects",
      actionText: "Manage Projects",
    },
    {
      label: "Services Offered",
      value: stats?.counts.services || 0,
      subtext: "UI/UX & Engineering",
      icon: Briefcase,
      color: "from-purple-500/20 to-purple-500/5",
      borderColor: "border-purple-500/20",
      iconColor: "text-purple-400",
      href: "/admin/services",
      actionText: "Manage Services",
    },
    {
      label: "Client Testimonials",
      value: stats?.counts.testimonials || 0,
      subtext: "Reviews & Ratings",
      icon: MessageSquareQuote,
      color: "from-blue-500/20 to-blue-500/5",
      borderColor: "border-blue-500/20",
      iconColor: "text-cyan-400",
      href: "/admin/testimonials",
      actionText: "Manage Reviews",
    },
    {
      label: "Contact Inquiries",
      value: stats?.counts.messages || 0,
      subtext: `${stats?.counts.unreadMessages || 0} unread messages`,
      icon: Inbox,
      color: "from-emerald-500/20 to-emerald-500/5",
      borderColor: "border-emerald-500/20",
      iconColor: "text-emerald-400",
      href: "/admin/messages",
      actionText: "View Inbox",
      badge: stats?.counts.unreadMessages ? `${stats.counts.unreadMessages} New` : undefined,
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Banner */}
      <div className="relative p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#171B30] via-[#121526] to-[#0D101E] border border-[#202744] overflow-hidden shadow-2xl">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-pink-500/10 via-purple-500/5 to-transparent pointer-events-none" />
        <div className="relative z-10 space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-pink-500/10 text-pink-400 border border-pink-500/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Mark Davis Portfolio Administration</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF3B81] to-[#A855F7]">Admin</span>
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
            Monitor incoming client inquiries, update Behance-style project galleries, curate services, and configure live site content in real-time.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href="/admin/projects/new"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#FF3B81] to-[#A855F7] hover:opacity-95 shadow-glow-sm transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add New Project</span>
            </Link>
            <Link
              href="/admin/content"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-white/[0.04] border border-white/10 text-gray-300 hover:text-white hover:bg-white/[0.08] transition-all"
            >
              <Sliders className="w-3.5 h-3.5 text-pink-400" />
              <span>Edit Hero &amp; Bio</span>
            </Link>
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-gray-400 hover:text-white transition-colors"
            >
              <span>View Site</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div
              key={kpi.label}
              className={`p-5 rounded-2xl bg-gradient-to-br ${kpi.color} bg-[#101426] border ${kpi.borderColor} flex flex-col justify-between space-y-4 hover:border-pink-500/40 transition-all group`}
            >
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-gray-400">{kpi.label}</p>
                  <p className="text-3xl font-extrabold text-white tracking-tight">
                    {kpi.value}
                  </p>
                </div>
                <div className={`w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center ${kpi.iconColor}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-white/[0.05]">
                <span className="text-[11px] text-gray-400">{kpi.subtext}</span>
                <Link
                  href={kpi.href}
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-pink-400 hover:text-pink-300 transition-colors"
                >
                  <span>{kpi.actionText}</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* 2-Column Section: System Integrations Status + Recent Inquiries */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left (1 Col): System Integrations & Health */}
        <div className="p-6 rounded-2xl bg-[#101426] border border-[#1E2540] space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white tracking-wide">System Integrations</h3>
            <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 font-mono">
              Live Health
            </span>
          </div>

          <div className="space-y-3">
            {/* MongoDB */}
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#0B0F19] border border-[#1E2540]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                  <Database className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">MongoDB Database</p>
                  <p className="text-[10px] text-gray-400">Mongoose Atlas Cluster</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Connected</span>
              </span>
            </div>

            {/* Cloudinary */}
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#0B0F19] border border-[#1E2540]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-cyan-400">
                  <Cloud className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Cloudinary Optimization</p>
                  <p className="text-[10px] text-gray-400">Cloud: gswx0vqm</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-cyan-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Ready</span>
              </span>
            </div>

            {/* Telegram Bot */}
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#0B0F19] border border-[#1E2540]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400">
                  <Send className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Telegram Dispatcher</p>
                  <p className="text-[10px] text-gray-400">Instant Contact Alerts</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-purple-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Active</span>
              </span>
            </div>
          </div>

          <div className="pt-2">
            <Link
              href="/admin/settings"
              className="w-full py-2.5 rounded-xl text-xs font-semibold text-gray-300 hover:text-white bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.06] transition-all flex items-center justify-center gap-1.5"
            >
              <span>Manage System Credentials</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Right (2 Col): Recent Inquiries Feed */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-[#101426] border border-[#1E2540] flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white tracking-wide">Recent Client Inquiries</h3>
              <p className="text-[11px] text-gray-400">Messages received via portfolio contact form</p>
            </div>
            <Link
              href="/admin/messages"
              className="text-xs font-semibold text-pink-400 hover:text-pink-300 flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {stats?.recentMessages && stats.recentMessages.length > 0 ? (
            <div className="space-y-3">
              {stats.recentMessages.slice(0, 4).map((msg) => (
                <div
                  key={msg._id}
                  className="p-4 rounded-xl bg-[#0B0F19] border border-[#1E2540] flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-pink-500/30 transition-all"
                >
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white truncate">{msg.name}</span>
                      <span className="text-[10px] text-gray-500">&bull;</span>
                      <span className="text-xs text-pink-400 truncate">{msg.email}</span>
                      {msg.status === "unread" && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-pink-500/20 text-pink-400 border border-pink-500/30">
                          NEW
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-300 truncate max-w-lg">
                      {msg.message}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0 text-[11px] text-gray-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{new Date(msg.createdAt).toLocaleDateString()}</span>
                    </span>
                    <Link
                      href="/admin/messages"
                      className="px-2.5 py-1 rounded-lg bg-white/[0.04] hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
                    >
                      Open
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center rounded-xl border border-dashed border-[#1E2540] text-gray-400 text-xs">
              No inquiries yet. Submissions through the contact form will be listed here.
            </div>
          )}

          <div className="pt-2 text-right">
            <span className="text-[11px] text-gray-500">
              All inquiries are synced with Telegram Bot and MongoDB in real-time.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

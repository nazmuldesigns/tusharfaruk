"use client";

import React, { useState, useEffect } from "react";
import {
  Settings,
  Database,
  Cloud,
  Send,
  Lock,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Sparkles,
  ShieldCheck,
} from "lucide-react";

export default function AdminSettingsPage() {
  const [isSeeding, setIsSeeding] = useState(false);
  const [seedResult, setSeedResult] = useState<{ success: boolean; message: string } | null>(null);

  const [isTestingTelegram, setIsTestingTelegram] = useState(false);
  const [telegramResult, setTelegramResult] = useState<{ success: boolean; message: string } | null>(null);

  const [dbStatus, setDbStatus] = useState<"checking" | "connected" | "disconnected">("checking");
  const [details, setDetails] = useState<{
    mongodbUri: string;
    cloudinaryCloudName: string;
    telegramChatId: string;
    adminEmail: string;
  }>({
    mongodbUri: "Checking...",
    cloudinaryCloudName: "Checking...",
    telegramChatId: "Checking...",
    adminEmail: "Checking...",
  });

  const fetchStats = () => {
    fetch("/api/admin/stats")
      .then((res) => res.json())
      .then((data) => {
        const isConnected = data.health?.database ?? data.integrations?.mongodb ?? false;
        setDbStatus(isConnected ? "connected" : "disconnected");
        if (data.details) {
          setDetails(data.details);
        }
      })
      .catch(() => setDbStatus("disconnected"));
  };

  useEffect(() => {
    fetchStats();
  }, []);

  // Handle Seeding
  const handleSeedDatabase = async () => {
    if (!confirm("Are you sure you want to reset and re-seed portfolio sample data? Existing projects/services will be refreshed.")) {
      return;
    }

    setIsSeeding(true);
    setSeedResult(null);

    try {
      const res = await fetch("/api/seed", { method: "POST" });
      const data = await res.json();
      if (res.ok && data.success) {
        setSeedResult({ success: true, message: data.message });
      } else {
        setSeedResult({ success: false, message: data.error || "Failed to seed database." });
      }
    } catch {
      setSeedResult({ success: false, message: "Network error occurred during seeding." });
    } finally {
      setIsSeeding(false);
    }
  };

  // Test Telegram Dispatcher
  const handleTestTelegram = async () => {
    setIsTestingTelegram(true);
    setTelegramResult(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Admin System Test",
          email: "admin@tusharfaruk.com",
          message: "🚀 Telegram Bot Dispatcher verification test from Mark Davis Admin Panel.",
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setTelegramResult({
          success: true,
          message: "Test message dispatched to Telegram Bot successfully!",
        });
      } else {
        setTelegramResult({
          success: false,
          message: data.error || "Failed to dispatch test notification.",
        });
      }
    } catch {
      setTelegramResult({
        success: false,
        message: "Failed to dispatch test notification.",
      });
    } finally {
      setIsTestingTelegram(false);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-16">
      {/* Header */}
      <div className="border-b border-[#1E2540] pb-5">
        <h1 className="text-xl font-bold text-white tracking-wide flex items-center gap-2">
          <Settings className="w-5 h-5 text-pink-400" />
          <span>System Settings &amp; Integrations</span>
        </h1>
        <p className="text-xs text-gray-400 mt-1">
          Monitor database health, Cloudinary optimization status, Telegram dispatcher, and seed catalog.
        </p>
      </div>

      {/* Integration Diagnostics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 1. MongoDB Atlas */}
        <div className="p-6 rounded-2xl bg-[#101426] border border-[#1E2540] space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">MongoDB Atlas Cluster</h3>
                <p className="text-[11px] text-gray-400">Database Engine (Mongoose)</p>
              </div>
            </div>
            {dbStatus === "connected" ? (
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Connected</span>
              </span>
            ) : dbStatus === "checking" ? (
              <span className="inline-flex items-center gap-1 text-xs text-gray-400">
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Checking...</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Fallback Mode</span>
              </span>
            )}
          </div>

          <div className="p-3.5 rounded-xl bg-[#0B0F19] text-xs text-gray-400 space-y-1 font-mono break-all">
            <p>URI: {details.mongodbUri}</p>
            <p>Database: portfolio</p>
          </div>
        </div>

        {/* 2. Cloudinary */}
        <div className="p-6 rounded-2xl bg-[#101426] border border-[#1E2540] space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-cyan-400">
                <Cloud className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Cloudinary Image Pipeline</h3>
                <p className="text-[11px] text-gray-400">Auto-Optimization &amp; Storage</p>
              </div>
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-full border border-cyan-500/20">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Active</span>
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-[#0B0F19] text-xs text-gray-400 space-y-1 font-mono">
            <p>Cloud Name: {details.cloudinaryCloudName}</p>
            <p>Transformations: f_auto, q_auto:good (WebP/AVIF)</p>
          </div>
        </div>

        {/* 3. Telegram Bot Dispatcher */}
        <div className="p-6 rounded-2xl bg-[#101426] border border-[#1E2540] space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                <Send className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Telegram Dispatcher</h3>
                <p className="text-[11px] text-gray-400">Instant Inquiry Alerts</p>
              </div>
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-purple-400 bg-purple-500/10 px-2.5 py-1 rounded-full border border-purple-500/20">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Configured</span>
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-[#0B0F19] text-xs text-gray-400 space-y-1 font-mono">
            <p>Chat ID: {details.telegramChatId}</p>
            <p>Status: Dispatcher Ready</p>
          </div>

          <div className="flex items-center justify-between pt-1">
            <button
              onClick={handleTestTelegram}
              disabled={isTestingTelegram}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-purple-500/10 border border-purple-500/20 text-purple-300 hover:bg-purple-500/20 transition-all"
            >
              {isTestingTelegram ? (
                <Loader2 className="w-3 h-3 animate-spin" />
              ) : (
                <Send className="w-3 h-3" />
              )}
              <span>Send Test Telegram Alert</span>
            </button>
          </div>

          {telegramResult && (
            <p
              className={`text-xs ${
                telegramResult.success ? "text-emerald-400" : "text-rose-400"
              }`}
            >
              {telegramResult.message}
            </p>
          )}
        </div>

        {/* 4. NextAuth Security */}
        <div className="p-6 rounded-2xl bg-[#101426] border border-[#1E2540] space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">NextAuth Security Portal</h3>
                <p className="text-[11px] text-gray-400">JWT Session Management</p>
              </div>
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-pink-400 bg-pink-500/10 px-2.5 py-1 rounded-full border border-pink-500/20">
              <Lock className="w-3 h-3" />
              <span>Secured</span>
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-[#0B0F19] text-xs text-gray-400 space-y-1 font-mono">
            <p>Admin Email: {details.adminEmail}</p>
            <p>Strategy: JWT session tokens</p>
          </div>
        </div>
      </div>

      {/* Database Seeder Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#101426] border border-[#1E2540] space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-pink-400" />
              <span>Database Seeder &amp; Reset</span>
            </h3>
            <p className="text-xs text-gray-400 mt-1 max-w-xl leading-relaxed">
              Populate or refresh the MongoDB database with initial sample case studies, services, client testimonials, and site configuration matching the Mark Davis portfolio design.
            </p>
          </div>

          <button
            onClick={handleSeedDatabase}
            disabled={isSeeding}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#FF3B81] to-[#A855F7] hover:opacity-95 shadow-glow-sm disabled:opacity-50 transition-all shrink-0"
          >
            {isSeeding ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Seeding Database...</span>
              </>
            ) : (
              <>
                <RefreshCw className="w-4 h-4" />
                <span>Seed / Reset Database</span>
              </>
            )}
          </button>
        </div>

        {seedResult && (
          <div
            className={`flex items-center gap-2 text-xs p-4 rounded-xl border ${
              seedResult.success
                ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
                : "text-rose-400 bg-rose-500/10 border-rose-500/20"
            }`}
          >
            {seedResult.success ? (
              <CheckCircle2 className="w-4 h-4 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 shrink-0" />
            )}
            <span>{seedResult.message}</span>
          </div>
        )}
      </div>
    </div>
  );
}

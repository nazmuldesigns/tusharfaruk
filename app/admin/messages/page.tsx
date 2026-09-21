"use client";

import React, { useState, useEffect } from "react";
import {
  Inbox,
  Mail,
  Trash2,
  CheckCircle2,
  Clock,
  Search,
  Loader2,
  Reply,
  Eye,
  Check,
} from "lucide-react";
import { DeleteModal } from "@/components/admin/DeleteModal";

interface MessageItem {
  _id: string;
  name: string;
  email: string;
  message: string;
  status: "unread" | "read" | "replied";
  createdAt: string;
}

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "unread" | "read" | "replied">("all");

  // Delete modal state
  const [deleteTarget, setDeleteTarget] = useState<MessageItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchMessages = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/admin/messages");
      const data = await res.json();
      if (data.data) {
        setMessages(data.data);
      }
    } catch (err) {
      console.error("Error fetching messages:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  // Update status (mark read, replied, unread)
  const handleUpdateStatus = async (id: string, newStatus: "unread" | "read" | "replied") => {
    try {
      const res = await fetch(`/api/admin/messages/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        setMessages((prev) =>
          prev.map((m) => (m._id === id ? { ...m, status: newStatus } : m))
        );
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  // Delete inquiry
  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);

    try {
      const res = await fetch(`/api/admin/messages/${deleteTarget._id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setMessages((prev) => prev.filter((m) => m._id !== deleteTarget._id));
        setDeleteTarget(null);
      }
    } catch (err) {
      console.error("Failed to delete message:", err);
    } finally {
      setIsDeleting(false);
    }
  };

  const filteredMessages = messages.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.message.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === "all" || m.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const unreadCount = messages.filter((m) => m.status === "unread").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1E2540] pb-5">
        <div>
          <h1 className="text-xl font-bold text-white tracking-wide flex items-center gap-2">
            <Inbox className="w-5 h-5 text-pink-400" />
            <span>Inquiries Inbox</span>
            {unreadCount > 0 && (
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-400 border border-pink-500/30">
                {unreadCount} Unread
              </span>
            )}
          </h1>
          <p className="text-xs text-gray-400">
            Messages and project requests submitted by visitors through the contact form.
          </p>
        </div>
      </div>

      {/* Filter & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-3.5 h-3.5 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by sender, email, or content..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#101426] border border-[#1E2540] text-xs text-white placeholder-gray-500 focus:outline-none focus:border-pink-500 transition-colors"
          />
        </div>

        {/* Status Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {[
            { id: "all", label: "All" },
            { id: "unread", label: "Unread" },
            { id: "read", label: "Read" },
            { id: "replied", label: "Replied" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setStatusFilter(item.id as typeof statusFilter)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 ${
                statusFilter === item.id
                  ? "bg-pink-500 text-white shadow-glow-sm"
                  : "bg-[#101426] text-gray-400 border border-[#1E2540] hover:text-white"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Messages Feed */}
      {isLoading ? (
        <div className="py-20 flex flex-col items-center justify-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-pink-500" />
          <p className="text-xs text-gray-400 font-mono">Loading inquiries...</p>
        </div>
      ) : filteredMessages.length === 0 ? (
        <div className="p-12 text-center rounded-2xl border border-dashed border-[#1E2540] bg-[#101426]/50 space-y-3">
          <Mail className="w-10 h-10 text-gray-600 mx-auto" />
          <p className="text-sm font-bold text-gray-300">No inquiries found</p>
          <p className="text-xs text-gray-500">
            {searchQuery || statusFilter !== "all"
              ? "No messages match your selected filters."
              : "Submissions made via the public portfolio contact form will appear here."}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredMessages.map((msg) => (
            <div
              key={msg._id}
              className={`p-5 rounded-2xl border transition-all ${
                msg.status === "unread"
                  ? "bg-[#14182B] border-pink-500/30 shadow-sm"
                  : "bg-[#101426] border-[#1E2540] hover:border-[#2D375E]"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                {/* Sender Info */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="text-sm font-bold text-white">{msg.name}</span>
                    <a
                      href={`mailto:${msg.email}`}
                      className="text-xs text-pink-400 hover:underline flex items-center gap-1"
                    >
                      <Mail className="w-3 h-3" />
                      <span>{msg.email}</span>
                    </a>
                    {msg.status === "unread" && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-pink-500/20 text-pink-400 border border-pink-500/30">
                        Unread
                      </span>
                    )}
                    {msg.status === "replied" && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        Replied
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5 text-[11px] text-gray-500">
                    <Clock className="w-3 h-3" />
                    <span>{new Date(msg.createdAt).toLocaleString()}</span>
                  </div>
                </div>

                {/* Status Quick Toggles & Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href={`mailto:${msg.email}?subject=Mark%20Davis%20-%20Re:%20Project%20Inquiry`}
                    onClick={() => handleUpdateStatus(msg._id, "replied")}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-[#FF3B81] to-[#A855F7] text-white hover:opacity-95 shadow-glow-sm transition-all"
                  >
                    <Reply className="w-3.5 h-3.5" />
                    <span>Reply</span>
                  </a>

                  {msg.status !== "read" && (
                    <button
                      onClick={() => handleUpdateStatus(msg._id, "read")}
                      className="p-1.5 rounded-lg bg-white/[0.04] hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
                      title="Mark as Read"
                    >
                      <Check className="w-3.5 h-3.5" />
                    </button>
                  )}

                  {msg.status === "read" && (
                    <button
                      onClick={() => handleUpdateStatus(msg._id, "unread")}
                      className="p-1.5 rounded-lg bg-white/[0.04] hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                      title="Mark as Unread"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                  )}

                  <button
                    onClick={() => setDeleteTarget(msg)}
                    className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-500/10 transition-colors"
                    title="Delete Inquiry"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Message Body */}
              <div className="mt-3 p-4 rounded-xl bg-[#0B0F19] border border-[#1E2540]/80">
                <p className="text-xs text-gray-300 leading-relaxed whitespace-pre-wrap">
                  {msg.message}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Modal */}
      <DeleteModal
        isOpen={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Inquiry"
        message={`Are you sure you want to delete the inquiry from ${deleteTarget?.name}? This cannot be undone.`}
        isLoading={isDeleting}
      />
    </div>
  );
}

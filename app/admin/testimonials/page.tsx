"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Plus,
  Edit2,
  Trash2,
  Star,
  Loader2,
  AlertCircle,
  CheckCircle,
  X,
  MessageSquareQuote,
  Layers,
} from "lucide-react";
import { DeleteModal } from "@/components/admin/DeleteModal";
import { ImageUploader } from "@/components/admin/ImageUploader";

interface TestimonialItem {
  _id: string;
  clientName: string;
  clientRole: string;
  clientCompany: string;
  avatar: string;
  quote: string;
  rating?: number;
  featured?: boolean;
  order?: number;
}

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Modal editor state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [modalName, setModalName] = useState("");
  const [modalRole, setModalRole] = useState("");
  const [modalCompany, setModalCompany] = useState("");
  const [modalAvatar, setModalAvatar] = useState("");
  const [modalQuote, setModalQuote] = useState("");
  const [modalRating, setModalRating] = useState(5);
  const [modalOrder, setModalOrder] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Delete state
  const [deleteTarget, setDeleteTarget] = useState<TestimonialItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchTestimonials = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/testimonials");
      const data = await res.json();
      if (data.data) {
        setTestimonials(data.data);
      }
    } catch (err) {
      console.error("Error fetching testimonials:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const openCreateModal = () => {
    setEditingId(null);
    setModalName("");
    setModalRole("Product Lead");
    setModalCompany("");
    setModalAvatar(
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop"
    );
    setModalQuote("");
    setModalRating(5);
    setModalOrder(testimonials.length);
    setErrorMsg(null);
    setSuccessMsg(null);
    setIsModalOpen(true);
  };

  const openEditModal = (t: TestimonialItem) => {
    setEditingId(t._id);
    setModalName(t.clientName);
    setModalRole(t.clientRole);
    setModalCompany(t.clientCompany);
    setModalAvatar(t.avatar);
    setModalQuote(t.quote);
    setModalRating(t.rating || 5);
    setModalOrder(t.order || 0);
    setErrorMsg(null);
    setSuccessMsg(null);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!modalName.trim() || !modalQuote.trim() || !modalAvatar.trim()) {
      setErrorMsg("Name, Avatar, and Quote are required.");
      return;
    }

    setIsSaving(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    const payload = {
      clientName: modalName.trim(),
      clientRole: modalRole.trim(),
      clientCompany: modalCompany.trim(),
      avatar: modalAvatar.trim(),
      quote: modalQuote.trim(),
      rating: modalRating,
      order: modalOrder,
    };

    try {
      const url = editingId ? `/api/testimonials/${editingId}` : "/api/testimonials";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to save testimonial.");
      }

      setSuccessMsg("Testimonial saved successfully!");
      fetchTestimonials();
      setTimeout(() => {
        setIsModalOpen(false);
      }, 500);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error saving testimonial.";
      setErrorMsg(msg);
    } finally {
      setIsSaving(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);

    try {
      const res = await fetch(`/api/testimonials/${deleteTarget._id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setTestimonials((prev) => prev.filter((t) => t._id !== deleteTarget._id));
        setDeleteTarget(null);
      } else {
        const data = await res.json();
        alert(data.error || "Failed to delete testimonial.");
      }
    } catch (err) {
      console.error("Delete testimonial error:", err);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1E2540] pb-5">
        <div>
          <h1 className="text-xl font-bold text-white tracking-wide flex items-center gap-2">
            <span>Testimonials &amp; Reviews</span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-pink-500/10 text-pink-400 border border-pink-500/20">
              {testimonials.length} Total
            </span>
          </h1>
          <p className="text-xs text-gray-400">
            Manage social proof, client quotes, company references, and star ratings.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#FF3B81] to-[#A855F7] hover:opacity-95 shadow-glow-sm transition-all shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Testimonial</span>
        </button>
      </div>

      {/* Testimonials List */}
      {isLoading ? (
        <div className="py-20 flex flex-col items-center justify-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-pink-500" />
          <p className="text-xs text-gray-400 font-mono">Loading testimonials...</p>
        </div>
      ) : testimonials.length === 0 ? (
        <div className="p-12 text-center rounded-2xl border border-dashed border-[#1E2540] bg-[#101426]/50 space-y-3">
          <Layers className="w-10 h-10 text-gray-600 mx-auto" />
          <p className="text-sm font-bold text-gray-300">No testimonials yet</p>
          <button
            onClick={openCreateModal}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-pink-600 hover:bg-pink-500 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create First Testimonial</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t._id}
              className="p-6 rounded-2xl bg-[#101426] border border-[#1E2540] flex flex-col justify-between space-y-4 hover:border-pink-500/30 transition-all group"
            >
              <div className="space-y-3">
                {/* Client Profile Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl overflow-hidden relative border border-[#202744] bg-[#0B0F19] shrink-0">
                      <Image
                        src={t.avatar}
                        alt={t.clientName}
                        fill
                        className="object-cover"
                        sizes="48px"
                        unoptimized={t.avatar.startsWith("http") && !t.avatar.includes("cloudinary")}
                      />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white group-hover:text-pink-400 transition-colors">
                        {t.clientName}
                      </h3>
                      <p className="text-[11px] text-gray-400">
                        {t.clientRole} &bull; <span className="text-gray-300 font-semibold">{t.clientCompany}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => openEditModal(t)}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                      title="Edit"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setDeleteTarget(t)}
                      className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-500/10 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Rating Stars */}
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < (t.rating || 5)
                          ? "text-amber-400 fill-amber-400"
                          : "text-gray-600"
                      }`}
                    />
                  ))}
                </div>

                {/* Quote Text */}
                <div className="relative pl-3 border-l-2 border-pink-500/40">
                  <p className="text-xs text-gray-300 italic leading-relaxed">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-[#1E2540]/60 flex items-center justify-between text-[10px] text-gray-500">
                <span>Featured Client</span>
                <span className="font-mono">Rating: {t.rating || 5}/5</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Testimonial Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl bg-[#141829] border border-[#232B4C] p-6 shadow-2xl space-y-5 animate-scale-up">
            <div className="flex items-center justify-between border-b border-[#1E2540] pb-3">
              <h3 className="text-sm font-bold text-white">
                {editingId ? "Edit Testimonial" : "Add Testimonial"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-white/5"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {errorMsg && (
              <div className="flex items-center gap-2 text-xs text-rose-400 bg-rose-500/10 p-3 rounded-xl border border-rose-500/20">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {successMsg && (
              <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-500/10 p-3 rounded-xl border border-emerald-500/20">
                <CheckCircle className="w-4 h-4 shrink-0" />
                <span>{successMsg}</span>
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Client Name
                  </label>
                  <input
                    type="text"
                    required
                    value={modalName}
                    onChange={(e) => setModalName(e.target.value)}
                    placeholder="e.g. Sarah Jenkins"
                    className="w-full px-3.5 py-2 rounded-xl bg-[#0B0F19] border border-[#202744] text-xs text-white placeholder-gray-500 focus:outline-none focus:border-pink-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Company
                  </label>
                  <input
                    type="text"
                    required
                    value={modalCompany}
                    onChange={(e) => setModalCompany(e.target.value)}
                    placeholder="e.g. Acme FinTech"
                    className="w-full px-3.5 py-2 rounded-xl bg-[#0B0F19] border border-[#202744] text-xs text-white placeholder-gray-500 focus:outline-none focus:border-pink-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Role / Title
                  </label>
                  <input
                    type="text"
                    value={modalRole}
                    onChange={(e) => setModalRole(e.target.value)}
                    placeholder="e.g. VP of Product"
                    className="w-full px-3.5 py-2 rounded-xl bg-[#0B0F19] border border-[#202744] text-xs text-white placeholder-gray-500 focus:outline-none focus:border-pink-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Star Rating (1 - 5)
                  </label>
                  <div className="flex items-center gap-2 pt-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setModalRating(star)}
                        className="p-1 text-gray-600 hover:text-amber-400 transition-colors"
                      >
                        <Star
                          className={`w-5 h-5 ${
                            star <= modalRating
                              ? "text-amber-400 fill-amber-400"
                              : "text-gray-600"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Avatar Uploader */}
              <div>
                <ImageUploader
                  label="Client Photo / Avatar"
                  value={modalAvatar}
                  onChange={(url) => setModalAvatar(url)}
                  folder="portfolio/testimonials"
                  aspectRatio="square"
                />
              </div>

              {/* Quote Text */}
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Testimonial Quote
                </label>
                <textarea
                  rows={3}
                  required
                  value={modalQuote}
                  onChange={(e) => setModalQuote(e.target.value)}
                  placeholder="Mark completely elevated our user experience and product metrics..."
                  className="w-full px-3.5 py-2 rounded-xl bg-[#0B0F19] border border-[#202744] text-xs text-white placeholder-gray-500 focus:outline-none focus:border-pink-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#1E2540]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  disabled={isSaving}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-400 hover:text-white bg-white/[0.04]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#FF3B81] to-[#A855F7] hover:opacity-95 disabled:opacity-50 flex items-center gap-1.5"
                >
                  {isSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : null}
                  <span>Save Testimonial</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      <DeleteModal
        isOpen={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Testimonial"
        message={`Are you sure you want to delete the testimonial from ${deleteTarget?.clientName}?`}
        isLoading={isDeleting}
      />
    </div>
  );
}

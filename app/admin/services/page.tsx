"use client";

import React, { useState, useEffect } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  Loader2,
  AlertCircle,
  CheckCircle,
  X,
  Layout,
  Smartphone,
  Globe,
  Palette,
  Code,
  Sparkles,
  Cpu,
  Layers,
} from "lucide-react";
import { DeleteModal } from "@/components/admin/DeleteModal";

interface ServiceItem {
  _id: string;
  title: string;
  description: string;
  icon: string;
  badgeColor?: string;
  linkText?: string;
  order?: number;
}

const ICON_OPTIONS = [
  { name: "Layout", icon: Layout },
  { name: "Smartphone", icon: Smartphone },
  { name: "Globe", icon: Globe },
  { name: "Palette", icon: Palette },
  { name: "Code", icon: Code },
  { name: "Sparkles", icon: Sparkles },
  { name: "Cpu", icon: Cpu },
  { name: "Layers", icon: Layers },
];

const COLOR_OPTIONS = [
  { name: "pink", class: "from-pink-500 to-purple-500", text: "Pink/Purple" },
  { name: "purple", class: "from-purple-500 to-indigo-500", text: "Purple/Indigo" },
  { name: "cyan", class: "from-cyan-500 to-blue-500", text: "Cyan/Blue" },
  { name: "emerald", class: "from-emerald-500 to-teal-500", text: "Emerald/Teal" },
  { name: "amber", class: "from-amber-500 to-orange-500", text: "Amber/Orange" },
];

export default function AdminServicesPage() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Modal editor state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [modalTitle, setModalTitle] = useState("");
  const [modalDescription, setModalDescription] = useState("");
  const [modalIcon, setModalIcon] = useState("Layout");
  const [modalColor, setModalColor] = useState("pink");
  const [modalOrder, setModalOrder] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Delete state
  const [deleteTarget, setDeleteTarget] = useState<ServiceItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchServices = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/services");
      const data = await res.json();
      if (data.data) {
        setServices(data.data);
      }
    } catch (err) {
      console.error("Error fetching services:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const openCreateModal = () => {
    setEditingId(null);
    setModalTitle("");
    setModalDescription("");
    setModalIcon("Layout");
    setModalColor("pink");
    setModalOrder(services.length);
    setErrorMsg(null);
    setSuccessMsg(null);
    setIsModalOpen(true);
  };

  const openEditModal = (service: ServiceItem) => {
    setEditingId(service._id);
    setModalTitle(service.title);
    setModalDescription(service.description);
    setModalIcon(service.icon || "Layout");
    setModalColor(service.badgeColor || "pink");
    setModalOrder(service.order || 0);
    setErrorMsg(null);
    setSuccessMsg(null);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!modalTitle.trim() || !modalDescription.trim()) {
      setErrorMsg("Title and Description are required.");
      return;
    }

    setIsSaving(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    const payload = {
      title: modalTitle.trim(),
      description: modalDescription.trim(),
      icon: modalIcon,
      badgeColor: modalColor,
      order: modalOrder,
    };

    try {
      const url = editingId ? `/api/services/${editingId}` : "/api/services";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to save service.");
      }

      setSuccessMsg("Service saved successfully!");
      fetchServices();
      setTimeout(() => {
        setIsModalOpen(false);
      }, 500);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error saving service.";
      setErrorMsg(msg);
    } finally {
      setIsSaving(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);

    try {
      const res = await fetch(`/api/services/${deleteTarget._id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setServices((prev) => prev.filter((s) => s._id !== deleteTarget._id));
        setDeleteTarget(null);
      } else {
        const data = await res.json();
        alert(data.error || "Failed to delete service.");
      }
    } catch (err) {
      console.error("Delete service error:", err);
    } finally {
      setIsDeleting(false);
    }
  };

  const renderIconComponent = (iconName: string) => {
    const found = ICON_OPTIONS.find((i) => i.name === iconName);
    const Comp = found ? found.icon : Layout;
    return <Comp className="w-5 h-5" />;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1E2540] pb-5">
        <div>
          <h1 className="text-xl font-bold text-white tracking-wide flex items-center gap-2">
            <span>Services Management</span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-pink-500/10 text-pink-400 border border-pink-500/20">
              {services.length} Active
            </span>
          </h1>
          <p className="text-xs text-gray-400">
            Define the design, development, and strategic services displayed on the public site.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#FF3B81] to-[#A855F7] hover:opacity-95 shadow-glow-sm transition-all shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Service</span>
        </button>
      </div>

      {/* Services Grid */}
      {isLoading ? (
        <div className="py-20 flex flex-col items-center justify-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-pink-500" />
          <p className="text-xs text-gray-400 font-mono">Loading services catalog...</p>
        </div>
      ) : services.length === 0 ? (
        <div className="p-12 text-center rounded-2xl border border-dashed border-[#1E2540] bg-[#101426]/50 space-y-3">
          <Layers className="w-10 h-10 text-gray-600 mx-auto" />
          <p className="text-sm font-bold text-gray-300">No services configured</p>
          <button
            onClick={openCreateModal}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-pink-600 hover:bg-pink-500 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create First Service</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <div
              key={service._id}
              className="p-6 rounded-2xl bg-[#101426] border border-[#1E2540] flex flex-col justify-between space-y-4 hover:border-pink-500/30 transition-all group"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500/10 to-purple-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400 shadow-sm group-hover:scale-105 transition-transform">
                    {renderIconComponent(service.icon)}
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-[10px] font-mono text-gray-500 px-2 py-0.5 rounded bg-white/[0.03]">
                      #{index + 1}
                    </span>
                    <button
                      onClick={() => openEditModal(service)}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                      title="Edit Service"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setDeleteTarget(service)}
                      className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-500/10 transition-colors"
                      title="Delete Service"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-pink-400 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-[#1E2540]/60 flex items-center justify-between text-[11px] text-gray-500">
                <span>Icon: <strong className="text-gray-300">{service.icon}</strong></span>
                <span className="capitalize">Badge: <strong className="text-pink-400">{service.badgeColor || "Pink"}</strong></span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Service Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl bg-[#141829] border border-[#232B4C] p-6 shadow-2xl space-y-5 animate-scale-up">
            <div className="flex items-center justify-between border-b border-[#1E2540] pb-3">
              <h3 className="text-sm font-bold text-white">
                {editingId ? "Edit Service" : "Add New Service"}
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
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Service Title
                </label>
                <input
                  type="text"
                  required
                  value={modalTitle}
                  onChange={(e) => setModalTitle(e.target.value)}
                  placeholder="e.g. UI/UX Design"
                  className="w-full px-3.5 py-2 rounded-xl bg-[#0B0F19] border border-[#202744] text-xs text-white placeholder-gray-500 focus:outline-none focus:border-pink-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  required
                  value={modalDescription}
                  onChange={(e) => setModalDescription(e.target.value)}
                  placeholder="Detailed description of deliverables..."
                  className="w-full px-3.5 py-2 rounded-xl bg-[#0B0F19] border border-[#202744] text-xs text-white placeholder-gray-500 focus:outline-none focus:border-pink-500"
                />
              </div>

              {/* Icon Selector */}
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-2">
                  Select Icon
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {ICON_OPTIONS.map((item) => {
                    const IconComp = item.icon;
                    const isSelected = modalIcon === item.name;
                    return (
                      <button
                        key={item.name}
                        type="button"
                        onClick={() => setModalIcon(item.name)}
                        className={`p-2.5 rounded-xl border flex flex-col items-center gap-1.5 transition-all ${
                          isSelected
                            ? "bg-pink-500/20 border-pink-500 text-pink-400 shadow-glow-sm"
                            : "bg-[#0B0F19] border-[#202744] text-gray-400 hover:text-white"
                        }`}
                      >
                        <IconComp className="w-4 h-4" />
                        <span className="text-[10px] font-medium">{item.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Badge Color Selector */}
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-2">
                  Accent Gradient
                </label>
                <div className="flex flex-wrap gap-2">
                  {COLOR_OPTIONS.map((c) => (
                    <button
                      key={c.name}
                      type="button"
                      onClick={() => setModalColor(c.name)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
                        modalColor === c.name
                          ? "bg-pink-500 text-white border-pink-400"
                          : "bg-[#0B0F19] border-[#202744] text-gray-400 hover:text-white"
                      }`}
                    >
                      {c.text}
                    </button>
                  ))}
                </div>
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
                  <span>Save Service</span>
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
        title="Delete Service"
        message={`Are you sure you want to delete "${deleteTarget?.title}"? It will no longer appear on your public services section.`}
        isLoading={isDeleting}
      />
    </div>
  );
}

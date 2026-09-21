"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Save,
  Eye,
  Loader2,
  CheckCircle,
  AlertCircle,
  Plus,
  X,
  Sparkles,
} from "lucide-react";
import { ImageUploader } from "./ImageUploader";
import { GalleryBuilder } from "./GalleryBuilder";
import { ProjectLivePreview } from "./ProjectLivePreview";

export interface ProjectFormData {
  title: string;
  category: string;
  subtitle: string;
  image: string;
  gallery: string[];
  overview: string;
  challenge: string;
  solution: string;
  client: string;
  duration: string;
  role: string;
  tools: string[];
  technologies: string[];
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
  order: number;
}

interface ProjectFormProps {
  initialData?: Partial<ProjectFormData>;
  projectId?: string;
}

const CATEGORY_PRESETS = [
  "Dashboard UI",
  "Mobile App",
  "SaaS Website",
  "Brand Identity",
  "E-Commerce",
  "Web Application",
  "Design System",
];

const DEFAULT_TOOLS = [
  "Figma",
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Framer Motion",
  "Node.js",
  "MongoDB",
];

export const ProjectForm: React.FC<ProjectFormProps> = ({
  initialData,
  projectId,
}) => {
  const router = useRouter();
  const isEditing = Boolean(projectId);

  const [formData, setFormData] = useState<ProjectFormData>({
    title: initialData?.title || "",
    category: initialData?.category || "Dashboard UI",
    subtitle: initialData?.subtitle || "High-converting digital product design",
    image: initialData?.image || "",
    gallery: initialData?.gallery || [],
    overview: initialData?.overview || "",
    challenge: initialData?.challenge || "",
    solution: initialData?.solution || "",
    client: initialData?.client || "",
    duration: initialData?.duration || "4 Weeks",
    role: initialData?.role || "Lead Product Designer",
    tools: initialData?.tools || ["Figma", "Next.js", "Tailwind CSS"],
    technologies: initialData?.technologies || [],
    liveUrl: initialData?.liveUrl || "",
    githubUrl: initialData?.githubUrl || "",
    featured: initialData?.featured !== undefined ? initialData.featured : true,
    order: initialData?.order || 0,
  });

  const [newToolInput, setNewToolInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [showLivePreview, setShowLivePreview] = useState(false);

  // Add Tool Tag
  const handleAddTool = (toolName: string) => {
    const trimmed = toolName.trim();
    if (trimmed && !formData.tools.includes(trimmed)) {
      setFormData((prev) => ({ ...prev, tools: [...prev.tools, trimmed] }));
      setNewToolInput("");
    }
  };

  // Remove Tool Tag
  const handleRemoveTool = (toolName: string) => {
    setFormData((prev) => ({
      ...prev,
      tools: prev.tools.filter((t) => t !== toolName),
    }));
  };

  // Form Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      setErrorMsg("Project Title is required.");
      return;
    }

    if (!formData.image.trim()) {
      setErrorMsg("Cover Image is required.");
      return;
    }

    setIsSubmitting(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      const url = isEditing ? `/api/projects/${projectId}` : "/api/projects";
      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to save project.");
      }

      setSuccessMsg(
        isEditing ? "Project updated successfully!" : "Project created successfully!"
      );

      setTimeout(() => {
        router.push("/admin/projects");
        router.refresh();
      }, 800);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error saving project.";
      setErrorMsg(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-5xl mx-auto pb-16">
      {/* Top Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1E2540] pb-5">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/projects"
            className="p-2 rounded-xl bg-white/[0.04] border border-white/10 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-white tracking-wide">
              {isEditing ? "Edit Project" : "Create New Project"}
            </h1>
            <p className="text-xs text-gray-400">
              Configure project case study details, cover image, and Behance gallery
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Live Preview Toggle */}
          <button
            type="button"
            onClick={() => setShowLivePreview(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white/[0.04] border border-white/10 text-gray-200 hover:text-white hover:bg-white/10 transition-all"
          >
            <Eye className="w-3.5 h-3.5 text-pink-400" />
            <span>Live Preview</span>
          </button>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#FF3B81] to-[#A855F7] hover:opacity-95 shadow-glow-sm disabled:opacity-50 transition-all"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Save className="w-3.5 h-3.5" />
                <span>{isEditing ? "Update Project" : "Publish Project"}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Notifications */}
      {errorMsg && (
        <div className="flex items-center gap-2 text-xs text-rose-400 bg-rose-500/10 p-4 rounded-xl border border-rose-500/20">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {successMsg && (
        <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-500/10 p-4 rounded-xl border border-emerald-500/20">
          <CheckCircle className="w-4 h-4 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Card 1: Essential Project Details */}
      <div className="p-6 rounded-2xl bg-[#101426] border border-[#1E2540] space-y-6">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-pink-400" />
          <span>Basic Information</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Title */}
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1.5">
              Project Title <span className="text-pink-400">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. Analytics Platform UI"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B0F19] border border-[#202744] text-xs text-white placeholder-gray-500 focus:outline-none focus:border-pink-500 transition-colors"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1.5">
              Category <span className="text-pink-400">*</span>
            </label>
            <div className="space-y-2">
              <input
                type="text"
                required
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                placeholder="Category"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B0F19] border border-[#202744] text-xs text-white placeholder-gray-500 focus:outline-none focus:border-pink-500 transition-colors"
              />
              <div className="flex flex-wrap gap-1.5">
                {CATEGORY_PRESETS.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setFormData({ ...formData, category: cat })}
                    className={`text-[10px] px-2 py-0.5 rounded-md transition-all ${
                      formData.category === cat
                        ? "bg-pink-500/20 text-pink-400 border border-pink-500/30"
                        : "bg-white/[0.03] text-gray-400 hover:text-white"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Subtitle */}
          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-gray-300 mb-1.5">
              Tagline / Subtitle
            </label>
            <input
              type="text"
              value={formData.subtitle}
              onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
              placeholder="e.g. Enterprise financial intelligence & data visualization dashboard"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B0F19] border border-[#202744] text-xs text-white placeholder-gray-500 focus:outline-none focus:border-pink-500 transition-colors"
            />
          </div>
        </div>

        {/* Cover Image */}
        <div className="pt-2">
          <ImageUploader
            label="Project Cover Image (Thumbnail & Hero)"
            value={formData.image}
            onChange={(url) => setFormData({ ...formData, image: url })}
            folder="portfolio/covers"
            aspectRatio="video"
          />
        </div>
      </div>

      {/* Card 2: Behance-Style Multi-Image Gallery */}
      <div className="p-6 rounded-2xl bg-[#101426] border border-[#1E2540]">
        <GalleryBuilder
          images={formData.gallery}
          onChange={(newGallery) => setFormData({ ...formData, gallery: newGallery })}
          folder="portfolio/gallery"
        />
      </div>

      {/* Card 3: Metadata & Case Study Details */}
      <div className="p-6 rounded-2xl bg-[#101426] border border-[#1E2540] space-y-6">
        <h3 className="text-sm font-bold text-white">Case Study Details</h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {/* Client */}
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1.5">
              Client
            </label>
            <input
              type="text"
              value={formData.client}
              onChange={(e) => setFormData({ ...formData, client: e.target.value })}
              placeholder="e.g. FinTech Corp"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B0F19] border border-[#202744] text-xs text-white placeholder-gray-500 focus:outline-none focus:border-pink-500 transition-colors"
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1.5">
              Role
            </label>
            <input
              type="text"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              placeholder="e.g. Lead Product Designer"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B0F19] border border-[#202744] text-xs text-white placeholder-gray-500 focus:outline-none focus:border-pink-500 transition-colors"
            />
          </div>

          {/* Duration */}
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1.5">
              Duration
            </label>
            <input
              type="text"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              placeholder="e.g. 6 Weeks"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B0F19] border border-[#202744] text-xs text-white placeholder-gray-500 focus:outline-none focus:border-pink-500 transition-colors"
            />
          </div>
        </div>

        {/* Tools & Technologies */}
        <div>
          <label className="block text-xs font-semibold text-gray-300 mb-1.5">
            Tools &amp; Technologies
          </label>
          <div className="flex flex-wrap gap-2 mb-2">
            {formData.tools.map((tool) => (
              <span
                key={tool}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-pink-500/10 text-pink-400 border border-pink-500/20 text-xs font-medium"
              >
                <span>{tool}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveTool(tool)}
                  className="hover:text-white"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>

          {/* Add custom tag */}
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={newToolInput}
              onChange={(e) => setNewToolInput(e.target.value)}
              placeholder="Add tool (e.g. Spline, Tailwind, Blender)..."
              className="flex-1 max-w-xs px-3 py-1.5 rounded-xl bg-[#0B0F19] border border-[#202744] text-xs text-white placeholder-gray-500 focus:outline-none focus:border-pink-500"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddTool(newToolInput);
                }
              }}
            />
            <button
              type="button"
              onClick={() => handleAddTool(newToolInput)}
              className="p-2 rounded-xl bg-white/[0.05] hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Common Suggestions */}
          <div className="flex flex-wrap gap-1.5 mt-2">
            {DEFAULT_TOOLS.filter((t) => !formData.tools.includes(t)).map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => handleAddTool(preset)}
                className="text-[10px] text-gray-500 hover:text-gray-300 bg-white/[0.02] px-2 py-0.5 rounded border border-white/[0.05] transition-colors"
              >
                + {preset}
              </button>
            ))}
          </div>
        </div>

        {/* Narrative & Case Study Sections */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1.5">
              Project Overview / Narrative
            </label>
            <textarea
              rows={3}
              value={formData.overview}
              onChange={(e) => setFormData({ ...formData, overview: e.target.value })}
              placeholder="Describe the context, client background, and user problem..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B0F19] border border-[#202744] text-xs text-white placeholder-gray-500 focus:outline-none focus:border-pink-500 transition-colors"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                The Challenge
              </label>
              <textarea
                rows={3}
                value={formData.challenge}
                onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
                placeholder="What critical challenges were faced?"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B0F19] border border-[#202744] text-xs text-white placeholder-gray-500 focus:outline-none focus:border-pink-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                The Solution &amp; Outcome
              </label>
              <textarea
                rows={3}
                value={formData.solution}
                onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
                placeholder="How did design & engineering resolve the pain points?"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B0F19] border border-[#202744] text-xs text-white placeholder-gray-500 focus:outline-none focus:border-pink-500 transition-colors"
              />
            </div>
          </div>
        </div>

        {/* External Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1.5">
              Live Demo URL
            </label>
            <input
              type="url"
              value={formData.liveUrl}
              onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
              placeholder="https://example.com"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B0F19] border border-[#202744] text-xs text-white placeholder-gray-500 focus:outline-none focus:border-pink-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1.5">
              GitHub / Case Study URL
            </label>
            <input
              type="url"
              value={formData.githubUrl}
              onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
              placeholder="https://github.com/..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B0F19] border border-[#202744] text-xs text-white placeholder-gray-500 focus:outline-none focus:border-pink-500 transition-colors"
            />
          </div>
        </div>

        {/* Settings: Featured & Order */}
        <div className="flex items-center gap-6 pt-3 border-t border-[#1E2540]">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={formData.featured}
              onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              className="w-4 h-4 rounded text-pink-500 focus:ring-pink-500 bg-[#0B0F19] border-[#202744]"
            />
            <span className="text-xs font-semibold text-gray-300">
              Featured on Homepage
            </span>
          </label>

          <div className="flex items-center gap-2">
            <label className="text-xs font-semibold text-gray-400">Order:</label>
            <input
              type="number"
              value={formData.order}
              onChange={(e) =>
                setFormData({ ...formData, order: parseInt(e.target.value, 10) || 0 })
              }
              className="w-16 px-2.5 py-1 rounded-lg bg-[#0B0F19] border border-[#202744] text-xs text-white text-center"
            />
          </div>
        </div>
      </div>

      {/* Floating Save Bar */}
      <div className="sticky bottom-6 flex items-center justify-end gap-3 p-4 rounded-2xl bg-[#0E1220]/95 backdrop-blur-md border border-[#1E2540] shadow-2xl">
        <button
          type="button"
          onClick={() => setShowLivePreview(true)}
          className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-white/[0.05] border border-white/10 text-gray-200 hover:text-white transition-all"
        >
          Preview Behance Layout
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#FF3B81] to-[#A855F7] hover:opacity-95 shadow-glow-sm disabled:opacity-50 transition-all flex items-center gap-2"
        >
          {isSubmitting ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          <span>{isEditing ? "Save Changes" : "Create Project"}</span>
        </button>
      </div>

      {/* Live Preview Modal */}
      <ProjectLivePreview
        isOpen={showLivePreview}
        onClose={() => setShowLivePreview(false)}
        data={formData}
      />
    </form>
  );
};

export default ProjectForm;

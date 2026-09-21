"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  ExternalLink,
  Loader2,
  Sparkles,
  Layers,
  Star,
  Eye,
} from "lucide-react";
import { DeleteModal } from "@/components/admin/DeleteModal";

interface ProjectItem {
  _id: string;
  title: string;
  category: string;
  subtitle?: string;
  image: string;
  gallery?: string[];
  client?: string;
  featured?: boolean;
  order?: number;
  createdAt?: string;
}

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Delete modal state
  const [deleteTarget, setDeleteTarget] = useState<ProjectItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Fetch projects
  const fetchProjects = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/projects");
      const data = await res.json();
      const list = data.projects || data.data || [];
      setProjects(list);
    } catch (err) {
      console.error("Error fetching projects:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Handle Delete
  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;

    setIsDeleting(true);
    try {
      const res = await fetch(`/api/projects/${deleteTarget._id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setProjects((prev) => prev.filter((p) => p._id !== deleteTarget._id));
        setDeleteTarget(null);
      } else {
        const error = await res.json();
        alert(error.error || "Failed to delete project");
      }
    } catch (err) {
      console.error("Failed to delete project:", err);
    } finally {
      setIsDeleting(false);
    }
  };

  // Filtered list
  const categories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];

  const filteredProjects = projects.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.client && p.client.toLowerCase().includes(searchQuery.toLowerCase())) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || p.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1E2540] pb-5">
        <div>
          <h1 className="text-xl font-bold text-white tracking-wide flex items-center gap-2">
            <span>Project Management</span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-pink-500/10 text-pink-400 border border-pink-500/20">
              {projects.length} Total
            </span>
          </h1>
          <p className="text-xs text-gray-400">
            Showcase your design case studies, mobile apps, and Behance-style galleries.
          </p>
        </div>

        <Link
          href="/admin/projects/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#FF3B81] to-[#A855F7] hover:opacity-95 shadow-glow-sm transition-all shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Project</span>
        </Link>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-3.5 h-3.5 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects by title, client, or category..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#101426] border border-[#1E2540] text-xs text-white placeholder-gray-500 focus:outline-none focus:border-pink-500 transition-colors"
          />
        </div>

        {/* Categories Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 ${
                selectedCategory === cat
                  ? "bg-pink-500 text-white shadow-glow-sm"
                  : "bg-[#101426] text-gray-400 border border-[#1E2540] hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Loading state */}
      {isLoading ? (
        <div className="py-20 flex flex-col items-center justify-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-pink-500" />
          <p className="text-xs text-gray-400 font-mono">Loading project catalog...</p>
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="p-12 text-center rounded-2xl border border-dashed border-[#1E2540] bg-[#101426]/50 space-y-3">
          <Layers className="w-10 h-10 text-gray-600 mx-auto" />
          <p className="text-sm font-bold text-gray-300">No projects found</p>
          <p className="text-xs text-gray-500 max-w-sm mx-auto">
            Try adjusting your search criteria or create a new project case study to showcase on your portfolio.
          </p>
          <Link
            href="/admin/projects/new"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-pink-600 hover:bg-pink-500 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create First Project</span>
          </Link>
        </div>
      ) : (
        /* Projects Grid / List */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project._id}
              className="rounded-2xl bg-[#101426] border border-[#1E2540] overflow-hidden flex flex-col justify-between hover:border-pink-500/30 transition-all group"
            >
              <div>
                {/* Cover Image Thumbnail */}
                <div className="relative aspect-video w-full bg-[#0B0F19] overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 400px"
                    unoptimized={project.image.startsWith("http") && !project.image.includes("cloudinary")}
                  />
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-black/60 text-white backdrop-blur-md border border-white/10">
                      {project.category}
                    </span>
                    {project.featured && (
                      <span className="p-1 rounded-full bg-pink-500 text-white shadow-glow-sm" title="Featured Project">
                        <Star className="w-2.5 h-2.5 fill-current" />
                      </span>
                    )}
                  </div>

                  {project.gallery && project.gallery.length > 0 && (
                    <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded-md text-[10px] font-mono bg-black/70 text-gray-200 backdrop-blur-md">
                      +{project.gallery.length} Gallery Images
                    </div>
                  )}
                </div>

                {/* Project Info */}
                <div className="p-5 space-y-2">
                  <h3 className="text-sm font-bold text-white group-hover:text-pink-400 transition-colors">
                    {project.title}
                  </h3>
                  {project.subtitle && (
                    <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
                      {project.subtitle}
                    </p>
                  )}
                  {project.client && (
                    <p className="text-[11px] text-gray-500">
                      Client: <span className="text-gray-300 font-medium">{project.client}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Action Bar */}
              <div className="p-4 pt-3 border-t border-[#1E2540] flex items-center justify-between bg-[#0E1220]/60">
                <Link
                  href={`/projects/${project._id}`}
                  target="_blank"
                  className="inline-flex items-center gap-1 text-[11px] text-gray-400 hover:text-white transition-colors"
                  title="View Public Page"
                >
                  <Eye className="w-3.5 h-3.5 text-pink-400" />
                  <span>Public View</span>
                </Link>

                <div className="flex items-center gap-1.5">
                  <Link
                    href={`/admin/projects/${project._id}`}
                    className="p-1.5 rounded-lg bg-white/[0.04] hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
                    title="Edit Project"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </Link>

                  <button
                    type="button"
                    onClick={() => setDeleteTarget(project)}
                    className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 hover:text-rose-300 transition-colors"
                    title="Delete Project"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Reusable Delete Modal */}
      <DeleteModal
        isOpen={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Project"
        message={`Are you sure you want to delete "${deleteTarget?.title}"? This case study and its gallery will be permanently removed.`}
        isLoading={isDeleting}
      />
    </div>
  );
}

"use client";

import React from "react";
import Image from "next/image";
import { X, ExternalLink, Github, Eye, Sparkles, Layers, ShieldCheck } from "lucide-react";
import { ProjectGallery } from "@/components/project/ProjectGallery";

interface ProjectPreviewData {
  title: string;
  category: string;
  subtitle?: string;
  image: string;
  gallery?: string[];
  overview?: string;
  challenge?: string;
  solution?: string;
  client?: string;
  duration?: string;
  role?: string;
  tools?: string[];
  liveUrl?: string;
  githubUrl?: string;
}

interface ProjectLivePreviewProps {
  isOpen: boolean;
  onClose: () => void;
  data: ProjectPreviewData;
}

export const ProjectLivePreview: React.FC<ProjectLivePreviewProps> = ({
  isOpen,
  onClose,
  data,
}) => {
  if (!isOpen) return null;

  const galleryImages = [
    ...(data.image ? [data.image] : []),
    ...(data.gallery || []),
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-2 sm:p-6 overflow-y-auto">
      <div className="w-full max-w-5xl bg-[#0B0F19] border border-[#1E2540] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Preview Bar Top */}
        <div className="h-14 px-6 bg-[#0E1220] border-b border-[#1E2540] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400">
              <Eye className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <span>Live Project Preview</span>
                <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-1.5 py-0.5 rounded border border-emerald-500/20">
                  Behance Style
                </span>
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Project Body (Matches public /projects/[id]) */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 sm:p-10 space-y-12">
          {/* Header Section */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-pink-500/10 text-pink-400 border border-pink-500/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{data.category || "Case Study"}</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              {data.title || "Untitled Project"}
            </h1>

            {data.subtitle && (
              <p className="text-sm sm:text-base text-gray-400 max-w-2xl leading-relaxed">
                {data.subtitle}
              </p>
            )}

            {/* Meta tags bar */}
            <div className="flex flex-wrap gap-4 pt-2 border-t border-[#1E2540] text-xs text-gray-400">
              {data.client && (
                <div>
                  <span className="text-gray-500 block text-[10px] uppercase tracking-wider font-mono">Client</span>
                  <span className="font-semibold text-white">{data.client}</span>
                </div>
              )}
              {data.role && (
                <div>
                  <span className="text-gray-500 block text-[10px] uppercase tracking-wider font-mono">Role</span>
                  <span className="font-semibold text-white">{data.role}</span>
                </div>
              )}
              {data.duration && (
                <div>
                  <span className="text-gray-500 block text-[10px] uppercase tracking-wider font-mono">Timeline</span>
                  <span className="font-semibold text-white">{data.duration}</span>
                </div>
              )}
              {data.tools && data.tools.length > 0 && (
                <div>
                  <span className="text-gray-500 block text-[10px] uppercase tracking-wider font-mono">Tools</span>
                  <div className="flex flex-wrap gap-1 mt-0.5">
                    {data.tools.map((t) => (
                      <span key={t} className="px-1.5 py-0.5 rounded bg-white/[0.05] text-[10px] text-gray-300">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-3 pt-2">
              {data.liveUrl && (
                <a
                  href={data.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-[#FF3B81] to-[#A855F7] text-white shadow-glow-sm"
                >
                  <span>Live Project</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
              {data.githubUrl && (
                <a
                  href={data.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-[#141829] border border-[#202744] text-gray-300 hover:text-white"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>Repository</span>
                </a>
              )}
            </div>
          </div>

          {/* Overview & Challenge / Solution Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
            <div className="p-6 rounded-2xl bg-[#121626] border border-[#1E2540] space-y-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-purple-400" />
                <span>The Challenge</span>
              </h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                {data.challenge || data.overview || "Overview of project challenges and user experience pain points addressed."}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#121626] border border-[#1E2540] space-y-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span>The Solution</span>
              </h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                {data.solution || "Design systems, interactive prototypes, and high-performance frontend implementation delivering results."}
              </p>
            </div>
          </div>

          {/* Behance-Style Continuous Gallery */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white">Full Showcase Gallery</h3>
              <span className="text-[11px] text-gray-500 font-mono">
                {galleryImages.length} Visual Assets
              </span>
            </div>

            {galleryImages.length > 0 ? (
              <ProjectGallery images={galleryImages} title={data.title || "Project Preview"} />
            ) : (
              <div className="p-12 text-center rounded-2xl border border-dashed border-[#1E2540] text-gray-500 text-xs">
                No images to display in gallery. Add a cover or gallery images above.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectLivePreview;

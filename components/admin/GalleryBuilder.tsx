"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  GripVertical,
  Image as ImageIcon,
  Sparkles,
  Link as LinkIcon,
  Upload,
  Loader2,
} from "lucide-react";

interface GalleryBuilderProps {
  images: string[];
  onChange: (images: string[]) => void;
  folder?: string;
}

export const GalleryBuilder: React.FC<GalleryBuilderProps> = ({
  images = [],
  onChange,
  folder = "portfolio/gallery",
}) => {
  const [newUrl, setNewUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  // Add URL to gallery
  const handleAddUrl = async () => {
    if (!newUrl.trim()) return;

    setIsUploading(true);
    try {
      // Re-host/optimize through /api/upload
      const res = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: newUrl.trim(), folder }),
      });

      const data = await res.json();
      const finalUrl = res.ok && data.url ? data.url : newUrl.trim();
      onChange([...images, finalUrl]);
      setNewUrl("");
    } catch {
      onChange([...images, newUrl.trim()]);
      setNewUrl("");
    } finally {
      setIsUploading(false);
    }
  };

  // Upload file to gallery
  const handleFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    setIsUploading(true);
    try {
      const uploadPromises = Array.from(files).map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", folder);

        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        return res.ok && data.url ? data.url : null;
      });

      const uploadedUrls = (await Promise.all(uploadPromises)).filter(Boolean) as string[];
      onChange([...images, ...uploadedUrls]);
    } catch (err) {
      console.error("Gallery upload error:", err);
    } finally {
      setIsUploading(false);
    }
  };

  // Reorder: Move up
  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const newItems = [...images];
    const temp = newItems[index - 1];
    newItems[index - 1] = newItems[index];
    newItems[index] = temp;
    onChange(newItems);
  };

  // Reorder: Move down
  const handleMoveDown = (index: number) => {
    if (index === images.length - 1) return;
    const newItems = [...images];
    const temp = newItems[index + 1];
    newItems[index + 1] = newItems[index];
    newItems[index] = temp;
    onChange(newItems);
  };

  // Remove single image
  const handleRemove = (index: number) => {
    const newItems = images.filter((_, i) => i !== index);
    onChange(newItems);
  };

  // Drag & drop handlers
  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    const newItems = [...images];
    const draggedItem = newItems[draggedIndex];
    newItems.splice(draggedIndex, 1);
    newItems.splice(index, 0, draggedItem);
    setDraggedIndex(index);
    onChange(newItems);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
            <ImageIcon className="w-4 h-4 text-pink-400" />
            <span>Behance-Style Project Gallery ({images.length} Images)</span>
          </h4>
          <p className="text-[11px] text-gray-400">
            Consecutive full-width &amp; grid images rendered seamlessly with zero gaps.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* File Upload Input */}
          <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white/[0.05] border border-white/10 hover:bg-white/10 text-gray-200 transition-all">
            <Upload className="w-3.5 h-3.5 text-pink-400" />
            <span>Upload Images</span>
            <input
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFileUpload(e.target.files)}
              disabled={isUploading}
            />
          </label>
        </div>
      </div>

      {/* URL Input Bar */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <LinkIcon className="w-3.5 h-3.5 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="url"
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)}
            placeholder="Paste direct image URL (Unsplash, Drive, CDN)..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#0B0F19] border border-[#202744] text-xs text-white placeholder-gray-500 focus:outline-none focus:border-pink-500 transition-colors"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddUrl();
              }
            }}
          />
        </div>
        <button
          type="button"
          onClick={handleAddUrl}
          disabled={isUploading || !newUrl.trim()}
          className="px-3.5 py-2 rounded-xl text-xs font-semibold text-white bg-pink-600/80 hover:bg-pink-600 disabled:opacity-50 transition-all flex items-center gap-1.5 shrink-0"
        >
          {isUploading ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <>
              <Plus className="w-3.5 h-3.5" />
              <span>Add URL</span>
            </>
          )}
        </button>
      </div>

      {/* Gallery List (Drag & Drop + Reorder Controls) */}
      {images.length === 0 ? (
        <div className="p-8 rounded-2xl border-2 border-dashed border-[#1E2540] text-center bg-[#0D111E]/40">
          <ImageIcon className="w-8 h-8 text-gray-600 mx-auto mb-2" />
          <p className="text-xs font-medium text-gray-400">
            No gallery images added yet.
          </p>
          <p className="text-[11px] text-gray-600">
            Upload images or paste image URLs to build a Behance-style project showcase.
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {images.map((imgUrl, index) => (
            <div
              key={`${imgUrl}-${index}`}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragEnd={handleDragEnd}
              className={`flex items-center gap-3 p-2.5 rounded-xl border transition-all bg-[#101426] ${
                draggedIndex === index
                  ? "border-pink-500 opacity-60 scale-[0.99]"
                  : "border-[#1E2540] hover:border-[#2D375E]"
              }`}
            >
              {/* Drag Handle */}
              <button
                type="button"
                className="cursor-grab active:cursor-grabbing text-gray-500 hover:text-gray-300 p-1"
                title="Drag to reorder"
              >
                <GripVertical className="w-4 h-4" />
              </button>

              {/* Order Number */}
              <span className="w-5 text-center text-xs font-mono font-bold text-pink-400">
                {index + 1}
              </span>

              {/* Thumbnail */}
              <div className="w-16 h-12 relative rounded-lg overflow-hidden border border-[#232B4C] shrink-0 bg-[#0B0F19]">
                <Image
                  src={imgUrl}
                  alt={`Gallery Image ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="80px"
                  unoptimized={imgUrl.startsWith("http") && !imgUrl.includes("cloudinary")}
                />
              </div>

              {/* URL string / Cloudinary tag */}
              <div className="flex-1 min-w-0 pr-2">
                <p className="text-xs text-gray-300 truncate font-mono">{imgUrl}</p>
                {imgUrl.includes("cloudinary") && (
                  <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400">
                    <Sparkles className="w-2.5 h-2.5" />
                    <span>Optimized via Cloudinary</span>
                  </span>
                )}
              </div>

              {/* Reorder Buttons (Up/Down) */}
              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  onClick={() => handleMoveUp(index)}
                  disabled={index === 0}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 disabled:opacity-30 disabled:hover:bg-transparent"
                  title="Move Up"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleMoveDown(index)}
                  disabled={index === images.length - 1}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 disabled:opacity-30 disabled:hover:bg-transparent"
                  title="Move Down"
                >
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleRemove(index)}
                  className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 ml-1"
                  title="Remove from Gallery"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GalleryBuilder;

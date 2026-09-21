"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { Upload, Link as LinkIcon, X, Loader2, Sparkles } from "lucide-react";

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  folder?: string;
  aspectRatio?: "video" | "square" | "portrait" | "auto";
  placeholder?: string;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  value,
  onChange,
  label = "Image",
  folder = "portfolio",
  aspectRatio = "video",
  placeholder = "https://images.unsplash.com/...",
}) => {
  const [activeTab, setActiveTab] = useState<"upload" | "url">("upload");
  const [inputUrl, setInputUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // File Upload Handler via /api/upload
  const handleFileUpload = async (file: File) => {
    if (!file) return;

    // Validate size (limit to 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setUploadError("Image size exceeds 10MB limit.");
      return;
    }

    setIsUploading(true);
    setUploadError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Upload failed");
      }

      onChange(data.url);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error uploading file";
      setUploadError(msg);
    } finally {
      setIsUploading(false);
    }
  };

  // URL Submission Handler
  const handleUrlSubmit = async () => {
    if (!inputUrl.trim()) return;

    setIsUploading(true);
    setUploadError(null);

    try {
      // Send URL to Cloudinary endpoint to optionally re-host & optimize
      const res = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: inputUrl.trim(), folder }),
      });

      const data = await res.json();
      if (res.ok && data.url) {
        onChange(data.url);
        setInputUrl("");
      } else {
        // Fallback: direct URL
        onChange(inputUrl.trim());
        setInputUrl("");
      }
    } catch {
      // Fallback: direct URL
      onChange(inputUrl.trim());
      setInputUrl("");
    } finally {
      setIsUploading(false);
    }
  };

  const handleClear = () => {
    onChange("");
    setInputUrl("");
    setUploadError(null);
  };

  const getAspectClass = () => {
    switch (aspectRatio) {
      case "square":
        return "aspect-square max-w-[200px]";
      case "portrait":
        return "aspect-[3/4] max-w-[200px]";
      case "auto":
        return "min-h-[160px]";
      case "video":
      default:
        return "aspect-video max-w-md";
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-semibold text-gray-300">
          {label}
        </label>
        {value && (
          <span className="inline-flex items-center gap-1 text-[10px] text-pink-400 font-medium">
            <Sparkles className="w-3 h-3" />
            <span>Cloudinary Optimized</span>
          </span>
        )}
      </div>

      {/* If Image Value Exists, Show Preview */}
      {value ? (
        <div className="relative group rounded-2xl overflow-hidden border border-[#202744] bg-[#0E1220] p-1.5 inline-block">
          <div className={`relative overflow-hidden rounded-xl ${getAspectClass()}`}>
            <Image
              src={value}
              alt="Preview"
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 400px"
              unoptimized={value.startsWith("http") && !value.includes("cloudinary")}
            />
          </div>

          <div className="absolute top-3 right-3 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              type="button"
              onClick={handleClear}
              className="p-1.5 rounded-lg bg-black/70 hover:bg-rose-600 text-white backdrop-blur-md transition-colors"
              title="Remove image"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        /* Upload or Paste URL Box */
        <div className="p-4 rounded-2xl border border-[#202744] bg-[#111526] space-y-3">
          {/* Tab Selector */}
          <div className="flex items-center gap-2 border-b border-[#1E2540] pb-2.5">
            <button
              type="button"
              onClick={() => setActiveTab("upload")}
              className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all ${
                activeTab === "upload"
                  ? "bg-pink-500/20 text-pink-400 border border-pink-500/30"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Upload File</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("url")}
              className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all ${
                activeTab === "url"
                  ? "bg-pink-500/20 text-pink-400 border border-pink-500/30"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <LinkIcon className="w-3.5 h-3.5" />
              <span>Paste URL</span>
            </button>
          </div>

          {/* Upload Tab */}
          {activeTab === "upload" && (
            <div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFileUpload(file);
                }}
                className="hidden"
              />

              <div
                onClick={() => fileInputRef.current?.click()}
                className="cursor-pointer border-2 border-dashed border-[#202744] hover:border-pink-500/50 rounded-xl p-6 text-center transition-all bg-[#0B0F19]/50 hover:bg-[#0B0F19]"
              >
                {isUploading ? (
                  <div className="flex flex-col items-center gap-2 text-pink-400 py-2">
                    <Loader2 className="w-6 h-6 animate-spin" />
                    <span className="text-xs font-medium">Optimizing &amp; Uploading to Cloudinary...</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2 text-gray-400 py-2">
                    <div className="w-10 h-10 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400">
                      <Upload className="w-5 h-5" />
                    </div>
                    <p className="text-xs font-semibold text-white">
                      Click to choose image or drag &amp; drop
                    </p>
                    <p className="text-[11px] text-gray-500">
                      PNG, JPG, WEBP, GIF up to 10MB (Auto-compressed)
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* URL Tab */}
          {activeTab === "url" && (
            <div className="flex items-center gap-2">
              <input
                type="url"
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                placeholder={placeholder}
                className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#0B0F19] border border-[#202744] text-xs text-white placeholder-gray-500 focus:outline-none focus:border-pink-500 transition-colors"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleUrlSubmit();
                  }
                }}
              />
              <button
                type="button"
                onClick={handleUrlSubmit}
                disabled={isUploading || !inputUrl.trim()}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-[#FF3B81] to-[#A855F7] hover:opacity-95 disabled:opacity-50 transition-all shrink-0 flex items-center gap-1.5"
              >
                {isUploading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <span>Apply</span>
                )}
              </button>
            </div>
          )}

          {uploadError && (
            <p className="text-xs text-rose-400 font-medium">{uploadError}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageUploader;

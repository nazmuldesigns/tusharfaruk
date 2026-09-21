"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { Upload, Link as LinkIcon, X, Loader2, Sparkles, Image as ImageIcon, Check } from "lucide-react";

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
  aspectRatio = "portrait",
  placeholder = "https://images.unsplash.com/...",
}) => {
  const [activeTab, setActiveTab] = useState<"upload" | "url">("upload");
  const [inputUrl, setInputUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [imageLoadError, setImageLoadError] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // File Upload Handler via /api/upload
  const handleFileUpload = async (file: File) => {
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      setUploadError("Image size exceeds 10MB limit.");
      return;
    }

    setIsUploading(true);
    setUploadError(null);
    setImageLoadError(false);

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
      setInputUrl(data.url);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error uploading file";
      setUploadError(msg);
    } finally {
      setIsUploading(false);
    }
  };

  // URL Submission Handler
  const handleUrlSubmit = () => {
    if (!inputUrl.trim()) return;
    setImageLoadError(false);
    setUploadError(null);
    onChange(inputUrl.trim());
  };

  const handleClear = () => {
    onChange("");
    setInputUrl("");
    setUploadError(null);
    setImageLoadError(false);
  };

  const getDimensionClass = () => {
    switch (aspectRatio) {
      case "square":
        return "w-44 h-44";
      case "portrait":
        return "w-44 h-56";
      case "video":
        return "w-full max-w-sm h-48";
      case "auto":
      default:
        return "w-full max-w-xs h-48";
    }
  };

  return (
    <div className="space-y-3">
      {/* Label Header */}
      <div className="flex items-center justify-between">
        <label className="block text-xs font-semibold text-gray-200">
          {label}
        </label>
        {value && (
          <span className="inline-flex items-center gap-1 text-[10px] text-pink-400 font-medium">
            <Sparkles className="w-3 h-3" />
            <span>Active Image</span>
          </span>
        )}
      </div>

      {/* Main Container */}
      <div className="p-4 rounded-2xl border border-[#202744] bg-[#0E1220] space-y-4">
        {/* Top Preview Section (if image value exists) */}
        {value ? (
          <div className="flex flex-col sm:flex-row items-start gap-4 p-3 rounded-xl bg-[#090D1A] border border-[#1E2540]">
            {/* Image Thumbnail */}
            <div className={`relative shrink-0 rounded-xl overflow-hidden border border-pink-500/30 bg-[#14192D] ${getDimensionClass()}`}>
              {!imageLoadError ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={value}
                  alt="Preview"
                  onError={() => setImageLoadError(true)}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-3 text-center text-gray-400">
                  <ImageIcon className="w-8 h-8 text-gray-500 mb-1" />
                  <span className="text-[10px] text-rose-400">Image load failed</span>
                </div>
              )}

              {/* Clear / Delete Button */}
              <button
                type="button"
                onClick={handleClear}
                className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/80 hover:bg-rose-600 text-white shadow-md transition-colors cursor-pointer"
                title="Remove image"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Quick Actions & URL Inspector */}
            <div className="flex-1 space-y-2.5 w-full">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-1">
                  Current Image URL
                </span>
                <div className="flex items-center gap-1.5">
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#0B0F19] border border-[#202744] text-xs text-gray-200 font-mono focus:outline-none focus:border-pink-500"
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-pink-500/15 hover:bg-pink-500/25 border border-pink-500/30 text-pink-400 text-xs font-semibold transition-all cursor-pointer"
                >
                  {isUploading ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Upload className="w-3.5 h-3.5" />
                  )}
                  <span>Upload Replacement</span>
                </button>

                <button
                  type="button"
                  onClick={handleClear}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-rose-500/20 border border-white/10 text-gray-300 hover:text-rose-400 text-xs font-semibold transition-all cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Remove</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Empty State Dropzone & URL Input */
          <div className="space-y-3">
            {/* Tabs */}
            <div className="flex items-center gap-2 border-b border-[#1E2540] pb-2">
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
                <span>Upload from Device</span>
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
                <span>Paste Web URL</span>
              </button>
            </div>

            {/* Upload Area */}
            {activeTab === "upload" && (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="cursor-pointer border-2 border-dashed border-[#202744] hover:border-pink-500/50 rounded-xl p-6 text-center transition-all bg-[#0B0F19]/60 hover:bg-[#0B0F19]"
              >
                {isUploading ? (
                  <div className="flex flex-col items-center gap-2 text-pink-400 py-2">
                    <Loader2 className="w-6 h-6 animate-spin" />
                    <span className="text-xs font-medium">Compressing &amp; Uploading to Cloudinary...</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2 text-gray-400 py-1">
                    <div className="w-10 h-10 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400">
                      <Upload className="w-5 h-5" />
                    </div>
                    <p className="text-xs font-semibold text-white">
                      Click to choose image or drag &amp; drop
                    </p>
                    <p className="text-[11px] text-gray-500">
                      Supports JPG, PNG, WEBP, GIF (Up to 10MB)
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Paste URL Area */}
            {activeTab === "url" && (
              <div className="flex items-center gap-2 pt-1">
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
                  disabled={!inputUrl.trim()}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-[#FF3B81] to-[#A855F7] hover:opacity-95 disabled:opacity-50 transition-all shrink-0 flex items-center gap-1.5 cursor-pointer"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Set Image</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* Hidden File Input */}
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

        {/* Error Alert */}
        {uploadError && (
          <p className="text-xs text-rose-400 font-medium">{uploadError}</p>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;

"use client";

import React, { useState, useEffect } from "react";
import {
  Sliders,
  Sparkles,
  User,
  Zap,
  Globe,
  Save,
  Loader2,
  AlertCircle,
  CheckCircle,
  Plus,
  Trash2,
} from "lucide-react";
import { ImageUploader } from "@/components/admin/ImageUploader";

interface SiteConfigData {
  hero: {
    greeting: string;
    name: string;
    title: string;
    tagline: string;
    bio: string;
    heroPortrait: string;
    introVideoUrl?: string;
    experienceYears: string;
  };
  about: {
    heading: string;
    bioText: string;
    yearsExperience: string;
    completedProjects: string;
    happyClients: string;
    awardsReceived: string;
  };
  skills: Array<{
    name: string;
    level: number;
    category: string;
  }>;
  contact: {
    email: string;
    phone: string;
    location: string;
    cvUrl: string;
    socials: {
      dribbble: string;
      behance: string;
      linkedin: string;
      github: string;
    };
  };
}

export default function AdminContentPage() {
  const [activeTab, setActiveTab] = useState<"hero" | "about" | "skills" | "contact">("hero");
  const [formData, setFormData] = useState<SiteConfigData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // New skill temp inputs
  const [newSkillName, setNewSkillName] = useState("");
  const [newSkillLevel, setNewSkillLevel] = useState(90);
  const [newSkillCategory, setNewSkillCategory] = useState("UI/UX");

  const fetchSettings = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/admin/settings");
      const data = await res.json();
      if (data.data) {
        setFormData(data.data);
      }
    } catch (err) {
      console.error("Failed to load settings:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;

    setIsSaving(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to update settings.");
      }

      setSuccessMsg("Site configuration saved successfully!");
      setTimeout(() => setSuccessMsg(null), 3500);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error updating site content.";
      setErrorMsg(msg);
    } finally {
      setIsSaving(false);
    }
  };

  // Skill management
  const handleAddSkill = () => {
    if (!newSkillName.trim() || !formData) return;
    const newSkill = {
      name: newSkillName.trim(),
      level: newSkillLevel,
      category: newSkillCategory.trim(),
    };
    setFormData({
      ...formData,
      skills: [...formData.skills, newSkill],
    });
    setNewSkillName("");
  };

  const handleRemoveSkill = (index: number) => {
    if (!formData) return;
    setFormData({
      ...formData,
      skills: formData.skills.filter((_, i) => i !== index),
    });
  };

  if (isLoading || !formData) {
    return (
      <div className="py-24 flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-pink-500" />
        <p className="text-xs text-gray-400 font-mono">Loading site settings...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSave} className="space-y-6 max-w-5xl mx-auto pb-16">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1E2540] pb-5">
        <div>
          <h1 className="text-xl font-bold text-white tracking-wide flex items-center gap-2">
            <Sliders className="w-5 h-5 text-pink-400" />
            <span>Site Content &amp; Bio Management</span>
          </h1>
          <p className="text-xs text-gray-400">
            Edit hero introductory text, portrait image, stats banner, skills and contact profiles.
          </p>
        </div>

        <button
          type="submit"
          disabled={isSaving}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#FF3B81] to-[#A855F7] hover:opacity-95 shadow-glow-sm disabled:opacity-50 transition-all shrink-0"
        >
          {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          <span>Save Changes</span>
        </button>
      </div>

      {/* Feedback Alerts */}
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

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-[#1E2540] pb-2 overflow-x-auto">
        {[
          { id: "hero", label: "Hero Section", icon: Sparkles },
          { id: "about", label: "About & Stats", icon: User },
          { id: "skills", label: "Skills Catalog", icon: Zap },
          { id: "contact", label: "Socials & Contact", icon: Globe },
        ].map((tab) => {
          const TabIcon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all shrink-0 ${
                isActive
                  ? "bg-pink-500 text-white shadow-glow-sm"
                  : "text-gray-400 hover:text-white bg-[#101426] border border-[#1E2540]"
              }`}
            >
              <TabIcon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: HERO SECTION */}
      {activeTab === "hero" && (
        <div className="p-6 rounded-2xl bg-[#101426] border border-[#1E2540] space-y-6">
          <h3 className="text-sm font-bold text-white">Hero Header Information</h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Greeting</label>
              <input
                type="text"
                value={formData.hero.greeting}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    hero: { ...formData.hero, greeting: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2 rounded-xl bg-[#0B0F19] border border-[#202744] text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Full Name</label>
              <input
                type="text"
                value={formData.hero.name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    hero: { ...formData.hero, name: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2 rounded-xl bg-[#0B0F19] border border-[#202744] text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Primary Title</label>
              <input
                type="text"
                value={formData.hero.title}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    hero: { ...formData.hero, title: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2 rounded-xl bg-[#0B0F19] border border-[#202744] text-xs text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">Hero Tagline</label>
            <input
              type="text"
              value={formData.hero.tagline}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  hero: { ...formData.hero, tagline: e.target.value },
                })
              }
              className="w-full px-3.5 py-2 rounded-xl bg-[#0B0F19] border border-[#202744] text-xs text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">Bio / Intro Paragraph</label>
            <textarea
              rows={3}
              value={formData.hero.bio}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  hero: { ...formData.hero, bio: e.target.value },
                })
              }
              className="w-full px-3.5 py-2 rounded-xl bg-[#0B0F19] border border-[#202744] text-xs text-white"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="p-4 rounded-2xl bg-[#0B0F19] border-2 border-pink-500/30 shadow-[0_0_25px_rgba(255,59,129,0.1)]">
              <div className="flex items-center justify-between mb-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-pink-500/20 text-pink-400 text-[10px] font-extrabold uppercase tracking-wider">
                  <Sparkles className="w-3 h-3" />
                  <span>Main Hero &amp; Base Profile Image</span>
                </span>
                {formData.hero.heroPortrait && (
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        hero: {
                          ...formData.hero,
                          heroPortrait:
                            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop",
                        },
                      })
                    }
                    className="text-[10px] text-gray-400 hover:text-rose-400 underline transition-colors cursor-pointer"
                  >
                    Reset Default
                  </button>
                )}
              </div>

              <ImageUploader
                label="Hero Portrait & Base Profile Image"
                value={formData.hero.heroPortrait}
                onChange={(url) =>
                  setFormData({
                    ...formData,
                    hero: { ...formData.hero, heroPortrait: url },
                  })
                }
                folder="portfolio/hero"
                aspectRatio="portrait"
              />
              <p className="text-[11px] text-gray-400 mt-2 leading-relaxed">
                This image is the primary base artwork across your Hero section squircle frame, profile badges, and site metadata. Upload from your device or paste any image link.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  &quot;Watch Intro&quot; Action Button URL (YouTube / Vimeo / MP4)
                </label>
                <input
                  type="text"
                  value={formData.hero.introVideoUrl || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      hero: { ...formData.hero, introVideoUrl: e.target.value },
                    })
                  }
                  placeholder="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1"
                  className="w-full px-3.5 py-2 rounded-xl bg-[#0B0F19] border border-[#202744] text-xs text-white font-mono"
                />
                <p className="text-[11px] text-gray-500 mt-1">
                  The video played when visitors click &quot;Watch Intro&quot; in the hero section.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Experience Badge Text
                </label>
                <input
                  type="text"
                  value={formData.hero.experienceYears}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      hero: { ...formData.hero, experienceYears: e.target.value },
                    })
                  }
                  placeholder="5+"
                  className="w-full px-3.5 py-2 rounded-xl bg-[#0B0F19] border border-[#202744] text-xs text-white"
                />
                <p className="text-[11px] text-gray-500 mt-1">
                  Appears on the floating experience badge next to your portrait squircle.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: ABOUT & METRICS */}
      {activeTab === "about" && (
        <div className="p-6 rounded-2xl bg-[#101426] border border-[#1E2540] space-y-6">
          <h3 className="text-sm font-bold text-white">About &amp; Key Metrics Bar</h3>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">Section Heading</label>
            <input
              type="text"
              value={formData.about.heading}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  about: { ...formData.about, heading: e.target.value },
                })
              }
              className="w-full px-3.5 py-2 rounded-xl bg-[#0B0F19] border border-[#202744] text-xs text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">About Bio</label>
            <textarea
              rows={4}
              value={formData.about.bioText}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  about: { ...formData.about, bioText: e.target.value },
                })
              }
              className="w-full px-3.5 py-2 rounded-xl bg-[#0B0F19] border border-[#202744] text-xs text-white"
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Happy Clients</label>
              <input
                type="text"
                value={formData.about.happyClients}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    about: { ...formData.about, happyClients: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2 rounded-xl bg-[#0B0F19] border border-[#202744] text-xs text-white text-center font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Completed Projects</label>
              <input
                type="text"
                value={formData.about.completedProjects}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    about: { ...formData.about, completedProjects: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2 rounded-xl bg-[#0B0F19] border border-[#202744] text-xs text-white text-center font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Years Experience</label>
              <input
                type="text"
                value={formData.about.yearsExperience}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    about: { ...formData.about, yearsExperience: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2 rounded-xl bg-[#0B0F19] border border-[#202744] text-xs text-white text-center font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Awards Received</label>
              <input
                type="text"
                value={formData.about.awardsReceived}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    about: { ...formData.about, awardsReceived: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2 rounded-xl bg-[#0B0F19] border border-[#202744] text-xs text-white text-center font-bold"
              />
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: SKILLS CATALOG */}
      {activeTab === "skills" && (
        <div className="p-6 rounded-2xl bg-[#101426] border border-[#1E2540] space-y-6">
          <h3 className="text-sm font-bold text-white">Skills &amp; Competencies</h3>

          {/* Add Skill Row */}
          <div className="p-4 rounded-xl bg-[#0B0F19] border border-[#1E2540] flex flex-col sm:flex-row items-end gap-3">
            <div className="flex-1 w-full">
              <label className="block text-xs font-semibold text-gray-300 mb-1">Skill Name</label>
              <input
                type="text"
                value={newSkillName}
                onChange={(e) => setNewSkillName(e.target.value)}
                placeholder="e.g. Design Systems"
                className="w-full px-3.5 py-2 rounded-xl bg-[#141829] border border-[#202744] text-xs text-white"
              />
            </div>

            <div className="w-full sm:w-32">
              <label className="block text-xs font-semibold text-gray-300 mb-1">Category</label>
              <input
                type="text"
                value={newSkillCategory}
                onChange={(e) => setNewSkillCategory(e.target.value)}
                placeholder="UI/UX"
                className="w-full px-3.5 py-2 rounded-xl bg-[#141829] border border-[#202744] text-xs text-white"
              />
            </div>

            <div className="w-full sm:w-28">
              <label className="block text-xs font-semibold text-gray-300 mb-1">Proficiency %</label>
              <input
                type="number"
                min="10"
                max="100"
                value={newSkillLevel}
                onChange={(e) => setNewSkillLevel(parseInt(e.target.value, 10) || 90)}
                className="w-full px-3.5 py-2 rounded-xl bg-[#141829] border border-[#202744] text-xs text-white text-center"
              />
            </div>

            <button
              type="button"
              onClick={handleAddSkill}
              className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-pink-600 hover:bg-pink-500 transition-colors flex items-center gap-1.5 shrink-0"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Skill</span>
            </button>
          </div>

          {/* Current Skills List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {formData.skills.map((skill, index) => (
              <div
                key={`${skill.name}-${index}`}
                className="p-3.5 rounded-xl bg-[#0B0F19] border border-[#1E2540] flex items-center justify-between"
              >
                <div>
                  <p className="text-xs font-bold text-white">{skill.name}</p>
                  <p className="text-[10px] text-gray-400">
                    Category: <span className="text-pink-400">{skill.category}</span> &bull; {skill.level}%
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(index)}
                  className="p-1 text-rose-400 hover:text-rose-300"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: SOCIALS & CONTACT */}
      {activeTab === "contact" && (
        <div className="p-6 rounded-2xl bg-[#101426] border border-[#1E2540] space-y-6">
          <h3 className="text-sm font-bold text-white">Contact Info &amp; Profiles</h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Email Address</label>
              <input
                type="email"
                value={formData.contact.email}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    contact: { ...formData.contact, email: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2 rounded-xl bg-[#0B0F19] border border-[#202744] text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Phone Number</label>
              <input
                type="text"
                value={formData.contact.phone}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    contact: { ...formData.contact, phone: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2 rounded-xl bg-[#0B0F19] border border-[#202744] text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Location</label>
              <input
                type="text"
                value={formData.contact.location}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    contact: { ...formData.contact, location: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2 rounded-xl bg-[#0B0F19] border border-[#202744] text-xs text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">Resume / CV URL</label>
            <input
              type="text"
              value={formData.contact.cvUrl}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  contact: { ...formData.contact, cvUrl: e.target.value },
                })
              }
              placeholder="/cv/Mark_Davis_CV.pdf"
              className="w-full px-3.5 py-2 rounded-xl bg-[#0B0F19] border border-[#202744] text-xs text-white"
            />
          </div>

          <div className="pt-2 border-t border-[#1E2540]">
            <h4 className="text-xs font-bold text-gray-300 mb-3">Social Profiles</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-medium text-gray-400 mb-1">Dribbble</label>
                <input
                  type="url"
                  value={formData.contact.socials.dribbble}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      contact: {
                        ...formData.contact,
                        socials: { ...formData.contact.socials, dribbble: e.target.value },
                      },
                    })
                  }
                  className="w-full px-3.5 py-2 rounded-xl bg-[#0B0F19] border border-[#202744] text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-gray-400 mb-1">Behance</label>
                <input
                  type="url"
                  value={formData.contact.socials.behance}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      contact: {
                        ...formData.contact,
                        socials: { ...formData.contact.socials, behance: e.target.value },
                      },
                    })
                  }
                  className="w-full px-3.5 py-2 rounded-xl bg-[#0B0F19] border border-[#202744] text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-gray-400 mb-1">LinkedIn</label>
                <input
                  type="url"
                  value={formData.contact.socials.linkedin}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      contact: {
                        ...formData.contact,
                        socials: { ...formData.contact.socials, linkedin: e.target.value },
                      },
                    })
                  }
                  className="w-full px-3.5 py-2 rounded-xl bg-[#0B0F19] border border-[#202744] text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-gray-400 mb-1">GitHub</label>
                <input
                  type="url"
                  value={formData.contact.socials.github}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      contact: {
                        ...formData.contact,
                        socials: { ...formData.contact.socials, github: e.target.value },
                      },
                    })
                  }
                  className="w-full px-3.5 py-2 rounded-xl bg-[#0B0F19] border border-[#202744] text-xs text-white"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </form>
  );
}

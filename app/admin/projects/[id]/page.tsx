"use client";

import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import { ArrowLeft, Loader2, AlertCircle } from "lucide-react";
import { ProjectForm, ProjectFormData } from "@/components/admin/ProjectForm";

interface EditProjectPageProps {
  params: Promise<{ id: string }>;
}

export default function AdminEditProjectPage({ params }: EditProjectPageProps) {
  const resolvedParams = use(params);
  const projectId = resolvedParams.id;

  const [projectData, setProjectData] = useState<ProjectFormData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`/api/projects/${projectId}`);
        const data = await res.json();

        if (!res.ok || !data.data) {
          throw new Error(data.error || "Project not found.");
        }

        const p = data.data;
        setProjectData({
          title: p.title || "",
          category: p.category || "Dashboard UI",
          subtitle: p.subtitle || "",
          image: p.image || "",
          gallery: p.gallery || [],
          overview: p.overview || "",
          challenge: p.challenge || "",
          solution: p.solution || "",
          client: p.client || "",
          duration: p.duration || "",
          role: p.role || "",
          tools: p.tools || [],
          technologies: p.technologies || [],
          liveUrl: p.liveUrl || "",
          githubUrl: p.githubUrl || "",
          featured: p.featured !== undefined ? p.featured : true,
          order: p.order || 0,
        });
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "Error loading project.";
        setErrorMsg(msg);
      } finally {
        setIsLoading(false);
      }
    };

    if (projectId) {
      fetchProject();
    }
  }, [projectId]);

  if (isLoading) {
    return (
      <div className="py-24 flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-pink-500" />
        <p className="text-xs text-gray-400 font-mono">Loading case study details...</p>
      </div>
    );
  }

  if (errorMsg || !projectData) {
    return (
      <div className="max-w-md mx-auto py-20 text-center space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mx-auto">
          <AlertCircle className="w-6 h-6" />
        </div>
        <h2 className="text-base font-bold text-white">Failed to Load Project</h2>
        <p className="text-xs text-gray-400">{errorMsg || "Unable to locate project."}</p>
        <Link
          href="/admin/projects"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-white/[0.05] hover:bg-white/10 text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Projects</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="py-2">
      <ProjectForm initialData={projectData} projectId={projectId} />
    </div>
  );
}

import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Github, Calendar, User, Briefcase, Layers } from "lucide-react";
import { fallbackProjects, personalInfo } from "@/lib/data";
import ProjectGallery from "@/components/project/ProjectGallery";
import { connectToDatabase } from "@/lib/db/mongodb";
import ProjectModel from "@/lib/models/Project";
import { Project } from "@/types";
import ScrollProgressBar from "@/components/shared/ScrollProgressBar";
import PageTransition from "@/components/shared/PageTransition";
import { ImageWithSkeleton } from "@/components/shared/ImageWithSkeleton";

interface PageProps {
  params: Promise<{ id: string }>;
}

async function getProjectData(id: string): Promise<{ project: Project | null; related: Project[] }> {
  let project: Project | null = null;
  let allProjects: Project[] = fallbackProjects;

  try {
    const db = await connectToDatabase();
    if (db) {
      const dbProjects = await ProjectModel.find({}).sort({ order: 1 });
      if (dbProjects && dbProjects.length > 0) {
        allProjects = dbProjects.map((p) => {
          const obj = p.toObject();
          return {
            ...obj,
            _id: obj._id ? obj._id.toString() : undefined,
          };
        }) as Project[];
      }
    }
  } catch {
    allProjects = fallbackProjects;
  }

  // Match by id or slug
  project =
    allProjects.find((p) => p._id === id || p.slug === id || p.title.toLowerCase().replace(/\s+/g, "-") === id) ||
    fallbackProjects.find((p) => p._id === id || p.slug === id || p.title.toLowerCase().replace(/\s+/g, "-") === id) ||
    null;

  const related = allProjects
    .filter((p) => p._id !== project?._id && p.slug !== project?.slug)
    .slice(0, 3);

  return { project, related };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const { project } = await getProjectData(id);

  if (!project) {
    return {
      title: "Project Not Found | Tushar Faruk",
      description: "The requested project case study could not be found.",
    };
  }

  const title = `${project.title} | Tushar Faruk Brand Design Case Study`;
  const description =
    project.overview || project.subtitle || "High-impact visual identity and brand design system by Tushar Faruk.";
  const image = project.image || personalInfo.heroPortrait;

  return {
    title,
    description,
    keywords: [
      project.category,
      "Brand Identity Design",
      "Case Study",
      "Tushar Faruk",
      ...(project.tools || []),
    ],
    openGraph: {
      title,
      description,
      type: "article",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { id } = await params;
  const { project, related } = await getProjectData(id);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white selection:bg-pink-500 selection:text-white">
      {/* Top Neon Scroll Progress Indicator */}
      <ScrollProgressBar />

      {/* Top Header / Breadcrumbs */}
      <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#0B0F19]/85 border-b border-[#1E2540] px-6 lg:px-12 py-3.5">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/#portfolio"
            className="inline-flex items-center gap-2 text-xs font-semibold text-gray-300 hover:text-pink-400 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to Portfolio</span>
          </Link>

          <div className="flex items-center gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="gradient-btn-primary inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold text-white shadow-sm"
              >
                <span>Live Demo</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white/[0.05] border border-white/[0.1] text-gray-300 hover:text-white hover:bg-white/[0.1] transition-all"
                title="View Source on GitHub"
                aria-label="View Source Code on GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </header>

      {/* Main Container Wrapped with Smooth PageTransition */}
      <PageTransition className="w-full">
        {/* Project Hero Header */}
        <section className="max-w-5xl mx-auto px-6 pt-10 pb-12 space-y-8">
          {/* Category Tag Pill */}
          <div className="inline-flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-extrabold tracking-wider uppercase bg-pink-500/15 text-pink-400 border border-pink-500/30">
              {project.category}
            </span>
          </div>

          {/* Title & Subtitle */}
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-[1.15]">
              {project.title}
            </h1>
            <p className="text-base sm:text-lg text-gray-300 font-medium">
              {project.subtitle}
            </p>
          </div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-[#1E2540]">
            {project.client && (
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                  <Briefcase className="w-3.5 h-3.5 text-pink-400" />
                  <span>Client</span>
                </div>
                <p className="text-xs font-semibold text-white">{project.client}</p>
              </div>
            )}

            {project.role && (
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                  <User className="w-3.5 h-3.5 text-purple-400" />
                  <span>Role</span>
                </div>
                <p className="text-xs font-semibold text-white">{project.role}</p>
              </div>
            )}

            {project.duration && (
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                  <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Timeline</span>
                </div>
                <p className="text-xs font-semibold text-white">{project.duration}</p>
              </div>
            )}

            {project.tools && project.tools.length > 0 && (
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                  <Layers className="w-3.5 h-3.5 text-rose-400" />
                  <span>Tools</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {project.tools.slice(0, 3).map((tool) => (
                    <span
                      key={tool}
                      className="px-2 py-0.5 rounded text-[10px] bg-white/[0.05] border border-white/[0.08] text-gray-300"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Large Hero Image Banner */}
        <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] max-h-[650px] bg-[#13182C] border-y border-[#1E2540] overflow-hidden">
          <ImageWithSkeleton
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 1200px) 100vw, 1200px"
            wrapperClassName="w-full h-full"
            className="object-cover object-center"
            priority
          />
        </div>

        {/* Behance-Style Continuous Gallery & Narrative */}
        <ProjectGallery
          images={project.gallery || [project.image]}
          title={project.title}
          overview={project.overview}
          challenge={project.challenge}
          solution={project.solution}
        />

        {/* Related Projects Showcase */}
        {related.length > 0 && (
          <section className="py-20 border-t border-[#1E2540] bg-[#0D111E]">
            <div className="max-w-6xl mx-auto px-6 lg:px-8 space-y-10">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold tracking-widest text-[#FF3B81] uppercase">
                    EXPLORE MORE
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    Related Projects
                  </h2>
                </div>
                <Link
                  href="/#portfolio"
                  className="text-xs font-semibold text-gray-300 hover:text-pink-400 transition-colors"
                >
                  View All →
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {related.map((relProj) => (
                  <Link
                    key={relProj._id || relProj.slug}
                    href={`/projects/${relProj.slug || relProj._id}`}
                    className="group rounded-2xl bg-[#13182C] border border-[#1E2540] hover:border-purple-500/50 overflow-hidden transition-all duration-300 shadow-glow-card flex flex-col justify-between"
                  >
                    <div className="relative aspect-[4/3] w-full bg-[#181F38] overflow-hidden">
                      <ImageWithSkeleton
                        src={relProj.image}
                        alt={relProj.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        wrapperClassName="w-full h-full"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4 space-y-1">
                      <span className="text-[10px] font-semibold text-pink-400">
                        {relProj.category}
                      </span>
                      <h3 className="text-sm font-bold text-white group-hover:text-pink-400 transition-colors truncate">
                        {relProj.title}
                      </h3>
                      <p className="text-xs text-gray-400 font-normal line-clamp-1">{relProj.subtitle}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Bottom CTA Banner */}
        <section className="py-16 text-center border-t border-[#1E2540] px-6">
          <div className="max-w-2xl mx-auto space-y-4">
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Interested in Working Together?
            </h2>
            <p className="text-xs sm:text-sm text-gray-400">
              Let&apos;s turn your vision into a remarkable digital product.
            </p>
            <div className="pt-2">
              <Link
                href="/#contact"
                className="gradient-btn-primary inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold text-white shadow-glow-sm hover:shadow-glow-pink"
              >
                <span>Let&apos;s Talk</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>
      </PageTransition>
    </div>
  );
}

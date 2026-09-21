import { MetadataRoute } from "next";
import { fallbackProjects, fallbackServices } from "@/lib/data";
import { connectToDatabase } from "@/lib/db/mongodb";
import ProjectModel from "@/lib/models/Project";
import ServiceModel from "@/lib/models/Service";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXTAUTH_URL || "https://tusharfaruk-portfolio.vercel.app";

  let projectSlugs = fallbackProjects.map((p) => p.slug || p._id);
  let serviceSlugs = fallbackServices.map((s) => s._id || s.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"));

  try {
    const db = await connectToDatabase();
    if (db) {
      const dbProjects = await ProjectModel.find({}, "_id slug updatedAt").lean();
      if (dbProjects && dbProjects.length > 0) {
        projectSlugs = dbProjects.map((p) => (p as { slug?: string; _id?: { toString(): string } }).slug || (p as { _id?: { toString(): string } })._id?.toString() || "");
      }

      const dbServices = await ServiceModel.find({}, "_id title updatedAt").lean();
      if (dbServices && dbServices.length > 0) {
        serviceSlugs = dbServices.map((s) => (s as { _id?: { toString(): string } })._id?.toString() || "");
      }
    }
  } catch {
    projectSlugs = fallbackProjects.map((p) => p.slug || p._id);
  }

  const projectUrls: MetadataRoute.Sitemap = projectSlugs.filter(Boolean).map((slug) => ({
    url: `${baseUrl}/projects/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const serviceUrls: MetadataRoute.Sitemap = serviceSlugs.filter(Boolean).map((slug) => ({
    url: `${baseUrl}/services/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1.0,
    },
    ...projectUrls,
    ...serviceUrls,
  ];
}


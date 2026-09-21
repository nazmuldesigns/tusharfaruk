import { MetadataRoute } from "next";
import { fallbackProjects } from "@/lib/data";
import { connectToDatabase } from "@/lib/db/mongodb";
import ProjectModel from "@/lib/models/Project";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXTAUTH_URL || "https://markdavis-portfolio.vercel.app";

  let projectSlugs = fallbackProjects.map((p) => p.slug || p._id);

  try {
    const db = await connectToDatabase();
    if (db) {
      const dbProjects = await ProjectModel.find({}, "_id slug updatedAt").lean();
      if (dbProjects && dbProjects.length > 0) {
        projectSlugs = dbProjects.map((p) => (p as { slug?: string; _id?: { toString(): string } }).slug || (p as { _id?: { toString(): string } })._id?.toString() || "");
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

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1.0,
    },
    ...projectUrls,
  ];
}

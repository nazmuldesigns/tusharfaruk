import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db/mongodb";
import SiteConfig from "@/lib/models/SiteConfig";
import { personalInfo } from "@/lib/data";

const defaultPublicSettings = {
  hero: {
    greeting: personalInfo.greeting,
    name: personalInfo.name,
    title: personalInfo.title,
    tagline: personalInfo.tagline,
    bio: personalInfo.bio,
    heroPortrait: personalInfo.heroPortrait,
    introVideoUrl: personalInfo.introVideoUrl,
    experienceYears: personalInfo.experienceYears,
  },
  about: {
    heading: "About Me",
    bioText: personalInfo.bio,
    yearsExperience: "5+",
    completedProjects: "120+",
    happyClients: "80+",
    awardsReceived: "15+",
  },
  contact: {
    email: personalInfo.email,
    phone: personalInfo.phone,
    location: personalInfo.location,
    cvUrl: personalInfo.cvUrl,
    socials: personalInfo.socials,
  },
};

export async function GET() {
  try {
    const db = await connectToDatabase();
    if (db) {
      const config = await SiteConfig.findOne({}).lean();
      if (config) {
        return NextResponse.json({ success: true, data: config });
      }
    }
    return NextResponse.json({ success: true, data: defaultPublicSettings, fallback: true });
  } catch (error) {
    console.error("Public settings GET error:", error);
    return NextResponse.json({ success: true, data: defaultPublicSettings, fallback: true });
  }
}

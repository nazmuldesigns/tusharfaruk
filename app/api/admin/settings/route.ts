import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db/mongodb";
import SiteConfig from "@/lib/models/SiteConfig";
import { personalInfo } from "@/lib/data";

const defaultSettings = {
  hero: {
    greeting: personalInfo.greeting,
    name: personalInfo.name,
    title: personalInfo.title,
    tagline: personalInfo.tagline,
    bio: personalInfo.bio,
    heroPortrait: personalInfo.heroPortrait,
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
  skills: [
    { name: "Figma & Design Systems", level: 95, category: "UI/UX" },
    { name: "React & Next.js", level: 90, category: "Frontend" },
    { name: "Tailwind CSS & Framer Motion", level: 92, category: "Frontend" },
    { name: "TypeScript", level: 85, category: "Languages" },
    { name: "Mobile App Design", level: 88, category: "Mobile" },
    { name: "Brand & Visual Identity", level: 90, category: "Branding" },
  ],
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
      let config = await SiteConfig.findOne({});
      if (!config) {
        config = await SiteConfig.create(defaultSettings);
      }
      return NextResponse.json({ success: true, data: config });
    }
    return NextResponse.json({ success: true, data: defaultSettings, fallback: true });
  } catch (error) {
    console.error("Settings GET error:", error);
    return NextResponse.json({ success: true, data: defaultSettings, fallback: true });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const db = await connectToDatabase();
    if (!db) {
      return NextResponse.json(
        { error: "Database not connected. Please configure MONGODB_URI." },
        { status: 503 }
      );
    }

    const body = await req.json();
    let config = await SiteConfig.findOne({});

    if (!config) {
      config = await SiteConfig.create(body);
    } else {
      config = await SiteConfig.findByIdAndUpdate(config._id, body, { new: true });
    }

    return NextResponse.json({ success: true, data: config });
  } catch (error) {
    console.error("Settings PUT error:", error);
    return NextResponse.json({ error: "Failed to update settings." }, { status: 500 });
  }
}

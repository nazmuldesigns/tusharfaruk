import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db/mongodb";
import Project from "@/lib/models/Project";
import Service from "@/lib/models/Service";
import Testimonial from "@/lib/models/Testimonial";
import SiteConfig from "@/lib/models/SiteConfig";
import { fallbackProjects, fallbackServices, fallbackTestimonials, personalInfo } from "@/lib/data";

export async function POST() {
  try {
    const db = await connectToDatabase();
    if (!db) {
      return NextResponse.json(
        {
          error:
            "Could not connect to MongoDB cluster (verify your MongoDB Atlas cluster hostname and whitelist IP in Atlas network settings). Operating in graceful fallback mode.",
        },
        { status: 503 }
      );
    }

    // Clear and re-populate with 15 brand design projects
    await Project.deleteMany({});
    await Service.deleteMany({});
    await Testimonial.deleteMany({});

    await Project.insertMany(
      fallbackProjects.map((p) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { _id, ...rest } = p;
        return rest;
      })
    );

    await Service.insertMany(
      fallbackServices.map((s) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { _id, ...rest } = s;
        return rest;
      })
    );

    await Testimonial.insertMany(
      fallbackTestimonials.map((t) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { _id, ...rest } = t;
        return rest;
      })
    );

    // Update SiteConfig to Tushar Faruk
    await SiteConfig.deleteMany({});
    await SiteConfig.create({
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
      skills: [
        { name: "Brand Identity & Strategy", level: 98, category: "Branding" },
        { name: "Adobe Illustrator (Vector Art)", level: 96, category: "Design Tools" },
        { name: "Adobe Photoshop (Mockups & Retouch)", level: 94, category: "Design Tools" },
        { name: "Logo & Typography Systems", level: 95, category: "Typography" },
        { name: "Luxury Product Packaging", level: 90, category: "Packaging" },
        { name: "Figma UI & Design Systems", level: 88, category: "Digital" },
      ],
      contact: {
        email: personalInfo.email,
        phone: personalInfo.phone,
        location: personalInfo.location,
        cvUrl: personalInfo.cvUrl,
        socials: personalInfo.socials,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Database seeded successfully with Tushar Faruk brand designer data!",
    });
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json({ error: "Failed to seed database." }, { status: 500 });
  }
}

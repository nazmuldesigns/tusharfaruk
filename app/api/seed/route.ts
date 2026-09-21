import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db/mongodb";
import Project from "@/lib/models/Project";
import Service from "@/lib/models/Service";
import Testimonial from "@/lib/models/Testimonial";
import { fallbackProjects, fallbackServices, fallbackTestimonials } from "@/lib/data";

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

    // Clear and re-populate
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

    // Also ensure SiteConfig is seeded
    const SiteConfig = (await import("@/lib/models/SiteConfig")).default;
    const existingConfig = await SiteConfig.findOne({});
    if (!existingConfig) {
      await SiteConfig.create({
        hero: {
          greeting: "HELLO, I'M",
          name: "Mark Davis",
          title: "UI/UX Designer",
          tagline: "I Design Experiences That Make an Impact.",
          bio: "I'm a UI/UX Designer helping startups and businesses create digital products users love.",
          heroPortrait: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop",
          experienceYears: "5+",
        },
        about: {
          heading: "About Me",
          bioText: "Specialized in modern web and mobile product design, building user-centric interfaces.",
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
        ],
        contact: {
          email: "tusharfaruk@gmail.com",
          phone: "+1 234 567 8900",
          location: "San Francisco, CA",
          cvUrl: "/cv/Mark_Davis_CV.pdf",
          socials: {
            dribbble: "https://dribbble.com",
            behance: "https://behance.net",
            linkedin: "https://linkedin.com",
            github: "https://github.com",
          },
        },
      });
    }

    return NextResponse.json({
      success: true,
      message: "Database seeded successfully with Mark Davis portfolio data!",
    });
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json({ error: "Failed to seed database." }, { status: 500 });
  }
}

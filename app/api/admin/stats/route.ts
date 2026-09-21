import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db/mongodb";
import Project from "@/lib/models/Project";
import Service from "@/lib/models/Service";
import Testimonial from "@/lib/models/Testimonial";
import ContactMessage from "@/lib/models/ContactMessage";
import { fallbackProjects, fallbackServices, fallbackTestimonials } from "@/lib/data";

export async function GET() {
  try {
    const db = await connectToDatabase();

    let projectCount = fallbackProjects.length;
    let serviceCount = fallbackServices.length;
    let testimonialCount = fallbackTestimonials.length;
    let messageCount = 0;
    let unreadMessages = 0;
    let recentMessages: unknown[] = [];
    const isDbConnected = Boolean(db);

    if (db) {
      const [pCount, sCount, tCount, mCount, unreadCount, recent] = await Promise.all([
        Project.countDocuments(),
        Service.countDocuments(),
        Testimonial.countDocuments(),
        ContactMessage.countDocuments(),
        ContactMessage.countDocuments({ status: "unread" }),
        ContactMessage.find({}).sort({ createdAt: -1 }).limit(5),
      ]);

      projectCount = pCount || projectCount;
      serviceCount = sCount || serviceCount;
      testimonialCount = tCount || testimonialCount;
      messageCount = mCount;
      unreadMessages = unreadCount;
      recentMessages = recent;
    }

    const cloudinaryConfigured = Boolean(
      process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME &&
        process.env.CLOUDINARY_API_KEY &&
        process.env.CLOUDINARY_API_SECRET
    );

    const telegramConfigured = Boolean(
      process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID
    );

    return NextResponse.json({
      success: true,
      stats: {
        projects: projectCount,
        services: serviceCount,
        testimonials: testimonialCount,
        messages: messageCount,
        unreadMessages,
      },
      health: {
        database: isDbConnected,
        cloudinary: cloudinaryConfigured,
        telegram: telegramConfigured,
      },
      recentMessages,
    });
  } catch (error) {
    console.error("Admin stats error:", error);
    return NextResponse.json(
      {
        success: false,
        stats: {
          projects: fallbackProjects.length,
          services: fallbackServices.length,
          testimonials: fallbackTestimonials.length,
          messages: 0,
          unreadMessages: 0,
        },
        health: { database: false, cloudinary: false, telegram: false },
        recentMessages: [],
      },
      { status: 200 }
    );
  }
}

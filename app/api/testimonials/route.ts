import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db/mongodb";
import Testimonial from "@/lib/models/Testimonial";
import { fallbackTestimonials } from "@/lib/data";

export async function GET() {
  try {
    const db = await connectToDatabase();
    if (db) {
      const testimonials = await Testimonial.find({}).sort({ order: 1 });
      if (testimonials && testimonials.length > 0) {
        return NextResponse.json({ success: true, testimonials, data: testimonials });
      }
    }
    return NextResponse.json({
      success: true,
      testimonials: fallbackTestimonials,
      data: fallbackTestimonials,
      fallback: true,
    });
  } catch (error) {
    console.error("Testimonials GET error:", error);
    return NextResponse.json({
      success: true,
      testimonials: fallbackTestimonials,
      data: fallbackTestimonials,
      fallback: true,
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    const db = await connectToDatabase();
    if (!db) {
      return NextResponse.json(
        { error: "Database not connected. Provide MONGODB_URI to persist." },
        { status: 503 }
      );
    }
    const body = await req.json();
    const newTestimonial = await Testimonial.create(body);
    return NextResponse.json(
      { success: true, data: newTestimonial },
      { status: 201 }
    );
  } catch (error) {
    console.error("Testimonials POST error:", error);
    return NextResponse.json(
      { error: "Failed to create testimonial." },
      { status: 500 }
    );
  }
}

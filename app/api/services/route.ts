import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db/mongodb";
import Service from "@/lib/models/Service";
import { fallbackServices } from "@/lib/data";

export async function GET() {
  try {
    const db = await connectToDatabase();
    if (db) {
      const services = await Service.find({}).sort({ order: 1 });
      if (services && services.length > 0) {
        return NextResponse.json({ success: true, services, data: services });
      }
    }
    return NextResponse.json({ success: true, services: fallbackServices, data: fallbackServices, fallback: true });
  } catch (error) {
    console.error("Services GET error:", error);
    return NextResponse.json({ success: true, services: fallbackServices, data: fallbackServices, fallback: true });
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
    const newService = await Service.create(body);
    return NextResponse.json({ success: true, data: newService }, { status: 201 });
  } catch (error) {
    console.error("Services POST error:", error);
    return NextResponse.json({ error: "Failed to create service." }, { status: 500 });
  }
}

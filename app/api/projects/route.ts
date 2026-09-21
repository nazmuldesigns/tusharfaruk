import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db/mongodb";
import Project from "@/lib/models/Project";
import { fallbackProjects } from "@/lib/data";

export async function GET() {
  try {
    const db = await connectToDatabase();
    if (db) {
      const projects = await Project.find({}).sort({ order: 1, createdAt: -1 });
      if (projects && projects.length > 0) {
        return NextResponse.json({ success: true, projects, data: projects });
      }
    }
    return NextResponse.json({ success: true, projects: fallbackProjects, data: fallbackProjects, fallback: true });
  } catch (error) {
    console.error("Projects GET error:", error);
    return NextResponse.json({ success: true, projects: fallbackProjects, data: fallbackProjects, fallback: true });
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
    const newProject = await Project.create(body);
    return NextResponse.json({ success: true, data: newProject }, { status: 201 });
  } catch (error) {
    console.error("Projects POST error:", error);
    return NextResponse.json({ error: "Failed to create project." }, { status: 500 });
  }
}

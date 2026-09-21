import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db/mongodb";
import Project from "@/lib/models/Project";
import { fallbackProjects } from "@/lib/data";

interface RouteProps {
  params: Promise<{ id: string }>;
}

export async function GET(req: NextRequest, { params }: RouteProps) {
  try {
    const { id } = await params;
    const db = await connectToDatabase();
    if (db) {
      const project = await Project.findById(id).catch(() => null);
      if (project) {
        return NextResponse.json({ success: true, data: project });
      }
    }

    const fallback = fallbackProjects.find((p) => p._id === id || p.slug === id);
    if (fallback) {
      return NextResponse.json({ success: true, data: fallback, fallback: true });
    }

    return NextResponse.json({ error: "Project not found." }, { status: 404 });
  } catch (error) {
    console.error("Project GET error:", error);
    return NextResponse.json({ error: "Failed to fetch project." }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: RouteProps) {
  try {
    const { id } = await params;
    const db = await connectToDatabase();
    if (!db) {
      return NextResponse.json(
        { error: "Database not connected. Provide MONGODB_URI to persist edits." },
        { status: 503 }
      );
    }

    const body = await req.json();
    const updated = await Project.findByIdAndUpdate(id, body, { new: true });
    if (!updated) {
      return NextResponse.json({ error: "Project not found to update." }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("Project PUT error:", error);
    return NextResponse.json({ error: "Failed to update project." }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: RouteProps) {
  try {
    const { id } = await params;
    const db = await connectToDatabase();
    if (!db) {
      return NextResponse.json(
        { error: "Database not connected. Provide MONGODB_URI to delete." },
        { status: 503 }
      );
    }

    const deleted = await Project.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json({ error: "Project not found to delete." }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Project deleted successfully." });
  } catch (error) {
    console.error("Project DELETE error:", error);
    return NextResponse.json({ error: "Failed to delete project." }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db/mongodb";
import ContactMessage from "@/lib/models/ContactMessage";

export async function GET() {
  try {
    const db = await connectToDatabase();
    if (db) {
      const messages = await ContactMessage.find({}).sort({ createdAt: -1 });
      return NextResponse.json({ success: true, messages, data: messages });
    }
    return NextResponse.json({ success: true, messages: [], data: [] });
  } catch (error) {
    console.error("Messages GET error:", error);
    return NextResponse.json({ error: "Failed to fetch messages." }, { status: 500 });
  }
}

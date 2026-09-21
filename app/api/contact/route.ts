import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db/mongodb";
import ContactMessage from "@/lib/models/ContactMessage";
import { sendTelegramNotification } from "@/lib/telegram";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    // Attempt to save to MongoDB if connected
    let savedInDb = false;
    const db = await connectToDatabase();
    if (db) {
      try {
        await ContactMessage.create({ name, email, message });
        savedInDb = true;
      } catch (dbErr) {
        console.error("Failed to save message to MongoDB:", dbErr);
      }
    }

    // Send instant Telegram notification
    const telegramSent = await sendTelegramNotification({ name, email, message });

    return NextResponse.json({
      success: true,
      message: "Your message has been received successfully!",
      savedInDb,
      telegramSent,
    });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}

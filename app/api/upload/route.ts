import { NextRequest, NextResponse } from "next/server";
import { uploadImageToCloudinary } from "@/lib/cloudinary";

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
      const body = await req.json();
      const { url, folder } = body;

      if (!url) {
        return NextResponse.json({ error: "Image URL or data is required." }, { status: 400 });
      }

      const result = await uploadImageToCloudinary(url, folder || "portfolio");
      if (!result) {
        return NextResponse.json(
          { url, optimized: false, message: "Using direct URL fallback" },
          { status: 200 }
        );
      }

      return NextResponse.json({
        success: true,
        url: result.url,
        public_id: result.public_id,
        optimized: true,
      });
    }

    // Handle multipart form data
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const folder = (formData.get("folder") as string) || "portfolio";

    if (!file) {
      return NextResponse.json({ error: "No file provided." }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Data = `data:${file.type};base64,${buffer.toString("base64")}`;

    const result = await uploadImageToCloudinary(base64Data, folder);
    if (!result) {
      return NextResponse.json(
        { error: "Failed to upload image to Cloudinary." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      url: result.url,
      public_id: result.public_id,
      optimized: true,
    });
  } catch (error) {
    console.error("Upload API error:", error);
    return NextResponse.json(
      { error: "Failed to process image upload." },
      { status: 500 }
    );
  }
}

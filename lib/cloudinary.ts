import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export async function uploadImageToCloudinary(
  fileBase64OrUrl: string,
  folder = "portfolio"
): Promise<{ url: string; public_id: string } | null> {
  if (
    !process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ||
    !process.env.CLOUDINARY_API_KEY ||
    !process.env.CLOUDINARY_API_SECRET
  ) {
    console.warn("Cloudinary credentials missing; returning input as url");
    return { url: fileBase64OrUrl, public_id: "local_mock" };
  }

  try {
    const res = await cloudinary.uploader.upload(fileBase64OrUrl, {
      folder,
      transformation: [{ quality: "auto", fetch_format: "auto" }],
    });
    return { url: res.secure_url, public_id: res.public_id };
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    return null;
  }
}

export default cloudinary;

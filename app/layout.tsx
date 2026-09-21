import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import { personalInfo } from "@/lib/data";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0B0F19",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXTAUTH_URL || "https://markdavis-portfolio.vercel.app"),
  title: {
    default: "Mark Davis | UI/UX Designer & Product Systems Architect",
    template: "%s | Mark Davis",
  },
  description:
    "I Design Experiences That Make an Impact. Lead UI/UX Designer helping startups and enterprise businesses craft high-converting digital products and scalable design systems.",
  keywords: [
    "Mark Davis",
    "UI/UX Designer",
    "Product Designer",
    "Design System Architect",
    "Next.js Developer",
    "Frontend Engineer",
    "Portfolio",
    "Behance Design",
    "SaaS UI Designer",
  ],
  authors: [{ name: "Mark Davis", url: "https://markdavis-portfolio.vercel.app" }],
  creator: "Mark Davis",
  publisher: "Mark Davis",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Mark Davis Portfolio",
    title: "Mark Davis | UI/UX Designer & Product Systems Architect",
    description:
      "I Design Experiences That Make an Impact. Explore modern UI/UX case studies, interactive prototypes, and design systems.",
    images: [
      {
        url: personalInfo.heroPortrait,
        width: 1200,
        height: 630,
        alt: "Mark Davis UI/UX Designer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mark Davis | UI/UX Designer & Product Systems Architect",
    description:
      "I Design Experiences That Make an Impact. Explore modern UI/UX case studies, interactive prototypes, and design systems.",
    images: [personalInfo.heroPortrait],
    creator: "@markdavis",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Structured JSON-LD Data for Google Rich Results
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: personalInfo.name,
    jobTitle: personalInfo.title,
    description: personalInfo.bio,
    image: personalInfo.heroPortrait,
    url: "https://markdavis-portfolio.vercel.app",
    sameAs: [
      personalInfo.socials.dribbble,
      personalInfo.socials.behance,
      personalInfo.socials.linkedin,
      personalInfo.socials.github,
    ],
    knowsAbout: [
      "UI/UX Design",
      "User Experience",
      "Design Systems",
      "Figma",
      "Frontend Development",
      "React",
      "Next.js",
      "Tailwind CSS",
    ],
  };

  return (
    <html lang="en" className={`dark ${jakarta.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-[#0B0F19] text-white antialiased selection:bg-pink-500 selection:text-white min-h-screen">
        {children}
      </body>
    </html>
  );
}

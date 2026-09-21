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
  metadataBase: new URL(process.env.NEXTAUTH_URL || "https://tusharfaruk.design"),
  title: {
    default: "Tushar Faruk | Brand & Visual Identity Designer",
    template: "%s | Tushar Faruk",
  },
  description:
    "I Craft Iconic Brands & Visual Systems That Stand Out. Lead Brand Designer helping global startups and companies build memorable visual identities, packaging, and design systems.",
  keywords: [
    "Tushar Faruk",
    "Brand Designer",
    "Visual Identity Designer",
    "Logo Designer",
    "Packaging Designer",
    "Typography",
    "Adobe Illustrator",
    "Adobe Photoshop",
    "Brand Guidelines",
    "Behance Portfolio",
  ],
  authors: [{ name: "Tushar Faruk", url: "https://tusharfaruk.design" }],
  creator: "Tushar Faruk",
  publisher: "Tushar Faruk",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Tushar Faruk Portfolio",
    title: "Tushar Faruk | Brand & Visual Identity Designer",
    description:
      "I Craft Iconic Brands & Visual Systems That Stand Out. Explore brand identity case studies, luxury packaging, and custom logo systems.",
    images: [
      {
        url: personalInfo.heroPortrait,
        width: 1200,
        height: 630,
        alt: "Tushar Faruk Brand Designer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tushar Faruk | Brand & Visual Identity Designer",
    description:
      "I Craft Iconic Brands & Visual Systems That Stand Out. Explore brand identity case studies, luxury packaging, and custom logo systems.",
    images: [personalInfo.heroPortrait],
    creator: "@tusharfaruk",
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
    url: "https://tusharfaruk.design",
    sameAs: [
      personalInfo.socials.dribbble,
      personalInfo.socials.behance,
      personalInfo.socials.linkedin,
      personalInfo.socials.github,
    ],
    knowsAbout: [
      "Brand Identity Design",
      "Logo Design",
      "Visual Identity Systems",
      "Packaging Design",
      "Typography",
      "Adobe Illustrator",
      "Adobe Photoshop",
      "Figma UI Systems",
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

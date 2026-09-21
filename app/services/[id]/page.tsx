import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Rocket,
  Code,
  Smartphone,
  Layers,
  Clock,
  ShieldCheck,
  Zap,
  HelpCircle,
  MessageSquare,
  ChevronRight,
  LucideIcon,
} from "lucide-react";
import { fallbackServices, fallbackProjects, personalInfo } from "@/lib/data";
import { connectToDatabase } from "@/lib/db/mongodb";
import ServiceModel from "@/lib/models/Service";
import { Service } from "@/types";
import PageTransition from "@/components/shared/PageTransition";
import ScrollProgressBar from "@/components/shared/ScrollProgressBar";

interface PageProps {
  params: Promise<{ id: string }>;
}

const iconMap: Record<string, LucideIcon> = {
  Rocket,
  Code,
  Smartphone,
  Sparkles,
  Layers,
};

// Generates dynamic fallback packages tailored to any service
function getServicePackages(serviceTitle: string) {
  const baseTitle = serviceTitle.toLowerCase();

  if (baseTitle.includes("brand") || baseTitle.includes("identity")) {
    return [
      {
        name: "Starter Identity",
        tag: "Essential",
        price: "$499",
        duration: "1–2 Weeks",
        description: "Perfect for early-stage startups and new ventures seeking a clean, memorable visual mark.",
        features: [
          "Primary & Secondary Logo Concepts",
          "Curated Color Palette & Typography Pairing",
          "Social Media Profile Avatars & Banners",
          "High-Resolution Vector Files (AI, EPS, SVG, PNG)",
          "2 Iteration Rounds Included",
        ],
        isPopular: false,
        ctaText: "Choose Starter",
      },
      {
        name: "Full Brand System",
        tag: "Most Popular",
        price: "$999",
        duration: "3–4 Weeks",
        description: "Comprehensive end-to-end brand identity system built for scaling businesses and industry leaders.",
        features: [
          "Everything in Starter Identity",
          "Full 30+ Page Brand Identity Style Guide",
          "Custom Iconography & Graphic Assets Suite",
          "Stationery Suite (Business Cards, Letterheads)",
          "Brand Pattern & 3D Mockup Visualizations",
          "Unlimited Revision Rounds Until Perfection",
          "Full Commercial Rights & Ownership Transfer",
        ],
        isPopular: true,
        ctaText: "Choose Full System",
      },
      {
        name: "Enterprise Architecture",
        tag: "Elite",
        price: "$1,899",
        duration: "5–6 Weeks",
        description: "Bespoke creative direction, multi-brand architecture, dynamic collateral, and global launch toolkit.",
        features: [
          "Everything in Full Brand System",
          "Custom Typeface Styling & Wordmark Engineering",
          "Complete Packaging, Merch & Digital Assets",
          "Brand Launch Strategy & Social Rollout Kit",
          "Dedicated 1-on-1 Creative Direction Support",
          "3 Months Post-Launch Brand Consultation",
        ],
        isPopular: false,
        ctaText: "Choose Enterprise",
      },
    ];
  }

  if (baseTitle.includes("packaging") || baseTitle.includes("print")) {
    return [
      {
        name: "Single Product Pack",
        tag: "Starter",
        price: "$399",
        duration: "1–2 Weeks",
        description: "Standalone packaging design for a single SKU or product label.",
        features: [
          "Dieline Creation & Print-Ready Formatting",
          "Custom Label & Box Art Architecture",
          "Photorealistic 3D Render Presentation",
          "Print Vendor Production Handoff Support",
          "2 Revision Rounds",
        ],
        isPopular: false,
        ctaText: "Choose Single Pack",
      },
      {
        name: "Product Line Suite",
        tag: "Most Popular",
        price: "$849",
        duration: "3–4 Weeks",
        description: "Complete packaging system across multiple flavors, sizes, or variations.",
        features: [
          "Up to 5 SKU Variations / Color-coded Labels",
          "Luxury Finishes (Foil Stamping, Embossing, UV)",
          "Full 3D Bottle / Box Showcase Visuals",
          "Outer Shipping Box / Unboxing Experience",
          "Unlimited Revisions",
        ],
        isPopular: true,
        ctaText: "Choose Product Suite",
      },
      {
        name: "Luxury Retail Overhaul",
        tag: "Premium",
        price: "$1,599",
        duration: "4–5 Weeks",
        description: "Museum-grade luxury unboxing and retail display packaging system.",
        features: [
          "Complete Brand Merchandising & Shelf Packaging",
          "Custom Structural Dieline Engineering",
          "Full Point-of-Sale & Retail Display Assets",
          "On-site / Remote Print Supervision Coordination",
        ],
        isPopular: false,
        ctaText: "Choose Retail Suite",
      },
    ];
  }

  // Default / UI / General Design Packages
  return [
    {
      name: "Starter Package",
      tag: "Essential",
      price: "$450",
      duration: "1–2 Weeks",
      description: "Quick turnaround, high-impact design deliverables for agile projects.",
      features: [
        "Core Deliverables & Design Artifacts",
        "Modern Responsive Visual Layouts",
        "Vector Source Files & Asset Exports",
        "2 Rounds of Feedback",
      ],
      isPopular: false,
      ctaText: "Select Starter",
    },
    {
      name: "Professional Tier",
      tag: "Recommended",
      price: "$899",
      duration: "2–3 Weeks",
      description: "Deep dive into your project with end-to-end design systems and production files.",
      features: [
        "Everything in Starter Tier",
        "Complete Design System & Components",
        "Interactive Prototype & Motion Design",
        "Design Token Documentation",
        "Priority Support & Unlimited Revisions",
      ],
      isPopular: true,
      ctaText: "Select Professional",
    },
    {
      name: "Custom Enterprise",
      tag: "Full Scale",
      price: "$1,699+",
      duration: "4–6 Weeks",
      description: "Dedicated strategic partnership for large scale brand and product transformations.",
      features: [
        "End-to-end Creative Direction",
        "Scalable Multi-platform Design Architecture",
        "Direct Slack / Telegram Collaboration",
        "Post-launch Retainer & Consultation",
      ],
      isPopular: false,
      ctaText: "Contact for Custom",
    },
  ];
}

async function getServiceData(id: string): Promise<{ service: Service | null; allServices: Service[] }> {
  let allServices: Service[] = fallbackServices;

  try {
    const db = await connectToDatabase();
    if (db) {
      const dbServices = await ServiceModel.find({}).sort({ order: 1 });
      if (dbServices && dbServices.length > 0) {
        allServices = dbServices.map((s) => {
          const obj = s.toObject();
          return {
            ...obj,
            _id: obj._id ? obj._id.toString() : undefined,
          };
        }) as Service[];
      }
    }
  } catch {
    allServices = fallbackServices;
  }

  const cleanQuery = decodeURIComponent(id).toLowerCase().trim();
  const service =
    allServices.find(
      (s) =>
        s._id === cleanQuery ||
        s.title.toLowerCase().replace(/[^a-z0-9]+/g, "-") === cleanQuery ||
        s.title.toLowerCase() === cleanQuery
    ) ||
    fallbackServices.find(
      (s) =>
        s._id === cleanQuery ||
        s.title.toLowerCase().replace(/[^a-z0-9]+/g, "-") === cleanQuery ||
        s.title.toLowerCase() === cleanQuery
    ) ||
    null;

  return { service, allServices };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const { service } = await getServiceData(id);

  if (!service) {
    return {
      title: "Service Details | Tushar Faruk",
      description: "Explore brand design and visual identity services by Tushar Faruk.",
    };
  }

  return {
    title: `${service.title} | Tushar Faruk - Brand Designer`,
    description: service.description,
    keywords: [service.title, "Brand Design", "Visual Identity", "Tushar Faruk", "Creative Services"],
  };
}

export default async function ServiceDetailsPage({ params }: PageProps) {
  const { id } = await params;
  const { service, allServices } = await getServiceData(id);

  if (!service) {
    notFound();
  }

  const IconComponent = iconMap[service.icon] || Rocket;
  const packages = getServicePackages(service.title);
  const otherServices = allServices.filter((s) => s._id !== service._id && s.title !== service.title).slice(0, 3);

  return (
    <PageTransition>
      <ScrollProgressBar />
      <div className="min-h-screen bg-[#0B0F19] text-white">
        {/* Navigation Bar / Breadcrumb */}
        <div className="sticky top-0 z-40 bg-[#0B0F19]/80 backdrop-blur-md border-b border-[#1E2540]">
          <div className="max-w-6xl mx-auto px-6 lg:px-8 py-4 flex items-center justify-between">
            <Link
              href="/#services"
              className="inline-flex items-center gap-2 text-xs font-semibold text-gray-300 hover:text-white transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span>Back to Services</span>
            </Link>

            <div className="flex items-center gap-2 text-xs text-gray-400">
              <Link href="/" className="hover:text-white">Home</Link>
              <span>/</span>
              <Link href="/#services" className="hover:text-white">Services</Link>
              <span>/</span>
              <span className="text-pink-400 font-medium truncate max-w-[150px] sm:max-w-xs">{service.title}</span>
            </div>
          </div>
        </div>

        {/* Hero Section of Service */}
        <section className="py-16 md:py-24 relative overflow-hidden">
          {/* Ambient Glows */}
          <div className="absolute top-1/4 -left-48 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-1/3 -right-48 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-5xl mx-auto px-6 lg:px-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-400 text-xs font-bold uppercase tracking-wider mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Specialized Creative Service</span>
            </div>

            <div className="flex flex-col md:flex-row md:items-center gap-6 mb-8">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#FF3B81] to-[#A855F7] p-0.5 shadow-[0_0_30px_rgba(255,59,129,0.3)] shrink-0">
                <div className="w-full h-full bg-[#101426] rounded-[14px] flex items-center justify-center text-white">
                  <IconComponent className="w-8 h-8 text-pink-400" />
                </div>
              </div>

              <div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                  {service.title}
                </h1>
                <p className="text-sm sm:text-base text-gray-300 mt-3 max-w-3xl leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>

            {/* Quick Metrics / Guarantees Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-[#1E2540]">
              <div className="p-4 rounded-xl bg-[#13182C] border border-[#1E2540]">
                <div className="flex items-center gap-2 text-cyan-400 mb-1">
                  <Clock className="w-4 h-4" />
                  <span className="text-[10px] uppercase font-bold tracking-wider">Fast Turnaround</span>
                </div>
                <p className="text-xs text-white font-bold">1–4 Weeks Delivery</p>
              </div>

              <div className="p-4 rounded-xl bg-[#13182C] border border-[#1E2540]">
                <div className="flex items-center gap-2 text-pink-400 mb-1">
                  <ShieldCheck className="w-4 h-4" />
                  <span className="text-[10px] uppercase font-bold tracking-wider">100% Ownership</span>
                </div>
                <p className="text-xs text-white font-bold">Full Commercial Rights</p>
              </div>

              <div className="p-4 rounded-xl bg-[#13182C] border border-[#1E2540]">
                <div className="flex items-center gap-2 text-purple-400 mb-1">
                  <Zap className="w-4 h-4" />
                  <span className="text-[10px] uppercase font-bold tracking-wider">Production Ready</span>
                </div>
                <p className="text-xs text-white font-bold">Vector + Source Files</p>
              </div>

              <div className="p-4 rounded-xl bg-[#13182C] border border-[#1E2540]">
                <div className="flex items-center gap-2 text-emerald-400 mb-1">
                  <MessageSquare className="w-4 h-4" />
                  <span className="text-[10px] uppercase font-bold tracking-wider">Direct Access</span>
                </div>
                <p className="text-xs text-white font-bold">1-on-1 with Tushar</p>
              </div>
            </div>
          </div>
        </section>

        {/* PRICING & PACKAGES SECTION */}
        <section className="py-16 bg-[#0E1322] border-t border-b border-[#1E2540] relative">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-extrabold tracking-widest text-pink-400 uppercase">
                TAILORED PACKAGES
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                Select the Perfect Plan for Your Project
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-2">
                Transparent scope, fixed pricing, and dedicated brand craftsmanship for every tier.
              </p>
            </div>

            {/* 3 Package Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
              {packages.map((pkg, idx) => (
                <div
                  key={pkg.name}
                  className={`relative p-6 sm:p-8 rounded-2xl flex flex-col justify-between transition-all duration-300 ${
                    pkg.isPopular
                      ? "bg-gradient-to-b from-[#182142] to-[#10152B] border-2 border-pink-500 shadow-[0_10px_40px_rgba(236,72,153,0.25)] scale-[1.02]"
                      : "bg-[#13182C] border border-[#1E2540] hover:border-purple-500/40"
                  }`}
                >
                  {pkg.isPopular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[#FF3B81] to-[#A855F7] text-white text-[10px] font-extrabold uppercase tracking-wider shadow-md">
                      {pkg.tag}
                    </div>
                  )}

                  <div>
                    {!pkg.isPopular && pkg.tag && (
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                        {pkg.tag}
                      </span>
                    )}

                    <h3 className="text-xl font-bold text-white mb-2">{pkg.name}</h3>
                    <p className="text-xs text-gray-400 leading-relaxed mb-6">
                      {pkg.description}
                    </p>

                    <div className="flex items-baseline gap-2 mb-6 pb-6 border-b border-[#1E2540]">
                      <span className="text-3xl sm:text-4xl font-black text-white">{pkg.price}</span>
                      <span className="text-xs text-gray-400 font-medium">/ project</span>
                    </div>

                    <div className="space-y-3 mb-8">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-gray-300">
                        What&apos;s Included:
                      </p>
                      {pkg.features.map((feat) => (
                        <div key={feat} className="flex items-start gap-2.5 text-xs text-gray-300">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Link
                    href={`/#contact?service=${encodeURIComponent(service.title)}&plan=${encodeURIComponent(pkg.name)}`}
                    className={`w-full py-3.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      pkg.isPopular
                        ? "bg-gradient-to-r from-[#FF3B81] via-[#EC4899] to-[#A855F7] text-white shadow-glow-sm hover:shadow-glow-pink"
                        : "bg-white/10 hover:bg-white/15 text-white border border-white/10"
                    }`}
                  >
                    <span>{pkg.ctaText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WORKFLOW PROCESS SECTION */}
        <section className="py-16 max-w-5xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs font-extrabold tracking-widest text-[#38BDF8] uppercase">
              METHODOLOGY
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              How We Build Your Project
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Discovery & Scope",
                desc: "We analyze your brand vision, target demographic, and market competitors to establish the creative brief.",
              },
              {
                step: "02",
                title: "Concept Creation",
                desc: "Developing 2–3 distinct visual directions and foundational architecture for your feedback.",
              },
              {
                step: "03",
                title: "Refinement & Polish",
                desc: "Fine-tuning typography, vector geometry, color palettes, and real-world mockups.",
              },
              {
                step: "04",
                title: "Final Delivery",
                desc: "Complete asset handoff with master vector files, guideline manuals, and production support.",
              },
            ].map((p) => (
              <div key={p.step} className="p-6 rounded-2xl bg-[#13182C] border border-[#1E2540] relative">
                <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#FF3B81] to-[#A855F7] opacity-60">
                  {p.step}
                </span>
                <h3 className="text-sm font-bold text-white mt-2 mb-1.5">{p.title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* EXPLORE OTHER SERVICES */}
        {otherServices.length > 0 && (
          <section className="py-16 bg-[#0E1322] border-t border-[#1E2540]">
            <div className="max-w-5xl mx-auto px-6 lg:px-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-xl font-bold text-white">Explore Other Services</h3>
                  <p className="text-xs text-gray-400 mt-0.5">Complementary solutions to elevate your brand.</p>
                </div>
                <Link href="/#services" className="text-xs font-semibold text-pink-400 hover:text-pink-300 flex items-center gap-1">
                  <span>View All</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {otherServices.map((other) => {
                  const OtherIcon = iconMap[other.icon] || Rocket;
                  const slug = other._id || other.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
                  return (
                    <Link
                      key={other.title}
                      href={`/services/${slug}`}
                      className="group p-5 rounded-2xl bg-[#13182C] border border-[#1E2540] hover:border-pink-500/50 hover:bg-[#181F38] transition-all"
                    >
                      <div className="w-10 h-10 rounded-xl bg-pink-500/10 border border-pink-500/20 text-pink-400 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                        <OtherIcon className="w-5 h-5" />
                      </div>
                      <h4 className="text-sm font-bold text-white group-hover:text-pink-400 transition-colors">
                        {other.title}
                      </h4>
                      <p className="text-xs text-gray-400 mt-1 line-clamp-2 leading-relaxed">
                        {other.description}
                      </p>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* BOTTOM CTA BANNER */}
        <section className="py-16 max-w-4xl mx-auto px-6 text-center">
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#401944] via-[#241740] to-[#13182C] border border-pink-500/30 shadow-[0_0_50px_rgba(236,72,153,0.2)]">
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              Ready to elevate your brand with {service.title}?
            </h3>
            <p className="text-xs sm:text-sm text-gray-300 max-w-xl mx-auto mt-2 mb-6">
              Let&apos;s discuss your goals, timeline, and deliverables. Get in touch directly with Tushar Faruk today.
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#FF3B81] via-[#EC4899] to-[#A855F7] text-white text-xs font-bold shadow-glow-sm hover:shadow-glow-pink hover:scale-105 transition-all duration-200"
            >
              <span>Start a Project</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}

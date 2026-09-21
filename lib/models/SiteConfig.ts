import mongoose, { Schema, Document, Model } from "mongoose";

export interface ISiteConfig extends Document {
  hero: {
    greeting: string;
    name: string;
    title: string;
    tagline: string;
    bio: string;
    heroPortrait: string;
    experienceYears: string;
  };
  about: {
    heading: string;
    bioText: string;
    yearsExperience: string;
    completedProjects: string;
    happyClients: string;
    awardsReceived: string;
  };
  skills: Array<{
    name: string;
    level: number;
    category: string;
    icon?: string;
  }>;
  contact: {
    email: string;
    phone: string;
    location: string;
    cvUrl: string;
    socials: {
      dribbble: string;
      behance: string;
      linkedin: string;
      github: string;
    };
  };
  updatedAt: Date;
}

const SiteConfigSchema = new Schema<ISiteConfig>(
  {
    hero: {
      greeting: { type: String, default: "HELLO, I'M" },
      name: { type: String, default: "Mark Davis" },
      title: { type: String, default: "UI/UX Designer" },
      tagline: { type: String, default: "I Design Experiences That Make an Impact." },
      bio: {
        type: String,
        default:
          "I'm a UI/UX Designer helping startups and businesses create digital products users love.",
      },
      heroPortrait: {
        type: String,
        default:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop",
      },
      experienceYears: { type: String, default: "5+" },
    },
    about: {
      heading: { type: String, default: "About Me" },
      bioText: {
        type: String,
        default:
          "Specialized in modern web and mobile product design, building user-centric interfaces.",
      },
      yearsExperience: { type: String, default: "5+" },
      completedProjects: { type: String, default: "120+" },
      happyClients: { type: String, default: "80+" },
      awardsReceived: { type: String, default: "15+" },
    },
    skills: [
      {
        name: { type: String },
        level: { type: Number, default: 90 },
        category: { type: String, default: "Design" },
        icon: { type: String },
      },
    ],
    contact: {
      email: { type: String, default: "hello@markdavis.com" },
      phone: { type: String, default: "+1 234 567 8900" },
      location: { type: String, default: "San Francisco, CA" },
      cvUrl: { type: String, default: "/cv/Mark_Davis_CV.pdf" },
      socials: {
        dribbble: { type: String, default: "https://dribbble.com" },
        behance: { type: String, default: "https://behance.net" },
        linkedin: { type: String, default: "https://linkedin.com" },
        github: { type: String, default: "https://github.com" },
      },
    },
  },
  { timestamps: true }
);

const SiteConfig: Model<ISiteConfig> =
  mongoose.models.SiteConfig || mongoose.model<ISiteConfig>("SiteConfig", SiteConfigSchema);

export default SiteConfig;

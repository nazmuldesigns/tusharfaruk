import mongoose, { Schema, Document, Model } from "mongoose";

export interface ISiteConfig extends Document {
  hero: {
    greeting: string;
    name: string;
    title: string;
    tagline: string;
    bio: string;
    heroPortrait: string;
    introVideoUrl: string;
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
      name: { type: String, default: "Tushar Faruk" },
      title: { type: String, default: "Brand Designer" },
      tagline: { type: String, default: "I Craft Iconic Brands & Visual Systems That Stand Out." },
      bio: {
        type: String,
        default:
          "I'm a Brand & Visual Identity Designer helping startups and global businesses build memorable, high-impact brand systems and visual experiences.",
      },
      heroPortrait: {
        type: String,
        default:
          "https://lh3.googleusercontent.com/d/1T2VLGzKpGfz_CnPHwozeY77I0EbvTeaA",
      },
      introVideoUrl: {
        type: String,
        default: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1",
      },
      experienceYears: { type: String, default: "5+" },
    },
    about: {
      heading: { type: String, default: "About Me" },
      bioText: {
        type: String,
        default:
          "Specialized in modern visual identity, logo systems, luxury packaging, and creative brand direction.",
      },
      yearsExperience: { type: String, default: "5+" },
      completedProjects: { type: String, default: "120+" },
      happyClients: { type: String, default: "80+" },
      awardsReceived: { type: String, default: "15+" },
    },
    skills: [
      {
        name: { type: String },
        level: { type: Number, default: 95 },
        category: { type: String, default: "Brand Design" },
        icon: { type: String },
      },
    ],
    contact: {
      email: { type: String, default: "tusharfaruk@gmail.com" },
      phone: { type: String, default: "+880 1700 000000" },
      location: { type: String, default: "Dhaka, Bangladesh / Remote Worldwide" },
      cvUrl: { type: String, default: "/cv/Tushar_Faruk_CV.pdf" },
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

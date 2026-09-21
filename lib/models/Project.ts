import mongoose, { Schema, Document, Model } from "mongoose";

export interface IProject extends Document {
  title: string;
  category: string;
  subtitle: string;
  image: string;
  gallery?: string[];
  overview?: string;
  challenge?: string;
  solution?: string;
  client?: string;
  duration?: string;
  role?: string;
  tools?: string[];
  technologies?: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  order?: number;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    subtitle: { type: String, default: "UI/UX Design" },
    image: { type: String, required: true },
    gallery: [{ type: String }],
    overview: { type: String },
    challenge: { type: String },
    solution: { type: String },
    client: { type: String },
    duration: { type: String },
    role: { type: String },
    tools: [{ type: String }],
    technologies: [{ type: String }],
    liveUrl: { type: String },
    githubUrl: { type: String },
    featured: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Project: Model<IProject> =
  mongoose.models.Project || mongoose.model<IProject>("Project", ProjectSchema);

export default Project;

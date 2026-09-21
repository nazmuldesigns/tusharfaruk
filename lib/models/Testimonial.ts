import mongoose, { Schema, Document, Model } from "mongoose";

export interface ITestimonial extends Document {
  clientName: string;
  clientRole: string;
  clientCompany: string;
  avatar: string;
  quote: string;
  rating?: number;
  featured?: boolean;
  order?: number;
  createdAt: Date;
  updatedAt: Date;
}

const TestimonialSchema = new Schema<ITestimonial>(
  {
    clientName: { type: String, required: true },
    clientRole: { type: String, required: true },
    clientCompany: { type: String, required: true },
    avatar: { type: String, required: true },
    quote: { type: String, required: true },
    rating: { type: Number, default: 5 },
    featured: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Testimonial: Model<ITestimonial> =
  mongoose.models.Testimonial ||
  mongoose.model<ITestimonial>("Testimonial", TestimonialSchema);

export default Testimonial;

export interface ProjectGallerySection {
  title?: string;
  description?: string;
  images: string[];
  layout?: "full" | "grid-2" | "grid-3" | "editorial";
}

export interface Project {
  _id?: string;
  slug?: string;
  title: string;
  category: string;
  subtitle: string;
  image: string;
  gallery?: string[];
  gallerySections?: ProjectGallerySection[];
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
}

export interface Service {
  _id?: string;
  title: string;
  description: string;
  icon: string;
  badgeColor?: string;
  linkText?: string;
  order?: number;
}

export interface Testimonial {
  _id?: string;
  clientName: string;
  clientRole: string;
  clientCompany: string;
  avatar: string;
  quote: string;
  rating?: number;
  featured?: boolean;
}

export interface MetricItem {
  icon: string;
  value: string;
  label: string;
}

export interface ContactMessage {
  _id?: string;
  name: string;
  email: string;
  message: string;
  status?: "unread" | "read" | "replied";
  createdAt?: string | Date;
}

export interface NavItem {
  label: string;
  href: string;
  iconName: string;
  badge?: string;
}

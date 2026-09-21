import { Project, Service, Testimonial, MetricItem, NavItem } from "@/types";

export const personalInfo = {
  name: "Mark Davis",
  title: "UI/UX Designer",
  greeting: "HELLO, I'M",
  tagline: "I Design Experiences That Make an Impact.",
  bio: "I'm a UI/UX Designer helping startups and businesses create digital products users love.",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop",
  heroPortrait: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop",
  experienceYears: "5+",
  email: "hello@markdavis.com",
  phone: "+1 234 567 8900",
  location: "San Francisco, CA",
  cvUrl: "/cv/Mark_Davis_CV.pdf",
  socials: {
    dribbble: "https://dribbble.com",
    behance: "https://behance.net",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
  },
};

export const navItems: NavItem[] = [
  { label: "Home", href: "/#home", iconName: "Home" },
  { label: "About", href: "/#about", iconName: "User" },
  { label: "Services", href: "/#services", iconName: "Briefcase" },
  { label: "Portfolio", href: "/#portfolio", iconName: "Folder" },
  { label: "Skills", href: "/#skills", iconName: "Code" },
  { label: "Blog", href: "/#blog", iconName: "FileText" },
  { label: "Contact", href: "/#contact", iconName: "Mail" },
];

export const trustedClients = [
  { name: "Google", logoText: "Google" },
  { name: "Microsoft", logoText: "Microsoft" },
  { name: "airbnb", logoText: "airbnb" },
  { name: "Slack", logoText: "slack" },
  { name: "Dropbox", logoText: "Dropbox" },
];

export const fallbackServices: Service[] = [
  {
    _id: "srv-1",
    title: "UI/UX Design",
    description: "Designing intuitive and engaging user experiences that drive results.",
    icon: "Rocket",
    badgeColor: "purple",
    linkText: "Learn More →",
    order: 1,
  },
  {
    _id: "srv-2",
    title: "Web Development",
    description: "Building fast, responsive and modern websites with clean code.",
    icon: "Code",
    badgeColor: "blue",
    linkText: "Learn More →",
    order: 2,
  },
  {
    _id: "srv-3",
    title: "Mobile Design",
    description: "Crafting beautiful and usable mobile app designs.",
    icon: "Smartphone",
    badgeColor: "purple",
    linkText: "Learn More →",
    order: 3,
  },
  {
    _id: "srv-4",
    title: "Brand Identity",
    description: "Creating unique brand identities that stand out from the crowd.",
    icon: "Sparkles",
    badgeColor: "blue",
    linkText: "Learn More →",
    order: 4,
  },
];

export const fallbackProjects: Project[] = [
  {
    _id: "analytics-dashboard",
    slug: "analytics-dashboard",
    title: "Analytics Dashboard",
    category: "Dashboard",
    subtitle: "UI/UX Design",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
    overview:
      "A comprehensive enterprise analytics dashboard built for real-time financial tracking, customizable modular widgets, and high-contrast dark theme data visualizations.",
    challenge:
      "The client needed to consolidate over 40 distinct financial data streams into an ultra-fast, intuitive interface without cognitive overload.",
    solution:
      "Engineered an adaptive modular grid system using glassmorphic widgets, personalized dashboard presets, and dynamic color-coded financial metrics.",
    client: "FinTech Enterprise Global",
    duration: "6 Weeks",
    role: "Lead UI/UX Designer & Systems Architect",
    tools: ["Figma", "Next.js", "Tailwind CSS", "Framer Motion", "Recharts", "TypeScript"],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    liveUrl: "https://example.com/analytics",
    githubUrl: "https://github.com",
    gallery: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=1400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1400&auto=format&fit=crop",
    ],
    featured: true,
    order: 1,
  },
  {
    _id: "saas-landing-page",
    slug: "saas-landing-page",
    title: "SaaS Landing Page",
    category: "Website",
    subtitle: "UI/UX Design",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
    overview:
      "A high-converting AI SaaS product landing page designed to showcase complex machine learning workflows through interactive interactive demos and neon-lit glass surfaces.",
    challenge:
      "The product's conversion rate was stalled due to overly technical text and flat generic templates.",
    solution:
      "Created an immersive story-driven narrative with interactive product tours, animated feature cards, and streamlined one-click onboarding.",
    client: "Nexus AI Technologies",
    duration: "4 Weeks",
    role: "Product Designer & Frontend Engineer",
    tools: ["Figma", "React", "Tailwind CSS", "Framer Motion", "Spline 3D"],
    technologies: ["React", "Tailwind CSS", "Framer Motion"],
    liveUrl: "https://example.com/saas",
    githubUrl: "https://github.com",
    gallery: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?q=80&w=1400&auto=format&fit=crop",
    ],
    featured: true,
    order: 2,
  },
  {
    _id: "task-management-app",
    slug: "task-management-app",
    title: "Task Management App",
    category: "Mobile App",
    subtitle: "UI/UX Design",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1200&auto=format&fit=crop",
    overview:
      "A distraction-free iOS and Android productivity mobile app crafted for remote cross-functional engineering teams.",
    challenge:
      "Existing project trackers suffered from clutter, slow sync, and difficult mobile navigation.",
    solution:
      "Designed a gesture-first mobile interface with smooth swipe actions, micro-haptics, and instant offline-first synchronisation.",
    client: "SyncFlow Labs",
    duration: "8 Weeks",
    role: "Lead Mobile UX Designer",
    tools: ["Figma", "Flutter", "Design System", "Lottie Animations"],
    technologies: ["Flutter", "Figma"],
    liveUrl: "https://example.com/task-app",
    githubUrl: "https://github.com",
    gallery: [
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=1400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1526498460520-4c246339dccb?q=80&w=1400&auto=format&fit=crop",
    ],
    featured: true,
    order: 3,
  },
  {
    _id: "ecommerce-website",
    slug: "ecommerce-website",
    title: "Ecommerce Website",
    category: "Website",
    subtitle: "UI/UX Design",
    image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=1200&auto=format&fit=crop",
    overview:
      "A minimalist luxury streetwear eCommerce web storefront engineered for sub-second page loads and friction-free mobile checkout.",
    challenge:
      "High shopping cart abandonment and clunky mobile filtering on existing Shopify stores.",
    solution:
      "Redesigned the entire purchasing pipeline with instant search, floating visual cart drawer, and high-resolution lookbook galleries.",
    client: "Aura Apparel Studio",
    duration: "5 Weeks",
    role: "UI/UX & E-Commerce Designer",
    tools: ["Figma", "Next.js", "Shopify Hydrogen", "Tailwind CSS"],
    technologies: ["Next.js", "Shopify", "Tailwind CSS"],
    liveUrl: "https://example.com/ecommerce",
    githubUrl: "https://github.com",
    gallery: [
      "https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=1400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=1400&auto=format&fit=crop",
    ],
    featured: true,
    order: 4,
  },
];

export const metricsData: MetricItem[] = [
  {
    icon: "Smile",
    value: "80+",
    label: "Happy Clients",
  },
  {
    icon: "FolderCheck",
    value: "120+",
    label: "Projects Completed",
  },
  {
    icon: "Coffee",
    value: "5+",
    label: "Years Experience",
  },
  {
    icon: "Trophy",
    value: "15+",
    label: "Awards Received",
  },
];

export const fallbackTestimonials: Testimonial[] = [
  {
    _id: "test-1",
    clientName: "Sarah Johnson",
    clientRole: "CEO",
    clientCompany: "TechCorp",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
    quote: "Mark is a fantastic designer! He understood our requirements perfectly and delivered beyond our expectations.",
    rating: 5,
  },
  {
    _id: "test-2",
    clientName: "David Brown",
    clientRole: "Founder",
    clientCompany: "DevStudio",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
    quote: "Professional, creative and highly skilled. Will definitely work with Mark again on upcoming launches!",
    rating: 5,
  },
  {
    _id: "test-3",
    clientName: "Emily Davis",
    clientRole: "Product Manager",
    clientCompany: "Apex Innovations",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
    quote: "Great communication and amazing attention to detail. Highly recommended for any web or mobile project!",
    rating: 5,
  },
];

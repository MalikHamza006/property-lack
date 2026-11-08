export interface Testimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  content: string;
  rating: number;
  avatarUrl: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  features: string[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  phone: string;
  email: string;
  image: string;
  experience: string;
}

export interface SiteContent {
  company: {
    name: string;
    tagline: string;
    phone: string;
    phoneDisplay: string;
    whatsapp: string;
    email: string;
    address: string;
    city: string;
    country: string;
    workingHours: string;
    logoUrl?: string;
  };
  socialLinks: {
    facebook?: string;
    instagram?: string;
    youtube?: string;
    linkedin?: string;
  };
  hero: {
    badge: string;
    title: string;
    highlightWord: string;
    subtitle: string;
    stats: {
      transactionsValue: string;
      satisfiedClients: string;
      yearsExperience: string;
      verifiedProperties: string;
    };
  };
  about: {
    heading: string;
    subheading: string;
    story: string[];
    mission: string;
    vision: string;
    statsCount: string;
  };
  services: ServiceItem[];
  testimonials: Testimonial[];
  team: TeamMember[];
  seo: {
    homeTitle: string;
    homeDescription: string;
    keywords: string;
    ogImage: string;
    propertyTitleTemplate: string;
    propertyDescriptionTemplate: string;
  };
}

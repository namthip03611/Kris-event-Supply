export type Language = 'th' | 'en';

export type ViewType = 'home' | 'about' | 'services' | 'portfolio';

export interface ServiceItem {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  image?: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  location: string;
  staffCount: string;
  image: string;
  description: string;
}

export interface IndustryItem {
  id: string;
  title: string;
  description: string;
  image: string;
}

export interface ValueItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  image?: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

export interface QuoteRequest {
  id: string;
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
  staffEstimate?: string;
  submittedAt: string;
}

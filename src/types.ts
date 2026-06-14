export interface StatItem {
  id: string;
  value: string;
  label: string;
  description: string;
  iconName: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  color: string;
  tag: string;
}

export interface BenefitItem {
  id: string;
  title: string;
  description: string;
  number: string;
  badge: string;
  iconName: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  tagline: string;
  tags: string[];
  image: string;
  link: string;
  author: string;
  likes: number;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  avatar: string;
  quote: string;
  rating: number;
}

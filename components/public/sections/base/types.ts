import type { LucideIcon } from "lucide-react";

export interface SectionAction {
  label: string;
  href: string;
  variant?: "primary" | "secondary" | "ghost";
}

export interface SectionMedia {
  src: string;
  alt: string;
}

export type SectionIcon = LucideIcon | SectionMedia;

export interface HeroMetric {
  value: string;
  label: string;
}

export interface HeroSectionData {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  tagline?: string;
  actions?: SectionAction[];
  metrics?: HeroMetric[];
  backgroundImage?: SectionMedia;
}

export interface StatItem {
  id: string;
  label: string;
  value: string;
  description?: string;
  icon?: SectionIcon;
}

export interface StatsSectionData {
  title?: string;
  description?: string;
  items: StatItem[];
}

export interface ContentSectionData {
  eyebrow?: string;
  title?: string;
  description?: string;
  items?: {
    id?: string;
    title: string;
    description: string;
    icon?: SectionIcon;
  }[];
  slides?: {
    id?: string;
    eyebrow?: string;
    title: string;
    subtitle?: string;
    body?: string[];
    bullets?: string[];
    actions?: SectionAction[];
  }[];
  subtitle?: string;
  body?: string[];
  bullets?: string[];
  icon?: SectionIcon;
  image?: SectionMedia;
  images?: SectionMedia[];
  carousel?: boolean;
  imagePosition?: "left" | "right";
  actions?: SectionAction[];
}

export interface CtaSectionData {
  eyebrow?: string;
  title: string;
  description?: string;
  primaryAction?: SectionAction;
  secondaryAction?: SectionAction;
  backgroundImage?: SectionMedia;
}

export interface ProductCardData {
  id: string;
  name: string;
  category: string;
  description: string;
  indication?: string;
  storage?: string;
  image?: SectionMedia;
  badge?: string;
  href?: string;
}

export interface ServiceCardData {
  id: string;
  title: string;
  description: string;
  icon?: SectionIcon;
  features?: string[];
}

export interface CardGridData {
  title?: string;
  description?: string;
  columns?: 2 | 3 | 4;
}

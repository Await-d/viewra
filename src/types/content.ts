export const TECH_STACK_CATEGORIES = [
  'Frontend',
  'Backend',
  'Database',
  'Tools',
  'DevOps',
  'Others',
] as const;

export type TechStackCategory = (typeof TECH_STACK_CATEGORIES)[number];

export interface SocialLink {
  label: string;
  href: string;
}

export type TechStackMap = Record<string, string[]>;

export interface ProfileData {
  name: string;
  title: string;
  avatar?: string;
  email?: string;
  location?: string;
  socials: SocialLink[];
  techStack: TechStackMap;
  content: string;
}

export interface ProjectData {
  title: string;
  slug: string;
  summary: string;
  tags: string[];
  cover?: string;
  status?: string;
  date?: string;
  repo?: string;
  demo?: string;
  content: string;
  sortDate: number;
}

export type EditorMode = 'profile' | 'project';
export type EditMode = 'form' | 'raw';

export interface SocialLinkField {
  id: string;
  label: string;
  href: string;
}

export interface ProfileStatField {
  id: string;
  label: string;
  value: string;
  description: string;
}

export interface TechStackEntry {
  id: string;
  category: string;
  items: string;
}

export interface ProfileFormState {
  name: string;
  title: string;
  avatar: string;
  email: string;
  location: string;
  socials: SocialLinkField[];
  stats: ProfileStatField[];
  focusAreas: string;
  techStack: TechStackEntry[];
  body: string;
}

export interface ProjectFormState {
  title: string;
  slug: string;
  summary: string;
  tags: string;
  cover: string;
  status: string;
  date: string;
  repo: string;
  demo: string;
  body: string;
}

import 'server-only';

import { existsSync } from 'node:fs';
import path from 'node:path';

import type { ProfileData, ProfileStat, SocialLink, TechStackMap } from '@/types/content';
import { TECH_STACK_CATEGORIES } from '@/types/content';

import { isRecord, normalizeString, normalizeStringArray, parseMarkdownFile } from './markdown';

const PROFILE_PATH = path.join(process.cwd(), 'content', 'profile.md');

function normalizeSocialLinks(value: unknown): SocialLink[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.flatMap((item) => {
    if (!isRecord(item)) {
      return [];
    }

    const label = normalizeString(item.label);
    const href = normalizeString(item.href);

    return label && href ? [{ label, href }] : [];
  });
}

function normalizeTechStack(value: unknown): TechStackMap {
  if (!isRecord(value)) {
    return {};
  }

  const preferredCategories = TECH_STACK_CATEGORIES.reduce<TechStackMap>((accumulator, category) => {
    const items = normalizeStringArray(value[category]);

    if (items.length > 0) {
      accumulator[category] = items;
    }

    return accumulator;
  }, {});

  const extraCategories = Object.entries(value).reduce<TechStackMap>((accumulator, [category, items]) => {
    if (TECH_STACK_CATEGORIES.includes(category as (typeof TECH_STACK_CATEGORIES)[number])) {
      return accumulator;
    }

    const normalizedItems = normalizeStringArray(items);

    if (normalizedItems.length > 0) {
      accumulator[category] = normalizedItems;
    }

    return accumulator;
  }, {});

  return {
    ...preferredCategories,
    ...extraCategories,
  };
}

function normalizeProfileStats(value: unknown): ProfileStat[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.flatMap((item) => {
    if (!isRecord(item)) {
      return [];
    }

    const label = normalizeString(item.label);
    const valueText = normalizeString(item.value);
    const description = normalizeString(item.description);

    return label && valueText
      ? [
          {
            label,
            value: valueText,
            description,
          },
        ]
      : [];
  });
}

export function getProfile(): ProfileData {
  if (!existsSync(PROFILE_PATH)) {
    return {
      name: 'Your Name',
      title: 'Personal Showcase',
      socials: [],
      stats: [],
      focusAreas: [],
      techStack: {},
      content: 'Create `content/profile.md` to add your profile details and bio.',
    };
  }

  const { data, content } = parseMarkdownFile(PROFILE_PATH);

  return {
    name: normalizeString(data.name) ?? 'Your Name',
    title: normalizeString(data.title) ?? 'Personal Showcase',
    avatar: normalizeString(data.avatar),
    email: normalizeString(data.email),
    location: normalizeString(data.location),
    socials: normalizeSocialLinks(data.socials),
    stats: normalizeProfileStats(data.stats),
    focusAreas: normalizeStringArray(data.focusAreas),
    techStack: normalizeTechStack(data.techStack),
    content: content || 'Add your profile story in `content/profile.md`.',
  };
}

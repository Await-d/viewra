import 'server-only';

import { existsSync, readdirSync } from 'node:fs';
import path from 'node:path';

import type { ProjectData } from '@/types/content';

import { normalizeString, normalizeStringArray, parseMarkdownFile } from './markdown';

const PROJECTS_DIRECTORY = path.join(process.cwd(), 'content', 'projects');

function getProjectFileNames(): string[] {
  if (!existsSync(PROJECTS_DIRECTORY)) {
    return [];
  }

  return readdirSync(PROJECTS_DIRECTORY)
    .filter((fileName) => fileName.endsWith('.md'))
    .sort((left, right) => left.localeCompare(right));
}

function resolveProjectFile(fileName: string): ProjectData {
  const filePath = path.join(PROJECTS_DIRECTORY, fileName);
  const { data, content } = parseMarkdownFile(filePath);

  const title = normalizeString(data.title);
  const slug = normalizeString(data.slug);
  const summary = normalizeString(data.summary);

  if (!title || !slug || !summary) {
    throw new Error(
      `Project file "${fileName}" must define non-empty title, slug, and summary frontmatter fields.`,
    );
  }

  const date = normalizeString(data.date);
  const parsedDate = date ? Date.parse(date) : Number.NaN;

  return {
    title,
    slug,
    summary,
    tags: normalizeStringArray(data.tags),
    cover: normalizeString(data.cover),
    status: normalizeString(data.status),
    date,
    repo: normalizeString(data.repo),
    demo: normalizeString(data.demo),
    content,
    sortDate: Number.isNaN(parsedDate) ? 0 : parsedDate,
  };
}

export function getAllProjects(): ProjectData[] {
  const seenSlugs = new Set<string>();

  return getProjectFileNames()
    .map(resolveProjectFile)
    .map((project) => {
      if (seenSlugs.has(project.slug)) {
        throw new Error(`Duplicate project slug "${project.slug}" found in content/projects.`);
      }

      seenSlugs.add(project.slug);
      return project;
    })
    .sort((left, right) => {
      if (left.sortDate === right.sortDate) {
        return left.title.localeCompare(right.title);
      }

      return right.sortDate - left.sortDate;
    });
}

export function getProjectBySlug(slug: string): ProjectData | undefined {
  return getAllProjects().find((project) => project.slug === slug);
}

export function getLatestProjects(limit = 2): ProjectData[] {
  return getAllProjects().slice(0, limit);
}

export { formatProjectDate } from './date';

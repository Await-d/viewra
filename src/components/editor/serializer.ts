import type { ProfileFormState, ProjectFormState } from './types';

function yamlString(value: string): string {
  if (!value) return "''";
  // Quote if contains special chars
  if (/[:#\[\]{}|>&*!,'"%@`\n]/.test(value) || value.trim() !== value) {
    return `'${value.replace(/'/g, "''")}'`;
  }
  return value;
}

function yamlList(items: string[]): string {
  if (items.length === 0) return '[]';
  return items.map((item) => `\n  - ${yamlString(item)}`).join('');
}

export function serializeProfileToMarkdown(state: ProfileFormState): string {
  const lines: string[] = ['---'];

  lines.push(`name: ${yamlString(state.name)}`);
  lines.push(`title: ${yamlString(state.title)}`);

  if (state.avatar) lines.push(`avatar: ${yamlString(state.avatar)}`);
  if (state.email) lines.push(`email: ${yamlString(state.email)}`);
  if (state.location) lines.push(`location: ${yamlString(state.location)}`);

  const validSocials = state.socials.filter((s) => s.label && s.href);
  if (validSocials.length > 0) {
    lines.push('socials:');
    for (const social of validSocials) {
      lines.push(`  - label: ${yamlString(social.label)}`);
      lines.push(`    href: ${yamlString(social.href)}`);
    }
  }

  const focusItems = state.focusAreas
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean);
  if (focusItems.length > 0) {
    lines.push(`focusAreas:${yamlList(focusItems)}`);
  }

  const validStats = state.stats.filter((s) => s.label && s.value);
  if (validStats.length > 0) {
    lines.push('stats:');
    for (const stat of validStats) {
      lines.push(`  - label: ${yamlString(stat.label)}`);
      lines.push(`    value: ${yamlString(stat.value)}`);
      if (stat.description) lines.push(`    description: ${yamlString(stat.description)}`);
    }
  }

  const validTechStack = state.techStack.filter((e) => e.category && e.items.trim());
  if (validTechStack.length > 0) {
    lines.push('techStack:');
    for (const entry of validTechStack) {
      const items = entry.items
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean);
      lines.push(`  ${entry.category}:${yamlList(items)}`);
    }
  }

  lines.push('---');

  if (state.body.trim()) {
    lines.push('');
    lines.push(state.body.trim());
    lines.push('');
  }

  return lines.join('\n');
}

export function serializeProjectToMarkdown(state: ProjectFormState): string {
  const lines: string[] = ['---'];

  lines.push(`title: ${yamlString(state.title)}`);
  lines.push(`slug: ${yamlString(state.slug)}`);
  lines.push(`summary: ${yamlString(state.summary)}`);

  const tags = state.tags
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean);
  if (tags.length > 0) {
    lines.push(`tags:${yamlList(tags)}`);
  }

  if (state.cover) lines.push(`cover: ${yamlString(state.cover)}`);
  if (state.status) lines.push(`status: ${yamlString(state.status)}`);
  if (state.date) lines.push(`date: ${yamlString(state.date)}`);
  if (state.repo) lines.push(`repo: ${yamlString(state.repo)}`);
  if (state.demo) lines.push(`demo: ${yamlString(state.demo)}`);

  lines.push('---');

  if (state.body.trim()) {
    lines.push('');
    lines.push(state.body.trim());
    lines.push('');
  }

  return lines.join('\n');
}

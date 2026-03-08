import { readFileSync } from 'node:fs';

import matter from 'gray-matter';

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function parseMarkdownFile(filePath: string) {
  const source = readFileSync(filePath, 'utf8');
  const parsed = matter(source);

  return {
    data: isRecord(parsed.data) ? parsed.data : {},
    content: parsed.content.trim(),
  };
}

export function normalizeString(value: unknown): string | undefined {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString().slice(0, 10);
  }

  if (typeof value !== 'string') {
    return undefined;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

export function normalizeStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.flatMap((item) => {
    const normalized = normalizeString(item);
    return normalized ? [normalized] : [];
  });
}

export function toPlainText(markdown: string): string {
  return markdown
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/__(.*?)__/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/_(.*?)_/g, '$1')
    .replace(/~~(.*?)~~/g, '$1')
    .replace(/^[#>*\-\s]+/gm, '')
    .replace(/\n+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function getLeadParagraph(markdown: string): string | undefined {
  const [firstParagraph] = markdown
    .split(/\n\s*\n/)
    .map((section) => toPlainText(section))
    .filter((section) => section.length > 0);

  return firstParagraph;
}

export function getPreviewParagraphs(markdown: string, limit = 2): string {
  const previewBlocks = markdown
    .split(/\n\s*\n/)
    .map((section) => section.trim())
    .filter((section) => section.length > 0)
    .filter(
      (section) =>
        !section.startsWith('#') &&
        !section.startsWith('-') &&
        !section.startsWith('* ') &&
        !section.startsWith('>') &&
        !section.startsWith('```'),
    )
    .slice(0, limit);

  if (previewBlocks.length > 0) {
    return previewBlocks.join('\n\n');
  }

  return markdown.split(/\n\s*\n/).slice(0, limit).join('\n\n');
}

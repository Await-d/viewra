export function formatProjectDate(date?: string): string | undefined {
  if (!date) {
    return undefined;
  }

  const parsedDate = Date.parse(date);

  if (Number.isNaN(parsedDate)) {
    return date;
  }

  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(parsedDate));
}

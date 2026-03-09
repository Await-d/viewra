import { NextResponse } from 'next/server';

const GITHUB_USERNAME = 'Await-d';

export interface GitHubRepo {
  id: number;
  name: string;
  fullName: string;
  description: string | null;
  htmlUrl: string;
  language: string | null;
  stars: number;
  forks: number;
  topics: string[];
  fork: boolean;
  archived: boolean;
  pushedAt: string;
  createdAt: string;
  homepage: string | null;
}

export async function GET() {
  const headers: HeadersInit = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'viewra-app',
  };

  const token = process.env.GITHUB_TOKEN;
  if (token) headers['Authorization'] = `Bearer ${token}`;

  let response: Response;
  try {
    response = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?type=public&per_page=100&sort=updated`,
      { headers, next: { revalidate: 3600 } },
    );
  } catch {
    return NextResponse.json({ error: 'Failed to reach GitHub API' }, { status: 502 });
  }

  if (!response.ok) {
    return NextResponse.json({ error: `GitHub API error: ${response.status}` }, { status: 502 });
  }

  const raw = await response.json() as Array<{
    id: number;
    name: string;
    full_name: string;
    description: string | null;
    html_url: string;
    language: string | null;
    stargazers_count: number;
    forks_count: number;
    topics: string[];
    fork: boolean;
    archived: boolean;
    pushed_at: string;
    created_at: string;
    homepage: string | null;
  }>;

  const repos: GitHubRepo[] = raw
    .filter((r) => r.name !== GITHUB_USERNAME)
    .map((r) => ({
      id: r.id,
      name: r.name,
      fullName: r.full_name,
      description: r.description,
      htmlUrl: r.html_url,
      language: r.language,
      stars: r.stargazers_count,
      forks: r.forks_count,
      topics: r.topics ?? [],
      fork: r.fork,
      archived: r.archived,
      pushedAt: r.pushed_at,
      createdAt: r.created_at,
      homepage: r.homepage,
    }))
    .sort((a, b) => {
      if (b.stars !== a.stars) return b.stars - a.stars;
      return new Date(b.pushedAt).getTime() - new Date(a.pushedAt).getTime();
    });

  return NextResponse.json(repos, {
    headers: { 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400' },
  });
}

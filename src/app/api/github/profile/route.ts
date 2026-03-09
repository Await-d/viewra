import { NextResponse } from 'next/server';

const GITHUB_USERNAME = 'Await-d';

export async function GET() {
  const headers: HeadersInit = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'viewra-app',
  };

  const token = process.env.GITHUB_TOKEN;
  if (token) headers['Authorization'] = `Bearer ${token}`;

  let response: Response;
  try {
    response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, {
      headers,
      next: { revalidate: 3600 },
    });
  } catch {
    return NextResponse.json({ error: 'Failed to reach GitHub API' }, { status: 502 });
  }

  if (!response.ok) {
    return NextResponse.json({ error: `GitHub API error: ${response.status}` }, { status: 502 });
  }

  const data = await response.json() as {
    name: string;
    bio: string;
    avatar_url: string;
    public_repos: number;
    followers: number;
    following: number;
    html_url: string;
    created_at: string;
  };

  return NextResponse.json(
    {
      name: data.name,
      bio: data.bio,
      avatarUrl: data.avatar_url,
      publicRepos: data.public_repos,
      followers: data.followers,
      following: data.following,
      htmlUrl: data.html_url,
      createdAt: data.created_at,
    },
    {
      headers: { 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400' },
    },
  );
}

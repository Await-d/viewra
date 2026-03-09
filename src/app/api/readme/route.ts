import { NextRequest, NextResponse } from 'next/server';

import { githubFetch } from '@/lib/github-fetch';

function extractGitHubRepo(repoUrl: string): string | null {
  try {
    const url = new URL(repoUrl);
    if (url.hostname !== 'github.com') return null;
    const parts = url.pathname.replace(/^\//, '').replace(/\.git$/, '').split('/');
    if (parts.length < 2) return null;
    return `${parts[0]}/${parts[1]}`;
  } catch {
    return null;
  }
}

export async function GET(request: NextRequest) {
  const repo = request.nextUrl.searchParams.get('repo');

  if (!repo) {
    return NextResponse.json({ error: 'Missing repo parameter' }, { status: 400 });
  }

  const normalized = repo.startsWith('https://') ? extractGitHubRepo(repo) : repo;

  if (!normalized || !/^[\w.-]+\/[\w.-]+$/.test(normalized)) {
    return NextResponse.json({ error: 'Invalid repo format' }, { status: 400 });
  }

  const apiUrl = `https://api.github.com/repos/${normalized}/readme`;

  const headers: HeadersInit = {
    Accept: 'application/vnd.github.raw+json',
    'User-Agent': 'viewra-app',
  };

  const token = process.env.GITHUB_TOKEN;
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  let response: Response;
  try {
    response = await githubFetch(apiUrl, {
      headers,
      next: { revalidate: 3600 },
    });
  } catch {
    return NextResponse.json({ error: 'Failed to reach GitHub API' }, { status: 502 });
  }

  if (response.status === 404) {
    return NextResponse.json({ error: 'README not found' }, { status: 404 });
  }

  if (!response.ok) {
    return NextResponse.json(
      { error: `GitHub API error: ${response.status}` },
      { status: 502 },
    );
  }

  const content = await response.text();

  return new NextResponse(content, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}

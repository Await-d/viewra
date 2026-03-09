import 'server-only';

const GITHUB_API = 'https://api.github.com';
const GITHUB_RAW = 'https://raw.githubusercontent.com';

const PROXY_API = 'https://ghproxy.cc/https://api.github.com';
const PROXY_RAW = 'https://ghproxy.cc/https://raw.githubusercontent.com';

function buildUrls(url: string): string[] {
  const urls: string[] = [url];
  const proxyUrl = process.env.GITHUB_PROXY_URL;

  if (url.startsWith(GITHUB_API)) {
    urls.push(url.replace(GITHUB_API, PROXY_API));
  } else if (url.startsWith(GITHUB_RAW)) {
    urls.push(url.replace(GITHUB_RAW, PROXY_RAW));
  }

  if (proxyUrl) {
    urls.push(`${proxyUrl.replace(/\/$/, '')}/${url}`);
  }

  return [...new Set(urls)];
}

export async function githubFetch(
  url: string,
  options: RequestInit & { next?: { revalidate?: number } } = {},
): Promise<Response> {
  const urls = buildUrls(url);

  const controllers = urls.map(() => new AbortController());
  const timeout = 8000;

  const races = urls.map((u, i) =>
    fetch(u, {
      ...options,
      signal: controllers[i].signal,
    }).then((res) => {
      if (!res.ok && res.status !== 404) throw new Error(`HTTP ${res.status}`);
      for (let j = 0; j < controllers.length; j++) {
        if (j !== i) controllers[j].abort();
      }
      return res;
    }),
  );

  let timeoutId: ReturnType<typeof setTimeout>;
  const timer = new Promise<never>((_, reject) => {
    timeoutId = setTimeout(() => {
      for (const c of controllers) c.abort();
      reject(new Error('All GitHub API requests timed out'));
    }, timeout);
  });

  return Promise.any(races).then(
    (res) => { clearTimeout(timeoutId); return res; },
    () => Promise.reject(new Error('All GitHub API requests failed')),
  ).finally(() => clearTimeout(timeoutId)) as Promise<Response>;
}

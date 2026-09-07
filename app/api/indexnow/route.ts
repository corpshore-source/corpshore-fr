import { NextResponse } from "next/server";
import { SITE } from "@/lib/site";
import { industrySectors } from "@/lib/data/industries-data";
import { servicesDeep } from "@/lib/data/services-deep";
import { blogPosts } from "@/lib/data/blog";

const LOCALES = ["fr", "en"];

function buildUrlList(): string[] {
  const urls: string[] = [];

  // Static pages
  const staticPaths = ["/", "/services", "/industries", "/villes", "/a-propos", "/carrieres", "/blog", "/etudes-de-cas", "/contact", "/devis"];
  for (const path of staticPaths) {
    for (const locale of LOCALES) {
      urls.push(`${SITE.url}/${locale}${path === "/" ? "" : path}`);
    }
  }

  // Industry sub-pages
  for (const sector of industrySectors) {
    for (const locale of LOCALES) {
      urls.push(`${SITE.url}/${locale}/industries/${sector.slug}`);
    }
  }

  // Service deep pages
  for (const svc of servicesDeep) {
    for (const locale of LOCALES) {
      urls.push(`${SITE.url}/${locale}/services/${svc.slug}`);
    }
  }

  // Blog posts (most recent 20)
  for (const post of blogPosts.slice(0, 20)) {
    for (const locale of LOCALES) {
      urls.push(`${SITE.url}/${locale}/blog/${post.slug}`);
    }
  }

  return urls;
}

async function pingIndexNow(urls: string[]): Promise<{ engine: string; status: number }[]> {
  const key = process.env.INDEXNOW_KEY;
  if (!key) return [];

  const body = {
    host: new URL(SITE.url).hostname,
    key,
    keyLocation: `${SITE.url}/${key}.txt`,
    urlList: urls.slice(0, 10000),
  };

  const engines = [
    "https://api.indexnow.org/indexnow",
    "https://www.bing.com/indexnow",
  ];

  const results = await Promise.allSettled(
    engines.map(async (endpoint) => {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify(body),
      });
      return { engine: endpoint, status: res.status };
    })
  );

  return results
    .filter((r): r is PromiseFulfilledResult<{ engine: string; status: number }> => r.status === "fulfilled")
    .map((r) => r.value);
}

export async function POST(req: Request) {
  // Allow only internal or signed requests to avoid abuse
  const auth = req.headers.get("x-indexnow-secret");
  const expected = process.env.INDEXNOW_CRON_SECRET;
  if (expected && auth !== expected) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const urls = buildUrlList();
  const results = await pingIndexNow(urls);

  return NextResponse.json({ submitted: urls.length, engines: results });
}

// GET returns the key file content (required by IndexNow spec)
export async function GET() {
  const key = process.env.INDEXNOW_KEY;
  if (!key) return new Response("not configured", { status: 404 });
  return new Response(key, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}

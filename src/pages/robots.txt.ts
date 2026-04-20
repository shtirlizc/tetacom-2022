import type { APIRoute } from "astro";
import { getSiteUrl } from "../utils/site-url";

export const GET: APIRoute = ({ site }) => {
  const sitemapUrl = getSiteUrl("sitemap-index.xml", site);

  return new Response(
    `User-agent: *
Allow: /

Sitemap: ${sitemapUrl}
`,
    {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    },
  );
};

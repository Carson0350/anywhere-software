import type { APIRoute } from 'astro';
import { portfolioItems } from '../data/portfolio';

export const GET: APIRoute = async ({ site }) => {
  const siteUrl = site?.toString().replace(/\/$/, '') || 'https://anywheresoftware.com';

  // Static pages with strategic priorities
  const staticPages = [
    { url: '', priority: 1.0, changefreq: 'weekly', lastmod: new Date() },
    { url: 'about', priority: 0.9, changefreq: 'monthly', lastmod: new Date() },
    { url: 'portfolio', priority: 0.9, changefreq: 'weekly', lastmod: new Date() },
  ];

  // Dynamic portfolio items
  const portfolioPages = portfolioItems.map(item => ({
    url: `portfolio/${item.id}`,
    priority: 0.6,
    changefreq: 'monthly',
    lastmod: item.launchDate
  }));

  const pages = [...staticPages, ...portfolioPages];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => `  <url>
    <loc>${siteUrl}/${page.url}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
    <lastmod>${page.lastmod.toISOString()}</lastmod>
  </url>`).join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600'
    }
  });
};

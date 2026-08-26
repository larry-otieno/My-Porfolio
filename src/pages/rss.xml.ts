import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { site } from '../config/site';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async (context) => {
  const writeups = (await getCollection('writeups'))
    .filter((entry) => !entry.data.draft)
    .sort((a, b) => b.data.published.getTime() - a.data.published.getTime());

  const base = import.meta.env.BASE_URL.replace(/\/$/, '');

  return rss({
    title: `${site.name} — Writeups`,
    description:
      'Short technical writeups on digital forensics, vulnerability assessment and secure system design.',
    site: context.site ?? site.url,
    trailingSlash: false,
    items: writeups.map((entry) => ({
      title: entry.data.title,
      description: entry.data.summary,
      pubDate: entry.data.published,
      categories: [...entry.data.tags],
      link: `${base}/writeups/${entry.id}`,
    })),
    customData: '<language>en-GB</language>',
  });
};

import type { APIContext, APIRoute } from 'astro';
import { defineJsonEndpoint } from '@/api/response';
import { fetchBlogs } from '@/api/cms/fetch/blogs';
import { formatMicroCMSQueryFilters } from '@/api/cms/query';

export const prerender = false;

export type GetResponse = Awaited<ReturnType<typeof get>>;
export const GET: APIRoute = (context) => defineJsonEndpoint(get, context);
async function get({ request }: APIContext) {
  const searchParams = new URL(request.url).searchParams;

  let filters = '';

  const categories = searchParams.get('category')?.split(',') || [];
  if (categories.length) {
    if (filters) filters += `[or]`;
    filters += formatMicroCMSQueryFilters(
      'category',
      'equals',
      categories,
      'or',
    );
  }

  const tags = searchParams.get('tag')?.split(',') || [];
  if (tags.length) {
    if (filters) filters += `[or]`;
    filters += formatMicroCMSQueryFilters('tags', 'contains', tags, 'or');
  }

  return fetchBlogs({
    orders: '-createdAt',
    limit: 16,
    filters,
  });
}

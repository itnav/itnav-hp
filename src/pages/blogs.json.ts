import type { APIContext, APIRoute } from 'astro';
import { fetchBlogs } from '@/api/cms/fetch/blogs';
import { defineJsonEndpoint } from '@/api/response';

export const prerender = false;

export type GetResponse = Awaited<ReturnType<typeof get>>;
export const GET: APIRoute = (context) => defineJsonEndpoint(get, context);
async function get(_: APIContext) {
  return fetchBlogs({
    orders: '-createdAt',
    limit: 4,
  });
}

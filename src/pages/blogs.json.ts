import type { APIContext, APIRoute } from 'astro';
import { fetchBlogs } from '@/api/cms/fetch/blogs';
import { defineJsonEndpoint } from '@/api/response';

export type GetResponse = Awaited<ReturnType<typeof get>>;
export const GET: APIRoute = (context) => defineJsonEndpoint(get, context);
async function get(context: APIContext) {
  return fetchBlogs({ orders: '-createdAt', limit: 4 });
}

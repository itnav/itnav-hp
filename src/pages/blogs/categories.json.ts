import type { APIContext, APIRoute } from 'astro';
import { defineJsonEndpoint } from '@/api/response';
import { fetchCategories } from '@/api/cms/fetch/category';

export const prerender = true;

export type GetRequest = Awaited<ReturnType<typeof get>>;
export const GET: APIRoute = (context) => defineJsonEndpoint(get, context);
async function get({}: APIContext) {
  return fetchCategories();
}

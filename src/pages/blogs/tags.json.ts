import type { APIContext, APIRoute } from 'astro';
import { defineJsonEndpoint } from '@/api/response';
import { fetchTags } from '@/api/cms/fetch/tag';

export const prerender = false;

export type GetRequest = Awaited<ReturnType<typeof get>>;
export const GET: APIRoute = (context) => defineJsonEndpoint(get, context);
async function get({}: APIContext) {
  return fetchTags();
}

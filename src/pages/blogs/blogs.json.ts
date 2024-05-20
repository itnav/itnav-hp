import type { APIContext, APIRoute } from 'astro';
import { defineJsonEndpoint } from '@/api/response';
import { fetchBlogs } from '@/api/cms/fetch/blogs';
import {
  createExcludingTestMicroCMSQueryFilter,
  formatMicroCMSQueryFilters,
} from '@/api/cms/query';

export const prerender = false;

export type GetRequest = Awaited<ReturnType<typeof get>>;
export const GET: APIRoute = (context) => defineJsonEndpoint(get, context);
async function get({ request }: APIContext) {
  const searchParams = new URL(request.url).searchParams;

  // `test` タグが含まれていないブログを取得する
  let filters = createExcludingTestMicroCMSQueryFilter();

  const categories = searchParams.get('category')?.split(',') || [];
  if (categories.length) {
    filters += `[or]`;
    filters += formatMicroCMSQueryFilters(
      'category',
      'equals',
      categories,
      'or',
    );
  }

  const tags = searchParams.get('tag')?.split(',') || [];
  if (tags.length) {
    filters += `[or]`;
    filters += formatMicroCMSQueryFilters('tags', 'contains', tags, 'or');
  }

  return fetchBlogs({
    orders: '-createdAt',
    filters,
    limit: 16,
  });
}

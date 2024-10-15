import {
  microCMSFetchMany,
  microCMSFetchOne,
  microCMSFetchById,
} from '../query';
import type { Category } from './category';
import type { MicroCMSEntity, MicroCMSImageEntity } from '../schema';
import type { MicroCMSQuery } from '../query';
import type { Tag } from './tag';

export interface Blog extends MicroCMSEntity {
  title: string;
  content: string;
  category: Category;
  tags: Tag[];
  thumbnail: MicroCMSImageEntity;
  startedEventAt: string;
  endedEventAt?: string;
}

export function fetchBlogs(query?: MicroCMSQuery<Blog>) {
  return microCMSFetchMany('/blogs', query);
}

export function fetchBlog(query?: MicroCMSQuery<Blog>) {
  return microCMSFetchOne('/blogs', query);
}

export async function fetchBlogById(blogId: string) {
  const response = await fetch(
    `http://localhost:10003/wp-json/wp/v2/posts/${blogId}?_embed`,
  );
  const data = await response.json();
  return data;
}

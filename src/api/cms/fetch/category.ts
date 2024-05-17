import {
  microCMSFetchById,
  microCMSFetchMany,
  microCMSFetchOne,
} from '../query';
import type { MicroCMSEntity } from '../schema';
import type { MicroCMSQuery } from '../query';

export interface Category extends MicroCMSEntity {
  key: string;
  name: string;
}

export function fetchCategories(query?: MicroCMSQuery<Category>) {
  return microCMSFetchMany('/categories', query);
}

export function fetchCategory(query?: MicroCMSQuery<Category>) {
  return microCMSFetchOne('/categories', query);
}

export function fetchCategoryById(id: string, query?: MicroCMSQuery<Category>) {
  return microCMSFetchById(`/categories`, id, query);
}

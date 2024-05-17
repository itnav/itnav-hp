import {
  microCMSFetchById,
  microCMSFetchMany,
  microCMSFetchOne,
} from '../query';
import type { MicroCMSQuery } from '../query';
import type { MicroCMSEntity } from '../schema';

export interface Tag extends MicroCMSEntity {
  key: string;
  name: string;
}

export function fetchTags(query?: MicroCMSQuery<Tag>) {
  return microCMSFetchMany('/tags', query);
}

export function fetchTag(query?: MicroCMSQuery<Tag>) {
  return microCMSFetchOne('/tags', query);
}

export function fetchTagById(id: string, query?: MicroCMSQuery<Tag>) {
  return microCMSFetchById(`/tags`, id, query);
}

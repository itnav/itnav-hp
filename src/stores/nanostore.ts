import { nanoquery } from '@nanostores/query';

export const [createFetcherStore, createMutatorStore] = nanoquery({
  cacheLifetime: Infinity,
  dedupeTime: Infinity,
});

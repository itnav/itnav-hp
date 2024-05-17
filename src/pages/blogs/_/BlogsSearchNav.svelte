<script lang="ts">
  import { createFetcherStore } from '@/stores/nanostore';
  import type { GetRequest } from '../categories.json';
  import { searchBlogCategoryParams, searchBlogTagParams } from './blog.state';
  import { onMount } from 'svelte';

  const categoriesQueryEndpoint = `/blogs/categories.json`;
  const categoriesQuery = createFetcherStore<GetRequest>(
    categoriesQueryEndpoint,
    { fetcher: () => fetch(categoriesQueryEndpoint).then((res) => res.json()) },
  );

  const tagsQueryEndpoint = `/blogs/tags.json`;
  const tagsQuery = createFetcherStore<GetRequest>(tagsQueryEndpoint, {
    fetcher: () => fetch(tagsQueryEndpoint).then((res) => res.json()),
  });

  $: categories = $categoriesQuery.data;
  $: tags = $tagsQuery.data;

  $: isLoading = $categoriesQuery.loading || $tagsQuery.loading;
  $: error = $categoriesQuery.error || $tagsQuery.error;

  let hasCachedInitialItem = true;
  onMount(() => {
    hasCachedInitialItem = !!(
      categoriesQuery.get().data && tagsQuery.get().data
    );
  });
</script>

<nav class="nav">
  {#if isLoading}
    <div class="loading">Loading...</div>
  {:else if error}
    <div class="error">カテゴリー・タグが取得できませんでした。</div>
  {:else if categories && tags}
    <div class="nav-content{hasCachedInitialItem ? '' : ' animate'}">
      <div class="nav-outer">
        <div class="nav-inner">
          <span class="category-title title app-en">Category.</span>

          <div class="categories">
            {#each categories as category}
              {@const id = category.id}
              {@const isActive = $searchBlogCategoryParams[id]}
              <button
                on:click={() => searchBlogCategoryParams.setKey(id, !isActive)}
                class="category app-tooltip"
                class:active={isActive}
                aria-label={`${category.name}を検索条件に含める`}
              >
                {category.name}
              </button>
            {/each}
          </div>

          <div class="divider"></div>

          <span class="tag-title title app-en">Tag.</span>
          <div class="tags">
            {#each tags as tag}
              {@const id = tag.id}
              {@const isActive = $searchBlogTagParams[id]}
              <button
                class="tag"
                class:active={isActive}
                on:click={() => searchBlogTagParams.setKey(id, !isActive)}
                aria-label={`${tag.name}を検索条件に含める`}
              >
                # {tag.name}
              </button>
            {/each}
          </div>
        </div>
      </div>
    </div>
  {/if}
</nav>

<style scoped lang="scss">
  .nav {
    box-sizing: border-box;
    display: flex;
    min-height: 88px;
    margin-bottom: 72px;
    border: 3px solid black;
    border-radius: 8px;
  }

  .nav-content {
    display: grid;

    &:global(.animate) {
      grid-template-rows: 0fr;
      animation: transition(open, long4, ease-in-out) both;

      @keyframes open {
        from {
          grid-template-rows: 0fr;
        }
        to {
          grid-template-rows: 1fr;
        }
      }
    }
  }

  .loading,
  .error {
    padding: 24px;
    margin: auto 0;
  }

  .nav-outer {
    overflow: hidden;
  }
  .nav-inner {
    padding: 24px;
  }

  .category {
    margin-right: 16px;
    margin-bottom: 8px;
  }

  .title {
    display: block;
    margin-bottom: 16px;
    font-size: 18px;
    font-weight: 500;
  }

  .divider {
    height: 2px;
    margin: 24px 0;
    background-color: $outline-variant;
  }

  .tag {
    margin-right: 24px;
    font-size: 16px;
    line-height: 2;
  }

  .active {
    color: $primary;
    border-color: $primary;
  }

  @include pc {
    .loading,
    .error {
      padding: 0 48px;
      margin: auto 0;
    }

    .nav-inner {
      display: grid;
      grid-template-areas:
        'category-title categories'
        'divider           divider'
        'tag-title            tags';
      grid-template-rows: auto auto auto;
      grid-template-columns: auto 1fr;
      padding: 48px 48px 32px;
    }

    .title {
      margin-right: 24px;
    }
    .divider {
      grid-area: divider;
      margin: 32px 0;
    }

    .categories {
      grid-area: categories;
    }
    .category {
      margin-right: 24px;
      font-size: 14px;
    }
    .category-title {
      grid-area: category-title;
    }

    .tag-title {
      grid-area: tag-title;
    }
    .tags {
      grid-area: tags;
    }
    .tag {
      margin-right: 32px;
      font-size: 15px;
      letter-spacing: 2px;
    }
  }
</style>

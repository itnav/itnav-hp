<script lang="ts">
  import { createFetcherStore } from '@/stores/nanostore';
  import { timestampToYYYYMMDD } from '@/utils/date';
  import { searchBlogCategoryParams, searchBlogTagParams } from './blog.state';
  import type { GetResponse } from '../blogs.json';
  import { onMount } from 'svelte';

  export let contentElementId: string | undefined;

  const baseBlogsQueryEndpoint = `/blogs/blogs.json`;
  let blogsQueryEndpoint = baseBlogsQueryEndpoint;

  $: blogsQuery = createFetcherStore<GetResponse>(blogsQueryEndpoint, {
    fetcher: () => fetch(blogsQueryEndpoint).then((res) => res.json()),
  });

  let hasCachedInitialBlog = true;
  onMount(() => (hasCachedInitialBlog = !!blogsQuery.get().data));

  $: {
    let blogCategoryQueryParams = '';
    Object.entries($searchBlogCategoryParams).forEach(
      ([key, value]) => value && (blogCategoryQueryParams += `,${key}`),
    );

    let blogTagQueryParams = '';
    Object.entries($searchBlogTagParams).forEach(
      ([key, value]) => value && (blogTagQueryParams += `,${key}`),
    );

    let blogQuery = '';
    if (blogCategoryQueryParams) {
      blogQuery = `category=${blogCategoryQueryParams.substring(1)}`;
    }
    if (blogTagQueryParams) {
      if (blogQuery) blogQuery += '&';
      blogQuery = `tag=${blogTagQueryParams.substring(1)}`;
    }

    blogsQueryEndpoint = `${baseBlogsQueryEndpoint}${blogQuery ? `?${blogQuery}` : ''}`;
  }
</script>

<section class="blogs">
  {#if $blogsQuery.loading}
    <div class="loading">検索中...</div>
  {:else if $blogsQuery.error}
    <div class="error">記事が取得できませんでした。</div>
  {:else if !$blogsQuery.data?.length}
    <div class="no-content">記事がみつかりませんでした。</div>
  {:else}
    <div
      class="cards {hasCachedInitialBlog ? '' : 'animate'}"
      id={contentElementId}
    >
      {#each $blogsQuery.data as blog, i}
        <a
          class="card"
          href={`/blogs/${blog.id}`}
          aria-label={`記事「${blog.title}」へ遷移する`}
        >
          <div class="thumbnail-frame">
            <img
              class="thumbnail"
              src={blog.thumbnail.url || ''}
              alt={`記事「${blog.title}」のサムネイル画像`}
              style={`view-transition-name: blog-thumbnail-${blog.id};`}
            />
          </div>

          <div class="content">
            <span class="category app-tooltip">{blog.category.name}</span>
            <span class="event-at">
              {timestampToYYYYMMDD(blog.createdAt)}
            </span>

            <h2 class="title">{blog.title}</h2>

            <div class="tags">
              {#each blog.tags as tag}
                <span class="tag"># {tag.name}</span>
              {/each}
            </div>
          </div>
        </a>
      {/each}
    </div>
  {/if}
</section>

<style scoped lang="scss">
  .cards {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 64px;
    align-items: stretch;
    justify-content: center;
    justify-items: stretch;
    margin-bottom: 120px;

    &:global(.animate) {
      animation: transition(fade-in, long4, ease-in-out) both;
    }

    @include pc {
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    }
  }

  .loading,
  .error,
  .no-content {
    margin-top: 24px;
    font-size: 18px;
    text-align: center;
  }

  .card {
    display: grid;
    grid-template-rows: auto 1fr;
    gap: 8px;
    width: 100%;
    cursor: pointer;
  }

  .thumbnail-frame {
    position: relative;
    aspect-ratio: 16 / 9;
    margin-bottom: 8px;
    overflow: hidden;
    border: 2px solid $outline-variant;
    border-top-left-radius: 24px;
    border-bottom-right-radius: 24px;
  }
  .thumbnail {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-top-left-radius: 24px;
    border-bottom-right-radius: 24px;
  }

  .content {
    box-sizing: border-box;
    display: grid;
    grid-template-areas:
      'category event-at'
      'title      title'
      'tags			   tags';
    grid-template-rows: auto 1fr auto;
    grid-template-columns: auto 1fr;
    gap: 8px;
    padding: 0 4px;
  }

  .category {
    grid-area: category;
    align-self: center;
    font-size: 12px;
  }

  .event-at {
    grid-area: event-at;
    align-self: center;
    padding: 2px;
    font-size: 12px;

    @include pc {
      font-size: 14px;
    }
  }

  .title {
    display: -webkit-box;
    grid-area: title;
    align-self: start;
    margin-bottom: 8px;
    overflow: hidden;
    font-size: 22px;
    font-weight: bold;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .tags {
    grid-area: tags;
    align-self: end;
    padding-left: 16px;
    font-size: 14px;
    color: $surface-variant;
    text-align: right;

    @include pc {
      padding-left: 24px;
      font-size: 16px;
    }
  }
  .tag {
    margin-right: 8px;
    white-space: nowrap;
  }
</style>

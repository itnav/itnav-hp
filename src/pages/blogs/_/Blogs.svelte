<script lang="ts">
  import { createFetcherStore } from '@/stores/nanostore';
  import { timestampToYYYYMMDD } from '@/utils/date';
  import { searchBlogCategoryParams, searchBlogTagParams } from './blog.state';
  import type { GetResponse } from '../blogs.json';
  import { onMount } from 'svelte';

  export let contentElementId: string | undefined;
 
	const basePostsQueryEndpoint = `http://localhost:10003//wp-json/wp/v2/posts?_embed`;
  let postsQueryEndpoint = basePostsQueryEndpoint;

  // 新しい関数: クエリエンドポイントを更新する
  function updateQueryEndpoint() {
    const categoryIds = Object.entries($searchBlogCategoryParams)
      .filter(([_, isSelected]) => isSelected)
      .map(([id, _]) => id);

    const tagIds = Object.entries($searchBlogTagParams)
      .filter(([_, isSelected]) => isSelected)
      .map(([id, _]) => id);

    let newEndpoint = basePostsQueryEndpoint;

    if (categoryIds.length > 0) {
      newEndpoint += `&categories=${categoryIds.join(',')}`;
    }

    if (tagIds.length > 0) {
      newEndpoint += `&tags=${tagIds.join(',')}`;
    }

    postsQueryEndpoint = newEndpoint;
  }

  // リアクティブステートメント: フィルターが変更されたときにエンドポイントを更新
  $: {
    $searchBlogCategoryParams;
    $searchBlogTagParams;
    updateQueryEndpoint();
  }

  // 更新: postsQueryエンドポイントが変更されたときに新しいクエリを実行
  $: postsQuery = createFetcherStore(postsQueryEndpoint, {
    fetcher: () => fetch(postsQueryEndpoint).then((res) => res.json()),
  });

  // カテゴリーとタグのエンドポイントを追加
  const categoriesQueryEndpoint = `http://localhost:10003//wp-json/wp/v2/categories`;
  const categoriesQuery = createFetcherStore(categoriesQueryEndpoint, {
    fetcher: () => fetch(categoriesQueryEndpoint).then((res) => res.json()),
  });

  const tagsQueryEndpoint = `http://localhost:10003//wp-json/wp/v2/tags`;
  const tagsQuery = createFetcherStore(tagsQueryEndpoint, {
    fetcher: () => fetch(tagsQueryEndpoint).then((res) => res.json()),
  });

  $: isLoading = $postsQuery.loading || $categoriesQuery.loading || $tagsQuery.loading;
  $: error = $postsQuery.error || $categoriesQuery.error || $tagsQuery.error;

  let hasCachedInitialPost = true;
  onMount(() => {
    hasCachedInitialPost = !!postsQuery.get().data;
  });

  function getTagsAndCategories(post: any) {
    const tags = post._embedded['wp:term'][1] || [];
    const categories = post._embedded['wp:term'][0] || [];
    return { tags, categories };
  }

  function getFeaturedImage(post: any) {
    return post._embedded['wp:featuredmedia'] ? post._embedded['wp:featuredmedia'][0].source_url : '';
  }

  let hasCachedInitialItem = true;
  onMount(() => {
    hasCachedInitialItem = !!(
      categoriesQuery.get().data && tagsQuery.get().data
    );
  });
</script>

<section class="blogs">
  {#if isLoading}
    <div class="loading">記事を読み込んでいます...</div>
  {:else if error}
    <div class="error">記事が取得できませんでした。</div>
  {:else if !$postsQuery.data?.length}
    <div class="no-content">記事がみつかりませんでした。</div>
  {:else}
    <div class="cards {hasCachedInitialPost ? '' : 'animate'}">
      {#each $postsQuery.data as post}
        <a class="card" href={`/blogs/${post.id}`} aria-label={`記事「${post.title.rendered}」へ遷移する`}>
          <div class="thumbnail-frame">
            <img
              class="thumbnail"
              src={getFeaturedImage(post)}
              alt={`記事「${post.title.rendered}」のサムネイル画像`}
              style={`view-transition-name: blog-thumbnail-${post.id};`}
            />
          </div>

          <div class="content">
            <span class="category app-tooltip">{getTagsAndCategories(post).categories[0]?.name || '未分類'}</span>
            <span class="event-at">{timestampToYYYYMMDD(post.date)}</span>
            <h2 class="title">{@html post.title.rendered}</h2>

            <div class="tags">
              {#each getTagsAndCategories(post).tags as tag}
                <span class="tag"># {@html tag.name}</span>
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
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
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

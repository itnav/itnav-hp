<script lang="ts">
  import { createFetcherStore } from '@/stores/nanostore';
  import { onMount } from 'svelte';
  import { timestampToYYYYMMDD } from '@/utils/date';
  import { searchBlogCategoryParams, searchBlogTagParams } from './blog.state';
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

  $: categories = $categoriesQuery.data;
  $: tags = $tagsQuery.data;

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

<section class="app-page-padding-x">
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

  {#if isLoading}
    <div class="loading">記事を読み込んでいます...</div>
  {:else if error}
    <div class="error">記事が取得できませんでした。</div>
  {:else if !$postsQuery.data?.length}
    <div class="no-content">記事がみつかりませんでした。</div>
  {:else}
    <div class="cards {hasCachedInitialPost ? '' : 'animate'}">
      {#each $postsQuery.data as post}
        <a class="card" href={`/example/${post.id}`} aria-label={`記事「${post.title.rendered}」へ遷移する`}>
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
  }

</style>

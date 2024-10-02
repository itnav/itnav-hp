<script lang="ts">
  import { createFetcherStore } from '@/stores/nanostore';
	import { onMount } from 'svelte';

	// データ取得用のエンドポイント
	const basePostsQueryEndpoint = `https://itnav-hp/wp-json/wp/v2/posts`;
	let postsQueryEndpoint = basePostsQueryEndpoint;

	/**
	 * データ取得
	 */
	// データの取得とloading状態など管理できるようにnanostoreを使う(おそらく)
	$: postsQuery = createFetcherStore(postsQueryEndpoint, {
		fetcher: () => fetch(postsQueryEndpoint).then((res) => res.json()),
	});

	// 初期データがキャッシュされているかどうか
	let hasCachedInitialPost = true;
	/**
	 * コンポーネントがマウントされた時の処理
	*/
  onMount(() => {
		return (hasCachedInitialPost = !!postsQuery.get().data)
});

</script>

<div class="example-component">
	<!-- loading時の処理 -->
  {#if $postsQuery.loading}
	<p>記事を読み込んでいます...</p>

	<!-- loading時以外の描画 -->
  {:else}
	<ul>
		<!-- 取得できた投稿分描画 -->
		{#each $postsQuery.data as post}
			<li>
				<h2>{@html post.title.rendered}</h2>
				<div>{@html post.content.rendered}</div>
			</li>
		{/each}
	</ul>
  {/if}
</div>

<style scoped lang="scss">
  .example-component {
    padding: 20px;
    background-color: #f0f0f0;
    border-radius: 8px;

    p {
      font-size: 1.2em;
      color: #333;
    }
  }
</style>

<script lang="ts">
  import { createFetcherStore } from '@/stores/nanostore';
  import { timestampToYYYYMMDD } from '@/utils/date';
  import type { GetResponse } from '../blogs.json';

  const blogsQueryEndpoint = '/blogs.json';
  const blogsQuery = createFetcherStore<GetResponse>(blogsQueryEndpoint, {
    fetcher: () => fetch(blogsQueryEndpoint).then((res) => res.json()),
  });
</script>

<div class="table-container">
  {#if $blogsQuery.loading}
    <div class="loading">Loading...</div>
  {:else if $blogsQuery.error}
    <div class="error">予期せぬエラーで記事が取得できませんでした。</div>
  {:else if $blogsQuery.data}
    <table class="table">
      <tbody class="tbody">
        {#each $blogsQuery.data as blog}
          <tr class="tr">
            <td class="event-at td">
              <span class="event-at-label app-mono">
                {timestampToYYYYMMDD(blog.createdAt)}
              </span>
            </td>

            <td class="category td">
              <div class="category-positioner">
                <span class="category-label">
                  {blog.category.name}
                </span>
              </div>
            </td>

            <th class="title td">
              {blog.title}
            </th>

            <td class="arrow td">
              <div class="arrow-positioner">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path
                    fill="#222"
                    fill-rule="evenodd"
                    d="M12 24a12 12 0 1 1 12-12 12 12 0 0 1-12 12Zm-.53-15.969a.751.751 0 1 1 1.062-1.062l4.5 4.5a.75.75 0 0 1 0 1.062l-4.5 4.5a.751.751 0 1 1-1.062-1.062l3.22-3.22H7.502a.75.75 0 1 1 0-1.5h7.186z"
                  />
                </svg>
              </div>
            </td>

            <td class="anchor">
              <a
                class="link"
                href={`/blogs/${blog.id}`}
                aria-label={`${blog.title}の詳細ページへ`}
              >
                {blog.title}
              </a>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  {/if}
</div>

<style scoped lang="scss">
  $tr-height-mp: 114px;
  $tr-height-pc: 88px;

  .table-container {
    height: $tr-height-mp * 4;
    margin-bottom: 40px;

    @include pc {
      height: $tr-height-pc * 4;
    }
  }

  .loading,
  .error {
    margin-top: 24px;
    font-size: 18px;
    text-align: center;
  }

  .table {
    width: 100%;
    text-align: left;
    border-collapse: collapse;
  }
  .table,
  .tbody {
    display: block;
  }

  $border: 2px solid $black;
  .tr {
    position: relative;
    box-sizing: border-box;
    display: grid;
    grid-template-areas:
      'event-at category arrow'
      'title title arrow';
    grid-template-rows: auto auto;
    grid-template-columns: auto 1fr auto;
    gap: 0 16px;
    align-items: center;
    height: $tr-height-mp;
    padding: 8px 16px;
    border-bottom: $border;

    @include pc {
      height: $tr-height-pc;
    }
  }

  .event-at {
    grid-area: event-at;
    font-size: 14px;
  }
  .event-at-label {
    vertical-align: text-top;
  }

  .category {
    box-sizing: border-box;
    display: flex;
    grid-area: category;
    margin-right: auto;
    white-space: nowrap;
  }
  .category-positioner {
    display: flex;
    align-items: center;
    justify-content: stretch;
  }
  .category-label {
    width: 100%;
    padding: 2px 16px 4px;
    font-size: 12px;
    font-weight: bold;
    line-height: 1;
    color: $primary;
    vertical-align: text-bottom;
    border: $primary 2px solid;
    border-radius: 32px;
  }

  .title {
    grid-area: title;
    overflow: hidden;
    font-size: 16px;
    font-weight: bold;
    text-overflow: ellipsis;
    white-space: nowrap;

    @include pc {
      max-width: 0;
    }
  }

  .arrow {
    $size: 24px;

    grid-area: arrow;
    width: $size;
    min-width: $size;
    height: $size;
    min-height: $size;
    margin-left: $size;
  }
  .arrow-positioner {
    display: flex;
  }

  .anchor {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    color: transparent;
    &:hover {
      background-color: rgba($shadow, 0.04);
    }
    &:active {
      background-color: rgba($shadow, 0.08);
    }
  }
  .link {
    display: block;
    height: 100%;
  }

  @include pc {
    .table {
      display: table;
      width: 100%;
    }

    .tbody {
      display: table-row-group;
    }

    .tr {
      display: table-row;
      border-top: $border;
    }

    .td {
      display: table-cell;
      padding: 0 16px;
      vertical-align: middle;
    }

    .event-at,
    .category {
      margin-right: 0;
      text-align: center;
      white-space: nowrap;
    }

    .title {
      width: 100%;
    }
  }
</style>

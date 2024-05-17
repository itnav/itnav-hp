<script lang="ts">
  import { onMount } from 'svelte';

  export let number: string | number;
  export let thumbnail: string;
  export let title: string;
  export let description: string;

  let additionalClass = '';

  onMount(() => {
    additionalClass = 'visible';
  });
</script>

<div class={`project ${additionalClass}`}>
  <span class="count app-mono">
    {number}
  </span>

  <div class="thumbnail-flame app-img-slide">
    <img class="thumbnail" src={thumbnail} alt={title} />
  </div>

  <div class="content">
    <h4 class="title">{title}</h4>
    <p class="description">{description}</p>
  </div>
</div>

<style scoped lang="scss">
  .project {
    display: grid;
    grid-template-rows: auto 2fr 1fr;
    margin-bottom: 24px;
    opacity: 0;
    transition: transition((opacity, transform), long4, ease-in-out);
    transform: translateY(20px);

    &:global(.visible) {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .count {
    font-size: 56px;
    font-weight: bold;
  }

  .thumbnail-flame {
    position: relative;
    aspect-ratio: 3/3;
    margin-bottom: 16px;
  }
  .thumbnail {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .title {
    margin-bottom: 12px;
    font-size: 22px;
    letter-spacing: 2.4px;
  }

  @include pc {
    .thumbnail-flame {
      aspect-ratio: 3 / 3.5;
      margin-bottom: 24px;
    }

    .title {
      margin-bottom: 24px;
      font-size: 22px;
      font-weight: bold;
    }
  }
</style>

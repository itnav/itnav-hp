<script lang="ts">
  import { onMount } from 'svelte';

  export let png: string;
  export let webp: string;
  export let alt: string;
  export let orientation: 'left' | 'right' = 'left';

  let additionalClass = '';

  onMount(() => {
    additionalClass = 'visible';
  });
</script>

<div class={`frame ${additionalClass} ${orientation}`}>
  <picture>
    <source type="image/webp" srcset={webp} />
    <img class="img" src={png} {alt} />
  </picture>
</div>

<style scoped lang="scss">
  $box-height-half: 16%;
  $content-img-margin: 8%;

  .frame {
    width: 88%;
    padding-top: $box-height-half * 2;
    margin-top: -$box-height-half;
    margin-bottom: 32px;
    opacity: 0;
    transition-timing-function: ease-in-out;
    transition-duration: 600ms;
    transition-property: opacity, transform;
    transform: translateY(20px);

    @include pc {
      position: absolute;
      top: 0;
      width: 48%;
      height: 100%;
      padding: 0;
      margin: 0;
      margin-top: $content-img-margin;
    }
  }

  :global(.visible).frame {
    opacity: 1;
    transform: translateY(0);
  }

  :global(.right).frame {
    right: 0;
    margin-left: auto;
  }

  .img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
</style>

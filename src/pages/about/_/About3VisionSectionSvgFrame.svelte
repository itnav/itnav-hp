<script lang="ts">
  import { onMount } from 'svelte';

  let additionalClass = '';

  onMount(() => {
    additionalClass = 'visible';
  });
</script>

<div class={`svg ${additionalClass}`}>
  <slot />
</div>

<style scoped lang="scss">
  .svg {
    display: block;
    width: 100%;
    max-width: 320px;

    @include pc {
      max-width: 100%;
      margin: 0;
    }
  }
</style>

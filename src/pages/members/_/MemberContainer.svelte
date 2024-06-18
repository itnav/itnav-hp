<script lang="ts">
  import { onMount } from 'svelte';

  let isVisible = false;

  onMount(() => {
    isVisible = true;
  });
</script>

<div class={`member ${isVisible ? 'visible' : ''}`}>
  {#if isVisible}
    <slot />
  {/if}
</div>

<style scoped lang="scss">
  .member {
    aspect-ratio: 1;
    opacity: 0;
    transition: transition(opacity, long1, ease-in-out, short2);
  }

  .visible {
    opacity: 1;
  }
</style>

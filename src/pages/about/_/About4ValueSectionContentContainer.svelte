<script lang="ts">
  import { onMount } from 'svelte';

  let additionalClass = '';

  onMount(() => {
    additionalClass = 'visible';
  });
</script>

<div class={`container ${additionalClass}`}>
  <slot />
</div>

<style scoped lang="scss">
  .container {
    border-top: 3px solid $black;
    border-bottom: 3px solid $black;
  }
</style>

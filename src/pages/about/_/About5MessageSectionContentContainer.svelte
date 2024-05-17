<script lang="ts">
  import { onMount } from 'svelte';

  let additionalClass = '';

  onMount(() => {
    additionalClass = 'visible';
  });
</script>

<div class={`app-page-padding-x app-limit-design-width ${additionalClass}`}>
  <slot />
</div>

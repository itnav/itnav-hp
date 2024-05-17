<script lang="ts">
  import { onMount } from 'svelte';

  let additionalClass = '';

  onMount(() => {
    additionalClass = 'visible';
  });
</script>

<h2 class={`app-h2 app-wave-across-animation-on-visible ${additionalClass}`}>
  Our Mission
</h2>

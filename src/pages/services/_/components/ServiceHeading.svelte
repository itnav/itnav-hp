<script lang="ts">
  import { onMount } from 'svelte';

  export let id: string;
  export let h2Title: string;
  export let h3Title: string;

  let additionalClass = '';

  onMount(() => {
    additionalClass = 'visible';
  });
</script>

<h2
  {id}
  class={`service-h2 app-wave-across-animation-on-visible ${additionalClass}`}
>
  {h2Title}
</h2>

<br />

<h3
  class={`service-h3 app-wave-across-animation-on-visible ${additionalClass}`}
>
  {h3Title}
</h3>

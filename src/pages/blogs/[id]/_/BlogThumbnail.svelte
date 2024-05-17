<script lang="ts">
  import type { SvelteHTMLElements } from 'svelte/elements';
  type $$Props = SvelteHTMLElements['img'] & {
    id: string;
  };
</script>

<!-- svelte-ignore a11y-missing-attribute -->
<img
  {...$$props}
  style={`view-transition-name: blog-thumbnail-${$$props.id};${$$props.style || ''}`}
/>

<script lang="ts">
  import { onMount } from 'svelte';

  let additionalClass = '';

  onMount(() => {
    additionalClass = 'visible';
  });
</script>

<h1 class={`h1 app-page-padding-x app-limit-design-width ${additionalClass}`}>
  <span class="app-sub-h1 h1-1">A</span>
  <span class="app-sub-h1 h1-2">B</span>
  <span class="app-sub-h1 h1-3">O</span>
  <span class="app-sub-h1 h1-4">U</span>
  <span class="app-sub-h1 h1-5">T</span>

  <br />

  <div>
    <span class="app-h1 h1-1">I</span>
    <span class="app-h1 h1-2">T</span>
    <span class="app-h1 h1-3">N</span>
    <span class="app-h1 h1-4">A</span>
    <span class="app-h1 h1-5">V</span>
  </div>
</h1>

<style scoped lang="scss">
  .h1 {
    margin-bottom: 48px;
    overflow: hidden;

    @include pc {
      margin-bottom: 104px;
    }
  }

  .app-sub-h1,
  .app-h1 {
    display: inline-block;
    opacity: 0;
    transform: translateY(100%);
    transform-origin: bottom;
    animation: transition(none, long5, ease-out);
    animation-fill-mode: both;

    :global(.visible) & {
      animation-name: fade-up;
    }
  }

  @for $i from 1 through 5 {
    .h1-#{$i} {
      animation-delay: 80ms * $i;
    }
  }
</style>

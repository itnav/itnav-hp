<script lang="ts">
  import { onMount } from 'svelte';

  let additionalClass = '';

  onMount(() => {
    additionalClass = 'visible';
  });
</script>

<h1 class={`h1 ${additionalClass}`}>
  <span class="app-h1 h1-1">N</span>
  <span class="app-h1 h1-2">E</span>
  <span class="app-h1 h1-3">W</span>
  <span class="app-h1 h1-4">S</span>
  <span class="app-sub-h1 h1-5">&</span>
  <br />
  <span class="app-h1 h1-1">R</span>
  <span class="app-h1 h1-2">E</span>
  <span class="app-h1 h1-3">P</span>
  <span class="app-h1 h1-4">O</span>
  <span class="app-h1 h1-5">R</span>
  <span class="app-h1 h1-6">T</span>
</h1>

<style scoped lang="scss">
  .h1 {
    margin-bottom: 48px;

    @include pc {
      margin-bottom: 56px;
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

  @for $i from 1 through 6 {
    .h1-#{$i} {
      animation-delay: 80ms * $i;
    }
  }
</style>

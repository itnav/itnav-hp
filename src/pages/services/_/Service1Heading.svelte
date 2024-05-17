<script lang="ts">
  import { onMount } from 'svelte';

  let additionalClass = '';

  onMount(() => {
    additionalClass = 'visible';
  });
</script>

<h1 class={`h1 ${additionalClass}`}>
  <span class="app-sub-h1 h1-1">I</span>
  <span class="app-sub-h1 h1-2">T</span>
  <span class="app-sub-h1 h1-3">N</span>
  <span class="app-sub-h1 h1-4">A</span>
  <span class="app-sub-h1 h1-5">V</span>
  <span class="app-sub-h1 h1-6">'</span>
  <span class="app-sub-h1 h1-7">s</span>

  <br />

  <span class="app-h1 h1-1">S</span>
  <span class="app-h1 h1-2">E</span>
  <span class="app-h1 h1-3">R</span>
  <span class="app-h1 h1-4">V</span>
  <span class="app-h1 h1-5">I</span>
  <span class="app-h1 h1-6">C</span>
  <span class="app-h1 h1-7">E</span>
</h1>

<style scoped lang="scss">
  .h1 {
    box-sizing: border-box;
    margin-bottom: 16px;

    @include pc {
      position: relative;
      padding-bottom: 16px;
      margin-bottom: 64px;

      &::after {
        position: absolute;
        bottom: -24px;
        left: 0;
        width: 100%;
        height: 20px;
        content: '';
        background: $black;
        animation: transition(under-line-animation, extra-long5, ease-in-out);
        animation-fill-mode: both;
      }
    }

    @keyframes under-line-animation {
      0% {
        transform: scaleX(0);
        transform-origin: left;
      }
      100% {
        transform: scaleX(1);
        transform-origin: left;
      }
    }
  }

  .app-sub-h1,
  .app-h1 {
    display: inline-block;
    opacity: 0;
    transform: translateY(100%);
    transform-origin: bottom;
    animation: transition(none, long2, ease-out);
    animation-fill-mode: both;

    :global(.visible) & {
      animation-name: fade-up;
    }
  }

  @for $i from 1 through 7 {
    .h1-#{$i} {
      animation-delay: 80ms * $i;
    }
  }
</style>

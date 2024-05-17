<script lang="ts">
  import { onMount } from 'svelte';

  let additionalClass = '';

  onMount(() => {
    additionalClass = 'visible';
  });
</script>

<h2 class={`heading app-page-inner-padding-x ${additionalClass}`}>
  <strong class="heading-strong app-wave-across-animation-on-visible">
    出会い・
    <wbr />
    学び・
    <wbr />
    表現
  </strong>
  <br />
  <span class="app-wave-across-animation-on-visible">を回し続ける</span>
  <br />
  <span class="app-wave-across-animation-on-visible">未来を作る３要素</span>
</h2>

<style scoped lang="scss">
  .heading {
    height: fit-content;
    font-size: 24px;
    font-weight: 500;

    @include pc {
      grid-area: h;
      font-size: 32px;
    }
  }

  .heading-strong {
    font-size: 30px;
    font-weight: bold;
    word-break: keep-all;
    white-space: nowrap;

    @include pc {
      font-size: 54px;
    }
  }
</style>

<script lang="ts">
  import { onMount } from 'svelte';

  let additionalClass = '';

  onMount(() => {
    additionalClass = 'visible';
  });
</script>

<h3 class={`heading ${additionalClass}`}>
  <span class="app-wave-across-animation-on-visible">
    <strong class="it app-en">IT</strong>
    <span class="it-sub">で生きる、</span>
  </span>
  <br />
  <span class="app-wave-across-animation-on-visible">
    はじまりの場をつくる。
  </span>
</h3>

<style scoped lang="scss">
  .heading {
    margin-bottom: 48px;
    font-size: 28px;
    font-weight: 500;
    line-height: 1.2;
    letter-spacing: 2px;

    @include pc {
      font-size: 60px;
    }
  }

  .it {
    font-size: 64px;
    font-weight: bold;

    @include pc {
      font-size: 140px;
    }
  }

  .it-sub {
    margin-left: -8px;
  }
</style>

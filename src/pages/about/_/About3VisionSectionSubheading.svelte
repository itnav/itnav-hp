<script lang="ts">
  import { onMount } from 'svelte';

  let additionalClass = '';

  onMount(() => {
    additionalClass = 'visible';
  });
</script>

<h3 class={`subheading ${additionalClass}`}>
  <span class="text">
    若者達がプログラミングと
    <wbr />
    出会うきっかけを作り、
  </span>

  <br />

  <span class="text">未来への準備を提供し、</span>

  <br />

  <span class="text">飛び立てる発射台を全世界に作る。</span>
</h3>

<style scoped lang="scss">
  .subheading {
    margin-bottom: 32px;
    font-size: 16px;
    font-weight: bold;
    line-height: 1.8;
    word-break: keep-all;
    white-space: nowrap;

    @include pc {
      margin-bottom: 48px;
      font-size: 40px;
    }
  }

  .text {
    position: relative;
    z-index: 1;
    display: inline-block;
    padding: 0 4px;
    overflow: hidden;
    color: $inverse-on-surface;
    color: $white;
    vertical-align: middle;

    &::before {
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
      width: 100%;
      height: 100%;
      content: '';
      background-color: #222;
      animation: transition(wave-across, extra-long5, emphasized) both;
    }
  }

  @keyframes wave-across {
    0% {
      transform: scaleX(0);
      transform-origin: left;
    }
    100% {
      transform: scaleX(1);
      transform-origin: left;
    }
  }
</style>

<script lang="ts">
  import { toggleUrlFragment } from '@/utils/navigation';
  import { isOpenLayoutDialog } from '../drawer/state';

  /**
   * メニューを開閉する
   *
   * NOTE: 今回の用途であれば、本来なら fragment ではなく search query を使うべきだが、計算コスト高いので fragment
   * を使っている
   */
  function toggle() {
    toggleUrlFragment('drawer');
  }
</script>

<button
  type="button"
  aria-label="メニューを開閉する"
  class="trigger{$isOpenLayoutDialog ? ' open' : ''}"
  on:click={toggle}
>
  <div class="line line-1"></div>
  <div class="line line-2"></div>
  <div class="line line-3"></div>
  <div class="line line-4"></div>
  <div class="line line-5"></div>
</button>

<style scoped lang="scss">
  .trigger {
    position: relative;
    display: block;
    width: 40px;
    height: 40px;
    pointer-events: auto;
  }

  .line {
    position: absolute;
    right: 0;
    left: 0;
    width: 24px;
    height: 2px;
    margin-right: auto;
    margin-left: auto;
    background-color: $inverse-surface;
    transition-timing-function: transition-easing(legacy);
    transition-duration: transition-duration(short3);
    transition-property: transform, opacity, background-color;

    .trigger:hover & {
      background-color: $primary;
    }
  }

  .line-1,
  .line-2 {
    transform: translateY(7.2px);
  }
  .line-4,
  .line-5 {
    transform: translateY(-7.2px);
  }

  .open {
    .line-1,
    .line-5 {
      transform: rotate(45deg);
    }
    .line-2,
    .line-4 {
      transform: rotate(-45deg);
    }
    .line-3 {
      opacity: 0;
    }
  }
</style>

<script lang="ts">
  import { onDestroy } from 'svelte';
  import { isOpenLayoutDialog } from '../drawer/state';

  let isOpen = isOpenLayoutDialog.get();

  const unsubscribeIsOpenLayoutDialog = isOpenLayoutDialog.subscribe(
    (isOpenLayoutDialog) => {
      if (isOpenLayoutDialog === true) {
        isOpen = true;
      }
    },
  );

  onDestroy(unsubscribeIsOpenLayoutDialog);

  function close() {
    if (isOpenLayoutDialog.get() === false) {
      isOpen = false;
    }
  }
</script>

{#if isOpen}
  <div
    class={`drawer ${$isOpenLayoutDialog ? 'open' : ''}`}
    on:transitionend={close}
  >
    <slot />
  </div>
{/if}

<style scoped lang="scss">
  .drawer {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 16;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: auto;
    min-height: 100%;
    max-height: 100%;
    padding: 96px $page-padding-mp-x 56px;
    overflow-y: auto;
    font-family: $font-family-mono;
    color: $inverse-on-surface;
    pointer-events: none;
    background-color: $inverse-surface;
    opacity: 0;
    transition: transition(opacity, short3, emphasized);
    @include disable-scrollbar;

    @include pc {
      padding: 104px $page-padding-pc-right 64px $page-padding-pc-left;
    }

    &.open {
      pointer-events: auto;
      opacity: 1;
    }
  }
</style>

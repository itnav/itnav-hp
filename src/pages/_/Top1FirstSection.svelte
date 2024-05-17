<script lang="ts">
  let sectionElement: Element;

  let centerLineElement: Element;

  let bottomLineElement: Element;

  function onTransitionEnd(
    animationTarget: Element,
    intoViewTarget: Element = animationTarget,
  ) {
    animationTarget.classList.add('animate');

    if (document.documentElement.scrollTop === 0) {
      intoViewTarget.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      });
    }
  }
</script>

<section class="section" bind:this={sectionElement}>
  <h1 class="heading">
    <span class="line animate">
      <strong class="char char-1 strong strong-1">誰</strong>
      <span class="char char-2">だ</span>
      <span class="char char-3">っ</span>
      <span class="char char-4">て</span>
      <span
        class="char char-5"
        on:animationend={() => onTransitionEnd(centerLineElement)}
      >
        、
      </span>
    </span>
    <span class="line" bind:this={centerLineElement}>
      <strong class="strong strong-2">
        <span class="char char-6">ど</span>
        <span class="char char-7">こ</span>
      </strong>
      <span class="char char-8">に</span>
      <span class="char char-9">い</span>
      <span class="char char-10">た</span>
      <span class="char char-11">っ</span>
      <span class="char char-12">て</span>
      <span
        class="char char-13"
        on:animationend={() =>
          onTransitionEnd(bottomLineElement, sectionElement)}
      >
        、
      </span>
    </span>
    <span class="line" bind:this={bottomLineElement}>
      <strong class="strong strong-3">
        <span class="char char-14">世</span>
        <span class="char char-15">界</span>
      </strong>
      <span class="multiline">
        <strong class="char char-16 strong strong-3">一</strong>
        <span class="line-bottom">
          <span class="char char-17">に</span>
          <span class="char char-18">な</span>
          <span class="char char-19">れ</span>
          <span class="char char-20">る</span>
          <span class="char char-21">ん</span>
          <span class="char char-22">だ</span>
        </span>
      </span>
    </span>
  </h1>

  <div class="statement">
    <span class="statement-text">Statement</span>
    <span class="statement-line"></span>
  </div>
</section>

<style scoped lang="scss">
  .section {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    min-height: 100dvh;
    max-height: 100%;
    padding: 88px $page-outer-padding-mp-x 32px;
    margin-bottom: 64px;

    @include pc {
      position: relative;
      display: inline-flex;
      align-items: normal;
      justify-content: left;
      width: 100%;
      padding: 88px 64px 50px;
      margin: 0 auto 110px;
    }
  }

  .heading {
    display: inline-flex;
    flex-direction: column;
    flex-grow: 1;
    justify-content: space-evenly;
    font-size: rpx(min(64px, 32rpx), mp, vh);
    line-height: 1.2;
    letter-spacing: -0.8vh;
    white-space: nowrap;
    writing-mode: vertical-rl;

    @include pc {
      justify-content: space-evenly;
      font-size: rpx(66px, pc);
      font-weight: 900;
      letter-spacing: max(-8px, -0.8vw);
      writing-mode: horizontal-tb;
    }
  }

  .multiline {
    @include pc {
      display: inline-flex;
      flex-direction: column;
    }
  }

  .line-bottom {
    @include pc {
      margin-top: -1.2em; // 親の line-height と合わせる
      line-height: 1.2;
    }
  }

  .char {
    opacity: 0;

    @include pc {
      border-right: 2px solid black;
    }
  }

  :global(.animate) .char {
    font-weight: 900;
    transition-duration: 100ms;

    @keyframes char {
      0% {
        border-color: black;
        opacity: 0;
      }
      98% {
        border-color: black;
        opacity: 1;
      }
      100% {
        border-color: transparent;
        opacity: 1;
      }
    }
    animation-name: char;
    animation-duration: 100ms;
    animation-fill-mode: forwards;

    /* stylelint-disable scss/selector-no-union-class-name */
    &-1 {
      animation-delay: 600ms;
    }
    &-2 {
      animation-delay: 700ms;
    }
    &-3 {
      animation-delay: 800ms;
    }
    &-4 {
      animation-delay: 900ms;
    }
    &-5 {
      animation-duration: 300ms;
      animation-delay: 1000ms;
    }

    // 改行
    &-6 {
      animation-delay: 0;
    }
    &-7 {
      animation-delay: 100ms;
    }
    &-8 {
      animation-delay: 200ms;
    }
    &-9 {
      animation-delay: 300ms;
    }
    &-10 {
      animation-delay: 400ms;
    }
    &-11 {
      animation-delay: 500ms;
    }
    &-12 {
      animation-delay: 600ms;
    }
    &-13 {
      animation-duration: 300ms;
      animation-delay: 700ms;
    }

    // 改行
    &-14 {
      animation-delay: 0;
    }
    &-15 {
      animation-duration: 300ms;
      animation-delay: 100ms;
    }
    &-16 {
      animation-duration: 300ms;
      animation-delay: 200ms;
    }

    // 改行
    &-17 {
      animation-duration: 300ms;
      animation-delay: 300ms;
    }
    &-18 {
      animation-delay: 400ms;
    }
    &-19 {
      animation-delay: 500ms;
    }
    &-20 {
      animation-delay: 600ms;
    }
    &-21 {
      animation-delay: 800ms;
    }
    &-22 {
      animation-delay: 900ms;
    }
    /* stylelint-enable scss/selector-no-union-class-name */
  }

  .strong {
    font-size: rpx(min(114px, 48rpx), mp, vh);
    font-weight: bold;

    @include pc {
      margin: 0;
      font-size: rpx(180px, pc);
    }
  }
  .strong-1,
  .strong-2 {
    box-sizing: border-box;
    @include pc {
      padding-top: 8px;
    }
  }
  .strong-1 {
    @include pc {
      margin-right: 8px;
    }
  }
  .strong-2 {
    margin-bottom: 8px;
    letter-spacing: -1.2vh;

    @include pc {
      margin-right: 4px;
      letter-spacing: -2vw;
    }
  }
  .strong-3 {
    @include pc {
      margin-right: 2.4vw;
      font-size: rpx(320px, pc);
      letter-spacing: -2.4vw;
    }
  }

  .statement {
    display: none;

    @include pc {
      position: absolute;
      top: 0;
      right: 0;
      z-index: -1;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      align-items: center;
      height: 100%;
      padding: 88px 104px 0;
    }
  }

  .statement-text {
    @include pc {
      display: inline;
      font-size: 34px;
      font-weight: bold;
      color: $primary;
      text-align: center;
      opacity: 0;
      writing-mode: vertical-rl;
      transform: translateY(-88px);
      animation: transition(statement-text, extra-long5, standard-decelerate);
      animation-fill-mode: both;

      @keyframes statement-text {
        0% {
          opacity: 0;
          transform: translateY(-88px);
        }
        100% {
          opacity: 1;
          transform: translateY(0);
        }
      }
    }
  }

  .statement-line {
    @include pc {
      position: relative;
      right: 3px;
      display: block;
      width: 2px;
      height: 100%;
      background-color: $primary;
      opacity: 0;
      transform-origin: top;
      animation: statement-line 2640ms transition-duration(long5)
        transition-easing(standard-accelerate);
      animation-fill-mode: both;

      @keyframes statement-line {
        0% {
          opacity: 1;
          transform: scaleY(0);
        }
        100% {
          opacity: 1;
          transform: scaleY(1);
        }
      }
    }
  }
</style>

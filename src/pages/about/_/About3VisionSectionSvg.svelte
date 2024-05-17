<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 402.733 613.708">
  <g>
    <path
      class="animation animation-1"
      fill="#191a1a"
      d="m111.144 231.269-49.271 126.3 139.493 67.57 139.494-67.572-49.274-126.298-90.223 43.7Z"
    />
    <path
      class="animation animation-2"
      fill="#191a1a"
      d="m201.365-.001-85.664 219.586 85.665 41.5 85.665-41.5Z"
    />
    <path
      class="animation animation-3"
      fill="#191a1a"
      d="M201.366 439.034 57.315 369.251 0 516.164l201.366 97.543 201.367-97.543-57.315-146.913Z"
    />
    <path
      class="animation"
      fill="#131414"
      d="m201.366 274.974-90.223-43.7-49.271 126.3 139.494 67.565Z"
    />
    <path
      class="animation"
      fill="#131414"
      d="m201.365-.001-85.664 219.586 85.665 41.5Z"
    />
    <path
      class="animation"
      fill="#131414"
      d="m0 516.164 201.366 97.543V439.034L57.315 369.251Z"
    />
  </g>
  <text
    fill="#fdfdfd"
    font-size="27"
    font-weight="600"
    letter-spacing=".1em"
    transform="translate(158.362 207.367)"
  >
    <tspan x="0" y="0">活躍層</tspan>
  </text>
  <text
    fill="#fdfdfd"
    font-size="27"
    font-weight="600"
    letter-spacing=".1em"
    transform="translate(158.362 348.018)"
  >
    <tspan x="0" y="0">探求層</tspan>
  </text>
  <text
    fill="#fdfdfd"
    font-size="26"
    font-weight="600"
    letter-spacing=".1em"
    transform="translate(131.362 514.925)"
  >
    <tspan x="0" y="0">きっかけ層</tspan>
  </text>
</svg>

<style scoped lang="scss">
  .animation {
    opacity: 0;
  }

  :global(.visible) {
    .animation-1 {
      animation: fade-in 540ms ease 480ms normal forwards;
    }
    .animation-2 {
      animation: fade-in 620ms ease 700ms normal forwards;
    }
    .animation-3 {
      animation: fade-in 460ms 240ms ease normal forwards;
    }
  }

  @keyframes fade-in {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>

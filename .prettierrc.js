/** @type {import('prettier').Config} */
export default {
  plugins: [
    /** @see {@link https://www.npmjs.com/package/prettier-plugin-jsdoc} */
    'prettier-plugin-jsdoc',

    /** @see {@link https://www.npmjs.com/package/prettier-plugin-astro} */
    'prettier-plugin-astro',

    /** @see {@link https://www.npmjs.com/package/prettier-plugin-svelte} */
    'prettier-plugin-svelte',
  ],

  /** @see {@link https://prettier.io/docs/en/options} */
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  singleQuote: true,
  trailingComma: 'all',
  htmlWhitespaceSensitivity: 'ignore',

  /** @see {@link https://github.com/hosseinmd/prettier-plugin-jsdoc#options} */
  tsdoc: true,
  jsdocVerticalAlignment: true,
  jsdocCapitalizeDescription: false,
  jsdocPreferCodeFences: true,
  jsdocKeepUnParseAbleExampleIndent: true,

  /** @see {@link https://github.com/withastro/prettier-plugin-astro#configuration} */
  astroAllowShorthand: false,

  /** @see {@link https://prettier.io/docs/en/configuration.html#configuration-overrides} */
  overrides: [
    { files: ['**/*.svg'], options: { parser: 'html' } },
    { files: ['**/*.astro'], options: { parser: 'astro' } },
    { files: ['**/*.svelte'], options: { parser: 'svelte' } },
  ],
};

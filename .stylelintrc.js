/** @type {import('stylelint').Config} */
export default {
  defaultSeverity: 'warning',

  extends: [
    /**
     * @see {@link https://www.npmjs.com/package/stylelint-config-recommended} npm
     * @see {@link https://github.com/stylelint-scss/stylelint-config-recommended-scss/blob/master/index.js} Configs
     */
    'stylelint-config-recommended-scss',

    /**
     * @see {@link https://www.npmjs.com/package/stylelint-config-recess-order} npm
     * @see {@link https://github.com/stormwarning/stylelint-config-recess-order/blob/main/index.js} Configs
     */
    'stylelint-config-recess-order',
  ],

  plugins: [
    /** @see {@link https://www.npmjs.com/package/stylelint-declaration-block-no-ignored-properties} npm */
    'stylelint-declaration-block-no-ignored-properties',
  ],

  rules: {
    /** @see {@link https://stylelint.io/user-guide/rules/unit-no-unknown} */
    'unit-no-unknown': [true, { ignoreUnits: ['rpx'] }],

    /** @see {@link https://stylelint.io/user-guide/rules/value-keyword-case} Documents */
    'value-keyword-case': ['lower', { camelCaseSvgKeywords: true }],

    /** @see {@link https://stylelint.io/user-guide/rules/selector-pseudo-class-no-unknown} Documents */
    'selector-pseudo-class-no-unknown': [
      true,
      { ignorePseudoClasses: ['global'] },
    ],

    /** @see {@link https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/selector-no-union-class-name/README.md} Documents */
    'scss/selector-no-union-class-name': true,

    /** @see {@link https://github.com/kristerkari/stylelint-declaration-block-no-ignored-properties#usage} Documents */
    'plugin/declaration-block-no-ignored-properties': true,
  },

  overrides: [
    /** @see {@link https://github.com/ota-meshi/stylelint-config-html/blob/main/README.md} Reference */
    {
      files: ['svg', 'html', 'astro', 'svelte'].flatMap((ext) => [
        `*.${ext}`,
        `**/*.${ext}`,
      ]),
      customSyntax: 'postcss-html',
    },
  ],
};

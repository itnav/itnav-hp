import { vitePreprocess } from '@astrojs/svelte';
import viteConfig from './vite.config.js';

/**
 * @type {import('@sveltejs/vite-plugin-svelte').Options}
 * @see {@link https://kit.svelte.jp/docs/configuration} Documents
 */
export default {
  onwarn: (warning, handler) => {
    /** @type {Record<string, true>} */
    const ignoreWarningCode = {
      'vite-plugin-svelte-preprocess-many-dependencies': true,
    };

    if (ignoreWarningCode[warning.code || '']) return;

    handler?.(warning);
  },

  /** @see {@link https://github.com/sveltejs/vite-plugin-svelte/blob/main/docs/preprocess.md} Documents */
  preprocess: vitePreprocess({
    style: {
      css: viteConfig.css,
    },
  }),
};

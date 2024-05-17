import node from '@astrojs/node';
import sitemap from '@astrojs/sitemap';
import svelte from '@astrojs/svelte';
import compress from '@playform/compress';
import cssInline from '@playform/inline';
import compressor from 'astro-compressor';
import pageInsight from 'astro-page-insight';
import robotsTxt from 'astro-robots-txt';
import { defineConfig } from 'astro/config';
import viteConfig from './vite.config';

/** @see {@link https://astro.build/config} Documents */
export default defineConfig({
  site: import.meta.env.WEB_URL,

  output: 'hybrid',

  adapter: node({
    mode: 'standalone',
  }),

  server: {
    port: Number(import.meta.env.WEB_PORT) || void 0,
  },

  integrations: [
    /**
     * Astro 内で Svelte を使用するためのインテグレーション
     *
     * @see {@link https://docs.astro.build/en/guides/integrations-guide/svelte/} Documents
     * @see {@link https://www.npmjs.com/package/@astrojs/svelte} npm
     */
    svelte(),

    /**
     * Astro の開発環境でページのパフォーマンスを計測するためのインテグレーション
     *
     * @see {@link https://astro-page-insight.pages.dev} Documents
     * @see {@link https://www.npmjs.com/package/astro-page-insight} npm
     */
    pageInsight(),

    /**
     * ビルド時にサイトマップを生成するためのインテグレーション
     *
     * @see {@link https://docs.astro.build/en/guides/integrations-guide/sitemap} Documents
     * @see {@link https://www.npmjs.com/package/@astrojs/sitemap} npm
     */
    sitemap(),

    /**
     * ビルド時に robots.txt を生成するためのインテグレーション
     *
     * @see {@link https://github.com/alextim/astro-lib/tree/main/packages/astro-robots-txt#readme} Documents
     * @see {@link https://www.npmjs.com/package/astro-robots-txt} npm
     */
    robotsTxt(),

    /**
     * Astro のビルド時に HTML に CSS をインラインで埋め込むためのインテグレーション
     *
     * @see {@link https://github.com/Playform/Inline#ReadMe} Documents
     * @see {@link https://www.npmjs.com/package/@playform/inline} npm
     */
    cssInline({
      Critters: {
        pruneSource: true,
        inlineFonts: false,
      },
      Logger: 1,
    }),

    /**
     * Astro のビルド時にさまざまなファイルを圧縮するためのインテグレーション
     *
     * @see {@link https://github.com/Playform/Compress#ReadMe} Documents
     * @see {@link https://www.npmjs.com/package/@playform/compress} npm
     * @see {@link https://github.com/Playform/Compress/blob/rebase/Source/Interface/Option.ts} Full Options type
     */ // @ts-ignore
    compress({
      CSS: true,
      SVG: true,
      HTML: true,
      Image: false,
      JavaScript: false,
      Logger: 1,
    }),

    /**
     * Astro のビルド時に HTML を圧縮ファイルに変換するためのインテグレーション
     *
     * @see {@link https://github.com/sondr3/astro-compressor#readme} Documents
     * @see {@link https://www.npmjs.com/package/astro-compressor} npm
     */
    compressor({
      gzip: false,
    }),
  ],

  vite: viteConfig,
});

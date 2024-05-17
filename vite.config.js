/**
 * @type {import('astro').ViteUserConfig}
 * @see {@link https://vitejs.dev/config} Documents
 */
export default {
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        passes: 2,
      },
    },

    assetsInlineLimit: 0,
  },

  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `\n@use 'src/styles' as *;\n`,
      },
    },
  },

  envPrefix: ['WEB', 'ASTRO'],
};

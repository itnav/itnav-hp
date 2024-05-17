interface ImportMetaEnv {
  // Environment
  NODE_ENV: 'development' | 'production';

  // URL
  WEB_URL: string;

  // CMS
  WEB_CMS_DOMAIN: string;
  WEB_CMS_API_KEY: string;
}

interface ImportMeta {
  readonly env: Readonly<ImportMetaEnv>;
}

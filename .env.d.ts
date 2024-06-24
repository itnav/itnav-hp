interface ImportMetaEnv {
  // Environment
  NODE_ENV: 'development' | 'production';

  // URL
  WEB_URL: string;

  // CMS
  WEB_CMS_API_DOMAIN: string;
  WEB_CMS_API_KEY: string;
  WEB_CMS_MEMBERS_API_DOMAIN: string;
  WEB_CMS_MEMBERS_API_KEY: string;
}

interface ImportMeta {
  readonly env: Readonly<ImportMetaEnv>;
}

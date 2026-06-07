const env = {
  appName: import.meta.env.VITE_APP_NAME || 'Ordboble',
  defaultLocale: import.meta.env.VITE_DEFAULT_LOCALE || 'nb',
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || '',
  /** Dev-only: override cloud ID for local E2E testing. Leave empty in production. */
  cloudId: import.meta.env.VITE_CLOUD_ID || '',
} as const;

export default env;

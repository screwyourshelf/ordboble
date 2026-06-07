const env = {
  appName: import.meta.env.VITE_APP_NAME || 'Ordboble',
  defaultLocale: import.meta.env.VITE_DEFAULT_LOCALE || 'nb',
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || '',
} as const;

export default env;

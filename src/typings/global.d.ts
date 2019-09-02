import { AppConfig } from './AppConfig'

declare global {
  const PKG_NAME: string;
  const PKG_VERSION: string;

  interface Window {
    app: AppConfig;
    PKG: string;
  }
}


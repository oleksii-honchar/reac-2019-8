export interface App {
  name: string;
  package: any;
  config: any;
}

declare global {
  const PKG: string;

  interface Window {
    app: App;
    PKG: string;
  }
}


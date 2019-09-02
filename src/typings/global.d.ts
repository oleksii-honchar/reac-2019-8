declare const PKG: string;

export interface App {
  name: string;
  package: any;
  config: any;
}

declare global {
  interface Window {
    app: App;
    PKG: string;
  }
}


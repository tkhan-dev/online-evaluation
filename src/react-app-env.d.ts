// src/react-app-env.d.ts
/// <reference types="react-scripts" />

declare namespace NodeJS {
  interface ProcessEnv {
    readonly REACT_APP_API_URL: string;
    readonly REACT_APP_SWAGGER_URL: string;
    readonly REACT_APP_PRODUCTION: string;
  }
}
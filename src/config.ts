// src/config.ts
interface AppConfig {
  production: boolean;
  apiURL: string;
  swaggerURL: string;
}

const config: AppConfig = {
  production: process.env.REACT_APP_PRODUCTION === 'true',
  apiURL: 'http://localhost:5088',
  swaggerURL: process.env.REACT_APP_SWAGGER_URL || 'http://localhost:5088/'
};

export default config;
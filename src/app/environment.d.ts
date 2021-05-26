declare global {
  namespace NodeJS {
    interface ProcessEnv {
      APP_PORT: number,
      APP_NAME?: string,
      DB_DATABASE: string,
      DB_USERNAME: string,
      DB_PASSWORD: string,
      DB_PORT: number,
      DB_HOST: string,
      JWT_SALT_ROUNDS: number,
      JWT_SECRET: string,
      JWT_EXPIRATION: number,
      PASSWORD_RESET_EXPIRATION: number
    }
  }
}

export {};

export const env =
  process.env.nodeEnv === 'development'
    ? { host: 'localhost', port: 6379 }
    : {
        host: process.env.REDIS_HOST,
        port: +process.env.REDIS_PORT,
        password: process.env.REDIS_PASSWORD,
      };

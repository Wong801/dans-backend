import env from './env';

export default {
  db: env('DATABASE_NAME', 'strpart'),
  username: env('DATABASE_USERNAME', 'strpart'),
  password: env('DATABASE_PASSWORD', 'strpart'),
  config: {
    host: env('DATABASE_HOST', 'localhost'),
    dialect: 'mysql',
  },
};

import position from '../api/routes/position';
import parseCookies from '../api/middlewares/parseCookies';
import login from '../api/middlewares/login';
import env from '../config/env';
import logout from '../api/middlewares/logout';
import authenticate from '../api/middlewares/authenticate';
import register from '../api/middlewares/register';

/**
 * Registering routes
 *
 * @param {Express} app Express app
 */
export default async ({ app }) => {
  app.use('/api/v1/login', login({
    duration: env('JWT_DURATION', 86400000),
    privateKey: env('JWT_PRIVATE_KEY', 'privateKey'),
    domain: env('COOKIE_DOMAIN', 'localhost'),
  }));
  app.use('/api/v1/register', register());
  app.use(parseCookies());
  app.use('/api/v1/logout', authenticate(), logout());
  app.use('/api/v1/positions', authenticate(), position);
  return app;
};

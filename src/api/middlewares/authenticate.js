import env from '../../config/env';
import ApiError from '../ApiError';

/**
 * Create the middleware to authorize an action
 *
 * The middleware will check if the user is authenticated
 *
 * It is to be used in conjunction with the resource middleware.
 * It is to be used after parseCookie middleware.
 *
 * @returns {Function} Express.js Middleware
 */
export default function authenticate() {
  return async (req, res, next) => {
    if (!req.cookies) {
      next(new ApiError('Unauthorized', 401));
      return;
    }
    try {
      const user = await res.locals.modules.iam.VerifyToken({
        token: req.cookies['JWT-TOKEN'],
        privateKey: env('JWT_PRIVATE_KEY', 'privateKey'),
        xsrf: req.cookies['XSRF-TOKEN'],
      });
      res.locals.user = user;
      next();
    } catch (e) {
      next(e);
    }
  };
}

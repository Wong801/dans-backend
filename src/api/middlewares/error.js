import ApiError from '../ApiError';

/**
 * Create the middleware that enables the process of the request
 *
 * @param {Object} modules Modules to make available in middleware execution
 * @returns {Function} express.js middleware
 */
export default function error() {
  return (err, req, res, next) => {
    if (err instanceof ApiError) {
      return res.status(err.status).json({
        success: false,
        error: err.json(),
      });
    }
    return next(err);
  };
}

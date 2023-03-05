/**
 * Create the middleware that enables the process of the request
 *
 * @param {Object} modules Modules to make available in middleware execution
 * @returns {Function} express.js middleware
 */
export default function init({ modules } = {}) {
  return (req, res, next) => {
    res.locals.modules = modules || {};
    res.locals.cookies = [];
    next();
  };
}

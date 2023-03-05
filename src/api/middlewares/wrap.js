/**
 * Create the middleware that packages the response for the client
 *
 * @returns {Function} Express.js Middleware
 */
export default function wrap() {
  return (req, res) => res.status(res.locals.status || 200).json({
    success: true,
    data: res.locals.data.json ? res.locals.data.json() : res.locals.data,
    ...(res.locals.metadata && { metadata: res.locals.metadata }),
  });
}

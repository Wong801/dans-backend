/**
 * This middleware is meant to be standart logout middleware
 *
 * Since we cannot remove the cookie from the client side,
 * we must do it through server side
 *
 * @param {Number} duration JWT token expire duration
 * @param {String} privateKey private key for crafting JWT token
 * @returns {Function} express.js middleware
 */
export default function logout() {
  return (req, res, next) => {
    try {
      res.clearCookie('JWT-TOKEN');
      res.clearCookie('XSRF-TOKEN');
      res.status(200).json({
        success: true,
      });
      res.end();
    } catch (error) {
      next(error);
    }
  };
}

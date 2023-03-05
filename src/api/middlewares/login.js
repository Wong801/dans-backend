/**
 * This middleware is meant to be standart login middleware
 *
 * @param {Number} duration JWT token expire duration
 * @param {String} privateKey private key for crafting JWT token
 * @returns {Function} express.js middleware
 */
export default function login({ duration, privateKey, domain }) {
  // eslint-disable-next-line consistent-return
  return async (req, res, next) => {
    try {
      const user = await res.locals.modules.iam.Authenticate({
        user: req.body.user,
        pass: req.body.pass,
      });
      const result = await res.locals.modules.iam.CraftToken({
        user,
        duration,
        privateKey,
      });
      const cookies = [
        {
          name: 'JWT-TOKEN',
          value: result.token,
          options: {
            maxAge: duration,
            domain,
            httpOnly: true,
            sameSite: 'strict',
          },
        },
        {
          name: 'XSRF-TOKEN',
          value: result.xsrf,
          options: {
            maxAge: duration,
            domain,
          },
        },
      ];
      cookies.forEach((cookie) => {
        res.cookie(cookie.name, cookie.value, cookie.options || {});
      });
      res.status(200).json({
        success: true,
      });
      res.end();
    } catch (e) {
      next(e);
    }
  };
}

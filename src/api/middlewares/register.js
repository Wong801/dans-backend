/**
 * This middleware is meant to be standart login middleware
 *
 * @returns {Function} express.js middleware
 */
export default function register() {
  return async (req, res, next) => {
    try {
      await res.locals.modules.iam.Register({
        user: req.body.user,
        pass: req.body.pass,
      });
      res.status(201).json({
        success: true,
      });
    } catch (err) {
      next(err);
    }
  };
}

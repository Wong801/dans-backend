/*
  eslint
    no-useless-constructor: 0,
    no-unused-vars: 0,
    class-methods-use-this: 0
*/
import jwtStd from 'jsonwebtoken';
import crypto from 'crypto';
import Module from './module';
import ApiError from '../ApiError';
import User from '../../models/User';
import env from '../../config/env';

/**
 * Placeholder module for Identity Access Management Authentication
 *
 * This module is meant to create a JWT-based
 * authentication system. It implemented XSRF protection, and will
 * need to be extended to support other authentication methods.
 *
 * @extends Module
 */
export default class IAM extends Module {
  /**
   * Create a JWT service instance
   *
   * @param {JsonWebToken} jwt JsonWebToken dependency injection
   */
  constructor({ jwt = null, dataInterface = null } = {}) {
    super();
    this.name = 'IAM';
    this.warnings = '';
    this.jwt = jwt || jwtStd;
    this.dataInterface = dataInterface;
  }

  /**
   * Generate a random XSRF token
   *
   * @returns {String} Random XSRF token
   */
  generateXsrf() {
    return crypto.randomBytes(32).toString('hex');
  }

  /**
   * Craft a JWT token for the user
   *
   * @param {Object|String} user User to craft the token for
   * @param {Number} duration token expire duration
   * @param {String} privateKey private key to craft the token
   *
   * @return {Object} JWT token and xsrf token
   */
  CraftToken({ user, duration, privateKey }) {
    const xsrf = this.generateXsrf();
    if (typeof user !== 'string') throw new ApiError('User must be a string', 400);
    const token = this.jwt.sign({
      sub: user,
      iat: Date.now(),
      // eslint-disable-next-line radix
      exp: Date.now() + parseInt(duration),
      xsrf,
    }, privateKey, {
      algorithm: 'HS256',
    });
    return {
      token,
      xsrf,
    };
  }

  /**
   * Check user authentication
   *
   * @param {String} user User to authenticate
   * @param {String} pass Password to authenticate
   *
   * @return {Object} user and xsrf token
   */
  async Authenticate({ user, pass }) {
    const userData = new User({ dataInterface: this.dataInterface });
    if (!(await userData.load({ user }))) throw new ApiError('Invalid credentials', 400);
    const hashedPass = crypto.createHmac('sha256', env('JWT_SECRET', ''))
      .update(`${env('JWT_SALT', '')}${pass}`).digest('base64');
    if (user !== userData.user || hashedPass !== userData.pass) {
      throw new ApiError('Invalid credentials', 400);
    }
    return user;
  }

  /**
   * Register for new user
   *
   * @param {String} user User to authenticate
   * @param {String} pass Password to authenticate
   *
   * @return {Boolean} true if success
   */
  async Register({ user, pass }) {
    const model = new User({ dataInterface: this.dataInterface });
    const userData = await model.load({ user });
    if (userData) throw new ApiError('User already exists', 400);
    model.populate({
      user,
      pass: crypto.createHmac('sha256', env('JWT_SECRET', ''))
        .update(`${env('JWT_SALT', '')}${pass}`).digest('base64'),
    });
    if (!(await model.save())) throw new ApiError('Error', 500);
    return true;
  }

  /**
   * Verify a JWT token
   *
   * @param {String} token JWT token to verify
   * @param {String} privateKey private key to verify token
   * @param {String} xsrf XSRF token to verify
   *
   * @return {Boolean} True if the token is valid
   *
   * @throws {ApiError} if the xsrf token is invalid
   * @throws {ApiError} if the token is expired
   * @throws {ApiError} if the token is invalid
   */
  async VerifyToken({ token, privateKey, xsrf = null }) {
    try {
      const decoded = await this.jwt.verify(token, privateKey, {
        algorithms: ['HS256'],
      });
      if (decoded.xsrf !== xsrf) throw new ApiError('Invalid XSRF token', 401);
      if (decoded.exp < Date.now()) throw new ApiError('Token expired', 401);
      return decoded.sub;
    } catch (e) {
      if (e instanceof ApiError) throw e;
      throw new ApiError('Invalid token', 401);
    }
  }

  /**
   * Check user authorization
   *
   * @param {Object} user User that must carry an authorization policy
   * @param {String} action Action to authorize
   * @param {String} resource Resource on which to check if the action is allowed
   * @param {Boolean} rootBypass Bypass policy check for root users
   * @returns {Boolean} Always true, always authorized
   */
  // eslint-disable-next-line
  IsUserAuthorized({
    // eslint-disable-next-line
    user, action, resource, rootBypass, userIp
  } = {}) {
    if (user) return true;
    return false;
  }
}

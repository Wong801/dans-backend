import DataInterface from '../../models/DataInterface';
import client from '../../models/mongoInterface';
import PositionService from '../../services/position';
import ApiError from '../ApiError';

const dataInterface = new DataInterface({ client });
const service = new PositionService({ dataInterface });

export default class PositionController {
  static search() {
    return async (req, res, next) => {
      try {
        if (req.query.full_time === 'true') {
          req.query.type = 'Full Time';
          delete req.query.full_time;
        }
        if (req.query.full_time === 'false') {
          req.query.type = /^((?!Full Time).)*$/;
          delete req.query.full_time;
        }
        const result = await service.Search({ query: req.query });
        res.locals.data = result.rows;
        res.locals.metadata = {
          page: req.query.page || 1,
          limit: req.query.limit || 10,
          total: result.count,
        };
        next();
      } catch (err) {
        next(new ApiError('Error', 500, err.message));
      }
    };
  }

  static get() {
    return async (req, res, next) => {
      try {
        const result = await service.Get({ id: req.params.id });
        res.locals.status = result ? 200 : 404;
        res.locals.data = result;
        next();
      } catch (err) {
        next(new ApiError('Error', 500, err.message));
      }
    };
  }

  static create() {
    return async (req, res, next) => {
      try {
        const result = await service.Create({ json: req.body });
        res.locals.status = 201;
        res.locals.data = result;
        next();
      } catch (err) {
        next(err);
      }
    };
  }

  static update() {
    return async (req, res, next) => {
      try {
        const result = await service.Update({ id: req.params.id, json: req.body });
        res.locals.data = result;
        next();
      } catch (err) {
        next(err);
      }
    };
  }

  static delete() {
    return async (req, res, next) => {
      try {
        const result = await service.Delete({ id: req.params.id });
        res.locals.data = result;
        next();
      } catch (err) {
        next(err);
      }
    };
  }
}

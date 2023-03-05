import ApiError from '../api/ApiError';
import Position from '../models/Position';

export default class PositionService {
  constructor({ dataInterface = null } = {}) {
    this.dataInterface = dataInterface;
  }

  async Search({ query }) {
    const res = await (new Position({ dataInterface: this.dataInterface })).query(query);
    return res;
  }

  async Get({ id }) {
    const model = new Position({ dataInterface: this.dataInterface });
    if (!(await model.load(id))) throw new ApiError('Data Not Found', 404);
    return model;
  }

  async Create({ json }) {
    const model = new Position({ dataInterface: this.dataInterface });
    model.populate(json);
    await model.save();
    return model;
  }
}

export default class Model {
  constructor({ dataInterface = null } = {}) {
    this.dataInterface = dataInterface;
    this._id = null;
  }

  populate(object) {
    this._id = object._id || null;
  }

  json() {
    return {
      _id: this._id,
    };
  }

  async query(options) {
    return this.dataInterface.query(this, options);
  }

  async load(id) {
    try {
      const res = await this.dataInterface.load(this, id);
      this.populate(res);
      return true;
    } catch (error) {
      return false;
    }
  }

  async save() {
    try {
      this.dataInterface.save(this);
      return true;
    } catch (error) {
      return false;
    }
  }
}

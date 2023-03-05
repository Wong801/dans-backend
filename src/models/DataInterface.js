import { ObjectId } from 'mongodb';
import env from '../config/env';

export default class DataInterface {
  constructor({ client }) {
    this.client = client;
    this.conn = null;
  }

  async _makeConn() {
    if (this.conn === null) {
      this.conn = await this.client.connect();
    }
  }

  async _closeConn() {
    if (this.conn !== null) {
      try {
        await this.conn.close();
        this.conn = null;
      } catch (error) {
        this.conn = null;
      }
    }
  }

  // eslint-disable-next-line class-methods-use-this
  _queryBuilder(raw) {
    const { page = 1, limit = 10, ...options } = raw;
    const query = {};
    Object.keys(options).forEach((key) => {
      query[key] = {
        $regex: options[key],
      };
    });
    return {
      page,
      limit,
      query,
    };
  }

  async query(model, options) {
    await this._makeConn();
    const { page, limit, query } = this._queryBuilder(options);
    const db = this.conn.db(env('MONGO_DATABASE', ''));
    const collection = db.collection(model.$_uri);
    const cursor = await collection.find(query);
    const res = await cursor.sort({ _id: 1 })
      .skip(page > 0 ? ((page - 1) * limit) : 0)
      .limit(limit)
      .toArray();
    const count = await collection.countDocuments(query);
    return {
      count,
      rows: res,
    };
  }

  async load(model, id) {
    await this._makeConn();
    const db = this.conn.db(env('MONGO_DATABASE', ''));
    const collection = db.collection(model.$_uri);
    const query = id instanceof Object ? id : { _id: new ObjectId(id) };
    const res = await collection.findOne(query);
    await this._closeConn();
    return res;
  }

  async save(model) {
    const newDocument = model.json();
    await this._makeConn();
    const db = this.conn.db(env('MONGO_DATABASE', ''));
    const collection = db.collection(model.$_uri);
    const res = await collection.insertOne(newDocument);
    model.populate({ _id: res.insertedId, ...newDocument });
    await this._closeConn();
    return model;
  }
}

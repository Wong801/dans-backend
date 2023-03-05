import Model from './Model';

export default class User extends Model {
  constructor({ dataInterface = null } = {}) {
    super({ dataInterface });
    this.$_uri = 'users';
    this.user = null;
    this.pass = null;
  }

  populate(object) {
    super.populate(object);
    this.user = object.user;
    this.pass = object.pass;
  }

  json() {
    return {
      ...super.json(),
      user: this.user,
      pass: this.pass,
    };
  }
}

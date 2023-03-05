import Model from './Model';

export default class Position extends Model {
  constructor({ dataInterface = null } = {}) {
    super({ dataInterface });
    this.$_uri = 'positions';
    this.id = null;
    this.type = null;
    this.url = null;
    this.company = null;
    this.company_url = null;
    this.location = null;
    this.title = null;
    this.description = null;
    this.how_to_apply = null;
    this.company_logo = null;
    this.createdAt = null;
  }

  populate(object) {
    super.populate(object);
    this.id = object.id;
    this.type = object.type;
    this.url = object.url;
    this.company = object.company;
    this.company_url = object.company_url;
    this.location = object.location;
    this.title = object.title;
    this.description = object.description;
    this.how_to_apply = object.how_to_apply;
    this.company_logo = object.company_logo;
    if (object.createdAt) this.createdAt = object.createdAt;
    else this.createdAt = Date.now();
  }

  json() {
    return {
      ...super.json(),
      id: this.id,
      type: this.type,
      url: this.url,
      company: this.company,
      company_url: this.company_url,
      location: this.location,
      title: this.title,
      description: this.description,
      how_to_apply: this.how_to_apply,
      company_logo: this.company_logo,
      createdAt: this.createdAt,
    };
  }
}

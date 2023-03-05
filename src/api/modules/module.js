/**
 * This class is meant to be abstract and should be extended by actual modules
 */
export default class Module {
  constructor() {
    this.name = null;
    this.warnings = undefined;
  }
}

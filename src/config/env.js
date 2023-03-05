/**
 * Get env variable
 *
 * @param {String} name env variable name
 * @param {Any} defaultValue default value if env variable is undefined or null
 */
export default (name, defaultValue) => process.env[name] || defaultValue;

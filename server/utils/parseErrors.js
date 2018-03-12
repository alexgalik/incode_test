const _ = require("lodash");

module.exports = errors => {
  const result = {};
  _.forEach(errors, (val, key) => {
    result[key] = val.message;
  });
  return result;
};

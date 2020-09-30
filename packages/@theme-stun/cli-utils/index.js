// Import all modules in lib
['logger'].forEach((name) => {
  Object.assign(exports, require(`./lib/${name}`));
});

exports.chalk = require('chalk');
exports.semver = require('semver');

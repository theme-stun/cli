const chalk = require('chalk');

exports.log = {
  info: (val) => console.log(`${val ? chalk.green(val) : ''}`),

  error: (val) => console.log(`${val ? chalk.red(val) : ''}`),
};

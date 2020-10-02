const chalk = require('chalk');

exports.log = {
  info: (val) => console.log(`${val ? chalk.green(val) : ''}`),

  warn: (val) => console.log(`${val ? chalk.yellow(val) : ''}`),

  error: (val) => console.log(`${val ? chalk.red(val) : ''}`),
};

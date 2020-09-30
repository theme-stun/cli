const chalk = require('chalk');

exports.log = (info) => console.log(`${info ? chalk.green(info) : ''}`);

exports.error = (error) => console.log(`${error ? chalk.green(error) : ''}`);

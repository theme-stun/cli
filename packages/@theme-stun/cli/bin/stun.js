#!/usr/bin/env node

// const { chalk, semver } = require("@theme-stun/cli-utils");
// const requiredNodeVersion = require("../package.json").engines.node;

// // Check node version before requiring/doing anything else
// // The user may be on a very old node version
// function checkNodeVersion(wanted, name) {
//   if (semver.satisfies(process.version, wanted, { includePrerelease: true })) {
//     console.log(
//       chalk.red(
//         `You are using Node ${process.version}.\n` +
//           `${name} requires Node ${wanted}.\nPlease upgrade your Node version.`
//       )
//     );
//     process.exit(1);
//   }
// }

// checkNodeVersion(requiredNodeVersion, "@theme-stun/cli");

// const EOL_NODE_MAJORS = ["8.x", "9.x", "11.x", "13.x"];
// for (const major of EOL_NODE_MAJORS) {
//   if (semver.satisfies(process.version, major)) {
//     console.log(
//       chalk.red(
//         `You are using Node ${process.version}.\n` +
//           `Node.js ${major} has already reached end-of-life and will not be supported in future major releases.\n` +
//           `It's strongly recommended to use an active LTS version instead.`
//       )
//     );
//   }
// }

const program = require('commander');

program
  .version(`@theme-stun/cli ${require('../package.json').version}`, '-v, --version')
  .usage('<command> [options]');

// program
//   .command('init <name>')
//   .description('init project')
//   .action((name) => {
//     console.log('init ' + name);
//   });

// Parse the parameters
program.parse(process.argv);
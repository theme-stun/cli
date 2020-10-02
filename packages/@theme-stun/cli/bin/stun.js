#!/usr/bin/env node

const { chalk, semver, log } = require('@theme-stun/cli-utils');
const requiredNodeVersion = require('../package.json').engines.node;
const leven = require('leven');

// Check node version before requiring/doing anything else
// The user may be on a very old node version
function checkNodeVersion(wanted, name) {
  if (!semver.satisfies(process.version, wanted, { includePrerelease: true })) {
    log.error(
      `You are using Node ${process.version}.\n` +
        `${name} requires Node${wanted}.\nPlease upgrade your Node version.`,
    );
    process.exit(1);
  }
}

checkNodeVersion(requiredNodeVersion, '@theme-stun/cli');

const EOL_NODE_MAJORS = ['8.x', '9.x', '11.x', '13.x'];
for (const major of EOL_NODE_MAJORS) {
  if (semver.satisfies(process.version, major)) {
    log.error(
      `You are using Node ${process.version}.\n` +
        `Node.js ${major} has already reached end-of-life and will not be supported in future major releases.\n` +
        `It's strongly recommended to use an active LTS version instead.`,
    );
    log.info();
  }
}

const program = require('commander');

program
  .version(`@theme-stun/cli ${require('../package.json').version}`, '-v, --version')
  .usage('[command] [options]');

program
  .command('create')
  .description('create a new «Stun» project from a remote repository')
  .action(require('../lib/init').initConfig);

program.arguments('[command]').action((cmd) => {
  if (cmd) {
    program.outputHelp();
    log.error();
    log.error(`Unknown command ${chalk.yellow(cmd)}`);
    suggestCommands(cmd);
  }
});

program.on('--help', () => {
  log.info();
  log.info(`Run ${chalk.cyan(`stun <command> -h(--help)`)} for detailed usage of given command.`);
});

// Parse the parameters
program.parse(process.argv);

// Just run `stun`, no subcommands or options
if (!process.argv.slice(2).length) {
  program.outputHelp();
}

function suggestCommands(unknownCommand) {
  const availableCommands = program.commands.map((cmd) => cmd._name);
  let suggestion;

  availableCommands.forEach((cmd) => {
    const isBestMatch = leven(cmd, unknownCommand) < leven(suggestion || '', unknownCommand);

    if (leven(cmd, unknownCommand) < 3 && isBestMatch) {
      suggestion = cmd;
    }
  });

  if (suggestion) {
    log.info();
    log.info(`Did you mean ${chalk.yellow(suggestion)}?`);
  }
}

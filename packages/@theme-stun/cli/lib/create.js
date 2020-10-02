const fse = require('fs-extra');
const path = require('path');
const enquirer = require('enquirer');
const { chalk, log } = require('@theme-stun/cli-utils');
const { clone } = require('./util/fetchRemote');

function mergeConfig(answers) {
  const config = {
    dir: './themes/stun/',
  };

  if (answers) {
    config.dir = answers.dirCustom || answers.dirName;
  }

  return config;
}

async function promptUser() {
  return enquirer
    .prompt([
      {
        type: 'select',
        name: 'dirName',
        message: 'Where are the project files generated?',
        choices: [
          { message: './themes/stun/', name: './themes/stun/' },
          { message: './stun/', name: './stun/' },
          { message: 'Let me enter!', name: 'auto' },
        ],
      },
      {
        type: 'input',
        name: 'dirCustom',
        message: 'Where do you want to generate the project? Please enter:',
        skip() {
          // `this.state` is the built-in attribute of Enquirer
          return this.state.answers.dirName !== 'auto';
        },
      },
    ])
    .then(async (answers) => {
      const config = mergeConfig(answers);
      const targetDir = path.resolve(config.dir);

      if (fse.existsSync(targetDir)) {
        const { isOverwrite } = await enquirer.prompt([
          {
            type: 'toggle',
            name: 'isOverwrite',
            message: `Target directory ${chalk.cyan(targetDir)} already exists. Overwrite it?`,
            enabled: 'Yes',
            disabled: 'No',
          },
        ]);

        if (isOverwrite) {
          log.info(`Removing ${chalk.cyan(targetDir)} ...`);
          await fse.remove(targetDir);
          log.info('Remove done!');
        } else {
          log.error(`✘ Target directory ${chalk.cyan(targetDir)} already exists, command exit.`);
          return false;
        }
      }

      log.info(`Creating project in ${chalk.yellow(targetDir)}.`);

      await clone('github:liuyib/hexo-theme-stun', targetDir);

      log.succ(`√ Successfully created project. Enjoy yourself :)`);
    })
    .catch((error) => {
      const { version } = require('../package.json');
      const errorMessage = error ? `\n\n${error}\n` : '';

      log.error(`\nOops! Something went wrong! :(\n@theme-stun/cli ${chalk.yellow(version)}`);
      log.error(`${errorMessage}`);
      process.exit(1);
    });
}

module.exports = {
  initConfig: promptUser,
};

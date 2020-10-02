const fs = require('fs');
const path = require('path');
const enquirer = require('enquirer');
const { log } = require('@theme-stun/cli-utils');
const { clone } = require('./util/fetchRemote');

function processAnswers(answers) {
  let config = {
    folder: './themes/stun/',
    isExistFolder: false,
    isOverride: false,
  };

  config.folder = answers.folderCustom || answers.folderName;
  config.isOverride = answers.isOverride || false;

  return config;
}

function hasTargetFolder(folder) {
  return fs.existsSync(path.resolve(folder));
}

function promptUser() {
  return enquirer
    .prompt([
      {
        type: 'select',
        name: 'folderName',
        message: 'Where are the project files generated?',
        choices: [
          { message: './themes/stun/', name: './themes/stun/' },
          { message: './stun/', name: './stun/' },
          { message: 'Let me enter!', name: 'auto' },
        ],
      },
      {
        type: 'input',
        name: 'folderCustom',
        message: 'Where do you want to generate the project? Please enter:',
        skip() {
          // `this.state` is the built-in attribute of Enquirer
          return this.state.answers.folderName !== 'auto';
        },
      },
    ])
    .then(async (answers) => {
      const config = processAnswers(answers);

      if (hasTargetFolder(config.folder)) {
        config.isExistFolder = true;
      }

      if (config.isExistFolder) {
        await enquirer
          .prompt([
            {
              type: 'toggle',
              name: 'isOverride',
              message: `The '${config.folder}' directory already exists. Overwrite it?`,
              enabled: 'Yes',
              disabled: 'No',
            },
          ])
          .then((ans) => {
            config.isOverride = ans.isOverride;
          });
      }

      if (!config.isExistFolder || config.isOverride) {
        log.info(`Creating project, please wait...`);

        await clone('github:liuyib/hexo-theme-stun', config.folder);
      } else {
        log.error(`✘ The '${config.folder}' directory already exists, program exits.`);
      }
    })
    .catch((error) => {
      console.log(`promptUser -> error`, error);
    });
}

module.exports = {
  initConfig: promptUser,
};

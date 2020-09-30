const { log } = require('@theme-stun/cli-utils');
const { clone } = require('./fetchRemote');

module.exports = async (name = 'stun') => {
  log(`Create project, please wait.`);

  await clone('github:liuyib/hexo-theme-stun', name);
};

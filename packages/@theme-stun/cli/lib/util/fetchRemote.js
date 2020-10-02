const { promisify } = require('util');

exports.clone = async (repo, desc) => {
  const download = promisify(require('download-git-repo'));
  const ora = require('ora');
  const process = ora(`Downloading...`);

  process.start();
  await download(repo, desc);
  process.succeed();
};

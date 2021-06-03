const path = require('path');
const fs = require('fs-extra');
const ora = require('ora');
const copyNodeModules = require('copy-node-modules');

function copy(src, target) {
  return new Promise((resolve, reject) => {
    copyNodeModules(src, target, { devDependencies: false }, (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve()
    });
  })
}

const spinner = ora('copy start').start();
const src = path.join(__dirname, '..');
const target = path.join(__dirname, '../dist');


(async () => {
  await fs.remove(target);
  await copy(src, target);
  spinner.succeed('install success');
  spinner.stop();
})()

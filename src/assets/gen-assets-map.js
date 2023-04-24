#!/usr/bin/env node
'use strict';

//////////////////////////////////////////////////////////////////////////////////////
//
// example:
//  export const assets__root__ = {
//  };
//
//  export const assets_img = {
//    zombie_white_png: require('./img/index/zombie-white.png').default
//  };
//
//////////////////////////////////////////////////////////////////////////////////////
const fs = require('fs');
const path = require('path');

const machinedFileNameSuffix = ['.png', '.svg'];

const projectRootDir = process.cwd();

const rootDir = './src/assets';

const assetsRootDir = path.resolve(projectRootDir, rootDir);

const groupNamePrefix = 'assets_';

const groupRootDirName = '_root_';

const assetsMapFileName = 'assetsMap.js';

const traverseDir = (rootDir) => {
  const filePaths = [];

  const cb = (filePath) => filePaths.push(filePath);

  const walkSync = (currentDirPath, callback) => {
    fs.readdirSync(currentDirPath).forEach(function (name) {
      const filePath = path.join(currentDirPath, name);
      const stat = fs.lstatSync(filePath);
      if (stat.isFile()) {
        callback(filePath, stat);
      } else if (stat.isDirectory()) {
        walkSync(filePath, callback);
      }
    });
  };

  return new Promise((resolve) => {
    walkSync(rootDir, cb);
    resolve(filePaths);
  });
};

(async () => {
  const group = {};

  const assetsRootDirFiles = fs.readdirSync(assetsRootDir);

  const rootDirFiles = assetsRootDirFiles.filter((filePath) =>
    machinedFileNameSuffix.includes(path.extname(filePath))
  );

  group[groupRootDirName] = rootDirFiles;

  const groupKeys = assetsRootDirFiles.filter((filePath) =>
    fs.lstatSync(path.resolve(__dirname, filePath)).isDirectory()
  );

  const traverseDirPromise = [];

  groupKeys.forEach((item) => {
    const assetsRootDirItem = assetsRootDir + '/' + item;
    traverseDirPromise.push(
      traverseDir(assetsRootDirItem).then(
        (/**@type Array<String */ filePaths) => {
          group[item] = filePaths
            .filter((filePath) =>
              machinedFileNameSuffix.includes(path.extname(filePath))
            )
            .map((filePath) => path.relative(assetsRootDir, filePath));
        }
      )
    );
  });

  await Promise.all(traverseDirPromise);

  let finalCode = '';
  for (const key in group) {
    let startStr = `export const ${groupNamePrefix}${key} = { \n`;
    let endStr = `};\n\n`;

    group[key].forEach((item) => {
      const assetsMapKey = path.basename(item).replace(/-|\./g, '_');
      startStr += `  ${assetsMapKey}: require('./${item}').default,\n`;
    });

    finalCode = finalCode + startStr + endStr;
  }

  fs.writeFileSync(
    path.resolve(assetsRootDir, './' + assetsMapFileName),
    finalCode
  );
})();

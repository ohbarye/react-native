/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */
'use strict';

const fs = require('fs');
const glob = require('glob');
const path = require('path');

/**
 * Gets package's class name (class that implements ReactPackage)
 * by searching for its declaration in all Java files present in the folder
 *
 * @param {String} folder Folder to find java files
 */
module.exports = function getPackageClassName(folder) {
  const files = glob.sync('**/*.java', { cwd: folder });

  const packages = files
    .map(filePath => fs.readFileSync(path.join(folder, filePath), 'utf8'))
    .map(file => file.match(/class (.*) implements ReactPackage/))
    .filter(match => match);

  return packages.length ? packages[0][1] : null;
};

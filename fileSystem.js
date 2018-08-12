'use strict';

const async = require('async');
const fs = require('fs');
const osenv = require('osenv');
const path = require('path');

let shell;

shell = require('electron').shell;

function getUsersHomeFolder() {
  return osenv.home();
}

function getFilesInFolder(folderPath, cb) {
  fs.readdir(folderPath, cb);
}

function inspectAndDescribeFile(filePath, cb) {
  let result = { file: path.basename(filePath), path: filePath, type: '' };
  fs.stat(filePath, (err, stat) => {
    if (err) {
      cb(err);
    }       else {
      if (stat.isFile()) {
        result.type = 'file';
      }
      if (stat.isDirectory()) {
        result.type = 'directory';
      }
      cb(err, result);
    }
  });
}

function inspectAndDescribeFiles(folderPath, files, cb) {
  async.map(files, (file, asyncCb) => {
    let resolvedFilePath = path.resolve(folderPath, file);
    inspectAndDescribeFile(resolvedFilePath, asyncCb);
  }, cb);
}

function openFile(filePath) {
  shell.openItem(filePath);
}

module.exports = {
  getUsersHomeFolder,
  getFilesInFolder,
  inspectAndDescribeFiles,
	openFile
};

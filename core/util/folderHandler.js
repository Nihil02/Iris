const fs = require("fs");

const cleanJsFiles = (files = []) => {
  const regex = /\.js$/;
  return files.filter((file) => !regex.test(file));
};

const isFolderEmpty = (folderPath) => {
  const files = fs.readdirSync(folderPath);
  const filteredFiles = cleanJsFiles(files);
  return filteredFiles.length === 0;
};

/**
 * Gets all files on a dir a retrns him.
 * @param {string} path 
 * @returns {string[]} An array with filenames in a dir.
 */
const getFiles = (path = "") => {
  const files = fs.readdirSync(path);
  return files;
};

module.exports = {
  isFolderEmpty,
  cleanJsFiles,
  getFiles,
};

const fs = require("fs");

const cleanJsFiles = (files = []) => {
  const regex = /\.js$/;
  return files.filter((file) => !regex.test(file));
};

/**
 * Check is a folder is void ignoring the `javascript` files in the folder.
 * @param {string} folderPath The path of the folder.
 * @returns 
 */
const isFolderEmpty = (folderPath) => {
  const files = fs.readdirSync(folderPath);
  const filteredFiles = cleanJsFiles(files);
  return filteredFiles.length === 0;
};

/**
 * Checks if a folder exists wih a given path.
 * @param {string} path - The path including the name of the folder.
 * @returns {boolean} - True | False depending if the folder exists.
*/
const folderExists = (path="") => {
  return fs.existsSync(path);
}

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
  folderExists
};

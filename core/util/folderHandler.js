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
module.exports = {
  isFolderEmpty,
  cleanJsFiles,
};

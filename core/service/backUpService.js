const fs = require("fs");
const { getFiles } = require("../util/folderHandler.js");

class BackUpService {
  /**
   * Generates a back up from the SQLite database in the `backups` folder.
   * @param {string} src The path of the database folder
   * @param {string} dest The path of the backup folder
   */
  static createBackUp(src = "", dest = "") {
    // We get all files in the backup folder for get the number of backups in the system.
    const files = getFiles(dest);
    // This statement is ever true if the actualNumberOfBackups is equal to the limit plus one.
    const limitOfBackUps = 5;
    if (files.length > limitOfBackUps) {
      const sortedFiles = this.#sortByDate(files);
      this.#clearBackUps(sortedFiles.pop(), src);
    }

    // Gets the actual date, parses into a string and formats from YYYY-MM-DDThh:mm:ssZ to YYYY-MM-DD.
    const date = new Date().toISOString().split("T").shift();
    const finalDest = `${dest}/iris_${date}.db`;
    fs.copyFile(src, finalDest);
  }

  /**
   * Gets a backup from the `backups` folder, rename it to `iris.db` and puts in in the `datbase` folder.
   * @param {string} src The path of the backup folder.
   * @param {string} dest The path of the database folder.
   */
  static getBackUp(src = "", dest = "") {
    // The format of a backup name is the next: iris-yyyymmdd.db
    const files = getFiles(src);
    const sortedFiles = this.#sortByDate(files);

    const mostRecentBackUp = sortedFiles.shift();
    const formattedName = mostRecentBackUp.split("_").shift().concat(".db");

    const finalSrc = `${src}/${mostRecentBackUp}`;
    const finalDest = `${dest}/${formattedName}`;

    fs.copyFileSync(finalSrc, finalDest);
  }

  /**
   * Sorts an arrays of files with name format `iris-yyyymmdd.db` by date (from the most recent to me most oldest date).
   *
   * @param {string[]} files An array with filenames.
   * @returns {string []} An array with filenames sorted by date.
   */
  static #sortByDate(files = []) {
    const sortedFiles = files.sort((a, b) => {
      const aDateString = a.split("_").pop().replace(".db", "");
      const bDateString = b.split("_").pop().replace(".db", "");
      return new Date(bDateString) - new Date(aDateString);
    });
    return sortedFiles;
  }

  /**
   * Recives an array with filenames an deletes them from the backup folder.
   * @param {string []} backups An array with backups filenames that's going to be deleted
   */
  static #clearBackUps(backups = [], path = "") {
    backups.forEach((backup) => {
      fs.rmSync(`${path}/${backup}`);
    });
  }

}

module.exports = BackUpService;

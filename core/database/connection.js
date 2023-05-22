const { Sequelize } = require("sequelize");
const BackUpService = require("../service/backUpService.js");
const { isFolderEmpty, folderExists } = require("../util/folderHandler.js");

// If the database folder is void, then check the backup folder.
const path = `${process.cwd()}/core/database`;
const backUpFolder = `${process.cwd()}/core/backups`;
if (folderExists(backUpFolder) && isFolderEmpty(path)) {
  //  If the backup folder is not void, copy the most recent .db file and rename it.
  BackUpService.getBackUp(backUpFolder, path);
}

const sequelize = new Sequelize("sqlite:./core/database/iris.db");
process.on("SIGINT", async () => {
  await sequelize.close();
  process.exit(0);
});
exports.sequelize = sequelize;

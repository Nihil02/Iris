const { Sequelize } = require("sequelize");
const { isFolderEmpty } = require("../util/folderHandler.js");

// If the database folder is void, then check the backup folder.
const path = `${process.cwd()}/core/database`;
if (isFolderEmpty(path)) {
  //  If the backup folder is not void, copy the most recent .db file and rename it.
}

const sequelize = new Sequelize("sqlite:./core/database/iris.db");
process.on("SIGINT", async () => {
  await sequelize.close();
  process.exit(0);
});
exports.sequelize = sequelize;

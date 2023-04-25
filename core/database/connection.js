const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("sqlite:./core/database/iris.db");
exports.sequelize = sequelize;

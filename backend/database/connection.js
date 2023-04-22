const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("sqlite:./backend/database/iris.db");
exports.sequelize = sequelize;

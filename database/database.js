const { Sequelize } = require("sequelize");
const sequelize = new Sequelize('sqlite:./database/iris.db')
exports.sequelize = sequelize



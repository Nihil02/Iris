require('./dbBootstrap.js').create()
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "",
});

exports.sequelize = sequelize

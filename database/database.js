require('./dbBootstrap.js').create()
const { Sequelize } = require("sequelize");

export const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "",
});


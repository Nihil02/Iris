const {Model, DataTypes} = require('sequelize')
const { sequelize } = require('../database.js')

class Employee extends Model {}

Employee.init({

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    primer_apellido: {
        type: DataTypes.STRING,
        allowNull: false
    },
    segundo_apellido: {
        type: DataTypes.STRING,
        allowNull: false
    },
    contrasenna: {
        type: DataTypes.STRING,
        allowNull: false
    }

}, {sequelize, modelName: "Empleado", tableName: "EMPLEADO", timestamps: false})

// TODO: Methods for handling data

Employee.sync()

// Instead of export the class itself try exporting an instance of the class
module.exports = Employee

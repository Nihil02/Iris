const {Model, DataTypes} = require('sequelize')
const {sequelize} = require('../database.js')

class Supplier extends Model {
}

Supplier.init({
    rfc: {
        type: DataTypes.STRING(13),
        primaryKey: true
    },
    razon_social: {
        type: DataTypes.STRING,
        allowNull: false
    },
    domicilio: {
        type: DataTypes.STRING,
        allowNull: false
    },
    telefono: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cuenta_bancaria: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {sequelize, modelName:"Proveedor", tableName: "PROVEEDOR", timestamps: false})
Supplier.sync()
module.exports = Supplier

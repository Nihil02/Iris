const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../database/connection.js");

class Supplier extends Model {}

Supplier.init(
  {
    rfc: {
      type: DataTypes.STRING(13),
      primaryKey: true,
    },
    razon_social: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    domicilio: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    correo_electronico: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    telefono: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    banco: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cuenta_bancaria: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Proveedor",
    tableName: "PROVEEDOR",
    timestamps: false,
  }
);
module.exports = Supplier;

const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../database/connection.js");

class Employee extends Model {}

Employee.init(
  {
    rfc: {
      type: DataTypes.STRING(13),
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    primer_apellido: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    segundo_apellido: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    usuario: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    privilegios: {
      type: DataTypes.ENUM("Administrador", "Normal"),
      allowNull: false,
    },
    contrasenna: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Empleado",
    tableName: "EMPLEADO",
    timestamps: false,
  }
);

Employee.sync();

module.exports = Employee;

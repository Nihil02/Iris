const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../database/connection.js");

class Customer extends Model {}

Customer.init(
  {
    CURP: {
      type: DataTypes.STRING(18),
      primaryKey: true,
      allowNull: false,
    },
    nombre: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    primer_apellido: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    segundo_apellido: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    telefono: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    domicilio: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    fecnac: {
      // La fecha debe ser un valor númerico de 8 dígitos según la ley de SIRES
      type: DataTypes.INTEGER(8),
      allowNull: false,
    },
    edonac: {
      type: DataTypes.STRING(2),
      defaultValue: "00",
      allowNull: false,
    },
    sexo: {
      type: DataTypes.ENUM("H", "M"),
      allowNull: false,
    },
    nacorigen: {
      type: DataTypes.STRING(4),
      allowNull: false,
      defaultValue: "NND",
    },
    edo: {
      type: DataTypes.STRING(2),
      allowNull: false,
      defaultValue: "00",
    },
    mun: {
      type: DataTypes.STRING(3),
      allowNull: false,
      defaultValue: "000",
    },
    // Clave de la localidad existente en el catálogo de la INGEGI
    // El código postal, pues
    loc: {
      type: DataTypes.STRING(4),
      allowNull: false,
      defaultValue: "0000",
    }
  },
  { sequelize, modelName: "Paciente", tableName: "PACIENTE", timestamps: false }
);

module.exports = Customer;

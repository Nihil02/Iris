const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../database/connection.js");
const Paciente = require("./customer.js");
class Exam extends Model {}

Exam.init(
  {
    cliente: {
      type: DataTypes.STRING(18),
      references: {
        model: Paciente,
        key: "CURP",
      },
      primaryKey: true,
    },
    fecha: {
      type: DataTypes.STRING(10), // De acuerdo al protocolo ISO 8601
      allowNull: false,
      primaryKey: true,
    },
    rx: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lejos_od_esferico: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lejos_od_cilindrico: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lejos_od_eje: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lejos_od_agudeza_visual: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lejos_oi_esferico: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lejos_oi_cilindrico: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lejos_oi_eje: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lejos_oi_agudeza_visual: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    adicion_od_esferico: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    adicion_oi_esferico: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tipo_lentes: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    observaciones: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { sequelize, modelName: "Examen", tableName: "EXAMEN", timestamps: false }
);

module.exports = Exam;

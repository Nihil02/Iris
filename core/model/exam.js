const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../database/connection.js");
const Customer = require("./customer.js");
class Exam extends Model {}

Exam.init(
  {
    cliente: {
      type: DataTypes.STRING,
      references: {
        model: Customer,
        key: "id",
        allowNull: false
      },
      onDelete: "CASCADE",
      primaryKey: true,
    },
    fecha: {
      type: DataTypes.STRING(10), // De acuerdo al protocolo ISO 8601
      primaryKey: true,
    },
    dp_od: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    dp_oi: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    oblea: {
      type: DataTypes.NUMBER,
      allowNull: true,
    },
    lejos_od_esferico: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    lejos_od_cilindrico: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    lejos_od_eje: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    lejos_od_agudeza_visual: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    lejos_oi_esferico: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    lejos_oi_cilindrico: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    lejos_oi_eje: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    lejos_oi_agudeza_visual: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    adicion_od_esferico: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    adicion_oi_esferico: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    tipo_lentes: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    observaciones: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  { sequelize, modelName: "Examen", tableName: "EXAMEN", timestamps: false }
);

module.exports = Exam;

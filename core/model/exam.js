const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../database/connection.js");
const Paciente = require("./customer.js");
const Customer = require("./customer.js");
class Exam extends Model {}

Exam.init(
  {
    cliente: {
      type: DataTypes.STRING(18),
      references: {
        model: Paciente,
        key: "CURP",
        onDelete: "CASCADE",
        allowNull: false
      },
      primaryKey: true
    },
    fecha: {
      type: DataTypes.STRING(10), // De acuerdo al protocolo ISO 8601
      primaryKey: true
    },
    dp_od: {
      type: DataTypes.NUMBER,
      allowNull: true,
    },
    dp_oi: {
      type: DataTypes.NUMBER,
      allowNull: true,
    },
    oblea: {
      type: DataTypes.NUMBER,
      allowNull: true
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
      type: DataTypes.NUMBER,
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
      type: DataTypes.NUMBER,
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
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    observaciones: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  { sequelize, modelName: "Examen", tableName: "EXAMEN", timestamps: false }
);

Customer.hasMany(Exam)

module.exports = Exam;

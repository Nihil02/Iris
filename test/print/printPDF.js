const PrintService = require("../../core/service/printService.js");
const generateExamFormat = require("../../public/examPdfFormat.js");

const exameDate = "21/05/2022";
const clientInfo = {
  name: "Rafael García Mendoza",
  genre: "Masculino",
  adress: "Calle Palma 908, Col Del Bosque",
  birthdate: "21/05/2002",
};
const rightEye = {
  dp: 1,
  lejos_esferico: 2,
  lejos_cilindrico: 3,
  lejos_eje: 4,
  lejos_agudeza_visual: 5,
  adicion_esferico: 6,
};
const leftEye = {
  dp: 1,
  lejos_esferico: 2,
  lejos_cilindrico: 3,
  lejos_eje: 4,
  lejos_agudeza_visual: 5,
  adicion_esferico: 6,
};
const oblea = 2;
const lentType = "xd";
const observations = "Bla bla bla";

const format = generateExamFormat(
  exameDate,
  clientInfo,
  rightEye,
  leftEye,
  oblea,
  lentType,
  observations
);

const path = `${process.cwd()}` 
PrintService.printToPDF(format, path, "test.pdf");
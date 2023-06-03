import { bgImage } from "./image";

/**
 * Eye information resentation.
 *
 * @typedef {Interface} IOjoInfo
 * @property {(string | number)} dp
 * @property {(string | number)} lejos_esferico
 * @property {(string | number)} lejos_cilindrico
 * @property {(string | number)} lejos_eje
 * @property {(string | number)} lejos_agudeza_visual
 * @property {(string | number)} adicion_esferico
 */
interface IOjoInfo {
  dp: string | number;
  lejos_esferico: string | number;
  lejos_cilindrico: string | number;
  lejos_eje: string | number;
  lejos_agudeza_visual: string | number;
  adicion_esferico: string | number;
}

/**
 * Generates a PDF format for an exam for be used in the PDF Service.
 *
 * @param {string} fechaExamen - The date of the exam, must be in ISO 8601 format, e.g. "2023-05-21".
 * @param {string} cliente - Name of the client
 * @param {IOjoInfo} ojoIzquierdoInfo - Information of the left eye, see {@link IOjoInfo}
 * @param {IOjoInfo} ojoDerechoInfo - Information of the rigth eye, see {@link IOjoInfo}
 * @param {string | number} oblea
 * @param {string} tipoLente
 * @param {string} observaciones - Observations
 * @returns {object} An object representing the PDF format to be used in the PrintService.
 */
const generateExamFormat = (
  fechaExamen: string,
  cliente: string,
  ojoDerechoInfo: IOjoInfo,
  ojoIzquierdoInfo: IOjoInfo,
  oblea: string,
  tipoLente: string,
  observaciones: string
) => {
  const info = {
    widths: ["auto", "*", "auto", "auto"],
    body: [
      [
        {
          text: "NOMBRE:",
          style: "info_header",
          border: [false, false, false, false],
        },
        {
          text: cliente,
          border: [false, false, false, true],
        },
        {
          text: "FECHA",
          style: "info_header",
          border: [false, false, false, false],
        },
        {
          text: fechaExamen,
          border: [false, false, false, true],
        },
      ],
    ],
  };

  const rx = {
    widths: [100, "auto", 75, 75, 75, "auto"],
    body: [
      [
        { text: "", bold: true, border: [false, false, false, false] },
        { text: "", bold: true, border: [false, false, false, false] },
        { text: "ESFÉRICO", style: "rx_header" },
        { text: "CILÍNDRICO", style: "rx_header" },
        { text: "EJE", style: "rx_header" },
        { text: "AGUDEZA VISUAL", style: "rx_header" },
      ],
      [
        {
          text: "LEJOS",
          margin: [0, 10, 0, 10],
          rowSpan: 2,
          bold: true,
          border: [false, false, false, true],
        },
        {
          text: "OD",
          style: "rx_header",
          border: [false, false, false, false],
        },
        { text: ojoDerechoInfo.lejos_esferico, alignment: "center" },
        { text: ojoDerechoInfo.lejos_cilindrico, alignment: "center" },
        { text: ojoDerechoInfo.lejos_eje, alignment: "center" },
        { text: ojoDerechoInfo.lejos_agudeza_visual, alignment: "center" },
      ],
      [
        { text: "", border: [false, false, false, false] },
        { text: "OI", style: "rx_header", border: [false, false, false, true] },
        { text: ojoIzquierdoInfo.lejos_esferico, alignment: "center" },
        { text: ojoIzquierdoInfo.lejos_cilindrico, alignment: "center" },
        { text: ojoIzquierdoInfo.lejos_eje, alignment: "center" },
        { text: ojoIzquierdoInfo.lejos_agudeza_visual, alignment: "center" },
      ],
      [
        {
          text: "ADICIÓN",
          margin: [0, 10, 0, 10],
          rowSpan: 2,
          bold: true,
          border: [false, false, false, true],
        },
        { text: "OD", style: "rx_header", border: [false, true, false, false] },
        { text: ojoDerechoInfo.adicion_esferico, alignment: "center" },
        {
          text: "TIPO DE LENTES",
          bold: true,
          colSpan: 3,
          border: [true, true, true, false],
        },
      ],
      [
        { text: "", border: [false, false, false, false] },
        {
          text: "OI",
          style: "rx_header",
          border: [false, false, false, false],
        },
        { text: ojoIzquierdoInfo.adicion_esferico, alignment: "center" },
        { text: tipoLente, colSpan: 3, border: [true, false, true, true] },
      ],
      [
        {
          text: "DP",
          margin: [0, 10, 0, 10],
          rowSpan: 2,
          bold: true,
          border: [false, false, false, false],
        },
        { text: "OD", style: "rx_header", border: [false, true, false, false] },
        { text: ojoDerechoInfo.dp, alignment: "center" },
        {
          text: "OBLEA",
          bold: true,
          colSpan: 3,
          border: [true, true, true, false],
        },
      ],
      [
        { text: "", border: [false, false, false, false] },
        {
          text: "OI",
          style: "rx_header",
          border: [false, false, false, false],
        },
        { text: ojoIzquierdoInfo.dp, alignment: "center" },
        { text: oblea, colSpan: 3, border: [true, false, true, true] },
      ],
    ],
  };

  const docDefinition = {
    pageSize: "A5",
    pageOrientation: "landscape",
    /*watermark: {
      text: "Óptica Modelo",
      color: "green",
      opacity: 0.1,
      bold: true,
      italics: true,
    },*/
    background: [
      { text: "\n\n\n\n" },
      {
        width: 250,
        image: bgImage,
        style: "background",
      },
    ],
    content: [
      {
        table: info,
      },
      { text: "\n\n" },
      { text: "RX", style: "header" },
      {
        columns: [
          { width: "*", text: "" },
          {
            width: "auto",
            table: rx,
          },
        ],
      },
      { text: "\n\n" },
      { text: "OBSERVACIONES:", style: "header" },
      {
        text: observaciones,
        aligment: "justify",
        decoration: "underline",
      },
      {
        margin: [0, 10, 0, 0],
        columns: [
          {
            width: "*",
            text: [
              "___________________________________\n",
              "LIC. OPT. CONCEPCIÓN Ma. GONZALEZ CASTILLO\n",
              "CRED. PROF. No. 02105510",
            ],
            style: "firma",
          },
          {
            width: "*",
            text: [
              "___________________________________\n",
              "OPT. JORGE GONZALEZ A.\n",
              "CRED. PROF. No. 574966",
            ],
            style: "firma",
          },
        ],
      },
    ],

    styles: {
      header: {
        bold: true,
        margin: [0, 0, 0, 5],
      },
      rx_header: {
        bold: true,
        alignment: "center",
      },
      info_header: {
        bold: true,
        margin: [0, 0, 0, 0],
      },
      firma: {
        fontSize: 8,
        alignment: "center",
        bold: true,
      },
      background: {
        alignment: "center",
      },
    },
  };

  return docDefinition;
};

export default generateExamFormat;

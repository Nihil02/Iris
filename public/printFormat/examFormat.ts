/**
 * Representation of the information of a client.
 *
 * @typedef {Object} InfoCliente
 * @property {string} nombre
 * @property {string} sexo
 * @property {string} fechaDeNacimiento
 */

/**
 * Eye information resentation.
 *
 * @typedef {Object} OjoInfo
 * @property {(string | number)} dp
 * @property {(string | number)} lejos_esferico
 * @property {(string | number)} lejos_cilindrico
 * @property {(string | number)} lejos_eje
 * @property {(string | number)} lejos_agudeza_visual
 * @property {(string | number)} adicion_esferico
 */

/**
 * Generates a PDF format for an exam for be used in the PDF Service.
 *
 * @param {string} fechaExamen - The date of the exam, must be in ISO 8601 format, e.g. `2023-05-21`.
 * @param {InfoCliente} infoCliente - Information of the client, see {@link InfoCliente}
 * @param {OjoInfo} ojoIzquierdoInfo - Information of the left eye, see {@link OjoInfo}
 * @param {OjoInfo} ojoDerechoInfo - Information of the rigth eye, see {@link OjoInfo}
 * @param {string | number} oblea
 * @param {string} tipo_lente
 * @param {string} observaciones
 * @returns {object} An object representing the PDF format to be used in the PrintService.
 */
const generateExamFormat = (
  fechaExamen = "",
  infoCliente = {},
  ojoIzquierdoInfo = {},
  ojoDerechoInfo = {},
  oblea = "",
  tipo_lente = "",
  observaciones = ""
) => {
  const examTable = {
    headerRows: 5,
    body: [
      // Encabezados de ojos
      [
        {
          text: "Ojo izquierdo",
          colSpan: 2,
          alignment: "center",
        },
        {},
        {
          border: [false, false, false, false],
          text: "",
        },
        {
          border: [false, false, false, false],
          text: "",
        },
        {
          border: [false, false, false, false],
          text: "",
        },
        {
          text: "Ojo derecho",
          colSpan: 2,
          alignment: "center",
        },
        {},
      ],
      // Encabezados de Característica valor
      [
        { text: "Característica", style: "tableHeader", alignment: "center" },
        { text: "Valor", style: "tableHeader", alignment: "center" },
        {
          border: [false, false, false, false],
          text: "",
        },
        {
          border: [false, false, false, false],
          text: "",
        },
        {
          border: [false, false, false, false],
          text: "",
        },
        { text: "Característica", style: "tableHeader", alignment: "center" },
        { text: "Valor", style: "tableHeader", alignment: "center" },
      ],
      // Fila DP
      [
        { text: "dp", style: "tableHeader", alignment: "center" },
        { text: ojoDerechoInfo.dp, style: "tableHeader", alignment: "center" },
        {
          border: [false, false, false, false],
          text: "",
        },
        {
          border: [false, false, false, false],
          text: "",
        },
        {
          border: [false, false, false, false],
          text: "",
        },
        { text: "dp", style: "tableHeader", alignment: "center" },
        {
          text: ojoIzquierdoInfo.dp,
          style: "tableHeader",
          alignment: "center",
        },
      ],
      // Fila lejos_esferico
      [
        { text: "lejos_esferico", style: "tableHeader", alignment: "center" },
        {
          text: ojoDerechoInfo.lejos_esferico,
          style: "tableHeader",
          alignment: "center",
        },
        {
          border: [false, false, false, false],
          text: "",
        },
        {
          border: [false, false, false, false],
          text: "",
        },
        {
          border: [false, false, false, false],
          text: "",
        },
        { text: "lejos_esferico", style: "tableHeader", alignment: "center" },
        {
          text: ojoIzquierdoInfo.lejos_esferico,
          style: "tableHeader",
          alignment: "center",
        },
      ],
      // Fila lejos_cilindrico
      [
        { text: "lejos_cilindrico", style: "tableHeader", alignment: "center" },
        {
          text: ojoDerechoInfo.lejos_cilindrico,
          style: "tableHeader",
          alignment: "center",
        },
        {
          border: [false, false, false, false],
          text: "",
        },
        {
          border: [false, false, false, false],
          text: "",
        },
        {
          border: [false, false, false, false],
          text: "",
        },
        { text: "lejos_cilindrico", style: "tableHeader", alignment: "center" },
        {
          text: ojoIzquierdoInfo.lejos_cilindrico,
          style: "tableHeader",
          alignment: "center",
        },
      ],
      // Fila lejos_eje
      [
        { text: "lejos_eje", style: "tableHeader", alignment: "center" },
        {
          text: ojoDerechoInfo.lejos_eje,
          style: "tableHeader",
          alignment: "center",
        },
        {
          border: [false, false, false, false],
          text: "",
        },
        {
          border: [false, false, false, false],
          text: "",
        },
        {
          border: [false, false, false, false],
          text: "",
        },
        { text: "lejos_eje", style: "tableHeader", alignment: "center" },
        {
          text: ojoIzquierdoInfo.lejos_eje,
          style: "tableHeader",
          alignment: "center",
        },
      ],
      // Fila lejos_agudeza_visual
      [
        {
          text: "lejos_agudeza_visual",
          style: "tableHeader",
          alignment: "center",
        },
        {
          text: ojoDerechoInfo.lejos_agudeza_visual,
          style: "tableHeader",
          alignment: "center",
        },
        {
          border: [false, false, false, false],
          text: "",
        },
        {
          border: [false, false, false, false],
          text: "",
        },
        {
          border: [false, false, false, false],
          text: "",
        },
        {
          text: "lejos_agudeza_visual",
          style: "tableHeader",
          alignment: "center",
        },
        {
          text: ojoIzquierdoInfo.lejos_agudeza_visual,
          style: "tableHeader",
          alignment: "center",
        },
      ],
      // Fila adicion_esferico
      [
        { text: "adicion_esferico", style: "tableHeader", alignment: "center" },
        {
          text: ojoDerechoInfo.adicion_esferico,
          style: "tableHeader",
          alignment: "center",
        },
        {
          border: [false, false, false, false],
          text: "",
        },
        {
          border: [false, false, false, false],
          text: "",
        },
        {
          border: [false, false, false, false],
          text: "",
        },
        { text: "adicion_esferico", style: "tableHeader", alignment: "center" },
        {
          text: ojoIzquierdoInfo.adicion_esferico,
          style: "tableHeader",
          alignment: "center",
        },
      ],
    ],
  };

  const clientInfoTable = {
    headerRows: 1,
    body: [
      [{ text: "Nombre" }, { text: infoCliente.name }],
      [{ text: "Sexo" }, { text: infoCliente.genre }],
      [{ text: "Domicilio" }, { text: infoCliente.adress }],
      [{ text: "Fecha de nacimiento" }, { text: infoCliente.birthdate }],
    ],
  };

  const docDefinition = {
    pageSize: "A5",
    pageOrientation: "landscape",
    content: [
      { text: `Examen` },
      { text: `Fecha: ${fechaExamen}` },
      { text: `Información del cliente.` },
      {
        columns: [
          { width: "*", text: "" },
          {
            width: "auto",
            table: clientInfoTable,
          },
          { width: "*", text: "" },
        ],
      },
      { text: "Resultados del examen." },
      {
        columns: [
          { width: "*", text: "" },
          {
            width: "auto",
            table: examTable,
          },
          { width: "*", text: "" },
        ],
      },
    ],
  };

  return docDefinition;
};

export default generateExamFormat;

/**
 * Generates a PDF format for a supplier for be used in the PDF Service.
 *
 * @param {string} razonSocial - .
 * @returns {object} An object representing the PDF format to be used in the PrintService.
 */
const generateSupplierFormat = (
  razonSocial: string,
  domicilio: string,
  telefono: string,
  correo: string,
  cuenta: number
) => {
  const supplierTable = {
    widths: ["auto", "*"],
    body: [
      [{ text: "Domicilio", bold: true }, { text: domicilio }],
      [{ text: "Número de Telefono", bold: true }, { text: telefono }],
      [{ text: "Correo Electrónico", bold: true }, { text: correo }],
      [{ text: "Cuenta Bancaria", bold: true }, { text: cuenta }],
    ],
  };

  const docDefinition = {
    pageSize: "A5",
    pageOrientation: "landscape",
    content: [
      { text: razonSocial + "\n", style: "header" },
      {
        table: supplierTable,
      },
    ],

    styles: {
      header: {
        fontSize: 18,
        bold: true,
        alignment: "center",
        margin: [0, 0, 0, 10],
      },
    },
  };

  return docDefinition;
};

export default generateSupplierFormat;

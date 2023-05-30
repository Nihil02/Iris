import { bgImage } from "./image";

interface ISupplier {
  RFC: string;
  razonSocial: string;
  domicilio: string;
  telefono: string;
  correo: string;
  cuenta: string | number;
}

/**
 * Generates a PDF format for a supplier for be used in the PDF Service.
 *
 * @param {string} razonSocial - .
 * @returns {object} An object representing the PDF format to be used in the PrintService.
 */
const generateSupplierFormat = (supplier: ISupplier) => {
  const supplierTable = {
    widths: ["auto", "*"],
    body: [
      [
        { text: "RFC", bold: true, fillColor: "#CCCCCC" },
        { text: supplier.RFC, fillColor: "#CCCCCC" },
      ],
      [{ text: "Domicilio", bold: true }, { text: supplier.domicilio }],
      [
        { text: "Número de Telefono", bold: true, fillColor: "#CCCCCC" },
        { text: supplier.telefono, fillColor: "#CCCCCC" },
      ],
      [{ text: "Correo Electrónico", bold: true }, { text: supplier.correo }],
      [
        { text: "Cuenta Bancaria", bold: true, fillColor: "#CCCCCC" },
        { text: supplier.cuenta, fillColor: "#CCCCCC" },
      ],
    ],
  };

  const docDefinition = {
    pageSize: "A5",
    pageOrientation: "landscape",
    background: [
      { text: "\n\n\n\n" },
      {
        width: 250,
        image: bgImage,
        style: "background",
      },
    ],
    content: [
      { text: "DATOS DEL PROVEEDOR" + "\n", style: "header" },
      { text: supplier.razonSocial + "\n", style: "header" },
      {
        columns: [
          {
            width: "*",
            text: "",
          },
          {
            width: 300,
            table: supplierTable,
          },
          {
            width: "*",
            text: "",
          },
        ],
      },
    ],

    styles: {
      header: {
        fontSize: 18,
        bold: true,
        alignment: "center",
        margin: [0, 0, 0, 10],
      },
      background: {
        alignment: "center",
      },
    },
  };

  return docDefinition;
};

export default generateSupplierFormat;

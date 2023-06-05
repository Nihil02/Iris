import { bgImage } from "./image";

interface ICliente {
  nombre: string;
  domicilio: string;
  telefono: string;
  fecNac: string;
  sexo: string;
}

/**
 * Generates a PDF format for a supplier for be used in the PDF Service.
 *
 * @param {string} nombre - .
 * @returns {object} An object representing the PDF format to be used in the PrintService.
 */
const generateSupplierFormat = (cliente: ICliente) => {
  const clientTable = {
    widths: ["auto", "*"],
    body: [
      [{ text: "Sexo", bold: true }, { text: cliente.sexo }],
      [
        { text: "Fecha de Nacimiento", bold: true, fillColor: "#CCCCCC" },
        { text: cliente.fecNac, fillColor: "#CCCCCC" },
      ],
      [{ text: "Domicilio", bold: true }, { text: cliente.domicilio }],
      [
        { text: "Número de Telefono", bold: true, fillColor: "#CCCCCC" },
        { text: cliente.telefono, fillColor: "#CCCCCC" },
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
      { text: "DATOS DEL CLIENTE" + "\n", style: "header" },
      { text: cliente.nombre + "\n", style: "header" },
      {
        columns: [
          {
            width: "*",
            text: "",
          },
          {
            width: 300,
            table: clientTable,
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

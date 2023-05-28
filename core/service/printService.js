const PdfPrinter = require("pdfmake");
const fs = require("fs");
const { app } = require("electron");

/**
 * The print service is designed to be used since anotother services, e.g exams and suppliers.
 */
class PrintService {
  /**
   * Recives a `format` in a form of a JSON and transforms him into a PDF document.
   * @param {JSON} format
   * @param {string} [pathPDF] The path where the file is going to be saved
   * @param {string} filename
   */
  static async printToPDF(format, pathPDF, filename) {
    const electronPath = app.getAppPath();
    const fontsPath = `${electronPath}/public/fonts`;

    const fonts = {
      Roboto: {
        normal: `${fontsPath}/Roboto-Regular.ttf`,
        bold: `${fontsPath}/Roboto-Medium.ttf`,
        italics: `${fontsPath}/fonts/Roboto-Italic.ttf`,
        bolditalics: `${fontsPath}/Roboto-MediumItalic.ttf`,
      },
    };
    if (pathPDF.trim() === "") {
      throw new Error("No given path");
    }
    if (filename === undefined) {
      filename = "foo";
    }
    if (filename.includes(".pdf")) {
      filename = filename.replace(".pdf", "");
    }
    
    process.env.IS_DEV === "true"? (null):(pathPDF = "core/electron/build")

    pathPDF = pathPDF.replace("/", "\\\\").replace(".", "");
    const finalUrl = `${electronPath}\\${pathPDF}\\${filename}.pdf`;
    
    const printer = new PdfPrinter(fonts);

    const pdfDoc = printer.createPdfKitDocument(format);
    pdfDoc.pipe(fs.createWriteStream(finalUrl));
    pdfDoc.end();

    return `${electronPath}\\${pathPDF}\\${filename}.pdf`;
  }
}

module.exports = PrintService;

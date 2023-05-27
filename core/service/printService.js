const PdfPrinter = require("pdfmake");
const fs = require("fs");

/**
 * The print service is designed to be used since anotother services, e.g exams and suppliers.
 */
class PrintService {
  /**
   * Recives a `format` in a form of a JSON and transforms him into a PDF document.
   * @param {JSON} format
   * @param {string} path The path where the file is going to be saved
   * @param {string} filename
   */
  static printToPDF(format, path, filename) {
    const fontsPath = `${process.cwd()}/public/fonts`
    const fonts = {
      Roboto: {
        normal: `${fontsPath}/Roboto-Regular.ttf`,
        bold: `${fontsPath}/Roboto-Medium.ttf`,
        italics: `${fontsPath}/fonts/Roboto-Italic.ttf`,
        bolditalics: `${fontsPath}/Roboto-MediumItalic.ttf`,
      },
    };

    if (filename === undefined) {
      filename = "foo";
      console.log("Hola " + filename);
    }

    if (filename.includes(".pdf")) {
        filename = filename.replace(".pdf", "");
    }
    const finalUrl = `${path}/${filename}.pdf`;
    const printer = new PdfPrinter(fonts);
    const pdfDoc = printer.createPdfKitDocument(format);
    pdfDoc.pipe(fs.createWriteStream(finalUrl));
    pdfDoc.end();
  }
}

module.exports = PrintService;

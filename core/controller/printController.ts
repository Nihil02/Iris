interface IPrintAPI {
    printToPdf: (format:Object, path: string, filename?:string) => void
}

declare global {
    interface Window {
        printAPI: IPrintAPI
    }
}

class PrintController {
    /**
     * 
     *Create a pdf with a given format and location.
     * 
     * @param {Object} format - The pdf format in the form of `json`
     * @param {string} path - The ubication where the pdf is going to bre created
     */
    static printToPdf(format: Object, path: string, filename?: string) {
        window.printAPI.printToPdf(format, path, filename);
    }
}

export { PrintController }
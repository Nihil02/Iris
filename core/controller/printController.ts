interface IPrintAPI {
    printToPdf: (format:Object, path?: string, filename?:string) => void
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
     */
    static printToPdf(format: Object) {
        window.printAPI.printToPdf(format);
    }
}

export { PrintController }
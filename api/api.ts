class API {
    /**
     * 
     * @returns a JSON array of costumers.
     */
    static async getAllSuppliers() {
        const res = await window.modelAPI.getAllProveedores();
        return res;
    }
}

export default API
class API {
    /**
     * 
     * @returns a JSON array of costumers.
     */
    static async getAllSuppliers() {
        const res = await window.modelAPI.getAllProveedores();
        const costumers = res.map(costumer => {
            return costumer.dataValues;
        });
        return res;
    }
}

export default API
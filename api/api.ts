interface Data {
    dataValues: Object
}
class API {
    /**
     * @returns Promise with JSON array costumers
     */
    static async getAllSuppliers():Promise<Object[]> {
        const res:Array<Data> = await window.modelAPI.getAllProveedores();
        const costumers = res.map(costumer => {
            return costumer.dataValues;
        });
        return costumers;
    }
}

export default API
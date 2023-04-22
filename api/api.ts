interface Data {
  dataValues: Object;
}
class API {
  /**
   * @returns Promise with JSON array suppliers
   */
  static async getAllSuppliers() {
    const res: Array<Data> = await window.modelAPI.getAllSuppliers();

    const suppliers = res.map((supplier) => {
      return supplier.dataValues;
    });
    
    return suppliers;
  }
}

export default API;

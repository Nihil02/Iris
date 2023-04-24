class API {
  /**
   * @returns Promise with JSON array suppliers
   */
  static async getAllSuppliers() {
    const res: Array<Data> = await window.supplierAPI.getAllSuppliers();
    return res;
  }
}

export default API;

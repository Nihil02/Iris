const SupplierRepository = require("../repository/supplierRepository.js");

class SupplerService {
  static async getAllSupliers() {
    const res = await SupplierRepository.getAllSuppliers();
    const suppliers = res.map((supplier) => {
      return supplier.dataValues;
    });
    return suppliers;
  }
}

module.exports = SupplerService;

class K {
  static Employee = {
    getAllEmployees: "getAllEmployees",
    getEmployeeByRFC: "getEmployeeByRFC",
    createEmployee: "createEmployee",
    updateEmployee: "updateEmployee",
    deleteEmployee: "deleteEmployee",
    authEmployee: "authEmployee"
  };

  static Exam = {};

  static Supplier = {
    getAllSuppliers: "getAllSuppliers",
    getSupplierByRFC: "getSupplierByRFC",
    createSupplier: "createSupplier",
    updateSupplier: "updateSupplier",
    deleteSupplier: "deleteSupplier"
  };

  static Costumer = {
    getAllCostumers: "getAllCostumers",
    getCostumerById: "getCostumerById",
    createCostumer: "createCostumer",
    updateCostumer: "updateCostumer",
    deleteCostumer: "deleteCostumer"
  };
}

module.exports = K;

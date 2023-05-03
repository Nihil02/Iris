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

  static Customer = {
    getAllCustomers: "getAllCustomers",
    getCustomerById: "getCustomerById",
    createCustomer: "createCustomer",
    updateCustomer: "updateCustomer",
    deleteCustomer: "deleteCustomer"
  };
}

module.exports = K;

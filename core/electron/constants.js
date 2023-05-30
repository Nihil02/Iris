class K {
  static Employee = {
    getAllEmployees: "getAllEmployees",
    getEmployeeByRFC: "getEmployeeByRFC",
    createEmployee: "createEmployee",
    updateEmployee: "updateEmployee",
    deleteEmployee: "deleteEmployee",
    authEmployee: "authEmployee",
  };

  static Exam = {
    getAllExams: "getAllExams",
    getExamById: "getExamById",
    addExam: "addExam",
    updateExam: "updateExam",
    deleteExam: "deleteExam"
  };

  static Supplier = {
    getAllSuppliers: "getAllSuppliers",
    getSupplierByRFC: "getSupplierByRFC",
    createSupplier: "createSupplier",
    updateSupplier: "updateSupplier",
    deleteSupplier: "deleteSupplier",
  };

  static Customer = {
    getAllCustomers: "getAllCustomers",
    getCustomerById: "getCustomerById",
    createCustomer: "createCustomer",
    updateCustomer: "updateCustomer",
    deleteCustomer: "deleteCustomer",
  };

  static Backup = {
    createBackUp: "createBackUp",
    getBackUp: "getBackUp"
  };

  static Print = {
    printToPdf: "printToPdf"
  }
}

module.exports = K;

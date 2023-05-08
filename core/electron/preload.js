const { contextBridge, ipcRenderer } = require("electron");
const K = require("./constants.js");

const employeeAPI = {
  getAllEmployees: () => ipcRenderer.invoke(K.Employee.getAllEmployees),
  getEmployeeByRFC: (rfc) => ipcRenderer.invoke(K.Employee.getEmployeeByRFC, rfc),
  createEmployee: (user) => ipcRenderer.invoke(K.Employee.createEmployee, user),
  updateEmployee: (user) => ipcRenderer.invoke(K.Employee.updateEmployee, user),
  deleteEmployee: (rfc) => ipcRenderer.invoke(K.Employee.deleteEmployee, rfc),
  authEmployee: (username, password) =>
    ipcRenderer.invoke(K.Employee.authEmployee, username, password),
};

const supplierAPI = {
  getAllSuppliers: () => ipcRenderer.invoke(K.Supplier.getAllSuppliers),
  getSupplierByRFC: (rfc) => ipcRenderer.invoke(K.Supplier.getSupplierByRFC, rfc),
  createSupplier: (supplier) => ipcRenderer.invoke(K.Supplier.createSupplier, supplier),
  updateSupplier: (supplier) => ipcRenderer.invoke(K.Supplier.updateSupplier, supplier),
  deleteSupplier: (rfc) => ipcRenderer.invoke(K.Supplier.createSupplier, rfc),
}

const customerAPI = {
  getAllCustomers: () => ipcRenderer.invoke(K.Customer.getAllCustomers),
  getCustomerById: (id) => ipcRenderer.invoke(K.Customer.getCustomerById, id),
  createCustomer: (customer) => ipcRenderer.invoke(K.Customer.createCustomer, customer),
  updateCustomer: (customer) => ipcRenderer.invoke(K.Customer.updateCustomer, customer),
  deleteCustomer: (id) => ipcRenderer.invoke(K.Customer.deleteCustomer, id),
}

const examAPI = {
  getAllExams: (curp) => ipcRenderer.invoke(K.Exam.getAllExams),
  getExamById: (curp, date) => ipcRenderer.invoke(K.Exam.getExamById),
  addExam: (exam) => ipcRenderer.invoke(K.Exam.addExam),
  updateExam: (exam) => ipcRenderer.invoke(K.Exam.updateExam)
}

contextBridge.exposeInMainWorld("supplierAPI", supplierAPI);

contextBridge.exposeInMainWorld("employeeAPI", employeeAPI);

contextBridge.exposeInMainWorld("customerAPI", customerAPI);

contextBridge.exposeInMainWorld("examAPI", examAPI);

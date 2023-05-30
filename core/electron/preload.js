const { contextBridge, ipcRenderer } = require("electron");
const K = require("./constants.js");

const employeeAPI = {
  getAllEmployees: () => ipcRenderer.invoke(K.Employee.getAllEmployees),
  getEmployeeByRFC: (rfc) =>
    ipcRenderer.invoke(K.Employee.getEmployeeByRFC, rfc),
  createEmployee: (user) => ipcRenderer.invoke(K.Employee.createEmployee, user),
  updateEmployee: (user) => ipcRenderer.invoke(K.Employee.updateEmployee, user),
  deleteEmployee: (rfc) => ipcRenderer.invoke(K.Employee.deleteEmployee, rfc),
  authEmployee: (username, password) =>
    ipcRenderer.invoke(K.Employee.authEmployee, username, password),
};

const supplierAPI = {
  getAllSuppliers: () => ipcRenderer.invoke(K.Supplier.getAllSuppliers),
  getSupplierByRFC: (rfc) =>
    ipcRenderer.invoke(K.Supplier.getSupplierByRFC, rfc),
  createSupplier: (supplier) =>
    ipcRenderer.invoke(K.Supplier.createSupplier, supplier),
  updateSupplier: (supplier) =>
    ipcRenderer.invoke(K.Supplier.updateSupplier, supplier),
  deleteSupplier: (rfc) => ipcRenderer.invoke(K.Supplier.deleteSupplier, rfc),
};

const customerAPI = {
  getAllCustomers: () => ipcRenderer.invoke(K.Customer.getAllCustomers),
  getCustomerById: (id) => ipcRenderer.invoke(K.Customer.getCustomerById, id),
  createCustomer: (customer) =>
    ipcRenderer.invoke(K.Customer.createCustomer, customer),
  updateCustomer: (customer) =>
    ipcRenderer.invoke(K.Customer.updateCustomer, customer),
  deleteCustomer: (id) => ipcRenderer.invoke(K.Customer.deleteCustomer, id),
};

const examAPI = {
  getAllExams: (curp) => ipcRenderer.invoke(K.Exam.getAllExams, curp),
  getExamById: (curp, date) =>
    ipcRenderer.invoke(K.Exam.getExamById, curp, date),
  addExam: (exam) => ipcRenderer.invoke(K.Exam.addExam, exam),
  updateExam: (exam) => ipcRenderer.invoke(K.Exam.updateExam, exam),
  deleExam: (curp) => ipcRenderer.invoke(K.Exam.deleteExam, curp)
};

const backUpAPI = {
  createBackUp: (src, dest) =>
    ipcRenderer.invoke(K.Backup.createBackUp, src, dest),
  getBackUp: () => ipcRenderer.invoke(K.Backup.getBackUp),
};

const printAPI = {
  printToPdf: (format, path, filename) =>
    ipcRenderer.invoke(K.Print.printToPdf, format, path, filename),
};

contextBridge.exposeInMainWorld("supplierAPI", supplierAPI);

contextBridge.exposeInMainWorld("employeeAPI", employeeAPI);

contextBridge.exposeInMainWorld("customerAPI", customerAPI);

contextBridge.exposeInMainWorld("examAPI", examAPI);

contextBridge.exposeInMainWorld("backUpAPI", backUpAPI);

contextBridge.exposeInMainWorld("printAPI", printAPI);

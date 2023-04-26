const { contextBridge, ipcRenderer } = require("electron");
const K = require("./constants.js");

const employeeAPI = {
  getAllEmployees: () => ipcRenderer.invoke(K.Employee.getAllEmployees),
  getEmployeeByRFC: (rfc) => ipcRenderer.invoke(K.Employee.getEmployeeByRFC, rfc),
  createEmployee: (user) => ipcRenderer.invoke(K.Employee.createEmployee, user),
  updateEmployee: (user) => ipcRenderer.invoke(K.Employee.updateEmployee, user),
  deleteEmployee: (rfc) => ipcRenderer.invoke(K.Employee.deleteEmployee, rfc),
  authEmployee: (username, password) =>
    ipcRenderer.invoke(K.Employee.authEmployee),
};
contextBridge.exposeInMainWorld("supplierAPI", {
  getAllSuppliers: () => ipcRenderer.invoke(K.Supplier.getAllSuppliers),
});

contextBridge.exposeInMainWorld("employeeAPI", employeeAPI);

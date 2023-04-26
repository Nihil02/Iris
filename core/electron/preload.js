const { contextBridge, ipcRenderer } = require("electron");
const K = require("./constants.js");

const employeeAPI = {
  getAllEmployees: () => ipcRenderer.invoke(K.Employee.getAllEmployees),
  getEmployeeByRFC: (rfc) => ipcRenderer.invoke(K.Employee.getEmployeeByRFC),
  createEmployee: (user) => ipcRenderer.invoke(K.Employee.createEmployee),
  editEmployee: (user) => ipcRenderer.invoke(K.Employee.editEmployee),
  deleteEmployee: (rfc) => ipcRenderer.invoke(K.Employee.deleteEmployee),
  authEmployee: (username, password) =>
    ipcRenderer.invoke(K.Employee.authEmployee),
};
contextBridge.exposeInMainWorld("supplierAPI", {
  getAllSuppliers: () => ipcRenderer.invoke(K.Supplier.getAllSuppliers),
});

contextBridge.exposeInMainWorld("employeeAPI", employeeAPI);

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

const supplierAPI = {
  getAllSuppliers: () => ipcRenderer.invoke(K.Supplier.getAllSuppliers),
  getSupplierByRFC: (rfc) => ipcRenderer.invoke(K.Supplier.getSupplierByRFC, rfc),
  createSupplier: (supplier) => ipcRenderer.invoke(K.Supplier.createSupplier, supplier),
  updateSupplier: (supplier) => ipcRenderer.invoke(K.Supplier.updateSupplier, supplier),
  deleteSupplier: (rfc) => ipcRenderer.invoke(K.Supplier.createSupplier, rfc),
}

const costumerAPI = {
  getAllCostumers: () => ipcRenderer.invoke(K.Costumer.getAllCostumers),
  getCostumerById: (id) => ipcRenderer.invoke(K.Costumer.getCostumerById, id),
  createCostumer: (costumer) => ipcRenderer.invoke(K.Costumer.createCostumer, costumer),
  updateCostumer: (costumer) => ipcRenderer.invoke(K.Costumer.updateCostumer, costumer),
  deleteCostumer: (id) => ipcRenderer.invoke(K.Costumer.createCostumer, id),
}

contextBridge.exposeInMainWorld("supplierAPI", supplierAPI);

contextBridge.exposeInMainWorld("employeeAPI", employeeAPI);

contextBridge.exposeInMainWorld("costumerAPI", costumerAPI);

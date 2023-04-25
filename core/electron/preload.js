const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("supplierAPI", {
  getAllSuppliers: () => ipcRenderer.invoke("getAllSuppliers"),
});

contextBridge.exposeInMainWorld("employeeAPI", {
  getAllEmployees: () => ipcRenderer.invoke("getAllEmployees"),
  getEmployeeByRFC: (rfc) => ipcRenderer.invoke("getEmployeeById"),
  createEmployee: (user) => ipcRenderer.invoke("createEmployee"),
  editEmployee: (user) => ipcRenderer.invoke("editEmployee"),
  deleteEmployee: (rfc) => ipcRenderer.invoke("deleteEmployee"),
  authEmployee: (username, password) => ipcRenderer.invoke("authEmployee")
});

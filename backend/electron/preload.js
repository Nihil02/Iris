const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("supplierAPI", {
  getAllSuppliers: () => ipcRenderer.invoke("getAllSuppliers"),
});

contextBridge.exposeInMainWorld("userAPI", {
  getAllUsers: () => ipcRenderer.invoke("getAllUsers"),
});

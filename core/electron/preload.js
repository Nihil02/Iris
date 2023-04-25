const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("supplierAPI", {
  getAllSuppliers: () => ipcRenderer.invoke("getAllSuppliers"),
});

contextBridge.exposeInMainWorld("userAPI", {
  getAllUsers: () => ipcRenderer.invoke("getAllUsers"),
  getUserByRFC: (rfc) => ipcRenderer.invoke("getUserById"),
  createUser: (user) => ipcRenderer.invoke("createUser"),
  editUser: (user) => ipcRenderer.invoke("editUser"),
  deleteUser: (rfc) => ipcRenderer.invoke("deleteUser")
});

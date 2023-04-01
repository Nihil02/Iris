const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('modelAPI',{
    getAllSuppliers: () => ipcRenderer.invoke('getAllSuppliers')
});
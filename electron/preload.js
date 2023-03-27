const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('modelAPI',{
    getAllProveedores: () => ipcRenderer.invoke('getAllProveedores')
});
const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const {
  Employee,
  Costumer,
  Exam,
  Supplier,
} = require("../database/model.js");

if (require('electron-squirrel-startup')) {
  app.quit();
}

const isDev = process.env.IS_DEV === 'true';

const createWindow = async () => {
  const win = new BrowserWindow({
    title: "Iris",
    minWidth: 800,
    minHeight: 600,
    width: 1024,
    height: 768,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  if (isDev) {
    await win.loadURL("http://localhost:5173");
    win.webContents.openDevTools({ mode: 'detach' });
  } else {
    win.loadFile(path.join(__dirname, "build", "index.html"));
    win.setMenu(null);
  }
};

app.whenReady().then(() => {
  createWindow();
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  win = null;
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("second-instance", () => {
  if (win) {
    if (win.isMinimized()) {
      win.restore();
    }
    win.focus();
  }
});

app.on("activate", () => {
  const allWindows = BrowserWindow.getAllWindows();
  if (allWindows.length) {
    allWindows[0].focus();
  } else {
    createWindow();
  }
});

ipcMain.handle('getAllSuppliers', async () => {
  const res = await Supplier.findAll();
  return res;
});

ipcMain.handle('getAllPacientes', async () => {
  const res = await Paciente.findAll();
  return res;
});
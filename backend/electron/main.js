const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const Supplier = require("../model/supplier.js");
const EmployeeRepository = require("../repository/employeeRepository.js");
const CostumerRepository = require("../repository/costumerRepository.js");

if (require("electron-squirrel-startup")) {
  app.quit();
}

const isDev = process.env.IS_DEV === "true";

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
    win.webContents.openDevTools({ mode: "detach" });
  } else {
    win.loadFile(path.join(__dirname, "build", "index.html"));
    win.setMenu(null);
  }
};

app.whenReady().then(() => {
  createWindow();
  app.on("activate", function () {
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

// Supplier
ipcMain.handle("getAllSuppliers", async () => {
  const res = await Supplier.findAll();
  return res;
});

// Costumer
ipcMain.handle("getAllCostumers", async () => {
  CostumerRepository.getAllCostumers();
});

// Employee

// Get all users
ipcMain.handle("getAllUsers", async () => {
  EmployeeRepository.getAllEmployees();
});
// Get user by rfc
ipcMain.handle("getUserByRFC", async (emplooyeRFC) => {
  EmployeeRepository.getEmployeeById(emplooyeRFC);
});

// Create user
ipcMain.handle("createUser", async (employee) => {
  EmployeeRepository.createEmployee(employee);
});

ipcMain.handle("editUser", async (employee) => {
  EmployeeRepository.updateEmployee(employee);
});

ipcMain.handle("deleteUser", async (employeeRFC) => {
  EmployeeRepository.deleteEmployee(employeeRFC);
});

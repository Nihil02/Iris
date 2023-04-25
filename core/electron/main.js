const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const EmployeeService = require("../service/employeeService.js");
const SupplierService = require("../service/supplierService.js");
const ExamService = require("../service/examService.js");
const CostumerService = require("../service/costumerService.js");

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
ipcMain.handle("getAllSuppliers", async () => {});

// Costumer
ipcMain.handle("getAllCostumers", async () => {});

// Employee

// Get all users
ipcMain.handle("getAllEmployees", async () => {
  EmployeeService.getAllEmployees();
});
// Get user by rfc
ipcMain.handle("getEmployeeByRFC", async (emplooyeRFC) => {
  EmployeeService.getEmployeeById(emplooyeRFC);
});

// Create user
ipcMain.handle("createEmployee", async (employee) => {
  EmployeeService.createEmployee(employee);
});

ipcMain.handle("editEmployee", async (employee) => {
  EmployeeService.updateEmployee(employee);
});

ipcMain.handle("deleteEmployee", async (employeeRFC) => {
  EmployeeService.deleteEmployee(employeeRFC);
});

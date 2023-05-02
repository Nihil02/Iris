const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const K = require("./constants.js");
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
      sandbox: false,
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

// Supplier handlers

// Get all suppliers
ipcMain.handle(K.Supplier.getAllSuppliers, async () => {
    return await SupplierService.getAllSuppliers();
});

// Get supplier by RFC
ipcMain.handle(K.Supplier.getSupplierByRFC, async (event, rfc) => {
    return await SupplierService.getSupplierByRFC(rfc);
});

// Create a supplier
ipcMain.handle(K.Supplier.createSupplier, async (event, supplier) => {
    return await SupplierService.createSupplier(supplier);
});

// Update a supplier
ipcMain.handle(K.Supplier.updateSupplier, async (event, supplier) => {
    return await SupplierService.updateSupplier(supplier);
});

// Delete a supplier
ipcMain.handle(K.Supplier.deleteSupplier, async (event, rfc) => {
    return await SupplierService.deleteSupplier(rfc);
});

// Costumer handlers

// get all costumers
ipcMain.handle(K.Costumer.getAllCostumers, async () => {
    return await CostumerService.getAllCostumers();
});

// get costumber by id
ipcMain.handle(K.Costumer.getCostumerById, async (event, id) => {
    return await CostumerService.getCostumerById(id);
});

// create Costumer
ipcMain.handle(K.Costumer.createCostumer, async (event, costumer) => {
    return await CostumerService.createCostumber(costumer);
});

// update Costumer
ipcMain.handle(K.Costumer.updateCostumer, async (event, costumer) => {
    return await CostumerService.updateCostumber(costumer);
});

// delete Costumer
ipcMain.handle(K.Costumer.deleteCostumer, async (event, id) => {
    return await CostumerService.deleteCostumber(id);
});

// Employee handlers

// Get all employees
ipcMain.handle(K.Employee.getAllEmployees, async () => {
  return await EmployeeService.getAllEmployees();
});
// Get employee by rfc
ipcMain.handle(K.Employee.getEmployeeByRFC, async (event, emplooyeRFC) => {
  return await EmployeeService.getEmployeeByRFC(emplooyeRFC);
});

// Create employee
ipcMain.handle(K.Employee.createEmployee, async (event, employee) => {
  return await EmployeeService.createEmployee(employee);
});

// Edit employee
ipcMain.handle(K.Employee.updateEmployee, async (event, employee) => {
  return await EmployeeService.updateEmployee(employee);
});

// Delete employee
ipcMain.handle(K.Employee.deleteEmployee, async (event, employeeRFC) => {
  return await EmployeeService.deleteEmployee(employeeRFC);
});

const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const path = require("path");
const K = require("./constants.js");
const { sequelize } = require("../database/connection.js");
const EmployeeService = require("../service/employeeService.js");
const SupplierService = require("../service/supplierService.js");
const ExamService = require("../service/examService.js");
const CustomerService = require("../service/customerService.js");
const BackUpService = require("../service/backUpService.js");
const PrintService = require("../service/printService.js");

if (require("electron-squirrel-startup")) {
  app.quit();
}

const isDev = process.env.IS_DEV === "true";

const createWindow = async () => {
  await sequelize.sync();
  const win = new BrowserWindow({
    title: "Iris",
    minWidth: 800,
    minHeight: 600,
    width: 1024,
    height: 768,
    icon: path.join(__dirname, "build", "logo.ico"),
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      sandbox: false,
    },
  });

  if (isDev) {
    await win.loadURL("http://localhost:5173");
    win.webContents.openDevTools({ mode: "detach" });
    win.setIcon(path.join(__dirname, "..", "..", "public", "logo.ico"));
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

//Electron Path
module.exports = { path };

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

// Customer handlers

// get all customers
ipcMain.handle(K.Customer.getAllCustomers, async () => {
  return await CustomerService.getAllCustomers();
});

// get costumber by id
ipcMain.handle(K.Customer.getCustomerById, async (event, id) => {
  return await CustomerService.getCustomerByCURP(id);
});

// create Customer
ipcMain.handle(K.Customer.createCustomer, async (event, customer) => {
  return await CustomerService.createCustomer(customer);
});

// update Customer
ipcMain.handle(K.Customer.updateCustomer, async (event, customer) => {
  return await CustomerService.updateCustomer(customer);
});

// delete Customer
ipcMain.handle(K.Customer.deleteCustomer, async (event, id) => {
  return await CustomerService.deleteCustomer(id);
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

// Exam

ipcMain.handle(K.Exam.getAllExams, async (event, curp) => {
  return await ExamService.getAllExam(curp);
});

ipcMain.handle(K.Exam.getExamById, async (event, curp, date) => {
  return await ExamService.getExamById(curp, date);
});

ipcMain.handle(K.Exam.addExam, async (event, exam) => {
  return await ExamService.createExam(exam);
});

ipcMain.handle(K.Exam.deleteExam, async (event, curp) => {
  return await ExamService.deleteExam(curp);
});

ipcMain.handle(K.Exam.updateExam, async (event, exam) => {
  return await ExamService.updateExam(exam);
});

// Backup
ipcMain.handle(K.Backup.createBackUp, (event, src, dest) => {
  BackUpService.createBackUp(src, dest);
});

ipcMain.handle(K.Backup.getBackUp, () => {
  BackUpService.getBackUp();
});

// Print service
ipcMain.handle(K.Print.printToPdf, (event, format, path, filename) => {
  PrintService.printToPDF(format, path, filename);
});

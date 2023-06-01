const {
  createEmployee,
  createSupplier,
  createCustomer,
  createExam,
} = require("./generator");
const Employee = require("../../core/model/employee.js");
const Customer = require("../../core/model/customer.js");
const Exam = require("../../core/model/exam.js");
const Supplier = require("../../core/model/supplier.js");
const { sequelize } = require("../../core/database/connection");
const fs = require("fs");

(async () => {
  const employees = [];
  const suppliers = [];
  const customers = [];
  const exams = [];

  for (let i = 0; i <= 1_0; i++) {
    console.log(`i - ${i}`);
    employees.push(createEmployee());
    suppliers.push(createSupplier());
    const tmp = createCustomer();
    customers.push(tmp);
    for (let j = 0; j <= 10; j++) {
      console.log(`j - ${j}`);
      exams.push(createExam(tmp.CURP));
    }
  }
  try {
    await sequelize.sync();
    await Employee.bulkCreate(employees);
    await Supplier.bulkCreate(suppliers);
    await Customer.bulkCreate(customers);
    await Exam.bulkCreate(exams);
  } catch (e) {
    const dbPath = `${process.cwd()}/core/database/iris.db`;
    await sequelize.close();
    setTimeout(() => {
      fs.rmSync(dbPath);
    }, 100);
    console.log(e);
  }
})();

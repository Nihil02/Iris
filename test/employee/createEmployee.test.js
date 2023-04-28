const EmployeeService = require("../../core/service/employeeService.js");
const { sequelize } = require("../../core/database/connection.js");
const { QueryTypes } = require("sequelize");

test("Test 1 - Invalid RFC", async () => {
  const employee = {
    rfc: "xd",
    name: "Rafael",
    firstLastName: "García",
    secondLastName: "Mendoza",
    username: "raynou",
    privileges: "Administrador",
    password: "12345",
  };
  const res = await EmployeeService.createEmployee(employee);
  expect(res).toBe(false);
});

test("Test 2 - Valid employee", async () => {
  const employee = {
    rfc: "VESL001114SNA",
    name: "Luis",
    firstLastName: "Verdugo",
    secondLastName: "Santos",
    username: "mock-pepito",
    privileges: "Administrador",
    password: "12345",
  };
  const res = await EmployeeService.createEmployee(employee);
  expect(res).toBe(true);
});

test("Test 3 - Invalid name", async () => {});

test("Test 4 - Invalid first last name", async () => {});

test("Test 5 - Invalid second last name", async () => {});

test("Test 6 - Null password", async () => {
  const employee = {
    rfc: "GOMP020121E52",
    name: "Luis",
    firstLastName: "Verdugo",
    secondLastName: "Santos",
    username: "mock-pepote",
    privileges: "Normal",
    password: "",
  };

  const res = await EmployeeService.createEmployee(employee);
  expect(res).toBe(false);
})

afterAll(async () => {
  try {
    await sequelize.query("DELETE FROM EMPLEADO WHERE usuario LIKE 'mock%'", {
      type: QueryTypes.DELETE,
    });
  } catch (error) {
    console.log(error);
  }
});

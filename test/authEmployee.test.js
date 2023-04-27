const EmplooyeeService = require("../core/service/employeeService.js");
const { sequelize } = require("../core/database/connection.js");
const { QueryTypes } = require("sequelize");

beforeAll(async () => {
  try {
    const employee = {
      rfc: "GOMP020121E52",
      name: "Mrmock",
      firstLastName: "Data",
      secondLastName: "Alabama",
      username: "mock",
      privileges: "Administrador",
      password: "12345",
    };
    await EmplooyeeService.createEmployee(employee);

    const noPassEmployee = {
      rfc: "MACF060713HP4",
      name: "MrNoPass",
      firstLastName: "Lol",
      secondLastName: "XD",
      username: "mock-nopass",
      privileges: "Administrador",
      password: "",
    };
    await EmplooyeeService.createEmployee(noPassEmployee);
  } catch (error) {
    console.log(error);
  }
});

test("Test 1 - Non-existent user", async () => {
  const res = await EmplooyeeService.authEmployee({
    user: "Pepito",
    password: "12345",
  });
  expect(res).toBe(false);
});

test("Test 2 - Incorrect password", async () => {
  const res = await EmplooyeeService.authEmployee({
    user: "mock",
    password: "incorrectPassword",
  });
  expect(res).toBe(false);
});

test("Test 3 - Correct user and password", async () => {
  const res = await EmplooyeeService.authEmployee({
    user: "mock",
    password: "12345",
  });
  expect(res).toBe(true);
});

test("Test 4 - User with no password", async () => {
  const res = await EmplooyeeService.authEmployee({
    user: "mock-nopass",
    password: "",
  });
  expect(res).toBe(true);
});
afterAll(async () => {
  try {
    await sequelize.query("DELETE FROM EMPLEADO WHERE usuario like 'mock%'", {
      type: QueryTypes.DELETE,
    });
  } catch (error) {
    console.error(error);
  }
});

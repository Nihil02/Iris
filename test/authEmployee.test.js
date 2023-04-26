const EmplooyeeService = require("../core/service/employeeService.js");
const { sequelize } = require("../core/database/connection.js");
const { QueryTypes } = require("sequelize");

beforeAll(async () => {
  try {
    await sequelize.query(
      "INSERT INTO EMPLEADO VALUES (?, ?, ?, ?, ?, ?, ?)",
      {
        type: QueryTypes.INSERT,
        replacements: ['GOMP020121E52', 'Mr.Mock', 'Data', 'Alabama', 'mock', 'Administrador', '12345']
      }
    );
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

afterAll(async () => {
  try {
    await sequelize.query("DELETE FROM EMPLEADO WHERE usuario = 'mock'", {
      type: QueryTypes.DELETE,
    });
  } catch (error) {
    console.error(error);
  }
});

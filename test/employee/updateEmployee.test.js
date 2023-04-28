const EmplooyeeService = require("../../core/service/employeeService.js");

beforeEach(async () => {
  const emplooye = {
    rfc: "GOMP020121E52",
    name: "Mrmock",
    firstLastName: "Data",
    secondLastName: "Alabama",
    username: "mock",
    privileges: "Administrador",
    password: "12345",
  };
  await EmplooyeeService.createEmployee(emplooye);
});

afterEach(async () => {
  const rfc = "GOMP020121E52";
  await EmplooyeeService.deleteEmployee(rfc);
});

test("Test 1 - Update employee without password property", async () => {
  const emplooye = {
    rfc: "GOMP020121E52",
    name: "Mrmock",
    firstLastName: "Houston",
    secondLastName: "Texas",
    username: "mock",
    privileges: "Administrador",
    password: "12345",
  };
  const res = await EmplooyeeService.updateEmployee(emplooye);
  expect(res).toBe(true);
});

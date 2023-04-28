const EmployeeService = require("../../core/service/employeeService.js");

beforeAll(async () => {
  const employee = {
    rfc: "VESL001114SNA",
    name: "Luis",
    firstLastName: "Verdugo",
    secondLastName: "Santos",
    username: "mock-pepito",
    privileges: "Administrador",
    password: "12345",
  };
  await EmployeeService.createEmployee(employee);
});

test("Test 1 - Find an existent employee", async () => {
  const rfc = "VESL001114SNA";
  const res = await EmployeeService.getEmployeeByRFC(rfc);
  expect(typeof res).toBe("object");
});

test("Test 2 - Find an non-existent employee", async () => {
  const rfc = "xd";
  const res = await EmployeeService.getEmployeeByRFC(rfc);
  expect(res).toBe(false);
});

afterAll(async () => {
  const rfc = "VESL001114SNA";
  await EmployeeService.deleteEmployee(rfc);
});

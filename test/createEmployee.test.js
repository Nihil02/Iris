const EmployeeService = require("../core/service/employeeService.js");

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
  expect(typeof res).toBe("object");
});

test("Test 2 - Valid employee", async () => {
  const employee = {
    rfc: "VESL001114SNA",
    name: "Luis",
    firstLastName: "Verdugo",
    secondLastName: "Santos",
    username: "pepito",
    privileges: "Administrador",
    password: "12345",
  };
  const res = await EmployeeService.createEmployee(employee);
  expect(res).toBe(true);
});

// TODO: Create a method for delete mock users

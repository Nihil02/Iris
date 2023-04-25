const EmployeeService = require("../core/service/employeeService.js");

test("Test 1 - Invalid RFC", async () => {
  const employee = {
    rfc: "xd",
    name: "Rafael",
    firstLastName: "García",
    secondLastName: "Mendoza",
    password: "12345",
  };
  const res = await EmployeeService.createEmployee(employee);
  expect(typeof res).toBe("object");
});

test("Test 2 - Valid employee", async () => {
  const employee = {
    rfc: "VESL001114SNA",
    name: "Rafael",
    firstLastName: "García",
    secondLastName: "Mendoza",
    password: "12345",
  };
  const res = await EmployeeService.createEmployee(employee);
  expect(res).toBe(true);
});

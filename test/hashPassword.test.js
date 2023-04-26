const EmplooyeeService = require("../core/service/employeeService.js");

test("Test 1 - Expect hash", () => {
  const mySuperSecretPasswordOhMyGod = "12345";
  const res = EmplooyeeService.hashPassword(mySuperSecretPasswordOhMyGod);
  console.log(typeof res);
  const isEuqual = mySuperSecretPasswordOhMyGod === res;
  expect(isEuqual).toBe(false);
});

test("Test 2 - Compare a password", () => {
  const hash = EmplooyeeService.hashPassword("12345");
  const myPasword = "12345";

  const myHashedPassword = EmplooyeeService.hashPassword(myPasword);

  const isEqual = hash === myHashedPassword;
  expect(isEqual).toBe(true);
});

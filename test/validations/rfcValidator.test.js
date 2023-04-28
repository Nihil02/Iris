const validator = require("../../core/validation/validator.js");

test("Test 1 - None", () => {
  const rfc = "";
  const res = validator.isRFC(rfc);
  expect(res).toBe(false);
});

test("Test 2 - Valid RFC", () => {
  const rfc = "GOMP020121E52";
  const res = validator.isRFC(rfc);
  expect(res).toBe(true);
});

test("Test 3 - With spaces", () => {
  const rfc = "APEJ90 0101HDFXXX07";
  const res = validator.isRFC(rfc);
  expect(res).toBe(false);
})

test("Test 4 - Incomplete RFC", () => {
  const rfc = "APEJ900101HDFXXX0";
  const res = validator.isRFC(rfc);
  expect(res).toBe(false);
})

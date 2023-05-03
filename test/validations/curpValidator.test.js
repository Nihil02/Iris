const { isCURP } = require("../../core/validation/validator.js");

test("Test 1 - Valid curp", () => {
  const curp = "GAMR020521HTSRNFA3";
  const res = isCURP(curp);
  expect(res).toBe(true);
});

test("Test 2 - Invalid CURP", () => {
  const curp = "GAMR020521HTSRN";
  const res = isCURP(curp);
  expect(res).toBe(false);
});

test("Test 3 -  Nothing", () => {
  const curp = "";
  const res = isCURP(curp);
  expect(res).toBe(false);
});

test("Test 4 -  Only numbers", () => {
  const curp = 12346;
  const res = isCURP(curp);
  expect(res).toBe(false);
});
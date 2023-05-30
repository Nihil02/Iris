const Validator = require("../../core/validation/validator.js");

test("Test 1 - Only numbers", () => {
  const name = "1245";
  const isValid = Validator.isName(name);
  expect(isValid).toBe(false);
});

test("Test 2 - Name with numbers", () => {
  const name = "2Samuel2";
  const isValid = Validator.isName(name);
  expect(isValid).toBe(false);
});

test("Test 3 - Void string", () => {
  const name = "";
  const isValid = Validator.isName(name);
  expect(isValid).toBe(false);
});

test("Test 4 - Special characters", () => {
  const name = "@&&";
  const isValid = Validator.isName(name);
  expect(isValid).toBe(false);
});

test("Test 5 - A normal name", () => {
  const name = "Rosa";
  const isValid = Validator.isName(name);
  expect(isValid).toBe(true);
});

test("Test 6 - Normal name with special characters (used in the spanish)", () => {
  const name = "García";
  const isValid = Validator.isName(name);
  expect(isValid).toBe(true);
});

test("Test 7 - Normal name with special characters (belonging to no language)", () => {
  const name = "G@rcía";
  const isValid = Validator.isName(name);
  expect(isValid).toBe(false);
});

test("Test 8 - Name with spaces", () => {
  const names = ["Del Angel", "Rosa María", "María del Carmen", "De la Cruz", "Del Toro", "De la Torre"];
  const results = names.map((name) => Validator.isName(name));
  results.forEach((result) => {
    expect(result).toBe(true);
  });
});

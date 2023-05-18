const Validator = require("../../core/validation/validator.js");

test("Test 1", () => {
  const email = "rafaelgame2012@gmail.com";
  expect(Validator.isEmail(email)).toBe(true);
});

test("Test 2", () => {
  const email = "rafaelgame2012@@gmail.com";
  expect(Validator.isEmail(email)).toBe(false);
});

test("Test 3", () => {
  const email = "rafaelgame2012@gmail..com";
  expect(Validator.isEmail(email)).toBe(false);
});

test("Test 4", () => {
  const email = "rafaelgame2012@gmail.com.";
  expect(Validator.isEmail(email)).toBe(false);
});

import API from "../api/api";

test("Test 1", () => {
  const result = API.getAllSuppliers();
  expect(result).toBe("");
});

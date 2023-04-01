import API from "../api/api";
import { describe, expect, it } from "vitest";

describe("Get All", () => {
  const result = API.getAllSuppliers();
  console.log(result);
  it("Supliers", () => {
    expect("").toBe("");
  });
});

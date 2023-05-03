/* Admin privileges */
let admin = true;

function isAdmin(priv: boolean) {
  admin = priv;
}
function getAdmin() {
  return admin;
}
export { getAdmin, isAdmin };

/* Controllers */
import {
  Employee,
  EmployeeController,
} from "../../core/controller/employeeController";
export { Employee, EmployeeController };

import {
  Costumer,
  CostumerController,
} from "../../core/controller/costumerController";
export { Costumer, CostumerController };

import {
  Supplier,
  SupplierController,
} from "../../core/controller/supplierController";
export { Supplier, SupplierController };

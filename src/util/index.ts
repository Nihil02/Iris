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
  Customer,
  customerController
} from "../../core/controller/costumerController";
export { Customer, customerController };

import {
  Supplier,
  SupplierController,
} from "../../core/controller/supplierController";
export { Supplier, SupplierController };

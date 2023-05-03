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
  CustomerController
} from "../../core/controller/customerController";
export { Customer, CustomerController };

import {
  Supplier,
  SupplierController,
} from "../../core/controller/supplierController";
export { Supplier, SupplierController };

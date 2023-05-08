/* Admin privileges */
let admin = true;

function isAdmin(priv: boolean) {
  admin = priv;
}
function getAdmin() {
  return admin;
}
export { getAdmin, isAdmin };

/* Date Format */
function dateFormat(date: string) {
  return date.slice(0, 4) + "-" + date.slice(4, 6) + "-" + date.slice(6);
}
function dateIntFormat(date: string){
  return date.replaceAll("-", "");
}
export { dateFormat, dateIntFormat };

/* Controllers */
import {
  Employee,
  EmployeeController,
} from "../../core/controller/employeeController";
export { Employee, EmployeeController };

import {
  Customer,
  CustomerController,
} from "../../core/controller/customerController";
export { Customer, CustomerController };

import {
  Supplier,
  SupplierController,
} from "../../core/controller/supplierController";
export { Supplier, SupplierController };

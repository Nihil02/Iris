/* Admin privileges */
let admin = true;

/**
 * @returns set the value of priv.
 */
function isAdmin(priv: boolean) {
  admin = priv;
}
/**
 * @returns true if the user has admin privileges or false if not.
 */
function getAdmin() {
  return admin;
}
export { getAdmin, isAdmin };

/* Date Format */
/**
 * Recives a string called date with the format YYYYMMDD.
 * @returns the string in format YYYY-MM-DD
 */
function dateFormat(date: string) {
  return date.slice(0, 4) + "-" + date.slice(4, 6) + "-" + date.slice(6);
}
/**
 * Recives a string called date with the format YYYY-MM-DD.
 * @returns the string in format YYYYMMDD
 */
function dateIntFormat(date: string) {
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

import { Exam, ExamController } from "../../core/controller/examController";
export { Exam, ExamController };

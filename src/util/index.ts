/* Admin privileges */
let admin = true;

function isAdmin(priv: boolean) {
  admin = priv;
}
function getAdmin() {
  return admin
}
export {getAdmin, isAdmin}

/* Controllers */
import {
  Employee,
  EmployeeController,
} from "../../core/controller/employeeController";
export { Employee, EmployeeController };

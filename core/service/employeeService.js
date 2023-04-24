const EmployeeRepository = require("../repository/employeeRepository.js");

class EmployeeService {
  static async getAllEmployees() {
    const res = await EmployeeRepository.getAllEmployees();
    const employees = res.forEach((employee) => {
      return employee.dataValues;
    });
    return employees;
  }

  static async getEmployeeByRFC(rfc) {
    const employee = await EmployeeRepository.getEmpleeByRFC(rfc);
    return employee.dataValues;
  }

  static async createEmployee(employee) {
    try {
      /* Validations goes here */
      await EmployeeRepository.createEmployee(employee);
      return true;
    } catch (e) {
      console.err(e);
      return false;
    }
  }

  static async updateEmployee(employee) {
    try {
      /* Validations goes here */
      await EmployeeRepository.updateEmployee(employee);
      return false;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  static async deleteEmployee(rfc) {
    try {
      await EmployeeRepository.deleteEmployee(rfc);
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  static async authEmployee({ rfc, password }) {
    try {
      const employee = EmployeeRepository.getEmpleeByRFC(rfc);
      /* Hashing goes here */
      return employee.password === password;
    } catch (e) {
      console.error(e);
      return false;
    }
  }
}

module.exports = EmployeeService;

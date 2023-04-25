const EmployeeRepository = require("../repository/employeeRepository.js");
const Validator = require("../validation/validator.js");

class EmployeeService {
  static async getAllEmployees() {
    const res = await EmployeeRepository.getAllEmployees();
    const employees = res.map((employee) => {
      return employee.dataValues;
    });
    return employees;
  }

  /**
   * Finds an employee by his RFC and returns him if exists.
   * @param RFC - The RFC of the Employee.
   * @returns An object with the employee data.
   */
  static async getEmployeeByRFC(rfc = "") {
    try {
      const sanitizedRFC = rfc.trim();
      if (!Validator.isRFC(sanitizedRFC)) {
        throw Error("Invalid RFC");
      }
      const employee = await EmployeeRepository.getEmpleeByRFC(rfc);
      return employee[0].dataValues;
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Recives an object with the data of the employee and creates him in the database.
   * @returns True if the user has been created in other case throws an error.
   */
  static async createEmployee(employee) {
    try {
      const sanitizedEmployee = this.sanitizeEmployee(employee);
      const validation = this.isValidEmployee(sanitizedEmployee);

      if(typeof validation === 'object') {
        throw validation;
      }
      const findEmployee = await this.getEmployeeByRFC(sanitizedEmployee.rfc);
      if(findEmployee) {
        throw new Error("Employee already exists");
      }

      return await EmployeeRepository.createEmployee(sanitizedEmployee);
    } catch (error) {
      return error;
    }
  }

  static async updateEmployee(employee) {
    try {
      /* Validations goes here */
      await EmployeeRepository.updateEmployee(employee);
      return false;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  static async deleteEmployee(rfc) {
    try {
      await EmployeeRepository.deleteEmployee(rfc);
      return true;
    } catch (error) {
      console.error(error);
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

  static sanitizeEmployee(employee) {
    let { rfc, name, firstLastName, secondLastName, password } = employee;
    rfc = rfc.trim();
    name = name.trim();
    firstLastName = firstLastName.trim();
    secondLastName = secondLastName.trim();
    password = this.hashPassword(password);

    return {
      rfc: rfc,
      name: name,
      firstLastName: firstLastName,
      secondLastName: secondLastName,
      password: password,
    };
  }

  static hashPassword(password) {
    return password;
  }

  static isValidEmployee(employee) {
    const { rfc, name, firstLastName, secondLastName, password } = employee;
    if (!Validator.isName(name)) {
      return new Error("Invalid name");
    }

    if (!Validator.isName(firstLastName)) {
      return new Error("Invalid first last name");
    }

    if (!Validator.isName(secondLastName)) {
      return new Error("Invalid second last name");
    }

    if (!Validator.isRFC(rfc)) {
      return new Error("Invalid RFC");
    }
    return true;
  }
}

module.exports = EmployeeService;

const EmployeeDAO = require("../DAO/employeeDAO.js");
const Validator = require("../validation/validator.js");
const crypto = require("crypto");

class EmployeeService {
  /**
   * Returns all employees in the database.
   */
  static async getAllEmployees() {
    const res = await EmployeeDAO.getAllEmployees();
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
      if (await this.areNoEmployees()) {
        throw Error("There is no employee in the database");
      }
      if (!Validator.isRFC(sanitizedRFC)) {
        throw Error("Invalid RFC");
      }
      const employee = await EmployeeDAO.getEmployeeByRFC(rfc);
      return employee.dataValues;
    } catch (error) {
      console.log(error);
      // If the employee don't exists
      return false;
    }
  }

  /**
   * Returns true if not exists employees in the database.
   */
  static async areNoEmployees() {
    const res = await this.getAllEmployees();
    return res.length === 0;
  }

  /**
   * Recives an object with the data of the employee and creates him in the database.
   * @returns True if the user has been created in other case throws an error.
   */
  static async createEmployee(employee) {
    try {
      const res = this.validateEmployee(employee);

      if (!res.isValid) {
        throw res.error;
      }

      // Creates the password for the user.
      res.employee.password = this.createPassword(employee.password);

      const findEmployee = await this.getEmployeeByRFC(res.employee.rfc);
      if (findEmployee) {
        throw new Error("Employee already exists");
      }
      return await EmployeeDAO.createEmployee(res.employee);
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  /**
   * Recives an existent employee with changes and valdiates the new data, thus saves the changes in db.
   * @returns Boolean in function of the results of the update operation.
   */
  static async updateEmployee(employee) {
    try {
      const res = this.validateEmployee(employee);
      if (!res.isValid) {
        throw res.error;
      }
      await EmployeeDAO.updateEmployee(res.employee);
      if (employee.password !== undefined || employee.password.trim() !== "") {
        await this.updatePassword({
          username: employee.username,
          password: employee.password,
        });
      }
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  /**
   * Updates the password of a user.
   */

  static async updatePassword({ username, password }) {
    password = this.createPassword(password);
    return await EmployeeDAO.updatePassword({
      username: username,
      password: password,
    });
  }

  /**
   * Deletes an employee.
   * @returns true if the employee has been deleted, otherwise returns false.
   */
  static async deleteEmployee(rfc) {
    try {
      await EmployeeDAO.deleteEmployee(rfc);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  /**
   * Auths an employee with a username & password.
   * @returns true is the credentials are correct.
   */
  static async authEmployee({ user, password }) {
    try {
      const employee = await EmployeeDAO.getEmployeeByUsername(user);
      password = this.hashPassword(password);
      return employee[0].dataValues.contrasenna === password;
    } catch (error) {
      // Error at search the employee
      // console.log(`For user(${user}): ${error}`);
      return false;
    }
  }

  /**
   * Recives an object and sanitizes his attributes and returns [true, employee] if has not problems, in other case
   * returns [false, error].
   * @returns [true, employee] | [false, error]
   */
  static sanitizeEmployee(employee) {
    const {
      rfc = "",
      name = "",
      firstLastName = "",
      secondLastName = "",
      username = "",
      privileges = "",
    } = employee;

    for (const [key, value] of Object.entries(employee)) {
      if (key !== "password" && value.trim() === "") {
        return [false, new Error(`${key} is null`)];
      }
    }
    const sanitizedEmployee = {
      rfc: rfc.trim(),
      name: name.trim(),
      firstLastName: firstLastName.trim(),
      secondLastName: secondLastName.trim(),
      privileges: privileges.trim(),
      user: username.trim(),
    };

    return [true, sanitizedEmployee];
  }
  /**
   * Creates a hashed password.
   */
  static createPassword(password) {
    if (password.trim() === "") {
      throw new Error("Null password");
    }
    console.log(password);
    return this.hashPassword(password.trim());
  }
  /**
   * Recives a password an hashes him.
   * @param password - string.
   * @returns Hash of the password.
   */
  static hashPassword(password) {
    password = crypto.createHash("sha256").update(password).digest("hex");
    return password;
  }

  /**
   * Apply the validations rule for each field of the employee. Return true if is a valid object, otherwise returns
   * false & error.
   *
   * @returns \{ isValid: true } | { isValid: false, error: Error }
   */
  static validateEmployee(employee) {
    const [hasCreated, result] = this.sanitizeEmployee(employee);
    // If a sanitized emplooye hasn't been created, then the result is an error.
    if (!hasCreated) {
      return { isValid: false, error: result };
    }
    const validationRules = [
      { field: "name", validator: Validator.isName },
      { field: "firstLastName", validator: Validator.isName },
      { field: "secondLastName", validator: Validator.isName },
      { field: "rfc", validator: Validator.isRFC },
    ];

    for (const rule of validationRules) {
      const { field, validator } = rule;
      const value = result[field];

      if (!validator(value)) {
        return { isValid: false, error: new Error(`Invalid ${field}`) };
      }
    }
    return { isValid: true, employee: result };
  }
}

module.exports = EmployeeService;

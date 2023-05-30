const EmployeeDAO = require("../DAO/employeeDAO.js");
const Validator = require("../validation/validator.js");
const { EmployeeDTO } = require("../types.js");
const crypto = require("crypto");

class EmployeeService {
  /**
   * Returns all employees in the database.
   * @returns {Promise<[EmployeeDTO]>}
   */
  static async getAllEmployees() {
    const employees = await EmployeeDAO.getAllEmployees();
    return employees;
  }

  /**
   * Finds an employee by his RFC and returns him if exists.
   * @param {string} rfc - The RFC of the Employee.
   * @returns {Promise<EmployeeDTO | boolean>}
   */
  static async getEmployeeByRFC(rfc = "") {
    try {
      /*const sanitizedRFC = rfc.trim();
      if (await this.areNoEmployees()) {
        throw Error("There is no employee in the database");
      }
      if (!Validator.isRFC(sanitizedRFC)) {
        throw Error("Invalid RFC");
      }*/
      const employee = await EmployeeDAO.getEmployeeByRFC(rfc);
      return employee;
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
   * @param {EmployeeDTO} employee
   * @returns True if the user has been created in other case throws an error.
   */
  static async createEmployee(employee) {
    try {
      const res = this.validateEmployee(employee);

      if (!res.isValid) {
        throw res.error;
      }

      // TODO: test this functionality.
      if(employee.password === undefined || employee.password.trim === "") {
        throw new Error("Null password");
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
   * @param {EmployeeDTO} employee
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
   * @param {Object} params
   * @param {string} params.username
   * @param {string} params.password
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
   * @param {string} rfc - RFC of the employee that's going to be deleted.
   * @returns True if the employee has been deleted, otherwise returns false.
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
   * @param {EmployeeDTO} employee
   */
  static sanitizeEmployee(employee) {
    /**@type {EmployeeDTO}*/
    const sanitizedEmployee = {
      rfc: employee.rfc.trim(),
      nombre: employee.nombre.trim(),
      primer_apellido: employee.primer_apellido.trim(),
      segundo_apellido: employee.segundo_apellido.trim(),
      privilegios: employee.privilegios.trim(),
      username: employee.username.trim(),
    };
    console.log(sanitizedEmployee);

    return [true, sanitizedEmployee];
  }
  /**
   * Creates a hashed password.
   */
  static createPassword(password) {
    return this.hashPassword(password.trim());
  }
  /**
   * Recives a password an hashes him.
   * @param {string} password
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
      { field: "nombre", validator: Validator.isName },
      { field: "primer_apellido", validator: Validator.isName },
      { field: "segundo_apellido", validator: Validator.isName },
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

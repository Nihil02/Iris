const Employee = require("../model/employee");
const { EmployeeDTO } = require("../types.js");
class EmployeeDAO {
  /**
   * Returns all emplooyes in the database.
   * @returns {Promise<[EmployeeDTO]>}
   */
  static async getAllEmployees() {
    const res = await Employee.findAll();
    /**@type {[EmployeeDTO]}*/
    const employees = res.map(employee => employee.dataValues);
    return employees;
  }

  /**
   * Finds an employee by his RFC.
   * @param {string} rfc
   * @returns {Promise<EmployeeDTO>}
   */
  static async getEmployeeByRFC(rfc) {
    try {
      const res = await Employee.findByPk(rfc);
      return res.dataValues;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  /**
   * Finds an employee by his username
   * @param {string} user - The user name of the `Employee`.
   * @returns {Promise<EmployeeDTO>}
   */
  static async getEmployeeByUsername(user) {
    try {
      const res = await Employee.findAll({ where: { usuario: user } });
      return res.shift().dataValues;
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Creates an Employee in the database
   * @param {EmployeeDTO} emplooye
   * @returns true if the emplooye was created.
   */
  static async createEmployee(emplooye) {
    try {
      await Employee.create({
        rfc: emplooye.rfc,
        nombre: emplooye.nombre,
        primer_apellido: emplooye.primer_apellido,
        segundo_apellido: emplooye.segundo_apellido,
        privilegios: emplooye.privilegios,
        usuario: emplooye.username,
        contrasenna: emplooye.password,
      });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  /**
   * @param {EmployeeDTO} emplooye
   */
  static async updateEmployee(emplooye) {
    await Employee.update(
      {
        nombre: emplooye.nombre,
        primer_apellido: emplooye.primer_apellido,
        segundo_apellido: emplooye.segundo_apellido,
        privilegios: emplooye.privlegios,
        usuario: emplooye.username,
      },
      {
        where: {
          rfc: emplooye.rfc,
        },
      }
    );
    return true;
  }

  /**
   * @param {Object} params
   * @param {string} params.username
   * @param {string} params.password
   * @returns 
   */
  static async updatePassword({ username, password }) {
    try {
      await Employee.update(
        { contrasenna: password },
        { where: { usuario: username } }
      );
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  /**
   * Finds an employee by his rfc and deletes him.
   * @param {string} rfc
   */
  static async deleteEmployee(rfc) {
    const employee = await Employee.findByPk(rfc);
    await employee.destroy();
    return true;
  }
}

module.exports = EmployeeDAO;

const Employee = require("../model/employee");

class EmployeeDAO {
  /**
   * Returns all emplooyes in the database.
   * @returns Array of Emplooyee's
   */
  static async getAllEmployees() {
    const res = await Employee.findAll();
    return res;
  }

  /**
   * Finds an employee by his RFC.
   * @returns An Employee (Object)
   */
  static async getEmployeeByRFC(rfc) {
    try {
      const res = await Employee.findByPk(rfc);
      return res;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  /**
   * Finds an employee by his username
   * @returns An array of objects representing with the coincidences (in this case only 1).
   */
  static async getEmployeeByUsername(user) {
    try {
      const res = await Employee.findAll({ where: { usuario: user } });
      return res;
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Creates an Employee in the database
   * @returns true if the emplooye was created.
   */
  static async createEmployee(emplooye) {
    try {
      const [
        rfc,
        name,
        firstLastName,
        secondLastName,
        privileges,
        user,
        password,
      ] = Object.values(emplooye);
      await Employee.create({
        rfc: rfc,
        nombre: name,
        primer_apellido: firstLastName,
        segundo_apellido: secondLastName,
        privilegios: privileges,
        usuario: user,
        contrasenna: password,
      });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  /**
   * Update employee information
   */
  static async updateEmployee(emplooye) {
    const [rfc, name, firstLastName, secondLastName, privileges, user] =
      Object.values(emplooye);
    await Employee.update(
      {
        nombre: name,
        primer_apellido: firstLastName,
        segundo_apellido: secondLastName,
        privilegios: privileges,
        usuario: user,
      },
      {
        where: {
          rfc: rfc,
        },
      }
    );
    return true;
  }

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
   */
  static async deleteEmployee(rfc) {
    const employee = await Employee.findByPk(rfc);
    await employee.destroy();
    return true;
  }
}

module.exports = EmployeeDAO;

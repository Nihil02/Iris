const Employee = require("../model/employee");

class EmployeeRepository {

  /**
   * Returns all emplooyes in the database.
   * @returns Array of Emplooyee's
   */
  static async getAllEmployees() {
    const res = Employee.findAll();
    return res;
  }

  /**
   * Finds an employee by his ID.
   * @returns An Employee (Object)
  */
  static async getEmployeeById(id) {
    const res = Employee.findByPk(id);
    return res;
  }

  /**
   * Creates an Employee in the database
   * @returns true if the emplooye was created.
   */
  static async createEmployee({id, name, firstLastName, secondLastName, pasword}) {
    const employee = {
      id: id,
      nombre: name,
      primer_apellido: firstLastName,
      segundo_apellido: secondLastName,
      contrasenna: pasword
    }
    await Employee.create(employee);
    return true;
  }

  /**
   * Update employee information
  */
  static async updateEmployee({id, name, firstLastName, secondLastName, password}) {
    await Employee.update(
      {
        nombre: name,
        primer_apellido: firstLastName,
        segundo_apellido: secondLastName,
        contrasenna: password,
      },
      {
        where: {
          id: id,
        },
      }
    );
  }

  /**
   * Finds an employee by his id and deletes him.
  */
  static async deleteEmployee(id) {
    const employee = await Employee.findByPk(id);
    await employee.destroy();
    return true;
  }
}

module.exports = EmployeeRepository
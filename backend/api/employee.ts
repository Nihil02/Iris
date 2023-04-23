class Employee {
  rfc: string;
  name: string;
  firstLastName: string;
  secondLastName: string;
  password: string;

  constructor(
    rfc: string,
    name: string,
    firstLastName: string,
    secondLastName: string,
    password: string
  ) {
    this.rfc = rfc;
    this.name = name;
    this.firstLastName = firstLastName;
    this.secondLastName = secondLastName;
    this.password = password;
  }
}
class EmployeeAPI {
  /**
   * @returns Promise with JSON array employees
   */
  static async getAllEmployees() {
    const res: Array<Data> = await window.userAPI.getAllEmployees();

    const employees = res.map((employee) => {
      return employee.dataValues;
    });

    return employees;
  }

  /**
   *
   * @param rfc The RFC of the user
   * @returns Employee
   */
  static async getEmployeeByRFC(rfc: string) {
    const res: Data = await window.userAPI.getEmployeeByRFC(rfc);
    return res.dataValues;
  }

  /**
   * Creates a new Employee.
   * @param Employee
   * @returns True if the user has been created
   */

  static async createEmployee(employee: Employee) {
    const res: Boolean = await window.userAPI.createEmployee(user);
    return res;
  }

  /**
   * Deletes an employee
   * @param RFC - The rfc of the employee
   * returns True if the employee has been deleted
   */

  static async deleteEmployee(rfc: string) {
    const res: Boolean = await window.userAPI.deleteEmployee(rfc);
    return res;
  }
}

export { EmployeeAPI, Employee };

interface IEmployeeAPI {
  getAllEmployees: () => Array<Data>,
  getEmployeeByRFC: (rfc: any) => Data,
  createEmployee: (employee: any) => Boolean,
  authEmployee: (username: any, password: any) => Boolean,
  deleteEmployee: (rfc: any) => Boolean
}

declare global {
  interface Window {
    employeeAPI: IEmployeeAPI
  }
}

class EmployeeController {
  /**
   * @returns Promise with JSON array employees
   */
  static async getAllEmployees() {
    const res: Array<Data> = await window.userAPI.getAllUsers();
    console.log(res);
    
    return res;
  }

  /**
   *
   * @param rfc The RFC of the user
   * @returns Employee
   */
  static async getEmployeeByRFC(rfc: string) {
    const res: Data = await window.userAPI.getEmployeeByRFC(rfc);
    return res;
  }

  /*static createEmployeeFromData(data: any): Employee {
    const { rfc, name, firstLastName, secondLastName, password } = data;

    if (!rfc || !name || !firstLastName || !secondLastName || !password) {
      throw new Error("Missing employee data");
    }

    return new Employee(rfc, name, firstLastName, secondLastName, password);
  }*/

  /**
   * Creates a new Employee.
   * @param Employee
   * @returns True if the user has been created
   */

  static async createEmployee(employee: Employee) {
    const res: Boolean = await window.userAPI.createEmployee(employee);
    return res;
  }

  static async authEmployee(rfc: string, password: string) {
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

export { EmployeeController };

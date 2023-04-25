interface IEmployeeAPI {
  getAllEmployees: () => Array<Data>,
  getEmployeeByRFC: (rfc) => Data,
  createEmployee: (employee) => Boolean,
  authEmployee: (username, password) => Boolean,
  deleteEmployee: (rfc) => Boolean
}

declare global {
  interface Window {
    employeeAPI: IEmployeeAPI
  }
}
class EmployeeController {
  static async getAllEmployees() {
    const res: Array<Data> = await window.employeeAPI.getAllEmployees();
    return res;
  }

  static async getEmployeeByRFC(rfc: string) {
    const res: Data = await window.employeeAPI.getEmployeeByRFC(rfc);
    return res;
  }

  static async createEmployee(employee: any) {
    const res: Boolean = await window.employeeAPI.createEmployee(employee);
    return res;
  }

  static async authEmployee(username: string, password: string) {
    const res: Boolean = await window.employeeAPI.authEmployee(username, password);
  }

  static async deleteEmployee(rfc: string) {
    const res: Boolean = await window.employeeAPI.deleteEmployee(rfc);
    return res;
  }
}

export { EmployeeController };

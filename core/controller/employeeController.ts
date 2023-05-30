interface IEmployeeAPI {
  getAllEmployees: () => Array<Data>,
  getEmployeeByRFC: (rfc: any) => Data,
  createEmployee: (employee: any) => Boolean,
  updateEmployee: (employee: any) => Boolean,
  authEmployee: (username: any, password: any) => Boolean,
  deleteEmployee: (rfc: any) => Boolean
}

declare global {
  interface Window {
    employeeAPI: IEmployeeAPI
  }
}
class Employee {
  rfc: string;
  nombre: string;
  primer_apellido: string;
  segundo_apellido: string;
  username: string;
  password?: string;
  privilegios: string;

  constructor(
    rfc: string,
    name: string,
    firstLastName: string,
    secondLastName: string,
    username: string,
    password: string,
    privileges: string
  ) {
    this.rfc = rfc;
    this.nombre = name;
    this.primer_apellido = firstLastName;
    this.segundo_apellido = secondLastName;
    this.username = username;
    this.password = password;
    this.privilegios = privileges;
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

  static async createEmployee(employee: Employee) {
    const res: Boolean = await window.employeeAPI.createEmployee(employee);
    return res;
  }

  static async deleteEmployee(rfc: string) {
    const res: Boolean = await window.employeeAPI.deleteEmployee(rfc);
    return res;
  }

  static async updateEmployee(employee: Employee) {
    const res: Boolean = await window.employeeAPI.updateEmployee(employee);
    return res;
  }

  static async authEmployee(username: string, password: string) {
    const res: Boolean = await window.employeeAPI.authEmployee(username, password);
    return res;
  }
}

export { EmployeeController, Employee };

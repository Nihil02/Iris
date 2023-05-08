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
  name: string;
  firstLastName: string;
  secondLastName: string;
  username: string;
  password?: string;
  privileges: string;

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
    this.name = name;
    this.firstLastName = firstLastName;
    this.secondLastName = secondLastName;
    this.username = username;
    this.password = password;
    this.privileges = privileges;
  }
}

class ExamController{
    static async getAllExams(curp: string): Promise<Array<Data>> {

    }
    static async getExamById(curp: string, date: string): Promise<Data> {

    }
    static async addExam(exam: Exam):Promise<Boolean> {

    }
    static async updateExam(exam: Exam): Promise<Boolean> {

    }
}
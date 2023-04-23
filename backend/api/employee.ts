
interface Data {
  dataValues: Object;
}

interface User {
  rfc: string,
  name: string,
  firstLastName: string,
  secondLastName: string,
  password: string
}
class EmployeeAPI {
  /**
   * @returns Promise with JSON array suppliers
   */
  static async getAllUsers() {
    const res: Array<Data> = await window.userAPI.getAllUsers();

    const users = res.map((user) => {
      return user.dataValues;
    });
    
    return users;
  }

  static async getUserByRFC(rfc: string) {
    const res: Data = await window.userAPI.getUserByRFC(rfc);
  }

  static async createUser(user: User) {
    const res: Boolean = await window.userAPI.createUser(user);
    return res;
  }

}

export default EmployeeAPI;
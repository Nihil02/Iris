interface ICustomerAPI {
  getAllCustomers: () => Array<Data>,
  getCustomerById: (id: any) => Data,
  createCustomer: (customer: any) => Boolean,
  updateCustomer: (customer: any) => Boolean,
  deleteCustomer: (id: any) => Boolean
}

declare global {
  interface Window {
    customerAPI: ICustomerAPI
  }
}
class Customer {
  curp: string;
  name: string;
  firstLastName: string;
  secondLastName: string;
  fecnac: number;
  edonac: string;
  sexo: string;
  nacorigen: string;
  edo: string;
  mun: string;
  loc: string;
  contpaq_id: number;

  constructor(
      curp: string,
      name: string,
      firstLastName: string,
      secondLastName: string,
      fecnac: number,
      edonac: string,
      sexo: string,
      nacorigen: string,
      edo: string,
      mun: string,
      loc: string,
      contpaq_id: number
  ) {
  this.curp = curp;
  this.name = name;
  this.firstLastName = firstLastName;
  this.secondLastName = secondLastName;
  this.fecnac = fecnac;
  this.edonac = edonac;
  this.sexo = sexo;
  this.nacorigen = nacorigen;
  this.edo = edo;
  this.mun = mun;
  this.loc = loc;
  this.contpaq_id = contpaq_id;

  }
}
class CustomerController {
  static async getAllCustomers() {
    const res: Array<Data> = await window.customerAPI.getAllCustomers();
    return res;
  }

  static async getCustomerById(curp: string) {
    const res: Data = await window.customerAPI.getCustomerById(curp);
    return res;
  }

  static async createCustomer(customer: Customer) {
    const res: Boolean = await window.customerAPI.createCustomer(customer);
    return res;
  }

  static async deleteCustomer(curp: string) {
    const res: Boolean = await window.customerAPI.deleteCustomer(curp);
    return res;
  }

  static async updateCustomer(customer: Customer) {
    const res: Boolean = await window.customerAPI.updateCustomer(customer);
    return res;
  }
}

export { CustomerController, Customer };

interface ICustomerAPI {
  getAllCustomers: () => Array<Customer>,
  getCustomerById: (id: any) => Customer,
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
  CURP: string;
  nombre: string;
  primer_apellido: string;
  segundo_apellido: string;
  telefono?: string;
  domicilio?: string;
  fecnac: number;
  edonac: string;
  sexo: string;
  nacorigen: string;
  edo: string;
  mun: string;
  loc: string;

  constructor(
      CURP: string,
      nombre: string,
      primer_apellido: string,
      segundo_apellido: string,
      fecnac: number,
      edonac: string,
      sexo: string,
      nacorigen: string,
      edo: string,
      mun: string,
      loc: string,
      telefono?: string,
      domicilio?: string,
  ) {
  this.CURP = CURP;
  this.nombre = nombre;
  this.primer_apellido = primer_apellido;
  this.segundo_apellido = segundo_apellido;
  this.domicilio = domicilio;
  this.telefono = telefono;
  this.fecnac = fecnac;
  this.edonac = edonac;
  this.sexo = sexo;
  this.nacorigen = nacorigen;
  this.edo = edo;
  this.mun = mun;
  this.loc = loc;

  }
}
class CustomerController {
  static async getAllCustomers() {
    const res: Array<Customer> = await window.customerAPI.getAllCustomers();
    return res;
  }

  static async getCustomerById(curp: string) {
    const res: Customer = await window.customerAPI.getCustomerById(curp);
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

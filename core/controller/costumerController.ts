interface ICostumerAPI {
  getAllCostumers: () => Array<Data>,
  getCostumerById: (id: any) => Data,
  createCostumer: (costumer: any) => Boolean,
  updateCostumer: (costumer: any) => Boolean,
  deleteCostumer: (id: any) => Boolean
}

declare global {
  interface Window {
    costumerAPI: ICostumerAPI
  }
}
class Costumer {
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
  compaqi_id: number;

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
      compaqi_id: number
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
  this.compaqi_id = compaqi_id;

  }
}
class CostumerController {
  static async getAllCustomers() {
    const res: Array<Data> = await window.costumerAPI.getAllCostumers();
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

export { CostumerController, Costumer };

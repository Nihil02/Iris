interface ISupplierAPI {
  getAllSuppliers: () => Array<Data>,
  getSupplierByRFC: (rfc: any) => Data,
  createSupplier: (supplier: any) => Boolean,
  updateSupplier: (supplier: any) => Boolean,
  deleteSupplier: (rfc: any) => Boolean
}

declare global {
  interface Window {
    supplierAPI: ISupplierAPI
  }
}
class Supplier {
  rfc: string;
  razon_social: string;
  domicilio: string;
  correo_electronico: string;
  telefono: string;
  banco: number;
  cuenta_bancaria: string;

  constructor(
      rfc: string,
      razon_social: string,
      domicilio: string,
      correo_electronico: string,
      telefono: string,
      banco: number,
      cuenta_bancaria: string
  ) {
  this.rfc = rfc;
  this.razon_social = razon_social;
  this.domicilio = domicilio;
  this.correo_electronico = correo_electronico;
  this.telefono = telefono;
  this.banco = banco;
  this.cuenta_bancaria = cuenta_bancaria;
  }
}
class SupplierController {
  static async getAllSuppliers() {
    const res: Array<Data> = await window.supplierAPI.getAllSuppliers();
    return res;
  }

  static async getSupplierByRFC(rfc: string) {
    const res: Data = await window.supplierAPI.getSupplierByRFC(rfc);
    return res;
  }

  static async createSupplier(supplier: Supplier) {
    const res: Boolean = await window.supplierAPI.createSupplier(supplier);
    return res;
  }

  static async deleteSupplier(rfc: string) {
    const res: Boolean = await window.supplierAPI.deleteSupplier(rfc);
    return res;
  }

  static async updateSupplier(supplier: Supplier) {
    const res: Boolean = await window.supplierAPI.updateSupplier(supplier);
    return res;
  }
}

export { SupplierController, Supplier };

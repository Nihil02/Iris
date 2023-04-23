const Supplier = require("../model/supplier");

class SupplierRepository {

  /**
   * Returns all Suppliers in the database.
   * @returns Array of Suppliers
   */
    static async getAllSuppliers() {
        const res = Supplier.findAll();
        return res;
    }

  /**
   * Finds a supplier by his rfc.
   * @returns A Supplier (Object)
  */
    static async getSupplierById(rfc) {
        const res = Supplier.findByPk(rfc);
        return res;
    }

    static async createSupplier(supplier) {
        const [rfc, razon_social, domicilio, telefono, cuenta_bancaria] = Object.values(supplier);

        await Supplier.create({
            rfc: rfc,
            razon_social: razon_social,
            domicilio: domicilio,
            telefono: telefono,
            cuenta_bancaria: cuenta_bancaria
        });
        return true;
    }

  /**
   * Update supplier information
  */
    static async updateSupplier(supplier) {
        const [rfc, razon_social, domicilio, telefono, cuenta_bancaria] = Object.values(supplier);

        await Supplier.update({
            rfc: rfc,
            razon_social: razon_social,
            domicilio: domicilio,
            telefono: telefono,
            cuenta_bancaria: cuenta_bancaria
        }, {where: {
            rfc: rfc
        });
        return true;
    }

  /**
   * Finds a supplier by his rfc and deletes him.
  */
    static async deleteSupplier(rfc) {
        const supplier = await Supplier.findByPk(rfc);
        await supplier.destroy();
        return true;
    }
    
}

module.exports = SupplierRepository

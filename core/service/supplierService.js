const SupplierRepository = require("../repository/supplierRepository.js");
const Validator = require("../validation/validator.js");

class SupplierService {
  static async getAllSuppliers() {
    const res = await SupplierRepository.getAllSuppliers();
    const suppliers = res.map((supplier) => {
      return supplier.dataValues;
    });
    return suppliers;
  }

   /**
   * Finds a supplier by his RFC and returns him if exists.
   * @param RFC - The RFC of the Supplier.
   * @returns An object with the supplier data.
   */
    static async getSupplierByRFC(rfc = "") {
        try {
            const sanitizedRFC = rfc.trim();
            if (!Validator.isRFC(sanitizedRFC)) {
                throw Error("Invalid RFC");
            }
            const supplier = await SupplierRepository.getSupplierById(sanitizedRFC);
            return supplier[0].dataValues;
        } catch (error) {
            console.error(error);
        }
    }

  /**
   * Receives an object with the data of the supplier and creates him in the database.
   * @returns True if the user has been created in other case throws an error.
   */
  static async createSupplier(supplier) {
    try {
      const sanitizedSupplier = this.sanitizeSupplier(supplier);
      const validation = this.isValidSupplier(sanitizedSupplier);

      if(typeof validation === 'object') {
        throw validation;
      }
      const findSupplier = await this.getSupplierById(sanitizedSupplier.rfc);
      if(findSupplier) {
        throw new Error("Supplier already exists");
      }

      return await SupplierRepository.createSupplier(sanitizedSupplier);
    } catch (error) {
      return error;
    }
  }

static async updateSupplier(supplier) {
    try {
      /* Validations goes here */
      await SupplierRepository.updateSupplier(supplier);
      return false;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  static async deleteSupplier(rfc) {
    try {
      await SupplierRepository.deleteSupplier(rfc);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

static sanitizeSupplier(supplier) {
    let {rfc, razon_social, domicilio, correo, telefono, cuenta_bancaria} = supplier;
    rfc = rfc.trim();
    razon_social = razon_social.trim();
    domicilio = domicilio.trim();
    correo = correo.trim();
    telefono = telefono.trim();
    cuenta_bancaria = cuenta_bancaria.trim();

    return {
        rfc: rfc,
        razon_social: razon_social,
        domicilio: domicilio,
        correo_electronico: correo,
        telefono: telefono,
        cuenta_bancaria: cuenta_bancaria,
    };
  }

  static isValidSupplier(supplier) {
    let {rfc, razon_social, domicilio, correo, telefono, cuenta_bancaria} = supplier;

    if (!Validator.isRFC(rfc)) {
      return new Error("Invalid RFC");
    }

    if (!Validator.isEmail(correo)) {
      return new Error("Invalid Email");
    }

    return true;
  }

}

module.exports = SupplierService;

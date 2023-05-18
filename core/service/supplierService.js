const SupplierDAO = require("../DAO/supplierDAO.js");
const Validator = require("../validation/validator.js");

/**
 * @typedef Supplier
 * @property {string} rfc
 * @property {string} razon_social
 * @property {string} domicilio
 * @property {string} correo_electronico
 * @property {string} telefono
 * @property {string} cuenta_bancaria
 */

class SupplierService {
  static async getAllSuppliers() {
    const res = await SupplierDAO.getAllSuppliers();
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
      if (typeof rfc !== "string") {
        throw new Error("No string RFC");
      }

      const sanitizedRFC = rfc.trim();

      if (!Validator.isRFC(sanitizedRFC)) {
        throw Error("Invalid RFC");
      }

      const supplier = await SupplierDAO.getSupplierById(rfc);
      return supplier.dataValues;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  /**
   * Receives an object with the data of the supplier and creates him in the database.
   * @param {Supplier} supplier
   * @returns True if the user has been created in other case throws an error.
   */
  static async createSupplier(supplier) {
    try {
      const newSupplier = this.formatSupplier(supplier);
      const validation = this.isValidSupplier(newSupplier);

      if (typeof validation === "object") {
        throw validation;
      }

      const findSupplier = await this.getSupplierByRFC(supplier.rfc);
      if (findSupplier) {
        throw new Error("Supplier already exists");
      }

      return await SupplierDAO.createSupplier(supplier);
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  /**
   * Recives a `Supplier` and updates his information.
   *
   * @param {Supplier} supplier {@link Supplier}
   * @returns
   */
  static async updateSupplier(supplier) {
    try {
      /* Validations goes here */
      await SupplierDAO.updateSupplier(supplier);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  static async deleteSupplier(rfc) {
    try {
      await SupplierDAO.deleteSupplier(rfc);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  /**
   * Format all the properties from a supplier.
   * @param {Supplier} supplier
   * @returns {Supplier}
   */
  static formatSupplier(supplier) {
    const formattedSupplier = {
      rfc: supplier.rfc.trim(),
      razon_social: supplier.razon_social.trim(),
      domicilio: supplier.domicilio.trim(),
      correo_electronico: supplier.correo_electronico.trim(),
      telefono: supplier.telefono.trim(),
      cuenta_bancaria: supplier.cuenta_bancaria.trim(),
    };
    return formattedSupplier;
  }

  /**
   * Validates all of the properties of a supplier.
   *
   * @param {Supplier} supplier - See {@linkcode Supplier}.
   * @returns
   */
  static isValidSupplier(supplier) {
    if (!Validator.isRFC(supplier.rfc)) {
      return new Error("Invalid RFC");
    }
    if (!Validator.isEmail(supplier.correo_electronico)) {
      return new Error("Invalid Email");
    }
    return true;
  }
}

module.exports = SupplierService;

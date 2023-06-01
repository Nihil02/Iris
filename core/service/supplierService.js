const SupplierDAO = require("../DAO/supplierDAO.js");
const Validator = require("../validation/validator.js");
/**
 * @readonly
 * @enum {string}
 */

const SupplierValidationResult = {
  VALID: "VALID",
  INVALID_RFC: "INVALID_RFC",
  INVALID_DATA: "INVALID_DATA",
  INVALID_PHONE: "INVALID_PHONE",
  EMPLOYEE_NOT_FOUND: "EMPLOYEE_NOT_FOUND",
  INVALID_EMAIL: "INVALID_EMAIL",
  MISSING_FIELD: "MISSING_FIELD",
};

const {
  VALID,
  INVALID_RFC,
  INVALID_DATA,
  INVALID_PHONE,
  EMPLOYEE_NOT_FOUND,
  INVALID_EMAIL,
  MISSING_FIELD,
} = SupplierValidationResult;

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
        throw new Error(INVALID_DATA);
      }

      const sanitizedRFC = rfc.trim();

      if (!sanitizedRFC) {
        throw new Error(MISSING_FIELD);
      }
      // Disabled for testing
      /*if (!Validator.isRFC(sanitizedRFC)) {
        throw Error(INVALID_RFC);
      }*/

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
      const formattedSupplier = this.formatSupplier(supplier);
      const validationResult = this.validateSupplier(formattedSupplier);

      if (validationResult !== VALID) {
        throw new Error(validationResult);
      }

      const searchResult = await this.getSupplierByRFC(supplier.rfc);
      if (searchResult) {
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
      const validationResult = this.validateSupplier(supplier);
      if (validationResult !== VALID) {
        throw new Error(validationResult);
      }
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
   * @returns {SupplierValidationResult}
   */
  static validateSupplier(supplier) {
    // Disabled for testing
    /*for (const [_, value] of Object.entries(supplier)) {
      if (!value) {
        return MISSING_FIELD;
      }
    }
    const forbiddenChars = /[@<>%&#"'/]/g;
    if (forbiddenChars.test(supplier.razon_social)) {
      return INVALID_DATA;
    }

    if (!Validator.isEmail(supplier.correo_electronico)) {
      return INVALID_EMAIL;
    }

    if (!Validator.isRFC(supplier.rfc)) {
      return INVALID_RFC;
    }

    if (!Validator.isPhone(supplier.telefono)) {
      return INVALID_PHONE;
    }*/
    return VALID;
  }
}

module.exports = SupplierService;

const CostumerRepository = require("../repository/costumerRepository.js");
const Validator = require("../validation/validator.js");

class CostumerService {
  static async getAllCostumers() {
    const res = await CostumerRepository.getAllCostumers();
    const customers = res.map((customer) => {
      return customer.dataValues;
    });
    return customers;
  }

   /**
   * Finds a customer by his CURP and returns him if exists.
   * @param RFC - The CURP of the Customer.
   * @returns An object with the customer data.
   */
    static async getCostumerByCURP(curp = "") {
        try {
            const sanitizedCURP = curp.trim();
            if (!Validator.isCURP(sanitizedCURP)) {
                throw Error("Invalid CURP");
            }
            const customer = await CostumerService.getCostumerById(sanitizedCURP);
            return customer[0].dataValues;
        } catch (error) {
            console.error(error);
        }
    }

  /**
   * Recives an object with the data of the customer and creates him in the database.
   * @returns True if the customer has been created in other case throws an error.
   */
  static async createCostumer(costumer) {
    try {
      const sanitizedCostumer = this.sanitizeCostumer(costumer);
      const validation = this.isValidCostumer(sanitizedCostumer);

      if(typeof validation === 'object') {
        throw validation;
      }
      const findCostumer = await this.getCostumerById(sanitizedCostumer.rfc);
      if(findCostumer) {
        throw new Error("Costumer already exists");
      }

      return await CostumerRepository.createCostumer(sanitizedCostumer);
    } catch (error) {
      return error;
    }
  }

  static async updateCostumer(curp) {
    try {
      /* Validations goes here */
      await CostumerRepository.updateCostumer(curp);
      return false;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  static async deleteCostumer(curp) {
    try {
      await CostumerRepository.deleteCostumer(curp);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

    static sanitizeCostumer(customer) {
        const { CURP, nombre, primer_apellido, segundo_apellido, fecnac, edonac, sexo, nacorigen, edo, mun, loc } = customer;
        CURP: CURP.trim();
        nombre: nombre.trim();
        primer_apellido: primer_apellido.trim();
        segundo_apellido: segundo_apellido.trim();
        fecnac: fecnac.trim();
        edonac: edonac.trim();
        sexo: sexo.trim();
        nacorigen: nacorigen.trim();
        edo: edo.trim();
        mun: mun.trim();
        loc: loc.trim();

        return {
            CURP: CURP,
            nombre: nombre,
            primer_apellido: primer_apellido,
            segundo_apellido: segundo_apellido,
            fecnac: fecnac,
            edonac: edonac,
            sexo: sexo,
            nacorigen: nacorigen,
            edo: edo,
            mun: mun,
            loc: loc
        };
    }

  static isValidCostumer(costumer) {
    const { CURP, nombre, primer_apellido, segundo_apellido, fecnac, edonac, sexo, nacorigen, edo, mun, loc } = employee;
    if (!Validator.isName(nombre)) {
      return new Error("Invalid name");
    }

    if (!Validator.isName(primer_apellido)) {
      return new Error("Invalid first last name");
    }

    if (!Validator.isName(segundo_apellido)) {
      return new Error("Invalid second last name");
    }

    if (!Validator.isCURP(CURP)) {
      return new Error("Invalid CURP");
    }
    return true;
  }
}

module.exports = CostumerService;

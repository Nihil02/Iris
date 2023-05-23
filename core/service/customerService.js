const CustomerDAO = require("../DAO/customerDAO.js");
const Validator = require("../validation/validator.js");

class CustomerService {
  static async getAllCustomers() {
    const res = await CustomerDAO.getAllCustomers();
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
  static async getCustomerByCURP(curp = "") {
    try {
      /*const sanitizedCURP = curp.trim();
      if (!Validator.isCURP(sanitizedCURP)) {
        throw Error("Invalid CURP");
      }*/
      const customer = await CustomerDAO.getCustomerByCURP(curp);
      return customer.dataValues;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  /**
   * Recives an object with the data of the customer and creates him in the database.
   * @returns True if the customer has been created in other case throws an error.
   */
  static async createCustomer(customer) {
    try {
      /*const sanitizedCustomer = this.sanitizeCustomer(customer);
      const validation = this.isValidCustomer(sanitizedCustomer);

      if (typeof validation === "object") {
        throw validation;
      }*/
      const findCustomer = await this.getCustomerByCURP(customer.curp);
      if (findCustomer) {
        throw new Error("Customer already exists");
      }

      return await CustomerDAO.createCustomer(customer);
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  static async updateCustomer(customer) {
    try {
      /* Validations goes here */
      await CustomerDAO.updateCustomer(customer);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  static async deleteCustomer(curp) {
    try {
      const del = await CustomerDAO.deleteCustomer(curp);
      return del;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  /**
   * @deprecated
   * @param {JSON} customer 
   * @returns 
   */
  static sanitizeCustomer(customer) {
    let {
      curp,
      name,
      firstLastName,
      secondLastName,
      fecnac,
      edonac,
      sexo,
      nacorigen,
      edo,
      mun,
      loc,
      contpaq_id,
    } = customer;
    curp = curp.trim();
    name = name.trim();
    firstLastName = firstLastName.trim();
    secondLastName = secondLastName.trim();
    edonac = edonac.trim();
    sexo = sexo.trim();
    nacorigen = nacorigen.trim();
    edo = edo.trim();
    mun = mun.trim();
    loc = loc.trim();
    contpaq_id = contpaq_id.trim();

    return {
      curp: curp,
      name: name,
      firstLastName: firstLastName,
      secondLastName: secondLastName,
      fecnac: fecnac,
      edonac: edonac,
      sexo: sexo,
      nacorigen: nacorigen,
      edo: edo,
      mun: mun,
      loc: loc,
      contpaq_id: contpaq_id,
    };
  }

  /**
   * @deprecated
   * @param {JSON} customer 
   * @returns 
   */

  static isValidCustomer(customer) {
    const {
      curp,
      name,
      firstLastName,
      secondLastName,
      fecnac,
      edonac,
      sexo,
      nacorigen,
      edo,
      mun,
      loc,
      compaqi_id,
    } = customer;
    if (!Validator.isName(name)) {
      return new Error("Invalid name");
    }

    if (!Validator.isName(firstLastName)) {
      return new Error("Invalid first last name");
    }

    if (!Validator.isName(secondLastName)) {
      return new Error("Invalid second last name");
    }

    if (!Validator.isCURP(curp)) {
      return new Error("Invalid CURP");
    }
    return true;
  }
}

module.exports = CustomerService;

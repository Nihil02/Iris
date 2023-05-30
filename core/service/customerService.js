const CustomerDAO = require("../DAO/customerDAO.js");
const Validator = require("../validation/validator.js");
const { CustomerDTO } = require("../types.js");

class CustomerService {
  /**
   * @returns {Promise<[CustomerDTO]>}
   */
  static async getAllCustomers() {
    const customers = await CustomerDAO.getAllCustomers();
    return customers;
  }

  /**
   * Finds a customer by his CURP and returns him if exists.
   * @param {string} curp - The CURP of the Customer.
   * @returns {Promise<CustomerDTO>} A customer.
   */
  static async getCustomerByCURP(curp = "") {
    try {
      /*const sanitizedCURP = curp.trim();
      if (!Validator.isCURP(sanitizedCURP)) {
        throw Error("Invalid CURP");
      }*/
      const customer = await CustomerDAO.getCustomerByCURP(curp);
      return customer;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  /**
   * Recives an object with the data of the customer and creates him in the database.
   * @param {CustomerDTO} customer
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

  /**
   * @param {CustomerDTO} customer
   * @returns
   */
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

  /**
   * @param {string} curp
   * @returns
   */
  static async deleteCustomer(curp) {
    try {
      return await CustomerDAO.deleteCustomer(curp);
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  /**
   * @param {CustomerDTO} customer
   * @returns {CustomerDTO}
   */
  static formatCustomer(customer) {}

  /**
   * @param {CustomerDTO} customer
   * @returns
   */
  static isValidCustomer(customer) {
    if (!Validator.isName(customer.nombre)) {
      return new Error("Invalid name");
    }
    if (!Validator.isName(customer.primer_apellido)) {
      return new Error("Invalid first last name");
    }

    if (!Validator.isName(customer.segundo_apellido)) {
      return new Error("Invalid second last name");
    }
    if (!Validator.isCURP(customer.CURP)) {
      return new Error("Invalid CURP");
    }

    if (!Validator.isPhone(customer.telefono)) {
      return new Error("Invalid Phone Number");
    }
    return true;
  }
}

module.exports = CustomerService;

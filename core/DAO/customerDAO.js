const Customer = require("../model/customer");
const { CustomerDTO } = require("../types.js");

class CustomerDAO {
  /**
   * Returns all Customers in the database.
   * @returns {Promise<[CustomerDTO]>}
   */
  static async getAllCustomers() {
    const response = await Customer.findAll();
    /**@type {[CustomerDTO]}*/
    const customers = response.map(customer => customer.dataValues);
    return customers;
  }

  /**
   * Finds a customer by his CURP.
   * @returns {Promise<CustomerDTO>}
   */
  static async getCustomerByCURP(id) {
    const res = await Customer.findByPk(id);
    return res.dataValues;
  }

  /**
   * Creates a customer in the database
   * @param {CustomerDTO} customer
   */
  static async createCustomer(customer) {
    await Customer.create(customer);
    return true;
  }

  /**
   * Update customer information
   * @param {CustomerDTO} customer
   */
  static async updateCustomer(customer) {
    await Customer.update(
      customer,
      {
        where: {
          CURP: customer.CURP,
        },
      }
    );
    return true;
  }

  /**
   * Finds an customer by his curp and deletes him.
   * @param {string} curp
   */
  static async deleteCustomer(curp) {
    const customer = await Customer.findByPk(curp);
    await customer.destroy();
    return true;
  }
}

module.exports = CustomerDAO;

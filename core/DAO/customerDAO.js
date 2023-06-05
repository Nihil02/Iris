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
   * Finds a customer by his id.
   * @returns {Promise<CustomerDTO>}
   */
  static async getCustomerByCURP(id) {
    console.log("id:" +id);
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
          id: customer.id,
        },
      }
    );
    return true;
  }

  /**
   * Finds an customer by his id and deletes him.
   * @param {string} id
   */
  static async deleteCustomer(id) {
    const customer = await Customer.findByPk(id);
    await customer.destroy();
    return true;
  }
}

module.exports = CustomerDAO;

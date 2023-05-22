const Customer = require("../model/customer");

/**
 * @typedef CustomerDTO
 * @property {string} CURP
 * @property {string} nombre
 * @property {string} primer_apellido
 * @property {string} segundo_apellido
 * @property {string} telefono
 * @property {string} domicilio
 * @property {string} fecnac
 * @property {string} edonac
 * @property {string} sexo
 * @property {string} nacorigen
 * @property {string} edo
 * @property {string} mun
 * @property {string} loc
 * @property {string} contpaq_id
 */
class CustomerDAO {
  /**
   * Returns all Customers in the database.
   * @returns Array of Customers's
   */
  static async getAllCustomers() {
    const res = Customer.findAll();
    return res;
  }

  /**
   * Finds a customer by his CURP.
   * @returns A customer (Object)
   */
  static async getCustomerByCURP(id) {
    const res = Customer.findByPk(id);
    return res;
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
   */
  static async deleteCustomer(curp) {
    const customer = await Customer.findByPk(curp);
    await customer.destroy();
    return true;
  }
}

module.exports = CustomerDAO;

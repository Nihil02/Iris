const Customer = require("../model/customer");

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

    static async createCustomer(customer) {
        const [CURP, nombre, primer_apellido, segundo_apellido, fecnac, edonac, sexo, nacorigen, edo, mun, loc, contpaq_id] = Object.values(customer);
        await Customer.create({
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
            loc: loc,
            contpaq_id: contpaq_id
        });
        return true;
    }

  /**
   * Update customer information
  */
    static async updateCustomer(customer) {
        const [CURP, nombre, primer_apellido, segundo_apellido, fecnac, edonac, sexo, nacorigen, edo, mun, loc, contpaq_id] = Object.values(customer);
        await Customer.update({
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
            loc: loc,
            compaqi_id: contpaq_id
        }, {
            where: {
                CURP: CURP,
            },
        });
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

module.exports = CustomerDAO

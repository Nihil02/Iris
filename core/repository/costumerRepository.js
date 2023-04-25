const Costumer = require("../model/costumer");

class CostumerRepository {

  /**
   * Returns all Customers in the database.
   * @returns Array of Customers's
   */
    static async getAllCostumers() {
        const res = Costumer.findAll();
        return res;
    }

  /**
   * Finds a customer by his CURP.
   * @returns A customer (Object)
  */
    static async getCostumerById(id) {
        const res = Costumer.findByPk(id);
        return res;
    }

    static async createCostumer(customer) {
        const [CURP, nombre, primer_apellido, segundo_apellido, fecnac, edonac, sexo, nacorigen, edo, mun, loc] = Object.values(customer);
        await Costumer.create({
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
        });
        return true;
    }

  /**
   * Update customer information
  */
    static async updateCostumer(customer) {
        const [CURP, nombre, primer_apellido, segundo_apellido, fecnac, edonac, sexo, nacorigen, edo, mun, loc] = Object.values(customer);
        await Costumer.update({
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
    static async deleteCostumer(curp) {
        const customer = await Costumer.findByPk(curp);
        await customer.destroy();
        return true;
    }
    
}

module.exports = CostumerRepository

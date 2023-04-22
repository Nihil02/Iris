const Costumer = require("../model/costumer");

class CostumerRepository {

    static async getAllCostumers() {
        const res = Costumer.findAll();
        return res;
    }

    static async getCostumerById(id) {
        const res = Costumer.findByPk(id);
        return res;
    }

    static async createCostumer() {

    }

    static async updateCostumer() {

    }

    static async deleteCostumer() {

    }
    
}

module.exports = CostumerRepository
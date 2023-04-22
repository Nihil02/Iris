const Costumer = require("../model/costumer");

class CostumerRepository {

    static async getAllCostumers() {
        const res = Costumer.findAll();
        return res;
    }

    static async getCostumerById() {
        const res = Costumer.findByPk();
        return res;
    }
    
}
const Exam = require("../model/exam");
const { ExamDTO } = require("../types.js");

class ExamDAO {
  /**
   * Returns all exams in the database.
   * @returns {Promise<[ExamDTO]>}
   */
  static async getAllExams() {
    const res = await Exam.findAll();
    /**@type {[ExamDTO]} */
    const exams = res.map((exam) => exam.dataValues);
    return exams;
  }

  /**
   * Finds all exams of a Customer by his `CURP` or finds an specific exam of a Customer in function of the `Date` and `CURP`.
   * @param {string} curp - The curp of a Customer
   * @param {string} [date] - The date of application of exam, this parameter is optional
   * @returns {Promise<ExamDTO | [ExamDTO]>}
   */
  static async getExamOfCustomer(curp, date) {
    if (arguments.length == 0 || arguments.length > 2) {
      throw Error("Invalid arguments");
    }
    if (arguments.length == 1) {
      const res = await Exam.findAll({ where: { cliente: curp } });
      /**@type {[ExamDTO]} */
      const exams = res.map(exam => exam.dataValues);
      return exams;
    }

    const res = await Exam.findOne({ where: { cliente: curp, fecha: date } });
    /**@type {ExamDTO} */
    const exam = res.dataValues;
    return exam;

  }

  /**
   * @param {ExamDTO} exam
   * @returns
   */
  static async createExam(exam) {
    try {
      await Exam.create(exam);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  /**
   * Update exam information
   * @param {ExamDTO} exam
   */
  static async updateExam(exam) {
    await Exam.update(exam, {
      where: {
        cliente: exam.cliente,
        fecha: exam.fecha,
      },
    });
    return true;
  }

  /**
   * Finds a customer exam by his curp and date and deletes him.
   * @param {string} curp
   */
  static async deleteExam(curp) {
    const exam = await Exam.findByPk(curp);
    await exam.destroy();
    return true;
  }
}

module.exports = ExamDAO;

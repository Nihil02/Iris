const ExamDAO = require("../DAO/examDAO.js");
const { ExamDTO } = require("../types.js");

class ExamService {
  /**
   * 
   * @param {string} id 
   * @returns {Promise<[ExamDTO]>}
   */
  static async getAllExam(id) {
    /**@type {[ExamDTO]} */
    const exams = await this.getExamById(id);
    return exams;
  }

  /**
   * Finds all exam by the customer id and returns them if exists.
   * @param {string} Date is found, returns an specific exam
   * @param {string} RFC The RFC of the Employee.
   * @returns {Promise<ExamDTO | [ExamDTO]>}
   */
  static async getExamById(id, date = "") {
    try {
      let exam;

      if (date === "") {
        exam = await ExamDAO.getExamOfCustomer(id);
      } else {
        exam = await ExamDAO.getExamOfCustomer(id, date);
      }
      return exam;
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Recives an object with the data of the exam and creates him in the database.
   * @param {ExamDTO} exam
   * @returns {Promise<Boolean>}
   */
  static async createExam(exam) {
    try {
      const findExam = await this.getExamById(exam.cliente, exam.fecha);
      if (findExam) {
        throw new Error("Exam already exists");
      }
      return await ExamDAO.createExam(exam);
    } catch (error) {
      return error;
    }
  }

  /**
   * @param {ExamDTO} exam 
   * @returns 
   */
  static async updateExam(exam) {
    try {
      /* Validations goes here */
      await ExamDAO.updateExam(exam);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  /**
   * @param {string} id
   */
  static async deleteExam(id) {
    try {
      await ExamDAO.deleteExam(id);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  /**
   * Formats and an exam.
   * @param {ExamDTO} exam 
   * @returns {ExamDTO}
   */
  static formatExam(exam) {

  }

  /**
   * Validates the properties of an Exam.
   * @param {ExamDTO} exam 
   * @returns 
   */
  static validateExam(exam) {
    return true;
  }
}

module.exports = ExamService;

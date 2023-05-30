const ExamDAO = require("../DAO/examDAO.js");
const Validator = require("../validation/validator.js");
const { ExamDTO } = require("../types.js");

class ExamService {
  /**
   * 
   * @param {string} curp 
   * @returns {Promise<[ExamDTO]>}
   */
  static async getAllExam(curp = "") {
    /**@type {[ExamDTO]} */
    const exams = await this.getExamById(curp);
    return exams;
  }

  /**
   * Finds all exam by the customer CURP and returns them if exists.
   * @param {string} Date is found, returns an specific exam
   * @param {string} RFC The RFC of the Employee.
   * @returns {Promise<ExamDTO | [ExamDTO]>}
   */
  static async getExamById(curp = "", date = "") {
    try {
      const sanitizedCURP = curp.trim();
      if (!Validator.isCURP(sanitizedCURP)) {
        throw Error("Invalid CURP");
      }

      let exam;

      if (date === "") {
        exam = await ExamDAO.getExamOfCustomer(curp);
      } else {
        exam = await ExamDAO.getExamOfCustomer(curp, date);
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
      //const sanitizedExam = this.sanitizeExam(exam);
      const isValidExam = this.validateExam(exam);

      if(isValidExam) {
        
      }

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
   * @param {string} curp
   */
  static async deleteExam(curp) {
    try {
      await ExamDAO.deleteExam(curp);
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
    return Validator.isCURP(exam.cliente) && exam.adicion_od_esferico !== NaN;
  }
}

module.exports = ExamService;

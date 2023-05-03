const ExamRepository = require("../repository/examRepository.js");
const Validator = require("../validation/validator.js");

class ExamService {
  static async getAllExam() {
    const res = await ExamRepository.getAllExams();
    const exams = res.map((exam) => {
      return exam.dataValues;
    });
    return exams;
  }

  /**
   * Finds all exam by the customer CURP and returns them if exists.
   * If @param Date is found, returns an specific exam
   * @param RFC - The RFC of the Employee.
   * @returns An object with the employee data.
   */
  static async getExamById(curp = "", date = "") {
    try {
      const sanitizedCURP = curp.trim();
      if (!Validator.isCURP(sanitizedCURP)) {
        throw Error("Invalid CURP");
      }

      let exam;

      if (date === "") {
        exam = await ExamRepository.getExamOfCostumer(curp);
      } else {
        exam = await ExamRepository.getExamOfCostumer(curp, date);
      }
      return exam[0].dataValues;
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Recives an object with the data of the exam and creates him in the database.
   * @returns True if the user has been created in other case throws an error.
   */
  static async createExam(exam) {
    try {
      const sanitizedExam = this.sanitizeExam(exam);
      const validation = this.isValidExam(sanitizedExam);

      if (typeof validation === "object") {
        throw validation;
      }
      const findExam = await this.getExamById(
        sanitizedExam.cliente,
        sanitizedExam.fecha
      );
      if (findExam) {
        throw new Error("Exam already exists");
      }

      return await ExamRepository.createExam(sanitizedExam);
    } catch (error) {
      return error;
    }
  }

  static async updateExam(exam) {
    try {
      /* Validations goes here */
      await ExamRepository.updateExam(exam);
      return false;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  static async deleteExam(exam) {
    try {
      await ExamRepository.deleteExam(exam);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  static sanitizeExam(exam) {
    /*let {
      cliente,
      fecha,
      rx,
      lejos_od_esferico,
      lejos_od_cilindrico,
      lejos_od_eje,
      lejos_od_agudeza_visual,
      lejos_oi_esferico,
      lejos_oi_cilindrico,
      lejos_oi_eje,
      lejos_oi_agudeza_visual,
      adicion_od_esferico,
      adicion_oi_esferico,
      tipo_lentes,
      observaciones,
    } = exam;

    cliente = cliente.trim();
    rx = rx.trim();
    lejos_od_esferico = lejos_od_esferico.trim();
    lejos_od_cilindrico = lejos_od_cilindrico.trim();
    lejos_od_eje = lejos_od_eje.trim();
    lejos_od_agudeza_visual = lejos_od_agudeza_visual.trim();
    lejos_oi_esferico = lejos_oi_esferico.trim();
    lejos_oi_cilindrico = lejos_oi_cilindrico.trim();
    lejos_oi_eje = lejos_oi_eje.trim();
    lejos_oi_agudeza_visual = lejos_oi_agudeza_visual.trim();
    adicion_od_esferico = adicion_od_esferico.trim();
    adicion_oi_esferico = adicion_oi_esferico.trim();
    tipo_lentes = tipo_lentes.trim();
    observaciones = observaciones.trim();*/

    /*return {
      cliente: cliente,
      fecha: fecha,
      rx: rx,
      lejos_od_esferico: lejos_od_esferico,
      lejos_od_cilindrico: lejos_od_cilindrico,
      lejos_od_eje: lejos_od_eje,
      lejos_od_agudeza_visual: lejos_od_agudeza_visual,
      lejos_oi_esferico: lejos_oi_esferico,
      lejos_oi_cilindrico: lejos_oi_cilindrico,
      lejos_oi_eje: lejos_oi_eje,
      lejos_oi_agudeza_visual: lejos_oi_agudeza_visual,
      adicion_od_esferico: adicion_od_esferico,
      adicion_oi_esferico: adicion_oi_esferico,
      tipo_lentes: tipo_lentes,
      observaciones: observaciones,
    };*/
  }

  static isValidExam(exam) {
    const {
      cliente,
      fecha,
      rx,
      lejos_od_esferico,
      lejos_od_cilindrico,
      lejos_od_eje,
      lejos_od_agudeza_visual,
      lejos_oi_esferico,
      lejos_oi_cilindrico,
      lejos_oi_eje,
      lejos_oi_agudeza_visual,
      adicion_od_esferico,
      adicion_oi_esferico,
      tipo_lentes,
      observaciones,
    } = exam;

    if (!Validator.isCURP(cliente)) {
      return new Error("Invalid CURP");
    }
    return true;
  }
}

module.exports = ExamService;

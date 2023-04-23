const Exam = require("../model/exam");

class ExamRepository {
  /**
   * Returns all exams in the database.
   * @returns Array of Exams's
   */
  static async getAllExams() {
    const res = Exam.findAll();
    return res;
  }

  /**
   * Finds all exams of a Customer by his CURP.
   * @returns Array of Exams of a customer (Object)
   */
  static async getExamsOfId(curp) {
    const res = Exam.findAll({ where: { cliente: curp } });
    return res;
  }

  /**
   * Finds an exams of a Customer by his CURP and Date.
   * @returns An Exam of a customer (Object)
   */
  static async getExamOfId(curp, fecha) {
    const res = Exam.findAll({ where: { cliente: curp, fecha: fecha } });
    return res;
  }

  static async createExam(exam) {
    const [
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
    ] = Object.values(exam);
    await Exam.create({
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
    });
    return true;
  }

  /**
   * Update exam information
   */
  static async updateExam(exam) {
    const [
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
    ] = Object.values(exam);
    await Exam.update(
      {
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
      },
      {
        where: {
          cliente: cliente,
          fecha: fecha,
        },
      }
    );
    return true;
  }

  /**
   * Finds a customer exam by his curp and date and deletes him.
   */
  static async deleteExam(curp) {
    const exam = await Exam.findByPk(curp);
    await exam.destroy();
    return true;
  }
}

module.exports = ExamRepository;

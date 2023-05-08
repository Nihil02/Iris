interface IExamAPI {
  getAllExams: (curp: string) => Array<Data>;
  getExamById: (curp: string, date: string) => Data;
  addExam: (exam: any) => Boolean;
  updateExam: (exam: any) => Boolean;
}

declare global {
  interface Window {
    examAPI: IExamAPI;
  }
}
class Exam {
  cliente: string;
  fecha: string;
  dp_od: number;
  dp_oi: number;
  oblea: number;
  lejos_od_esferico: number;
  lejos_od_cilindrico: number;
  lejos_od_eje: number;
  lejos_od_agudeza_visual: number;
  lejos_oi_esferico: number;
  lejos_oi_cilindrico: number;
  lejos_oi_eje: number;
  lejos_oi_agudeza_visual: number;
  adicion_od_esferico: number;
  adicion_oi_esferico: number;
  tipo_lentes: string;
  observaciones: string;
  constructor(
    cliente: string,
    fecha: string,
    dp_od: number,
    dp_oi: number,
    oblea: number,
    lejos_od_esferico: number,
    lejos_od_cilindrico: number,
    lejos_od_eje: number,
    lejos_od_agudeza_visual: number,
    lejos_oi_esferico: number,
    lejos_oi_cilindrico: number,
    lejos_oi_eje: number,
    lejos_oi_agudeza_visual: number,
    adicion_od_esferico: number,
    adicion_oi_esferico: number,
    tipo_lentes: string,
    observaciones: string
  ) {
    this.cliente = cliente;
    this.fecha = fecha;
    this.dp_od = dp_od;
    this.dp_oi = dp_oi;
    this.oblea = oblea;
    this.lejos_od_esferico = lejos_od_esferico;
    this.lejos_od_cilindrico = lejos_od_cilindrico;
    this.lejos_od_eje = lejos_od_eje;
    this.lejos_od_agudeza_visual = lejos_od_agudeza_visual;
    this.lejos_oi_esferico = lejos_oi_esferico;
    this.lejos_oi_cilindrico = lejos_oi_cilindrico;
    this.lejos_oi_eje = lejos_oi_eje;
    this.lejos_oi_agudeza_visual = lejos_oi_agudeza_visual;
    this.adicion_od_esferico = adicion_od_esferico;
    this.adicion_oi_esferico = adicion_oi_esferico;
    this.tipo_lentes = tipo_lentes;
    this.observaciones = observaciones;
  }
}

class ExamController {
  static async getAllExams(curp: string): Promise<Array<Data>> {
    return await window.examAPI.getAllExams(curp);
  }
  static async getExamById(curp: string, date: string): Promise<Data> {
    return await window.examAPI.getExamById(curp, date);
  }
  static async addExam(exam: Exam): Promise<Boolean> {
    return await window.examAPI.addExam(exam);
  }
  static async updateExam(exam: Exam): Promise<Boolean> {
    return await window.examAPI.updateExam(exam);
  }
}

export { Exam, ExamController };

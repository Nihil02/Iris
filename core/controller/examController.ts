interface IExamAPI {
  getAllExams: (id: number) => Promise<Array<Exam>>;
  getExamById: (id: number, date?: string) => Promise<Exam>;
  addExam: (exam: Exam) => Promise<Boolean>;
  updateExam: (exam: Exam) => Promise<Boolean>;
  deleteExam: (id: number) => Promise<Boolean>;
}

declare global {
  interface Window {
    examAPI: IExamAPI;
  }
}
class Exam {
  cliente: number;
  fecha: string;
  dp_od: string;
  dp_oi: string;
  oblea: number;
  lejos_od_esferico: number;
  lejos_od_cilindrico: number;
  lejos_od_eje: number;
  lejos_od_agudeza_visual: string;
  lejos_oi_esferico: number;
  lejos_oi_cilindrico: number;
  lejos_oi_eje: number;
  lejos_oi_agudeza_visual: string;
  adicion_od_esferico: number;
  adicion_oi_esferico: number;
  tipo_lentes: string;
  observaciones: string;
  constructor(
    cliente: number,
    fecha: string,
    dp_od: string,
    dp_oi: string,
    oblea: number,
    lejos_od_esferico: number,
    lejos_od_cilindrico: number,
    lejos_od_eje: number,
    lejos_od_agudeza_visual: string,
    lejos_oi_esferico: number,
    lejos_oi_cilindrico: number,
    lejos_oi_eje: number,
    lejos_oi_agudeza_visual: string,
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
  static async getAllExams(id: number): Promise<Array<Exam>> {
    return await window.examAPI.getAllExams(id);
  }
  static async getExamById(id: number, date?: string): Promise<Exam> {
    return await window.examAPI.getExamById(id, date);
  }
  static async addExam(exam: Exam): Promise<Boolean> {
    return await window.examAPI.addExam(exam);
  }
  static async updateExam(exam: Exam): Promise<Boolean> {
    return await window.examAPI.updateExam(exam);
  }
  static async deleteExam(id: number): Promise<Boolean> {
    return await window.examAPI.deleteExam(id);
  }
}

export { Exam, ExamController };

const ExamService = require("../../core/service/examService.js");
const CustomerService = require("../../core/service/customerService.js");
const Customer = {
  CURP: "GAMR020521HTSRNFA3",
  nombre: "Rafael",
  primer_apellido: "García",
  segundo_apellido: "Mendoza",
  fecnac: 20020521,
  edonac: "TA",
  sexo: "H",
  nacorigen: "MEX",
  edo: "TA",
  mun: "TAM",
  loc: "0239",
  compaqi_id: "CPACTPP00001ABCDE123",
};

beforeAll(async () => {
  await CustomerService.createCustomer(Customer);
});

test("Test 1 - Insert an exam", async () => {
    const exam = {
        cliente: "GAMR020521HTSRNFA3",
        fecha: "2023-05-02",
        rx: "1",
        lejos_od_esferico: "2",
        lejos_od_cilindrico: "3",
        lejos_od_eje: "1",
        lejos_od_agudeza_visual: "2",
        lejos_oi_esferico: "1",
        lejos_oi_cilindrico: "1",
        lejos_oi_eje: "2",
        lejos_oi_agudeza_visual: "1",
        adicion_od_esferico: "1",
        tipo_lentes: "1",
        observaciones: "¿Por qué esto no puede ser null?"

    }
    const res = await ExamService.createExam(exam);
    expect(res).toBe(true);
});

afterAll(async () => {
  await CustomerService.deleteCustomer(Customer.CURP);
});

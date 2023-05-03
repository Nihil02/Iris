const CustomerService = require("../../core/service/customerService");

test("Test 1 - Valid customer", async () => {
  const customer = {
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
  const res = await CustomerService.createCustomer(customer);
  expect(res).toBe(true);
});

test("Test 2 - Invalid CURP", async () => {
  const customer = {
    CURP: "GAMR020521HTSR",
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
  const res = await CustomerService.createCustomer(customer);
  expect(res).toBe(false);
});
afterAll(async () => {
  const curp = "GAMR020521HTSRNFA3";
  await CustomerService.deleteCustomer(curp);
});

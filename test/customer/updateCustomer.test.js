const CustomerService = require("../../core/service/customerService.js");

beforeAll(async () => {
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
    contpaq_id: "CPACTPP00001ABCDE123",
  };
  await CustomerService.createCustomer(customer);
});

test("Test 1 - Can update customer", async () => {
  const customer = {
    CURP: "GAMR020521HTSRNFA3",
    nombre: "Pepito",
    primer_apellido: "Hernandez",
    segundo_apellido: "Mendoza",
    fecnac: 20020521,
    edonac: "TA",
    sexo: "H",
    nacorigen: "MEX",
    edo: "TA",
    mun: "TAM",
    loc: "0239",
    contpaq_id: "CPACTPP00001ABCDE123",
  };

  const res = await CustomerService.updateCustomer(customer);
  expect(res).toBe(true);

  const updatedCustomer = await CustomerService.getCustomerByCURP("GAMR020521HTSRNFA3");
  expect(updatedCustomer.nombre).toBe("Pepito");

});

afterAll(async () => {
  const curp = "GAMR020521HTSRNFA3";
  await CustomerService.deleteCustomer(curp);
});

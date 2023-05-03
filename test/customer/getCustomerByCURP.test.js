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

test("Test 1 - Find an existent employee", async () => {
  const curp = "GAMR020521HTSRNFA3";
  const customer = await CustomerService.getCustomerByCURP(curp);
  expect(customer.nombre).toBe("Rafael");
});

test("Test 2 - Non existent customer", async () => {
    const curp = "this is not a curp";
    const customer = await CustomerService.getCustomerByCURP(curp);
    expect(customer).toBe(false);
})

test("Test 3 - Get all customers in database", async () => {
    const res = await CustomerService.getAllCustomers();
    expect(res.length).toBe(1);
})
afterAll(async () => {
  const curp = "GAMR020521HTSRNFA3";
  await CustomerService.deleteCustomer(curp);
});

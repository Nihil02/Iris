const {faker} = require("@faker-js/faker/locale/es_MX");

const createEmployee = () => {
    return {
        rfc: faker.string.uuid(),
        nombre: faker.person.firstName(),
        primer_apellido: faker.person.middleName(),
        segundo_apellido: faker.person.lastName(),
        usuario: faker.internet.userName(),
        privilegios: faker.helpers.arrayElement(['Normal', 'Administrador']),
        contrasenna: "12345"
    }
}
const createCustomer = () => {
    return {
        CURP: faker.string.uuid(),
        nombre: faker.person.firstName(),
        primer_apellido: faker.person.middleName(),
        segundo_apellido: faker.person.lastName(),
        telefono: faker.phone.number(),
        domicilio: faker.location.streetAddress(),
        fecnac: 19990123,
        edonac: "0000",
        sexo: faker.helpers.arrayElement(["H", "M"]),
        nacorigen: "0000",
        edo: "28",
        mun: "9",
        loc: "0000",

    }
}
const createSupplier = () => {
    return {
        rfc: faker.string.uuid(),
        razon_social: faker.company.name(),
        domicilio: faker.location.streetAddress(),
        correo_electronico: faker.internet.email(),
        telefono: faker.phone.number(),
        cuenta_bancaria: faker.finance.creditCardNumber()
    }
}
const createExam = (emplyeeID) => {
    return {
        cliente: emplyeeID,
        fecha: faker.date.anytime(),
        dp_od: faker.number.int({min: -12, max: 12}),
        dp_oi: faker.number.int({min: -12, max: 12}),
        oblea: faker.number.int({min: -12, max: 12}),
        lejos_od_esferico: faker.number.int({min: -12, max: 12}),
        lejos_od_cilindrico: faker.number.int({min: -12, max: 12}),
        lejos_od_eje: faker.number.int({min: -12, max: 12}),
        lejos_od_agudeza_visual: faker.number.int({min: -12, max: 12}),
        lejos_oi_esferico: faker.number.int({min: -12, max: 12}),
        lejos_oi_cilindrido: faker.number.int({min: -12, max: 12}),
        lejos_oi_eje: faker.number.int({min: -12, max: 12}),
        lejos_oi_agudeza_visual: faker.number.int({min: -12, max: 12}),
        adicion_od_esferico: faker.number.int({min: -12, max: 12}),
        adicion_oi_esferico: faker.number.int({min: -12, max: 12}),
        lejos_oi_cilindrico: faker.number.int({min: -12, max: 12}),
        tipo_lentes: faker.lorem.paragraph(),
        observaciones: faker.lorem.lines(2)
    }
}

module.exports = {
    createCustomer,
    createEmployee,
    createExam,
    createSupplier
}
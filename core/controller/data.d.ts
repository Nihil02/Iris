declare interface Data {
  dataValues: Object;
}

interface Employee {
  rfc: string;
  name: string;
  firstLastName: string;
  secondLastName: string;
  password: string;
}

interface Supplier {
  rfc: string;
  razon_social: string;
  domicilio: string;
  correo_electronico: string;
  telefono: string;
  cuenta_bancaria: string;
}

interface Customer {
  curp: string;
  name: string;
  firstLastName: string;
  secondLastName: string;
  fecnac: number;
  edonac: string;
  sexo: string;
  nacorigen: string;
  edo: string;
  mun: string;
  loc: string;
  compaqi_id: number;
}

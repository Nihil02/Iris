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
  banco: number;
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
}

interface Exam {
  cliente: string;
  fecha: string;
  rx: string;
  lejos_od_esferico: number;
  lejos_od_cilindrico: number;
  lejos_od_eje: number;
  lejos_od_agudeza_visual: number;
  lejos_oi_esferico: number;
  lejos_oi_cilindrico: number;
  lejos_oi_eje: number;
  lejos_oi_agudeza_visual: number;
  adicion_od_esferico: number;
  tipo_lentes: number;
  observaciones: string;
}

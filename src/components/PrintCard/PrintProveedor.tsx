import { ChangeEvent, Fragment, useEffect, useState } from "react";
import { FaPrint } from "react-icons/fa";
import { controller, format } from "../../util";
import { useParams } from "react-router-dom";

function PrintProveedor({ id = "" }) {
  let param = useParams();
  let [examen, setExamen] = useState({
    cliente: param.cliente + "", //Texto
    fecha: "", //Entero

    lejos_od_esferico: "0.00", //Decimal
    lejos_od_cilindrico: "0.00", //Decimal
    lejos_od_eje: "0.00", //Decimal
    lejos_od_agudeza: "0.00", //Decimal
    adicion_od_esferico: "0.00", //Decimal

    lejos_oi_esferico: "0.00", //Decimal
    lejos_oi_cilindrico: "0.00", //Decimal
    lejos_oi_eje: "0.00", //Decimal
    lejos_oi_agudeza: "0.00", //Decimal
    adicion_oi_esferico: "0.00", //Decimal

    dp_oi: "0.00", //Decimal
    dp_od: "0.00", //Decimal
    ob: "0.00", //Decimal

    tipo_lentes: "", //Texto
    observaciones: "", //Texto, opcional
  });

  /* Fetch data from the api to the component */
  useEffect(() => {
    async function getData() {
      const data = await controller.ExamController.getExamById(
        examen.cliente,
        id
      );

      examen.fecha = data.fecha;

      examen.lejos_od_esferico = format.numberDecFormat(data.lejos_od_esferico);
      examen.lejos_od_cilindrico = format.numberDecFormat(
        data.lejos_od_cilindrico
      );
      examen.lejos_od_eje = format.numberDecFormat(data.lejos_od_eje);
      examen.lejos_od_agudeza = format.numberDecFormat(
        data.lejos_od_agudeza_visual
      );
      examen.adicion_od_esferico = format.numberDecFormat(
        data.adicion_od_esferico
      );

      examen.lejos_oi_esferico = format.numberDecFormat(data.lejos_oi_esferico);
      examen.lejos_oi_cilindrico = format.numberDecFormat(
        data.lejos_oi_cilindrico
      );
      examen.lejos_oi_eje = format.numberDecFormat(data.lejos_oi_eje);
      examen.lejos_oi_agudeza = format.numberDecFormat(
        data.lejos_oi_agudeza_visual
      );
      examen.adicion_oi_esferico = format.numberDecFormat(
        data.adicion_oi_esferico
      );

      examen.dp_od = format.numberDecFormat(data.dp_od);
      examen.dp_oi = format.numberDecFormat(data.dp_oi);
      examen.ob = format.numberDecFormat(data.oblea);

      examen.tipo_lentes = data.tipo_lentes;
      examen.observaciones = data.observaciones;
    }
    getData();
  }, []);

  function printCard(e: { preventDefault: () => void; }) {
    e.preventDefault();
  }

  return (
    <>
      <button
        className="card-button bg-yellow-600 hover:bg-yellow-500"
        onClick={printCard}
      >
        <FaPrint size={16} color="white" />
      </button>
    </>
  );
}

export default PrintProveedor;

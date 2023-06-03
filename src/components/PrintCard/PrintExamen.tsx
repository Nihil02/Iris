import { useEffect, useState } from "react";
import { controller, format, messages, printFormat } from "../../util";
import { useParams } from "react-router-dom";
import { InfoDialog } from "../Dialogs";
import { sleep } from "../../util/delay";
import { PrintButton } from "../Buttons";

function PrintExamen({ id = "" }) {
  const param = useParams();
  const [cliente, setCliente] = useState("");
  const [examen, setExamen] = useState({
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

  let [isOpen, setIsOpen] = useState(false);
  async function openModal() {
    await sleep(200);
    setIsOpen(true);
  }

  /* Fetch data from the api to the component */
  useEffect(() => {
    async function getData() {
      const data = await controller.ExamController.getExamById(
        examen.cliente,
        id
      );
      const auxData = await controller.CustomerController.getCustomerById(
        examen.cliente
      );

      setCliente(
        auxData.nombre +
          " " +
          auxData.primer_apellido +
          " " +
          auxData.segundo_apellido
      );

      examen.fecha = data.fecha;

      examen.lejos_od_esferico = format.numberDecFormat(data.lejos_od_esferico);
      examen.lejos_od_cilindrico = format.numberDecFormat(
        data.lejos_od_cilindrico
      );
      examen.lejos_od_eje = format.numberDecFormat(data.lejos_od_eje);
      examen.lejos_od_agudeza = data.lejos_od_agudeza_visual;
      examen.adicion_od_esferico = format.numberDecFormat(
        data.adicion_od_esferico
      );

      examen.lejos_oi_esferico = format.numberDecFormat(data.lejos_oi_esferico);
      examen.lejos_oi_cilindrico = format.numberDecFormat(
        data.lejos_oi_cilindrico
      );
      examen.lejos_oi_eje = format.numberDecFormat(data.lejos_oi_eje);
      examen.lejos_oi_agudeza = data.lejos_oi_agudeza_visual;
      examen.adicion_oi_esferico = format.numberDecFormat(
        data.adicion_oi_esferico
      );

      examen.dp_od = data.dp_od;
      examen.dp_oi = data.dp_oi;
      examen.ob = format.numberDecFormat(data.oblea);

      examen.tipo_lentes = data.tipo_lentes;
      examen.observaciones = data.observaciones;
    }
    getData();
  }, []);

  function printCard(e: { preventDefault: () => void }) {
    e.preventDefault();
    const fecha = format.dateStringFormat(examen.fecha);
    const filename =
      cliente.replaceAll(" ", "-") +
      "-" +
      format.dateHTMLFormat(examen.fecha) +
      ".pdf";
    const ojoDerecho = {
      dp: examen.dp_od,
      lejos_esferico: examen.lejos_od_esferico,
      lejos_cilindrico: examen.lejos_od_cilindrico,
      lejos_eje: examen.lejos_od_eje,
      lejos_agudeza_visual: examen.lejos_od_agudeza,
      adicion_esferico: examen.adicion_od_esferico,
    };
    const ojoIzquierdo = {
      dp: examen.dp_oi,
      lejos_esferico: examen.lejos_oi_esferico,
      lejos_cilindrico: examen.lejos_oi_cilindrico,
      lejos_eje: examen.lejos_oi_eje,
      lejos_agudeza_visual: examen.lejos_oi_agudeza,
      adicion_esferico: examen.adicion_oi_esferico,
    };

    const pdf = printFormat.generateExamFormat(
      fecha,
      cliente,
      ojoDerecho,
      ojoIzquierdo,
      examen.ob,
      examen.tipo_lentes,
      examen.observaciones
    );
    controller.PrintController.printToPdf(pdf, "./public", "foo");
    /*const aTag = document.createElement("a");
    aTag.href = "./foo.pdf";
    aTag.setAttribute("download", filename);
    document.body.appendChild(aTag);
    aTag.click();
    aTag.remove();*/
    openModal();
  }

  return (
    <>
      <PrintButton onClick={printCard} />

      <InfoDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        msg={messages.infoPrint}
        pdf={true}
      />
    </>
  );
}

export default PrintExamen;

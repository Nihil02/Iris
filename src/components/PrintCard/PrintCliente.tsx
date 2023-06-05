import { useEffect, useState } from "react";
import { controller, format, messages, printFormat } from "../../util";
import { InfoDialog } from "../Dialogs";
import { sleep } from "../../util/delay";
import { PrintButton } from "../Buttons";

function PrintCliente({ id }) {
  const [cliente, setCliente] = useState({
    nombre: "",
    domicilio: "",
    telefono: "",
    fecNac: "",
    sexo: "",
  });

  let [isOpen, setIsOpen] = useState(false);
  async function openModal() {
    await sleep(200);
    setIsOpen(true);
  }

  /* Fetch data from the api to the component */
  useEffect(() => {
    async function getData() {
      const data = await controller.CustomerController.getCustomerById(id);
      cliente.nombre =
        data.nombre + " " + data.primer_apellido + " " + data.segundo_apellido;
      cliente.domicilio = data.domicilio + "";
      cliente.telefono = format.phoneStringFormat(data.telefono + "");
      cliente.fecNac = format.dateStringFormat(data.fecnac + "");
      data.sexo === "H" ? (cliente.sexo = "Hombre") : (cliente.sexo = "Mujer");
    }
    getData();
  }, []);

  function printCard(e: { preventDefault: () => void }) {
    e.preventDefault();
    const filename = cliente;
    const pdf = printFormat.generateClientFormat(cliente);
    const a = controller.PrintController.printToPdf(pdf, "./public", "foo");
    console.log(a);

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

export default PrintCliente;

import { useEffect, useState } from "react";
import { FaPrint } from "react-icons/fa";
import { controller, format, messages, printFormat } from "../../util";
import { InfoDialog } from "../Dialogs";

function PrintCliente({ id = "" }) {
  const [cliente, setCliente] = useState({
    CURP: "",
    nombre: "",
    domicilio: "",
    telefono: "",
    fecNac: "",
    sexo: "",
  });

  let [isOpen, setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }

  /* Fetch data from the api to the component */
  useEffect(() => {
    async function getData() {
      const data = await controller.CustomerController.getCustomerById(id);
      cliente.CURP = data.CURP;
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
    const filename = cliente.CURP;
    const pdf = printFormat.generateClientFormat(cliente);
    controller.PrintController.printToPdf(pdf, "./public", "foo");
    openModal();
  }

  return (
    <>
      <button
        className="card-button bg-yellow-600 hover:bg-yellow-500"
        onClick={printCard}
      >
        <FaPrint size={16} color="white" />
      </button>
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

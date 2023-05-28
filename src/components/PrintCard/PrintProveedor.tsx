import { useEffect, useState } from "react";
import { FaPrint } from "react-icons/fa";
import { controller, format, messages, printFormat } from "../../util";
import { InfoDialog } from "../Dialogs";

function PrintProveedor({ id = "" }) {
  let [proveedor, setProveedor] = useState({
    RFC: "",
    razonSocial: "",
    domicilio: "",
    telefono: "",
    correo: "",
    cuenta: "",
  });

  let [isOpen, setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }

  /* Fetch data from the api to the component */
  useEffect(() => {
    async function getData() {
      const data = await controller.SupplierController.getSupplierByRFC(id);
      proveedor.RFC = data.rfc;
      proveedor.razonSocial = data.razon_social;
      proveedor.domicilio = data.domicilio;
      proveedor.correo = data.correo_electronico;
      proveedor.cuenta = data.cuenta_bancaria;
      proveedor.telefono = format.phoneStringFormat(data.telefono);
    }
    getData();
  }, []);

  function printCard(e: { preventDefault: () => void }) {
    e.preventDefault();
    const filename = proveedor.RFC;
    const pdf = printFormat.generateSupplierFormat(proveedor);
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

export default PrintProveedor;

import { useEffect, useState } from "react";
import { FaPrint } from "react-icons/fa";
import { controller, format } from "../../util";
import generateSupplierFormat from "../../../public/printFormat/supplierPdfFormat";

function PrintProveedor({ id = "" }) {
  let [proveedor, setProveedor] = useState({
    rfc: "", //Text
    razon: "", //Text
    domicilio: "", //Text
    telefono: "", //Number
    correo: "", //Text
    cuenta: 0, //Number
  });

  /* Fetch data from the api to the component */
  useEffect(() => {
    async function getData() {
      const data = await controller.SupplierController.getSupplierByRFC(id);
      proveedor.rfc = data.rfc;
      proveedor.razon = data.razon_social;
      proveedor.domicilio = data.domicilio;
      proveedor.correo = data.correo_electronico;
      proveedor.cuenta = data.cuenta_bancaria;
      proveedor.telefono = data.telefono;
    }
    getData();
  }, []);

  function printCard(e: { preventDefault: () => void }) {
    e.preventDefault();
    const filename = proveedor.rfc;
    const pdf = generateSupplierFormat(
      proveedor.razon,
      proveedor.domicilio,
      proveedor.telefono,
      proveedor.correo,
      proveedor.cuenta
    );
    controller.PrintController.printToPdf(pdf, "./..", filename);
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

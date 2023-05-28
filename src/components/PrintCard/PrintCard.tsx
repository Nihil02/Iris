import { useLocation } from "react-router";
import { useParams } from "react-router-dom";
import PrintExamen from "./PrintExamen";
import PrintProveedor from "./PrintProveedor";
import PrintCliente from "./PrintCliente";

interface IPrintCard {
  id: string;
}

function PrintCard({ id }: IPrintCard) {
  const path = useLocation().pathname;
  let param = useParams();

  switch (path) {
    case "/cliente":
      return <PrintCliente id={id} />;

    case "/proveedor":
      return <PrintProveedor id={id} />;

    case "/examen/" + param.cliente:
      return <PrintExamen id={id} />;

    default:
      return <h1>Fallo</h1>;
  }
}

export default PrintCard;

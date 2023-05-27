import { useLocation } from "react-router";
import { useParams } from "react-router-dom";
import PrintExamen from "./PrintExamen";
import PrintProveedor from "./PrintProveedor";

interface IPrintCard {
  id: string;
}

function PrintCard(props: IPrintCard) {
  const path = useLocation().pathname;
  let param = useParams();

  switch (path) {
    case "/proveedor":
      return <PrintProveedor id={props.id} />;

    case "/examen/" + param.cliente:
      return <PrintExamen id={props.id} />;

    default:
      return <h1>Fallo</h1>;
  }
}

export default PrintCard;

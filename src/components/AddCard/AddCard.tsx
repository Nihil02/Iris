import { useLocation } from "react-router";
import { useParams } from "react-router-dom";
import AddCliente from "./AddCliente";
import AddProveedor from "./AddProveedor";
import AddEmpleado from "./AddEmpleado";
import AddExamen from "./AddExamen";

function AddCard() {
  const path = useLocation().pathname;
  let param = useParams();

  switch (path) {
    case "/cliente":
      return <AddCliente />;

    case "/proveedor":
      return <AddProveedor />;

    case "/usuario":
      return <AddEmpleado />;

    case "/examen/" + param.cliente:
      return <AddExamen />;

    default:
      return <h1>Fallo</h1>;
  }
}

export default AddCard;

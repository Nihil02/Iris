import { useLocation } from "react-router";
import AddCliente from "./AddCliente";
import AddProveedor from "./AddProveedor";
import AddEmpleado from "./AddEmpleado";
import AddExamen from "./AddExamen";

function AddCard() {
  const location = useLocation();

  if (location.pathname == "/cliente") {
    return (
      <>
        <AddCliente />
      </>
    );
  } else if (location.pathname == "/proveedor") {
    return (
      <>
        <AddProveedor />
      </>
    );
  } else if (location.pathname == "/usuario") {
    return (
      <>
        <AddEmpleado />
      </>
    );
  } else if (location.pathname == "/examen:cliente") {
    return (
      <>
        <AddExamen />
      </>
    );
  }  else {
    return (
      <>
        <h1>Fallo</h1>
      </>
    );
  }
}

export default AddCard;

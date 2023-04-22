import { useLocation } from "react-router";
import AddCliente from "./AddCardCliente";
import AddProveedor from "./AddCardProveedor";

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
  } else {
    return (
      <>
        <h1>Fallo</h1>
      </>
    );
  }
}

export default AddCard;

import { useLocation } from "react-router";
import ShowCliente from "./ShowCliente";

function AddCard() {
  const location = useLocation();

  switch (location.pathname) {
    case "/cliente":
      return (
        <>
          <ShowCliente />
        </>
      );

    default:
      return (
        <>
          <h1>Fallo</h1>
        </>
      );
  }
}

export default AddCard;

import { useLocation } from "react-router";
import ShowCliente from "./ShowCliente";
import ShowProveedor from "./ShowProveedor";

function AddCard({ name = "" }) {
  const location = useLocation();

  switch (location.pathname) {
    case "/cliente":
      return (
        <>
          <ShowCliente name={name} />
        </>
      );

    case "/proveedor":
      return (
        <>
          <ShowProveedor name={name} />
        </>
      );

    case "/usuario":
      return (
        <>
          <ShowProveedor name={name} />
        </>
      );

    case "/examen":
      return (
        <>
          <h1>Examen</h1>
        </>
      );

    default:
      return (
        <div className="flex flex-wrap items-center w-auto">
          <p className="text-sm leading-6  max-w-md">
            <strong className="font-semibold truncate">{name}</strong>
          </p>
        </div>
      );
  }
}

export default AddCard;

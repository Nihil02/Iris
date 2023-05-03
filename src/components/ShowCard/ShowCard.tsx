import { useLocation } from "react-router";
import { useParams } from "react-router-dom";
import ShowCliente from "./ShowCliente";
import ShowProveedor from "./ShowProveedor";
import ShowEmpleado from "./ShowEmpleado";

function ShowCard({ name = "", id = "" }) {
  const location = useLocation();
  let param = useParams();

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
          <ShowEmpleado id={id} name={name} />
        </>
      );

    case "/examen/" + param.cliente:
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

export default ShowCard;

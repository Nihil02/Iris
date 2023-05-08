import { useLocation } from "react-router";
import { useParams } from "react-router-dom";
import ShowCliente from "./ShowCliente";
import ShowProveedor from "./ShowProveedor";
import ShowEmpleado from "./ShowEmpleado";
import ShowExamen from "./ShowExamen";

function ShowCard({ name = "", id = "" }) {
  const location = useLocation();
  let param = useParams();

  switch (location.pathname) {
    case "/cliente":
      return (
        <>
          {<ShowCliente name={name} id={id}/>}
        </>
      );

    case "/proveedor":
      return (
        <>
          <ShowProveedor id={id} name={name} />
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
          <ShowExamen name = {name}/>
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

import { useLocation } from "react-router";
import { useParams } from "react-router-dom";
import { FaPen } from "react-icons/fa";
import UpdateEmpleado from "./UpdateEmpleado";
import UpdateCliente from "./UpdateCliente";
import UpdateProveedor from "./UpdateProveedor";
import UpdateExamen from "./UpdateExamen";

function UpdateCard({ id = "" }) {
  const location = useLocation();
  let param = useParams();

  switch (location.pathname) {
    case "/cliente":
      return <UpdateCliente id={id} />;

    case "/proveedor":
      return <UpdateProveedor id={id} />;

    case "/usuario":
      return <UpdateEmpleado id={id} />;

    case "/examen/" + param.cliente:
      return <UpdateExamen id={id} />;

    default:
      return (
        <button className="card-button bg-green-600 hover:bg-green-500">
          <FaPen size={16} color="white" />
        </button>
      );
  }
}

export default UpdateCard;

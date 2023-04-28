import { useLocation } from "react-router";
import { FaPen } from "react-icons/fa";
import UpdateEmpleado from "./UpdateEmpleado";

function UpdateCard({ id = "" }) {
  const location = useLocation();

  switch (location.pathname) {
    case "/cliente":
      return (
        <button className="card-button bg-green-600 hover:bg-green-500">
          <FaPen size={16} color="white" />
        </button>
      );

    case "/proveedor":
      return (
        <button className="card-button bg-green-600 hover:bg-green-500">
          <FaPen size={16} color="white" />
        </button>
      );

    case "/usuario":
      return (
        <>
          <UpdateEmpleado id={id} />
        </>
      );

    case "/examen":
      return (
        <button className="card-button bg-green-600 hover:bg-green-500">
          <FaPen size={16} color="white" />
        </button>
      );

    default:
      return (
        <button className="card-button bg-green-600 hover:bg-green-500">
          <FaPen size={16} color="white" />
        </button>
      );
  }
}

export default UpdateCard;
import { useLocation, useNavigate } from "react-router";
import DeleteCard from "./DeleteCard";
import UpdateCard from "./UpdateCard";
import { FaPrint } from "react-icons/fa";
import ShowCard from "./ShowCard/ShowCard";

const Card = ({ name = "" }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const cardClick = () => {
    if (location.pathname == "/cliente") {
      alert("Viendo examenes");
      navigate("/examen");
    } else {
      alert("Viendo la información de " + name);
    }
  };

  const cardPrint = () => {
    alert("Imprimiendo la información de " + name);
  };

  return (
    <>
      <div className="card">
        <div className="flex flex-wrap items-center w-auto" onClick={cardClick}>
          <p className="text-sm leading-6  max-w-md">
            <strong className="font-semibold truncate">{name}</strong>
          </p>
        </div>
        <ShowCard />
        <div className="flex flex-wrap absolute items-center gap-y-2 gap-x-4 right-4">
          <button
            className="card-button bg-yellow-600 hover:bg-yellow-500"
            onClick={cardPrint}
          >
            <FaPrint size={16} color="white" />
          </button>
          <UpdateCard />
          <DeleteCard />
        </div>
      </div>
    </>
  );
};

export default Card;

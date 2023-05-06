import { FaPrint } from "react-icons/fa";
import DeleteCard from "./DeleteCard";
import UpdateCard from "./UpdateCard";
import ShowCard from "./ShowCard";
import { useLocation, useParams } from "react-router-dom";

const Card = ({ id = "", name = "" }) => {
  /* Get the current location and their params */
  const location = useLocation().pathname;
  let param = useParams();

  const cardPrint = () => {
    alert("Imprimiendo la información de " + name);
  };

  return (
    <>
      <div className="card">
        <ShowCard name={name} id={id} />
        <div className="flex flex-wrap absolute items-center gap-y-2 gap-x-4 right-4">
          <button
            className="card-button bg-yellow-600 hover:bg-yellow-500"
            onClick={cardPrint}
          >
            <FaPrint size={16} color="white" />
          </button>
          <UpdateCard id={id} />
          {location != "/examen/" + param.cliente ? (
            <DeleteCard cardID={id} />
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Card;

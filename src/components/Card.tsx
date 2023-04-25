import DeleteCard from "./DeleteCard";
import UpdateCard from "./UpdateCard";
import { FaPrint } from "react-icons/fa";
import ShowCard from "./ShowCard/ShowCard";

const Card = ({ name = "" }) => {

  const cardPrint = () => {
    alert("Imprimiendo la información de " + name);
  };

  return (
    <>
      <div className="card">
        <ShowCard name = {name}/>
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

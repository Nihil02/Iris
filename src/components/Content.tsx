import { FaPrint, FaTrash, FaPen } from "react-icons/fa";
import AddCliente from "./AddCard";
import DeleteCard from "./DeleteCard";
import UpdateCard from "./UpdateCard";

const cards = [
  {
    nombre: "Ab",
  },
  {
    nombre: "Ba",
  },
];

async function getAllProveedores() {
  const res = await window.modelAPI.getAllProveedores();
  return res[0].dataValues;
}


function Content() {
  function renderCards() {
    return cards.map((card) => {
      return <Card name={card.nombre} />;
    });
  }

  return (
    <>
      <AddCliente />
      {renderCards()}
    </>
  );
}

const Card = ({ name = "" }) => {
  const cardClick = () => {
    alert("Viendo la información de " + name);
  };

  const cardPrint = () => {
    alert("Imprimiendo la información de " + name);
  };
  const cardUpdate = () => {
    alert("Modificando la información de " + name);
  };

  return (
    <div className="card">
      <div className="flex flex-wrap items-center w-auto" onClick={cardClick}>
        <p className="text-sm leading-6  max-w-md">
          <strong className="font-semibold truncate">{name}</strong>
        </p>
      </div>
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
  );
};

export default Content;

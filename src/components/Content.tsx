import { FaPlus, FaPrint, FaTrash, FaPen } from "react-icons/fa";

const cards = [
  {
    nombre: "Ab",
  },
  {
    nombre: "Ba",
  },
];

function Content() {
  function renderCards() {
    return cards.map((card) => {
      return <Card name={card.nombre}/>;
    });
  }

  return (
    <>
      <AddCardButton />
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
  const cardDelete = () => {
    alert("Eliminando la información de " + name);
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
          className="card-button bg-yellow-400 border-yellow-400"
          onClick={cardPrint}
        >
          <FaPrint size={16} color="white" />
        </button>
        <button
          className="card-button bg-green-400 border-green-400"
          onClick={cardUpdate}
        >
          <FaPen size={16} color="white" />
        </button>
        <button
          className="card-button bg-red-400 border-red-400"
          onClick={cardDelete}
        >
          <FaTrash size={16} color="white" />
        </button>
      </div>
    </div>
  );
};

function AddCardButton() {
  const addCard = () => {
    alert("Añadir registro");
  };

  return (
    <div className="add-card" onClick={addCard}>
      <FaPlus size={20} color="gray" />
    </div>
  );
}

export default Content;

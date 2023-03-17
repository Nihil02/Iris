import { FaPlus } from "react-icons/fa";

function Content() {
  return (
    <>
      <AddCardButton />
      <Card name="Maria Agustina Concepcion de la Torre Castro y Castro" />
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
      <div
        className="flex flex-wrap items-center w-auto"
        onClick={cardClick}
      >
        <p className="text-sm leading-6 max-w-prose">
          <strong className="font-semibold truncate ...">{name}</strong>
        </p>
      </div>
      <div className="flex flex-wrap absolute items-center gap-y-2 gap-x-4 right-4">
        <button className="card-button" onClick={cardPrint}>
          I
        </button>
        <button className="card-button" onClick={cardUpdate}>
          M
        </button>
        <button className="card-button" onClick={cardDelete}>
          B
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

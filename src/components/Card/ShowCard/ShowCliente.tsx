import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ShowCliente({ id = "", name = "" }) {
  const navigate = useNavigate();

  let [cliente, setCliente] = useState({
    id: "",
    nombre: "",
    apellido1: "",
    apellido2: "",
    fecha: "",
    estado: "32",
    municipio: "48",
    locacion: "0000",
    sexo: "H",
    compaq: "1",
  });

  /* Fetch data from the api to the component */
  useEffect(() => {
    async function getData() {
      //const data = await CustomerController.getCustomerById(id);
    }
    getData();
  }, []);

  /* Controls modal state */
  let [isOpen, setIsOpen] = useState(false);
  function closeModal() {
    setIsOpen(false);
  }
  function openModal() {
    setIsOpen(true);
  }

  const cancel = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    closeModal();
  };

  async function showCard(e: { preventDefault: () => void }) {
    e.preventDefault();

    if (id === "") {
      id = "1";
    }
    
    navigate("/examen/" + id);
  }

  return (
    <>
      <div className="flex flex-wrap items-center w-3/4 m-0 p-0 cursor-pointer" onClick={showCard}>
        <p className="text-sm leading-6 cursor-pointer">
          <strong className="font-semibold truncate cursor-pointer">{name}</strong>
        </p>
      </div>
    </>
  );
}

export default ShowCliente;

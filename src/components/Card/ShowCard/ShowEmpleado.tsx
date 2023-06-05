import { Transition, Dialog } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { controller } from "../../../util";

function ShowEmpleado({ id = "", name = "" }) {
  let [empleado, setEmpleado] = useState({
    rfc: "",
    nombre: "",
    apellido1: "",
    apellido2: "",
    privilegios: "",
    usuario: "",
  });

  /* Fetch data from the api to the component */
  useEffect(() => {
    async function getData() {
      const data = await controller.EmployeeController.getEmployeeByRFC(id);
      empleado.rfc = data.rfc;
      empleado.nombre = data.nombre;
      empleado.apellido1 = data.primer_apellido;
      empleado.apellido2 = data.segundo_apellido;
      empleado.usuario = data.usuario;

      switch (data.privilegios) {
        case "1":
          empleado.privilegios = "Común";
          break;
        case "2":
          empleado.privilegios = "Administrador";
          break;
        default:
          break;
      }
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
    openModal();
  }

  return (
    <>
      <div
        className="flex flex-wrap items-center w-3/4 m-0 p-0 cursor-pointer"
        onClick={showCard}
      >
        <p className="text-sm leading-6 cursor-pointer">
          <strong className="font-semibold truncate cursor-pointer">
            {name}
          </strong>
        </p>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="modal-panel">
                  <form className="m-4">
                    <div className="mb-6">
                      <label htmlFor="">RFC</label>
                      <input
                        type="text"
                        id=""
                        name=""
                        className="text-input"
                        value={empleado.rfc}
                        readOnly
                      />
                    </div>
                    <div className="mb-6">
                      <label htmlFor="">Nombre</label>
                      <input
                        type="text"
                        id=""
                        name=""
                        className="text-input"
                        value={empleado.nombre}
                        readOnly
                      />
                    </div>
                    <div className="mb-6">
                      <label htmlFor="">Primer Apellido</label>
                      <input
                        type="text"
                        id=""
                        name=""
                        className="text-input"
                        value={empleado.apellido1}
                        readOnly
                      />
                    </div>
                    <div className="mb-6">
                      <label htmlFor="">Segundo Apellido</label>
                      <input
                        type="text"
                        id=""
                        name=""
                        className="text-input"
                        value={empleado.apellido2}
                        readOnly
                      />
                    </div>

                    <div className="mb-6">
                      <label htmlFor="priv">Privilegios</label>
                      <input
                        type="text"
                        id=""
                        name=""
                        className="text-input"
                        value={empleado.privilegios}
                        readOnly
                      />
                    </div>
                    <div className="mb-6">
                      <label htmlFor="">Usuario</label>
                      <input
                        type="text"
                        id=""
                        name=""
                        className="text-input"
                        value={empleado.usuario}
                        readOnly
                      />
                    </div>

                    <div className="flex items-center justify-center gap-x-6 mt-4">
                      <button className="btn-danger" onClick={cancel}>
                        Salir
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

export default ShowEmpleado;

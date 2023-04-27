import { Transition, Dialog } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { EmployeeController } from "./../../../core/controller/employeeController";

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
      const data = await EmployeeController.getEmployeeByRFC(id);
      empleado.rfc = data.rfc;
      empleado.nombre = data.nombre;
      empleado.apellido1 = data.primer_apellido;
      empleado.apellido2 = data.segundo_apellido;
      empleado.privilegios = data.privilegios;
      empleado.usuario = data.usuario;
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

  async function showEmpleado(e: { preventDefault: () => void }) {
    e.preventDefault();
    openModal();
  }

  return (
    <>
      <div
        className="flex flex-wrap items-center w-auto"
        onClick={showEmpleado}
      >
        <p className="text-sm leading-6  max-w-md">
          <strong className="font-semibold truncate">{name}</strong>
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
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
                        Cancelar
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

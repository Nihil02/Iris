import { Transition, Dialog } from "@headlessui/react";
import { Fragment, useState } from "react";
import { FaPlus } from "react-icons/fa";

function AddCliente() {
  let [cliente, setCliente] = useState({
    curp: "",
    nombre: "",
    apellido1: "",
    apellido2: "",
    fecha: "",
    estado: "",
    municipio: "",
    locacion: "",
  });

  let [isOpen, setIsOpen] = useState(false);
  function closeModal() {
    setIsOpen(false);
  }
  function openModal() {
    setIsOpen(true);
  }

  const addCard = () => {
    setCliente({ ...cliente, fecha: cliente.fecha.replace("-", "") });
    console.log(cliente);

    closeModal();
  };

  return (
    <>
      <div className="add-card" onClick={openModal}>
        <FaPlus size={20} color="gray" />
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
                  <form className="m-4" onSubmit={addCard}>
                    <div className="mb-6">
                      <label htmlFor="">CURP</label>
                      <input
                        type="text"
                        id=""
                        name=""
                        className="text-input"
                        placeholder="CURP"
                        onChange={(e) =>
                          setCliente({ ...cliente, curp: e.target.value })
                        }
                        pattern="[A-Za-z]{4}[\d]{6}[H|M][A-Za-z]{5}[A-Za-z\d]{2}$"
                        required
                      />
                    </div>
                    <div className="mb-6">
                      <label htmlFor="">Nombre</label>
                      <input
                        type="text"
                        id=""
                        name=""
                        maxLength={50}
                        className="text-input"
                        pattern="[\w]+$"
                        placeholder="Nombre"
                        onChange={(e) =>
                          setCliente({ ...cliente, nombre: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="mb-6">
                      <label htmlFor="">Primer Apellido</label>
                      <input
                        type="text"
                        id=""
                        name=""
                        maxLength={50}
                        className="text-input"
                        placeholder="Primer Apellido"
                        onChange={(e) =>
                          setCliente({ ...cliente, apellido1: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="mb-6">
                      <label htmlFor="">Segundo Apellido</label>
                      <input
                        type="text"
                        id=""
                        name=""
                        maxLength={50}
                        className="text-input"
                        placeholder="Segundo Apellido"
                        onChange={(e) =>
                          setCliente({ ...cliente, apellido2: e.target.value })
                        }
                      />
                    </div>
                    <div className="mb-6">
                      <label htmlFor="">Fecha de Nacimiento</label>
                      <input
                        type="date"
                        id=""
                        name=""
                        className="text-input"
                        onChange={(e) =>
                          setCliente({ ...cliente, fecha: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="mb-6">
                      <fieldset>
                        <legend className="text-gray-900 text-sm leading-6">
                          Sexo
                        </legend>
                        <div className="mt-6 space-y-6">
                          <div className="flex items-center gap-x-3">
                            <input
                              id="sexo_h"
                              name="hombre"
                              type="radio"
                              className="h-4 w-4 "
                            />
                            <label
                              htmlFor="sexo_h"
                              className="block leading-6 text-gray-900 text-sm"
                            >
                              Hombre
                            </label>
                          </div>
                          <div className="flex items-center gap-x-3">
                            <input
                              id="sexo_m"
                              name="mujer"
                              type="radio"
                              className="h-4 w-4 "
                            />
                            <label
                              htmlFor="sexo_m"
                              className="block leading-6 text-gray-900 text-sm"
                            >
                              Mujer
                            </label>
                          </div>
                        </div>
                      </fieldset>
                    </div>
                    <div className="mb-6">
                      <label htmlFor="">Estado</label>
                      <input
                        type="number"
                        id=""
                        name=""
                        className="text-input"
                        placeholder="Estado"
                        onChange={(e) =>
                          setCliente({ ...cliente, estado: e.target.value })
                        }
                        defaultValue={28} //Tamaulipas
                        min={1}
                        max={32}
                        required
                      />
                    </div>
                    <div className="mb-6">
                      <label htmlFor="">Municipio</label>
                      <input
                        type="number"
                        id=""
                        name=""
                        className="text-input"
                        placeholder="Municipio"
                        onChange={(e) =>
                          setCliente({ ...cliente, municipio: e.target.value })
                        }
                        defaultValue={38} //C.d. Madero
                        min={1}
                        max={999}
                        required
                      />
                    </div>
                    <div className="mb-6">
                      <label htmlFor="">Locación</label>
                      <input
                        type="number"
                        id=""
                        name=""
                        className="text-input"
                        placeholder="Locación"
                        onChange={(e) =>
                          setCliente({ ...cliente, locacion: e.target.value })
                        }
                        min={1}
                        max={9999}
                      />
                    </div>

                    <div className="flex items-center justify-center gap-x-6 mt-4">
                      <button type="submit" className="btn-primary">
                        Agregar
                      </button>
                      <button className="btn-danger" onClick={closeModal}>
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

export default AddCliente;

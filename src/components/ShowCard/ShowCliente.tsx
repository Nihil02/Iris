import { Transition, Dialog } from "@headlessui/react";
import { Fragment, useState } from "react";

function ShowCliente({ name = ""}) {
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

  return (
    <>
      <div className="flex flex-wrap items-center w-auto" onClick={openModal}>
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
                <Dialog.Panel className="modal-panel">
                  <form className="m-4">
                    <div className="mb-6">
                      <label htmlFor="">CURP</label>
                      <input
                        type="text"
                        id=""
                        name=""
                        className="text-input"
                        value={cliente.curp}
                        readOnly
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
                        value={cliente.nombre}
                        readOnly
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
                        value={cliente.apellido1}
                        readOnly
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
                        value={cliente.apellido2}
                        readOnly
                      />
                    </div>
                    <div className="mb-6">
                      <label htmlFor="">Fecha de Nacimiento</label>
                      <input
                        type="date"
                        id=""
                        name=""
                        className="text-input"
                        value={cliente.fecha}
                        readOnly
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
                        value={cliente.estado}
                        readOnly
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
                        value={cliente.municipio}
                        readOnly
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
                        value={cliente.locacion}
                        readOnly
                      />
                    </div>

                    <div className="flex items-center justify-center gap-x-6 mt-4">
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

export default ShowCliente;

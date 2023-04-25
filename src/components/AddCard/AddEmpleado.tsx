import { Transition, Dialog } from "@headlessui/react";
import { Fragment, useState } from "react";
import { FaPlus } from "react-icons/fa";

function AddEmpleado() {
  let [empleado, setEmpleado] = useState({
    rfc: "",
    nombre: "",
    apellido1: "",
    apellido2: "",
    privilegios: "",
    usuario: "",
    pass: "",
  });

  let [isOpen, setIsOpen] = useState(false);
  function closeModal() {
    setIsOpen(false);
  }
  function openModal() {
    setIsOpen(true);
  }

  const addCard = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log("Registro agregado");
    console.log(empleado);

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
                      <label htmlFor="">RFC</label>
                      <input
                        type="text"
                        id=""
                        name=""
                        className="text-input"
                        placeholder="RFC"
                        onChange={(e) =>
                          setEmpleado({ ...empleado, rfc: e.target.value })
                        }
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
                        placeholder="Nombre"
                        onChange={(e) =>
                          setEmpleado({ ...empleado, nombre: e.target.value })
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
                          setEmpleado({
                            ...empleado,
                            apellido1: e.target.value,
                          })
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
                          setEmpleado({
                            ...empleado,
                            apellido2: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="mb-6">
                      <label htmlFor="priv">Privilegios</label>
                      <select
                        className="text-input"
                        name="priv"
                        id="priv"
                        onChange={(e) =>
                          setEmpleado({
                            ...empleado,
                            privilegios: e.target.value,
                          })
                        }
                      >
                        <option value="1">Común</option>
                        <option value="2">Administrador</option>
                      </select>
                    </div>
                    <div className="mb-6">
                      <label htmlFor="">Usuario</label>
                      <input
                        type="text"
                        id=""
                        name=""
                        maxLength={50}
                        className="text-input"
                        placeholder="Usuario"
                        onChange={(e) =>
                          setEmpleado({ ...empleado, usuario: e.target.value })
                        }
                      />
                    </div>
                    <div className="mb-6">
                      <label htmlFor="">Contraseña</label>
                      <input
                        type="text"
                        id=""
                        name=""
                        maxLength={50}
                        className="text-input"
                        placeholder="Contraseña"
                        onChange={(e) =>
                          setEmpleado({ ...empleado, pass: e.target.value })
                        }
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

export default AddEmpleado;

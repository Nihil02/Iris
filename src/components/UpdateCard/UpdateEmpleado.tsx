import { Transition, Dialog } from "@headlessui/react";
import { useState, Fragment, useEffect } from "react";
import { FaPen } from "react-icons/fa";
import { controller, regex } from "../../util";
import ErrorDialog from "../Dialogs/ErrorDialog";

function UpdateEmpleado({ id = "" }) {
  let [empleado, setEmpleado] = useState({
    rfc: "",
    nombre: "",
    apellido1: "",
    apellido2: "",
    privilegios: "",
    usuario: "",
    pass: "",
  });

  /* Fetch data from the api to the component */
  useEffect(() => {
    async function getData() {
      const data = await controller.EmployeeController.getEmployeeByRFC(id);
      empleado.rfc = data.rfc;
      empleado.nombre = data.nombre;
      empleado.apellido1 = data.primer_apellido;
      empleado.apellido2 = data.segundo_apellido;
      empleado.privilegios = data.privilegios;
      empleado.usuario = data.usuario;
    }
    getData();
  }, []);

  let [isError, setIsError] = useState(false);

  /* Controls modal state */
  let [isOpen, setIsOpen] = useState(false);
  function closeModal() {
    setIsOpen(false);
  }
  function openModal(e: { preventDefault: () => void }) {
    e.preventDefault();
    setIsOpen(true);
  }

  const cancel = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    closeModal();
  };

  const updateCard = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (isOpen) {
      const emp = new controller.Employee(
        empleado.rfc,
        empleado.nombre,
        empleado.apellido1,
        empleado.apellido2,
        empleado.usuario,
        empleado.pass,
        empleado.privilegios
      );
      if (await controller.EmployeeController.updateEmployee(emp)) {
        console.log("Modificando registro ");
        console.log(emp);
        closeModal();
        window.location.reload();
      } else {
        console.log("error");
        setIsError(true);
      }
    }
  };

  return (
    <>
      {/* Button in the card */}
      <button
        className="card-button bg-green-600 hover:bg-green-500"
        onClick={openModal}
      >
        <FaPen size={16} color="white" />
      </button>

      {/* Modal */}
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
                  <form className="m-4" onSubmit={updateCard}>
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
                        value={empleado.rfc}
                        pattern={regex.rfc}
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
                        value={empleado.nombre}
                        pattern={regex.name}
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
                        value={empleado.apellido1}
                        pattern={regex.name}
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
                        value={empleado.apellido2}
                        pattern={regex.name}
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
                        value={empleado.privilegios}
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
                        value={empleado.usuario}
                        onChange={(e) =>
                          setEmpleado({ ...empleado, usuario: e.target.value })
                        }
                        required
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
                        Modificar
                      </button>
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
      
      <ErrorDialog
        open={isError}
        setIsOpen={setIsError}
        msg="Error de modificación de datos\nRevise que se haya insertado datos correctos"
      />
    </>
  );
}

export default UpdateEmpleado;

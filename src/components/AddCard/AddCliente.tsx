import { Transition, Dialog } from "@headlessui/react";
import { ChangeEvent, Fragment, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { controller, regex, format, arrays, messages } from "../../util";
import ErrorDialog from "../Dialogs/ErrorDialog";

function AddCliente() {
  let [cliente, setCliente] = useState({
    curp: "",
    nombre: "",
    apellido1: "",
    apellido2: "",
    telefono: "",
    domicilio: "",
    fecha: "",
    estado: "28",
    municipio: "9",
    locacion: "0000",
    sexo: "H",
  });

  let [isError, setIsError] = useState(false);

  let [isOpen, setIsOpen] = useState(false);
  function closeModal() {
    setIsOpen(false);
  }
  function openModal() {
    setIsOpen(true);
  }

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    switch (name) {
      case "estado":
        setCliente((values) => ({ ...values, [name]: value + "" }));
        cliente.municipio = "01";
        break;

      default:
        setCliente((values) => ({ ...values, [name]: value }));
        setCliente((values) => ({ ...values, [name]: value + "" }));
        break;
    }
    console.log(cliente);
  };

  const addCard = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setCliente({ ...cliente, fecha: format.dateIntFormat(cliente.fecha) });

    if (isOpen) {
      const cli = new controller.Customer(
        cliente.curp,
        cliente.nombre,
        cliente.apellido1,
        cliente.apellido2,
        parseInt(cliente.fecha),
        "0000",
        cliente.sexo,
        "0000",
        cliente.estado,
        cliente.municipio,
        cliente.locacion,
        0,
        cliente.telefono,
        cliente.domicilio
      );

      if (await controller.CustomerController.createCustomer(cli)) {
        console.log(cli);
        closeModal();
        window.location.reload();
      } else {
        setIsError(true);
      }
    }
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
                <Dialog.Panel className="modal-panel">
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
                          setCliente({
                            ...cliente,
                            curp: e.target.value.toUpperCase(),
                          })
                        }
                        pattern={regex.curp}
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
                        pattern={regex.name}
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
                        pattern={regex.name}
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
                        pattern={regex.name}
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
                        onChange={(e) => {
                          let aux = e.target.value.replaceAll("-", "");
                          setCliente({ ...cliente, fecha: aux });
                        }}
                        required
                      />
                    </div>
                    <div className="mb-6">
                      <label htmlFor="sexo">Sexo</label>
                      <select
                        className="text-input"
                        name="sexo"
                        id="sexo"
                        onChange={(e) =>
                          setCliente({
                            ...cliente,
                            sexo: e.target.value,
                          })
                        }
                      >
                        <option value="H">Hombre</option>
                        <option value="M">Mujer</option>
                      </select>
                    </div>
                    <div className="mb-6">
                      <label htmlFor="">Telefono</label>
                      <input
                        type="number"
                        id=""
                        name=""
                        maxLength={20}
                        min={0}
                        className="text-input"
                        placeholder="Telefono"
                        onChange={(e) =>
                          setCliente({
                            ...cliente,
                            telefono: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <div className="mb-6">
                      <label htmlFor="">Domicilio</label>
                      <input
                        type="text"
                        id=""
                        name=""
                        className="text-input"
                        placeholder="Domicilio"
                        onChange={(e) =>
                          setCliente({ ...cliente, domicilio: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="mb-6">
                      <label htmlFor="">Estado</label>
                      <select
                        className="text-input"
                        name="estado"
                        id="estado"
                        value={cliente.estado}
                        onChange={(e) => handleChange(e)}
                      >
                        {arrays.states.map((s, i) => {
                          return <option value={i + 1}>{s}</option>;
                        })}
                      </select>
                    </div>
                    <div className="mb-6">
                      <label htmlFor="">Municipio</label>
                      <select
                        className="text-input"
                        name="municipio"
                        id="municipio"
                        value={cliente.municipio}
                        onChange={(e) => {
                          setCliente({
                            ...cliente,
                            municipio: e.target.value,
                          });
                        }}
                      >
                        {console.log(arrays.mun[parseInt(cliente.estado)]) + ""}
                        {arrays.mun[parseInt(cliente.estado) - 1].map(
                          (s, i) => {
                            return <option value={i + 1}>{s}</option>;
                          }
                        )}
                      </select>
                    </div>
                    {/*<div className="mb-6">
                      <label htmlFor="">Locación</label>
                      <input
                        type="number"
                        id=""
                        name=""
                        className="text-input"
                        placeholder="Locación"
                        value={cliente.locacion}
                        onChange={(e) =>
                          setCliente({ ...cliente, locacion: e.target.value })
                        }
                        min={0}
                        max={9999}
                      />
                    </div>*/}

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

      <ErrorDialog
        open={isError}
        setIsOpen={setIsError}
        msg={messages.errorInsertion}
      />
    </>
  );
}

export default AddCliente;

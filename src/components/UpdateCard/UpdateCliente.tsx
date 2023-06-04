import { Transition, Dialog } from "@headlessui/react";
import { ChangeEvent, Fragment, useEffect, useState } from "react";
import { arrays, controller, format, messages, regex } from "../../util";
import ErrorDialog from "../Dialogs/ErrorDialog";
import { UpdateButton } from "../Buttons";

function UpdateCliente({ id = "" }) {
  let [cliente, setCliente] = useState({
    curp: "",
    nombre: "",
    apellido1: "",
    apellido2: "",
    telefono: "",
    domicilio: "",
    fecha: "",
    estado: "01",
    municipio: "01",
    locacion: "",
    sexo: "",
  });

  /* Fetch data from the api to the component */
  useEffect(() => {
    async function getData() {
      const data = await controller.CustomerController.getCustomerById(id);

      cliente.curp = data.CURP;
      cliente.nombre = data.nombre;
      cliente.apellido1 = data.primer_apellido;
      cliente.apellido2 = data.segundo_apellido;
      cliente.telefono = data.telefono + "";
      cliente.domicilio = data.domicilio + "";
      cliente.fecha = data.fecnac + "";
      cliente.estado = data.edo;
      cliente.municipio = data.mun;
      cliente.locacion = data.loc;
      cliente.sexo = data.sexo;
    }
    getData();
  }, []);

  let [isError, setIsError] = useState(false);

  /* Controls modal state */
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
  };

  const updateCard = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (isOpen) {
      const cli = new controller.Customer(
        cliente.curp,
        format.nameFormat(cliente.nombre),
        format.nameFormat(cliente.apellido1),
        format.nameFormat(cliente.apellido2),
        parseInt(cliente.fecha),
        "0000",
        cliente.sexo,
        "0000",
        cliente.estado,
        cliente.municipio,
        cliente.locacion,
        cliente.telefono,
        cliente.domicilio
      );
      if (await controller.CustomerController.updateCustomer(cli)) {
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
      <UpdateButton onClick={openModal} />

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
                      <label htmlFor="">CURP</label>
                      <input
                        type="text"
                        id=""
                        name=""
                        className="text-input"
                        value={cliente.curp}
                        onChange={(e) =>
                          setCliente({
                            ...cliente,
                            curp: e.target.value.toUpperCase(),
                          })
                        }
                        pattern={regex.curp_rfc}
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
                        value={cliente.nombre}
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
                        value={cliente.apellido1}
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
                        value={cliente.apellido2}
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
                        max={new Date().toLocaleDateString("fr-ca")}
                        min={"1900-01-01"}
                        value={format.dateHTMLFormat(cliente.fecha + "")}
                        onChange={(e) => {
                          let aux = format.dateIntFormat(e.target.value);
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
                        value={cliente.sexo}
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
                      <label htmlFor="">Teléfono</label>
                      <input
                        type="tel"
                        id="tel"
                        name="tel"
                        pattern="[\d]{10}$"
                        className="text-input"
                        placeholder="Télefono"
                        value={cliente.telefono}
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
                        value={cliente.domicilio}
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
                          return (
                            <option key={i} value={i + 1}>
                              {s}
                            </option>
                          );
                        })}
                      </select>
                    </div>
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
                      {arrays.mun[parseInt(cliente.estado) - 1].map((s, i) => {
                        if (s !== "") {
                          return (
                            <option key={i} value={i + 1}>
                              {s}
                            </option>
                          );
                        }
                      })}
                    </select>

                    <div className="flex items-center justify-center gap-x-6 mt-4">
                      <button type="submit" className="btn-primary">
                        Modificar
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
        isOpen={isError}
        setIsOpen={setIsError}
        msg={messages.errorUpdate}
      />
    </>
  );
}

export default UpdateCliente;

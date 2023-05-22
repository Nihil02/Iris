import { Transition, Dialog } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { FaPen } from "react-icons/fa";
import { arrays, controller, format, regex } from "../../util";

function UpdateCliente({ id = "" }) {
  let [cliente, setCliente] = useState({
    curp: "",
    nombre: "",
    apellido1: "",
    apellido2: "",
    telefono: "",
    domicilio: "",
    fecha: "",
    estado: "",
    municipio: "",
    locacion: "",
    sexo: "",
  });

  /* Fetch data from the api to the component */
  useEffect(() => {
    async function getData() {
      const data = await controller.CustomerController.getCustomerById(id);
      console.log(data);

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

  /* Controls modal state */
  let [isOpen, setIsOpen] = useState(false);
  function closeModal() {
    setIsOpen(false);
  }
  function openModal() {
    setIsOpen(true);
  }

  const updateCard = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

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
      if (await controller.CustomerController.updateCustomer(cli)) {
        console.log("Insertando registro ");
        console.log(cli);
      } else {
        console.log("error");
        alert("Error, no se pudo modificar los datos");
      }
    }
    closeModal();
    window.location.reload();
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
                      <label htmlFor="">Telefono</label>
                      <input
                        type="number"
                        id=""
                        name=""
                        maxLength={20}
                        min={0}
                        className="text-input"
                        placeholder="Telefono"
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
                        onChange={(e) =>
                          setCliente({
                            ...cliente,
                            estado: e.target.value,
                          })
                        }
                      >
                        {arrays.states.map((s, i) => {
                          return <option value={i + 1}>{s}</option>;
                        })}
                      </select>
                    </div>
                    <div className="mb-6">
                      <label htmlFor="">Municipio</label>
                      <input
                        type="number"
                        id=""
                        name=""
                        className="text-input"
                        value={cliente.municipio}
                        onChange={(e) =>
                          setCliente({ ...cliente, municipio: e.target.value })
                        }
                        defaultValue={38} //C.d. Madero
                        min={0}
                        max={999}
                        required
                      />
                    </div>
                    {/*<div className="mb-6">
                      <label htmlFor="">Locación</label>
                      <input
                        type="number"
                        id=""
                        name=""
                        className="text-input"
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
    </>
  );
}

export default UpdateCliente;

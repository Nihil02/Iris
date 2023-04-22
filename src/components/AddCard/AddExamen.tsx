import { Transition, Dialog } from "@headlessui/react";
import { Fragment, useState } from "react";
import { FaPlus } from "react-icons/fa";

function AddExamen() {
  let [proveedor, setProveedor] = useState({
    rfc: "",
    razon: "",
    domicilio: "",
    telefono: "",
    correo: "",
    cuenta: "",
  });

  let [isOpen, setIsOpen] = useState(false);
  function closeModal() {
    setIsOpen(false);
  }
  function openModal() {
    setIsOpen(true);
  }

  const addCard = () => {
    console.log("Registro agregado");

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
                        onChange={(e) => setProveedor({...proveedor, rfc:e.target.value})}
                        required
                      />
                    </div>
                    <div className="mb-6">
                      <label htmlFor="">Razon Social</label>
                      <input
                        type="text"
                        id=""
                        name=""
                        maxLength={50}
                        className="text-input"
                        placeholder="Razon Social"
                        onChange={(e) => setProveedor({...proveedor, razon:e.target.value})}
                        required
                      />
                    </div>
                    <div className="mb-6">
                      <label htmlFor="">Domicilio</label>
                      <input
                        type="text"
                        id=""
                        name=""
                        maxLength={50}
                        className="text-input"
                        placeholder="Domicilio"
                        onChange={(e) => setProveedor({...proveedor, domicilio:e.target.value})}
                        required
                      />
                    </div>
                    <div className="mb-6">
                      <label htmlFor="">Telefono</label>
                      <input
                        type="text"
                        id=""
                        name=""
                        maxLength={50}
                        className="text-input"
                        placeholder="Telefono"
                        onChange={(e) => setProveedor({...proveedor, telefono:e.target.value})}
                        required
                      />
                    </div>
                    <div className="mb-6">
                      <label htmlFor="">Correo</label>
                      <input
                        type="text"
                        id=""
                        name=""
                        maxLength={50}
                        className="text-input"
                        placeholder="Correo"
                        onChange={(e) => setProveedor({...proveedor, correo:e.target.value})}
                        required
                      />
                    </div>
                    <div className="mb-6">
                      <label htmlFor="">Cuenta</label>
                      <input
                        type="text"
                        id=""
                        name=""
                        maxLength={50}
                        className="text-input"
                        placeholder="Cuenta"
                        onChange={(e) => setProveedor({...proveedor, cuenta:e.target.value})}
                        required
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

export default AddExamen;

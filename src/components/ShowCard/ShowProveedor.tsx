import { Transition, Dialog } from "@headlessui/react";
import { Fragment, useState } from "react";

function AddProveedor({ name = "" }) {
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <form className="m-4">
                    <div className="mb-6">
                      <label htmlFor="">RFC</label>
                      <input
                        type="text"
                        id=""
                        name=""
                        className="text-input"
                        value={proveedor.rfc}
                        readOnly
                      />
                    </div>
                    <div className="mb-6">
                      <label htmlFor="">Razon Social</label>
                      <input
                        type="text"
                        id=""
                        name=""
                        className="text-input"
                        value={proveedor.razon}
                        readOnly
                      />
                    </div>
                    <div className="mb-6">
                      <label htmlFor="">Domicilio</label>
                      <input
                        type="text"
                        id=""
                        name=""
                        className="text-input"
                        value={proveedor.domicilio}
                        readOnly
                      />
                    </div>
                    <div className="mb-6">
                      <label htmlFor="">Telefono</label>
                      <input
                        type="text"
                        id=""
                        name=""
                        className="text-input"
                        value={proveedor.telefono}
                        readOnly
                      />
                    </div>
                    <div className="mb-6">
                      <label htmlFor="">Correo</label>
                      <input
                        type="text"
                        id=""
                        name=""
                        className="text-input"
                        value={proveedor.correo}
                        readOnly
                      />
                    </div>
                    <div className="mb-6">
                      <label htmlFor="">Cuenta</label>
                      <input
                        type="text"
                        id=""
                        name=""
                        className="text-input"
                        value={proveedor.cuenta}
                        readOnly
                      />
                    </div>

                    <div className="flex items-center justify-center gap-x-6 mt-4">
                      <button className="btn-danger" onClick={closeModal}>
                        Regresar
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

export default AddProveedor;

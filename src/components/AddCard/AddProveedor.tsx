import { Transition, Dialog } from "@headlessui/react";
import { Fragment, useState } from "react";
import { controller, messages, regex } from "../../util";
import ErrorDialog from "../Dialogs/ErrorDialog";
import { AddButton } from "../Buttons";

function AddProveedor() {
  let [proveedor, setProveedor] = useState({
    rfc: "",
    razon: "",
    domicilio: "",
    telefono: "",
    correo: "",
    cuenta: "",
  });

  let [isError, setIsError] = useState(false);

  let [isOpen, setIsOpen] = useState(false);
  function closeModal() {
    setIsOpen(false);
  }
  function openModal() {
    setIsOpen(true);
  }

  const addCard = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (isOpen) {
      const sup = new controller.Supplier(
        proveedor.rfc,
        proveedor.razon,
        proveedor.domicilio,
        proveedor.correo,
        proveedor.telefono,
        proveedor.cuenta
      );
      if (await controller.SupplierController.createSupplier(sup)) {
        console.log(sup);
        closeModal();
        window.location.reload();
      } else {
        setIsError(true);
      }
    }
  };

  return (
    <>
      <AddButton onClick={openModal} />

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
                      <label htmlFor="">RFC</label>
                      <input
                        type="text"
                        id=""
                        name=""
                        className="text-input"
                        placeholder="RFC"
                        pattern={regex.rfc}
                        onChange={(e) =>
                          setProveedor({ ...proveedor, rfc: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="mb-6">
                      <label htmlFor="">Razon Social</label>
                      <input
                        type="text"
                        id=""
                        name=""
                        maxLength={250}
                        className="text-input"
                        placeholder="Razon Social"
                        onChange={(e) =>
                          setProveedor({ ...proveedor, razon: e.target.value })
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
                        maxLength={250}
                        className="text-input"
                        placeholder="Domicilio"
                        onChange={(e) =>
                          setProveedor({
                            ...proveedor,
                            domicilio: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <div className="mb-6">
                      <label htmlFor="">Teléfono</label>
                      <input
                        type="tel"
                        id="tel"
                        name="tel"
                        pattern="[\d]{10}$"
                        className="text-input"
                        placeholder="Telefono"
                        onChange={(e) =>
                          setProveedor({
                            ...proveedor,
                            telefono: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <div className="mb-6">
                      <label htmlFor="">Correo</label>
                      <input
                        type="email"
                        id=""
                        name=""
                        maxLength={50}
                        className="text-input"
                        placeholder="Correo"
                        onChange={(e) =>
                          setProveedor({ ...proveedor, correo: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="mb-6">
                      <label htmlFor="">Cuenta Bancaria</label>
                      <input
                        type="number"
                        id=""
                        name=""
                        maxLength={50}
                        minLength={16}
                        min={0}
                        className="text-input"
                        placeholder="Cuenta Bancaria"
                        onChange={(e) =>
                          setProveedor({ ...proveedor, cuenta: e.target.value })
                        }
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

      <ErrorDialog
        isOpen={isError}
        setIsOpen={setIsError}
        msg={messages.errorInsertion}
      />
    </>
  );
}

export default AddProveedor;

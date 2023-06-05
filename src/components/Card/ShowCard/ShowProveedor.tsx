import { Transition, Dialog } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { arrays, controller, format } from "../../../util";

function ShowProveedor({ id = "", name = "" }) {
  let [proveedor, setProveedor] = useState({
    rfc: "", //Text
    razon: "", //Text
    domicilio: "", //Text
    telefono: "", //Number
    correo: "", //Text
    banco: 0,
    cuenta: "", //Number
  });

  /* Fetch data from the api to the component */
  useEffect(() => {
    async function getData() {
      const data = await controller.SupplierController.getSupplierByRFC(id);

      proveedor.rfc = data.rfc;
      proveedor.razon = data.razon_social;
      proveedor.domicilio = data.domicilio;
      proveedor.correo = data.correo_electronico;
      proveedor.banco = data.banco;
      proveedor.cuenta = data.cuenta_bancaria;
      proveedor.telefono = data.telefono;
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

  async function showCard(e: { preventDefault: () => void }) {
    e.preventDefault();
    openModal();
  }

  return (
    <>
      <div
        className="flex flex-wrap items-center w-3/4 m-0 p-0 cursor-pointer"
        onClick={showCard}
      >
        <p className="text-sm leading-6 cursor-pointer">
          <strong className="font-semibold truncate cursor-pointer">
            {name}
          </strong>
        </p>
      </div>

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
                        disabled
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
                        disabled
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
                        disabled
                      />
                    </div>
                    <div className="mb-6">
                      <label htmlFor="">Telefono</label>
                      <input
                        type="text"
                        id=""
                        name=""
                        className="text-input"
                        value={format.phoneStringFormat(
                          proveedor.telefono + ""
                        )}
                        readOnly
                        disabled
                      />
                    </div>
                    <div className="mb-6">
                      <label htmlFor="">Correo</label>
                      <a
                        href={"mailto:" + proveedor.correo}
                        className="text-input"
                      >
                        {proveedor.correo}
                      </a>
                    </div>
                    <div className="mb-6">
                      <label htmlFor="">Banco</label>
                      <select
                        className="text-input"
                        name="banco"
                        id="banco"
                        value={proveedor.banco}
                        disabled
                      >
                        {arrays.bancos.map((b) => {
                          return (
                            <option key={b[0]} value={b[0]}>
                              {b[1]}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div className="mb-6">
                      <label htmlFor="">Cuenta Bancaria</label>
                      <input
                        type="text"
                        id=""
                        name=""
                        className="text-input"
                        value={proveedor.cuenta}
                        readOnly
                        disabled
                      />
                    </div>

                    <div className="flex items-center justify-center gap-x-6 mt-4">
                      <button className="btn-danger" onClick={closeModal}>
                        Salir
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

export default ShowProveedor;

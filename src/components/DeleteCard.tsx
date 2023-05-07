import { Transition, Dialog } from "@headlessui/react";
import { useState, Fragment } from "react";
import { FaTrash } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { EmployeeController, CustomerController } from "../util";

function DeleteCard({ cardID = "" }) {
  const path = useLocation().pathname;
  let [isOpen, setIsOpen] = useState(false);
  function closeModal() {
    setIsOpen(false);
  }
  function openModal() {
    setIsOpen(true);
  }

  async function deleteCard(e: { preventDefault: () => void }) {
    e.preventDefault();
    console.log("Borrando");
    console.log(cardID);
    
    

    if (isOpen) {
      let condition;

      switch (path) {
        case "/cliente":
          condition = await CustomerController.deleteCustomer(cardID);
          if (condition) {
            console.log("eliminado registro " + cardID);
          } else {
            console.log("error");
          }
          break;

        case "/usuario":
          condition = await EmployeeController.deleteEmployee(cardID);
          if (condition) {
            console.log("eliminado registro " + cardID);
          } else {
            console.log("error");
          }
          break;

        default:
          break;
      }

      //window.location.reload();
      closeModal();
    }
  }

  return (
    <>
      <button
        className="card-button bg-red-600 hover:bg-red-500"
        onClick={openModal}
      >
        <FaTrash size={16} color="white" />
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
                <Dialog.Panel className=" w-6/12 max-w-sm transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle content-center shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Eliminar
                  </Dialog.Title>

                  <div className="mt-2">
                    <p text-md text-gray-500>
                      ¿Está seguro de eliminar el registro?
                    </p>
                  </div>

                  <div className="flex items-center justify-center gap-x-6 mt-4">
                    <button onClick={deleteCard} className="btn-danger">
                      Borrar
                    </button>
                    <button onClick={closeModal} className="btn-primary">
                      Cancelar
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

export default DeleteCard;

import { Transition, Dialog } from "@headlessui/react";
import { useState, Fragment } from "react";
import { useLocation, useParams } from "react-router-dom";
import { controller } from "../../util";
import { DeleteButton } from "./../Buttons";

function DeleteCard({ id = "" }) {
  /* Get current location and their params */
  const path = useLocation().pathname;
  let param = useParams();

  /* Controls modal state */
  let [isOpen, setIsOpen] = useState(false);
  function closeModal() {
    setIsOpen(false);
  }
  function openModal() {
    setIsOpen(true);
  }

  async function deleteCard(e: { preventDefault: () => void }) {
    e.preventDefault();

    if (isOpen) {
      let condition;

      switch (path) {
        case "/cliente":
          condition = await controller.CustomerController.deleteCustomer(
            parseInt(id)
          );
          if (condition) {
            console.log("eliminado registro " + id);
          } else {
            console.log("error");
          }
          break;

        case "/proveedor":
          condition = await controller.SupplierController.deleteSupplier(id);
          if (condition) {
            console.log("eliminado registro " + id);
          } else {
            console.log("error");
          }
          break;

        case "/usuario":
          condition = await controller.EmployeeController.deleteEmployee(id);
          if (condition) {
            console.log("eliminado registro " + id);
          } else {
            console.log("error");
          }
          break;

        case "/examen/" + param.cliente:
          condition = await controller.ExamController.deleteExam(
            parseInt(param.cliente + "")
          );
          if (condition) {
            console.log("eliminado registro " + id);
          } else {
            console.log("error");
          }
          break;

        default:
          console.log("Why");
          break;
      }

      window.location.reload();
      closeModal();
    }
  }

  return (
    <>
      <DeleteButton onClick={openModal} />

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

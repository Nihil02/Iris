import { Transition, Dialog } from "@headlessui/react";
import { Fragment } from "react";
import { IDialog } from ".";
import { controller } from "../../util";

interface IProps extends IDialog {
  restore?: boolean;
}

function BackupDialog({ isOpen, setIsOpen, msg, title = "Info" }: IProps) {
  function closeModal() {
    setIsOpen(false);
  }
  function openModal() {
    setIsOpen(true);
  }
  function restoreDB() {
    controller.BackUpcontroller.getBackUp();
    closeModal();
    window.location.reload();
  }

  return (
    <>
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
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-bold leading-6 py-2 text-yellow-600"
                  >
                    {title}
                  </Dialog.Title>
                  <p>{msg}</p>
                  <div className="flex items-center justify-center gap-x-6 mt-4">
                    <button onClick={restoreDB} className="btn-primary">
                      Continuar
                    </button>
                    <button onClick={closeModal} className="btn-danger">
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

export default BackupDialog;

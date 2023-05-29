import { Transition, Dialog } from "@headlessui/react";
import { Fragment } from "react";
import PDFViewer from "../PDFViewer";
import { IDialog } from ".";

interface IProps extends IDialog {
  pdf?: boolean;
}

function InfoDialog({
  isOpen,
  setIsOpen,
  msg,
  title = "Info",
  pdf = false,
}: IProps) {
  function closeModal() {
    setIsOpen(false);
  }
  function openModal() {
    setIsOpen(true);
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
                  {pdf ? <PDFViewer /> : null}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

export default InfoDialog;

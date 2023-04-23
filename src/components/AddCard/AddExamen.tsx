import { Transition, Dialog } from "@headlessui/react";
import { Fragment, useState } from "react";
import { FaPlus } from "react-icons/fa";

function AddExamen() {
  let [examen, setExamen] = useState({
    cliente: "",
    fecha: "",
    rx: "",

    lejos_od_esferico: "",
    lejos_od_cilindrico: "",
    lejos_od_eje: "",
    lejos_od_agudeza: "",
    adicion_od_esferico: "",

    lejos_oi_esferico: "",
    lejos_oi_cilindrico: "",
    lejos_oi_eje: "",
    lejos_oi_agudeza: "",
    adicion_oi_esferico: "",

    tipo_lentes: "",
    observaciones: "",
  });

  let [isOpen, setIsOpen] = useState(false);
  function closeModal() {
    setIsOpen(false);
  }
  function openModal() {
    setIsOpen(true);
  }

  const addCard = () => {
    setExamen({ ...examen, fecha: examen.fecha.replace("-", "") });
    console.log(examen);

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
                      <label htmlFor="">Cliente</label>
                      <input
                        type="text"
                        id=""
                        name=""
                        className="text-input"
                        readOnly
                        placeholder="Cliente"
                        required
                      />
                    </div>
                    <div className="mb-6">
                      <label htmlFor="">RX</label>
                      <input
                        type="text"
                        id=""
                        name=""
                        maxLength={50}
                        className="text-input"
                        placeholder="RX"
                        onChange={(e) =>
                          setExamen({ ...examen, rx: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="mb-6">
                      <label htmlFor="">Fecha de Nacimiento</label>
                      <input
                        type="date"
                        id=""
                        name=""
                        className="text-input"
                        onChange={(e) =>
                          setExamen({ ...examen, fecha: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="mb-6">
                      <label htmlFor="">Tipo de Lentes</label>
                      <input
                        type="text"
                        id=""
                        name=""
                        maxLength={50}
                        className="text-input"
                        placeholder="Tipo de Lentes"
                        onChange={(e) =>
                          setExamen({ ...examen, tipo_lentes: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="mb-6">
                      <label htmlFor="">Observaciones</label>
                      <input
                        type="text"
                        id=""
                        name=""
                        className="text-input"
                        placeholder="Observaciones"
                        onChange={(e) =>
                          setExamen({
                            ...examen,
                            observaciones: e.target.value,
                          })
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
    </>
  );
}

export default AddExamen;

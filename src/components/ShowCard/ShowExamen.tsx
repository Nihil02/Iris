import { Transition, Dialog } from "@headlessui/react";
import { Fragment, useState } from "react";

function ShowExamen({name = ""}) {
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
  function openModal(e: { preventDefault: () => void }) {
    e.preventDefault();
    setIsOpen(true);
  }

  const addCard = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setExamen({ ...examen, fecha: examen.fecha.replace("-", "") });
    console.log(examen);
    closeModal();
  };

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
                <Dialog.Panel className="modal-panel">
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
                        value={examen.cliente}
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
                      <label htmlFor="">Fecha de Captura</label>
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
                    <div className="mb-6 w-full justify-center items-center">
                      <table className="table-fixed">
                        <thead className="text-center text-sm">
                          <tr>
                            <th></th>
                            <th>Esférico</th>
                            <th>Cilíndrico</th>
                            <th>Eje</th>
                            <th>Agudeza</th>
                          </tr>
                        </thead>
                        <tbody>
                          {/* Ojo Derecho Lejos */}
                          <tr>
                            <td className="pr-6">Lejos</td>
                            <td>
                              <input
                                type="number"
                                name=""
                                id=""
                                className="table-input"
                                step={0.25}
                                max={12.0}
                                min={-12.0}
                                placeholder="0.00"
                                onChange={(e) =>
                                  setExamen({ ...examen, lejos_od_esferico: e.target.value })
                                }
                              />
                            </td>
                            <td>
                              <input
                                type="number"
                                name=""
                                id=""
                                className="table-input"
                                step={0.25}
                                max={12.0}
                                min={-12.0}
                                placeholder="0.00"
                                onChange={(e) =>
                                  setExamen({ ...examen, lejos_od_cilindrico: e.target.value })
                                }
                              />
                            </td>
                            <td>
                              <input
                                type="number"
                                name=""
                                id=""
                                className="table-input"
                                step={0.25}
                                max={12.0}
                                min={-12.0}
                                placeholder="0.00"
                                onChange={(e) =>
                                  setExamen({ ...examen, lejos_od_eje: e.target.value })
                                }
                              />
                            </td>
                            <td>
                              <input
                                type="number"
                                name=""
                                id=""
                                className="table-input"
                                step={0.25}
                                max={12.0}
                                min={-12.0}
                                placeholder="0.00"
                                onChange={(e) =>
                                  setExamen({ ...examen, lejos_od_agudeza: e.target.value })
                                }
                              />
                            </td>
                          </tr>
                          
                          {/* Ojo Izquierdo Lejos */}
                          <tr>
                            <td></td>
                            <td>
                              <input
                                type="number"
                                name=""
                                id=""
                                className="table-input"
                                step={0.25}
                                max={12.0}
                                min={-12.0}
                                placeholder="0.00"
                                onChange={(e) =>
                                  setExamen({ ...examen, lejos_oi_esferico: e.target.value })
                                }
                              />
                            </td>
                            <td>
                              <input
                                type="number"
                                name=""
                                id=""
                                className="table-input"
                                step={0.25}
                                max={12.0}
                                min={-12.0}
                                placeholder="0.00"
                                onChange={(e) =>
                                  setExamen({ ...examen, lejos_oi_cilindrico: e.target.value })
                                }
                              />
                            </td>
                            <td>
                              <input
                                type="number"
                                name=""
                                id=""
                                className="table-input"
                                step={0.25}
                                max={12.0}
                                min={-12.0}
                                placeholder="0.00"
                                onChange={(e) =>
                                  setExamen({ ...examen, lejos_oi_eje: e.target.value })
                                }
                              />
                            </td>
                            <td>
                              <input
                                type="number"
                                name=""
                                id=""
                                className="table-input"
                                step={0.25}
                                max={12.0}
                                min={-12.0}
                                placeholder="0.00"
                                onChange={(e) =>
                                  setExamen({ ...examen, lejos_oi_agudeza: e.target.value })
                                }
                              />
                            </td>
                          </tr>

                          {/* Ojo Derecho Adición */}
                          <tr>
                            <td className="pr-6">Adición</td>
                            <td>
                              <input
                                type="number"
                                name=""
                                id=""
                                className="table-input"
                                step={0.25}
                                max={12.0}
                                min={-12.0}
                                placeholder="0.00"
                                onChange={(e) =>
                                  setExamen({ ...examen, adicion_od_esferico: e.target.value })
                                }
                              />
                            </td>
                          </tr>
                          
                          {/* Ojo Izquierdo Adición */}
                          <tr>
                            <td></td>
                            <td>
                              <input
                                type="number"
                                name=""
                                id=""
                                className="table-input"
                                step={0.25}
                                max={12.0}
                                min={-12.0}
                                placeholder="0.00"
                                onChange={(e) =>
                                  setExamen({ ...examen, adicion_oi_esferico: e.target.value })
                                }
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
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
                      <textarea
                        id=""
                        name=""
                        className="text-input"
                        placeholder="Observaciones"
                        rows={3}
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

export default ShowExamen;

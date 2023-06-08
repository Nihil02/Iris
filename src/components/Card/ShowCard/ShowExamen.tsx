import { Transition, Dialog } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { controller, format } from "../../../util";
import { useParams } from "react-router";

function ShowExamen({ id = "", name = "" }) {
  let param = useParams().cliente + "";
  const [examen, setExamen] = useState({
    cliente: param, //Texto
    nombre_cliente: "",
    fecha: "", //Entero

    lejos_od_esferico: "", //Decimal
    lejos_od_cilindrico: "", //Decimal
    lejos_od_eje: "", //Decimal
    lejos_od_agudeza: "", //Decimal
    adicion_od_esferico: "", //Decimal

    lejos_oi_esferico: "", //Decimal
    lejos_oi_cilindrico: "", //Decimal
    lejos_oi_eje: "", //Decimal
    lejos_oi_agudeza: "", //Decimal
    adicion_oi_esferico: "", //Decimal

    dp_oi: "", //Decimal
    dp_od: "", //Decimal
    ob: "", //Decimal

    tipo_lentes: "", //Texto
    observaciones: "", //Texto, opcional
  });

  /* Fetch data from the api to the component */
  useEffect(() => {
    async function getData() {
      const data = await controller.ExamController.getExamById(
        parseInt(param),
        id
      );
      const auxData = await controller.CustomerController.getCustomerById(
        parseInt(param)
      );
      examen.nombre_cliente =
        auxData.nombre +
        " " +
        auxData.primer_apellido +
        " " +
        auxData.segundo_apellido;

      examen.fecha = data.fecha;

      examen.lejos_od_esferico = format.numberDecFormat(data.lejos_od_esferico);
      examen.lejos_od_cilindrico = format.numberDecFormat(
        data.lejos_od_cilindrico
      );
      examen.lejos_od_eje = format.numberDecFormat(data.lejos_od_eje);
      examen.lejos_od_agudeza = data.lejos_od_agudeza_visual;
      examen.adicion_od_esferico = format.numberDecFormat(
        data.adicion_od_esferico
      );

      examen.lejos_oi_esferico = format.numberDecFormat(data.lejos_oi_esferico);
      examen.lejos_oi_cilindrico = format.numberDecFormat(
        data.lejos_oi_cilindrico
      );
      examen.lejos_oi_eje = format.numberDecFormat(data.lejos_oi_eje);
      examen.lejos_oi_agudeza = data.lejos_oi_agudeza_visual;
      examen.adicion_oi_esferico = format.numberDecFormat(
        data.adicion_oi_esferico
      );

      examen.dp_od = data.dp_od;
      examen.dp_oi = data.dp_oi;
      examen.ob = format.numberDecFormat(data.oblea);

      examen.tipo_lentes = data.tipo_lentes;
      examen.observaciones = data.observaciones;
    }
    getData();
    console.log("Hola" + param);
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
                      <label htmlFor="">Cliente</label>
                      <input
                        type="text"
                        id=""
                        name=""
                        className="text-input"
                        placeholder="Cliente"
                        value={examen.nombre_cliente}
                        readOnly
                      />
                    </div>
                    <div className="mb-6">
                      <label htmlFor="">Fecha de Captura</label>
                      <input
                        type="date"
                        id=""
                        name=""
                        className="text-input"
                        value={format.dateHTMLFormat(examen.fecha)}
                        readOnly
                      />
                    </div>
                    <div className="mb-6"></div>
                    <div className="mb-6 w-full justify-center items-center">
                      <label htmlFor="">RX</label>
                      <hr className="mb-6 mt-3" />
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
                                type="text"
                                name=""
                                className="table-input"
                                readOnly
                                value={examen.lejos_od_esferico}
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                name=""
                                className="table-input"
                                readOnly
                                value={examen.lejos_od_cilindrico}
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                name=""
                                className="table-input"
                                readOnly
                                value={examen.lejos_od_eje}
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                name=""
                                className="table-input"
                                readOnly
                                value={examen.lejos_od_agudeza}
                              />
                            </td>
                          </tr>

                          {/* Ojo Izquierdo Lejos */}
                          <tr>
                            <td></td>
                            <td>
                              <input
                                type="text"
                                name=""
                                className="table-input"
                                readOnly
                                value={examen.lejos_oi_esferico}
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                name=""
                                className="table-input"
                                readOnly
                                value={examen.lejos_oi_cilindrico}
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                name=""
                                className="table-input"
                                readOnly
                                value={examen.lejos_oi_eje}
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                name=""
                                className="table-input"
                                readOnly
                                value={examen.lejos_oi_agudeza}
                              />
                            </td>
                          </tr>

                          {/* Ojo Derecho Adición */}
                          <tr>
                            <td className="pr-6">Adición</td>
                            <td>
                              <input
                                type="text"
                                name=""
                                className="table-input"
                                readOnly
                                value={examen.adicion_od_esferico}
                              />
                            </td>
                          </tr>

                          {/* Ojo Izquierdo Adición */}
                          <tr>
                            <td></td>
                            <td>
                              <input
                                type="text"
                                name=""
                                className="table-input"
                                readOnly
                                value={examen.adicion_oi_esferico}
                              />
                            </td>
                          </tr>
                          <tr>
                            <br />
                          </tr>
                        </tbody>

                        <thead className="text-center text-sm">
                          <tr>
                            <th></th>
                            <th>Derecho</th>
                            <th>Izquierdo</th>
                          </tr>
                        </thead>
                        <tbody>
                          {/* DP */}
                          <tr>
                            <td className="pr-12">DP</td>
                            <td>
                              <input
                                type="text"
                                name=""
                                id=""
                                className="table-input"
                                readOnly
                                value={examen.dp_od}
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                name=""
                                id=""
                                className="table-input"
                                readOnly
                                value={examen.dp_oi}
                              />
                            </td>
                          </tr>

                          <tr>
                            <br />
                          </tr>
                        </tbody>

                        <thead className="text-center text-sm">
                          <tr>
                            <th></th>
                            <th>Oblea</th>
                          </tr>
                        </thead>
                        <tbody>
                          {/* Oblea */}
                          <tr>
                            <td className="pr-10">Oblea</td>
                            <td>
                              <input
                                type="text"
                                name=""
                                id=""
                                className="table-input"
                                readOnly
                                value={examen.ob}
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="mb-6">
                      {/* Otros datos */}
                      <table className="table-fixed"></table>
                    </div>
                    <div className="mb-6">
                      <label htmlFor="">Tipo de Lentes</label>
                      <input
                        type="text"
                        id=""
                        name=""
                        className="text-input"
                        value={examen.tipo_lentes}
                        readOnly
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
                        value={examen.observaciones}
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

export default ShowExamen;

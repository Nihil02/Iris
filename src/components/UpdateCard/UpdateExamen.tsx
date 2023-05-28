import { Transition, Dialog } from "@headlessui/react";
import { ChangeEvent, Fragment, useEffect, useState } from "react";
import { FaPen } from "react-icons/fa";
import { controller, format } from "../../util";
import { useParams } from "react-router-dom";
import ErrorDialog from "../Dialogs/ErrorDialog";

function UpdateExamen({ id = "" }) {
  let param = useParams();
  let [examen, setExamen] = useState({
    cliente: param.cliente + "", //Texto
    fecha: "", //Entero

    lejos_od_esferico: "0.00", //Decimal
    lejos_od_cilindrico: "0.00", //Decimal
    lejos_od_eje: "0.00", //Decimal
    lejos_od_agudeza: "0.00", //Decimal
    adicion_od_esferico: "0.00", //Decimal

    lejos_oi_esferico: "0.00", //Decimal
    lejos_oi_cilindrico: "0.00", //Decimal
    lejos_oi_eje: "0.00", //Decimal
    lejos_oi_agudeza: "0.00", //Decimal
    adicion_oi_esferico: "0.00", //Decimal

    dp_oi: "0.00", //Decimal
    dp_od: "0.00", //Decimal
    ob: "0.00", //Decimal

    tipo_lentes: "", //Texto
    observaciones: "", //Texto, opcional
  });

  /* Fetch data from the api to the component */
  useEffect(() => {
    async function getData() {
      const data = await controller.ExamController.getExamById(
        examen.cliente,
        id
      );

      examen.fecha = data.fecha;

      examen.lejos_od_esferico = format.numberDecFormat(data.lejos_od_esferico);
      examen.lejos_od_cilindrico = format.numberDecFormat(
        data.lejos_od_cilindrico
      );
      examen.lejos_od_eje = format.numberDecFormat(data.lejos_od_eje);
      examen.lejos_od_agudeza = format.numberDecFormat(
        data.lejos_od_agudeza_visual
      );
      examen.adicion_od_esferico = format.numberDecFormat(
        data.adicion_od_esferico
      );

      examen.lejos_oi_esferico = format.numberDecFormat(data.lejos_oi_esferico);
      examen.lejos_oi_cilindrico = format.numberDecFormat(
        data.lejos_oi_cilindrico
      );
      examen.lejos_oi_eje = format.numberDecFormat(data.lejos_oi_eje);
      examen.lejos_oi_agudeza = format.numberDecFormat(
        data.lejos_oi_agudeza_visual
      );
      examen.adicion_oi_esferico = format.numberDecFormat(
        data.adicion_oi_esferico
      );

      examen.dp_od = format.numberDecFormat(data.dp_od);
      examen.dp_oi = format.numberDecFormat(data.dp_oi);
      examen.ob = format.numberDecFormat(data.oblea);

      examen.tipo_lentes = data.tipo_lentes;
      examen.observaciones = data.observaciones;
    }
    getData();
  }, []);

  let [isError, setIsError] = useState(false);

  /* Controls modal state */
  let [isOpen, setIsOpen] = useState(false);
  function closeModal() {
    setIsOpen(false);
  }
  function openModal() {
    setIsOpen(true);
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setExamen((values) => ({ ...values, [name]: value }));
    setExamen((values) => ({ ...values, [name]: value + "" }));
    console.log(examen);
  };

  const updateCard = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setExamen(examen);

    if (isOpen) {
      const exa = new controller.Exam(
        examen.cliente,
        examen.fecha,
        parseFloat(examen.dp_od),
        parseFloat(examen.dp_oi),
        parseFloat(examen.ob),
        parseFloat(examen.lejos_od_esferico),
        parseFloat(examen.lejos_od_cilindrico),
        parseFloat(examen.lejos_od_eje),
        parseFloat(examen.lejos_od_agudeza),
        parseFloat(examen.lejos_oi_esferico),
        parseFloat(examen.lejos_oi_cilindrico),
        parseFloat(examen.lejos_oi_eje),
        parseFloat(examen.lejos_od_agudeza),
        parseFloat(examen.adicion_od_esferico),
        parseFloat(examen.adicion_oi_esferico),
        examen.tipo_lentes,
        examen.observaciones
      );

      if (await controller.ExamController.updateExam(exa)) {
        console.log("Modificando registro ");
        console.log(exa);
        closeModal();
        window.location.reload();
      } else {
        console.log("error");
        setIsError(true);
      }
    }
  };

  return (
    <>
      <button
        className="card-button bg-green-600 hover:bg-green-500"
        onClick={openModal}
      >
        <FaPen size={16} color="white" />
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
                <Dialog.Panel className="modal-panel">
                  <form className="m-4" onSubmit={updateCard}>
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
                      <label htmlFor="">Fecha de Captura</label>
                      <input
                        type="date"
                        id=""
                        name=""
                        className="text-input"
                        value={format.dateHTMLFormat(examen.fecha)}
                        onChange={(e) => {
                          let aux = format.dateIntFormat(e.target.value);
                          setExamen({ ...examen, fecha: aux });
                        }}
                        required
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
                                name="lejos_od_esferico"
                                className="table-input"
                                step={0.25}
                                max={12.0}
                                min={-12.0}
                                value={examen.lejos_od_esferico}
                                onChange={handleChange}
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                name="lejos_od_cilindrico"
                                className="table-input"
                                step={0.25}
                                max={12.0}
                                min={-12.0}
                                value={examen.lejos_od_cilindrico}
                                onChange={handleChange}
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                name="lejos_od_eje"
                                className="table-input"
                                step={0.25}
                                max={12.0}
                                min={-12.0}
                                value={examen.lejos_od_eje}
                                onChange={handleChange}
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                name="lejos_od_agudeza"
                                className="table-input"
                                step={0.25}
                                max={12.0}
                                min={-12.0}
                                value={examen.lejos_od_agudeza}
                                onChange={handleChange}
                              />
                            </td>
                          </tr>

                          {/* Ojo Izquierdo Lejos */}
                          <tr>
                            <td></td>
                            <td>
                              <input
                                type="text"
                                name="lejos_oi_esferico"
                                className="table-input"
                                step={0.25}
                                max={12.0}
                                min={-12.0}
                                value={examen.lejos_oi_esferico}
                                onChange={handleChange}
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                name="lejos_oi_cilindrico"
                                className="table-input"
                                step={0.25}
                                max={12.0}
                                min={-12.0}
                                value={examen.lejos_oi_cilindrico}
                                onChange={handleChange}
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                name="lejos_oi_eje"
                                className="table-input"
                                step={0.25}
                                max={12.0}
                                min={-12.0}
                                value={examen.lejos_oi_eje}
                                onChange={handleChange}
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                name="lejos_oi_agudeza"
                                className="table-input"
                                step={0.25}
                                max={12.0}
                                min={-12.0}
                                value={examen.lejos_oi_agudeza}
                                onChange={handleChange}
                              />
                            </td>
                          </tr>

                          {/* Ojo Derecho Adición */}
                          <tr>
                            <td className="pr-6">Adición</td>
                            <td>
                              <input
                                type="text"
                                name="adicion_od_esferico"
                                className="table-input"
                                step={0.25}
                                max={12.0}
                                min={-12.0}
                                value={examen.adicion_od_esferico}
                                onChange={handleChange}
                              />
                            </td>
                          </tr>

                          {/* Ojo Izquierdo Adición */}
                          <tr>
                            <td></td>
                            <td>
                              <input
                                type="text"
                                name="adicion_oi_esferico"
                                className="table-input"
                                step={0.25}
                                max={12.0}
                                min={-12.0}
                                value={examen.adicion_oi_esferico}
                                onChange={handleChange}
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
                                name="dp_od"
                                className="table-input"
                                step={0.25}
                                max={12.0}
                                min={-12.0}
                                value={examen.dp_od}
                                onChange={handleChange}
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                name="dp_oi"
                                className="table-input"
                                step={0.25}
                                max={12.0}
                                min={-12.0}
                                value={examen.dp_oi}
                                onChange={handleChange}
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
                                name="ob"
                                className="table-input"
                                step={0.25}
                                max={12.0}
                                min={-12.0}
                                value={examen.ob}
                                onChange={handleChange}
                              />
                            </td>
                            {/*<td>
                              <input
                                type="text"
                                name=""
                                id=""
                                className="table-input"
                                step={0.25}
                                max={12.0}
                                min={-12.0}
                                value={examen.ob_oi}
                                onChange={handleChange}
                              />
                            </td>*/}
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
                        value={examen.tipo_lentes}
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
                        value={examen.observaciones}
                        onChange={(e) =>
                          setExamen({
                            ...examen,
                            observaciones: e.target.value,
                          })
                        }
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
        open={isError}
        setIsOpen={setIsError}
        msg="Error de modificación de datos\nRevise que se haya insertado datos correctos"
      />
    </>
  );
}

export default UpdateExamen;

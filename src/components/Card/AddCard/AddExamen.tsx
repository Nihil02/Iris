import { ChangeEvent, useEffect, useState } from "react";
import { controller, format, messages } from "../../../util";
import { useParams } from "react-router-dom";
import ErrorDialog from "../../Dialogs/ErrorDialog";
import { AddButton } from "../../Buttons";
import { FormDialog } from "../../Dialogs";

function AddExamen() {
  let param = useParams().cliente + "";
  let [examen, setExamen] = useState({
    cliente: "", //Texto
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

    dp_oi: "", //Texto
    dp_od: "", //Texto
    ob: "", //Decimal

    tipo_lentes: "", //Texto
    observaciones: "", //Texto, opcional
  });

  useEffect(() => {
    async function getData() {
      const auxData = await controller.CustomerController.getCustomerById(
        parseInt(param)
      );
      const value =
        auxData.nombre +
        " " +
        auxData.primer_apellido +
        " " +
        auxData.segundo_apellido;
      setExamen((examen) => ({ ...examen, cliente: value }));
    }
    getData();
  }, []);

  let [isError, setIsError] = useState(false);

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
    let value = e.target.value;
    /*let aux = parseFloat(value);
    if (aux > 15.0) {
      value = "15.00";
    } else if (aux < -15.0) {
      value = "-15.00";
    }*/
    setExamen((values) => ({ ...values, [name]: value }));
    setExamen((values) => ({ ...values, [name]: value + "" }));
  };

  const addCard = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setExamen(examen);

    if (isOpen) {
      const exa = new controller.Exam(
        parseInt(param),
        examen.fecha,
        examen.dp_od,
        examen.dp_oi,
        examen.ob !== "" ? parseFloat(examen.ob) : 0.0,

        examen.lejos_od_esferico !== ""
          ? parseFloat(examen.lejos_od_esferico)
          : 0.0,
        examen.lejos_od_cilindrico !== ""
          ? parseFloat(examen.lejos_od_cilindrico)
          : 0.0,
        examen.lejos_od_eje !== "" ? parseFloat(examen.lejos_od_eje) : 0.0,
        examen.lejos_od_agudeza,

        examen.lejos_oi_esferico !== ""
          ? parseFloat(examen.lejos_oi_esferico)
          : 0.0,
        examen.lejos_oi_cilindrico !== ""
          ? parseFloat(examen.lejos_oi_cilindrico)
          : 0.0,
        examen.lejos_oi_eje !== "" ? parseFloat(examen.lejos_oi_eje) : 0.0,
        examen.lejos_oi_agudeza,

        examen.adicion_od_esferico !== ""
          ? parseFloat(examen.adicion_od_esferico)
          : 0.0,
        examen.adicion_oi_esferico !== ""
          ? parseFloat(examen.adicion_oi_esferico)
          : 0.0,
        examen.tipo_lentes,
        examen.observaciones
      );

      console.log(exa);

      if (await controller.ExamController.addExam(exa)) {
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

      <FormDialog isOpen={isOpen} setIsOpen={setIsOpen} onSubmit={addCard}>
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
            max={new Date().toLocaleDateString("fr-ca")}
            min={"1900-01-01"}
            defaultValue={new Date().toLocaleDateString("fr-ca")}
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
                    placeholder="0.00"
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
                    placeholder="0.00"
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
                    placeholder="0.00"
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
                    placeholder="00/00"
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
                    placeholder="0.00"
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
                    placeholder="0.00"
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
                    placeholder="0.00"
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
                    placeholder="00/00"
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
                    placeholder="0.00"
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
                    placeholder="0.00"
                    value={examen.adicion_oi_esferico}
                    onChange={handleChange}
                  />
                </td>
              </tr>
              <br />
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
                    placeholder="00/00"
                    pattern="(\d){2}\/(\d){2}"
                    value={examen.dp_od}
                    onChange={handleChange}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="dp_oi"
                    className="table-input"
                    placeholder="00/00"
                    pattern="(\d){2}\/(\d){2}"
                    value={examen.dp_oi}
                    onChange={handleChange}
                  />
                </td>
              </tr>
              <br />
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
                    placeholder="0.00"
                    onChange={handleChange}
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
            maxLength={100}
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
      </FormDialog>

      <ErrorDialog
        isOpen={isError}
        setIsOpen={setIsError}
        msg={messages.errorInsertion}
      />
    </>
  );
}

export default AddExamen;

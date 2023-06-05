import { Transition, Dialog } from "@headlessui/react";
import { ChangeEvent, Fragment, useState } from "react";
import { controller, regex, format, arrays, messages } from "../../util";
import ErrorDialog from "../Dialogs/ErrorDialog";
import { AddButton } from "../Buttons";
import { FormDialog } from "../Dialogs";

function AddCliente() {
  let [cliente, setCliente] = useState({
    id: "",
    nombre: "",
    apellido1: "",
    apellido2: "",
    telefono: "",
    domicilio: "",
    fecha: "",
    estado: "28",
    municipio: "9",
    locacion: "0000",
    sexo: "H",
  });

  let [isError, setIsError] = useState(false);

  let [isOpen, setIsOpen] = useState(false);
  function closeModal() {
    setIsOpen(false);
  }
  function openModal() {
    setIsOpen(true);
  }

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    switch (name) {
      case "estado":
        setCliente((values) => ({ ...values, [name]: value + "" }));
        cliente.municipio = "01";
        break;

      default:
        setCliente((values) => ({ ...values, [name]: value }));
        setCliente((values) => ({ ...values, [name]: value + "" }));
        break;
    }
  };

  const addCard = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setCliente({ ...cliente, fecha: format.dateIntFormat(cliente.fecha) });

    if (isOpen) {
      const cli = new controller.Customer(
        cliente.id,
        format.nameFormat(cliente.nombre),
        format.nameFormat(cliente.apellido1),
        format.nameFormat(cliente.apellido2),
        parseInt(cliente.fecha),
        "0000",
        cliente.sexo,
        "0000",
        cliente.estado,
        cliente.municipio,
        cliente.locacion,
        cliente.telefono,
        cliente.domicilio
      );

      if (await controller.CustomerController.createCustomer(cli)) {
        console.log(cli);
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
          <label htmlFor="">CURP</label>
          <input
            type="text"
            id=""
            name=""
            className="text-input"
            placeholder="CURP"
            onChange={(e) =>
              setCliente({
                ...cliente,
                curp: e.target.value.toUpperCase(),
              })
            }
            pattern={regex.curp_rfc}
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="">Nombre</label>
          <input
            type="text"
            id=""
            name=""
            maxLength={50}
            className="text-input"
            pattern={regex.name}
            placeholder="Nombre"
            onChange={(e) => setCliente({ ...cliente, nombre: e.target.value })}
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="">Primer Apellido</label>
          <input
            type="text"
            id=""
            name=""
            maxLength={50}
            className="text-input"
            placeholder="Primer Apellido"
            pattern={regex.name}
            onChange={(e) =>
              setCliente({ ...cliente, apellido1: e.target.value })
            }
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="">Segundo Apellido</label>
          <input
            type="text"
            id=""
            name=""
            maxLength={50}
            className="text-input"
            placeholder="Segundo Apellido"
            pattern={regex.name}
            onChange={(e) =>
              setCliente({ ...cliente, apellido2: e.target.value })
            }
          />
        </div>
        <div className="mb-6">
          <label htmlFor="">Fecha de Nacimiento</label>
          <input
            type="date"
            id=""
            name=""
            className="text-input"
            max={new Date().toLocaleDateString("fr-ca")}
            min={"1900-01-01"}
            onChange={(e) => {
              let aux = e.target.value.replaceAll("-", "");
              setCliente({ ...cliente, fecha: aux });
            }}
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="sexo">Sexo</label>
          <select
            className="text-input"
            name="sexo"
            id="sexo"
            onChange={(e) =>
              setCliente({
                ...cliente,
                sexo: e.target.value,
              })
            }
          >
            <option value="H">Hombre</option>
            <option value="M">Mujer</option>
          </select>
        </div>
        <div className="mb-6">
          <label htmlFor="">Teléfono</label>
          <input
            type="tel"
            id="tel"
            name="tel"
            pattern="[\d]{10}$"
            className="text-input"
            placeholder="Telefono"
            onChange={(e) =>
              setCliente({
                ...cliente,
                telefono: e.target.value,
              })
            }
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="">Domicilio</label>
          <input
            type="text"
            id=""
            name=""
            className="text-input"
            placeholder="Domicilio"
            onChange={(e) =>
              setCliente({ ...cliente, domicilio: e.target.value })
            }
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="">Estado</label>
          <select
            className="text-input"
            name="estado"
            id="estado"
            value={cliente.estado}
            onChange={(e) => handleChange(e)}
          >
            {arrays.states.map((s, i) => {
              return (
                <option key={i} value={i + 1}>
                  {s}
                </option>
              );
            })}
          </select>
        </div>
        <div className="mb-6">
          <label htmlFor="">Municipio</label>
          <select
            className="text-input"
            name="municipio"
            id="municipio"
            value={cliente.municipio}
            onChange={(e) => {
              setCliente({
                ...cliente,
                municipio: e.target.value,
              });
            }}
          >
            {arrays.mun[parseInt(cliente.estado) - 1].map((s, i) => {
              if (s !== "") {
                return (
                  <option key={i} value={i + 1}>
                    {s}
                  </option>
                );
              }
            })}
          </select>
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

export default AddCliente;

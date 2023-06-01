import { Transition, Dialog } from "@headlessui/react";
import { Fragment, useState } from "react";
import { controller, format, messages, regex } from "../../util";
import ErrorDialog from "../Dialogs/ErrorDialog";
import { AddButton } from "../Buttons";
import { FormDialog } from "../Dialogs";

function AddEmpleado() {
  let [empleado, setEmpleado] = useState({
    rfc: "",
    nombre: "",
    apellido1: "",
    apellido2: "",
    privilegios: "1",
    usuario: "",
    pass: "",
  });

  let [isOpen, setIsOpen] = useState(false);
  function closeModal() {
    setIsOpen(false);
  }
  function openModal() {
    setIsOpen(true);
  }

  let [isError, setIsError] = useState(false);

  const addCard = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (isOpen) {
      const emp = new controller.Employee(
        empleado.rfc,
        format.nameFormat(empleado.nombre),
        format.nameFormat(empleado.apellido1),
        format.nameFormat(empleado.apellido2),
        empleado.usuario,
        empleado.pass,
        empleado.privilegios
      );
      if (await controller.EmployeeController.createEmployee(emp)) {
        console.log(emp);
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
          <label htmlFor="">RFC</label>
          <input
            type="text"
            id=""
            name=""
            className="text-input"
            placeholder="RFC"
            pattern={regex.rfc}
            onChange={(e) => setEmpleado({ ...empleado, rfc: e.target.value })}
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
            placeholder="Nombre"
            pattern={regex.name}
            onChange={(e) =>
              setEmpleado({ ...empleado, nombre: e.target.value })
            }
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
              setEmpleado({
                ...empleado,
                apellido1: e.target.value,
              })
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
              setEmpleado({
                ...empleado,
                apellido2: e.target.value,
              })
            }
          />
        </div>

        <div className="mb-6">
          <label htmlFor="priv">Privilegios</label>
          <select
            className="text-input"
            name="priv"
            id="priv"
            onChange={(e) =>
              setEmpleado({
                ...empleado,
                privilegios: e.target.value,
              })
            }
          >
            <option value="1">Común</option>
            <option value="2">Administrador</option>
          </select>
        </div>
        <div className="mb-6">
          <label htmlFor="">Usuario</label>
          <input
            type="text"
            id=""
            name=""
            maxLength={50}
            className="text-input"
            placeholder="Usuario"
            onChange={(e) =>
              setEmpleado({ ...empleado, usuario: e.target.value })
            }
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="">Contraseña</label>
          <input
            type="text"
            id=""
            name=""
            maxLength={50}
            className="text-input"
            placeholder="Contraseña"
            onChange={(e) => setEmpleado({ ...empleado, pass: e.target.value })}
            required
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

export default AddEmpleado;

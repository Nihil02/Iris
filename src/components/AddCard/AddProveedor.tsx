import { ChangeEvent, useState } from "react";
import { arrays, controller, messages, regex } from "../../util";
import ErrorDialog from "../Dialogs/ErrorDialog";
import { AddButton } from "../Buttons";
import { FormDialog } from "../Dialogs";

function AddProveedor() {
  let [proveedor, setProveedor] = useState({
    rfc: "",
    razon: "",
    domicilio: "",
    telefono: "",
    correo: "",
    banco: 0,
    cuenta: "",
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
      default:
        setProveedor((values) => ({ ...values, [name]: value }));
        setProveedor((values) => ({ ...values, [name]: value }));
        break;
    }
  };

  const addCard = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (isOpen) {
      const sup = new controller.Supplier(
        proveedor.rfc,
        proveedor.razon,
        proveedor.domicilio,
        proveedor.correo,
        proveedor.telefono,
        proveedor.banco,
        proveedor.cuenta
      );
      if (await controller.SupplierController.createSupplier(sup)) {
        console.log(sup);
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
            onChange={(e) =>
              setProveedor({ ...proveedor, rfc: e.target.value })
            }
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="">Razon Social</label>
          <input
            type="text"
            id=""
            name=""
            maxLength={250}
            className="text-input"
            placeholder="Razon Social"
            onChange={(e) =>
              setProveedor({ ...proveedor, razon: e.target.value })
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
            maxLength={250}
            className="text-input"
            placeholder="Domicilio"
            onChange={(e) =>
              setProveedor({
                ...proveedor,
                domicilio: e.target.value,
              })
            }
            required
          />
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
              setProveedor({
                ...proveedor,
                telefono: e.target.value,
              })
            }
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="">Correo</label>
          <input
            type="email"
            id=""
            name=""
            maxLength={50}
            className="text-input"
            placeholder="Correo"
            onChange={(e) =>
              setProveedor({ ...proveedor, correo: e.target.value })
            }
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="">Banco</label>
          <select
            className="text-input"
            name="banco"
            id="banco"
            value={proveedor.banco}
            onChange={(e) => handleChange(e)}
          >
            {arrays.bancos.map((b) => {
              return (
                <option key={b[0]} value={b[0]}>
                  {b[1]}
                </option>
              );
            })}
          </select>
        </div>
        <div className="mb-6">
          <label htmlFor="">Cuenta Bancaria</label>
          <input
            type="number"
            id=""
            name=""
            maxLength={50}
            minLength={16}
            min={0}
            className="text-input"
            placeholder="Cuenta Bancaria"
            onChange={(e) =>
              setProveedor({ ...proveedor, cuenta: e.target.value })
            }
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

export default AddProveedor;

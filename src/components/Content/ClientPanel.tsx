import { memo } from "react";
import { format } from "../../util";

function ClientPanel({
  data = {
    nombre: " ",
    primer_apellido: " ",
    segundo_apellido: " ",
    domicilio: "",
    telefono: "0000000000",
  },
}) {
  return (
    <>
      <div className="panel">
        <table className="table-fixed w-full">
          <tbody>
            <tr>
              <td>
                <label htmlFor="nombre">Cliente</label>
              </td>
              <td colSpan={5}>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  className="text-input"
                  value={
                    data.nombre +
                    " " +
                    data.primer_apellido +
                    " " +
                    data.segundo_apellido
                  }
                  readOnly
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="dom">Domicilio</label>
              </td>
              <td colSpan={5}>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  className="text-input"
                  value={data.domicilio}
                  readOnly
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="tel">Teléfono</label>
              </td>
              <td colSpan={5}>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  className="text-input"
                  value={format.phoneStringFormat(data.telefono + "")}
                  readOnly
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default memo(ClientPanel);

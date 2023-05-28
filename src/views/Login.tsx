import logo from "/logo.svg";
import { useNavigate } from "react-router-dom";
import { FaLock } from "react-icons/fa";
import { Fragment, useEffect, useState } from "react";
import { Transition, Dialog } from "@headlessui/react";
import { matchSorter } from "match-sorter";
import { SHA256, enc } from "crypto-js";
import { controller, isAdmin } from "../util";
import ErrorDialog from "../components/ErrorDialog";

/**
 * Interface for the credentials of a user
 *
 * @interface
 * @field {string} rfc
 * @field {string} usuario
 * @field {string} privilegio
 * @field {string} contraseña
 */
interface ICredential {
  rfc: string;
  usuario: string;
  privilegio: string;
  contraseña: string;
}

/**
 * Default users
 */
const def: ICredential[] = [
  {
    rfc: "1",
    usuario: "admin",
    privilegio: "2",
    contraseña: SHA256("12345").toString(enc.Hex),
  },
  {
    rfc: "2",
    usuario: "Soraida",
    privilegio: "1",
    contraseña: SHA256("hola1234").toString(enc.Hex),
  },
];

function Login() {
  let [name, setName] = useState("");
  let [pass, setPass] = useState("");
  let [data, setData] = useState<ICredential[]>(def);
  let [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  /* Fetch data from the api to the component */
  useEffect(() => {
    async function getData() {
      const emp = await controller.EmployeeController.getAllEmployees();
      emp.map((em) => {
        const aux: ICredential = {
          rfc: em.rfc,
          usuario: em.usuario,
          privilegio: em.privilegios,
          contraseña: em.contrasenna,
        };
        setData([aux, ...data]);
      });
    }
    getData();
  }, []);

  function closeModal() {
    setIsOpen(false);
  }
  function openModal() {
    setIsOpen(true);
  }

  const validation = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const res = matchSorter(data, name, { keys: ["usuario"] });

    let priv = res[0].privilegio === "2" ? true : false;
    isAdmin(priv);

    pass == res[0].contraseña ? navigate("/cliente") : openModal();
  };

  return (
    <div className="content-container ml-0 bg-gray-50">
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <img src={logo} className=" mx-auto w-48 h-48 m-4" />
          </div>

          <form className="mt-8 space-y-6" onSubmit={validation}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="usuario" className="sr-only">
                  Usuario
                </label>
                <input
                  id="usuario"
                  name="usuario"
                  type="text"
                  required
                  className="login-input"
                  placeholder="Usuario"
                  onChange={(e) => setName(e.target.value)}
                  autoFocus
                />
              </div>
              <div>
                <label htmlFor="contraseña" className="sr-only">
                  Contraseña
                </label>
                <input
                  id="contraseña"
                  name="contraseña"
                  type="password"
                  required
                  className="login-input"
                  placeholder="Contraseña"
                  onChange={(e) =>
                    setPass(SHA256(e.target.value).toString(enc.Hex))
                  }
                />
              </div>
            </div>

            <div>
              <button type="submit" className="group btn-primary">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <FaLock
                    className="h-5 w-5 text-green-500 group-hover:text-green-400"
                    aria-hidden="true"
                  />
                </span>
                Entrar
              </button>
            </div>
          </form>

          <ErrorDialog
            open={isOpen}
            setIsOpen={setIsOpen}
            msg="Credenciales de inicio de sesión inválidas"
          />
        </div>
      </div>
    </div>
  );
}

export default Login;

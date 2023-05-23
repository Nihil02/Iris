import logo from "/logo.svg";
import { useNavigate } from "react-router-dom";
import { FaLock } from "react-icons/fa";
import { Fragment, useEffect, useState } from "react";
import { Transition, Dialog } from "@headlessui/react";
import { matchSorter } from "match-sorter";
import { controller, isAdmin } from "../util";

interface ICredential {
  rfc: string;
  usuario: string;
  privilegio: string;
  contraseña: string;
}

const def: ICredential[] = [
  {
    rfc: "1",
    usuario: "admin",
    privilegio: "2",
    contraseña: "12345",
  },
  {
    rfc: "2",
    usuario: "Soraida",
    privilegio: "1",
    contraseña: "hola1234",
  },
];

function Login() {
  let [name, setName] = useState("");
  let [pass, setPass] = useState("");
  let [data, setData] = useState<ICredential[]>(def);
  let [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function getData() {
      const emp = await controller.EmployeeController.getAllEmployees();
      //setData(prevData => ([...prevData, ...emp]))
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
    console.log(data);
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
                  onChange={(e) => setPass(e.target.value)}
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
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-bold leading-6 py-2 text-red-800"
                      >
                        Error
                      </Dialog.Title>
                      <p>Datos incorrectos</p>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition>
        </div>
      </div>
    </div>
  );
}

export default Login;

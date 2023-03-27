import { Outlet, Link } from "react-router-dom";
import logo from "/logo.svg";
import { FaLock } from "react-icons/fa";

function Login() {
  return (
    <div className="content-container ml-0 bg-gray-50">
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <img src={logo} className=" mx-auto w-48 h-48 m-4" />
          </div>
          <form className="mt-8 space-y-6" action="#" method="">
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
                />
              </div>
              <div>
                <label htmlFor="contraseña" className="sr-only">
                  Contraseña
                </label>
                <input
                  id="contraseña"
                  name="contraseña"
                  type="contraseña"
                  required
                  className="login-input"
                  placeholder="Contraseña"
                />
              </div>
            </div>

            <div>
              <Link to="/cliente"
                type="submit"
                className="group relative flex w-full justify-center rounded-md bg-green-600 py-2 px-3 text-sm font-semibold text-white hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <FaLock
                    className="h-5 w-5 text-green-500 group-hover:text-green-400"
                    aria-hidden="true"
                  />
                </span>
                Entrar
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;

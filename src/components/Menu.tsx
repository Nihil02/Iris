import {
  FaGlasses,
  FaUserAlt,
  FaBoxOpen,
  FaDatabase,
  FaDoorOpen,
  FaUndo,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { getAdmin, controller } from "../util";
import { BackUpcontroller } from "../../core/controller/backUpController";
import { InfoDialog } from "./Dialogs";
import { useState } from "react";

interface IMenuIcon {
  icon: JSX.Element;
  tooltip: string;
  route: string;
  redirect?: boolean;
}

function Menu() {
  let [isOpen, setIsOpen] = useState(false);
  let [msg, setMsg] = useState("");
  function openModal() {
    setIsOpen(true);
  }

  const MenuIcon = ({ icon, tooltip, route, redirect = true }: IMenuIcon) => {
    const menuClick = (e: { preventDefault: () => void }) => {
      e.preventDefault();
      switch (route) {
        case "Exportar":
          BackUpcontroller.createBackUp();
          setMsg("Creada la copia de seguridad");
          openModal();
          break;

        case "Restaurar":
          setMsg("Restaurando datos");
          openModal();
          break;

        default:
          break;
      }
    };

    return (
      <>
        {redirect ? (
          <Link to={route} className="menu-icon group">
            <>
              {icon}
              <span className="menu-tooltip group-hover:scale-100">
                {tooltip}
              </span>
            </>
          </Link>
        ) : (
          <div className="menu-icon group" onClick={menuClick}>
            <>
              {icon}
              <span className="menu-tooltip group-hover:scale-100">
                {tooltip}
              </span>
            </>
          </div>
        )}
      </>
    );
  };

  return (
    <nav
      className="fixed top-0 left-0 h-screen w-20 flex flex-col
                  bg-gray-50 shadow-lg"
    >
      <div className="content-start">
        <MenuIcon
          icon={<FaGlasses size="28" />}
          tooltip="Clientes"
          route="/cliente"
        />
        <MenuIcon
          icon={<FaBoxOpen size="28" />}
          tooltip="Proveedores"
          route="/proveedor"
        />
        {getAdmin() ? (
          <MenuIcon
            icon={<FaUserAlt size="28" />}
            tooltip="Empleados"
            route="/usuario"
          />
        ) : null}
      </div>

      <div className="fixed bottom-0 left-3">
        <hr className="bg-gray-200 border border-gray-200  rounded-full mx-2" />

        {getAdmin() ? (
          <>
            <MenuIcon
              icon={<FaDatabase size="28" />}
              tooltip="Exportar Base de Datos"
              route="Exportar"
              redirect={false}
            />
            <MenuIcon
              icon={<FaUndo size="28" />}
              tooltip="Restaurar Base de Datos"
              route="Restaurar"
              redirect={false}
            />
          </>
        ) : null}
        <MenuIcon icon={<FaDoorOpen size="28" />} tooltip="Salir" route="/" />
      </div>

      <InfoDialog isOpen={isOpen} setIsOpen={setIsOpen} msg={msg}></InfoDialog>
    </nav>
  );
}

export default Menu;

import {
  FaGlasses,
  FaUserAlt,
  FaBoxOpen,
  FaDatabase,
  FaDoorOpen,
  FaQuestion,
  FaUndo,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { getAdmin, controller } from "../util";
import { BackupDialog, InfoDialog } from "./Dialogs";
import { useState } from "react";
import * as Tooltip from "@radix-ui/react-tooltip";
import ManualUsuario from "/ManualUsuario.pdf"

interface IMenuIcon {
  icon: JSX.Element;
  tooltip: string;
  route: string;
  redirect?: boolean;
}

function Menu() {
  let [isOpen, setIsOpen] = useState(false);
  let [isRestore, setRestore] = useState(false);
  let [msg, setMsg] = useState("");
  let [title, setTitle] = useState("");
  function openModal() {
    setIsOpen(true);
  }

  const MenuIcon = ({ icon, tooltip, route, redirect = true }: IMenuIcon) => {
    const menuClick = (e: { preventDefault: () => void }) => {
      e.preventDefault();
      switch (route) {
        case "Exportar":
          controller.BackUpcontroller.createBackUp();
          setMsg("Se ha creado la copia de seguridad");
          openModal();
          break;

        case "Restaurar":
          setTitle("Restaurar copia de seguridad");
          setMsg("¿Desea restaurar la copia de seguridad anterior?");
          setRestore(true);
          break;

        case "Ayuda":
          const aTag = document.createElement("a");
          aTag.href = ManualUsuario;
          aTag.setAttribute("target", "_blank")
          document.body.appendChild(aTag);
          aTag.click();
          aTag.remove();
          break;

        default:
          break;
      }
    };

    return (
      <>
        <Tooltip.Provider delayDuration={0}>
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              {redirect ? (
                <Link to={route} className="menu-icon group">
                  {icon}
                </Link>
              ) : (
                <div className="menu-icon" onClick={menuClick}>
                  {icon}
                </div>
              )}
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content side="left" className="tooltip" sideOffset={5}>
                {tooltip}
                <Tooltip.Arrow className="fill-white" />
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        </Tooltip.Provider>
      </>
    );
  };

  return (
    <nav className="fixed top-0 left-0 h-screen w-20 flex flex-col bg-gray-50 shadow-lg">
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
              tooltip="Respaldar Base de Datos"
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
        <MenuIcon
          icon={<FaQuestion size="28" />}
          tooltip="Ayuda"
          route="Ayuda"
          redirect={false}
        />
        <MenuIcon icon={<FaDoorOpen size="28" />} tooltip="Salir" route="/" />
      </div>

      <InfoDialog isOpen={isOpen} setIsOpen={setIsOpen} msg={msg} />
      <BackupDialog
        isOpen={isRestore}
        setIsOpen={setRestore}
        title={title}
        msg={msg}
      />
    </nav>
  );
}

export default Menu;

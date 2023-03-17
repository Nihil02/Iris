import {
  FaGlasses,
  FaUserAlt,
  FaBoxOpen,
  FaDatabase,
  FaDoorOpen,
} from "react-icons/fa";

function Menu() {
  return (
    <nav
      className="fixed top-0 left-0 h-screen w-20 flex flex-col
                  bg-gray-50 shadow-lg"
    >
      <div className="content-start">
        <MenuIcon
          icon={<FaGlasses size="28" />}
          tooltip="Clientes"
          route="Clientes"
        />
        <MenuIcon
          icon={<FaBoxOpen size="28" />}
          tooltip="Proveedores"
          route="Proveedores"
        />
        <MenuIcon
          icon={<FaUserAlt size="28" />}
          tooltip="Usuarios"
          route="Usuarios"
        />
      </div>
      <div className="fixed bottom-0 left-3">
        <hr className="bg-gray-200 border border-gray-200  rounded-full mx-2" />
        <MenuIcon
          icon={<FaDatabase size="28" />}
          tooltip="Exportar Base de Datos"
          route="Exportar"
        />
        <MenuIcon
          icon={<FaDoorOpen size="28" />}
          tooltip="Salir"
          route="byebye"
        />
      </div>
    </nav>
  );
}

const MenuIcon = ({ icon = {}, tooltip = "", route = "" }) => {
  const menuClick = () => {
    if (route == "byebye") {
      alert("Salir");
    } else if (route != "") {
      alert(route);
    }
  };

  return (
    <div className="menu-icon group" onClick={menuClick}>
      <>
        {icon}
        <span className="menu-tooltip group-hover:scale-100">{tooltip}</span>
      </>
    </div>
  );
};

export default Menu;

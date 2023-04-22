import { Routes, Route } from "react-router-dom";
import Menu from "./../components/Menu";
import Login from "./Login";
import ModuloCliente from "./ModuloCliente";
import ModuloProveedor from "./ModuloProveedor";
import ModuloUsuario from "./ModuloUsuario";
import ModuloExamen from "./ModuloExamen";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/cliente"
        element={
          <div className="flex overflow-hidden w-screen">
            <Menu />
            <ModuloCliente />
          </div>
        }
      />
      <Route
        path="/proveedor"
        element={
          <div className="flex overflow-hidden w-screen">
            <Menu />
            <ModuloProveedor />
          </div>
        }
      />
      <Route
        path="/usuario"
        element={
          <div className="flex overflow-hidden w-screen">
            <Menu />
            <ModuloUsuario />
          </div>
        }
      />
      <Route
        path="/examen"
        element={
          <div className="flex overflow-hidden w-screen">
            <Menu />
            <ModuloExamen />
          </div>
        }
      />
    </Routes>
  );
}

export default App;

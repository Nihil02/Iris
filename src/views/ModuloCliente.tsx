import SearchBar from "./../components/SearchBar";
import Content from "../components/Content";

function ModuloCliente() {
  return (
    <>
      <div className="content-container">
        <SearchBar />
        <h1 className="text-2xl m-5">Módulo Cliente</h1>
        <Content />
      </div>
    </>
  );
}

export default ModuloCliente;

import SearchBar from "../components/SearchBar";
import Content from "../components/Content";

function ModuloExamen() {
  return (
    <>
      <div className="content-container">
        <SearchBar />
        <h1 className="text-2xl m-5">Módulo Examenes</h1>
        <h2>Nombre del cliente</h2>
        <h2>Nombre</h2>
        <Content />
      </div>
    </>
  );
}

export default ModuloExamen;

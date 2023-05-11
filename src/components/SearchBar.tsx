import { matchSorter } from "match-sorter";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useLocation, useParams } from "react-router-dom";
import { dateFormat } from "./../util";

function SearchBar({ data = [{}] }) {
  let [keyword, setKeyword] = useState("");
  let param = useParams();
  const location = useLocation().pathname;

  function search(e: { preventDefault: () => void }) {
    e.preventDefault();
    console.log("Buscando " + keyword);
    let matches;

    switch (location) {
      case "/cliente":
        data.map((d) => {
          d.res = d.nombre + " " + d.primer_apellido + " " + d.segundo_apellido;
          d.id = d.CURP;
        });
        break;

      case "/examen/" + param.cliente:
        data.map((d) => {
          d.res =  dateFormat(d.fecha.toString());
          d.id = d.fecha;
        });
        break;

      case "/proveedor":
        data.map((d) => {
          d.res =d.razon_social;
          d.id = d.rfc;
        });
        break;

      case "/usuario":
        data.map((d) => {
          d.res = d.nombre + " " + d.primer_apellido + " " + d.segundo_apellido;
          d.id = d.rfc;
        });
        break;

      default:
        break;
    }

    matches = matchSorter(data, keyword, { keys: ["res"] });
    matches.map((match) => {
      console.log(match.res + "\n" + match.id);
    });
  }

  return (
    <>
      <form className="search-bar" onSubmit={search}>
        <input
          type="text"
          className="search-input"
          value={keyword}
          placeholder="Buscar"
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button type="submit">
          <FaSearch size="24" className="" />
        </button>
      </form>
    </>
  );
}

export default SearchBar;

import { FaSearch } from "react-icons/fa";

function SearchBar() {
  function search() {
    alert("Buscando cosas");
  }

  return (
    <form className="search-bar">
      <input type="text" className="search-input" placeholder="Buscar" />
      <button>
        <FaSearch size="24" className="" onClick={search}/>
      </button>
    </form>
  );
}

export default SearchBar;

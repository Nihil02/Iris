import { FaSearch } from "react-icons/fa";

function SearchBar() {
  function search() {
    alert("Buscando cosas");
  }

  return (
    <form className="search-bar" onSubmit={search}>
      <input type="text" className="search-input" placeholder="Buscar" />
      <button type="submit">
        <FaSearch size="24" className=""/>
      </button>
    </form>
  );
}

export default SearchBar;

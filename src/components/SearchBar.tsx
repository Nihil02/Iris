import { FaSearch } from "react-icons/fa";

function SearchBar() {
  return (
    <div className="search-bar">
      <input type="text" className="search-input" placeholder="Buscar" />
      <FaSearch size="24" className="" />
    </div>
  );
}

export default SearchBar;

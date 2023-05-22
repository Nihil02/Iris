import { FaSearch } from "react-icons/fa";

function SearchBar({ keyword = "", onChange }) {
  return (
    <div className="search-bar">
      <input
        className="search-input"
        key="search-bar"
        value={keyword}
        placeholder={"Buscar"}
        onChange={(e) => onChange(e.target.value)}
      />
      <FaSearch size="24" className="" />
    </div>
  );
}

export default SearchBar;

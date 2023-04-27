import { useState } from "react";
import { FaSearch } from "react-icons/fa";

function SearchBar() {
  let [keyword, setKeyword] = useState("");

  function search(e: { preventDefault: () => void }) {
    e.preventDefault();
    console.log("Buscando " + keyword);
  }

  return (
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
  );
}

export default SearchBar;

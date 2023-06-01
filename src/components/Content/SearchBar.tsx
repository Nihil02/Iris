import { memo } from "react";
import { FaSearch } from "react-icons/fa";

interface IProps {
  keyword: string;
  onChange(e: string): void;
}

function SearchBar(props: IProps) {
  return (
    <div className="search-bar">
      <input
        className="search-input"
        key="search-bar"
        value={props.keyword}
        placeholder={"Buscar"}
        onChange={(e) => props.onChange(e.target.value)}
      />
      <FaSearch size="24" className="" />
    </div>
  );
}

export default memo(SearchBar);

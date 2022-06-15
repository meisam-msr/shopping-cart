import { useState } from "react";
import { ReactComponent as SearchSvg } from "../../assets/search.svg";
import { useNavigate } from "react-router-dom";
import styles from "./search.module.css";

const Search = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const changeHandler = (e) => {
    setSearch(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    navigate({
      pathname: "/",
      search: `?search=${search}`,
    });
    setSearch("");
  };

  return (
    <form className={styles.search} onSubmit={submitHandler}>
      <button type="submit">
        <SearchSvg />
      </button>
      <input
        type="text"
        value={search}
        onChange={changeHandler}
        placeholder="Search for a model"
        className={styles.searchInput}
      />
    </form>
  );
};

export default Search;

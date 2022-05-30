import { useState } from "react";
import { ReactComponent as SearchSvg } from "../../assets/search.svg";
import { useProductsActions } from "../../providers/ProductsProvider";
import { useNavigate } from "react-router-dom";
import styles from "./search.module.css";

const Search = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const changeHandler = (e) => {
    setQuery(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    navigate({
      pathname: "/",
      search: `?search=${query}`,
    });
  };

  return (
    <form className={styles.search} onSubmit={submitHandler}>
      <button type="submit">
        <SearchSvg />
      </button>
      <input
        type="text"
        value={query}
        onChange={changeHandler}
        placeholder="Search for a model"
        className={styles.searchInput}
      />
    </form>
  );
};

export default Search;

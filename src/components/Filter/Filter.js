import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Accordion from "../../common/Accordion/Accordion";
import Checkbox from "../../common/CheckBox/CheckBox";
import InputRange from "../../common/InputRange/InputRange";
import { sizeOptions } from "../../data";
import { useProductsActions } from "../../providers/ProductsProvider";
import styles from "./filter.module.css";

const Filter = ({ filters, setFilters, setSortValue, isMounted }) => {
  const [filterToggle, setFilterToggle] = useState(false);
  const navigate = useNavigate();
  const productDispatch = useProductsActions();

  filterToggle
    ? (document.body.style.overflow = "hidden")
    : (document.body.style.overflow = "scroll");

  useEffect(() => {
    if (isMounted.current) {
      navigate({
        pathname: "/",
        search: `?price=${filters.price}&size=${filters.size}`,
      });
    } else {
      isMounted.current = true;
    }
  }, [filters]);

  useEffect(() => {
    clearFilterHandler();
  }, []);

  const onChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const clearFilterHandler = () => {
    isMounted.current = false;
    setFilters({ price: "250", size: "" });
    setSortValue("lowest");
    navigate("/");
    productDispatch({ type: "filter", payload: { price: "250", size: "" } });
    productDispatch({ type: "sort", value: "lowest" });
    setFilterToggle(false);
  };

  return (
    <>
      <div
        className={styles.showModalBtn}
        onClick={() => setFilterToggle(true)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={styles.filterIcon}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
          />
        </svg>
        <p>Filter</p>
      </div>
      <section
        className={`${styles.modal} ${filterToggle && styles.filterToggle}`}
      >
        <div className={styles.modalHeader}>
          <h3>Filters</h3>
          <svg
            onClick={() => setFilterToggle(false)}
            xmlns="http://www.w3.org/2000/svg"
            className={styles.close}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
        <Accordion title="Price Range">
          <InputRange
            name="price"
            value={filters.price}
            step={25}
            min={0}
            max={250}
            onChange={onChange}
          />
        </Accordion>
        <Accordion title="Size">
          <Checkbox
            options={sizeOptions}
            name="size"
            onChange={onChange}
            value={parseInt(filters.size)}
          />
        </Accordion>
        <div className={styles.resault}>
          <button
            className={`btn ${styles.filterBtn}`}
            onClick={clearFilterHandler}
          >
            Clear
          </button>
          <button
            className={`btn ${styles.filterBtn} ${styles.primaryBtn}`}
            onClick={() => setFilterToggle(false)}
          >
            Apply
          </button>
        </div>
      </section>
      <section className={`desktopFilter ${styles.desktopFilter}`}>
        <Accordion title="Price Range">
          <InputRange
            name="price"
            value={filters.price}
            step={25}
            min={0}
            max={250}
            onChange={onChange}
          />
        </Accordion>
        <Accordion title="Size">
          <Checkbox
            options={sizeOptions}
            name="size"
            onChange={onChange}
            value={parseInt(filters.size)}
          />
        </Accordion>
        <button
          className={`btn ${styles.clearBtn}`}
          onClick={clearFilterHandler}
        >
          Clear Filters
        </button>
      </section>
    </>
  );
};

export default Filter;

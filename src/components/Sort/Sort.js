import { useState, useEffect } from "react";
import { useProductsActions } from "../../providers/ProductsProvider";
import styles from "./sort.module.css";

const Sort = () => {
  const [sortToggle, setSortToggle] = useState(false);
  const [sortValue, setSortValue] = useState("");
  const productDispatch = useProductsActions();

  const sortOptions = [
    { value: "lowest", label: "cheap" },
    { value: "highest", label: "expensive" },
    { value: "discount", label: "discount" },
  ];

  useEffect(() => {
    setSortValue(sortOptions[0].value);
    productDispatch({ type: "sort", value: sortOptions[0].value });
  }, []);

  const sortHandler = (e) => {
    setSortValue(e.target.value);
    productDispatch({ type: "sort", value: e.target.value });
    setSortToggle(false);
  };

  sortToggle
    ? (document.body.style.overflow = "hidden")
    : (document.body.style.overflow = "scroll");

  return (
    <>
      <div
        className={`${styles.backGround} ${
          sortToggle ? styles.showBackground : ""
        }`}
        onClick={() => setSortToggle(false)}
      ></div>
      <div className={styles.showModalBtn} onClick={() => setSortToggle(true)}>
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
            d="M19 9l-7 7-7-7"
          />
        </svg>
        <p>Sort</p>
      </div>
      <section className={`${styles.modal} ${sortToggle && styles.toggle}`}>
        <div className={styles.modalHeader}>
          <p>Sort By</p>
          <svg
            onClick={() => setSortToggle(false)}
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
        <div className={styles.modalList}>
          <ul>
            {sortOptions.map((item) => {
              return (
                <li className={styles.option} key={item.value}>
                  <input
                    type="radio"
                    value={item.value}
                    name="sortOption"
                    id={item.value}
                    onChange={sortHandler}
                    checked={item.value === sortValue}
                  />
                  <label htmlFor={item.value}>
                    <p>{item.label}</p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </label>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
      <section className={`desktopSort ${styles.desktopSort}`}>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={styles.sortIcon}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4"
            />
          </svg>
          <p>Sort By :</p>
        </div>
        <ul>
          {sortOptions.map((item) => {
            return (
              <li className={styles.desktopOption} key={item.value}>
                <input
                  type="radio"
                  value={item.value}
                  name="sortOption"
                  id={item.value}
                  onChange={sortHandler}
                  checked={item.value === sortValue}
                />
                <label htmlFor={item.value}>
                  <p>{item.label}</p>
                </label>
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
};

export default Sort;

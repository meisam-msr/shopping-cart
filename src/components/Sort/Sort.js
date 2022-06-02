import { useState, useRef, useEffect } from "react";
import { useProductsActions } from "../../providers/ProductsProvider";
import styles from "./sort.module.css";

const Sort = () => {
  const [sortToggle, setSortToggle] = useState(false);
  const [sortValue, setSortValue] = useState("");
  const triggerRef = useRef(null); 
  const nodeRef = useRef(null); 
  const productDispatch = useProductsActions();

  const sortOptions = [
    { value: "lowest", label: "cheap" },
    { value: "highest", label: "expensive" },
    { value: "discount", label: "discount" },
  ];

  const sortHandler = (e) => {
    setSortValue(e.target.value);
    productDispatch({ type: "sort", value: e.target.value });
    setSortToggle(false);
  };

  const handleClickOutside = (e) => {
    if (triggerRef.current && triggerRef.current.contains(e.target)) {
      return setSortToggle(true);
    }

    if (nodeRef.current && !nodeRef.current.contains(e.target)) {
      document.removeEventListener("mousedown", e.stopPropagation());
      // document.removeEventListener("click", e.preventDefault());
      document.removeEventListener("touchstart", e.stopPropagation());
      return setSortToggle(false);
    }
  };

  if (!sortToggle) {
    document.body.removeEventListener("click", handleClickOutside, true);
  }

  useEffect(() => {
    document.body.addEventListener("click", handleClickOutside, true);
    return () => {
      document.body.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return (
    <>
      <div
        className={styles.showModalBtn}
        ref={triggerRef}
        onClick={() => setSortToggle(true)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="filterIcon"
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
      <section
        ref={nodeRef}
        className={`${styles.modal} ${sortToggle && styles.toggle}`}
      >
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
      <section className={styles.desktopSort}>
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

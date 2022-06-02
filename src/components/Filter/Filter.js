import { useState, useRef, useEffect } from "react";
import styles from "./filter.module.css";

const Filter = () => {
  const [filterToggle, setFilterToggle] = useState(false);

  return (
    <>
      <div className={styles.showModalBtn} onClick={() => setFilterToggle(true)}>
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
            d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
          />
        </svg>
        <p>Filter</p>
      </div>
      <section
        className={`${styles.modal} ${filterToggle && styles.filterToggle}`}
      ></section>
    </>
  );
};

export default Filter;

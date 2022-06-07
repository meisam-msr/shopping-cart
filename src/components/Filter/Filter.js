import { useState, useRef, useEffect } from "react";
import Accordion from "../../common/Accordion/Accordion";
import Checkbox from "../../common/CheckBox/CheckBox";
import InputRange from "../../common/InputRange/InputRange";
import styles from "./filter.module.css";

const Filter = () => {
  const [filterToggle, setFilterToggle] = useState(false);

  const sizeOptions = [
    { value: 35, label: "35" },
    { value: 36, label: "36" },
    { value: 37, label: "37" },
    { value: 38, label: "38" },
    { value: 39, label: "39" },
    { value: 40, label: "40" },
    { value: 41, label: "41" },
    { value: 42, label: "42" },
    { value: 43, label: "43" },
    { value: 44, label: "44" },
    { value: 45, label: "45" },
    { value: 46, label: "46" },
    { value: 47, label: "47" },
    { value: 48, label: "48" },
    { value: 49, label: "49" },
  ];

  filterToggle
    ? (document.body.style.overflow = "hidden")
    : (document.body.style.overflow = "scroll");

  const onChange = () => {};

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
          <InputRange name="price" value={700} step={100} min={0} max={1000} />
        </Accordion>
        <Accordion title="Size">
          <Checkbox
            options={sizeOptions}
            name="size"
            onChange={onChange}
            value=""
          />
        </Accordion>
        <div className={styles.resault}>
          <button className={`btn ${styles.filterBtn}`}>Clear</button>
          <button className={`btn ${styles.filterBtn} ${styles.primaryBtn}`}>
            Apply
          </button>
        </div>
      </section>
      <section className={`desktopFilter ${styles.desktopFilter}`}>
        <Accordion title="Price Range">
          <InputRange name="price" value={700} step={100} min={0} max={1000} />
        </Accordion>
        <Accordion title="Size">
          <Checkbox
            options={sizeOptions}
            name="size"
            onChange={onChange}
            value=""
          />
        </Accordion>
      </section>
    </>
  );
};

export default Filter;

import styles from "./accordion.module.css";
import { useState } from "react";
const Accordion = ({ title, children }) => {
  const [toggle, setToggle] = useState(false);
  return (
    <section className={`${styles.accordion} ${toggle && styles.toggle}`}>
      <div className={styles.header} onClick={() => setToggle(!toggle)}>
        <p>{title}</p>
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
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
      <div className={styles.body}>{children}</div>
    </section>
  );
};

export default Accordion;

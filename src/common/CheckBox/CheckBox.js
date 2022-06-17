import styles from "./checkbox.module.css";

const Checkbox = ({ name, value, onChange, options }) => {
  return (
    <div className={styles.table}>
      {options.map((item) => {
        return (
          <span className={styles.option} key={item.value}>
            <input
              type="checkbox"
              name={name}
              id={item.value}
              value={item.value}
              onChange={onChange}
              checked={item.value == value}
            />
            <label htmlFor={item.value}>{item.label}</label>
          </span>
        );
      })}
    </div>
  );
};

export default Checkbox;

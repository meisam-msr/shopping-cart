import styles from "./inputRange.module.css";

const InputRange = ({ name, value, min, max, step, onChange }) => {
  return (
    <div className={styles.range}>
      <input
        type="range"
        name={name}
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        step={step}
      />
      <label>
        <span>$0</span>
        <span>${value}</span>
      </label>
    </div>
  );
};

export default InputRange;

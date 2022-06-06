import styles from "./input.module.css";
const Input = ({ label, name, formik, type = "text" }) => {
  return (
    <div className={styles.formControl}>
      <label htmlFor={name}>{label}</label>
      <input
        className={styles.input}
        id={name}
        type={type}
        {...formik.getFieldProps(name)}
        name={name}
      />
      {formik.errors[name] && formik.touched[name] && (
        <div className={styles.error}>{formik.errors[name]}</div>
      )}
    </div>
  );
};

export default Input;

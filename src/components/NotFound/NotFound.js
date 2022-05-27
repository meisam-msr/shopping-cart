import styles from "./notFound.module.css";
import errorImg from "../../assets/error.png";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className={styles.container}>
      <img className={styles.errorImg} src={errorImg} />
      <div className={styles.errorText}>
        <h2 style={{ fontSize: "3rem" }}>Oops...</h2>
        <p style={{ fontSize: "2rem" }}>Page not found</p>
        <p>
          This Page doesn`t exist or was removed!
          <br />
          We suggest you back to home.
        </p>
        <Link to="/">
          <button
            className={`${styles.btn} ${styles.primary} ${styles.backHome}`}
          >
            Back to home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;

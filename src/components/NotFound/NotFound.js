import styles from "./notFound.module.css";
import errorImg from "../../assets/notFound.svg";
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
          <button className="btn primary">
            <div className={styles.backHome}>
              <p>Back to home</p>
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
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </div>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;

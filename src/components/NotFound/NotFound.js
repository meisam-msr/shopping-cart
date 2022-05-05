import "./notFound.css";
import errorImg from "../../assets/error.png";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="container">
      <img className="errorImg" src={errorImg} />
      <div className="errorText">
        <h2 style={{ fontSize: "3rem" }}>Oops...</h2>
        <p style={{ fontSize: "2rem" }}>Page not found</p>
        <p>
          This Page doesn`t exist or was removed!
          <br />
          We suggest you back to home.
        </p>
        <Link to="/">
          <button className="btn primary backHome">Back to home</button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;

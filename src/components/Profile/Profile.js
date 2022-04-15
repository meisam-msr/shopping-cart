import { ReactComponent as ReactLogo } from "../../assets/user.svg";
import "./profile.css";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("authState"));
  return (
    <section className="container">
      <div className="card">
        <h3>Profile</h3>
        <div className="userInfo">
          <div>
            <ReactLogo className="userImg" />
          </div>
          <div className="details">
            <div>
              <span>name</span> {user.name}
            </div>
            <div>
              <span>email</span> {user.email}
            </div>
            <div>
              <span>phone</span> {user.phoneNumber}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;

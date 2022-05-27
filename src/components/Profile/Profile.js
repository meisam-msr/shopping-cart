import { ReactComponent as ReactLogo } from "../../assets/user.svg";
import styles from "./profile.module.css";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("authState"));
  return (
    <section className={styles.container}>
      <div className={styles.card}>
        <h3>Profile</h3>
        <div className={styles.userInfo}>
          <div>
            <ReactLogo className={styles.userImg} />
          </div>
          <div className={styles.details}>
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

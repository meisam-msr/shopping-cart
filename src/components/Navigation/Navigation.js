import { NavLink } from "react-router-dom";
import { useAuth } from "../../providers/AuthProvider";
import { useCart } from "../../providers/CartProvider";
import { ReactComponent as CartSvg } from "../../assets/cart.svg";
import { ReactComponent as UserSvg } from "../../assets/user.svg";
import { ReactComponent as LoginSvg } from "../../assets/login.svg";
import styles from "./Navigation.module.css";
import Search from "../../common/Search/Search";

const Navigation = () => {
  const { cart } = useCart();
  const userData = useAuth();

  return (
    <header className={styles.mainNavigation}>
      <nav>
        <div className={styles.logo}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              "" + (isActive ? styles.activeLink : "")
            }
          >
            shoe.
          </NavLink>
        </div>
        <div className={styles.searchBar}>
          <Search />
        </div>
        <ul>
          <li>
            <NavLink to="/cart">
              <CartSvg />
              <span>{cart.length}</span>
            </NavLink>
          </li>
          <li>
            <NavLink to={userData ? "/profile" : "/login"}>
              {userData ? <UserSvg /> : <LoginSvg />}
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;

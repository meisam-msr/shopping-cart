import { NavLink } from "react-router-dom";
import { useAuth } from "../../providers/AuthProvider";
import { useCart } from "../../providers/CartProvider";
import "./Navigation.css";

const Navigation = () => {
  const { cart } = useCart();
  const userData = useAuth();

  return (
    <header className="mainNavigation">
      <nav>
        <ul>
          <li>shoe.Land</li>
        </ul>
        <ul>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => "" + (isActive ? " activeLink" : "")}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                "" + (isActive ? " activeLink" : "cartLink")
              }
            >
              Cart<span>{cart.length}</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to={userData ? "/profile" : "/login"}
              className={({ isActive }) => "" + (isActive ? " activeLink" : "")}
            >
              {userData ? "Profile" : "Login/Signup"}
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;

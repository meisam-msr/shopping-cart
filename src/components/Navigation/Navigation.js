import { NavLink } from "react-router-dom";
import { useCart } from "../../providers/CartProvider";
import "./Navigation.css";

const Navigation = () => {
  const { cart } = useCart();
  return (
    <header className="mainNavigation">
      <nav>
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
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;

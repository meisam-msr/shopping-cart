import Layout from "../Layout/Layout";
import { useCart, useCartActions } from "../providers/CartProvider";
import styles from "./cartPage.module.css";
import { ReactComponent as ReactLogo } from "../assets/Delete.svg";
import { Link } from "react-router-dom";
import emptyCart from "../assets/empty-cart.svg";

const CartPage = () => {
  const { cart, total } = useCart();
  const dispatch = useCartActions();

  if (!cart.length)
    return (
      <Layout>
        <main>
          <section className={styles.emptyCart}>
            <div>
              <img src={emptyCart} />
            </div>
            <h2>Your cart is empty !</h2>
            <Link to="/">
              <button className="btn primary">
                <div className={styles.emptyBtn}>
                  <p>Go to Shop</p>
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
          </section>
        </main>
      </Layout>
    );

  const incHandler = (cartItem) => {
    dispatch({ type: "ADD_TO_CART", payload: cartItem });
  };
  const decHandler = (cartItem) => {
    dispatch({ type: "DEC_PRODUCT", payload: cartItem });
  };

  return (
    <Layout>
      <main>
        <section className={styles.cartCenter}>
          <section className={styles.cartItemList}>
            {cart.map((item) => {
              return (
                <div className={styles.cartItem} key={item.id}>
                  <div className={styles.itemImg}>
                    <img src={item.images[0]} alt={item.name} />
                  </div>
                  <div className={styles.itemDesc}>
                    <div>{item.name}</div>
                    <div className={styles.itemPrice}>
                      {item.offPrice * item.quantity} $
                    </div>
                    <div className={styles.btnGroup}>
                      <button onClick={() => decHandler(item)}>
                        {item.quantity === 1 ? (
                          <ReactLogo
                            style={{ width: "16px", height: "16px" }}
                          />
                        ) : (
                          "-"
                        )}
                      </button>
                      <button>{item.quantity}</button>
                      <button onClick={() => incHandler(item)}>+</button>
                    </div>
                  </div>
                </div>
              );
            })}
          </section>
          <CartSummary cart={cart} total={total} />
        </section>
      </main>
    </Layout>
  );
};

export default CartPage;

const CartSummary = ({ total, cart }) => {
  const originalTotalPrice = cart.length
    ? cart.reduce((acc, curr) => acc + curr.quantity * curr.price, 0)
    : 0;

  return (
    <section className={styles.cartSummary}>
      <h3 style={{ marginBottom: "1rem", textAlign: "center" }}>
        cart summary
      </h3>
      <div className={styles.summaryItem}>
        <p>original total price</p>
        <p>{originalTotalPrice} $</p>
      </div>
      <div className={styles.summaryItem}>
        <p>cart discount</p>
        <p>{originalTotalPrice - total} $</p>
      </div>
      <div className={styles.summaryItem}>
        <p>net price</p>
        <p>{total} $</p>
      </div>
      <Link to="/login?redirect=checkout">
        <button
          className="btn primary"
          style={{ marginTop: "1rem", width: "100%" }}
        >
          Go to Checkout
        </button>
      </Link>
    </section>
  );
};

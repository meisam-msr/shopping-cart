import Layout from "../Layout/Layout";
import { useCart, useCartActions } from "../providers/CartProvider";
import styles from "./cartPage.module.css";
import { ReactComponent as ReactLogo } from "../assets/Delete.svg";
import { Link } from "react-router-dom";

const CartPage = () => {
  const { cart, total } = useCart();
  const dispatch = useCartActions();

  if (!cart.length)
    return (
      <Layout>
        <main>
          <h2>cart is empty !</h2>
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
      <main className="container">
        <section className={styles.cartCenter}>
          <section className={styles.cartItemList}>
            {cart.map((item) => {
              return (
                <div className={styles.cartItem} key={item.id}>
                  <div className={styles.itemImg}>
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div>{item.name}</div>
                  <div>{item.offPrice * item.quantity}</div>
                  <div className={styles.btnGroup}>
                    <button onClick={() => decHandler(item)}>
                      {item.quantity === 1 ? (
                        <ReactLogo style={{ width: "14px", height: "14px" }} />
                      ) : (
                        "-"
                      )}
                    </button>
                    <button>{item.quantity}</button>
                    <button onClick={() => incHandler(item)}>+</button>
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

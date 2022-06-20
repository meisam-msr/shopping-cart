import { Link } from "react-router-dom";
import { useAuth } from "../../providers/AuthProvider";
import { useCart } from "../../providers/CartProvider";
import styles from "./checkout.module.css";

const Checkout = () => {
  const auth = useAuth();
  const { cart, total } = useCart();

  if (!cart.length) {
    return (
      <main className="container">
        <Link to="/">go to shopping</Link>
      </main>
    );
  }

  return (
    <main>
      <h3>checkout details</h3>
      <section className={styles.cartCenter}>
        {auth ? (
          <>
            <section className={styles.leftContainer}>
              <section className={styles.billingAddress}>
                <h5>Billing address</h5>
                <div className={styles.cartItemList}>
                  <div>
                    <span>name :</span>
                    <span>{auth.name}</span>
                  </div>
                  <div>
                    <span>email :</span>
                    <span>{auth.email}</span>
                  </div>
                  <div>
                    <span>contact :</span>
                    <span>{auth.phoneNumber}</span>
                  </div>
                </div>
              </section>
              <div className={styles.footer}>
                <div>
                  <span>total price : </span>
                  <span>{total}$</span>
                </div>
                <button className="btn primary">Continue to payment</button>
              </div>
            </section>
            <section className={styles.cartSummary}>
              <h5>Your order</h5>
              {cart &&
                cart.map((c) => {
                  return (
                    <div key={c.id} className={styles.orderDetail}>
                      <div className={styles.orderImg}>
                        <img src={c.image} />
                      </div>
                      {c.name} * {c.quantity} : {c.quantity * c.offPrice}$
                    </div>
                  );
                })}
            </section>
          </>
        ) : (
          <p>please login !</p>
        )}
      </section>
    </main>
  );
};

export default Checkout;

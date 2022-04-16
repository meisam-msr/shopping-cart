import { Link } from "react-router-dom";
import { useAuth } from "../../providers/AuthProvider";
import { useCart } from "../../providers/CartProvider";

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
    <main className="container">
      <section className="cartCenter">
        {auth ? (
          <>
            <section className="cartItemList" style={{ padding: "1rem" }}>
              <h3>checkout details</h3>
              <p>name : {auth.name}</p>
              <p>email : {auth.email}</p>
              <p>contact : {auth.phoneNumber}</p>
            </section>
            <section className="cartSummary">
              {cart &&
                cart.map((c) => {
                  return (
                    <div key={c.id}>
                      {c.name} * {c.quantity} : {c.quantity * c.offPrice}
                    </div>
                  );
                })}
              <hr />
              <div>total price : {total}</div>
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

import Layout from "../Layout/Layout";
import { useCart, useCartActions } from "../providers/CartProvider";
import "./cartPage.css";

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
        <section className="cartCenter">
          <section className="cartItemList">
            {cart.map((item) => {
              return (
                <div className="cartItem" key={item.id}>
                  <div className="itemImg">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div>{item.name}</div>
                  <div>{item.offPrice * item.quantity}</div>
                  <div>
                    <button onClick={() => decHandler(item)}>
                      {item.quantity === 1 ? "remove" : "decrement"}
                    </button>
                    <button>{item.quantity}</button>
                    <button onClick={() => incHandler(item)}>Add</button>
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
    <section className="cartSummary">
      <h3 style={{ marginBottom: "1rem", textAlign: "center" }}>
        cart summary
      </h3>
      <div className="summaryItem">
        <p>original total price</p>
        <p>{originalTotalPrice} $</p>
      </div>
      <div className="summaryItem">
        <p>cart discount</p>
        <p>{originalTotalPrice - total} $</p>
      </div>
      <div className="summaryItem">
        <p>net price</p>
        <p>{total} $</p>
      </div>
    </section>
  );
};

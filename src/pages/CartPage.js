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
                  <div>{item.price * item.quantity}</div>
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
          <section className="cartSummary">
            <h2>cart summary</h2>
            <div>{total}$</div>
          </section>
        </section>
      </main>
    </Layout>
  );
};

export default CartPage;

import Layout from "../Layout/Layout";
import * as data from "../data";
import { useCart, useCartActions } from "../providers/CartProvider";
import { checkInCart } from "../utils/checkInCart";
import { toast } from "react-toastify";

const HomePage = () => {
  const { cart } = useCart();
  const dispatch = useCartActions();

  const addProductHandler = (product) => {
    toast.success(`${product.name} added to cart !`);
    dispatch({ type: "ADD_TO_CART", payload: product });
  };
  const deleteProductHandler = (product) => {
    toast.error(`${product.name} deleted from cart !`);
    dispatch({ type: "DEC_PRODUCT", payload: product });
  };

  return (
    <Layout>
      <main className="container">
        <section className="productList">
          {data.products.map((product) => {
            return (
              <section className="product" key={product.id}>
                <img
                  className="productImg"
                  src={product.image}
                  alt={product.name}
                />
                <p className="productName">{product.name}</p>
                <button
                  onClick={() =>
                    checkInCart(cart, product)
                      ? deleteProductHandler(product)
                      : addProductHandler(product)
                  }
                  className={`cardBtn ${
                    checkInCart(cart, product) ? "inCart" : ""
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className=""
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                </button>
                <div className="productDesc">
                  <div className="productPrice">
                    <span>Price</span>
                    <p>$ {product.price}</p>
                  </div>
                  <div className="productImgs">
                    <img
                      className="fImg"
                      src={product.image}
                      alt={product.name}
                    />
                    <img
                      className="fImg"
                      src={product.image}
                      alt={product.name}
                    />
                  </div>
                </div>
              </section>
            );
          })}
        </section>
      </main>
    </Layout>
  );
};

export default HomePage;

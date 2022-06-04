import { useCart, useCartActions } from "../../providers/CartProvider";
import { useProducts } from "../../providers/ProductsProvider";
import { checkInCart } from "../../utils/checkInCart";
import { toast } from "react-toastify";
import styles from "./productList.module.css";

const ProductList = () => {
  const { cart } = useCart();
  const dispatch = useCartActions();
  const products = useProducts();

  const addProductHandler = (product) => {
    toast.success(`${product.name} added to cart !`);
    dispatch({ type: "ADD_TO_CART", payload: product });
  };
  const deleteProductHandler = (product) => {
    toast.error(`${product.name} deleted from cart !`);
    dispatch({ type: "DEC_PRODUCT", payload: product });
  };

  return (
    <main className={styles.container}>
      <section className={styles.productList}>
        {products.map((product) => {
          return (
            <section className={styles.product} key={product.id}>
              <img
                className={styles.productImg}
                src={product.image}
                alt={product.name}
              />
              <p className={styles.productName}>{product.name}</p>
              <button
                onClick={() =>
                  checkInCart(cart, product)
                    ? deleteProductHandler(product)
                    : addProductHandler(product)
                }
                className={`${styles.cardBtn} ${
                  checkInCart(cart, product) ? styles.inCart : ""
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
              <div className={styles.productDesc}>
                <div className={styles.productPrice}>
                  <span>Price</span>
                  <p>$ {product.price}</p>
                </div>
                <div className={styles.productImgs}>
                  <img src={product.image} alt={product.name} />
                  <img src={product.image} alt={product.name} />
                </div>
              </div>
            </section>
          );
        })}
      </section>
    </main>
  );
};

export default ProductList;

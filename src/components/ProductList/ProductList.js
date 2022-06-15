import { useCart, useCartActions } from "../../providers/CartProvider";
import {
  useProducts,
  useProductsActions,
} from "../../providers/ProductsProvider";
import { checkInCart } from "../../utils/checkInCart";
import { toast } from "react-toastify";
import styles from "./productList.module.css";
import emptyImg from "../../assets/notFoundSearch.jpg";
import { Link } from "react-router-dom";
import { useQuery } from "../../hooks/useQuery";
import { useEffect } from "react";

const ProductList = () => {
  const { cart } = useCart();
  const dispatch = useCartActions();
  const products = useProducts();
  const productDispatch = useProductsActions();
  const query = useQuery();
  const search = query.get("search") || "";
  useEffect(() => {
    productDispatch({ type: "search", value: search });
  }, [search]);

  const addProductHandler = (product) => {
    toast.success(`${product.name} added to cart !`);
    dispatch({ type: "ADD_TO_CART", payload: product });
  };
  const deleteProductHandler = (product) => {
    toast.error(`${product.name} deleted from cart !`);
    dispatch({ type: "DEC_PRODUCT", payload: product });
  };

  if (!products.length)
    return (
      <main>
        <section className={styles.emptyItems}>
          <img src={emptyImg} alt="no match search item" />
          <div className={styles.searchTxt}>
            <h3>Sorry...</h3>
            <p>We can't find what you're looking for.</p>
            <Link to="/">
              <button className="btn primary">
                <div className={styles.backHome}>
                  <p>Back to home</p>
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
          </div>
        </section>
      </main>
    );

  return (
    <main>
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

import Layout from "../Layout/Layout";
import * as data from "../data";
import { useCartActions } from "../providers/CartProvider";

const HomePage = () => {
  const dispatch = useCartActions();

  const addProductHandler = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  return (
    <Layout>
      <main className="container">
        <section className="productList">
          {data.products.map((product) => {
            return (
              <section className="product" key={product.id}>
                <div className="productImg">
                  <img src={product.image} alt={product.name} />
                </div>
                <div className="productDesc">
                  <p>{product.name}</p>
                  <p>$ {product.price}</p>
                </div>
                <div className="btnContainer">
                  <button
                    onClick={() => addProductHandler(product)}
                    className="btn primary"
                  >
                    Add to Cart
                  </button>
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

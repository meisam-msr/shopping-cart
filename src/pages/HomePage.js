import Layout from "../Layout/Layout";
import * as data from "../data";

const HomePage = () => {
  return (
    <Layout>
      <main className="container">
        <section className="productList">
          {data.products.map((p) => {
            return (
              <section className="product" key={p.name}>
                <div className="productImg">
                  <img src={p.image} alt={p.name} />
                </div>
                <div className="productDesc">
                  <p>{p.name}</p>
                  <p>$ {p.price}</p>
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

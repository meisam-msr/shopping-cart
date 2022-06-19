import Layout from "../Layout/Layout";
import Filter from "../components/Filter/Filter";
import Sort from "../components/Sort/Sort";
import ProductList from "../components/ProductList/ProductList";

const HomePage = () => {
  return (
    <Layout>
      <section className="mainContainer">
        <Filter className="filter" />
        <Sort className="sort" />
        <ProductList />
      </section>
    </Layout>
  );
};

export default HomePage;

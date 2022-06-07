import Layout from "../Layout/Layout";
import * as data from "../data";
import { useCart, useCartActions } from "../providers/CartProvider";
import { checkInCart } from "../utils/checkInCart";
import { toast } from "react-toastify";
import Filter from "../components/Filter/Filter";
import Sort from "../components/Sort/Sort";
import { useProducts } from "../providers/ProductsProvider";
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

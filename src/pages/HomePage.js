import Layout from "../Layout/Layout";
import Filter from "../components/Filter/Filter";
import Sort from "../components/Sort/Sort";
import ProductList from "../components/ProductList/ProductList";
import { useState } from "react";

const HomePage = () => {
  const [filters, setFilters] = useState({ price: "250", size: "" });
  
  return (
    <Layout>
      <section className="mainContainer">
        <Filter filters={filters} setFilters={setFilters} className="filter" />
        <Sort className="sort" />
        <ProductList setFilters={setFilters} />
      </section>
    </Layout>
  );
};

export default HomePage;

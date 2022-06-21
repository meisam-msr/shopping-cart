import Layout from "../Layout/Layout";
import Filter from "../components/Filter/Filter";
import Sort from "../components/Sort/Sort";
import ProductList from "../components/ProductList/ProductList";
import { useState, useRef } from "react";

const HomePage = () => {
  const [filters, setFilters] = useState({ price: "250", size: "" });
  const [sortValue, setSortValue] = useState("");
  const isMounted = useRef(false);

  return (
    <Layout>
      <section className="mainContainer">
        <Filter
          isMounted={isMounted}
          filters={filters}
          setFilters={setFilters}
          setSortValue={setSortValue}
          className="filter"
        />
        <Sort
          sortValue={sortValue}
          setSortValue={setSortValue}
          className="sort"
        />
        <ProductList
          isMounted={isMounted}
          setSortValue={setSortValue}
          setFilters={setFilters}
        />
      </section>
    </Layout>
  );
};

export default HomePage;

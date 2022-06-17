import { createContext, useContext, useReducer } from "react";
import { getProducts } from "../services/getProductsService";
import * as data from "../data";
import _ from "lodash";
const ProductsContext = createContext();
const ProductsContextDispatcher = createContext();

// let initialState = { items: [] };
const initialState = data.products;

async function fetchProducts() {
  try {
    const { data } = await getProducts();
    console.log(data);
    initialState.items = data;
  } catch (error) {
    console.log(error);
  }
}

const productsReducer = (state, action) => {
  switch (action.type) {
    case "search": {
      const value = action.value;
      if (value === "") {
        return initialState;
      } else {
        const filteredProducts = initialState.filter((p) => {
          return Object.values(p)
            .join("")
            .toLowerCase()
            .includes(value.toLowerCase());
        });
        return filteredProducts;
      }
    }
    case "sort": {
      const value = action.value;
      const products = [...state];
      if (value === "lowest") {
        return _.orderBy(products, ["price"], ["asc"]);
      } else if (value === "highest") {
        return _.orderBy(products, ["price"], ["desc"]);
      } else if (value === "discount") {
        return _.orderBy(products, ["discount", ["asc"]]);
      }
    }
    case "filter": {
      const { price, size } = action.payload;
      if (price == "" && size == "") {
        action.payload = { size: "", price: "250" };
      }
      const filteredPrice = initialState.filter((p) => {
        return p.offPrice <= price;
      });
      const filteredSize = filteredPrice.filter((p) => {
        if (size === "") {
          return initialState;
        }
        return p.size.find((s) => parseInt(s) === parseInt(size));
      });
      return filteredSize;
    }
    default:
      return state;
  }
};

const ProductsProvider = ({ children }) => {
  const [products, dispatch] = useReducer(productsReducer, initialState);

  // fetchProducts();

  return (
    <ProductsContext.Provider value={products}>
      <ProductsContextDispatcher.Provider value={dispatch}>
        {children}
      </ProductsContextDispatcher.Provider>
    </ProductsContext.Provider>
  );
};
export default ProductsProvider;

export const useProducts = () => useContext(ProductsContext);
export const useProductsActions = () => {
  return useContext(ProductsContextDispatcher);
};

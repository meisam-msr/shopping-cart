import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { getProducts } from "../services/getProductsService";
import * as data from "../data";
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
  const clone = [...state];
  switch (action.type) {
    case "search": {
      const value = action.value;
      if (value === "") {
        return state;
      } else {
        const filteredProducts = state.filter((p) =>
          p.name.toLowerCase().includes(value.toLowerCase())
        );
        return filteredProducts;
      }
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

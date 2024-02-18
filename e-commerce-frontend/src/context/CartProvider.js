import useFetch from "../hooks/useFetch";

const { createContext } = require("react");

export const CartContext = createContext(null);

function CartProvider({ children }) {
  const {
    data: carts,
    refetch,
    loading
  } = useFetch(`${process.env.REACT_APP_API_URL}/cart`);

  return (
    <CartContext.Provider
      value={{
        carts,
        total: carts?.data?.length,
        refetch,
        loading
      }}>
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;

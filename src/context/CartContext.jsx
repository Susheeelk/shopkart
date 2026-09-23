import { createContext, useContext, useState } from "react";
const CartContext = createContext();
export const useCart = () => useContext(CartContext);
export function CartProvider({ children }) {
  const [items, setItems] = useState([]); // [{ product, qty }]
  const addToCart = (product) =>
    setItems((prev) => {
      const found = prev.find((i) => i.product.id === product.id);
      if (found) {
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, qty: i.qty + 1 } : i,
        );
      }
      return [...prev, { product, qty: 1 }];
    });
  const removeFromCart = (id) =>
    setItems((prev) => prev.filter((i) => i.product.id !== id));
  const updateQty = (id, qty) =>
    setItems((prev) =>
      prev.map((i) =>
        i.product.id === id ? { ...i, qty: Math.max(1, qty) } : i,
      ),
    );
  const cartCount = items.reduce((sum, i) => sum + i.qty, 0);
  const total = items.reduce((sum, i) => sum + i.qty * i.product.price, 0);
  return (
    <CartContext.Provider
      value={{ items, addToCart, removeFromCart, updateQty, cartCount, total }}
    >
      {children}
    </CartContext.Provider>
  );
}

import { createContext, useContext, useState, useEffect } from "react";
const WishlistContext = createContext();
export const useWishlist = () => useContext(WishlistContext);
export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("shopkart_wishlist")) || [];
    } catch {
      return [];
    }
  });
  useEffect(() => {
    localStorage.setItem("shopkart_wishlist", JSON.stringify(wishlist));
  }, [wishlist]);
  const toggleWishlist = (id) =>
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  const isWished = (id) => wishlist.includes(id);
  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, isWished }}>
      {children}
    </WishlistContext.Provider>
  );
}

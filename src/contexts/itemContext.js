import { createContext, useContext, useState } from "react";

export const ItemContext = createContext();
export const useItems = () => useContext(ItemContext);

export const ItemsProvider = ({ children }) => {
  const [items, SetItems] = useState([]);

  return (
    <ItemContext.Provider value={{ items }}>{children}</ItemContext.Provider>
  );
};

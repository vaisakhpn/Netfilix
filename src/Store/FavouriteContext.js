import { createContext, useContext, useState } from 'react';

export const FavoriteContext = createContext();

export const useFavoriteContext = () => useContext(FavoriteContext);

export const FavoriteProvider = ({ children }) => {
  const [favouriteData, setFavouriteData] = useState([]);

  return (
    <FavoriteContext.Provider value={{ favouriteData, setFavouriteData }}>
      {children}
    </FavoriteContext.Provider>
  );
};

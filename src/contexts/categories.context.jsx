import { createContext, useState, useEffect } from "react";

import { getCategoriesAndDocuments} from "../utils/firebase.utils.js";



export const CategoriesContext = createContext({
    categoriesMap: {},
});

export const CategoriesProvider = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState({});
useEffect(()=>{
const getCategoriesyMap = async ()=>{
    const categoryMap = await getCategoriesAndDocuments();
    //console.log(categoryMap)
    setCategoriesMap(categoryMap)
}
getCategoriesyMap();
},[])

  const value = { categoriesMap };
  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};

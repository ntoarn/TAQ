import { createContext, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { instance } from "../apis";
import { ICategory } from "../interfaces/Category";
import categoryReducer from "../reducers/categoryReducer";

type CategoryContextType = {
    state : { categories: ICategory[],}
    onDelCate: (id: string) => void,
    handleSubmitCategory: (category: ICategory) => void,
}
export const CategoryContext = createContext({} as CategoryContextType)

export const  CategoryProvider = ({ children } : {children: React.ReactNode}) => {
    const nav = useNavigate();
    const [state, dispatch] = useReducer(categoryReducer, { categories : []})
    
      useEffect(() => {
        (async () => {
            const { data } = await instance.get(`/categories`)
            dispatch({ type: 'SET_CATEGORIES', payload: data.data})
        })()
      }, []);
      const onDelCate = async (id: string) => {
        if (window.confirm("Ban chac chua???")) {
          try {
            await instance.delete(`/categories/${id}`);
            dispatch({ type: 'DELETE_CATEGORY', payload: id})
          } catch (error) {
            console.log(error);
          }
        }
      };
      const handleSubmitCategory = async (category: ICategory) => {
        try {
          if (category._id) {
            const response = await instance.patch(`/categories/${category._id}`, category);
            dispatch({ type: 'UPDATE_CATEGORY', payload: response.data });
          } else {
            const response = await instance.post("/categories/", category);
            dispatch({ type: 'ADD_CATEGORY', payload: response.data });
          }
          nav("/admin");
        } catch (error: any) {
          if (error.response) {
            console.error("Server responded with a status:", error.response.status);
            console.error("Response data:", error.response.data);
          } else if (error.request) {
            console.error("No response received:", error.request);
          } else {
            console.error("Error setting up request:", error.message);
          }
          console.error("Config:", error.config);
        }
      };
      
      
    return (
        <CategoryContext.Provider value={{state, onDelCate , handleSubmitCategory }}>
            {children}
        </CategoryContext.Provider>
    )
}
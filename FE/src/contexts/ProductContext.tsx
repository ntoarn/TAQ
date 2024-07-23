import { createContext, useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Product } from "../interfaces/Product";
import { instance } from "../apis";
import productReducer from "../reducers/productReducer";

type ProductContextType = {
   state : { products: Product[],}
    handleRemove: (id: string) => void,
    handleSubmitProduct: (product: Product) => void,
}
export const ProductContext = createContext({} as ProductContextType)

export const  ProductProvider = ({ children } : {children: React.ReactNode}) => {
    const nav = useNavigate();
    const [state, dispatch] = useReducer(productReducer, { products : []})
    
      useEffect(() => {
        (async () => {
            const { data } = await instance.get(`/products`)
            dispatch({ type: 'SET_PRODUCTS', payload: data.data})
        })()
      }, []);
      const handleRemove = async (id: string) => {
        if (window.confirm("Ban chac chua???")) {
          try {
            await instance.delete(`/products/${id}`);
            dispatch({ type: 'DELETE_PRODUCT', payload: id})
          } catch (error) {
            console.log(error);
          }
        }
      };
      const handleSubmitProduct = async (product: Product) => {
        try {
          if (product._id) {
            const response = await instance.patch(`/products/${product._id}`, product);
            dispatch({ type: 'UPDATE_PRODUCT', payload: response.data });
          } else {
            const response = await instance.post("/products/", product);
            dispatch({ type: 'ADD_PRODUCT', payload: response.data });
          }
          nav("/admin/product");
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
        <ProductContext.Provider value={{state, handleRemove , handleSubmitProduct }}>
            {children}
        </ProductContext.Provider>
    )
}
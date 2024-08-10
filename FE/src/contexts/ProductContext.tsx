import { createContext, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { Product } from "../interfaces/Product";
import productReducer from "../reducers/productReducer";
import instance from "../apis";

type ProductContextType = {
    state: { products: Product[] },
    handleRemove: (id: string) => void,
    handleSubmitProduct: (product: Product) => void,
}

export const ProductContext = createContext({} as ProductContextType);

export const ProductProvider = ({ children }: { children: React.ReactNode }) => {
    const nav = useNavigate();
    const [state, dispatch] = useReducer(productReducer, { products: [] });

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await instance.get(`/products`);
                dispatch({ type: 'SET_PRODUCTS', payload: data.data });
            } catch (error) {
                console.error("Failed to fetch products:", error);
            }
        };

        fetchProducts();
    }, []);

    const handleRemove = async (id: string) => {
        if (window.confirm("Bạn chắc chưa???")) {
            try {
                await instance.delete(`/products/${id}`);
                dispatch({ type: 'DELETE_PRODUCT', payload: id });
            } catch (error) {
                console.error("Failed to delete product:", error);
            }
        }
    };

    const handleSubmitProduct = async (product: Product) => {
        try {
            
            if (product._id) {
                // Cập nhật sản phẩm
                await instance.patch(`/products/${product._id}`, product);
                // Tải lại danh sách sản phẩm sau khi cập nhật
                const { data } = await instance.get(`/products`);
                dispatch({ type: 'SET_PRODUCTS', payload: data.data });
            } else {
                // Thêm sản phẩm mới
                await instance.post("/products/", product);
                // Tải lại danh sách sản phẩm sau khi thêm mới
                const { data } = await instance.get(`/products`);
                dispatch({ type: 'SET_PRODUCTS', payload: data.data });
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
        <ProductContext.Provider value={{ state, handleRemove, handleSubmitProduct }}>
            {children}
        </ProductContext.Provider>
    );
}

import { createContext, useCallback, useEffect, useReducer, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { Product } from "../interfaces/Product";
import productReducer from "../reducers/productReducer";
import instance from "../apis";
import { toast } from 'react-toastify';  // Import toast

type ProductContextType = {
    state: { products: Product[] },
    handleRemove: (id: string) => void,
    handleSubmitProduct: (product: Product) => void,
};

export const ProductContext = createContext({} as ProductContextType);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
    const navigate = useNavigate();
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

    const handleRemove = useCallback(async (id: string) => {
        if (window.confirm("Bạn chắc chưa???")) {
            try {
                await instance.delete(`/products/${id}`);
                dispatch({ type: 'DELETE_PRODUCT', payload: id });
                toast.success("Xóa sản phẩm thành công!");  // Show success toast
            } catch (error) {
                console.error("Failed to delete product:", error);
            }
        }
    }, []);

    const handleSubmitProduct = useCallback(async (product: Product) => {
        try {
            let updatedProducts;
            if (product._id) {
                // Cập nhật sản phẩm
                await instance.patch(`/products/${product._id}`, product);
                updatedProducts = state.products.map((p) =>
                    p._id === product._id ? { ...p, ...product } : p
                );
                toast.success("Sửa sản phẩm thành công!");  // Show success toast
            } else {
                // Thêm sản phẩm mới
                const { data } = await instance.post("/products/", product);
                updatedProducts = [...state.products, data];
                toast.success("Thêm sản phẩm thành công!");  // Show success toast
            }
            dispatch({ type: 'SET_PRODUCTS', payload: updatedProducts });
            navigate("/admin/product");
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
    }, [state.products, navigate]);

    return (
        <ProductContext.Provider value={{ state, handleRemove, handleSubmitProduct }}>
            {children}
        </ProductContext.Provider>
    );
};

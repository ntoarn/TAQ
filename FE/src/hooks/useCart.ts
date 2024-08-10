import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import instance from "../apis";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "react-toastify";

const useCart = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const userId = user?._id;

  const { data, ...restQuery } = useQuery({
    queryKey: ["cart", userId],
    queryFn: async () => {
      if (!userId) {
        return { products: [] };
      }

      try {
        const response = await instance.get(`/cart/${userId}`);
        console.log('API response:', response.data);
        return response.data.products ? response.data : { products: [] };
      } catch (error) {
        console.error('Error fetching cart data:', error);
        return { products: [] };
      }
    },
    enabled: !!userId,
  });

  const { mutate } = useMutation({
    mutationFn: async ({ action, productId }: { action: string, productId: string }) => {
      const currentProducts = data?.products || [];

      // Check for the maximum number of products
      const totalProducts = currentProducts.reduce((total, product) => total + product.quantity, 0);
      
      if (action === 'INCREMENT' && totalProducts >= 10) {
        toast.error('Không thể thêm quá 10 sản phẩm vào giỏ hàng.');
        return;
      }

      switch (action) {
        case "INCREMENT":
          await instance.post(`/cart/increase`, {
            userId,
            productId
          });
          break;
        case "DECREMENT":
          await instance.post(`/cart/decrease`, {
            userId,
            productId
          });
          break;
        case "REMOVE":
          await instance.post(`/cart/remove-cart`, {
            userId,
            productId
          });
          break;
      }
    },
    onError: (error: any) => {
      alert(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart", userId]
      });
    }
  });

  const calculateTotal = () => {
    if (!data || !data.products) 
      return 0;
    return data?.products?.reduce((total, product) => total + product.price * product.quantity, 0);
  }

  return {
    data,
    mutate,
    calculateTotal,
    ...restQuery
  };
};

export default useCart;

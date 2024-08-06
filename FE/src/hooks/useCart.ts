import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import instance from "../apis";
import { useAuth } from "../contexts/AuthContext";

const useCart = () => {
    const queryClient = useQueryClient()
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
    mutationFn: async ({ action, productId }: { action: string, productId: string}) => {
        switch(action){
            case "INCREMENT" :
                await instance.post(`/cart/increase`,{
                    userId,
                    productId
                  });
                  break;
            case "DECREMENT" :
                await instance.post(`/cart/decrease`,{
                    userId,
                    productId
                  });
                  break;
            case "REMOVE" :
                await instance.post(`/cart/remove-cart`,{
                    userId,
                    productId
                  })
                  break 
        }
    },
    onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["cart", userId]
        })
      }
  })
 
  const calculateTotal = () => {
    if (!data || !data.products) 
      return 0;
    return data?.products?.reduce((total, product) => total + product.price * product.quantity, 0)
  }
  return {
    data,
    mutate,
    calculateTotal,
    ...restQuery
  }
}

export default useCart
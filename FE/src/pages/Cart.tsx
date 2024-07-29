import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { FiTrash } from 'react-icons/fi';
import { instance } from '../apis';
import useLocalStorage from '../hooks/useStorage';
import { ICart } from '../interfaces/Cart';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { reduce } from 'lodash';

const Cart = () => {
  const queryClient = useQueryClient()
  const [user] = useLocalStorage("user", {});
  const userId = user?.user?._id;

  const { data, isLoading, isError } = useQuery<ICart>({
    queryKey: ["cart", userId],
    queryFn: async () => {
      if (!userId) {
        return { products: [] };
      }

      try {
        const response = await instance.get<ICart>(`/cart/${userId}`);
        console.log('API response:', response.data);
        return response.data.products ? response.data : { products: [] };
      } catch (error) {
        console.error('Error fetching cart data:', error);
        return { products: [] };
      }
    },
    enabled: !!userId,
  });
  const removeMutation = useMutation({
    mutationFn: async (productId) => {
      const { data } = await instance.post(`/cart/remove-cart`,{
        userId,
        productId
      })
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart", userId]
      })
    }
  })
  const incrementQuantity = useMutation({
    mutationFn: async (productId) => {
      const { data } = await instance.post(`/cart/increase`,{
        userId,
        productId
      })
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart", userId]
      })
    }
  })
  const decrementQuantity = useMutation({
    mutationFn: async (productId) => {
      const { data } = await instance.post(`/cart/decrease`,{
        userId,
        productId
      })
      return data;
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
    return reduce(data.products, (total, product) => total + product.price * product.quantity, 0)
  }
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error</p>;
  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Your Shopping Cart</h1>
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 text-center">
            <thead>
              <tr className="bg-gray-200">
                <th className="w-1/12 px-4 py-2 border">#</th>
                <th className="w-4/12 px-4 py-2 border">Tên sản phẩm</th>
                <th className="w-2/12 px-4 py-2 border">Giá</th>
                <th className="w-2/12 px-4 py-2 border">Số lượng</th>
                <th className="w-3/12 px-4 py-2 border">Tổng giá</th>
                {/* <th className="w-3/12 px-4 py-2 border">Action</th> */}
              </tr>
            </thead>
            <tbody>
              {data?.products?.map((product, index) => (
                <tr key={product._id} className="border-b hover:bg-gray-100">
                  <td className="px-4 py-2 border">{index + 1}</td>
                  <td className="px-4 py-2 border">{product.title}</td>
                  <td className="px-4 py-2 border">{product.price}</td>
                  <td className="px-4 py-2 border">
                    <div className="flex items-center justify-center space-x-2">
                      <button 
                      className="text-red-500 hover:text-red-700 p-1"
                      onClick={() => decrementQuantity.mutate(product.productId)}
                      >
                        <FaMinus />
                      </button>
                      <span>{product.quantity}</span>
                      <button className="text-blue-500 hover:text-blue-700 p-1" 
                       onClick={() => incrementQuantity.mutate(product.productId)}>
                        <FaPlus />
                      </button>
                    </div>
                  </td>
                  <td className="px-4 py-2 border">{product.price * product.quantity}</td>
                  <td className="px-4 py-2  justify-center items-center">
                    <button className="text-red-500 hover:text-black" onClick={() => removeMutation.mutate(product.productId)}>
                      <FiTrash className="mr-2" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p>Total: ${calculateTotal()}</p>
        </div>
      </div>
    </>
  );
};

export default Cart;

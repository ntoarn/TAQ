import { useQuery } from '@tanstack/react-query';
import { FiTrash } from 'react-icons/fi';
import { instance } from '../apis';
import useLocalStorage from '../hooks/useStorage';
import { ICart } from '../interfaces/Cart';
import { FaMinus, FaPlus } from 'react-icons/fa';

const Cart = () => {
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
                      <button className="text-red-500 hover:text-red-700 p-1">
                        <FaMinus />
                      </button>
                      <span>{product.quantity}</span>
                      <button className="text-blue-500 hover:text-blue-700 p-1">
                        <FaPlus />
                      </button>
                    </div>
                  </td>
                  <td className="px-4 py-2 border">{product.price * product.quantity}</td>
                  <td className="px-4 py-2  justify-center items-center">
                    <button className="text-red-500 hover:text-black">
                      <FiTrash className="mr-2" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Cart;

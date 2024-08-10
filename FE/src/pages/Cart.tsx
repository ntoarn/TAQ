import { FiMinus, FiPlus, FiTrash } from 'react-icons/fi';
import useCart from '../hooks/useCart';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { data, calculateTotal, mutate, isLoading, isError } = useCart()
  const shippingFee = 25000;
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error</p>;
  const totalAmount = calculateTotal() + shippingFee;
  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Your Shopping Cart</h1>
      <div className="flex">
        <div className="flex-1 overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 text-center">
            <thead>
              <tr className="bg-gray-200">
                <th className="w-1/12 px-2 py-1 border">#</th>
                <th className="w-1/12 px-2 py-1 border">Ảnh</th>
                <th className="w-3/12 px-2 py-1 border">Tên sản phẩm</th>
                <th className="w-2/12 px-2 py-1 border">Giá</th>
                <th className="w-2/12 px-2 py-1 border">Số lượng</th>
                <th className="w-2/12 px-2 py-1 border">Tổng giá</th>
                <th className="w-1/12 px-2 py-1 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.products?.map((product, index) => (
                <tr key={product._id} className="border-b hover:bg-gray-100">
                  <td className="px-2 py-1 border">{index + 1}</td>
                  <td className="px-2 py-1 border">
                    <img src={product.image} alt="" className="w-16 h-16 object-cover" />
                  </td>
                  <td className="px-2 py-1 border">{product.title}</td>
                  <td className="px-2 py-1 border"><span className="text-gray-800">{product.price?.toLocaleString()}</span>
                    <span className="text-gray-600 text-base"> VNĐ</span></td>
                  <td className="px-2 py-1 border">
                    <div className="flex items-center justify-center space-x-2">
                      <button
                        className="text-red-500 hover:text-red-700 p-1"
                        onClick={() => mutate({ action: 'DECREMENT', productId: product.productId })}
                      >
                        <FiMinus />
                      </button>
                      <span>{product.quantity}</span>
                      <button
                        className="text-blue-500 hover:text-blue-700 p-1"
                        onClick={() => mutate({ action: 'INCREMENT', productId: product.productId })}
                      >
                        <FiPlus />
                      </button>
                    </div>
                  </td>
                  <td className="px-2 py-1 border">
                    {(product.price * product.quantity).toLocaleString()} VNĐ
                  </td>

                  <td className="px-2 py-1 border">
                    <button
                      className="text-red-500 hover:text-black"
                      onClick={() => mutate({ action: 'REMOVE', productId: product.productId })}
                    >
                      <FiTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="ml-4 w-1/4">
          <div className="bg-gray-100 p-4 border border-gray-200">
            <h2 className="text-lg font-bold mb-2">Thanh toán</h2>

            <div className="mb-4">
              <label htmlFor="discount" className="block text-sm font-medium mb-2">Mã giảm giá:</label>
              <div className="flex">
                <input
                  id="discount"
                  type="text"
                  // value={discountCode}
                  // onChange={(e) => setDiscountCode(e.target.value)}
                  className="border border-gray-300 px-3 py-2 rounded-l-md flex-1"
                />
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded-r-md hover:bg-green-600"
                >
                  Áp dụng
                </button>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-600">Phí vận chuyển: {shippingFee.toLocaleString()} VNĐ</p>
            </div>

            <p className="text-xl font-semibold mb-4">Tổng cộng: {totalAmount.toLocaleString()} VNĐ</p>
            <Link
              to="/checkout"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full block text-center"
            >
              Thanh toán
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;

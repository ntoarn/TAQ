import { useCart } from "../contexts/CartContext";

const Cart = () => {
  const { cart, removeFromCart } = useCart(); // Get cart from useCart

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Giỏ hàng của bạn</h1>
      <div className="mt-4 p-4 border border-gray-300 rounded-lg shadow-lg">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="w-full bg-gray-100 text-left">
              <th className="px-6 py-3 text-gray-600 font-semibold text-sm">
                STT
              </th>
              <th className="px-6 py-3 text-gray-600 font-semibold text-sm">
                Ảnh
              </th>
              <th className="px-6 py-3 text-gray-600 font-semibold text-sm">
                Tên sản phẩm
              </th>
              <th className="px-6 py-3 text-gray-600 font-semibold text-sm">
                Giá
              </th>
              <th className="px-6 py-3 text-gray-600 font-semibold text-sm">
                Số lượng
              </th>
              <th className="px-6 py-3 text-gray-600 font-semibold text-sm">
                Tổng tiền
              </th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, index) => (
              <tr
                key={item._id}
                className="border-b hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4">
                  <img
                    src={item.image || "https://via.placeholder.com/50"}
                    alt={item.title || "Product"}
                    className="w-16 h-16 object-cover"
                  />
                </td>
                <td className="px-6 py-4">{item.title}</td>
                <td className="px-6 py-4">${item.price}</td>
                <td className="px-6 py-4">{item.quantity}</td>
                <td className="px-6 py-4">
                  ${(item.price || 0) * (item.quantity || 1)}
                </td>
                <td className="px-6 py-4">
                  <button
                    className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-600 transition"
                    onClick={() => removeFromCart(item._id)}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4 text-right">
          <button className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600 transition">
            Thanh toán
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;

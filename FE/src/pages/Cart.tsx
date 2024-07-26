import React from "react";

const Cart = () => {
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
            <tr className="border-b hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4">1</td>
              <td className="px-6 py-4">
                <img
                  src="https://via.placeholder.com/50"
                  alt="Product"
                  className="w-16 h-16 object-cover"
                />
              </td>
              <td className="px-6 py-4">Product Name</td>
              <td className="px-6 py-4">$100</td>
              <td className="px-6 py-4">2</td>
              <td className="px-6 py-4">$200</td>
            </tr>
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

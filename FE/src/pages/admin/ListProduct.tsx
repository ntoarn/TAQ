import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { ProductContext } from '../../contexts/ProductContext';

const ListProduct = () => {
  const { state, handleRemove } = useContext(ProductContext);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e: any) => {
    setSearchTerm(e.target.value);
  };

  const filteredProducts = state.products.filter(
    (product) =>
      typeof product.title === 'string' &&
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-6">Quản lý sản phẩm</h1>
      <Link
        to="/admin/product-add"
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg mb-6 inline-block"
      >
        Thêm Sản Phẩm Mới
      </Link>

      {/* Search Input */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Tìm kiếm sản phẩm..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="border border-gray-300 rounded-lg py-2 px-4 w-full md:w-1/2 lg:w-1/3"
        />
      </div>

      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-left">#</th>
            <th className="py-2 px-4 border-b text-left">Hình Ảnh</th>
            <th className="py-2 px-4 border-b text-left">Tên Sản Phẩm</th>
            <th className="py-2 px-4 border-b text-left">Giá</th>
            <th className="py-2 px-4 border-b text-left">Mô Tả</th>
            <th className="py-2 px-4 border-b text-left">Số Lượng</th>
            <th className="py-2 px-4 border-b text-left">Màu Sắc</th>
            <th className="py-2 px-4 border-b text-left">Kích Cỡ</th>
            <th className="py-2 px-4 border-b text-left">Danh Mục</th>
            <th className="py-2 px-4 border-b text-left">Hành Động</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product, index) => (
            <tr key={product._id} className="hover:bg-gray-100 transition-colors">
              <td className="py-2 px-4">{index + 1}</td>
              <td className="py-2 px-4">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-12 h-12 object-cover mx-auto"
                />
              </td>
              <td className="py-2 px-4 truncate max-w-xs">{product.title}</td>
              <td className="py-2 px-4 text-gray-800">
                {product.price?.toLocaleString()}
                <span className="text-gray-600 text-base"> VNĐ</span>
              </td>
              <td className="py-2 px-4 truncate max-w-sm">{product.description}</td>
              <td className="py-2 px-4">{product.quantity}</td>
              <td className="py-2 px-4">{product.colorId?.color}</td>
              <td className="py-2 px-4">{product.sizeId?.size}</td>
              <td className="py-2 px-4">{product.categoryId?.name}</td>
              <td className="py-2 px-4 flex space-x-2">
                <button
                  onClick={() => handleRemove(product._id!)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                >
                  Xóa
                </button>
                <Link
                  to={`/admin/product/edit/${product._id}`}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                >
                  Sửa
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListProduct;

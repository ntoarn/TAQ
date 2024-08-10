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
      <h1 className="text-2xl font-bold mb-4">Product Management</h1>

      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by product name..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="border border-gray-300 rounded-lg py-2 px-4 w-1/2 md:w-1/3 lg:w-1/4"
        />
      </div>

      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">#</th>
            <th className="py-2 px-4 border-b">Image</th>
            <th className="py-2 px-4 border-b">Title</th>
            <th className="py-2 px-4 border-b">Price</th>
            <th className="py-2 px-4 border-b">Description</th>
            <th className="py-2 px-4 border-b">Quantity</th>
            <th className="py-2 px-4 border-b">Color</th>
            <th className="py-2 px-4 border-b">Size</th>
            <th className="py-2 px-4 border-b">Category</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product, index) => (
            <tr key={product._id} className="border-b">
              <td className="py-2 px-4">{index + 1}</td>
              <td className="py-2 px-4">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-12 h-12 object-cover mx-auto"
                />
              </td>
              <td className="py-2 px-4 truncate max-w-xs">{product.title}</td>
              <td className="py-2 px-4"><span className="text-gray-800">{product.price?.toLocaleString()}</span>
              <span className="text-gray-600 text-base"> VNĐ</span></td>
              <td className="py-2 px-4 truncate max-w-sm">{product.description}</td>
              <td className="py-2 px-4">{product.quantity}</td>
              <td className="py-2 px-4">{product.colorId?.color}</td>
              <td className="py-2 px-4">{product.sizeId?.size}</td>
              <td className="py-2 px-4">{product.categoryId?.name}</td>
              <td className="py-2 px-4">
                <button
                  onClick={() => handleRemove(product._id!)}
                  className="bg-red-500 text-white px-2 py-1 rounded mr-2"
                >
                  Delete
                </button>
                <Link
                  to={`/admin/product/edit/${product._id}`}
                  className="bg-yellow-500 text-white px-2 py-1 rounded"
                >
                  Edit
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

import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ProductContext } from '../../contexts/ProductContext'

const ListProduct = () => {
    const { state, handleRemove} = useContext(ProductContext)
  return (
    <>
    <Link to="/admin/product-add">
         <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
           Add New Product
         </button>
       </Link>
     <div className="container mx-auto mt-4 col-span-9">
       <table className="min-w-full bg-white border border-gray-300">
         <thead className="bg-gray-800 text-white">
           <tr>
             <th className="py-2">#</th>
             <th className="py-2">Image</th>
             <th className="py-2">Name</th>
             <th className="py-2">Price</th>
             <th className="py-2">Description</th>
             <th className="py-2">Color</th>
             <th className="py-2">Size</th>
             <th className="py-2">Danh mục</th>
             <th className="py-2">Action</th>
           </tr>
         </thead>
         <tbody>
           {state.products.map((product, index) => (
             <tr
               key={product._id}
               className="text-center border-t border-gray-300"
             >
               <td className="py-2">{index + 1}</td>
               <td className="py-2">
                 <img
                   src={product.image}
                   alt={product.title}
                   className="w-12 h-12 object-cover mx-auto"
                 />
               </td>
               <td className="py-2">{product.title}</td>
               <td className="py-2">${product.price}</td>
               <td className="py-2 truncate max-w-xs">{product.description}</td>
               <td className="py-2 truncate max-w-xs">
                 {product.colorId?.color}
               </td>
               <td className="py-2 truncate max-w-xs">
                 {product.sizeId?.size}
               </td>
               <td className="py-2 truncate max-w-xs">
                 {product.categoryId?.name}
               </td>
               <td className="py-2">
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
    </>
  )
}

export default ListProduct
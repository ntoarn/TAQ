import React from "react";
import { ISize } from "../../interfaces/Size";
import { Link } from "react-router-dom";

type Props = {
  size: ISize[];
};

const ListSize = ({ size }: Props) => {
  return (
    <div className="container mx-auto mt-4">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-2 px-4 border-b">#</th>
              <th className="py-2 px-4 border-b">Size</th>
              <th className="py-2 px-4 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {size.map((size, index) => (
              <tr key={size._id} className="text-center">
                <td className="py-2 px-4 border-b">{index + 1}</td>
                <td className="py-2 px-4 border-b">{size.size}</td>

                <td className="py-2 px-4 border-b">
                  <Link
                    to={`/admin/product/edit/${size._id}`}
                    className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListSize;

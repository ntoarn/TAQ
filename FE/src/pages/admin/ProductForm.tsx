import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { Product } from "../../interfaces/Product";
import productSchema from "../../schemas/productSchema";
import { useEffect, useState } from "react";
import { instance } from "../../apis";
import { ICategory } from "../../interfaces/Category";
import { zodResolver } from "@hookform/resolvers/zod";

type Props = {
  onSubmit: (product: Product) => void;
};

const ProductForm = ({ onSubmit }: Props) => {
  const { id } = useParams<{ id?: string }>();
  const [categories, setCategories] = useState<ICategory[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Product>({
    resolver: zodResolver(productSchema),
  });

  useEffect(() => {
    if (id) {
      (async () => {
        const { data } = await instance.get(`/products/${id}`);
        reset(data.data);
      })();
    }
  }, [id, reset]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await instance.get("/categories");
        setCategories(data.data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    })();
  }, []);

  const handleFormSubmit = (data: Product) => {
    onSubmit({ ...data, _id: id, categoryId: data.categoryId });
  };

  return (
    <div className="container mx-auto p-6 bg-white shadow-md rounded-lg">
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <h1 className="text-2xl font-bold mb-6">
          {id ? "Edit Product" : "Add Product"}
        </h1>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700">
            Title
          </label>
          <input
            type="text"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:ring-blue-300"
            id="title"
            placeholder="Title"
            {...register("title")}
          />
          {errors.title?.message && (
            <p className="text-red-500 mt-1">{errors.title?.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block text-gray-700">
            Price
          </label>
          <input
            type="number"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:ring-blue-300"
            id="price"
            placeholder="Price"
            {...register("price", { valueAsNumber: true })}
          />
          {errors.price?.message && (
            <p className="text-red-500 mt-1">{errors.price?.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700">
            Description
          </label>
          <textarea
            rows={4}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:ring-blue-300"
            id="description"
            placeholder="Description"
            {...register("description")}
          />
          {errors.description?.message && (
            <p className="text-red-500 mt-1">{errors.description?.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="image" className="block text-gray-700">
            Image
          </label>
          <input
            type="text"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:ring-blue-300"
            id="image"
            placeholder="Image"
            {...register("image")}
          />
          {errors.image?.message && (
            <p className="text-red-500 mt-1">{errors.image?.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="categoryId" className="block text-gray-700">
            Category
          </label>
          <select
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:ring-blue-300"
            id="categoryId"
            {...register("categoryId")}
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
          {errors.categoryId?.message && (
            <p className="text-red-500 mt-1">{errors.categoryId?.message}</p>
          )}
        </div>
        <div className="mt-6">
          <button
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
            type="submit"
          >
            {id ? "Edit Product" : "Add Product"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;

import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { ProductContext } from "../../contexts/ProductContext";
import { IColor } from "../../interfaces/Color";
import { Product } from "../../interfaces/Product";
import { ISize } from "../../interfaces/Size";
import productSchema from "../../schemas/productSchema";
import { ICategory } from "../../interfaces/Category";
import instance from "../../apis";

const ProductForm = () => {
  const { id } = useParams<{ id?: string }>();
  const { handleSubmitProduct } = useContext(ProductContext)
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [colors, setColors] = useState<IColor[]>([]);
  const [sizes, setSizes] = useState<ISize[]>([]);

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
  useEffect(() => {
    (async () => {
      try {
        const { data } = await instance.get("/color");
        setColors(data.data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    })();
  }, []);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await instance.get("/size");
        setSizes(data.data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    })();
  }, []);

  const handleFormSubmit = (data: Product) => {
    console.log("Form data:", data); 
    handleSubmitProduct({ ...data, _id: id, categoryId: data.categoryId, colorId: data.colorId, sizeId: data.sizeId });
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
          <label htmlFor="quantity" className="block text-gray-700">
            Quantity
          </label>
          <input
            type="number"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:ring-blue-300"
            id="quantity"
            placeholder="quantity"
            {...register("quantity", { valueAsNumber: true })}
          />
          {errors.quantity?.message && (
            <p className="text-red-500 mt-1">{errors.quantity?.message}</p>
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
          <label htmlFor="colorId" className="block text-gray-700">
            Color
          </label>
          <select
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:ring-blue-300"
            id="colorId"
            {...register("colorId")}
          >
            <option value="">Select Color</option>
            {colors.map((color) => (
              <option key={color._id} value={color._id}>
                {color.color}
              </option>
            ))}
          </select>
          {errors.colorId?.message && (
            <p className="text-red-500 mt-1">{errors.colorId?.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="colorId" className="block text-gray-700">
            Size
          </label>
          <select
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:ring-blue-300"
            id="sizeId"
            {...register("sizeId")}
          >
            <option value="">Select Size</option>
            {sizes.map((size) => (
              <option key={size._id} value={size._id}>
                {size.size}
              </option>
            ))}
          </select>
          {errors.sizeId?.message && (
            <p className="text-red-500 mt-1">{errors.sizeId?.message}</p>
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

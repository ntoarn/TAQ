import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { instance } from "../../apis";
import { ICategory } from "../../interfaces/Category";
import { Product } from "../../interfaces/Product";
import categorySchema from "../../schemas/categorySchema";

type Props = {
  onSubmit: (product: Product) => void;
};

const CategoryForm = ({ onSubmit }: Props) => {
  const { id } = useParams<{ id?: string }>();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ICategory>({
    resolver: zodResolver(categorySchema),
  });
  useEffect(() => {
    (async () => {
      try {
        const { data } = await instance.get("/categories");
        reset(data.data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    })();
  }, [id, reset]);

  const handleFormSubmit = (data: ICategory) => {
    onSubmit({ ...data, _id: id});
  };

  return (
    <div className="container mx-auto p-6 bg-white shadow-md rounded-lg">
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <h1 className="text-2xl font-bold mb-6">
          {id ? "Edit Category" : "Add Category"}
        </h1>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700">
            Name
          </label>
          <input
            type="text"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:ring-blue-300"
            id="name"
            placeholder="Name"
            {...register("name")}
          />
          {errors.name?.message && (
            <p className="text-red-500 mt-1">{errors.name?.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="slug" className="block text-gray-700">
            Slug
          </label>
          <textarea
            rows={4}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:ring-blue-300"
            id="slug"
            placeholder="Description"
            {...register("slug")}
          />
          {errors.slug?.message && (
            <p className="text-red-500 mt-1">{errors.slug?.message}</p>
          )}
        </div>
        <div className="mt-6">
          <button
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
            type="submit"
          >
            {id ? "Edit Category" : "Add Category"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CategoryForm;

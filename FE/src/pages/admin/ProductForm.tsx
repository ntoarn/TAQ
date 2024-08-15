import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { ProductContext } from "../../contexts/ProductContext";
import { IColor } from "../../interfaces/Color";
import { Product } from "../../interfaces/Product";
import { ISize } from "../../interfaces/Size";
import productSchema from "../../schemas/productSchema";
import { ICategory } from "../../interfaces/Category";
import instance, { uploadImageToCloudinary } from "../../apis";

const ProductForm = () => {
  const { id } = useParams<{ id?: string }>();
  const { handleSubmitProduct } = useContext(ProductContext);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [colors, setColors] = useState<IColor[]>([]);
  const [sizes, setSizes] = useState<ISize[]>([]);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate(); // Thêm useNavigate

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<Product>({
    resolver: zodResolver(productSchema),
  });

  const image = watch("image"); // Watch field image to show preview

  useEffect(() => {
    const fetchProduct = async () => {
      if (id) {
        try {
          const { data } = await instance.get(`/products/${id}`);
          reset({
            ...data.data,
            colorId: data.data.colorId?._id,
            sizeId: data.data.sizeId?._id,
            categoryId: data.data.categoryId?._id,
          });
        } catch (error) {
          console.error("Failed to fetch product:", error);
        }
      }
    };
    
    fetchProduct();
  }, [id, reset]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await instance.get("/categories");
        setCategories(data.data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    
    const fetchColors = async () => {
      try {
        const { data } = await instance.get("/color");
        setColors(data.data);
      } catch (error) {
        console.error("Failed to fetch colors:", error);
      }
    };
    
    const fetchSizes = async () => {
      try {
        const { data } = await instance.get("/size");
        setSizes(data.data);
      } catch (error) {
        console.error("Failed to fetch sizes:", error);
      }
    };

    fetchCategories();
    fetchColors();
    fetchSizes();
  }, []);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploading(true);
      try {
        const url = await uploadImageToCloudinary(file);
        setValue("image", url);
        setUploading(false);
      } catch (error) {
        console.error("Failed to upload image:", error);
        setUploading(false);
      }
    }
  };

  const handleFormSubmit = async (data: Product) => {
    try {
      await handleSubmitProduct({
        ...data,
        _id: id,
        categoryId: data.categoryId,
        colorId: data.colorId,
        sizeId: data.sizeId,
      });
      navigate("/admin/product"); // Điều hướng đến trang danh sách sản phẩm sau khi thành công
    } catch (error) {
      console.error("Failed to submit product:", error);
    }
  };

  return (
    <div className="container mx-auto p-6 bg-white shadow-md rounded-lg">
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <h1 className="text-2xl font-bold mb-6">
          {id ? "Sửa sản phẩm" : "Thêm sản phẩm"}
        </h1>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700">
            Tên sản phẩm
          </label>
          <input
            type="text"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:ring-blue-300"
            id="title"
            placeholder="Tên sản phẩm"
            {...register("title")}
          />
          {errors.title?.message && (
            <p className="text-red-500 mt-1">{errors.title?.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block text-gray-700">
            Giá
          </label>
          <input
            type="number"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:ring-blue-300"
            id="price"
            placeholder="Giá"
            {...register("price", { valueAsNumber: true })}
          />
          {errors.price?.message && (
            <p className="text-red-500 mt-1">{errors.price?.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700">
            Mô tả
          </label>
          <textarea
            rows={4}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:ring-blue-300"
            id="description"
            placeholder="Mô tả"
            {...register("description")}
          />
          {errors.description?.message && (
            <p className="text-red-500 mt-1">{errors.description?.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="quantity" className="block text-gray-700">
            Số lượng
          </label>
          <input
            type="number"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:ring-blue-300"
            id="quantity"
            placeholder="Số lượng"
            {...register("quantity", { valueAsNumber: true })}
          />
          {errors.quantity?.message && (
            <p className="text-red-500 mt-1">{errors.quantity?.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="categoryId" className="block text-gray-700">
            Danh mục
          </label>
          <select
            id="categoryId"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:ring-blue-300"
            {...register("categoryId")}
          >
            <option value="">Chọn danh mục</option>
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
        <div className="mb-4">
          <label htmlFor="colorId" className="block text-gray-700">
            Màu
          </label>
          <select
            id="colorId"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:ring-blue-300"
            {...register("colorId")}
          >
            <option value="">Chọn màu</option>
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
          <label htmlFor="sizeId" className="block text-gray-700">
            Kính cỡ
          </label>
          <select
            id="sizeId"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:ring-blue-300"
            {...register("sizeId")}
          >
            <option value="">Chọn kích cỡ</option>
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
          <label htmlFor="image" className="block text-gray-700">
            Ảnh
          </label>
          <input
            type="file"
            id="image"
            className="mt-1 block"
            accept="image/*"
            onChange={handleImageUpload}
          />
          {uploading && <p className="text-blue-500">Uploading...</p>}
          {image && (
            <img src={image} alt="Product preview" className="mt-2 w-32 h-32 object-cover" />
          )}
          {errors.image?.message && (
            <p className="text-red-500 mt-1">{errors.image?.message}</p>
          )}
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          {id ? "Sửa sản phẩm" : "Thêm sản phẩm"}
        </button>
      </form>
    </div>
  );
};

export default ProductForm;

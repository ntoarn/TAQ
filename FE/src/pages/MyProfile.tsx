import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast, ToastContainer } from "react-toastify";
import { AuthContext, AuthContextType } from "../contexts/AuthContext";
import { userSchema } from "../schemas/authSchema";
import { IUser } from "../interfaces/User";
import instance from "../apis";

const MyProfile = () => {
  const [avatar, setAvatar] = useState<string>("");
  const { user } = useContext(AuthContext) as AuthContextType;
  const { id } = useParams();
  const nav = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<IUser>({
    resolver: zodResolver(userSchema),
  });

  useEffect(() => {
    if (id) {
      (async () => {
        try {
          const { data } = await instance.get(`/users/me/${id}`);
          console.log("Fetched user data:", data); // Log dữ liệu
          setAvatar(data.avatar);
          reset(data);
        } catch (error) {
          console.error("Error fetching user data", error);
        }
      })();
    }
  }, [id, reset]);

  const onSubmit = async (data: IUser) => {
    console.log("Submitted form data:", data); // Log dữ liệu form
    try {
      const res = await instance.put(`/users/updateme/${id}`, {
        name: data.name,
        email: data.email,
        password: data.password,
        avatar: data.avatar,
      });
      toast.success("Sửa thành công");
      nav("/");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Error!");
    }
  };

  console.log("User from AuthContext: ", user);
  console.log("Form errors: ", errors);

  return (
    <div className="mt-10 mx-auto max-w-7xl flex">
      <div className="w-1/2">
        <h1 className="text-4xl font-bold">Thông tin cá nhân</h1>
        <div className="mt-5">
          {user && user.name ? (
            <div className="flex items-center">
              <img
                src={avatar}
                alt="Avatar"
                className="w-28 h-28 rounded-full border border-gray-300"
              />
              <div className="ml-5">
                <h3 className="text-2xl font-semibold">{user.name}</h3>
                <p className="text-gray-500 text-xl">{user.email}</p>
              </div>
            </div>
          ) : (
            <p className="text-gray-500">No user data available</p>
          )}
        </div>
      </div>
      <div className="w-1/2">
        <h2 className="text-2xl font-semibold">Cập nhật tài khoản</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white py-5 px-8 shadow-xl rounded-xl mt-4"
        >
          <div className="mb-4">
            <label htmlFor="name" className="block text-lg font-medium mb-1">
              Tên
            </label>
            <input
              id="name"
              className="form-input mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
              type="text"
              {...register("name", { required: "Tên không được để trống" })}
            />
            {errors.name && (
              <span className="text-red-500 text-sm">{errors.name.message}</span>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-lg font-medium mb-1">
              Email
            </label>
            <input
              id="email"
              className="form-input mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
              type="email"
              readOnly
              {...register("email", { required: "Email không được để trống" })}
            />
            {errors.email && (
              <span className="text-red-500 text-sm">{errors.email.message}</span>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-lg font-medium mb-1">
              Password
            </label>
            <input
              id="password"
              className="form-input mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
              type="password"
              {...register("password", { required: "Password không được để trống" })}
            />
            {errors.password && (
              <span className="text-red-500 text-sm">{errors.password.message}</span>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="avatar" className="block text-lg font-medium mb-1">
              Avatar
            </label>
            <div className="w-40 h-40 mb-2">
              <img src={avatar} alt="Avatar" className="w-full h-full object-cover rounded-md border border-gray-300" />
            </div>
            <input
              id="avatar"
              className="form-input mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
              type="text"
              {...register("avatar", { required: "Avatar không được để trống" })}
            />
            {errors.avatar && (
              <span className="text-red-500 text-sm">{errors.avatar.message}</span>
            )}
          </div>
          <div className="mb-4">
            <button
              type="submit"
              className="btn btn-primary w-full py-2 px-4 rounded-md shadow-sm text-white bg-blue-500 hover:bg-blue-600"
            >
              Cập nhật
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default MyProfile;

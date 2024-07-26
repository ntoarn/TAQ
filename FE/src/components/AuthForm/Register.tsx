import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { instance } from "../../apis";
import { User } from "../../interfaces/User";
import { registerSchema } from "../../schemas/authSchema";
import { toast } from "react-toastify";

const Register = () => {
  const nav = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: User) => {
    try {
      await instance.post(`/register`, {
        email: data.email,
        password: data.password,
      });
      toast.success("Đăng ký thành công");
      setTimeout(() => {
        nav("/login");
      }, 2000);
      console.log(data);
    } catch (error) {
      toast.error("Đăng ký thất bại");
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">
          Đăng ký tài khoản
        </h1>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
            {...register("email", { required: true })}
          />
          {errors.email?.message && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 mb-2">
            Mật khẩu
          </label>
          <input
            type="password"
            id="password"
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
            {...register("password", { required: true })}
          />
          {errors.password?.message && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="confirmPass" className="block text-gray-700 mb-2">
            Xác nhận mật khẩu
          </label>
          <input
            type="password"
            id="confirmPass"
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring ${
              errors.confirmPass ? "border-red-500" : "border-gray-300"
            }`}
            {...register("confirmPass", { required: true })}
          />
          {errors.confirmPass?.message && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirmPass.message}
            </p>
          )}
        </div>
        <div className="mb-4">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Đăng ký
          </button>
        </div>
        <div className="text-center flex justify-center">
          <p className="mr-2">Bạn đã có tài khoản?</p>
          <Link to="/users/login" className="text-blue-500 hover:underline">
            Đăng nhập
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;

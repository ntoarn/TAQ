import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { instance } from "../../apis";
import { User } from "../../interfaces/User";
import { loginSchema } from "../../schemas/authSchema";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import useLocalStorage from "../../hooks/useStorage";

const Login = () => {
  const [, setUser] = useLocalStorage("user", {})
  const nav = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({
    resolver: zodResolver(loginSchema),
  });

  const {mutate} = useMutation({
    mutationFn: async (data : User) => {
      const res = await instance.post(`/login`, data)
      return res.data;
    },
    onSuccess: (data) => {
      setUser(data)
      toast.success("Dang nhap thanh cong")
      nav('/')
    },
    onError: (error) => {
      toast.error("Đăng nhập thất bại! Vui lòng kiểm tra lại thông tin.");
    }
  })
  
  const onSubmit = async (data: User) => {
    mutate(data);
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
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
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Đăng nhập
          </button>
          <div className="text-center flex justify-center">
            <p className="mr-2">Bạn chưa có tài khoản?</p>
            <Link
              to="/users/register"
              className="text-blue-500 hover:underline"
            >
              Đăng ký
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;

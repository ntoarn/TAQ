import { useNavigate } from "react-router-dom";
import useCart from "../hooks/useCart";
import { ICustomerInfo, IOrder, IOrderItem } from "../interfaces/Order";
import { customerInfoSchema } from "../schemas/orderSchema";
import { useMutation } from "@tanstack/react-query";
import instance from "../apis";
import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import { useAuth } from "../contexts/AuthContext";

const CheckOut = () => {
  const nav = useNavigate();
  const { data: cartData, calculateTotal } = useCart();
  const { user } = useAuth();
  const userId = user?._id;
  const shippingFee = 25000;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICustomerInfo>({
    resolver: joiResolver(customerInfoSchema),
  });

  const { mutate } = useMutation({
    mutationFn: async (order: IOrder) => {
      const { data } = await instance.post(`/order`, order);
      return data;
    },
    onSuccess: () => {
      nav('/bill');
      alert('Đặt hàng thành công');
      window.location.reload();
    },
    onError: (error: Error) => {
      console.error("Order submission error:", error);
      alert('Đã xảy ra lỗi khi đặt hàng. Vui lòng thử lại.');
    }
  });

  const onSubmit = async (data: ICustomerInfo) => {
    const paymentMethod = data.payment;
    const totalAmount = calculateTotal() + shippingFee;
  
    if (totalAmount < 1000 || totalAmount > 50000000) {
      alert('Số tiền thanh toán không hợp lệ. Phải từ 1000 VND đến 50,000,000 VND.');
      return;
    }
  
    const order: IOrder = {
      userId: userId as string,
      items: cartData?.products || [],
      totalPrice: totalAmount,
      customerInfo: data,
      paymentMethod: paymentMethod,
    };
  
    try {
      if (paymentMethod === "MOMO") {
        // Tạo đơn hàng để nhận orderId
        const createOrderResponse = await instance.post('/order', order);
        const { orderId } = createOrderResponse.data;
  
        // Thực hiện thanh toán
        const paymentResponse = await instance.post('/payment', {
          orderId, // Truyền orderId đã tạo
          amounts: totalAmount
        });
  
        if (paymentResponse.data.payUrl) {
          window.location.href = paymentResponse.data.payUrl;
        } else {
          throw new Error("Không nhận được URL thanh toán từ máy chủ.");
        }
      } else if (paymentMethod === "COD") {
        await mutate(order);
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert('Lỗi thanh toán: ' + (error as Error).message);
    }
  };
  
  const totalAmount = calculateTotal() + shippingFee;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Thanh toán</h1>
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-8 bg-white shadow-md rounded-lg p-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700" htmlFor="name">
                Tên
              </label>
              <input
                {...register('name')}
                id="name"
                type="text"
                className={`mt-1 block w-full px-3 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              />
              {errors.name && <p className="text-red-500 text-xs italic">{errors.name.message}</p>}
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700" htmlFor="email">
                Email
              </label>
              <input
                {...register('email')}
                id="email"
                type="email"
                className={`mt-1 block w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              />
              {errors.email && <p className="text-red-500 text-xs italic">{errors.email.message}</p>}
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700" htmlFor="address">
                Địa chỉ
              </label>
              <input
                {...register('address')}
                id="address"
                type="text"
                className={`mt-1 block w-full px-3 py-2 border ${errors.address ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              />
              {errors.address && <p className="text-red-500 text-xs italic">{errors.address.message}</p>}
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700" htmlFor="phone">
                Số điện thoại
              </label>
              <input
                {...register('phone')}
                id="phone"
                type="text"
                className={`mt-1 block w-full px-3 py-2 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              />
              {errors.phone && <p className="text-red-500 text-xs italic">{errors.phone.message}</p>}
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700" htmlFor="payment">
                Hình thức thanh toán
              </label>
              <select
                {...register('payment')}
                id="payment"
                className={`mt-1 block w-full px-3 py-2 border ${errors.payment ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              >
                <option value="">Chọn phương thức thanh toán</option>
                <option value="COD">Thanh toán khi nhận hàng (COD)</option>
                <option value="MOMO">Thanh toán MoMo</option>
              </select>
              {errors.payment && <p className="text-red-500 text-xs italic">{errors.payment.message}</p>}
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700" htmlFor="city">
                Thành phố
              </label>
              <input
                {...register('city')}
                id="city"
                type="text"
                className={`mt-1 block w-full px-3 py-2 border ${errors.city ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              />
              {errors.city && <p className="text-red-500 text-xs italic">{errors.city.message}</p>}
            </div>

            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Thanh toán
              </button>
            </div>
          </form>
        </div>

        <div className="col-span-4 bg-white shadow-md rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Chi tiết đơn hàng</h2>
          {cartData?.products?.map((item: IOrderItem) => (
            <div key={item._id} className="border-b py-4">
              <img src={item.image} alt="" width={100} className="mb-2"/>
              <h4 className="text-lg font-semibold">{item.title}</h4>
              <p>Giá: {item.price.toLocaleString()} VNĐ</p>
              <p>Số lượng: {item.quantity}</p>
            </div>
          ))}
          <div className="mt-4">
            <p className="text-sm text-gray-600">Phí vận chuyển: {shippingFee.toLocaleString()} VNĐ</p>
            <p className="text-xl font-semibold mt-4">Tổng cộng: {totalAmount.toLocaleString()} VNĐ</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;

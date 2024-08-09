import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import instance from "../apis";
import { IOrder } from "../interfaces/Order";

export const useOrder = () => {
  const nav = useNavigate();
  return useMutation({
    mutationFn: async (data: IOrder) => {
      try {
        const orderResponse = await instance.post("/order", {
          userId: data.userId,
          items: data.items,
          customerInfo: data.customerInfo, // Đảm bảo đây là đúng
          totalPrice: data.totalPrice,
        });

        if (data.customerInfo.payment === "bank") {
          const paymentResponse = await instance.post("/payment", {
            orderId: orderResponse.data._id,
            amounts: orderResponse.data.totalPrice,
          });

          if (paymentResponse.data.payUrl) {
            window.location.href = paymentResponse.data.payUrl;
          } else {
            toast.error("Thanh toán thất bại");
          }
        } else {
          toast.success("Đặt hàng thành công");
          nav("/bill/" + orderResponse.data._id);
        }

        return orderResponse.data;
      } catch (error) {
        console.error("Error placing order:", error);
        toast.error("Có lỗi xảy ra khi đặt hàng");
        throw error;
      }
    },
  });
};


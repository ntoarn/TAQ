import React, { useEffect, useState } from 'react';
import { IOrder } from '../interfaces/Order';
import instance from '../apis';
import { useAuth } from '../contexts/AuthContext';

const OrderHistory = () => {
    const [orders, setOrders] = useState<IOrder[]>([]);
    const [error, setError] = useState<string | null>(null);
    const { user } = useAuth();
    const userId = user?._id;

    useEffect(() => {
        const fetchOrders = async () => {
            if (!userId) {
                setError('User ID is missing');
                return;
            }

            try {
                const response = await instance.get(`/order/user/${userId}`);
                setOrders(response.data);
            } catch (error: any) {
                console.error('Error fetching orders:', error);
                setError(error.response?.data?.message || 'Error fetching orders');
            }
        };

        fetchOrders();
    }, [userId]);

    const handleCancelOrder = async (orderId: string) => {
        try {
            const response = await instance.post('/order/cancel', { orderId });
            alert(response.data.message);

            // Cập nhật trạng thái đơn hàng trong giao diện người dùng
            setOrders((prevOrders) => prevOrders.map((order) =>
                order._id === orderId ? { ...order, status: 'Hủy' } : order
            ));
        } catch (error: any) {
            console.error('Error canceling order:', error);
            setError(error.response?.data?.message || 'Error canceling order');
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4 text-center">Lịch Sử Đơn Hàng</h2>
            {error && <p className="text-red-500 text-center">{error}</p>}
            {orders.length === 0 ? (
                <p className="text-gray-600 text-center">Không có đơn hàng nào.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="bg-white border border-gray-200 mx-auto text-sm w-full max-w-5xl">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-4 py-2 border-b text-left">ID</th>
                                <th className="px-4 py-2 border-b text-left">Ngày Đặt</th>
                                <th className="px-4 py-2 border-b text-left">Tổng Tiền</th>
                                <th className="px-4 py-2 border-b text-left">Trạng Thái</th>
                                <th className="px-4 py-2 border-b text-left">Chi Tiết</th>
                                <th className="px-4 py-2 border-b text-left">Hành Động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order._id} className="hover:bg-gray-100">
                                    <td className="px-4 py-2 border-b text-center">{order.orderNumber}</td>
                                    <td className="px-4 py-2 border-b text-center">{new Date(order.createdAt).toLocaleDateString()}</td>
                                    <td className="px-4 py-2 border-b text-center">{order.totalPrice} VND</td>
                                    <td className="px-4 py-2 border-b text-center">{order.status}</td>
                                    <td className="px-4 py-2 border-b text-center">
                                        <button
                                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-xs"
                                            onClick={() => handleOrderDetails(order._id)}
                                        >
                                            Xem Chi Tiết
                                        </button>
                                    </td>
                                    <td className="px-4 py-2 border-b text-center">
                                        {order.status === "Chờ xác nhận" && (
                                            <button
                                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 text-xs"
                                                onClick={() => handleCancelOrder(order._id)}
                                            >
                                                Hủy
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

const handleOrderDetails = (orderId: string) => {
    // Handle logic to show order details
};

export default OrderHistory;

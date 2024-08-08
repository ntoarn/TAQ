import React, { useEffect, useState } from 'react';
import { IOrder } from '../../interfaces/Order';
import instance from '../../apis';
import StatusUpdateModal from '../../components/StatusUpdateModal';
import Modal from './../../components/Model';
import { toast, ToastContainer } from 'react-toastify';

const OrderAdmin: React.FC = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<IOrder[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<IOrder | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isStatusUpdateModalOpen, setIsStatusUpdateModalOpen] = useState<boolean>(false);
  const [orderToUpdate, setOrderToUpdate] = useState<IOrder | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const fetchOrders = async () => {
    try {
      const response = await instance.get('/order');
      setOrders(response.data);
      setFilteredOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const results = orders.filter(order =>
        order.customerInfo.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredOrders(results);
    } else {
      setFilteredOrders(orders);
    }
  }, [searchTerm, orders]);

  const handleUpdateStatus = async (status: string) => {
    if (!orderToUpdate) return;
  
    // Kiểm tra trạng thái của đơn hàng trước khi cập nhật
    if (orderToUpdate.status === "Hủy") {
      // alert("Không thể cập nhật trạng thái của đơn hàng đã hủy");
      toast.error("Không thể cập nhật trạng thái của đơn hàng đã hủy")
      return;
    }
    // Kiểm tra trạng thái của đơn hàng trước khi cập nhật
    if (orderToUpdate.status === "Đã giao hàng") {
      // alert("Không thể cập nhật trạng thái của đơn hàng đã giao");
      toast.error("Không thể cập nhật trạng thái của đơn hàng đã giao")
      return;
    }
  
    try {
      const response = await instance.put('/order/status', { orderId: orderToUpdate._id, status });
      setOrders(prevOrders => prevOrders.map(order => (order._id === orderToUpdate._id ? response.data : order)));
      setOrderToUpdate(null);
    } catch (error) {
      console.error('Error updating order status:', error.response?.data || error.message);
    }
  };

  const handleViewProducts = (order: IOrder) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleOpenStatusUpdateModal = (order: IOrder) => {
    setOrderToUpdate(order);
    setIsStatusUpdateModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  const handleCloseStatusUpdateModal = () => {
    setIsStatusUpdateModalOpen(false);
    setOrderToUpdate(null);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Order Management</h1>
      
      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-lg py-2 px-4 w-1/2 md:w-1/3 lg:w-1/4"
        />
      </div>

      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Phone</th>
            <th className="py-2 px-4 border-b">Address</th>
            <th className="py-2 px-4 border-b">Products</th>
            <th className="py-2 px-4 border-b">Total Price</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map((order, index) => (
            <tr key={order._id} className="border-b">
              <td className="py-2 px-4">{index + 1}</td>
              <td className="py-2 px-4">{order.customerInfo.email}</td>
              <td className="py-2 px-4">{order.customerInfo.name}</td>
              <td className="py-2 px-4">{order.customerInfo.phone}</td>
              <td className="py-2 px-4">{order.customerInfo.address}</td>
              <td className="py-2 px-4">
                <button
                  className="bg-blue-500 text-white py-1 px-3 rounded"
                  onClick={() => handleViewProducts(order)}
                >
                   Products
                </button>
              </td>
              <td className="py-2 px-4">{order.totalPrice}</td>
              <td className="py-2 px-4">{order.status}</td>
              <td className="py-2 px-4">
                <button
                  className="bg-blue-500 text-white py-1 px-3 rounded mr-2"
                  onClick={() => handleOpenStatusUpdateModal(order)}
                >
                  Update 
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <h2 className="text-xl font-bold">Order Products</h2>
        <ul>
          {selectedOrder?.items.map(item => (
            <li key={item._id} className="border-b py-2">
              <img src={item.image} alt={item.title} className="w-16 h-16 inline-block mr-4" />
              <span>{item.title} - {item.quantity} x ${item.price}</span>
            </li>
          ))}
        </ul>
        <button
          className="mt-4 bg-gray-500 text-white py-1 px-3 rounded"
          onClick={handleCloseModal}
        >
          Close
        </button>
      </Modal>
      
      <StatusUpdateModal
        isOpen={isStatusUpdateModalOpen}
        currentStatus={orderToUpdate?.status || 'pending'}
        onClose={handleCloseStatusUpdateModal}
        onUpdateStatus={handleUpdateStatus}
      />
      <ToastContainer/>
    </div>
    
  );
};

export default OrderAdmin;

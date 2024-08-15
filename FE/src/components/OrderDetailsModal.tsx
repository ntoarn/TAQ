// OrderDetailsModal.tsx
import React from 'react';
import { IOrder } from '../interfaces/Order';
import Modal from './Model';

interface OrderDetailsModalProps {
    isOpen: boolean;
    order: IOrder | null;
    onClose: () => void;
}

const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({ isOpen, order, onClose }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <h2 className="text-xl font-bold mb-4">Order Details</h2>
            <ul>
                {order?.items.map(item => (
                    <li key={item._id} className="border-b py-2 flex items-center">
                        <img src={item.image} alt={item.title} className="w-16 h-16 inline-block mr-4" />
                        <span>{item.title} - {item.quantity} x ${item.price}</span>
                    </li>
                ))}
            </ul>
            <button
                className="mt-4 bg-gray-500 text-white py-1 px-3 rounded"
                onClick={onClose}
            >
                Close
            </button>
        </Modal>
    );
};

export default OrderDetailsModal;

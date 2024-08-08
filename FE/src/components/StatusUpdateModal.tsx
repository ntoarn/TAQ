
import React, { useState } from 'react';

interface StatusUpdateModalProps {
  isOpen: boolean;
  currentStatus: string;
  onClose: () => void;
  onUpdateStatus: (status: string) => void;
}

const StatusUpdateModal: React.FC<StatusUpdateModalProps> = ({ isOpen, currentStatus, onClose, onUpdateStatus }) => {
  const [selectedStatus, setSelectedStatus] = useState<string>(currentStatus);

  const statuses = ["pending", "confirmed", "shipped", "delivered", "cancelled"];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-lg w-11/12 max-w-lg relative">
        <button
          className="absolute top-2 right-2 text-gray-500"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-xl font-bold mb-4">Update Order Status</h2>
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="block w-full border-gray-300 rounded mb-4"
        >
          {statuses.map(status => (
            <option key={status} value={status}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </option>
          ))}
        </select>
        <button
          className="bg-blue-500 text-white py-1 px-3 rounded mr-2"
          onClick={() => {
            onUpdateStatus(selectedStatus);
            onClose();
          }}
        >
          Update
        </button>
        <button
          className="bg-gray-500 text-white py-1 px-3 rounded"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default StatusUpdateModal;

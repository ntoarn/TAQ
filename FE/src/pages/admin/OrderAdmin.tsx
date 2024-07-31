import { Link } from 'react-router-dom';



const OrderAdmin = () => {
    return (
        <div className="container mx-auto mt-4">
            <h2 className="text-2xl mb-4">Order Management</h2>
            <table className="min-w-full bg-white border border-gray-300">
                <thead className="bg-gray-800 text-white">
                    <tr>
                        <th className="py-2 px-4">#</th>
                        <th className="py-2 px-4">Customer Name</th>
                        <th className="py-2 px-4">Date</th>
                        <th className="py-2 px-4">Status</th>
                        <th className="py-2 px-4">Total</th>
                        <th className="py-2 px-4">Action</th>
                    </tr>
                </thead>
               
            </table>
        </div>
    );
};

export default OrderAdmin;

import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import instance from '../../apis';

const ListUser = () => {
    const { state, handleUser } = useContext(UserContext);

    const handleLockToggle = async (userId: string, isLocked: boolean) => {
        try {
            const { data } = await instance.put(`/users/${userId}/lock`, { isLocked: !isLocked });
            handleUser(data); // Cập nhật người dùng trong context
        } catch (error) {
            console.error('Failed to lock/unlock user:', error);
        }
    };

    return (
        <div className="container mx-auto px-4">
            <table className="min-w-full bg-white border border-gray-200 text-center">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="py-2 px-4 border-b">#</th>
                        <th className="py-2 px-4 border-b">Name</th>
                        <th className="py-2 px-4 border-b">Email</th>
                        <th className="py-2 px-4 border-b">Address</th>
                        <th className="py-2 px-4 border-b">Phone</th>
                        <th className="py-2 px-4 border-b">Role</th>
                        <th className="py-2 px-4 border-b">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {state?.users.map((user, index) => (
                        <tr key={user._id} className="hover:bg-gray-50">
                            <td className="py-2 px-4 border-b">{index + 1}</td>
                            <td className="py-2 px-4 border-b">{user.name}</td>
                            <td className="py-2 px-4 border-b">{user.email}</td>
                            <td className="py-2 px-4 border-b">{user.address}</td>
                            <td className="py-2 px-4 border-b">{user.phone}</td>
                            <td className="py-2 px-4 border-b">{user.role}</td>
                            <td className="py-2 px-4 border-b">
                                <button
                                    onClick={() => handleLockToggle(user._id!, user.isLocked!)}
                                    className={`px-4 py-2 rounded ${user.isLocked ? 'bg-red-500' : 'bg-green-500'} text-white`}
                                >
                                    {user.isLocked ? 'Unlock' : 'Lock'}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
export default ListUser;

import React, { useContext, useState } from 'react';
import { UserContext } from '../../contexts/UserContext';
import instance from '../../apis';

const ListUser = () => {
    const { state, handleUser } = useContext(UserContext);
    const [searchEmail, setSearchEmail] = useState('');

    const handleLockToggle = async (userId: string, isLocked: boolean) => {
        try {
            const { data } = await instance.put(`/users/${userId}/lock`, { isLocked: !isLocked });
            handleUser(data); // Cập nhật người dùng trong context
        } catch (error) {
            console.error('Failed to lock/unlock user:', error);
        }
    };

    const filteredUsers = state?.users.filter(user => 
        user.email.toLowerCase().includes(searchEmail.toLowerCase())
    );

    return (
        <div className="container mx-auto px-4">
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search by email..."
                    value={searchEmail}
                    onChange={(e) => setSearchEmail(e.target.value)}
                    className="p-2 border border-gray-300 rounded w-1/2 md:w-1/3 lg:w-1/4" // Điều chỉnh chiều rộng tại đây
                />
            </div>
            <table className="min-w-full bg-white border border-gray-200 text-center">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="py-2 px-4 border-b">#</th>
                        <th className="py-2 px-4 border-b">Họ tên</th>
                        <th className="py-2 px-4 border-b">Email</th>
                        <th className="py-2 px-4 border-b">Địa chỉ</th>
                        <th className="py-2 px-4 border-b">Số điện thoại</th>
                        <th className="py-2 px-4 border-b">Quyền hạn</th>
                        <th className="py-2 px-4 border-b">Hoạt động</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers?.map((user, index) => (
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
                                    {user.isLocked ? 'Mở khóa' : 'Khóa'}
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

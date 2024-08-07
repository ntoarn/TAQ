

import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../../contexts/UserContext'
// import { UserContext } from '../../contexts/UserContext'

const ListUser = () => {
    const { state, handleRemoveUser } = useContext(UserContext)

    return (
        <>
            
            <div className="container mx-auto px-4">
                <table className="min-w-full bg-white border border-gray-200 text-center">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="py-2 px-4 border-b">#</th>
                            <th className="py-2 px-4 border-b">Name</th>
                            <th className="py-2 px-4 border-b">Email</th>
                            {/* <th className="py-2 px-4 border-b">PassWord</th> */}
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
                                {/* <td className="py-2 px-4 border-b">{user.password}</td> */}
                                <td className="py-2 px-4 border-b">{user.address}</td>
                                <td className="py-2 px-4 border-b">{user.phone}</td>
                                <td className="py-2 px-4 border-b">{user.role}</td>
                                <td className="py-2 px-4 border-b">
                                    <button
                                        onClick={() => handleRemoveUser(user._id!)}
                                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                                    >
                                        Xóa
                                    </button>
                                    <Link
                                        to={`/admin/category/edit/${user._id}`}
                                        className="ml-2 bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                                    >
                                        Sửa
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default ListUser

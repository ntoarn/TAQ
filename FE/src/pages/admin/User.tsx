import React from 'react'

const User = () => {
  return (
    <>
    <div className="container mx-auto mt-4">
    <h2 className="text-2xl mb-4">User Management</h2>
    <table className="min-w-full bg-white border border-gray-300">
                <thead className="bg-gray-800 text-white">
                    <tr>
                        <th className="py-2 px-4">#</th>
                        <th className="py-2 px-4">Name</th>
                        <th className="py-2 px-4">Email</th>
                        <th className="py-2 px-4">Role</th>
                        <th className="py-2 px-4">Action</th>
                    </tr>
                </thead>
               
            </table>
    </div>
    </>
  )
}

export default User
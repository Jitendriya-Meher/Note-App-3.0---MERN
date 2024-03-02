import React, { useState } from 'react'
import AdminUsersCard from '../../components/Admin/AdminUsersCard';

const AdminUsers = () => {

    const [ users, setUsers] = useState([]);

  return (
    <div className=' text-center text-white text-3xl'>

        <h1 className=' mb-4 font-mono'>
            All Users
        </h1>

        <div className=" font-mono">

            {
                users.map((user,i) => (
                    <AdminUsersCard key={user._id}
                    user={user}></AdminUsersCard>
                ))
            }

        </div>
    </div>
  )
}

export default AdminUsers
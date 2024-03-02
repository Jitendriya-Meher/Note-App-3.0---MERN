import React from 'react'
import { Link } from 'react-router-dom'

const AdminUsersCard = ({user}) => {
  return (
    <div className=' mx-8 mb-3 bg-gray-800/80 py-3 px-6 border border-gray-700 rounded-md flex flex-wrap flex-col gap-2'>
        <div className=" flex items-center justify-between text-xl flex-wrap gap-2">
            <div className=" flex flex-col flex-wrap items-start">
              <p>
                  {user.username}
              </p>
              <p>
                {user.email}
              </p>
            </div>
            <Link to={`/admin/user/${user._id}`}>
                <button className=' bg-red-400 px-2 py-1 border border-red-700 rounded-md hover:bg-red-900/50 text-gray-900 hover:text-white transition-all duration-200 font-serif text-lg text-left'>
                    Manage
                </button>
            </Link>
        </div>
        <div className=" text-sm text-start">
           <p>
            Address : {user.address}
           </p>
           <p>
            Phone : {user.phone}
           </p>
        </div>
    </div>
  )
}

export default AdminUsersCard
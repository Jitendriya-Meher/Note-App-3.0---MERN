
import React from 'react'
import { Link } from 'react-router-dom'


const ContactUserCard = ({user, deleteMessage}) => {

  return (
    <div className=' mx-8 mb-3 bg-gray-800/80 py-3 px-6 border border-gray-700 rounded-md flex flex-wrap flex-col gap-2'>
        <div className=" flex items-center justify-between text-xl flex-wrap gap-2">
            <p>
                {user.email}
            </p>
            <div className=" flex items-center justify-center gap-3">
                <Link to={`/admin/contact/${user._id}`}>
                    <button className=' bg-blue-800 px-2 py-1 border border-blue-700 rounded-md hover:bg-blue-900/50 text-gray-900 hover:text-white transition-all duration-200 font-serif text-lg text-left'>
                        Reply
                    </button>
                </Link>
                <button className=' bg-red-800 px-2 py-1 border border-red-700 rounded-md hover:bg-red-900/50 text-gray-900 hover:text-white transition-all duration-200 font-serif text-lg text-left'
                onClick={() => {
                    deleteMessage(user._id);
                }}>
                        Delete
                </button>
            </div>
        </div>
        <div className=" text-sm">
            <p className=' text-start'>
                {
                    user.message.length > 100 ? 
                    `${user.message.substring(0,100)}...`:
                    `${user.message}`
                }
            </p>
        </div>
    </div>
  )
}

export default ContactUserCard
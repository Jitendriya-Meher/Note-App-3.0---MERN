import React from 'react'
import { useSelector } from 'react-redux'

const AdminComp = () => {

    const auth = useSelector((state) => (state.auth));
    console.log(auth.token);

  return (
    <div className='text-white text-3xl w-full h-full flex items-center justify-center flex-col gap-2'>
        <p>
            {auth.username}
        </p>
        <p>
            Manage All user here
        </p>
    </div>
  )
}

export default AdminComp
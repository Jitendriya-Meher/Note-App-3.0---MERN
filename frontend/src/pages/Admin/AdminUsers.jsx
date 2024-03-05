import React, { useEffect, useState } from 'react'
import AdminUsersCard from '../../components/Admin/AdminUsersCard';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useSelector } from 'react-redux';

const AdminUsers = () => {

    const [ users, setUsers] = useState([]);
    const [ searchUsers, setSearchUsers] = useState([]);
    const [ query , setQuery] = useState("");

    const auth = useSelector((s) => (s.auth));

    const getAllUsers = async () => {

        try{
            const res = await axios.get(`${auth.baseURL}/api/admin/users`,{
                headers:{
                    Authorization: auth.token
                }
            });
            const data = await res.data;

            if( data.success){
                toast.success(data.message);
                setUsers(data.users);
            }
            else{
                toast.error(data.message);
            }
        }
        catch(err){
            toast.error(err.message);
        }
    }

    useEffect(() => {
        getAllUsers();
    },[]);

  return (
    <div className=' text-center text-white text-3xl'>

        <h1 className=' mb-4 font-mono'>
            All Users
        </h1>

        <label htmlFor="a" className=" w-full block relative px-10 pb-5 text-sm">
            <input type="search" name="text"
            id="a" required
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              const newUsers = users.filter((user) => (user.username.includes(e.target.value)));
              setSearchUsers(newUsers);
            }}
            placeholder='Search user by username'
            className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b-[1px] outline-1'
            />
        </label>

        <div className=" font-mono">

            {
                searchUsers.map((user) => (
                    <AdminUsersCard key={user._id}
                    user={user}></AdminUsersCard>
                ))
            }

        </div>
    </div>
  )
}

export default AdminUsers
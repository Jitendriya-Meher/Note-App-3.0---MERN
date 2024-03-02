import React, { useEffect, useState } from 'react'
import AdminUsersCard from '../../components/Admin/AdminUsersCard';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useSelector } from 'react-redux';

const AdminUsers = () => {

    const [ users, setUsers] = useState([]);
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

        <div className=" font-mono">

            {
                users.map((user) => (
                    <AdminUsersCard key={user._id}
                    user={user}></AdminUsersCard>
                ))
            }

        </div>
    </div>
  )
}

export default AdminUsers
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import ContactUserCard from '../../components/Admin/ContactUserCard';

const AdminContact = () => {

    const [contacts, setContacts] = useState([]);
    const auth = useSelector((s) => (s.auth));

    const getAllContacts = async () => {
        try{
            const res = await axios.get(`${auth.baseURL}/api/admin/contact`,{
                headers:{
                    Authorization : auth.token
                }
            });
            const data = await res.data;
            
            if( data.success){
                toast.success(data.message);
                setContacts(data.contacts);
            }
            else{
                toast.error(data.message);
            }

        }
        catch(err){
            toast.error(err.message);
        }
    }

    const deleteMessage = async (id) => {
        try{
            const res = await axios.delete(`${auth.baseURL}/api/admin/contact/${id}`,{
                headers:{
                    Authorization: auth.token 
                }
            });
            const data = await res.data;

            if( data.success){
                toast.success(data.message);
                getAllContacts();
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
        getAllContacts();
    },[]);

  return (
    <div className=' text-center text-white text-3xl'>

        <h1 className=' mb-4 font-mono'>
            All Contacts
        </h1>

        <div className=" font-mono">

            {
                contacts.map((user) => (
                    <ContactUserCard key={user._id}
                    user={user} deleteMessage={deleteMessage}></ContactUserCard>
                ))
            }

        </div>
    </div>
  )
}

export default AdminContact
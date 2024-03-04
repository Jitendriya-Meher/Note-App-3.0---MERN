import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { MdDeleteForever } from "react-icons/md";
import { toast } from 'react-toastify';

const DeleteNote = () => {

    const [note,setNotes] = useState({});
    const {id} = useParams();
    const navigate = useNavigate();
    const auth = useSelector(state=>state.auth);
    const [disableButton, setDisableButton] = useState(false);

    const getNote = async () => {
        setDisableButton(true);
        try{
            console.log("id",id);

            const res = await axios.get(`${auth.baseURL}/api/note/${id}`);

            const result = await res.data;

            if(result.success){
                toast.success(result.message);
                setNotes(result.note);
            }
            else{
                toast.error(result.message);
                navigate(-1);
            }
        }
        catch(err){
            toast.error("error in fetching note");
            navigate(-1);
        }
        setDisableButton(false);
    }

    const handleDelete = async () => {
        setDisableButton(true);
        const del = window.confirm("Are you sure you want to delete this note?");
        if( !del){
            setDisableButton(false);
            return;
        }
        try{
            const res = await axios.delete(`${auth.baseURL}/api/note/delete/${id}`);
            const result = res.data;

            if(result.success){
                toast.success(result.message);
                navigate(-1);
            }
            else{
                toast.error(result.message);
            }
        }
        catch(err){
            toast.error("error in deleting note");
        }
        setDisableButton(false);
    }

    useEffect(()=>{
        getNote();
    },[]);


  return (
    <div className="flex w-11/12 max-w-[1160px] py-12 mx-auto gap-x-12 gap-y-10 justify-between flex-wrap-reverse">

    <div className=" w-11/12 max-w-[750px] mx-auto">
        <h1 className='text-richblack-5 font-semibold text-[2rem] leading-[2.3rem]'>
            {note.title}
        </h1>
        <pre className='text-[1rem] leading-[1.2rem] mt-4 text-justify'>
            <span className='text-richblack-100'>
                 {note.description}
            </span>
        </pre>
    </div>

    <div className=" w-11/12 max-w-[350px] mt-0 md:mt-8 mx-auto">
        <h1 className='text-richblack-5 font-semibold text-[2rem] leading-[2.3rem]'>
            Are you sure you want to delete this note ?
        </h1>

        <button
        className='bg-red-500 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px] w-full flex mt-8 items-center justify-center gap-x-2'
        onClick={handleDelete}
        disabled={disableButton}
        >
            <p className="text-[1.1rem]">
                Delete Note
            </p>
            <MdDeleteForever size={26}></MdDeleteForever>
        </button>
    </div>

</div>
  )
}

export default DeleteNote
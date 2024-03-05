import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import "./Note.css";
import { useSelector } from 'react-redux';

const Note = () => {

    const [note,setNotes] = useState({});
    const {id} = useParams();
    const navigate = useNavigate();
    const {baseURL} = useSelector((state) => (state.auth));

    const getNote = async () => {

        try{

            const res = await axios.get(`${baseURL}/api/note/${id}`);
            console.log("res",res.data);

            const result = await res.data;

            if(result.success){
                toast.success(result.message);
                setNotes(result.note);
            }
            else{
                toast.error(result.message);
                navigate("/dashboard");
            }
        }
        catch(err){
            toast.error("error in fetching note");
            navigate("/dashboard");
        }

    }

    useEffect(()=>{
        getNote();
    },[]);

  return (
    <div className="flex w-11/12 max-w-[1160px] py-12 mx-auto gap-x-12 gap-y-0 justify-between">

        <div className=" w-11/12 mx-auto">
            <h1 className='text-richblack-5 font-semibold text-[2rem] leading-[2.3rem]'>
                {note.title}
            </h1>

            <p className='text-[0.9rem] leading-[1.2rem] mt-4 text-right'>
                <span className='text-richblack-100'>Created At </span>
                <span className='text-blue-500 italic'>
                    {moment(note.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
                </span>
            </p>

            <pre className='text-[0.9rem] leading-[1.2rem] mt-1 text-right'>
                <span className='text-richblack-100'>Updated At </span>
                <span className='text-blue-500 italic'>
                    {moment(note.updatedAt).format('MMMM Do YYYY, h:mm:ss a')}
                </span>
            </pre>


            <p className='text-[1rem] leading-[1.2rem] mt-4 text-justify break-words'>
                <pre className='text-richblack-100 break-words'>
                    {note.description}
                </pre>
            </p>

        </div>

    </div>
  )
}

export default Note
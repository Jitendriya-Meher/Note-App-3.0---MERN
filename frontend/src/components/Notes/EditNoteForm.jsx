import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { FaEdit } from "react-icons/fa";
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import LanguageIcon from '@mui/icons-material/Language';
import PublicOffIcon from '@mui/icons-material/PublicOff';

const EditNoteForm = () => {

    const [title,setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [ isPublic, setIsPublic] = useState(false);

    const auth = useSelector((state) => (state.auth));

    const {id} = useParams();
    const navigate = useNavigate();
    const [disableButton, setDisableButton] = useState(false);

    const getNote = async () => {

        setDisableButton(true);

        try{
            const res = await axios.get(`${auth.baseURL}/api/note/${id}`);
            console.log("res",res.data);

            const result = res.data;

            if(result.success){
                toast.success(result.message);
                setTitle(result.note.title);
                setDesc(result.note.description);
                setIsPublic(result.note.isPublic);
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

    const handleEdit = async (e) => {
        e.preventDefault();
        setDisableButton(true);
        try{
            const res = await axios.patch(`${auth.baseURL}/api/note/edit/${id}`,{title,description:desc, isPublic:isPublic});

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
            toast.error("error in editing note");
        }
        setDisableButton(false);
    }

    useEffect(()=>{
        getNote();
    },[]);

  return (
    <div action=""
    className='flex flex-col w-full gap-y-4 mt-6'
    >

        <button
        className='bg-blue-500 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px] flex mt-1 items-center justify-center gap-x-4 disabled:bg-gray-500'
        onClick={()=>{
            setIsPublic(!isPublic);
        }}
        >
            <p className="text-[1.1rem]">
                {isPublic ? 'UnPublish Your Note' : 'Publish Your Note'}
            </p>
            {
                isPublic ?  <PublicOffIcon></PublicOffIcon> : <LanguageIcon></LanguageIcon>
            }
        </button>

        <label htmlFor="a">
            <p className='text-[0.88rem] text-richblack-5 mb-1 leading-[1.38rem]'>
                Note Title
             <span className='text-pink-200'> *</span>
             </p>
            <input type="text" name="title"
            id="a" required
            value={title}
            onChange={(e) => {
                setTitle(e.target.value);
            }}
            placeholder='Enter Note Title'
            className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b-[1px] outline-1'
            />
        </label>

        <label htmlFor="b">
            <p className='text-[0.88rem] text-richblack-5 mb-1 leading-[1.38rem]'>
                Note Description
             <span className='text-pink-200'> *</span>
             </p>
            <textarea type="text" name="title"
            id="b" required
            rows={7}
            value={desc}
            onChange={(e) => {
                setDesc(e.target.value);
            }}
            placeholder='Enter Note Description'
            className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b-[1px] outline-1 pb-[20px]'
            ></textarea>
        </label>

        

        <button
        className='bg-yellow-50 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px] flex mt-8 items-center justify-center gap-x-4 disabled:bg-gray-500'
        disabled={disableButton}
        onClick={handleEdit}
        >
            <p className="text-[1.1rem]">
                Edit Note
            </p>
            <FaEdit size={26}></FaEdit>
        </button>

    </div>
  )
}

export default EditNoteForm;
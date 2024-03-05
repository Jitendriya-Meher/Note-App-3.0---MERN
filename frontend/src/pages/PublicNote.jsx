import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const PublicNote = () => {

    const [ notes, setNotes] = useState([]);
    const {baseURL} = useSelector((state) => (state.auth));

    const getPublicNotes = async () => {
        try{
            const res = await axios.get(`${baseURL}/api/note/publicnotes`);
            const data = await res.data;

            if( data.success){
                toast.success(data.message);
                setNotes(data.notes);
            }
            else{
                toast.error(data.message);
            }
        }
        catch(err){
            toast.error(err.message);
        }
    }

    useEffect(()=>{
        getPublicNotes();
    },[]);

  return (
    <div>
        <div className="">
            <h1>
                Public Notes
            </h1>
            <div className="">
                {
                    notes.map((note) => (
                        <div className="">
                            <div className="">
                                <p>
                                    { note.username}
                                </p>
                                <p>
                                    {note.createdAt}
                                </p>
                            </div>
                            <div className="">
                                {note.description}
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    </div>
  )
}

export default PublicNote
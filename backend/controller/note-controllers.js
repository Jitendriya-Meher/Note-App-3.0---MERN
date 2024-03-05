const Note = require("../models/note-model");
const UserModel = require("../models/user-model");
const bcrypt = require("bcrypt");


const addNote = async ( req, res) => {
    try{

        const {title,description} = req.body;
        const id = req.userId;
        const username = req.username;

        const dbNote = await Note.create({
            title,
            description,
            userID:id,
            username
        });

        return res.status(200).json({
            message:"note added successfully",
            success: true,
            note:dbNote
        });
    }
    catch(err){
        return res.status(200).json({
            message:"server Error while adding notes",
            success:false
        });
    }
}

const getAllNotes = async (req, res) => {
    try{
        const id = req.userId;

        const notes = await Note.find({
            userID:id 
        });

        return res.status(200).json({
            message:"note fetched successfully",
            success: true,
            note:notes
        });
    }
    catch(err){
        return res.status(200).json({
            message:"server Error while fetching user notes",
            success:false
        });
    }
}

const getSingleNote = async (req, res) => {
    try{
        const noteID = req.params.id;

        const note = await Note.findOne({_id:noteID});

        if( !note){
            return res.status(200).json({
                message:"note not found",
                success:false
            });
        }

        return res.status(200).json({
            message:"note fetched successfully",
            success: true,
            note:note
        });
    }
    catch(err){
        return res.status(200).json({
            message:"server Error while fetching note",
            success:false
        });
    }
}

const editNote = async (req, res) => {

    try{

        const noteID = req.params.id;
        const {title, description, isPublic} = req.body;

        const note = await Note.findByIdAndUpdate(noteID,{title, description, isPublic},{new:true});

        if( !note){
            return res.status(200).json({
                message:"note not found",
                success:false
            });
        }

        return res.status(200).json({
            message:"note edited successfully",
            success: true,
            note:note
        });
    }
    catch(err){
        return res.status(200).json({
            message:"server Error while editing note",
            success:false
        });
    }
}

const deleteNote = async (req, res) => {
    try{
        const noteID = req.params.id;

        const delNote = await Note.findByIdAndDelete(noteID);

        if( !delNote){
            return res.status(200).json({
                message:"note not found",
                success:false
            });
        }

        return res.status(200).json({
            message:"note deleted successfully",
            success: true,
            note:delNote
        });
    }
    catch(err){
        return res.status(200).json({
            message:"server Error while deleting note",
            success:false
        });
    }
}

const deleteAllNote = async (req,res) => {

    try{
        const userID = req.userId;

        const { password } = req.body;

        const existingUser = await UserModel.findById(userID);

        if( !existingUser){
            return res.json({
                message:"User not found with this token",
                success: false
            });
        }

        // check the password is correct or not
        const isMatch = await bcrypt.compare(password, existingUser.password);

        if( !isMatch ){
            return res.json({
                message:"Please enter your correct password",
                success: false
            });
        }

        const delNotes = await Note.deleteMany({userID});

        return res.status(200).json({
            message:"all notes deleted successfully",
            success: true,
            note:delNotes
        });
    }
    catch(err){
        return res.status(200).json({
            message:err.message,
            success:false
        });
    }
}

const getAllPublicNotes = async (req, res) => {
    try{

        const notes = await Note.find({
            isPublic: true 
        });

        return res.status(200).json({
            message:"note fetched successfully",
            success: true,
            notes:notes
        });
    }
    catch(err){
        return res.status(200).json({
            message:"server Error while fetching user notes",
            success:false
        });
    }
}

module.exports = {addNote,getAllNotes,getSingleNote,editNote,deleteNote,deleteAllNote, getAllPublicNotes};
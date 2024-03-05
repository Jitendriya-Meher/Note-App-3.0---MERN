const Contact = require("../models/contact-model");
const Note = require("../models/note-model");
const UserModel = require("../models/user-model");

const getAllContactData = async ( req, res) => {

    try{
        const contacts = await Contact.find().sort({
            createdAt: -1
        });

        return res.json({
            success: true,
            message: "Contacts fetched successfully",
            contacts
        });

    }
    catch(err){
        return res.json({
            success: false,
            message: err.message
        });
    }
}

const getAllUsersData = async ( req, res) => {

    try{
        const users = await UserModel.find({
            isAdmin:false
        }).sort({
            createdAt: -1
        });

        return res.json({
            success: true,
            message: "Users fetched successfully",
            users
        });

    }
    catch(err){
        return res.json({
            success: false,
            message: err.message
        });
    }
}

const getSingleUsersNotes = async ( req, res) => {

    try{
        
        const {id} = req.params;

        const user = await UserModel.findById(id);

        const notes = await Note.find({
            userID: id
        }).sort({
            createdAt: -1
        });

        return res.json({
            success: true,
            message: "Users notes fetched successfully",
            notes,
            username:user.username
        });

    }
    catch(err){
        return res.json({
            success: false,
            message: err.message
        });
    }
}

const deleteAllUserNotes = async ( req, res) => {

    try{
        
        const {id} = req.params;

        const notes = await Note.deleteMany({
            userID: id
        });

        return res.json({
            success: true,
            message: "Users notes deleted successfully",
        });

    }
    catch(err){
        return res.json({
            success: false,
            message: err.message
        });
    }
}

const getUserContact = async (req, res) => {
    try{
        
        const {id} = req.params;

        const contact = await Contact.findById(id);

        if( !contact){
            return res.json({
                success: false,
                message: "contact not found",
            });
        }

        return res.json({
            success: true,
            message: "contact fetch successfully",
            contact
        });

    }
    catch(err){
        return res.json({
            success: false,
            message: err.message
        });
    }
}

const deleteUserContact = async (req, res) => {
    try{
        
        const {id} = req.params;

        const contact = await Contact.findByIdAndDelete(id);

        if( !contact){
            return res.json({
                success: false,
                message: "contact not found"
            });
        }

        return res.json({
            success: true,
            message: "Users contact deleted successfully",
            contact
        });

    }
    catch(err){
        return res.json({
            success: false,
            message: err.message
        });
    }
}

module.exports = { getAllContactData, getAllUsersData, getSingleUsersNotes ,deleteAllUserNotes, getUserContact, deleteUserContact};
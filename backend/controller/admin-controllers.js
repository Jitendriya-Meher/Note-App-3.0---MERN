const Contact = require("../models/contact-model");

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

module.exports = { getAllContactData};
const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true 
    },
    username:{
        type:String,
        require:true
    },
    userID:{
        type:String,
        require:true,
    },
    isPublic:{
        type:Boolean,
        default: false
    }
},{
    timestamps: true
});

const Note = mongoose.model("Note",noteSchema);

module.exports = Note;
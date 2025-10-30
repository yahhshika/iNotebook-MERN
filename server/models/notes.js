const mongoose = require("mongoose");

let noteSchema = new mongoose.Schema({

    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    tag:{
        type:String,
        default:'General'
    },
    date:{
        type:Date,
        default: Date.now
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }


})
const Note = mongoose.model('Note', noteSchema);
module.exports = Note;
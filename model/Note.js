const mongoose = require("mongoose");
const NotesSchema = mongoose.Schema({
    title:{type:String , required:true ,unique:true},
    description:{type:String, required:true}
})

const Notes = mongoose.model("Note",NotesSchema);

module.exports = Notes;
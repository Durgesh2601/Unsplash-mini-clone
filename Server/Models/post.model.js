const mongoose = require("mongoose");

const postShcema = new mongoose.Schema({
    label : {type:String, required:false},
    pic  : {type: String, required:true},
},
{timestamps : true, 
    versionKey : false
});

module.exports = mongoose.model("Post", postShcema);
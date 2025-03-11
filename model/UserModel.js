const mongoose=require("mongoose")
const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:false
    },
    email:{
        type:String,
        required:false,
        
    },
    password:{
        type:String,
        required:false
    },      

},{
    timestamps:true
}
)

const User = mongoose.model('User', userSchema);
module.exports = User;

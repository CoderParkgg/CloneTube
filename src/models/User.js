import mongoose from "mongoose";
import bycrypt from "bcrypt"

const userSchema = new mongoose.Schema({
    name : {type : String, required : true},
    username: {type: String, required : true, unique : true},
    avatarUrl : {type : String, default : "/uploads/avatars/avatar"},
    socialOnly : {type : Boolean, default: false},
    password : {type : String, },
    email : {type : String, required: true, unique : true}, //unique는 딱 하나만 존재하도록 만든다.
    location : {type : String, required : true},
    videos : [{type : mongoose.Schema.Types.ObjectId, required: true, ref:"Video"}],
});

userSchema.pre('save', async function(){
    if(this.isModified("password"))
        this.password = await bycrypt.hash(this.password, 5);
})

const User = mongoose.model('User', userSchema);
export default User;
import mongoose from "mongoose";
import bycrypt from "bcrypt"

const userSchema = new mongoose.Schema({
    name : {type : String, required : true},
    username: {type: String, required : true, unique : true},
    password : {type : String, required : true},
    email : {type : String, required: true, unique : true}, //unique는 딱 하나만 존재하도록 만든다.
    rocation : {type : String },
});

userSchema.pre('save', async function(){
    this.password = await bycrypt.hash(this.password, 5);
})

const User = mongoose.model('User', userSchema);
export default User;
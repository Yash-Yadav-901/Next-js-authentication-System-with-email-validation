import mongoose from 'mongoose'


const userSchema= new mongoose.Schema({
    username:{
        type:String,
        required: [true, "please provide your username!"],
        unique: true
    },
    email:{
        type:String,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required: true
    },
    isVerified:{
        type: Boolean,
        default: false
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    forgetPasswordToken: String,
    forgetPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date
})



const User = mongoose.models.users || mongoose.model("Users", userSchema);

export default User
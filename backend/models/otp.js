import mongoose from 'mongoose'

const otpSchema = mongoose.Schema(
    {
        email: String,
        code: String,
        expireIn: Number,
},{
    timestamps:true
}  

)
const Otp = mongoose.model('Otp', otpSchema,'otp')

export{Otp}
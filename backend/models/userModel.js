import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },

    // resetPasswordToken: String,
    // resetPasswordExpire: Date,
    verifyToken: String,
  },

  {
    timestamps: true,
  },

  
)

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})


//genereate password reset token
userSchema.methods.getResetPasswordToken = function(){
  //genereate Token
  const resetToken = crypto.randomBytes(20).toString('hex');

  //hash and set to resetPasswordToken
  this.resetPasswordToken= crypto.createHash('sha256').update(resetToken).digest('hex')

  //set token expire time
  this.resetPasswordExpire = Date.now() +30 *60 *1000

  return resetToken


}


const User = mongoose.model('User', userSchema)

export default User

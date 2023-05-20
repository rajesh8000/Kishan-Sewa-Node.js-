import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js'
import {Otp} from '../models/otp.js'
import { response } from 'express'
import sendEmail from '../utils/sendEmail.js'
import sendToken  from '../utils/generateToken.js'
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()


const keysecret = 'ajlsldlasdaoi1987293';
// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
  
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error('Invalid email or password')
  }
})

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  const user = await User.create({
    name,
    email,
    password,
  })

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    if (req.body.password) {
      user.password = req.body.password
    }

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({})
  res.json(users)
})

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    await user.remove()
    res.json({ message: 'User removed' })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password')

  if (user) {
    res.json(user)
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    user.isAdmin = req.body.isAdmin

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})



const transporter =nodemailer.createTransport({
  
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        secure: false,
        auth: {
        user: "febeaddc006647",
        pass: "02f9b08694f436"
    }

})

//send link

const sendpasswordlink= async(req, res)=>{
    

    const {email} = req.body;
     if(!email){
        res.status(401).json({status:401, message:"Enter Your Email"})
       }
       try {
        const userfind = await User.findOne({email:email}) 
        const token = generateToken(userfind._id) 
       
        

        const setuserToken = await User.findByIdAndUpdate({_id:userfind.id},{verifyToken:token},{new:true} )
        console.log(setuserToken)
        
        if(setuserToken){
          const mailOptions={
            from: "process.env.SMTP_EMAIL",
            to:email,
            subject:"Sending email for password reset",
            text: `This link valid for 2 min http://localhost:3000/forgot/${userfind._id.toString()}/${setuserToken.verifyToken}`
          }

          transporter.sendMail (mailOptions,(error, info)=>{
            if(error){
              console.log("error",error)
              res.status(401).json({status:401, message:"email not send"})

            }else{
              console.log("Email sent",info.response);
              res.status(201).json({status:201, message:"Email Sent Successfully"})
            }
          })
        }

       } catch (error) {
        res.status(401).json({status:401, message:"Invalid User"})
        
        
       }
    

}

//verify user for forgot password
const verifyUser = async (req, res) => {
  const {id, token } = req.params;
  try {
    const validUser = await User.findOne({ _id: id, verifyToken: token });
    if (!validUser) {
      return res.status(401).json({ status: 401, message: "User not found" });
    }

    const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
    if (verifyToken._id !== validUser._id.toString()) {
      return res.status(401).json({ status: 401, message: "Invalid token" });
    }

    return res.status(200).json({ status: 200, message: "Token is valid" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: 500, message: "Internal server error" });
  }
};


const changePassword= async(req, res)=>{
  const {id, token}= req.params;
  console.log(token)

  const {password}= req.body;

  try {
    const validuser= await User.findOne({_id:id, verifyToken:token})
    
    const verifyToken = jwt.verify(token,keysecret)

     if(validuser && verifyToken._id){

        const newPassword = await bcrypt.hash(password,12);

        const setNewuserPass= await User.findByIdAndUpdate({_id:id},{password:newPassword});

        setNewuserPass.save();
        res.status(201).json({status:401, setNewuserPass})


     }else{
      res.status(401).json({status:401, message:"User not exits"})

     }
  } catch (error) {

    res.status(401).json({status:401, error})
    
  }




}





//forgot password

// const forgotPassword = async(req, res, next) =>{

//   const user = await User.findOne({email: req.body.email});

//   if(!user){
//     return next (new Error('User not Found With this email', 404))
//   }

// //get reset token

// const resetToken= user.getResetPasswordToken();
// await user.save({validateBeforeSave:false})


// //create reset password url

// const resetUrl= `${req.protocol}://${req.get('host')}/api/reset/${resetToken}`

// const message =` Your password reset token is as folloe:\n\n${resetUrl}\n\n If you have not requested this 
// email, then ignore it.`

// try {
//   await sendEmail({
//     email: user.email,
//     subject:' Kishan Sewa Password Recovery',
//     message
//   })
//   res.status(200).json({
//     success:true,
//     message: `Email sent to: ${user.email}`
//   })
  
// } catch (error) {
  
//   user.resetPasswordToken= undefined;
//   user.resetPasswordExpire =undefined;
//   await user.save({validateBeforeSave:false})

//   return next (new Error(error.message, 500))
// }


// }





// const emailSend = asyncHandler(async (req, res) => {
//   try {
//     const data = await User.findOne({ email: req.query.email });

//     if (data) {
//       const otpCode = Math.floor((Math.random()*10000)+1);
//       const otpData = new Otp({
//         email: req.query.email,
//         code: otpCode,
//         expireIn: new Date().getTime() * 300 * 1000
//       });

//       const otpResponse = await otpData.save();

//       const responseType = {
//         statusText: 'Success',
//         message: 'Please Check Your Email'
//       }
//       res.status(200).json(responseType);
// } else {
//       res.status(404);
//       throw new Error('Email not found');
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// const changePassword = asyncHandler(async (req, res) => {
//   let data = await Otp.find({email:req.query.email, code:req.query.otpCode})
//   if(data){
//     let currentTime= new Date().getTime();
//     let diff = data.expireIn -currentTime;
//     if(diff < 0){
//       response.message='Token Expire'
//       response.statusText= 'error'
//     }else{
//       let user =await User.findOne({email:req.query.email})
//       user.password= req.query.password;
//       user.save()
//       response.message ='Password changed Successfully'
//       response.statusText = 'success'
//     }
//   }else{
//     response.message ='Invalid Otp'
//     response.statusText ='Error'
//   }
// })

// const mailer= (email, Otp)=>{

//       var nodemailer = require('nodemailer');
//       var transporter= nodemailer.createTransport({

//         service: 'gmail',
//         port:587,
//         secure:false,
//         auth:{
//           user:process.env.APP_EMAIL,
//           pass:process.env.APP_PASS
//         }

//       });

//       var mailOptions ={
//         from:'thaparajen246@gmail.com',
//         to:'thaparajan246@gmail.com',
//         subject:'Sending Email using Node.js',
//         text:'Thank You Sir !'
//       }

//       transporter.sendMail(mailOptions, function(error, info){
//         if(error){
//           console.log(error)
//         }else{
//           console.log('Email Sent'+ info.response)
//         }
//       })


// }


export {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  // forgotPassword,
  sendpasswordlink,
  verifyUser,
  changePassword,
 
}

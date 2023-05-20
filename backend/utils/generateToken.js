import jwt from 'jsonwebtoken'

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '2d',
  })
}

// //cookie
// const sendToken = (user, statusCode, res)=>{

//   //create jwt Token
//   const token= generateToken(user.id);

//   const options={
//     expires:new Date(
//       Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 *60 * 1000
//     ),
//     httpOnly:true
//   }
//   res.status(statusCode).cookie("token", token, options).json({
//     success: true,
//     token,
//     user
//   })
        

//}

export { generateToken};
export default generateToken;

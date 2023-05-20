// import React, {useRef, useState, useEffect} from "react";
// import { Link, useHistory } from "react-router-dom";
// import { Form, Button, Row, Col, Toast } from 'react-bootstrap'
// import { useDispatch, useSelector } from 'react-redux'
// import Message from '../components/Message'
// import Loader from '../components/Loader'
// import FormContainer from '../components/FormContainer'
// import axios from "axios";

// const OtpForm = ({location}) => {
//     const [email, setEmail] = useState('');

//     const [message, setMessage] = useState('');
    
//     const setVal = (e)=>{
//       setEmail(e.target.value)

//     }
  


    
//     const sendLink = async(e)=>{

//       e.preventDefault();

//       const res = await fetch("http://localhost:5000/api/users/sendpasswordlink",{

//         method:"POST",
//         headers:{
//           "content-Type":"application/json"
//         },
//         body:JSON.stringify({email})
//       })

//       const data = await res.json();
      
//       if(data.status === 201){
//         setEmail("");
//         setMessage(true)

//       }
//     }


//     const submitHandler = (e) => {
//       e.preventDefault();
//       sendLink();
//       // TODO: Send password reset email using Nodemailer
//     };
//     const redirect = location.search ? location.search.split('=')[1] : '/'
  
//     const emailRef= useRef();
   

//     return (
        
      
//         <FormContainer>
//             <h1>Forget Password</h1>

//             {message ? <p>Password Reset Link Send Successfully in your Email</p>: ""}
    
//       <Form onSubmit={submitHandler}>
//         <Form.Group controlId='email'>
//           <Form.Label>Email Address</Form.Label>
//           <Form.Control
//             type='email'
//             placeholder='Enter email'
//             value={email}
//             ref={emailRef}
//             onChange={setVal}
//           ></Form.Control>
//         </Form.Group>
  
//         <Button type='submit' variant='primary' onClick={sendLink}>
//           Reset Password
//         </Button>
//       </Form>

//       <Row className='py-3'>
//         <Col>
//           <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
//             Login
//           </Link>
//         </Col>
//       </Row>

//       </FormContainer>
//     );
//   };
  
//   export default OtpForm;